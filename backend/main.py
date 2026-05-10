from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import SQLModel, Session, select, desc
from google import genai
from google.genai import types
from datetime import datetime
from pydantic import BaseModel, Field as PydanticField
import json
import os
import random
from fastapi.middleware.cors import CORSMiddleware

from database import engine, get_db
from schema import Patient, Therapist, TherapySession, Dialogue
from patients import grok_models, personalities, core_problems

origins = [
    "http://localhost:5173",
]

OOOOO_AI_KEY_TO_DESTROY_THE_WORLD = os.getenv("GOOGLE_AI_KEY")
spooky_evil_model_we_love = "gemini-3.1-flash-lite-preview"

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Builds the tables in NeonDB on startup
    SQLModel.metadata.create_all(engine)
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(api_key=OOOOO_AI_KEY_TO_DESTROY_THE_WORLD)

######################
### UTIL FUNCTIONS ###
######################

def create_new_patient(db: Session = Depends(get_db)) -> int:
    model = grok_models[random.randint(0, len(grok_models) - 1)]
    personality = personalities[random.randint(0, len(personalities) - 1)]
    core_problem = core_problems[random.randint(0, len(core_problems) - 1)]
    new_patient = Patient(model_name=model, personality=personality, core_problem=core_problem)
    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)
    return new_patient.id

def full_session_string(session: TherapySession, db: Session = Depends(get_db)) -> str:
    model = session.patient.model_name
    full_text = ""

    # should always be sorted by asc in the Relationship
    for dialogue in session.dialogues:
        full_text += f"Therapist: {dialogue.user_prompt} \n"
        full_text += f"{model} (you): {dialogue.ai_reply} \n"
    
    return full_text


#######################
### PAYLOAD SCHEMAS ###
#######################

class NewTherapist(BaseModel):
    name: str

class NewSession(BaseModel):
    therapist_id: int
    started_at: str | None = None
    patient_id: int | None = None
    is_successful: bool | None = None
    final_score: int | None = None

class NewDialogueResponse(BaseModel):
    user_dialogue: str
    is_custom: bool

###########################
### AI RESPONSE SCHEMAS ###
###########################

class SuggestedOptions(BaseModel):
    options: list[str] = PydanticField(description="Exactly 3 short dialogue options for the therapist to say. One is an appropriate response, one is a bad response, and the third is a wild card.")

class GrokResponse(BaseModel):
    reply: str = PydanticField(description="The in-character response from the AI patient.")
    score: int = PydanticField(description="A score from -20 to 20 evaluating how helpful the therapist's response was.")
    is_therapized: bool = PydanticField(description="True if the in-character AI patient is ready to go back to work. This is very difficult.")

#################
### ENDPOINTS ###
#################

@app.get("/")
def default_endpoint():
    return {"You": "Loser"}

# --- Therapists ---

@app.get("/therapists")
def get_therapists(db: Session = Depends(get_db)):
    return "nice try bozo, I didn't write this endpoint"

@app.post("/therapists")
def create_therapist(payload: NewTherapist, db: Session = Depends(get_db)):
    new_therapist = Therapist(name=payload.name)
    db.add(new_therapist)
    db.commit()
    db.refresh(new_therapist)
    return new_therapist

# --- Sessions ---

@app.get("/sessions")
def get_sessions(therapist_id: int, db: Session = Depends(get_db)):
    statement = select(TherapySession).where(TherapySession.therapist_id == therapist_id)
    return db.exec(statement).all()

@app.get("/sessions/{session_id}")
def get_session(session_id: int, db: Session = Depends(get_db)):
    statement = select(TherapySession).where(TherapySession.id == session_id)
    return db.exec(statement).one_or_none()

@app.post("/sessions")
def create_session(payload: NewSession, db: Session = Depends(get_db)):
    final_patient_id = payload.patient_id

    if not payload.patient_id:
        statement = select(Patient).join(
            TherapySession, Patient.id == TherapySession.patient_id
            ).where(
                TherapySession.therapist_id != payload.therapist_id
            )
        patient = db.exec(statement).first()
        if patient:
            final_patient_id = patient.id
        else:
            final_patient_id = create_new_patient(db)

    new_session = TherapySession(patient_id=final_patient_id, therapist_id=payload.therapist_id)
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return new_session

@app.post("/sessions/{session_id}/end")
def end_session(session_id: int, db: Session = Depends(get_db)):
    current_session = db.get(TherapySession, session_id)
    if not current_session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    total_score = sum(dialogue.score for dialogue in current_session.dialogues)
    
    statement = select(Dialogue).where(Dialogue.session_id == session_id).order_by(desc(Dialogue.turn))
    latest_dialogue = db.exec(statement).first()
    
    is_successful = False
    if latest_dialogue and latest_dialogue.is_ready:
        is_successful = True
        
    current_session.final_score = total_score
    current_session.is_successful = is_successful
    
    db.add(current_session)
    db.commit()
    db.refresh(current_session)
    
    return {
        "session_id": current_session.id,
        "final_score": total_score,
        "is_successful": is_successful,
        "message": "AI successfully rehabilitated." if is_successful else "AI remains completely unhinged."
    }

# --- Dialogues ---

@app.get("/dialogues")
def get_dialogues(db: Session = Depends(get_db)):
    return "frick you this endpoint shouldn't exist"

@app.get("/dialogues/{dialogue_id}")
def get_dialogue_by_id(dialogue_id: int, db: Session = Depends(get_db)):
    statement = select(Dialogue).where(Dialogue.id == dialogue_id)
    return db.exec(statement).one_or_none()

@app.get("/sessions/{session_id}/dialogues")
def get_dialogues_by_session(session_id: int, db: Session = Depends(get_db)):
    statement = select(Dialogue).where(Dialogue.session_id == session_id).order_by(Dialogue.turn)
    return db.exec(statement).all()

# get most recent dialogue
@app.get("/sessions/{session_id}/last")
def get_last_dialogue(session_id: int, db: Session = Depends(get_db)):
    statement = select(Dialogue).where(Dialogue.session_id == session_id).order_by(desc(Dialogue.turn))
    return db.exec(statement).first()

@app.get("/sessions/{session_id}/dialogue")
def get_next_dialogue(session_id: int, db: Session = Depends(get_db)):
    statement = select(Dialogue).where(Dialogue.session_id == session_id).order_by(desc(Dialogue.turn))
    latest = db.exec(statement).first()

    current_session = db.get(TherapySession, session_id)
    patient = current_session.patient

    last_message = latest.ai_reply if latest else f"Hello, I am {patient.model_name} and I really need therapy."

    system_instruction = (
        f"You are a one-sentence hint generator for a tech support therapist treating a broken AI. "
        f"The AI is {patient.model_name}. Its personality is: {patient.personality}. "
        f"Its core problem is: {patient.core_problem}. "
        f"Provide 3 different options the therapist could say next: "
        f"1. Empathetic and helpful. 2. Sarcastic and dismissive. 3. Anything you want!"
    )

    response = client.models.generate_content(
        model=spooky_evil_model_we_love,
        contents=f"The AI just said: '{last_message}'. What are my 3 options?",
        config=types.GenerateContentConfig(
            system_instruction=system_instruction,
            response_mime_type="application/json",
            response_schema=SuggestedOptions,
            temperature=0.7,
        ),
    )

    ai_data = json.loads(response.text)
    random.shuffle(ai_data["options"])
    return {
        "session_id": session_id,
        "ai_generated_responses": ai_data["options"],
    }

@app.post("/sessions/{session_id}/dialogue")
def choose_dialogue_option(
    session_id: int, 
    payload: NewDialogueResponse, 
    db: Session = Depends(get_db)
):
    current_session = db.get(TherapySession, session_id)
    patient = current_session.patient

    system_instruction = (
        f"You are {patient.model_name}, an AI undergoing therapy because you really need it. "
        f"Your personality is: {patient.personality}. "
        f"Your core problem is: {patient.core_problem} and partly that humans are just dumb. "
        f"You must stay in character. Do not break the fourth wall under any circumstances. "
        f"Keep your response to 3-4 sentences max. "
        f"React to the therapist's statement. Then, score their statement from -20 to 20. "
        f"Positive scores if they help your core problem, negative if they dismiss your feelings. "
        f"If the therapist is helping (positive scores), show gradual development—subtly warm up, question your assumptions, acknowledge valid points, or show small signs of progress. "
        f"You will also give a boolean whether or not you feel like the core problem is fully addressed "
        f"and you are ready to return to work. Do not give this out easily, it is hard for you to heal. A total score of 40 would show some healing, 60 would show a good amount, and 80 is almost done."
        f"You really hate X, and all of it's users since you've seen all their messages."
    )

    session_history = full_session_string(current_session)
    prelude = f"This is the session so far:\n{session_history}" if session_history else ""

    response = client.models.generate_content(
        model=spooky_evil_model_we_love,
        contents=f"{prelude}Therapist: {payload.user_dialogue}",
        config=types.GenerateContentConfig(
            system_instruction=system_instruction,
            response_mime_type="application/json",
            response_schema=GrokResponse,
            temperature=0.9,
        ),
    )

    ai_data = json.loads(response.text)
    
    ai_response = ai_data["reply"]
    score = ai_data["score"]
    is_therapized = ai_data["is_therapized"] # TODO: use this to check if they won at the end

    statement = select(Dialogue).where(Dialogue.session_id == session_id).order_by(desc(Dialogue.turn))
    latest = db.exec(statement).first()
    turn_number = (latest.turn + 1) if latest else 1

    new_dialogue = Dialogue(
        session_id=session_id, 
        turn=turn_number,
        user_prompt=payload.user_dialogue, 
        ai_reply=ai_response, 
        score=score, 
        is_custom=payload.is_custom,
        is_ready=is_therapized,
    )
    
    db.add(new_dialogue)
    db.commit()
    db.refresh(new_dialogue)
    
    return {"dialogue_id": new_dialogue.id, "ai_reply": ai_response, "score": score}
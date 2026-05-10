import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import SQLModel, Session, select
from google import genai
from datetime import datetime
from pydantic import BaseModel

from database import engine, get_db
from schema import Patient, Therapist, TherapySession, Dialogue

OOOOO_AI_KEY_TO_DESTROY_THE_WORLD = os.getenv("GOOGLE_AI_KEY")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Builds the tables in NeonDB on startup
    SQLModel.metadata.create_all(engine)
    yield

app = FastAPI(lifespan=lifespan)

client = genai.Client(api_key=OOOOO_AI_KEY_TO_DESTROY_THE_WORLD)

#######################
### PAYLOAD SCHEMAS ###
#######################

class NewPatient(BaseModel):
    model_name: str
    personality: str
    core_problem: str

class NewTherapist(BaseModel):
    name: str

class NewSession(BaseModel):
    therapist_id: int
    started_at: str
    patient_id: int | None = None
    is_successful: bool | None = None
    final_score: int | None = None

class NewDialogueResponse(BaseModel):
    user_dialogue: str
    is_custom: bool


#################
### ENDPOINTS ###
#################

@app.get("/")
def default_endpoint():
    return {"You": "Loser"}

# --- Therapists ---

@app.get("/therapists")
def get_therapists(db: Session = Depends(get_db)):
    return []

@app.post("/therapists")
def create_therapist(payload: NewTherapist, db: Session = Depends(get_db)):
    return ""

# --- Sessions ---

@app.get("/sessions")
def get_sessions(therapist_id: int, db: Session = Depends(get_db)):
    selection = select(TherapySession).where(TherapySession.therapist_id == therapist_id)
    return []

@app.get("/sessions/{session_id}")
def get_session(session_id: int, db: Session = Depends(get_db)):
    return ""

@app.post("/sessions")
def create_session(payload: NewSession, db: Session = Depends(get_db)):
    new_session = TherapySession(patient_id=payload.patient_id, therapist_id=payload.therapist_id)
    db.add()
    db.commit()
    db.refresh(new_session)
    return {"session_id": new_session.id}

# --- Dialogues ---

@app.get("/dialogues")
def get_dialogues(db: Session = Depends(get_db)):
    return []

@app.get("/sessions/{session_id}/dialogues")
def get_dialogues_by_session(session_id: int, db: Session = Depends(get_db)):
    return []

@app.get("/sessions/{session_id}/dialogue")
def get_next_dialogue(session_id: int, db: Session = Depends(get_db)):
    return ""

@app.post("/sessions/{session_id}/dialogue")
def send_dialogue_option(
    session_id: int, 
    payload: NewDialogueResponse, 
    db: Session = Depends(get_db)
):
    return ""

# start_session
# -> return session id

# dialogue GET/POST
# -> takes session id

# end_session
# -> takes a session id

# get_session_dialogues
# -> return list of dialogues

# get_sessions
# -> take user id

# something about history/stats
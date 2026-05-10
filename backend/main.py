import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import SQLModel, Session, select
from google import genai

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

@app.get("/")
def default_endpoint():
    return {"You": "Loser"}


@app.post("/start_session")
def start_session(patient_id: int, therapist_id: int, db: Session = Depends(get_db)):
    return "fjbehb"

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
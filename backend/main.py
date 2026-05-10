from contextlib import asynccontextmanager
from fastapi import FastAPI
from sqlmodel import Field, Relationship, SQLModel, create_engine
from dotenv import load_dotenv
from datetime import datetime, timezone
import os
from google import genai

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
OOOOO_AI_KEY_TO_DESTROY_THE_WORLD = os.getenv("GOOGLE_AI_KEY")

engine = create_engine(DATABASE_URL)

# The AIs
class Patient(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    model_name: str = Field(index=True)
    personality: str
    core_problem: str

    ### Just for Python ###
    sessions: list["Session"] = Relationship(back_populates="patient")

class Therapist(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str

    ### Just for Python ###
    sessions: list["Session"] = Relationship(back_populates="therapist")

class Session(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    patient_id: int = Field(foreign_key="patient.id")
    therapist_id: int = Field(foreign_key="therapist.id")
    started_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_successful: bool | None = Field(default=None)
    final_score: int | None = Field(default=None)

    ### Just for Python ###
    patient: Patient = Relationship(back_populates="sessions")
    therapist: Patient = Relationship(back_populates="sessions")
    dialogue_turns: list["Dialogue"] = Relationship(back_populates="session")

class Dialogue(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    session_id: int = Field(foreign_key="session.id")
    turn: int
    ai_prompt: str
    response: str

    ### Just for Python ###
    session: Session = Relationship(back_populates="dialogue_turns")


@asynccontextmanager
async def lifespan(app: FastAPI):
    SQLModel.metadata.create_all(engine)
    yield
    # Any teardown code here


app = FastAPI(lifespan=lifespan)

@app.get("/")
def default_endpoint():
    client = genai.Client(api_key=OOOOO_AI_KEY_TO_DESTROY_THE_WORLD)
    
    return {"You": "Loser"}
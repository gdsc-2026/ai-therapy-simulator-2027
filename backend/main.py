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
    dialogues: list["Dialogue"] = Relationship(back_populates="session")

class Dialogue(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    session_id: int = Field(foreign_key="session.id")
    turn: int
    ai_prompt: str
    user_response: str
    is_custom: bool
    score: int

    ### Just for Python ###
    session: Session = Relationship(back_populates="dialogues")


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
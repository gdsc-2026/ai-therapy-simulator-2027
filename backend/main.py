from contextlib import asynccontextmanager
from fastapi import FastAPI
from sqlmodel import Field, Session, SQLModel, create_engine
from dotenv import load_dotenv
import os
from google import genai

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
OOOOO_AI_KEY_TO_DESTROY_THE_WORLD = os.getenv("GOOGLE_AI_KEY")

engine = create_engine(DATABASE_URL)

class ChatEntry(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int
    prompt: str
    response: str


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
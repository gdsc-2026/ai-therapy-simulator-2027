from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime, timezone

# The AIs
class Patient(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    model_name: str = Field(index=True)
    personality: str
    core_problem: str

    ### Just for Python ###
    sessions: list["TherapySession"] = Relationship(back_populates="patient")

class Therapist(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str

    ### Just for Python ###
    sessions: list["TherapySession"] = Relationship(back_populates="therapist")

class TherapySession(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    patient_id: int = Field(foreign_key="patient.id")
    therapist_id: int = Field(foreign_key="therapist.id")
    started_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_successful: bool | None = Field(default=None)
    final_score: int | None = Field(default=None)

    ### Just for Python ###
    patient: Patient = Relationship(back_populates="sessions")
    therapist: Therapist = Relationship(back_populates="sessions")
    dialogues: list["Dialogue"] = Relationship(
        back_populates="session",
        sa_relationship_kwargs={"order_by": "Dialogue.turn"}
    )

class Dialogue(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    session_id: int = Field(foreign_key="therapysession.id")
    turn: int
    ai_reply: str
    user_prompt: str
    is_custom: bool
    score: int

    ### Just for Python ###
    session: TherapySession = Relationship(back_populates="dialogues")
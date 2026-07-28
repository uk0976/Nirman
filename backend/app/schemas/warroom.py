import uuid
from datetime import datetime
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

class SessionCreateRequest(BaseModel):
    project_id: uuid.UUID
    workflow_id: uuid.UUID
    title: str
    purpose: str


class MessageCreateRequest(BaseModel):
    agent_id: uuid.UUID
    message: str
    message_type: str = "Suggestion" # Suggestion, Question, Concern, Proposal, Review, Approval, Rejection
    parent_message_id: Optional[uuid.UUID] = None
    confidence: float = 0.90


class VoteCreateRequest(BaseModel):
    agent_id: uuid.UUID
    vote: str # Approve, Reject, Abstain, NeedsInfo
    reason: Optional[str] = None


class DecisionCreateRequest(BaseModel):
    title: str
    description: str
    decision_type: str # Architecture, Tech Stack, Security, Testing


class ApproveOverrideRequest(BaseModel):
    approved_by: uuid.UUID
    reasoning: str


class WarRoomParticipantResponse(BaseModel):
    id: uuid.UUID
    session_id: uuid.UUID
    agent_id: uuid.UUID
    role: str
    status: str
    joined_at: datetime

    class Config:
        from_attributes = True


class WarRoomMessageResponse(BaseModel):
    id: uuid.UUID
    session_id: uuid.UUID
    agent_id: uuid.UUID
    message: str
    message_type: str
    parent_message_id: Optional[uuid.UUID] = None
    confidence: float
    created_at: datetime

    class Config:
        from_attributes = True


class VoteResponse(BaseModel):
    id: uuid.UUID
    decision_id: uuid.UUID
    agent_id: uuid.UUID
    vote: str
    reason: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class DecisionResponse(BaseModel):
    id: uuid.UUID
    session_id: uuid.UUID
    title: str
    description: str
    decision_type: str
    approved: bool
    approved_by: Optional[uuid.UUID]
    confidence: float
    reasoning: Optional[str]
    created_at: datetime
    votes: List[VoteResponse] = []

    class Config:
        from_attributes = True


class WarRoomSessionResponse(BaseModel):
    id: uuid.UUID
    project_id: uuid.UUID
    workflow_id: uuid.UUID
    title: str
    purpose: str
    status: str
    created_by: Optional[uuid.UUID]
    started_at: Optional[datetime]
    ended_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    participants: List[WarRoomParticipantResponse] = []
    decisions: List[DecisionResponse] = []

    class Config:
        from_attributes = True


class TimelineEventResponse(BaseModel):
    event: str
    message: str
    timestamp: datetime

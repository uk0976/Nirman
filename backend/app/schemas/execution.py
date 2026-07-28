import uuid
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel

class ExecutionCreateRequest(BaseModel):
    project_id: uuid.UUID
    workflow_id: uuid.UUID


class ExecutionStageResponse(BaseModel):
    id: uuid.UUID
    execution_id: uuid.UUID
    name: str
    status: str
    assigned_agent: Optional[str]
    started_at: Optional[datetime]
    completed_at: Optional[datetime]

    class Config:
        from_attributes = True


class ArtifactResponse(BaseModel):
    id: uuid.UUID
    execution_id: uuid.UUID
    type: str
    title: str
    path: str
    version: str
    created_by: Optional[uuid.UUID]
    created_at: datetime

    class Config:
        from_attributes = True


class DeliverableResponse(BaseModel):
    id: uuid.UUID
    execution_id: uuid.UUID
    category: str
    status: str
    artifact_id: Optional[uuid.UUID]
    approved: bool
    created_at: datetime

    class Config:
        from_attributes = True


class ExecutionResponse(BaseModel):
    id: uuid.UUID
    project_id: uuid.UUID
    workflow_id: uuid.UUID
    status: str
    current_stage: str
    started_at: datetime
    completed_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    stages: List[ExecutionStageResponse] = []
    artifacts: List[ArtifactResponse] = []
    deliverables: List[DeliverableResponse] = []

    class Config:
        from_attributes = True


class ExecutionTimelineEvent(BaseModel):
    event: str
    message: str
    timestamp: datetime

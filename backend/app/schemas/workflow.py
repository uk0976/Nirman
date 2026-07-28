import uuid
from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, ConfigDict, Field

# =====================================================================
# TASK SCHEMAS
# =====================================================================

class TaskResponse(BaseModel):
    id: uuid.UUID
    workflow_stage_id: uuid.UUID
    title: str
    description: Optional[str] = None
    assigned_agent_id: Optional[uuid.UUID] = None
    priority: str
    status: str
    depends_on: Optional[uuid.UUID] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class TaskCreate(BaseModel):
    workflow_stage_id: uuid.UUID = Field(..., description="Workflow Stage ID this task belongs to")
    title: str = Field(..., max_length=200)
    description: Optional[str] = None
    assigned_agent_id: Optional[uuid.UUID] = None
    priority: str = Field("Medium", description="Low, Medium, High, Critical")
    depends_on: Optional[uuid.UUID] = Field(None, description="Optional ID of parent task dependency")


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    assigned_agent_id: Optional[uuid.UUID] = None
    priority: Optional[str] = None
    depends_on: Optional[uuid.UUID] = None


class TaskUpdateStatus(BaseModel):
    status: str = Field(..., description="Pending, Ready, Assigned, Working, Waiting, Blocked, Review, Completed, Failed")


# =====================================================================
# STAGE SCHEMAS
# =====================================================================

class StageResponse(BaseModel):
    id: uuid.UUID
    workflow_id: uuid.UUID
    name: str
    order: int
    status: str
    assigned_agent_id: Optional[uuid.UUID] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    tasks: List[TaskResponse] = []

    model_config = ConfigDict(from_attributes=True)


# =====================================================================
# WORKFLOW SCHEMAS
# =====================================================================

class WorkflowResponse(BaseModel):
    id: uuid.UUID
    project_id: uuid.UUID
    name: str
    status: str
    current_stage: str
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    stages: List[StageResponse] = []

    model_config = ConfigDict(from_attributes=True)


class WorkflowCreate(BaseModel):
    project_id: uuid.UUID = Field(..., description="Project UUID to bind this workflow route to")
    name: str = Field(..., max_length=100)


class WorkflowUpdate(BaseModel):
    name: Optional[str] = None
    status: Optional[str] = None


# =====================================================================
# TIMELINE / LOGS SCHEMAS
# =====================================================================

class ExecutionResponse(BaseModel):
    id: uuid.UUID
    workflow_id: uuid.UUID
    event: str
    agent_id: Optional[uuid.UUID] = None
    message: str
    metadata_json: Dict[str, Any]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# =====================================================================
# PROGRESS RATIOS SCHEMAS
# =====================================================================

class WorkflowProgressResponse(BaseModel):
    overall_percentage: float = Field(..., description="Completed tasks over total tasks percentage")
    stage_percentage: float = Field(..., description="Completed tasks in the current active stage")
    completed_tasks: int
    remaining_tasks: int
    estimated_completion: Optional[datetime] = None

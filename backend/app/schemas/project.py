import uuid
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field

# =====================================================================
# REQUIREMENT SCHEMAS
# =====================================================================

class RequirementBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255, description="Title of the requirement")
    description: Optional[str] = Field(None, description="Detailed description of the requirement")
    type: str = Field(..., description="Type of requirement (e.g. Functional, Non-Functional, User Story)")
    priority: str = Field("Medium", description="Priority level: Low, Medium, High, Critical")
    status: str = Field("Draft", description="Status level: Draft, Approved, In Progress, Verified")

class RequirementCreate(RequirementBase):
    pass

class RequirementUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    type: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None

class RequirementResponse(RequirementBase):
    id: uuid.UUID
    project_id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# =====================================================================
# FILE SCHEMAS
# =====================================================================

class FileResponse(BaseModel):
    id: uuid.UUID
    project_id: uuid.UUID
    filename: str
    file_type: str
    file_size: int
    storage_path: str
    uploaded_by: Optional[uuid.UUID]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# =====================================================================
# ACTIVITY SCHEMAS
# =====================================================================

class ActivityResponse(BaseModel):
    id: uuid.UUID
    project_id: uuid.UUID
    user_id: Optional[uuid.UUID]
    activity: str
    metadata_json: dict
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# =====================================================================
# PROJECT SCHEMAS
# =====================================================================

class ProjectBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255, description="Name of the project")
    description: Optional[str] = Field(None, description="Detailed description of the project")
    priority: str = Field("Medium", description="Priority level: Low, Medium, High, Critical")
    technology_stack: List[str] = Field(default_factory=list, description="List of technologies (e.g. ['FastAPI', 'PostgreSQL'])")
    visibility: str = Field("private", description="Project visibility (e.g. public, private)")

class ProjectCreate(ProjectBase):
    workspace_id: Optional[uuid.UUID] = Field(None, description="Optional associated workspace UUID")

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    technology_stack: Optional[List[str]] = None
    visibility: Optional[str] = None
    status: Optional[str] = Field(None, description="Draft, Planning, Architecture, Design, Development, Testing, Deployment, Completed, Archived")
    current_phase: Optional[str] = Field(None, description="Current milestone phase")
    progress: Optional[float] = Field(None, ge=0.0, le=100.0, description="Percentage completion tracker")
    estimated_completion: Optional[datetime] = None

class ProjectResponse(ProjectBase):
    id: uuid.UUID
    owner_id: uuid.UUID
    workspace_id: Optional[uuid.UUID]
    status: str
    current_phase: str
    progress: float
    estimated_completion: Optional[datetime]
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ProjectSummaryResponse(BaseModel):
    id: uuid.UUID
    name: str
    status: str
    priority: str
    progress: float
    owner_id: uuid.UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

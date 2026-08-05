from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel, ConfigDict

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    architecture_style: Optional[str] = "MODULAR_MONOLITH"
    tech_stack: Optional[Dict[str, Any]] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    sdlc_phase: Optional[int] = None
    health_score: Optional[int] = None
    tech_stack: Optional[Dict[str, Any]] = None

class ProjectResponse(ProjectBase):
    id: str
    slug: str
    status: str
    sdlc_phase: int
    health_score: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

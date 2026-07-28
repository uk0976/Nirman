import uuid
from datetime import datetime
from typing import Dict, List, Optional
from pydantic import BaseModel, ConfigDict, Field

# =====================================================================
# AGENT METADATA SCHEMAS
# =====================================================================

class DepartmentResponse(BaseModel):
    id: uuid.UUID
    name: str
    description: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class SkillResponse(BaseModel):
    id: uuid.UUID
    name: str
    category: str
    description: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class CapabilityResponse(BaseModel):
    id: uuid.UUID
    name: str
    description: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


# =====================================================================
# AGENT SCHEMAS
# =====================================================================

class AgentResponse(BaseModel):
    id: uuid.UUID
    name: str
    display_name: str
    role: str
    department: str
    description: Optional[str] = None
    avatar: Optional[str] = None
    status: str
    availability: bool
    current_project_id: Optional[uuid.UUID] = None
    current_task_id: Optional[uuid.UUID] = None
    workload_percentage: float
    skills: List[str]
    capabilities: List[str]
    experience_level: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AgentUpdateStatus(BaseModel):
    status: str = Field(..., description="Idle, Working, Thinking, Planning, Reviewing, Coding, Testing, Deploying, Offline")


class AgentUpdateAvailability(BaseModel):
    availability: bool = Field(..., description="Flag to update availability details")


# =====================================================================
# DIAGNOSTICS/HEALTH SCHEMAS
# =====================================================================

class AgentStatusSummaryResponse(BaseModel):
    online_count: int = Field(..., description="Number of active, idle, or working agents")
    busy_count: int = Field(..., description="Number of agents currently processing assignments")
    offline_count: int = Field(..., description="Number of offline agents")
    status_distribution: Dict[str, int] = Field(..., description="Counts of agents per status option")

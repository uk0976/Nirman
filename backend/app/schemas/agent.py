from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict

class AgentResponse(BaseModel):
    id: str
    role: str
    name: str
    avatar: Optional[str] = None
    description: Optional[str] = None
    capabilities: List[str] = []
    status: str
    completed_tasks: int
    accuracy_rating: float
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class AgentUpdate(BaseModel):
    status: Optional[str] = None
    completed_tasks: Optional[int] = None
    accuracy_rating: Optional[float] = None

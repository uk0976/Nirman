from datetime import datetime
from typing import Optional, List, Any
from pydantic import BaseModel, ConfigDict

class WorkflowStepResponse(BaseModel):
    id: str
    execution_id: str
    step_number: int
    name: str
    agent_role: str
    status: str
    output: Optional[str] = None
    error: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class WorkflowExecutionResponse(BaseModel):
    id: str
    project_id: str
    name: str
    current_phase: int
    status: str
    logs: List[Any] = []
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

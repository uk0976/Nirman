import uuid
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

class StructuredAIResponse(BaseModel):
    """
    Standard structured output envelope required for every AI employee transaction.
    """
    status: str = Field(..., description="Execution status: success or failed")
    confidence: float = Field(..., description="Confidence rating from 0.0 to 1.0")
    reasoning_summary: str = Field(..., description="Chain of thought summary of reasoning steps")
    result: str = Field(..., description="The generated solution, text or source code")
    warnings: List[str] = Field(default_factory=list)
    metadata: Dict[str, Any] = Field(default_factory=dict)
    usage: Dict[str, Any] = Field(default_factory=dict)
    provider: str
    model: str
    latency: float


class AIExecuteRequest(BaseModel):
    task_title: str
    task_description: str
    context: Dict[str, Any] = Field(default_factory=dict)
    validator_types: Optional[List[str]] = None
    max_retries: int = 3
    primary_provider: str = "openai"
    workflow_id: Optional[uuid.UUID] = None
    task_id: Optional[uuid.UUID] = None


class AIChatRequest(BaseModel):
    message: str
    conversation_id: Optional[uuid.UUID] = None
    agent_role: Optional[str] = "Product Manager"
    project_id: Optional[uuid.UUID] = None


class AIReasonRequest(BaseModel):
    agent_role: str
    task_title: str
    task_description: str
    context: Dict[str, Any] = Field(default_factory=dict)


class AIStreamRequest(BaseModel):
    prompt: str
    system_prompt: Optional[str] = None
    model: Optional[str] = None

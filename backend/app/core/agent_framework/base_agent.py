from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional
from enum import Enum
from pydantic import BaseModel, Field
import uuid
import datetime

class AgentState(str, Enum):
    REGISTERED = "REGISTERED"
    INITIALIZED = "INITIALIZED"
    READY = "READY"
    ASSIGNED_TASK = "ASSIGNED_TASK"
    PLANNING = "PLANNING"
    EXECUTING = "EXECUTING"
    WAITING_DEPENDENCIES = "WAITING_DEPENDENCIES"
    WAITING_HUMAN_APPROVAL = "WAITING_HUMAN_APPROVAL"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"
    ARCHIVED = "ARCHIVED"

class AgentCapability(str, Enum):
    BUSINESS_ANALYSIS = "BUSINESS_ANALYSIS"
    PRODUCT_MANAGEMENT = "PRODUCT_MANAGEMENT"
    SYSTEM_ARCHITECTURE = "SYSTEM_ARCHITECTURE"
    DATABASE_DESIGN = "DATABASE_DESIGN"
    API_DESIGN = "API_DESIGN"
    FRONTEND_ENGINEERING = "FRONTEND_ENGINEERING"
    BACKEND_ENGINEERING = "BACKEND_ENGINEERING"
    SECURITY_AUDITING = "SECURITY_AUDITING"
    QA_TESTING = "QA_TESTING"
    DEVOPS_DEPLOYMENT = "DEVOPS_DEPLOYMENT"
    TECHNICAL_WRITING = "TECHNICAL_WRITING"

class AgentTask(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    phase: str
    assigned_agent_id: str
    input_payload: Dict[str, Any] = {}
    output_artifact: Optional[Dict[str, Any]] = None
    status: AgentState = AgentState.ASSIGNED_TASK
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)

class BaseAgent(ABC):
    def __init__(
        self,
        agent_id: str,
        name: str,
        role: str,
        description: str,
        system_prompt: str,
        capabilities: List[AgentCapability],
        allowed_tools: List[str],
        version: str = "1.0.0"
    ):
        self.agent_id = agent_id
        self.name = name
        self.role = role
        self.description = description
        self.system_prompt = system_prompt
        self.capabilities = capabilities
        self.allowed_tools = allowed_tools
        self.version = version
        self.state = AgentState.REGISTERED
        self.current_task: Optional[AgentTask] = None
        self.execution_history: List[Dict[str, Any]] = []

    def set_state(self, new_state: AgentState) -> None:
        old_state = self.state
        self.state = new_state
        self.execution_history.append({
            "timestamp": datetime.datetime.utcnow().isoformat(),
            "event": "STATE_CHANGE",
            "from_state": old_state,
            "to_state": new_state
        })

    def assign_task(self, task: AgentTask) -> None:
        self.current_task = task
        self.set_state(AgentState.ASSIGNED_TASK)

    @abstractmethod
    async def plan(self, task: AgentTask) -> Dict[str, Any]:
        """Formulate execution steps for the assigned task."""
        pass

    @abstractmethod
    async def execute(self, task: AgentTask, context: Dict[str, Any]) -> Dict[str, Any]:
        """Perform the actual core task execution and return output payload."""
        pass

    def to_dict(self) -> Dict[str, Any]:
        return {
            "agent_id": self.agent_id,
            "name": self.name,
            "role": self.role,
            "description": self.description,
            "state": self.state,
            "capabilities": [c.value for c in self.capabilities],
            "allowed_tools": self.allowed_tools,
            "version": self.version,
            "current_task": self.current_task.dict() if self.current_task else None
        }

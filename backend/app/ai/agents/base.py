import abc
from typing import Dict, Any, List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.workflow import WorkflowTask
from backend.app.ai.memory.base import MemoryManager

class BaseAgent(abc.ABC):
    def __init__(
        self,
        name: str,
        role: str,
        department: str,
        mission: str
    ):
        """
        Abstract base class defining the identity and capabilities of Nirman's AI employees.
        """
        self.name = name
        self.role = role
        self.department = department
        self.mission = mission
        self.responsibilities: List[str] = []
        self.skills: List[str] = []
        self.capabilities: List[str] = []
        self.tools: List[str] = []
        self.permissions: List[str] = []
        self.priority: str = "Medium"
        
        self.memory = MemoryManager()

    @abc.abstractmethod
    def get_system_prompt(self) -> str:
        """
        Returns the agent-specific system prompt template.
        """
        pass

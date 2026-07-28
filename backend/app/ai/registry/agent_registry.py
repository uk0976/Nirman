from typing import Dict, List, Optional, Type
from backend.app.ai.agents import (
    BaseAgent,
    CEOAgent,
    ProductManagerAgent,
    SoftwareArchitectAgent,
    UIDesignerAgent,
    FrontendEngineerAgent,
    BackendEngineerAgent,
    DatabaseEngineerAgent,
    AIEngineerAgent,
    QAEngineerAgent,
    SecurityEngineerAgent,
    DevOpsEngineerAgent,
    DocumentationEngineerAgent
)

class AgentRegistry:
    def __init__(self):
        """
        Registry container for AI employee classes, supporting discovery queries.
        """
        self.agents: Dict[str, BaseAgent] = {}
        self._auto_discover()

    def register_agent(self, key: str, agent: BaseAgent) -> None:
        """
        Manually registers an agent instance into the discovery pool.
        """
        self.agents[key] = agent

    def find_by_role(self, role: str) -> Optional[BaseAgent]:
        for agent in self.agents.values():
            if agent.role.lower() == role.lower():
                return agent
        return None

    def find_by_name(self, name: str) -> Optional[BaseAgent]:
        return self.agents.get(name)

    def find_by_department(self, department: str) -> List[BaseAgent]:
        return [a for a in self.agents.values() if a.department.lower() == department.lower()]

    def find_by_skill(self, skill: str) -> List[BaseAgent]:
        return [a for a in self.agents.values() if any(s.lower() == skill.lower() for s in a.skills)]

    def find_by_capability(self, capability: str) -> List[BaseAgent]:
        return [a for a in self.agents.values() if any(c.lower() == capability.lower() for c in a.capabilities)]

    def _auto_discover(self) -> None:
        """
        Pre-populates the registry with singleton instances of the 12 specialized agents.
        """
        specialists = [
            CEOAgent(),
            ProductManagerAgent(),
            SoftwareArchitectAgent(),
            UIDesignerAgent(),
            FrontendEngineerAgent(),
            BackendEngineerAgent(),
            DatabaseEngineerAgent(),
            AIEngineerAgent(),
            QAEngineerAgent(),
            SecurityEngineerAgent(),
            DevOpsEngineerAgent(),
            DocumentationEngineerAgent()
        ]
        for s in specialists:
            self.register_agent(s.name, s)

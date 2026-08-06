from typing import Dict, List, Optional
from app.core.agent_framework.base_agent import BaseAgent, AgentCapability, AgentState

class AgentRegistry:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(AgentRegistry, cls).__new__(cls)
            cls._instance._agents: Dict[str, BaseAgent] = {}
        return cls._instance

    def register(self, agent: BaseAgent) -> None:
        agent.set_state(AgentState.INITIALIZED)
        self._agents[agent.agent_id] = agent
        agent.set_state(AgentState.READY)

    def get_agent(self, agent_id: str) -> Optional[BaseAgent]:
        return self._agents.get(agent_id)

    def find_by_capability(self, capability: AgentCapability) -> List[BaseAgent]:
        return [
            agent for agent in self._agents.values()
            if capability in agent.capabilities
        ]

    def list_all(self) -> List[Dict]:
        return [agent.to_dict() for agent in self._agents.values()]

    def health_check(self) -> Dict[str, str]:
        return {
            agent_id: agent.state.value
            for agent_id, agent in self._agents.items()
        }

agent_registry = AgentRegistry()

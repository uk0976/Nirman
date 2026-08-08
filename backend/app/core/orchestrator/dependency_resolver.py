from typing import Dict, List, Set, Any

class DependencyResolver:
    """
    Resolves agent dependency DAGs and identifies parallel execution branches.
    """
    def __init__(self):
        self.agent_dependencies: Dict[str, List[str]] = {
            "agent-ceo-evelyn": [],
            "agent-ba-marcus": ["agent-ceo-evelyn"],
            "agent-pm-sarah": ["agent-ba-marcus"],
            "agent-arch-elena": ["agent-pm-sarah"],
            "agent-sysarch-elena": ["agent-arch-elena"],
            # Parallel Design Phase Branch
            "agent-db-david": ["agent-sysarch-elena"],
            "agent-ux-sophia": ["agent-sysarch-elena"],
            # Parallel Engineering Branch
            "agent-fe-lucas": ["agent-ux-sophia", "agent-db-david"],
            "agent-be-ethan": ["agent-db-david", "agent-sysarch-elena"],
            # Testing & Quality
            "agent-qa-rachel": ["agent-fe-lucas", "agent-be-ethan"],
            "agent-sec-devon": ["agent-qa-rachel"],
            "agent-devops-marcus": ["agent-sec-devon"],
            "agent-doc-amara": ["agent-devops-marcus"]
        }

    def get_ready_agents(self, completed_agents: Set[str]) -> List[str]:
        """Returns all agents whose dependencies are completely satisfied and have not executed yet."""
        ready = []
        for agent_id, deps in self.agent_dependencies.items():
            if agent_id not in completed_agents:
                if all(dep in completed_agents for dep in deps):
                    ready.append(agent_id)
        return ready

    def is_parallel_stage(self, ready_agents: List[str]) -> bool:
        """Determines if multiple agents can execute concurrently in parallel."""
        return len(ready_agents) > 1

dependency_resolver_instance = DependencyResolver()

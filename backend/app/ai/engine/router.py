from typing import Tuple, Optional
from backend.app.ai.agents import BaseAgent, CEOAgent, ProductManagerAgent
from backend.app.ai.registry.agent_registry import AgentRegistry

class TaskRouter:
    def __init__(self, registry: Optional[AgentRegistry] = None):
        """
        Task Router assigning tasks to the best suited AI agent based on expertise mappings.
        """
        self.registry = registry or AgentRegistry()

    def route_task(self, title: str, description: str) -> Tuple[BaseAgent, BaseAgent, str]:
        """
        Evaluates task contents and returns (Best Agent, Fallback Agent, Priority).
        """
        title_lower = title.lower()
        desc_lower = description.lower()

        # Match expertise roles
        target_role = "Product Manager" # Default fallback
        priority = "Medium"

        if "architecture" in title_lower or "design pattern" in desc_lower:
            target_role = "Software Architect"
            priority = "High"
        elif "database" in title_lower or "postgres" in desc_lower or "migration" in desc_lower:
            target_role = "Database Engineer"
            priority = "High"
        elif "frontend" in title_lower or "css" in desc_lower or "react" in desc_lower or "page" in desc_lower:
            target_role = "Frontend Engineer"
        elif "api" in title_lower or "fastapi" in desc_lower or "backend" in title_lower:
            target_role = "Backend Engineer"
        elif "wireframe" in title_lower or "figma" in desc_lower or "ui" in title_lower:
            target_role = "UI/UX Designer"
        elif "security" in title_lower or "owasp" in desc_lower or "injection" in desc_lower:
            target_role = "Security Engineer"
            priority = "Critical"
        elif "test" in title_lower or "pytest" in desc_lower or "bug" in desc_lower:
            target_role = "QA Engineer"
        elif "docker" in title_lower or "ci/cd" in desc_lower or "deployment" in title_lower:
            target_role = "DevOps Engineer"
        elif "prompt" in title_lower or "llm" in desc_lower or "rag" in desc_lower:
            target_role = "AI Engineer"
        elif "document" in title_lower or "readme" in desc_lower or "swagger" in desc_lower:
            target_role = "Documentation Engineer"
        elif "launch" in title_lower or "budget" in desc_lower or "sprint" in title_lower:
            target_role = "CEO"
            priority = "Critical"

        best_agent = self.registry.find_by_role(target_role)
        if not best_agent:
            # Fallback to general PM or CEO
            best_agent = self.registry.find_by_role("Product Manager") or ProductManagerAgent()

        # Fallback agent selection
        fallback_agent = self.registry.find_by_role("CEO") or CEOAgent()
        if best_agent.role == "CEO":
            fallback_agent = self.registry.find_by_role("Product Manager") or ProductManagerAgent()

        return best_agent, fallback_agent, priority

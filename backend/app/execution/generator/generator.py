import uuid
from typing import Dict, Any
from backend.app.ai.engine.reasoning import ReasoningEngine
from backend.app.ai.registry.agent_registry import AgentRegistry

class ArchitectureGenerator:
    def __init__(self):
        self.engine = ReasoningEngine()
        self.registry = AgentRegistry()

    async def generate_architecture(self, title: str, requirements: str) -> Dict[str, Any]:
        """
        Creates design patterns blueprints, database schemas, and folder layouts.
        """
        architect = self.registry.find_by_role("Software Architect")
        if not architect:
            return {
                "folder_structure": ["app/", "app/api/", "app/core/", "app/models/"],
                "system_architecture": "Layered Microservices Architecture",
                "api_structure": "/api/v1/auth, /api/v1/projects",
                "database_schema": "CREATE TABLE users (id UUID, email VARCHAR)"
            }

        prompt = f"Design system architecture specs for project '{title}' given: '{requirements}'."
        res = await self.engine.reason(
            agent=architect,
            task_title="System Design Blueprinting",
            task_description=prompt,
            context={"requirements": requirements}
        )

        return {
            "folder_structure": [
                "backend/",
                "backend/app/",
                "backend/app/api/",
                "backend/app/models/",
                "backend/app/services/",
                "backend/tests/"
            ],
            "system_architecture": f"Clean Architecture Layered System: {res.reasoning_summary}",
            "api_structure": "REST API boundaries matching OpenAPI 3.0 specs",
            "database_schema": "SQL database tables with indexes on foreign keys",
            "module_boundaries": "Domain driven encapsulation",
            "technology_recommendations": "FastAPI + SQLAlchemy Async Engine + PostgreSQL"
        }

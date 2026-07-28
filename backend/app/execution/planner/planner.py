import uuid
from typing import Dict, Any, List
from backend.app.ai.engine.reasoning import ReasoningEngine
from backend.app.ai.registry.agent_registry import AgentRegistry

class ProjectPlanner:
    def __init__(self):
        self.engine = ReasoningEngine()
        self.registry = AgentRegistry()

    async def generate_plan(self, requirements_text: str) -> Dict[str, Any]:
        """
        Analyzes functional requirements to size project variables and technology dependencies.
        """
        pm_agent = self.registry.find_by_role("Product Manager")
        if not pm_agent:
            # Fallback if registry fails
            return {
                "project_type": "Web Application",
                "tech_stack": ["FastAPI", "React"],
                "complexity": "Medium",
                "milestones": ["Requirements Setup", "Database Design", "API Build", "Frontend Build", "QA Sign-off"],
                "estimated_hours": 120
            }

        # Analyze using reasoning engine
        prompt = f"Analyze these requirements: '{requirements_text}' and return project type, tech stack list, complexity (Low/Medium/High), milestones, and estimated hours."
        structured_res = await self.engine.reason(
            agent=pm_agent,
            task_title="Analyze Project Requirements",
            task_description=prompt,
            context={"requirements": requirements_text}
        )

        result_text = structured_res.result.lower()

        # Parse or default project variables based on content keywords
        project_type = "Web Application"
        if "mobile" in result_text or "android" in result_text:
            project_type = "Mobile Application"
        elif "api" in result_text or "service" in result_text:
            project_type = "API Service"

        tech_stack = ["FastAPI", "Uvicorn", "PostgreSQL", "React"]
        if "sqlite" in result_text:
            tech_stack = ["FastAPI", "SQLite", "React"]

        complexity = "Medium"
        if "high" in result_text or "complex" in result_text:
            complexity = "High"
        elif "simple" in result_text or "low" in result_text:
            complexity = "Low"

        return {
            "project_type": project_type,
            "tech_stack": tech_stack,
            "complexity": complexity,
            "milestones": [
                "Requirements Verification",
                "Architecture Design Mapping",
                "Relational Database Integration",
                "FastAPI Routing Build",
                "Frontend Components Mocking",
                "Verification QA Approval"
            ],
            "estimated_hours": 150 if complexity == "High" else 80
        }

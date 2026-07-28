import uuid
from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.agent import Agent
from backend.app.models.workflow import WorkflowStage, WorkflowTask
from backend.app.services.agent_service import AgentService

class AssignmentService:
    def __init__(self, db: AsyncSession):
        """
        Service coordinating workload limits and task allocations for AI employees.
        """
        self.db = db
        self.agent_service = AgentService(db)

    async def assign_stage_automatically(self, stage: WorkflowStage) -> None:
        """
        Maps stage pipeline names to matching seeded AI employee roles and performs assignment.
        """
        mapping = {
            "Requirement Analysis": "Product Manager",
            "Planning": "CEO",
            "Architecture": "Software Architect",
            "UI Design": "UI/UX Designer",
            "Frontend Development": "Frontend Engineer",
            "Backend Development": "Backend Engineer",
            "Database Design": "Database Engineer",
            "Testing": "QA Engineer",
            "Security Review": "Security Engineer",
            "Documentation": "Documentation Engineer",
            "Deployment": "DevOps Engineer"
        }
        role_name = mapping.get(stage.name)
        if not role_name:
            return

        stmt = select(Agent).filter(Agent.role == role_name, Agent.is_active == True)
        result = await self.db.execute(stmt)
        agent = result.scalars().first()
        if agent:
            stage.assigned_agent_id = agent.id

    async def assign_task_to_agent(self, task: WorkflowTask, agent_id: uuid.UUID) -> Agent:
        """
        Gates and assigns a task to an agent. Verifies active state, availability, and workload capacity.
        """
        agent = await self.agent_service.get_agent_by_id(agent_id)
        if not agent:
            raise ValueError("Agent profile not found")

        if not agent.availability or not agent.is_active:
            raise ValueError(f"Agent {agent.display_name} is currently offline or unavailable")

        # Gating Workload Limit
        if agent.workload_percentage >= 100.0:
            raise ValueError(f"Agent {agent.display_name} has no available capacity (Workload: {agent.workload_percentage}%)")

        # Link task and recalculate workload
        await self.agent_service.assign_agent_to_task(agent.id, task.id)
        task.assigned_agent_id = agent.id
        
        # Advance status
        task.status = "Assigned"
        
        await self.db.flush()
        return agent

import uuid
from datetime import datetime
from typing import List, Optional, Dict, Any
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.models.workflow import Workflow, WorkflowStage
from backend.app.repositories.workflow_repository import WorkflowRepository
from backend.app.services.workflow_engine import WorkflowEngine
from backend.app.services.timeline_service import TimelineService
from backend.app.services.progress_service import ProgressService

class WorkflowService:
    def __init__(self, db: AsyncSession):
        """
        Service layer coordinating workflow CRUD operations and lifecycle state transitions.
        """
        self.db = db
        self.repo = WorkflowRepository(db)
        self.engine = WorkflowEngine(db)
        self.timeline_service = TimelineService(db)
        self.progress_service = ProgressService(db)

    async def create_workflow(self, project_id: uuid.UUID, name: str) -> Workflow:
        """
        Creates a new workflow in Draft state. Ensures only one active workflow exists per project.
        """
        # Constraint Gate: Only one active (Running or Paused) workflow per project
        active = await self.repo.get_active_workflow_for_project(project_id)
        if active:
            raise ValueError(f"An active workflow already exists for project {project_id}")

        workflow = Workflow(
            project_id=project_id,
            name=name,
            status="Draft",
            current_stage="Requirement Analysis"
        )
        self.db.add(workflow)
        await self.db.flush()

        # Initialize the 11 pipeline stages
        await self.engine.initialize_workflow_stages(workflow.id)
        
        await self.db.commit()
        return await self.get_workflow(workflow.id)

    async def get_workflow(self, workflow_id: uuid.UUID) -> Optional[Workflow]:
        """
        Retrieves a workflow by its ID, eager loading its stages and tasks.
        """
        return await self.repo.get_workflow_with_stages(workflow_id)

    async def list_workflows(self, skip: int = 0, limit: int = 100) -> List[Workflow]:
        """
        Lists all workflows in the system, eager loading stages and tasks.
        """
        return await self.repo.list_workflows_with_stages(skip, limit)

    async def update_workflow(self, workflow_id: uuid.UUID, name: Optional[str] = None) -> Optional[Workflow]:
        """
        Updates a workflow's general metadata. Read-only if completed.
        """
        workflow = await self.repo.get(workflow_id)
        if not workflow:
            return None

        # Constraint: Completed workflows are read-only
        if workflow.status in ["Completed", "Cancelled", "Failed"]:
            raise ValueError("Completed or terminated workflows are read-only and cannot be updated")

        if name:
            workflow.name = name

        await self.db.flush()
        await self.db.commit()
        return await self.get_workflow(workflow.id)

    async def start_workflow(self, workflow_id: uuid.UUID) -> Workflow:
        """
        Starts the workflow execution, moving status from Draft to Running.
        """
        workflow = await self.repo.get(workflow_id)
        if not workflow:
            raise ValueError("Workflow not found")

        if workflow.status != "Draft":
            raise ValueError(f"Cannot start workflow in '{workflow.status}' state")

        workflow.status = "Running"
        workflow.started_at = datetime.utcnow()

        # Set first stage started timestamp
        stages = await self.repo.get_stages_for_workflow(workflow.id)
        if stages:
            stages[0].started_at = datetime.utcnow()
            stages[0].status = "Running"

        await self.timeline_service.record_event(
            workflow_id=workflow.id,
            event="Workflow Started",
            message=f"Workflow execution started for project sprints: '{workflow.name}'."
        )

        await self.db.flush()
        await self.db.commit()
        return await self.get_workflow(workflow.id)

    async def pause_workflow(self, workflow_id: uuid.UUID) -> Workflow:
        """
        Pauses a running workflow.
        """
        workflow = await self.repo.get(workflow_id)
        if not workflow:
            raise ValueError("Workflow not found")

        if workflow.status != "Running":
            raise ValueError(f"Cannot pause workflow in '{workflow.status}' state")

        workflow.status = "Paused"

        await self.timeline_service.record_event(
            workflow_id=workflow.id,
            event="Workflow Paused",
            message="Workflow execution paused by system operator."
        )

        await self.db.flush()
        await self.db.commit()
        return await self.get_workflow(workflow.id)

    async def resume_workflow(self, workflow_id: uuid.UUID) -> Workflow:
        """
        Resumes a paused workflow.
        """
        workflow = await self.repo.get(workflow_id)
        if not workflow:
            raise ValueError("Workflow not found")

        if workflow.status != "Paused":
            raise ValueError(f"Cannot resume workflow in '{workflow.status}' state")

        workflow.status = "Running"

        await self.timeline_service.record_event(
            workflow_id=workflow.id,
            event="Workflow Resumed",
            message="Workflow execution resumed. AI agents restarted."
        )

        await self.db.flush()
        await self.db.commit()
        return await self.get_workflow(workflow.id)

    async def cancel_workflow(self, workflow_id: uuid.UUID) -> Workflow:
        """
        Cancels a workflow execution.
        """
        workflow = await self.repo.get(workflow_id)
        if not workflow:
            raise ValueError("Workflow not found")

        if workflow.status in ["Completed", "Cancelled", "Failed"]:
            raise ValueError(f"Cannot cancel a workflow that is already '{workflow.status}'")

        workflow.status = "Cancelled"
        workflow.completed_at = datetime.utcnow()

        await self.timeline_service.record_event(
            workflow_id=workflow.id,
            event="Workflow Cancelled",
            message="Workflow execution cancelled. All tasks halted."
        )

        await self.db.flush()
        await self.db.commit()
        return await self.get_workflow(workflow.id)

    async def get_progress(self, workflow_id: uuid.UUID) -> Dict[str, Any]:
        """
        Calculates the real-time progress ratios.
        """
        workflow = await self.repo.get(workflow_id)
        if not workflow:
            raise ValueError("Workflow not found")
        return await self.progress_service.calculate_progress(workflow)

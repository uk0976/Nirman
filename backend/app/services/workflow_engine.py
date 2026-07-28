import uuid
from datetime import datetime
from typing import List, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.models.workflow import Workflow, WorkflowStage, WorkflowTask
from backend.app.repositories.workflow_repository import WorkflowRepository
from backend.app.repositories.task_repository import TaskRepository
from backend.app.services.assignment_service import AssignmentService
from backend.app.services.timeline_service import TimelineService

class WorkflowEngine:
    def __init__(self, db: AsyncSession):
        """
        State machine driving progression through stages, dependency resolution, and timeline logs.
        """
        self.db = db
        self.workflow_repo = WorkflowRepository(db)
        self.task_repo = TaskRepository(db)
        self.assignment_service = AssignmentService(db)
        self.timeline_service = TimelineService(db)

    async def initialize_workflow_stages(self, workflow_id: uuid.UUID) -> None:
        """
        Initializes the 11 pipeline stages sequentially and auto-assigns active AI roles.
        """
        stages_names = [
            "Requirement Analysis",
            "Planning",
            "Architecture",
            "UI Design",
            "Frontend Development",
            "Backend Development",
            "Database Design",
            "Testing",
            "Security Review",
            "Documentation",
            "Deployment"
        ]

        for i, name in enumerate(stages_names, start=1):
            stage = WorkflowStage(
                workflow_id=workflow_id,
                name=name,
                order=i,
                status="Running" if i == 1 else "Pending"
            )
            # Automatic mapping matching default agents
            await self.assignment_service.assign_stage_automatically(stage)
            self.db.add(stage)

        await self.db.flush()

    async def resolve_dependencies_after_task_completed(self, completed_task: WorkflowTask) -> None:
        """
        Queries tasks that directly depend on the completed task and unlocks them (Blocked -> Ready/Assigned).
        """
        dependents = await self.task_repo.get_dependent_tasks(completed_task.id)
        for task in dependents:
            if task.status == "Blocked":
                task.status = "Assigned" if task.assigned_agent_id else "Ready"
                
                await self.timeline_service.record_event(
                    workflow_id=completed_task.stage.workflow_id,
                    event="Dependency Resolved",
                    message=f"Task '{task.title}' unlocked. Dependencies satisfied.",
                    agent_id=task.assigned_agent_id,
                    metadata_json={"unlocked_task_id": str(task.id), "completed_task_id": str(completed_task.id)}
                )

        await self.db.flush()

    async def evaluate_stage_progression(self, stage_id: uuid.UUID) -> None:
        """
        Evaluates task statuses in the stage. If all tasks are Completed, marks the stage completed
        and advances the workflow state to the next stage or completes the entire workflow.
        """
        # Load the stage
        stmt_stage = select(WorkflowStage).filter(WorkflowStage.id == stage_id)
        res_stage = await self.db.execute(stmt_stage)
        stage = res_stage.scalars().first()
        if not stage:
            return

        # Fetch tasks in this stage
        tasks = await self.task_repo.get_tasks_by_stage(stage_id)
        if not tasks:
            return # If no tasks are added, wait until tasks are registered to evaluate

        # Check if all tasks are Completed
        if any(t.status != "Completed" for t in tasks):
            return # At least one task is outstanding

        # 1. Complete Current Stage
        stage.status = "Completed"
        stage.completed_at = datetime.utcnow()

        await self.timeline_service.record_event(
            workflow_id=stage.workflow_id,
            event="Stage Completed",
            message=f"Pipeline Stage '{stage.name}' successfully completed.",
            agent_id=stage.assigned_agent_id
        )

        # 2. Find Workflow and check next stage
        workflow = await self.workflow_repo.get(stage.workflow_id)
        if not workflow:
            return

        # Load all stages
        all_stages = await self.workflow_repo.get_stages_for_workflow(workflow.id)
        current_index = -1
        for idx, s in enumerate(all_stages):
            if s.id == stage.id:
                current_index = idx
                break

        # 3. Transition to Next Stage or Complete Workflow
        if current_index != -1 and current_index + 1 < len(all_stages):
            # Advance to next stage in sequence
            next_stage = all_stages[current_index + 1]
            next_stage.status = "Running"
            next_stage.started_at = datetime.utcnow()

            workflow.current_stage = next_stage.name
            
            await self.timeline_service.record_event(
                workflow_id=workflow.id,
                event="Stage Started",
                message=f"Pipeline Stage '{next_stage.name}' is now active.",
                agent_id=next_stage.assigned_agent_id
            )
        else:
            # Reached final stage completion
            workflow.status = "Completed"
            workflow.current_stage = "Completed"
            workflow.completed_at = datetime.utcnow()

            await self.timeline_service.record_event(
                workflow_id=workflow.id,
                event="Workflow Completed",
                message=f"Workflow '{workflow.name}' completed all pipeline stages successfully.",
                agent_id=stage.assigned_agent_id
            )

        await self.db.flush()

import uuid
from datetime import datetime
from typing import List, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.models.workflow import WorkflowTask, WorkflowStage, Workflow
from backend.app.repositories.task_repository import TaskRepository
from backend.app.services.assignment_service import AssignmentService
from backend.app.services.timeline_service import TimelineService
from backend.app.services.workflow_engine import WorkflowEngine
from backend.app.services.agent_service import AgentService

class TaskService:
    def __init__(self, db: AsyncSession):
        """
        Service layer controlling task lifecycles, execution rules, and dependencies.
        """
        self.db = db
        self.repo = TaskRepository(db)
        self.assignment_service = AssignmentService(db)
        self.timeline_service = TimelineService(db)
        self.engine = WorkflowEngine(db)
        self.agent_service = AgentService(db)

    async def create_task(
        self,
        workflow_stage_id: uuid.UUID,
        title: str,
        description: Optional[str] = None,
        assigned_agent_id: Optional[uuid.UUID] = None,
        priority: str = "Medium",
        depends_on: Optional[uuid.UUID] = None
    ) -> WorkflowTask:
        """
        Creates a new task. Asserts stage is not completed, workflow is active, and dependencies are locked/blocked.
        """
        # 1. Fetch stage and check status
        stmt_stage = select(WorkflowStage).filter(WorkflowStage.id == workflow_stage_id)
        res_stage = await self.db.execute(stmt_stage)
        stage = res_stage.scalars().first()
        if not stage:
            raise ValueError("Workflow stage not found")

        if stage.status == "Completed":
            raise ValueError("Completed stages cannot be edited or accept new tasks")

        # 2. Fetch workflow and verify status
        stmt_wf = select(Workflow).filter(Workflow.id == stage.workflow_id)
        res_wf = await self.db.execute(stmt_wf)
        workflow = res_wf.scalars().first()
        if not workflow or workflow.status in ["Completed", "Cancelled", "Failed"]:
            raise ValueError("Associated workflow is completed or read-only")

        # 3. Determine initial status based on dependencies
        initial_status = "Ready"
        if depends_on:
            parent_task = await self.repo.get(depends_on)
            if not parent_task:
                raise ValueError(f"Dependency parent task {depends_on} not found")
            if parent_task.status != "Completed":
                initial_status = "Blocked"

        # 4. Construct Task
        task = WorkflowTask(
            workflow_stage_id=workflow_stage_id,
            title=title,
            description=description,
            priority=priority,
            status=initial_status,
            depends_on=depends_on
        )
        self.db.add(task)
        await self.db.flush()

        # 5. Handle Agent Assignment if provided
        if assigned_agent_id and initial_status != "Blocked":
            await self.assignment_service.assign_task_to_agent(task, assigned_agent_id)
            
            await self.timeline_service.record_event(
                workflow_id=workflow.id,
                event="Task Assigned",
                message=f"Task '{task.title}' assigned to agent.",
                agent_id=assigned_agent_id,
                metadata_json={"task_id": str(task.id)}
            )
        elif assigned_agent_id and initial_status == "Blocked":
            # Link ID but keep Blocked status
            task.assigned_agent_id = assigned_agent_id

        await self.timeline_service.record_event(
            workflow_id=workflow.id,
            event="Task Created",
            message=f"Task '{task.title}' added to stage '{stage.name}' with status '{task.status}'.",
            agent_id=assigned_agent_id,
            metadata_json={"task_id": str(task.id)}
        )

        await self.db.commit()
        await self.db.refresh(task)
        return task

    async def get_task(self, task_id: uuid.UUID) -> Optional[WorkflowTask]:
        """
        Retrieves a single task by ID.
        """
        return await self.repo.get(task_id)

    async def list_tasks(self, skip: int = 0, limit: int = 100) -> List[WorkflowTask]:
        """
        Lists tasks.
        """
        return await self.repo.get_all(skip, limit)

    async def update_task(
        self,
        task_id: uuid.UUID,
        title: Optional[str] = None,
        description: Optional[str] = None,
        assigned_agent_id: Optional[uuid.UUID] = None,
        priority: Optional[str] = None,
        depends_on: Optional[uuid.UUID] = None
    ) -> Optional[WorkflowTask]:
        """
        Updates task fields. Respects read-only workflow constraints.
        """
        task = await self.repo.get(task_id)
        if not task:
            return None

        # Fetch stage and check completed state
        stmt_stage = select(WorkflowStage).filter(WorkflowStage.id == task.workflow_stage_id)
        res_stage = await self.db.execute(stmt_stage)
        stage = res_stage.scalars().first()
        if stage and stage.status == "Completed":
            raise ValueError("Tasks in completed stages cannot be modified")

        if title:
            task.title = title
        if description:
            task.description = description
        if priority:
            task.priority = priority
        if depends_on:
            task.depends_on = depends_on
            # Recalculate Blocked status
            parent_task = await self.repo.get(depends_on)
            if parent_task and parent_task.status != "Completed":
                task.status = "Blocked"

        if assigned_agent_id and assigned_agent_id != task.assigned_agent_id:
            await self.assignment_service.assign_task_to_agent(task, assigned_agent_id)

        await self.db.flush()
        await self.db.commit()
        await self.db.refresh(task)
        return task

    async def update_task_status(self, task_id: uuid.UUID, new_status: str) -> Optional[WorkflowTask]:
        """
        Transitions a task's status. Handles dependency unlocks and stage progression when completed.
        """
        task = await self.repo.get(task_id)
        if not task:
            return None

        # Fetch stage
        stmt_stage = select(WorkflowStage).filter(WorkflowStage.id == task.workflow_stage_id)
        res_stage = await self.db.execute(stmt_stage)
        stage = res_stage.scalars().first()
        if stage and stage.status == "Completed":
            raise ValueError("Tasks inside completed stages cannot be modified")

        # Business Rule: Blocked tasks cannot start
        if task.status == "Blocked" and new_status not in ["Blocked", "Pending"]:
            raise ValueError(f"Task '{task.title}' is currently blocked by parent dependencies and cannot start")

        old_status = task.status
        task.status = new_status

        if new_status == "Working" and old_status != "Working":
            task.started_at = datetime.utcnow()
            
            # If agent is assigned, set them to Working status
            if task.assigned_agent_id:
                # Update status of agent
                from backend.app.schemas.agent import AgentUpdateStatus
                await self.agent_service.update_agent_status(task.assigned_agent_id, AgentUpdateStatus(status="Working"))

        elif new_status == "Completed" and old_status != "Completed":
            task.completed_at = datetime.utcnow()
            
            # Log event
            await self.timeline_service.record_event(
                workflow_id=stage.workflow_id,
                event="Task Completed",
                message=f"Task '{task.title}' completed.",
                agent_id=task.assigned_agent_id,
                metadata_json={"task_id": str(task.id)}
            )

            # Release Agent workload by unlinking the completed task
            if task.assigned_agent_id:
                await self.agent_service.assign_agent_to_task(task.assigned_agent_id, None)
                # Set agent back to Idle
                from backend.app.schemas.agent import AgentUpdateStatus
                await self.agent_service.update_agent_status(task.assigned_agent_id, AgentUpdateStatus(status="Idle"))

            # Trigger downstream engines
            await self.engine.resolve_dependencies_after_task_completed(task)
            await self.engine.evaluate_stage_progression(task.workflow_stage_id)

        await self.db.flush()
        await self.db.commit()
        await self.db.refresh(task)
        return task

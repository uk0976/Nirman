import uuid
from typing import List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.workflow import WorkflowTask

class TaskGenerator:
    @staticmethod
    async def create_sprint_tasks(
        workflow_id: uuid.UUID,
        stage_id: uuid.UUID,
        milestones: List[str],
        db: AsyncSession
    ) -> List[WorkflowTask]:
        """
        Populates a set of dependent implementation tasks assigned to specific specialists.
        """
        tasks = []
        
        # We can map standard milestones to tasks and link dependencies sequentially
        prev_task_id = None
        for idx, milestone in enumerate(milestones):
            task = WorkflowTask(
                stage_id=stage_id,
                title=f"Implement Milestone: {milestone}",
                description=f"Detailed implementation requirements for {milestone}",
                assigned_agent_id=None, # Router assigns agent
                status="Pending",
                priority="High" if idx == 0 else "Medium",
                estimated_hours=12.5,
                dependency_task_id=prev_task_id
            )
            db.add(task)
            tasks.append(task)
            await db.flush()
            prev_task_id = task.id

        return tasks

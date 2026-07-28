import uuid
from datetime import datetime, timedelta
from typing import Dict, Any
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.workflow import Workflow, WorkflowTask, WorkflowStage

class ProgressService:
    def __init__(self, db: AsyncSession):
        """
        Service layer calculating tasks completion statistics and progression percentages.
        """
        self.db = db

    async def calculate_progress(self, workflow: Workflow) -> Dict[str, Any]:
        """
        Calculates task ratios overall and within the current active stage.
        """
        # Fetch all stages for the workflow
        stmt_stages = select(WorkflowStage).filter(WorkflowStage.workflow_id == workflow.id)
        res_stages = await self.db.execute(stmt_stages)
        stages = res_stages.scalars().all()

        total_tasks = 0
        completed_tasks = 0

        active_stage_tasks_count = 0
        active_stage_completed_count = 0

        for stage in stages:
            # Query tasks directly using SQL statements to avoid async greenlet lazy-loading errors
            stmt_tasks = select(WorkflowTask).filter(WorkflowTask.workflow_stage_id == stage.id)
            res_tasks = await self.db.execute(stmt_tasks)
            tasks = res_tasks.scalars().all()

            total_tasks += len(tasks)
            for t in tasks:
                if t.status == "Completed":
                    completed_tasks += 1

            if stage.name == workflow.current_stage:
                active_stage_tasks_count = len(tasks)
                for t in tasks:
                    if t.status == "Completed":
                        active_stage_completed_count += 1

        overall_percentage = (completed_tasks / total_tasks * 100.0) if total_tasks > 0 else 0.0
        if workflow.status == "Completed":
            overall_percentage = 100.0

        stage_percentage = (active_stage_completed_count / active_stage_tasks_count * 100.0) if active_stage_tasks_count > 0 else 0.0
        if workflow.status == "Completed":
            stage_percentage = 100.0

        # Basic estimation: 14 days from creation
        estimated_completion = None
        if workflow.created_at:
            estimated_completion = workflow.created_at + timedelta(days=14)

        return {
            "overall_percentage": round(overall_percentage, 2),
            "stage_percentage": round(stage_percentage, 2),
            "completed_tasks": completed_tasks,
            "remaining_tasks": max(0, total_tasks - completed_tasks),
            "estimated_completion": estimated_completion
        }

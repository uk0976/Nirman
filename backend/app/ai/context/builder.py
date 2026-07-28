import uuid
from typing import Dict, Any, List, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.project import Project, ProjectRequirement, ProjectFile
from backend.app.models.workflow import Workflow, WorkflowStage, WorkflowExecution

class ContextBuilder:
    def __init__(self, db: AsyncSession):
        """
        Gathers system contexts (project settings, specifications, requirements, history).
        """
        self.db = db

    async def build_context_for_project(self, project_id: uuid.UUID) -> Dict[str, Any]:
        """
        Assembles all active database specifications for the target project.
        """
        # Load Project
        stmt_proj = select(Project).filter(Project.id == project_id)
        res_proj = await self.db.execute(stmt_proj)
        project = res_proj.scalars().first()
        if not project:
            return {}

        # Load Requirements
        stmt_reqs = select(ProjectRequirement).filter(ProjectRequirement.project_id == project_id)
        res_reqs = await self.db.execute(stmt_reqs)
        requirements = res_reqs.scalars().all()

        # Load Files
        stmt_files = select(ProjectFile).filter(ProjectFile.project_id == project_id)
        res_files = await self.db.execute(stmt_files)
        files = res_files.scalars().all()

        # Load active workflow and timeline
        stmt_wf = select(Workflow).filter(Workflow.project_id == project_id, Workflow.status == "Running")
        res_wf = await self.db.execute(stmt_wf)
        wf = res_wf.scalars().first()

        timeline = []
        if wf:
            stmt_exec = select(WorkflowExecution).filter(WorkflowExecution.workflow_id == wf.id).order_by(WorkflowExecution.created_at.asc())
            res_exec = await self.db.execute(stmt_exec)
            timeline = res_exec.scalars().all()

        return {
            "project_name": project.name,
            "technology_stack": project.technology_stack,
            "requirements": [r.title for r in requirements],
            "files": [f.filename for f in files],
            "workflow_stage": wf.current_stage if wf else "No active workflow",
            "timeline_events": [item.message for item in timeline]
        }

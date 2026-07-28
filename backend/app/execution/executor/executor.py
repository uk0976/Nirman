import uuid
from datetime import datetime
from typing import Dict, Any, List, Optional
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.models.execution import Execution, ExecutionStage, Artifact, Deliverable
from backend.app.models.project import Project
from backend.app.models.workflow import Workflow
from backend.app.execution.planner.planner import ProjectPlanner
from backend.app.execution.generator.generator import ArchitectureGenerator
from backend.app.execution.generator.task_gen import TaskGenerator
from backend.app.execution.verification.verification import VerificationEngine
from backend.app.warroom.coordinator import WarRoomCoordinator

class ExecutionEngine:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def start_execution(self, project_id: uuid.UUID, workflow_id: uuid.UUID) -> Execution:
        """
        Starts an autonomous execution run and seeds the 14 pipeline stages.
        """
        # Create Execution
        execution = Execution(
            project_id=project_id,
            workflow_id=workflow_id,
            status="Running",
            current_stage="Requirement Analysis"
        )
        self.db.add(execution)
        await self.db.flush()

        # Seed 14 pipeline stages
        stages_list = [
            "Requirement Analysis", "Business Analysis", "Project Planning", "Architecture",
            "Database Design", "API Design", "Frontend Implementation", "Backend Implementation",
            "Testing", "Security Review", "Documentation", "Packaging", "Final Approval", "Completed"
        ]

        for idx, stage_name in enumerate(stages_list):
            stage = ExecutionStage(
                execution_id=execution.id,
                name=stage_name,
                status="Running" if idx == 0 else "Pending",
                started_at=datetime.utcnow() if idx == 0 else None,
                assigned_agent=self._assign_agent_role_for_stage(stage_name)
            )
            self.db.add(stage)

        await self.db.flush()
        return await self.get_execution_with_relations(execution.id)

    async def advance_stage(self, execution_id: uuid.UUID) -> Execution:
        """
        Validates the current running stage's deliverables, triggers War Room gates if needed,
        and transitions progress to the next stage.
        """
        execution = await self.get_execution_with_relations(execution_id)
        if not execution:
            raise ValueError("Execution not found")

        if execution.status != "Running":
            return execution

        # Find current running stage
        current_stage = next((s for s in execution.stages if s.status == "Running"), None)
        if not current_stage:
            return execution

        # 1. Run Verification checks on deliverables
        val_result = await VerificationEngine.validate_stage_deliverables(
            execution_id=execution_id,
            stage_name=current_stage.name,
            db=self.db
        )

        if not val_result["valid"]:
            # Check if this requires a War Room review gate
            requires_warroom = current_stage.name in ["Architecture", "Database Design", "Security Review"]
            if requires_warroom:
                # Pause execution and request a War Room Session
                execution.status = "Paused"
                
                # Start War Room
                coordinator = WarRoomCoordinator(self.db)
                warroom_sess = await coordinator.create_session(
                    project_id=execution.project_id,
                    workflow_id=execution.workflow_id,
                    title=f"{current_stage.name} Approval Gate",
                    purpose=f"Debating deliverables approvals: {val_result['reason']}"
                )
                await coordinator.invite_agents(warroom_sess.id)
                await coordinator.start_discussion(warroom_sess.id)
                
                await self.db.flush()
                return execution
            else:
                # Bypassed or failed simple check
                current_stage.status = "Failed"
                execution.status = "Paused"
                await self.db.flush()
                return execution

        # 2. Advance to the next stage
        current_stage.status = "Completed"
        current_stage.completed_at = datetime.utcnow()

        stages_sorted = sorted(execution.stages, key=lambda s: self._get_stage_index(s.name))
        current_idx = self._get_stage_index(current_stage.name)
        next_idx = current_idx + 1

        if next_idx < len(stages_sorted):
            next_stage = stages_sorted[next_idx]
            next_stage.status = "Running"
            next_stage.started_at = datetime.utcnow()
            execution.current_stage = next_stage.name

            # If the next stage is 'Completed' (the end of the pipeline), finalize execution
            if next_stage.name == "Completed":
                next_stage.status = "Completed"
                next_stage.completed_at = datetime.utcnow()
                execution.status = "Completed"
                execution.completed_at = datetime.utcnow()
        else:
            execution.status = "Completed"
            execution.completed_at = datetime.utcnow()

        await self.db.flush()
        return await self.get_execution_with_relations(execution_id)

    async def generate_stage_artifact(
        self,
        execution_id: uuid.UUID,
        artifact_type: str,
        title: str,
        path: str,
        created_by: Optional[uuid.UUID] = None
    ) -> Artifact:
        """
        Creates an execution artifact and automatically spawns a corresponding deliverable.
        """
        # Save Artifact
        artifact = Artifact(
            execution_id=execution_id,
            type=artifact_type,
            title=title,
            path=path,
            created_by=created_by
        )
        self.db.add(artifact)
        await self.db.flush()

        # Create matching checklist Deliverable
        category_map = {
            "Architecture": "Architecture",
            "API": "API",
            "Database": "Database",
            "UI": "Frontend",
            "Testing": "Testing",
            "Security": "Security"
        }
        category = category_map.get(artifact_type, "Documentation")

        deliverable = Deliverable(
            execution_id=execution_id,
            category=category,
            status="Completed",
            artifact_id=artifact.id,
            approved=True # Auto-approved for simulation purposes
        )
        self.db.add(deliverable)
        await self.db.flush()
        return artifact

    async def pause_execution(self, execution_id: uuid.UUID) -> Execution:
        stmt = select(Execution).filter(Execution.id == execution_id)
        res = await self.db.execute(stmt)
        execution = res.scalars().first()
        if execution and execution.status == "Running":
            execution.status = "Paused"
            await self.db.flush()
        return await self.get_execution_with_relations(execution_id)

    async def resume_execution(self, execution_id: uuid.UUID) -> Execution:
        stmt = select(Execution).filter(Execution.id == execution_id)
        res = await self.db.execute(stmt)
        execution = res.scalars().first()
        if execution and execution.status == "Paused":
            execution.status = "Running"
            await self.db.flush()
            # Try to advance if it was paused on a gate
            await self.advance_stage(execution_id)
        return await self.get_execution_with_relations(execution_id)

    async def cancel_execution(self, execution_id: uuid.UUID) -> Execution:
        stmt = select(Execution).filter(Execution.id == execution_id)
        res = await self.db.execute(stmt)
        execution = res.scalars().first()
        if execution:
            execution.status = "Cancelled"
            execution.completed_at = datetime.utcnow()
            # Set running stages to Failed
            stmt_stages = select(ExecutionStage).filter(
                ExecutionStage.execution_id == execution_id,
                ExecutionStage.status == "Running"
            )
            res_stages = await self.db.execute(stmt_stages)
            for stage in res_stages.scalars().all():
                stage.status = "Failed"
                stage.completed_at = datetime.utcnow()
            await self.db.flush()
        return await self.get_execution_with_relations(execution_id)

    async def get_execution_with_relations(self, execution_id: uuid.UUID) -> Optional[Execution]:
        stmt = select(Execution).filter(Execution.id == execution_id).options(
            selectinload(Execution.stages),
            selectinload(Execution.artifacts),
            selectinload(Execution.deliverables)
        )
        res = await self.db.execute(stmt)
        return res.scalars().first()

    def _assign_agent_role_for_stage(self, stage_name: str) -> str:
        mapping = {
            "Requirement Analysis": "Product Manager",
            "Business Analysis": "Product Manager",
            "Project Planning": "Product Manager",
            "Architecture": "Software Architect",
            "Database Design": "Database Engineer",
            "API Design": "Software Architect",
            "Frontend Implementation": "Frontend Engineer",
            "Backend Implementation": "Backend Engineer",
            "Testing": "QA Engineer",
            "Security Review": "Security Engineer",
            "Documentation": "Documentation Engineer",
            "Packaging": "DevOps",
            "Final Approval": "CEO"
        }
        return mapping.get(stage_name, "CEO")

    def _get_stage_index(self, name: str) -> int:
        stages_list = [
            "Requirement Analysis", "Business Analysis", "Project Planning", "Architecture",
            "Database Design", "API Design", "Frontend Implementation", "Backend Implementation",
            "Testing", "Security Review", "Documentation", "Packaging", "Final Approval", "Completed"
        ]
        try:
            return stages_list.index(name)
        except ValueError:
            return 99

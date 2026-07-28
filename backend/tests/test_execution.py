import uuid
import pytest
from httpx import AsyncClient
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.models.project import Project
from backend.app.models.workflow import Workflow
from backend.app.models.execution import Execution, ExecutionStage, Artifact, Deliverable
from backend.app.models.warroom import WarRoomSession
from backend.app.execution.planner.planner import ProjectPlanner
from backend.app.execution.generator.generator import ArchitectureGenerator
from backend.app.execution.generator.task_gen import TaskGenerator
from backend.app.execution.verification.verification import VerificationEngine
from backend.app.execution.executor.executor import ExecutionEngine

@pytest.fixture(scope="function", autouse=True)
async def seed_agents_for_execution(db_session: AsyncSession):
    """
    Seeds the 12 default agents in the test database.
    """
    from backend.app.services.agent_service import AgentService
    service = AgentService(db_session)
    await service.seed_agents_database_if_empty()


@pytest.fixture(scope="function")
async def seed_sandbox_data(db_session: AsyncSession):
    """
    Seeds a project and workflow to test integrations.
    """
    project = Project(
        owner_id=uuid.uuid4(),
        name="Inventory Control API",
        description="Build Inventory API with SQLite",
        technology_stack=["FastAPI", "React"]
    )
    db_session.add(project)
    await db_session.flush()

    workflow = Workflow(
        project_id=project.id,
        name="Sprint 1 Build workflow",
        status="Running",
        current_stage="Requirement Analysis"
    )
    db_session.add(workflow)
    await db_session.flush()
    await db_session.commit()
    return project, workflow


@pytest.mark.anyio
async def test_project_planner_and_architecture_generators():
    planner = ProjectPlanner()
    arch_gen = ArchitectureGenerator()

    # 1. Project Planner Analysis
    plan = await planner.generate_plan("Build high complexity Mobile warehouse app using postgres")
    assert plan["project_type"] == "Mobile Application"
    assert plan["complexity"] == "High"
    assert len(plan["tech_stack"]) > 0
    assert len(plan["milestones"]) > 0

    # 2. Architecture Generator specs
    arch = await arch_gen.generate_architecture("Warehouse specs", "Need backend API and postgres setup")
    assert "backend/" in arch["folder_structure"]
    assert "technology_recommendations" in arch
    assert "database_schema" in arch


@pytest.mark.anyio
async def test_execution_lifecycle_and_quality_gates(db_session: AsyncSession, seed_sandbox_data):
    project, workflow = seed_sandbox_data
    engine = ExecutionEngine(db_session)

    # 1. Start execution
    execution = await engine.start_execution(project.id, workflow.id)
    assert execution.status == "Running"
    assert execution.current_stage == "Requirement Analysis"
    assert len(execution.stages) == 14

    # Requirement Analysis has no strict gate requirements, advance moves it forward
    execution = await engine.advance_stage(execution.id)
    assert execution.current_stage == "Business Analysis"

    # Business Analysis has no strict gates, advance moves to Project Planning
    execution = await engine.advance_stage(execution.id)
    assert execution.current_stage == "Project Planning"

    # Planning has no strict gates, advance moves to Architecture
    execution = await engine.advance_stage(execution.id)
    assert execution.current_stage == "Architecture"

    # Architecture stage requires "Architecture" deliverable.
    # Advancing without it should automatically trigger a War Room session and pause the execution!
    execution = await engine.advance_stage(execution.id)
    assert execution.status == "Paused"

    # Verify a War Room session was successfully spawned
    stmt_wr = select(WarRoomSession).filter(WarRoomSession.workflow_id == workflow.id)
    res_wr = await db_session.execute(stmt_wr)
    wr_session = res_wr.scalars().first()
    assert wr_session is not None
    assert "Architecture Approval Gate" in wr_session.title

    # Generate the required Architecture artifact to pass the gate
    await engine.generate_stage_artifact(
        execution_id=execution.id,
        artifact_type="Architecture",
        title="Folder specs layout",
        path="/docs/arch.md"
    )

    # Resume the execution
    execution = await engine.resume_execution(execution.id)
    assert execution.status == "Running"
    assert execution.current_stage == "Database Design" # Advanced past Architecture!


@pytest.mark.anyio
async def test_execution_pause_cancel_controls(db_session: AsyncSession, seed_sandbox_data):
    project, workflow = seed_sandbox_data
    engine = ExecutionEngine(db_session)

    execution = await engine.start_execution(project.id, workflow.id)
    assert execution.status == "Running"

    # Pause
    await engine.pause_execution(execution.id)
    assert execution.status == "Paused"

    # Resume
    await engine.resume_execution(execution.id)
    assert execution.status == "Running"

    # Cancel
    await engine.cancel_execution(execution.id)
    assert execution.status == "Cancelled"


@pytest.mark.anyio
async def test_execution_rest_endpoints(client: AsyncClient, seed_sandbox_data):
    project, workflow = seed_sandbox_data

    # 1. Start execution
    payload = {
        "project_id": str(project.id),
        "workflow_id": str(workflow.id)
    }
    res_start = await client.post("/api/v1/execution/start", json=payload)
    assert res_start.status_code == 200
    exec_data = res_start.json()
    assert exec_data["status"] == "Running"
    assert len(exec_data["stages"]) == 14

    exec_id = exec_data["id"]

    # 2. Get Execution status
    res_get = await client.get(f"/api/v1/execution/{exec_id}")
    assert res_get.status_code == 200
    assert res_get.json()["current_stage"] == "Requirement Analysis"

    # 3. Pause endpoint
    res_pause = await client.post(f"/api/v1/execution/{exec_id}/pause")
    assert res_pause.status_code == 200
    assert res_pause.json()["status"] == "Paused"

    # 4. Resume endpoint
    res_resume = await client.post(f"/api/v1/execution/{exec_id}/resume")
    assert res_resume.status_code == 200
    assert res_resume.json()["status"] == "Running"

    # 5. Cancel endpoint
    res_cancel = await client.post(f"/api/v1/execution/{exec_id}/cancel")
    assert res_cancel.status_code == 200
    assert res_cancel.json()["status"] == "Cancelled"

    # 6. Fetch artifacts list
    res_art = await client.get(f"/api/v1/execution/{exec_id}/artifacts")
    assert res_art.status_code == 200
    assert isinstance(res_art.json(), list)

    # 7. Fetch deliverables checklist
    res_del = await client.get(f"/api/v1/execution/{exec_id}/deliverables")
    assert res_del.status_code == 200
    assert isinstance(res_del.json(), list)

    # 8. Fetch timeline logs
    res_time = await client.get(f"/api/v1/execution/{exec_id}/timeline")
    assert res_time.status_code == 200
    assert len(res_time.json()) == 14

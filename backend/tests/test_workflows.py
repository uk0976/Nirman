import uuid
import pytest
from httpx import AsyncClient
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.core.database import get_db
from backend.app.models.agent import Agent
from backend.app.models.workflow import Workflow, WorkflowStage, WorkflowTask
from backend.app.services.agent_service import AgentService
from backend.tests.test_projects import register_and_login

@pytest.fixture(scope="function", autouse=True)
async def seed_agents_for_workflow(db_session: AsyncSession):
    """
    Guarantees AI employee catalog is fully populated before running workflows tests.
    """
    service = AgentService(db_session)
    await service.seed_agents_database_if_empty()


@pytest.mark.anyio
async def test_workflow_creation_and_gating(client: AsyncClient):
    token = await register_and_login(client, "wf_owner@nirman.ai")
    headers = {"Authorization": f"Bearer {token}"}

    # 1. Create Project
    proj_resp = await client.post("/api/v1/projects/", json={
        "name": "Nirman Core Framework Build",
        "technology_stack": ["FastAPI", "React"]
    }, headers=headers)
    project_id = proj_resp.json()["id"]

    # 2. Create Workflow (Draft state)
    wf_resp = await client.post("/api/v1/workflows/", json={
        "project_id": project_id,
        "name": "Sprint 1 Orchestration Route"
    }, headers=headers)
    assert wf_resp.status_code == 201
    workflow = wf_resp.json()
    assert workflow["status"] == "Draft"
    assert workflow["current_stage"] == "Requirement Analysis"
    assert len(workflow["stages"]) == 11

    # 3. Assert Stages are sequential and auto-assigned
    stages = workflow["stages"]
    assert stages[0]["name"] == "Requirement Analysis"
    assert stages[0]["status"] == "Running" # Initial active stage
    assert stages[0]["assigned_agent_id"] is not None # Bob (PM) auto-assigned
    assert stages[1]["name"] == "Planning"
    assert stages[1]["status"] == "Pending"

    # 4. Attempt to create another active workflow on the same project (must fail)
    # Since the first workflow is Draft, it doesn't block yet (only Running or Paused blocks).
    # Let's start the first workflow first.
    start_resp = await client.post(f"/api/v1/workflows/{workflow['id']}/start", headers=headers)
    assert start_resp.status_code == 200
    assert start_resp.json()["status"] == "Running"

    # Now create another workflow on the same project (must fail with 400 Bad Request)
    fail_resp = await client.post("/api/v1/workflows/", json={
        "project_id": project_id,
        "name": "Sprint 2 Conflict Route"
    }, headers=headers)
    assert fail_resp.status_code == 400
    assert "active workflow already exists" in fail_resp.json()["detail"]


@pytest.mark.anyio
async def test_task_assignment_and_workload_gating(client: AsyncClient, db_session: AsyncSession):
    token = await register_and_login(client, "wf_gate@nirman.ai")
    headers = {"Authorization": f"Bearer {token}"}

    # 1. Create project & workflow
    proj_resp = await client.post("/api/v1/projects/", json={
        "name": "Workload Bounds Check",
        "technology_stack": ["FastAPI"]
    }, headers=headers)
    project_id = proj_resp.json()["id"]

    wf_resp = await client.post("/api/v1/workflows/", json={
        "project_id": project_id,
        "name": "Sprint 1 Workload"
    }, headers=headers)
    workflow_id = wf_resp.json()["id"]
    stage_id = wf_resp.json()["stages"][0]["id"]

    # Start workflow so agents become active
    await client.post(f"/api/v1/workflows/{workflow_id}/start", headers=headers)

    # 2. Get Charlie's ID (Software Architect)
    res_agents = await db_session.execute(select(Agent).filter(Agent.name == "Charlie"))
    charlie = res_agents.scalars().first()
    assert charlie is not None

    # Simulate Charlie already assigned to project
    agent_service = AgentService(db_session)
    await agent_service.assign_agent_to_project(charlie.id, uuid.UUID(project_id))

    # 3. Create Task 1 assigned to Charlie
    task_resp_1 = await client.post("/api/v1/tasks/", json={
        "workflow_stage_id": stage_id,
        "title": "Design Microservices Topology",
        "description": "Establish communication boundaries",
        "assigned_agent_id": str(charlie.id),
        "priority": "High"
    }, headers=headers)
    assert task_resp_1.status_code == 201
    task1 = task_resp_1.json()
    assert task1["status"] == "Assigned"

    # Charlie is now assigned to a project (40%) and a task (60%) = 100% Workload
    # 4. Attempt to assign Task 2 to Charlie (must fail with 400 Bad Request)
    task_resp_2 = await client.post("/api/v1/tasks/", json={
        "workflow_stage_id": stage_id,
        "title": "Design Database Schema ERD",
        "assigned_agent_id": str(charlie.id),
        "priority": "High"
    }, headers=headers)
    assert task_resp_2.status_code == 400
    assert "no available capacity" in task_resp_2.json()["detail"]


@pytest.mark.anyio
async def test_dependency_resolution_and_timeline(client: AsyncClient):
    token = await register_and_login(client, "wf_dep@nirman.ai")
    headers = {"Authorization": f"Bearer {token}"}

    # 1. Create project & workflow
    proj_resp = await client.post("/api/v1/projects/", json={
        "name": "Dependency Flow Check",
        "technology_stack": ["FastAPI"]
    }, headers=headers)
    project_id = proj_resp.json()["id"]

    wf_resp = await client.post("/api/v1/workflows/", json={
        "project_id": project_id,
        "name": "Sprint 1 Dependencies"
    }, headers=headers)
    workflow_id = wf_resp.json()["id"]
    stage_id = wf_resp.json()["stages"][0]["id"]

    # Start workflow
    await client.post(f"/api/v1/workflows/{workflow_id}/start", headers=headers)

    # 2. Add Task A
    task_a_resp = await client.post("/api/v1/tasks/", json={
        "workflow_stage_id": stage_id,
        "title": "Task A: Write PRD Specs",
        "priority": "Medium"
    }, headers=headers)
    task_a_id = task_a_resp.json()["id"]

    # 3. Add Task B depending on Task A
    task_b_resp = await client.post("/api/v1/tasks/", json={
        "workflow_stage_id": stage_id,
        "title": "Task B: Architecture Mapping",
        "depends_on": task_a_id,
        "priority": "Medium"
    }, headers=headers)
    task_b = task_b_resp.json()
    assert task_b["status"] == "Blocked" # Blocked because Task A is Pending

    # 4. Attempt to start Task B directly (must fail)
    start_fail_resp = await client.patch(
        f"/api/v1/tasks/{task_b['id']}/status",
        json={"status": "Working"},
        headers=headers
    )
    assert start_fail_resp.status_code == 400
    assert "blocked by parent dependencies" in start_fail_resp.json()["detail"]

    # 5. Complete Task A
    complete_a_resp = await client.patch(
        f"/api/v1/tasks/{task_a_id}/status",
        json={"status": "Completed"},
        headers=headers
    )
    assert complete_a_resp.status_code == 200

    # 6. Verify Task B is unlocked (Blocked -> Ready)
    task_b_after = await client.get(f"/api/v1/tasks/{task_b['id']}", headers=headers)
    assert task_b_after.json()["status"] == "Ready"

    # 7. Check Timeline Execution logs
    timeline_resp = await client.get(f"/api/v1/workflows/{workflow_id}/timeline", headers=headers)
    assert timeline_resp.status_code == 200
    timeline = timeline_resp.json()
    events = [item["event"] for item in timeline]
    assert "Dependency Resolved" in events
    assert "Task Completed" in events


@pytest.mark.anyio
async def test_progress_calculation_and_stage_progression(client: AsyncClient, db_session: AsyncSession):
    token = await register_and_login(client, "wf_prog@nirman.ai")
    headers = {"Authorization": f"Bearer {token}"}

    # 1. Create project & workflow
    proj_resp = await client.post("/api/v1/projects/", json={
        "name": "SDLC Pipeline Progression Check",
        "technology_stack": ["FastAPI", "React"]
    }, headers=headers)
    project_id = proj_resp.json()["id"]

    wf_resp = await client.post("/api/v1/workflows/", json={
        "project_id": project_id,
        "name": "Sprint 1 Sprints"
    }, headers=headers)
    workflow_id = wf_resp.json()["id"]
    stages = wf_resp.json()["stages"]
    stage_1_id = stages[0]["id"]
    stage_2_id = stages[1]["id"]

    # Start workflow
    await client.post(f"/api/v1/workflows/{workflow_id}/start", headers=headers)

    # 2. Add two tasks in Stage 1
    t1_resp = await client.post("/api/v1/tasks/", json={
        "workflow_stage_id": stage_1_id,
        "title": "PRD story mapping"
    }, headers=headers)
    t2_resp = await client.post("/api/v1/tasks/", json={
        "workflow_stage_id": stage_1_id,
        "title": "Stakeholder signoff"
    }, headers=headers)

    # 3. Check Progress (0% complete)
    prog_resp = await client.get(f"/api/v1/workflows/{workflow_id}/progress", headers=headers)
    assert prog_resp.status_code == 200
    progress = prog_resp.json()
    assert progress["overall_percentage"] == 0.0
    assert progress["completed_tasks"] == 0
    assert progress["remaining_tasks"] == 2

    # 4. Complete Task 1
    await client.patch(f"/api/v1/tasks/{t1_resp.json()['id']}/status", json={"status": "Completed"}, headers=headers)

    # Check Progress (50% stage, 50% overall)
    prog_resp = await client.get(f"/api/v1/workflows/{workflow_id}/progress", headers=headers)
    assert prog_resp.json()["overall_percentage"] == 50.0

    # 5. Complete Task 2
    # Since both tasks in Stage 1 are complete, completing Task 2 should advance the stage!
    await client.patch(f"/api/v1/tasks/{t2_resp.json()['id']}/status", json={"status": "Completed"}, headers=headers)

    # 6. Verify Workflow current_stage moved to Stage 2: "Planning"
    wf_after = await client.get(f"/api/v1/workflows/{workflow_id}", headers=headers)
    assert wf_after.json()["current_stage"] == "Planning"

    # Stage 1 status is Completed, Stage 2 status is Running
    stages_after = wf_after.json()["stages"]
    assert stages_after[0]["status"] == "Completed"
    assert stages_after[1]["status"] == "Running"

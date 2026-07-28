import uuid
import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend.app.core.database import get_db
from backend.app.models.agent import Agent, AgentDepartment, AgentSkill, AgentCapability
from backend.app.services.agent_service import AgentService
from backend.tests.test_projects import register_and_login

@pytest.fixture(scope="function", autouse=True)
async def seed_agents(db_session: AsyncSession):
    """
    Autouse fixture that runs the startup seeding service to guarantee
    every agent unit test runs on top of a fully populated AI Company catalog.
    """
    service = AgentService(db_session)
    await service.seed_agents_database_if_empty()


# =====================================================================
# SEEDING & METADATA TESTS
# =====================================================================

@pytest.mark.anyio
async def test_agents_database_seeding(db_session: AsyncSession):
    """
    Asserts that the startup database seed correctly generates
    the 12 AI employees, 12 departments, skills, and capabilities.
    """
    # 1. Assert Departments Seeding
    res_depts = await db_session.execute(select(AgentDepartment))
    depts = res_depts.scalars().all()
    assert len(depts) == 12
    dept_names = [d.name for d in depts]
    assert "Frontend" in dept_names
    assert "Artificial Intelligence" in dept_names

    # 2. Assert Skills Seeding
    res_skills = await db_session.execute(select(AgentSkill))
    skills = res_skills.scalars().all()
    assert len(skills) >= 13
    assert any(s.name == "React" for s in skills)
    assert any(s.name == "Prompt Engineering" for s in skills)

    # 3. Assert AI Agents Seeding
    res_agents = await db_session.execute(select(Agent))
    agents = res_agents.scalars().all()
    assert len(agents) == 12
    agent_roles = [a.role for a in agents]
    assert "CEO" in agent_roles
    assert "Frontend Engineer" in agent_roles
    assert "DevOps Engineer" in agent_roles


# =====================================================================
# API SEARCH, FILTER & ENDPOINTS TESTS
# =====================================================================

@pytest.mark.anyio
async def test_agent_api_endpoints_and_filtering(client: AsyncClient):
    token = await register_and_login(client, "agent_test@nirman.ai")
    headers = {"Authorization": f"Bearer {token}"}

    # 1. List all agents (should return 12)
    response = await client.get("/api/v1/agents/", headers=headers)
    assert response.status_code == 200
    agents = response.json()
    assert len(agents) == 12

    # 2. Search by name 'Alice'
    response = await client.get("/api/v1/agents/?query=Alice", headers=headers)
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["role"] == "CEO"

    # 3. Search by skill 'FastAPI'
    response = await client.get("/api/v1/agents/?query=FastAPI", headers=headers)
    assert len(response.json()) == 1
    assert response.json()[0]["name"] == "Fiona"

    # 4. Filter by department 'Frontend'
    response = await client.get("/api/v1/agents/?department=Frontend", headers=headers)
    assert len(response.json()) == 1
    assert response.json()[0]["name"] == "Evan"

    # 5. Fetch details by ID
    agent_id = agents[0]["id"]
    response = await client.get(f"/api/v1/agents/{agent_id}", headers=headers)
    assert response.status_code == 200
    assert response.json()["id"] == agent_id

    # 6. Fetch non-existent agent
    response = await client.get(f"/api/v1/agents/{uuid.uuid4()}", headers=headers)
    assert response.status_code == 404


# =====================================================================
# AGENT STATUS & AVAILABILITY UPDATE TESTS
# =====================================================================

@pytest.mark.anyio
async def test_agent_status_and_availability_patch(client: AsyncClient):
    token = await register_and_login(client, "patch_test@nirman.ai")
    headers = {"Authorization": f"Bearer {token}"}

    response = await client.get("/api/v1/agents/?query=Evan", headers=headers)
    evan_id = response.json()[0]["id"]

    # 1. Update Status (Offline -> Coding)
    status_payload = {"status": "Coding"}
    response = await client.patch(f"/api/v1/agents/{evan_id}/status", json=status_payload, headers=headers)
    assert response.status_code == 200
    assert response.json()["status"] == "Coding"

    # 2. Update Availability (True -> False)
    avail_payload = {"availability": False}
    response = await client.patch(f"/api/v1/agents/{evan_id}/availability", json=avail_payload, headers=headers)
    assert response.status_code == 200
    assert response.json()["availability"] is False

    # 3. Query Diagnostics /health
    # Since we patched Evan to status Coding, they are no longer Offline.
    # Total agents online = 1, offline = 11, busy = 1 (since Coding is a busy status).
    response = await client.get("/api/v1/agents/status", headers=headers)
    assert response.status_code == 200
    summary = response.json()
    assert summary["online_count"] == 1
    assert summary["busy_count"] == 1
    assert summary["offline_count"] == 11
    assert summary["status_distribution"]["Coding"] == 1
    assert summary["status_distribution"]["Offline"] == 11


# =====================================================================
# WORKLOAD & PROJECT ASSIGNMENT SERVICE TESTS
# =====================================================================

@pytest.mark.anyio
async def test_project_and_task_assignment_workload_calculation(client: AsyncClient, db_session: AsyncSession):
    token = await register_and_login(client, "assign_service@nirman.ai")
    headers = {"Authorization": f"Bearer {token}"}

    # 1. Create a project
    proj_resp = await client.post("/api/v1/projects/", json={
        "name": "AI Company Core Sprints",
        "technology_stack": ["FastAPI", "React"]
    }, headers=headers)
    project_id = uuid.UUID(proj_resp.json()["id"])

    # 2. Setup AgentService and select a seeded agent (Charlie - Architect)
    res_agents = await db_session.execute(select(Agent).filter(Agent.name == "Charlie"))
    charlie = res_agents.scalars().first()
    assert charlie is not None
    assert charlie.status == "Offline"
    assert charlie.workload_percentage == 0.0

    service = AgentService(db_session)

    # 3. Assign Charlie to Project
    updated_charlie = await service.assign_agent_to_project(charlie.id, project_id)
    assert updated_charlie.current_project_id == project_id
    assert updated_charlie.status == "Idle" # Auto-toggled from Offline to Idle
    assert updated_charlie.workload_percentage == 40.0 # 40% for project assignment

    # 4. Assign Charlie to Task (UUID)
    task_id = uuid.uuid4()
    updated_charlie = await service.assign_agent_to_task(charlie.id, task_id)
    assert updated_charlie.current_task_id == task_id
    assert updated_charlie.workload_percentage == 100.0 # 40% + 60% = 100%

    # 5. Unassign Task
    updated_charlie = await service.assign_agent_to_task(charlie.id, None)
    assert updated_charlie.current_task_id is None
    assert updated_charlie.workload_percentage == 40.0

    # 6. Unassign Project
    updated_charlie = await service.assign_agent_to_project(charlie.id, None)
    assert updated_charlie.current_project_id is None
    assert updated_charlie.workload_percentage == 0.0

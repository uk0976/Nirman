import io
import uuid
import pytest
from httpx import AsyncClient

# =====================================================================
# TEST SETUP UTILITIES
# =====================================================================

async def register_and_login(client: AsyncClient, email: str) -> str:
    """
    Helper function to register and log in a test user, returning the JWT access token.
    """
    register_payload = {
        "email": email,
        "full_name": f"Test {email.split('@')[0]}",
        "password": "securepassword123",
        "role": "user"
    }
    await client.post("/api/v1/auth/register", json=register_payload)

    login_payload = {
        "email": email,
        "password": "securepassword123"
    }
    response = await client.post("/api/v1/auth/login", json=login_payload)
    return response.json()["access_token"]


# =====================================================================
# PROJECT CRUD & SECURITY TESTS
# =====================================================================

@pytest.mark.anyio
async def test_project_crud_and_ownership_security(client: AsyncClient):
    # 1. Setup two users
    token_a = await register_and_login(client, "user_a@nirman.ai")
    token_b = await register_and_login(client, "user_b@nirman.ai")

    headers_a = {"Authorization": f"Bearer {token_a}"}
    headers_b = {"Authorization": f"Bearer {token_b}"}

    # 2. User A creates a project
    project_payload = {
        "name": "Nirman Workspace Platform",
        "description": "SaaS system designed for team alignment",
        "priority": "Critical",
        "technology_stack": ["FastAPI", "React", "PostgreSQL"],
        "visibility": "private"
    }
    response = await client.post("/api/v1/projects/", json=project_payload, headers=headers_a)
    assert response.status_code == 201
    project_data = response.json()
    assert project_data["name"] == "Nirman Workspace Platform"
    assert project_data["status"] == "Draft"
    assert project_data["priority"] == "Critical"
    project_id = project_data["id"]

    # 3. User B attempts to read User A's project (must fail with 401/403)
    response = await client.get(f"/api/v1/projects/{project_id}", headers=headers_b)
    assert response.status_code == 403

    # 4. User A reads their own project (must succeed)
    response = await client.get(f"/api/v1/projects/{project_id}", headers=headers_a)
    assert response.status_code == 200
    assert response.json()["name"] == "Nirman Workspace Platform"

    # 5. User B attempts to update User A's project (must fail)
    update_payload = {"priority": "Low", "progress": 50.0}
    response = await client.put(f"/api/v1/projects/{project_id}", json=update_payload, headers=headers_b)
    assert response.status_code == 403

    # 6. User A updates their project (must succeed)
    response = await client.put(f"/api/v1/projects/{project_id}", json=update_payload, headers=headers_a)
    assert response.status_code == 200
    updated_data = response.json()
    assert updated_data["priority"] == "Low"
    assert updated_data["progress"] == 50.0

    # 7. Verify listing results
    # User A listing must contain the project
    response = await client.get("/api/v1/projects/", headers=headers_a)
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["id"] == project_id

    # User B listing must not contain User A's project
    response = await client.get("/api/v1/projects/", headers=headers_b)
    assert response.status_code == 200
    assert len(response.json()) == 0

    # 8. Archiving and Restoring Project
    # User B cannot archive
    response = await client.post(f"/api/v1/projects/{project_id}/archive", headers=headers_b)
    assert response.status_code == 403

    # User A archives project
    response = await client.post(f"/api/v1/projects/{project_id}/archive", headers=headers_a)
    assert response.status_code == 200
    assert response.json()["status"] == "Archived"

    # User A restores project
    response = await client.post(f"/api/v1/projects/{project_id}/restore", headers=headers_a)
    assert response.status_code == 200
    assert response.json()["status"] == "Draft"

    # 9. Deleting Project
    # User B cannot delete
    response = await client.delete(f"/api/v1/projects/{project_id}", headers=headers_b)
    assert response.status_code == 403

    # User A deletes project
    response = await client.delete(f"/api/v1/projects/{project_id}", headers=headers_a)
    assert response.status_code == 204

    # Verify project is gone
    response = await client.get(f"/api/v1/projects/{project_id}", headers=headers_a)
    assert response.status_code == 404


# =====================================================================
# SEARCH & FILTER TESTS
# =====================================================================

@pytest.mark.anyio
async def test_project_search_and_filters(client: AsyncClient):
    token = await register_and_login(client, "searcher@nirman.ai")
    headers = {"Authorization": f"Bearer {token}"}

    # Create Project 1 (React Frontend)
    await client.post("/api/v1/projects/", json={
        "name": "E-Commerce Frontend",
        "description": "React-based landing layout and catalog dashboard",
        "priority": "High",
        "technology_stack": ["React", "Vite", "CSS"],
        "visibility": "private"
    }, headers=headers)

    # Create Project 2 (FastAPI API backend)
    await client.post("/api/v1/projects/", json={
        "name": "Order Management Server",
        "description": "FastAPI engine managing checkout schemas and queues",
        "priority": "Medium",
        "technology_stack": ["FastAPI", "PostgreSQL", "Docker"],
        "visibility": "private"
    }, headers=headers)

    # Filter: search query "Frontend"
    response = await client.get("/api/v1/projects/?query=Frontend", headers=headers)
    assert len(response.json()) == 1
    assert response.json()[0]["name"] == "E-Commerce Frontend"

    # Filter: technology stack search "FastAPI"
    response = await client.get("/api/v1/projects/?technology=FastAPI", headers=headers)
    assert len(response.json()) == 1
    assert response.json()[0]["name"] == "Order Management Server"

    # Filter: priority search "High"
    response = await client.get("/api/v1/projects/?priority=High", headers=headers)
    assert len(response.json()) == 1
    assert response.json()[0]["name"] == "E-Commerce Frontend"


# =====================================================================
# REQUIREMENTS CRUD TESTS
# =====================================================================

@pytest.mark.anyio
async def test_requirements_crud(client: AsyncClient):
    token_a = await register_and_login(client, "owner_req@nirman.ai")
    token_b = await register_and_login(client, "thief_req@nirman.ai")
    
    headers_a = {"Authorization": f"Bearer {token_a}"}
    headers_b = {"Authorization": f"Bearer {token_b}"}

    # Create project
    proj_resp = await client.post("/api/v1/projects/", json={
        "name": "Database Migration Sprint",
        "technology_stack": ["Alembic"]
    }, headers=headers_a)
    project_id = proj_resp.json()["id"]

    # 1. Add Requirement (User A)
    req_payload = {
        "title": "Establish User Table Indexes",
        "description": "Index email and created_at fields for faster logins",
        "type": "Functional",
        "priority": "High",
        "status": "Draft"
    }
    response = await client.post(
        f"/api/v1/projects/{project_id}/requirements",
        json=req_payload,
        headers=headers_a
    )
    assert response.status_code == 201
    req_data = response.json()
    assert req_data["title"] == "Establish User Table Indexes"
    req_id = req_data["id"]

    # User B attempts to add requirement (must fail)
    response = await client.post(
        f"/api/v1/projects/{project_id}/requirements",
        json=req_payload,
        headers=headers_b
    )
    assert response.status_code == 403

    # 2. List Requirements
    # User A lists (succeeds)
    response = await client.get(f"/api/v1/projects/{project_id}/requirements", headers=headers_a)
    assert response.status_code == 200
    assert len(response.json()) == 1

    # User B lists (fails)
    response = await client.get(f"/api/v1/projects/{project_id}/requirements", headers=headers_b)
    assert response.status_code == 403

    # 3. Edit Requirement
    edit_payload = {"status": "Approved", "priority": "Critical"}
    # User B edits (fails)
    response = await client.put(
        f"/api/v1/projects/{project_id}/requirements/{req_id}",
        json=edit_payload,
        headers=headers_b
    )
    assert response.status_code == 403

    # User A edits (succeeds)
    response = await client.put(
        f"/api/v1/projects/{project_id}/requirements/{req_id}",
        json=edit_payload,
        headers=headers_a
    )
    assert response.status_code == 200
    assert response.json()["status"] == "Approved"
    assert response.json()["priority"] == "Critical"

    # 4. Delete Requirement
    # User B deletes (fails)
    response = await client.delete(f"/api/v1/projects/{project_id}/requirements/{req_id}", headers=headers_b)
    assert response.status_code == 403

    # User A deletes (succeeds)
    response = await client.delete(f"/api/v1/projects/{project_id}/requirements/{req_id}", headers=headers_a)
    assert response.status_code == 204

    # Verify requirement is deleted
    response = await client.get(f"/api/v1/projects/{project_id}/requirements", headers=headers_a)
    assert len(response.json()) == 0


# =====================================================================
# FILE UPLOAD/DOWNLOAD TESTS
# =====================================================================

@pytest.mark.anyio
async def test_file_upload_and_download_lifecycle(client: AsyncClient):
    token_a = await register_and_login(client, "owner_file@nirman.ai")
    token_b = await register_and_login(client, "thief_file@nirman.ai")
    
    headers_a = {"Authorization": f"Bearer {token_a}"}
    headers_b = {"Authorization": f"Bearer {token_b}"}

    # Create project
    proj_resp = await client.post("/api/v1/projects/", json={
        "name": "Design Wireframes Project",
        "technology_stack": ["Figma"]
    }, headers=headers_a)
    project_id = proj_resp.json()["id"]

    # 1. Upload File
    # Create mock text file stream
    file_content = b"This is a spec sheet detailing architecture guidelines"
    file_bytes = io.BytesIO(file_content)
    files = {"file": ("spec.txt", file_bytes, "text/plain")}

    # User B uploads (must fail)
    response = await client.post(
        f"/api/v1/projects/{project_id}/files",
        files=files,
        headers=headers_b
    )
    assert response.status_code == 403

    # User A uploads (succeeds)
    file_bytes.seek(0) # Reset stream position
    response = await client.post(
        f"/api/v1/projects/{project_id}/files",
        files=files,
        headers=headers_a
    )
    assert response.status_code == 201
    file_data = response.json()
    assert file_data["filename"] == "spec.txt"
    assert file_data["file_size"] == len(file_content)
    file_id = file_data["id"]

    # 2. List Files
    response = await client.get(f"/api/v1/projects/{project_id}/files", headers=headers_a)
    assert response.status_code == 200
    assert len(response.json()) == 1

    # 3. Download File
    # User B downloads (fails)
    response = await client.get(f"/api/v1/projects/{project_id}/files/{file_id}", headers=headers_b)
    assert response.status_code == 403

    # User A downloads (succeeds)
    response = await client.get(f"/api/v1/projects/{project_id}/files/{file_id}", headers=headers_a)
    assert response.status_code == 200
    assert response.content == file_content

    # 4. Delete File
    # User B deletes (fails)
    response = await client.delete(f"/api/v1/projects/{project_id}/files/{file_id}", headers=headers_b)
    assert response.status_code == 403

    # User A deletes (succeeds)
    response = await client.delete(f"/api/v1/projects/{project_id}/files/{file_id}", headers=headers_a)
    assert response.status_code == 204


# =====================================================================
# PROJECT ACTIVITY LOG TESTS
# =====================================================================

@pytest.mark.anyio
async def test_project_activity_auditing(client: AsyncClient):
    token = await register_and_login(client, "auditor@nirman.ai")
    headers = {"Authorization": f"Bearer {token}"}

    # 1. Trigger "Project Created" event
    proj_resp = await client.post("/api/v1/projects/", json={
        "name": "Audit Logging Demonstration",
        "technology_stack": ["FastAPI"]
    }, headers=headers)
    project_id = proj_resp.json()["id"]

    # 2. Trigger "Requirement Added" event
    await client.post(
        f"/api/v1/projects/{project_id}/requirements",
        json={
            "title": "Establish HTTPS redirection",
            "type": "Security",
            "priority": "High"
        },
        headers=headers
    )

    # 3. Fetch Activities
    response = await client.get(f"/api/v1/projects/{project_id}/activity", headers=headers)
    assert response.status_code == 200
    activities = response.json()
    
    # Assert activities are logged
    assert len(activities) == 2
    activity_names = [a["activity"] for a in activities]
    assert "Requirement Added" in activity_names
    assert "Project Created" in activity_names


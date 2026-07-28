import pytest
from httpx import AsyncClient

@pytest.mark.anyio
async def test_auth_workflow(client: AsyncClient):
    """
    Exhaustive integration test asserting the entire user registration, login,
    route protection, and token refresh lifecycle.
    """
    # 1. Register User
    register_payload = {
        "email": "test@nirman.ai",
        "full_name": "Test User",
        "password": "securepassword123",
        "role": "user"
    }
    response = await client.post("/api/v1/auth/register", json=register_payload)
    assert response.status_code == 201
    user_data = response.json()
    assert user_data["email"] == "test@nirman.ai"
    assert user_data["full_name"] == "Test User"
    assert user_data["role"] == "user"
    assert "id" in user_data
    
    # 2. Register Duplicate Email (must fail)
    response = await client.post("/api/v1/auth/register", json=register_payload)
    assert response.status_code == 400
    assert "already in use" in response.json()["detail"]
    
    # 3. Login User
    login_payload = {
        "email": "test@nirman.ai",
        "password": "securepassword123"
    }
    response = await client.post("/api/v1/auth/login", json=login_payload)
    assert response.status_code == 200
    token_data = response.json()
    assert "access_token" in token_data
    assert "refresh_token" in token_data
    assert token_data["token_type"] == "bearer"
    
    access_token = token_data["access_token"]
    refresh_token = token_data["refresh_token"]
    
    # 4. Login Invalid Password (must fail)
    wrong_login_payload = {
        "email": "test@nirman.ai",
        "password": "wrongpassword"
    }
    response = await client.post("/api/v1/auth/login", json=wrong_login_payload)
    assert response.status_code == 401
    
    # 5. Access Protected Route (GET /users/me)
    headers = {"Authorization": f"Bearer {access_token}"}
    response = await client.get("/api/v1/users/me", headers=headers)
    assert response.status_code == 200
    me_data = response.json()
    assert me_data["email"] == "test@nirman.ai"
    assert me_data["full_name"] == "Test User"
    
    # 6. Access Protected Route without Token (must fail)
    response = await client.get("/api/v1/users/me")
    assert response.status_code == 401
    
    # 7. Refresh Token
    refresh_payload = {"refresh_token": refresh_token}
    response = await client.post("/api/v1/auth/refresh", json=refresh_payload)
    assert response.status_code == 200
    refresh_data = response.json()
    assert "access_token" in refresh_data
    assert "refresh_token" in refresh_data
    
    # 8. Refresh Token Invalid (must fail)
    response = await client.post("/api/v1/auth/refresh", json={"refresh_token": "invalid_refresh_token"})
    assert response.status_code == 401


@pytest.mark.anyio
async def test_role_protection(client: AsyncClient):
    """
    Asserts that role-checking logic restricts routes from unauthorized profiles.
    """
    # Register standard user
    register_payload = {
        "email": "user@nirman.ai",
        "full_name": "Standard User",
        "password": "securepassword123",
        "role": "user"
    }
    await client.post("/api/v1/auth/register", json=register_payload)
    
    # Login standard user
    response = await client.post(
        "/api/v1/auth/login",
        json={"email": "user@nirman.ai", "password": "securepassword123"}
    )
    token = response.json()["access_token"]
    
    # Attempt to list all users (requires admin/developer, must fail with 403 Forbidden)
    headers = {"Authorization": f"Bearer {token}"}
    response = await client.get("/api/v1/users/", headers=headers)
    assert response.status_code == 403
    
    # Register admin user
    admin_register_payload = {
        "email": "admin@nirman.ai",
        "full_name": "Admin User",
        "password": "securepassword123",
        "role": "admin"
    }
    await client.post("/api/v1/auth/register", json=admin_register_payload)
    
    # Login admin user
    response = await client.post(
        "/api/v1/auth/login",
        json={"email": "admin@nirman.ai", "password": "securepassword123"}
    )
    admin_token = response.json()["access_token"]
    
    # Attempt to list users with Admin permissions (must succeed)
    admin_headers = {"Authorization": f"Bearer {admin_token}"}
    response = await client.get("/api/v1/users/", headers=admin_headers)
    assert response.status_code == 200
    users_list = response.json()
    assert len(users_list) >= 2

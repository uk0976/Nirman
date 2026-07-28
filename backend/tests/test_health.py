import pytest
from httpx import AsyncClient

@pytest.mark.anyio
async def test_root_endpoint(client: AsyncClient):
    """
    Asserts that the root API greetings return 200 OK.
    """
    response = await client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "platform" in data
    assert data["platform"] == "Nirman (निर्माण)"
    assert data["status"] == "online"


@pytest.mark.anyio
async def test_health_check_endpoint(client: AsyncClient):
    """
    Asserts that the active system diagnostic endpoint connects successfully.
    """
    response = await client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"
    assert data["database"] == "healthy"

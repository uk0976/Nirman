import uuid
import pytest
from pydantic import BaseModel
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from backend.app.schemas.ai import StructuredAIResponse
from backend.app.ai.providers.openai import OpenAIProvider
from backend.app.ai.engine.router import TaskRouter
from backend.app.ai.engine.reasoning import ReasoningEngine
from backend.app.ai.registry import AgentRegistry
from backend.app.models.ai_audit import AIAuditLog
from backend.app.models.agent import AgentConversation, AgentMessage

class ProjectOutputSchema(BaseModel):
    architecture_style: str
    database_choice: str
    tables_count: int

@pytest.mark.anyio
async def test_openai_provider_interface():
    provider = OpenAIProvider()
    
    # Text Generation
    text = await provider.generate(prompt="Hello, describe the system.")
    assert len(text) > 0
    assert "mock" in text.lower() or "openai" in text.lower()

    # Schema Generation
    schema_text = await provider.generate(
        prompt="Draft DB model",
        response_schema=ProjectOutputSchema
    )
    parsed = ProjectOutputSchema.model_validate_json(schema_text)
    assert parsed.tables_count == 100
    assert "Mocked" in parsed.database_choice

    # Streaming
    tokens = []
    async for token in provider.stream(prompt="Stream this task"):
        tokens.append(token)
    assert len(tokens) > 0
    assert "OpenAI" in tokens[0]


def test_model_routing_disciplines():
    router = TaskRouter()
    
    # Software Architect -> routes to code_model (checks matching word 'architecture')
    architect_agent, _, _ = router.route_task("Design system architecture", "Build REST database tables")
    assert architect_agent.role == "Software Architect"
    
    # CEO -> routes to default_model
    ceo_agent, _, _ = router.route_task("Launch sprint campaign", "Initialize budget plan")
    assert ceo_agent.role == "CEO"


@pytest.mark.anyio
async def test_reasoning_engine_db_auditing_and_tools(db_session: AsyncSession):
    engine = ReasoningEngine()
    registry = AgentRegistry()
    architect = registry.find_by_role("Software Architect")

    # Force the provider to output a tool call structure asynchronously
    mock_tool_output = '{"tool": "filesystem", "args": {"action": "write", "path": "test.txt"}, "status": "success", "confidence": 0.95, "reasoning_summary": "Writing wireframe specs", "result": "Wireframe config done"}'
    
    async def mock_generate(*args, **kwargs):
        return mock_tool_output

    engine.providers["openai"].generate = mock_generate

    # Grant required permissions to architect for testing tool execution
    architect.permissions.extend(["FilesRead", "FilesWrite"])

    wf_id = uuid.uuid4()
    task_id = uuid.uuid4()

    response = await engine.reason(
        agent=architect,
        task_title="Draft System Wireframes",
        task_description="Output write script",
        context={"project_name": "Nirman Admin Dashboard"},
        workflow_id=wf_id,
        task_id=task_id,
        db=db_session
    )

    await db_session.flush()

    # Verify Response Envelope
    assert isinstance(response, StructuredAIResponse)
    assert response.status == "success"
    assert response.confidence == 0.95
    assert "filesystem" in response.metadata["tool_execution_result"].lower()

    # Verify Database Audit Log
    stmt = select(AIAuditLog).filter(AIAuditLog.workflow_id == wf_id)
    res_audit = await db_session.execute(stmt)
    audit = res_audit.scalars().first()
    assert audit is not None
    assert audit.agent_role == "Software Architect"
    assert audit.provider == "openai"
    assert audit.response_metadata["prompt_tokens"] > 0


@pytest.mark.anyio
async def test_ai_execute_endpoint(client: AsyncClient):
    payload = {
        "task_title": "OWASP Security Check",
        "task_description": "Validate endpoint route parameters",
        "context": {"project_name": "Health SaaS Portal"},
        "validator_types": ["security"]
    }
    
    response = await client.post("/api/v1/ai/execute", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["provider"] == "openai"
    assert data["usage"]["prompt_tokens"] > 0


@pytest.mark.anyio
async def test_ai_chat_persistence_endpoint(client: AsyncClient, db_session: AsyncSession):
    # Initiate chat
    payload = {
        "message": "Can you design user authorization templates?",
        "agent_role": "Backend Engineer"
    }
    
    response = await client.post("/api/v1/ai/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    
    # Check messages are persisted in db
    stmt_conv = select(AgentConversation)
    res_conv = await db_session.execute(stmt_conv)
    conv = res_conv.scalars().first()
    assert conv is not None
    
    stmt_msgs = select(AgentMessage).filter(AgentMessage.conversation_id == conv.id).order_by(AgentMessage.created_at.asc())
    res_msgs = await db_session.execute(stmt_msgs)
    msgs = res_msgs.scalars().all()
    assert len(msgs) >= 2
    assert "design user authorization" in msgs[0].content


@pytest.mark.anyio
async def test_ai_metadata_endpoints(client: AsyncClient):
    # GET models
    res_models = await client.get("/api/v1/ai/models")
    assert res_models.status_code == 200
    assert "gpt-4o" in res_models.json()["models"]

    # GET providers
    res_prov = await client.get("/api/v1/ai/providers")
    assert res_prov.status_code == 200
    assert res_prov.json()["providers"][0]["name"] == "openai"

    # GET usage
    res_usage = await client.get("/api/v1/ai/usage")
    assert res_usage.status_code == 200
    assert "total_cost" in res_usage.json()

    # GET health
    res_health = await client.get("/api/v1/ai/health")
    assert res_health.status_code == 200
    assert "openai" in res_health.json()


def test_ai_websocket_streaming():
    """
    Asserts real-time WebSocket progress signals and tokens streaming.
    """
    from fastapi.testclient import TestClient
    from backend.app.main import app

    client = TestClient(app)
    with client.websocket_connect("/api/v1/ai/ws/stream") as ws:
        ws.send_json({
            "prompt": "Initialize React frontend layout",
            "system_prompt": "You are a Frontend specialist",
            "model": "gpt-4o"
        })

        events = []
        tokens = []
        
        # Read WebSocket stream events
        for _ in range(12):
            msg = ws.receive_json()
            events.append(msg)
            if msg["type"] == "token":
                tokens.append(msg["content"])

        assert any(e["type"] == "status" for e in events)
        assert any(e["type"] == "progress" and e["progress"] == 20.0 for e in events)
        assert len(tokens) > 0
        assert any(e["type"] == "progress" and e["progress"] == 100.0 for e in events)

import uuid
import pytest
from pydantic import BaseModel

from backend.app.ai.registry import AgentRegistry, DiscoverableToolRegistry
from backend.app.ai.engine import TaskRouter, ReasoningEngine
from backend.app.ai.prompts import PromptBuilder
from backend.app.ai.planner import Planner
from backend.app.ai.context import ContextBuilder
from backend.app.ai.validators import JSONValidator, CodeValidator, SecurityValidator
from backend.app.ai.memory import MemoryManager
from backend.app.ai.events import AIEventBus
from backend.app.ai.telemetry import TelemetryTracker
from backend.app.ai.cost import CostTracker
from backend.app.ai.providers import OpenAIProvider

# =====================================================================
# SCHEMA & MOCK CLASSES FOR TESTING
# =====================================================================

class ProjectOutputSchema(BaseModel):
    architecture_style: str
    database_choice: str
    tables_count: int


class MockFailingValidator:
    """
    Mock validator that fails on the first attempt but passes afterwards
    to verify ReasoningEngine retry loops.
    """
    def __init__(self):
        self.calls = 0

    def validate(self, output: str) -> bool:
        self.calls += 1
        if self.calls == 1:
            raise ValueError("Failure on first verification attempt.")
        return True


# =====================================================================
# PLATFORM UNIT TESTS
# =====================================================================

def test_agent_registry():
    registry = AgentRegistry()
    
    # Assert Discovery
    architect = registry.find_by_role("Software Architect")
    assert architect is not None
    assert architect.name == "Charlie"
    assert architect.department == "Architecture"

    devops = registry.find_by_role("DevOps Engineer")
    assert devops is not None
    assert devops.name == "Kate"

    # Query by Skill
    fastapi_agents = registry.find_by_skill("FastAPI")
    assert len(fastapi_agents) == 1
    assert fastapi_agents[0].name == "Fiona"


def test_task_router():
    router = TaskRouter()
    
    # 1. Route database task
    best, fallback, priority = router.route_task(
        title="Design database migration",
        description="Write PostgreSQL migrations for user roles"
    )
    assert best.role == "Database Engineer"
    assert fallback.role == "CEO"
    assert priority == "High"

    # 2. Route security task
    best, fallback, priority = router.route_task(
        title="OWASP Security Scan",
        description="Verify backend endpoints against SQL Injection"
    )
    assert best.role == "Security Engineer"
    assert priority == "Critical"


def test_prompt_builder():
    prompt = PromptBuilder.build_prompt(
        system_prompt="You are Charlie the software designer.",
        project_context="Build a food delivery SaaS platform",
        task_context="Draft architecture schemas",
        requirements=["Redundancy", "Caching"],
        constraints=["FastAPI backend", "SQLite database"],
        expected_output="JSON specification"
    )
    
    assert "Charlie" in prompt
    assert "delivery SaaS" in prompt
    assert "Redundancy" in prompt
    assert "SQLite" in prompt
    assert "Expected Deliverable Shape" in prompt


def test_planner():
    plan = Planner.break_task(
        stage_name="Architecture",
        task_title="API Gateway Integration",
        task_description="Configure auth proxy routes"
    )
    
    assert plan.workflow_stage == "Architecture"
    assert len(plan.subtasks) == 3
    assert plan.subtasks[0].id == "subtask-1"
    assert plan.subtasks[1].depends_on == ["subtask-1"]


@pytest.mark.anyio
async def test_memory_manager():
    manager = MemoryManager()
    
    await manager.store_context("auth_api_dec", "JWT authentication adopted", tier="project")
    await manager.store_context("agent_last_err", "SyntaxError at line 12", tier="short")

    proj_val = await manager.retrieve_context("auth_api_dec", tier="project")
    short_val = await manager.retrieve_context("agent_last_err", tier="short")

    assert proj_val == "JWT authentication adopted"
    assert short_val == "SyntaxError at line 12"


def test_output_validators():
    json_val = JSONValidator()
    code_val = CodeValidator()
    sec_val = SecurityValidator()

    # Validations
    assert json_val.validate('{"status": "ok"}') is True
    assert code_val.validate("def execute(): pass") is True
    
    # Exceptions
    with pytest.raises(ValueError, match="Invalid JSON"):
        json_val.validate("{malformed_json")

    with pytest.raises(ValueError, match="validation failed"):
        code_val.validate("Syntax Error: missing brackets")

    with pytest.raises(ValueError, match="Security scan failed"):
        sec_val.validate("User input containing SQL Injection string")


@pytest.mark.anyio
async def test_reasoning_engine_correctness_and_retries():
    event_bus = AIEventBus()
    telemetry = TelemetryTracker()
    cost_tracker = CostTracker()

    events_fired = []
    # Subscribe to event bus triggers
    event_bus.subscribe("Agent Started", lambda d: events_fired.append("started"))
    event_bus.subscribe("Reasoning Failed", lambda d: events_fired.append("failed"))
    event_bus.subscribe("Response Validated", lambda d: events_fired.append("validated"))
    event_bus.subscribe("Task Completed", lambda d: events_fired.append("completed"))

    engine = ReasoningEngine(
        event_bus=event_bus,
        telemetry=telemetry,
        cost_tracker=cost_tracker
    )

    registry = AgentRegistry()
    architect = registry.find_by_role("Software Architect")

    # We instantiate our mock failing validator which fails once and succeeds on retry
    failing_val = MockFailingValidator()
    engine._resolve_validators = lambda types: [failing_val]

    # Run Reasoning Loop
    # Prompt matches ProjectOutputSchema
    result_str = await engine.reason(
        agent=architect,
        task_title="Generate Architecture Specs",
        task_description="Define database tables and styles",
        context={"project_name": "Food Delivery API"},
        response_schema=ProjectOutputSchema,
        validator_types=["architecture"]
    )

    # Verify Output conforms to schema
    parsed = ProjectOutputSchema.model_validate_json(result_str)
    assert parsed.tables_count == 100
    assert "Mocked" in parsed.database_choice

    # Verify Retry Loop triggered correctly
    assert failing_val.calls == 2 # Attempt 1 failed, Attempt 2 passed
    assert "started" in events_fired
    assert "failed" in events_fired
    assert "validated" in events_fired
    assert "completed" in events_fired

    # Verify Telemetry & Cost Records
    metrics = telemetry.get_metrics()
    assert metrics["total_calls"] == 1
    assert metrics["success_rate"] == 100.0

    costs = cost_tracker.get_total_costs()
    assert costs["transaction_count"] == 1
    assert costs["total_cost"] > 0.0

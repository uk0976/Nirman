import uuid
import pytest
from httpx import AsyncClient
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.models.warroom import WarRoomSession, WarRoomParticipant, WarRoomMessage, Decision, Vote
from backend.app.models.project import Project
from backend.app.models.workflow import Workflow
from backend.app.warroom.coordinator import WarRoomCoordinator
from backend.app.warroom.consensus import ConsensusEngine
from backend.app.warroom.voting import VotingEngine
from backend.app.warroom.summaries import SummaryEngine

@pytest.fixture(scope="function", autouse=True)
async def seed_agents_for_warroom(db_session: AsyncSession):
    """
    Seeds the 12 default agents in the test database for the war room participants.
    """
    from backend.app.services.agent_service import AgentService
    service = AgentService(db_session)
    await service.seed_agents_database_if_empty()


@pytest.fixture(scope="function")
async def seed_sandbox_data(db_session: AsyncSession):
    """
    Seeds a project and paused workflow to test the workflow resume integration.
    """
    project = Project(
        owner_id=uuid.uuid4(),
        name="Delivery Portal Pro",
        description="Delivery SaaS project",
        technology_stack=["FastAPI", "Next.js"]
    )
    db_session.add(project)
    await db_session.flush()

    workflow = Workflow(
        project_id=project.id,
        name="Sprint 1 workflow",
        status="Paused", # Paused to assert resume triggers
        current_stage="Requirement Analysis"
    )
    db_session.add(workflow)
    await db_session.flush()
    await db_session.commit()
    return project, workflow


@pytest.mark.anyio
async def test_warroom_session_lifecycle_and_simulation(db_session: AsyncSession, seed_sandbox_data):
    project, workflow = seed_sandbox_data
    coordinator = WarRoomCoordinator(db_session)

    # 1. Create Session
    session = await coordinator.create_session(
        project_id=project.id,
        workflow_id=workflow.id,
        title="Tech Stack Selection",
        purpose="Decide between Postgres and SQLite"
    )
    assert session.status == "Preparing"

    # 2. Invite Agents
    participants = await coordinator.invite_agents(session.id)
    assert len(participants) > 0
    assert any(p.role == "CEO" for p in participants)

    # 3. Start Discussion
    await coordinator.start_discussion(session.id)
    assert session.status == "Running"
    assert session.started_at is not None

    from sqlalchemy.orm import selectinload
    stmt_intro = select(WarRoomMessage).filter(WarRoomMessage.session_id == session.id).options(
        selectinload(WarRoomMessage.agent)
    )
    res_intro = await db_session.execute(stmt_intro)
    intro = res_intro.scalars().first()
    assert intro is not None
    assert intro.agent.role == "CEO"

    # 4. Simulate Agent Commentary Turns (using ReasoningEngine)
    responses = await coordinator.simulate_discussion_turn(session.id)
    assert len(responses) > 0 # Checks specialists posted recommendations
    
    # 5. Initiate Voting on decision card
    decision = await coordinator.initiate_voting(
        session_id=session.id,
        title="PostgreSQL Tech Stack Approval",
        description="Use PostgreSQL as production standard database.",
        decision_type="Tech Stack"
    )
    assert session.status == "Voting"

    # 6. Auto-Cast Participant Votes
    votes = await coordinator.auto_cast_participant_votes(decision.id)
    assert len(votes) == len(participants)

    # 7. Evaluate Consensus and Close Session
    await coordinator.close_session(session.id)
    assert session.status in ["Completed", "Rejected"]
    assert session.ended_at is not None

    # Check workflow resumed to Running state
    assert workflow.status == "Running"


@pytest.mark.anyio
async def test_consensus_and_weighted_voting_math():
    # Instantiate mock decision and votes
    decision = Decision(session_id=uuid.uuid4(), title="Security Specs Approval", description="Adopt OAuth2", decision_type="Security")
    
    agent_1 = uuid.uuid4()
    agent_2 = uuid.uuid4()
    agent_3 = uuid.uuid4()

    votes = [
        Vote(decision_id=decision.session_id, agent_id=agent_1, vote="Approve", reason="Clear standard"),
        Vote(decision_id=decision.session_id, agent_id=agent_2, vote="Approve", reason="Matches checklist"),
        Vote(decision_id=decision.session_id, agent_id=agent_3, vote="Reject", reason="Objection raised")
    ]

    # Consensus Engine: 2 approvals, 1 rejection = 2/3 = 66.67%
    metrics = ConsensusEngine.calculate_consensus(decision, votes)
    assert metrics["consensus_ratio"] == 66.67
    assert metrics["consensus_reached"] is False
    assert len(metrics["disagreements"]) == 1

    # Voting Engine: Standard weights
    voting_metrics = VotingEngine.evaluate_votes(votes)
    assert voting_metrics["verdict"] == "Approved" # Approvals (2.0) > Rejections (1.0)
    assert voting_metrics["weighted_score"] == 1.0

    # Voting Engine: CEO Veto Override (agent_3 is CEO and rejects)
    voting_metrics_veto = VotingEngine.evaluate_votes(votes, ceo_agent_id=agent_3)
    assert voting_metrics_veto["verdict"] == "Rejected" # CEO rejected -> verdict rejected!
    assert voting_metrics_veto["weighted_score"] == 0.5 # CEO weight is 1.5. 2 - 1.5 = 0.5.


@pytest.mark.anyio
async def test_summary_generation():
    session = WarRoomSession(id=uuid.uuid4(), title="Tech Stack Meeting", purpose="Select Tech Stack")
    
    # Flag suggesting a risk
    msg_1 = WarRoomMessage(session_id=session.id, agent_id=uuid.uuid4(), message="Risk: SQLite will limit high concurrency writes", message_type="Concern")
    msg_2 = WarRoomMessage(session_id=session.id, agent_id=uuid.uuid4(), message="Todo: Configure database connection pooling", message_type="Proposal")

    dec = Decision(id=uuid.uuid4(), session_id=session.id, title="Adopt PostgreSQL", description="Adoption specs", decision_type="Tech Stack", approved=True, confidence=1.0)

    summary = SummaryEngine.generate_summary(session, [msg_1, msg_2], [dec])
    
    assert summary["title"] == "Tech Stack Meeting"
    assert len(summary["risks"]) == 1
    assert "concurrency writes" in summary["risks"][0]
    assert len(summary["action_items"]) == 1
    assert "Adopt PostgreSQL" in summary["final_decisions"][0]["title"]


@pytest.mark.anyio
async def test_warroom_rest_endpoints(client: AsyncClient, seed_sandbox_data):
    project, workflow = seed_sandbox_data

    # 1. Create Session endpoint
    payload = {
        "project_id": str(project.id),
        "workflow_id": str(workflow.id),
        "title": "Architecture Review Sprints",
        "purpose": "Discuss API Layer Layouts"
    }
    
    response = await client.post("/api/v1/warroom/session", json=payload)
    assert response.status_code == 200
    sess_data = response.json()
    assert sess_data["status"] == "Preparing"
    
    session_id = sess_data["id"]

    # 2. Read session
    res_get = await client.get(f"/api/v1/warroom/session/{session_id}")
    assert res_get.status_code == 200
    assert res_get.json()["title"] == "Architecture Review Sprints"

    # 3. Invite agents
    res_inv = await client.post(f"/api/v1/warroom/session/{session_id}/invite")
    assert res_inv.status_code == 200
    assert len(res_inv.json()["participants"]) > 0

    # 4. Start session
    res_start = await client.post(f"/api/v1/warroom/session/{session_id}/start")
    assert res_start.status_code == 200
    assert res_start.json()["status"] == "Running"

    # 5. Create Decision
    res_dec = await client.post(f"/api/v1/warroom/session/{session_id}/decision", json={
        "title": "FastAPI Standard",
        "description": "Adopt FastAPI",
        "decision_type": "Architecture"
    })
    assert res_dec.status_code == 200
    dec_data = res_dec.json()
    assert dec_data["title"] == "FastAPI Standard"
    
    decision_id = dec_data["id"]

    # 6. Override Approve (CEO executive override)
    ceo_id = sess_data["participants"][0]["agent_id"] if sess_data.get("participants") else str(uuid.uuid4())
    # Retrieve participants from res_inv to get real CEO ID
    inv_data = res_inv.json()
    ceo_p = next((p for p in inv_data["participants"] if p["role"] == "CEO"), None)
    if ceo_p:
        ceo_id = ceo_p["agent_id"]

    res_override = await client.post(
        f"/api/v1/warroom/session/{session_id}/approve?decision_id={decision_id}",
        json={"approved_by": ceo_id, "reasoning": "Executive approval mandate"}
    )
    assert res_override.status_code == 200
    assert res_override.json()["approved"] is True

    # 7. Get Timeline
    res_time = await client.get(f"/api/v1/warroom/session/{session_id}/timeline")
    assert res_time.status_code == 200
    assert len(res_time.json()) > 0

    # 8. Close session
    res_close = await client.post(f"/api/v1/warroom/session/{session_id}/close")
    assert res_close.status_code == 200
    assert res_close.json()["status"] in ["Completed", "Rejected"]


@pytest.mark.anyio
async def test_warroom_websocket_streaming():
    """
    Asserts real-time WebSocket session metrics and status streams.
    """
    from fastapi.testclient import TestClient
    from backend.app.main import app

    client = TestClient(app)
    # Generate mock session id
    mock_id = str(uuid.uuid4())
    with client.websocket_connect(f"/api/v1/warroom/session/{mock_id}/ws") as ws:
        ws.send_json({"action": "subscribe"})

        msgs = []
        for _ in range(4):
            msgs.append(ws.receive_json())

        assert msgs[0]["type"] == "status"
        assert msgs[1]["type"] == "session_status"
        assert msgs[1]["content"] == "Running"
        assert msgs[3]["type"] == "consensus_ratio"

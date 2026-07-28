import uuid
from datetime import datetime
from typing import Dict, Any, List, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.models.warroom import WarRoomSession, WarRoomParticipant, WarRoomMessage, Decision, Vote
from backend.app.models.agent import Agent
from backend.app.warroom.consensus import ConsensusEngine
from backend.app.warroom.voting import VotingEngine
from backend.app.warroom.summaries import SummaryEngine
from backend.app.ai.engine.reasoning import ReasoningEngine
from backend.app.ai.registry.agent_registry import AgentRegistry

class WarRoomCoordinator:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_session(
        self,
        project_id: uuid.UUID,
        workflow_id: uuid.UUID,
        title: str,
        purpose: str,
        created_by: Optional[uuid.UUID] = None
    ) -> WarRoomSession:
        """
        Creates a new War Room Session in Preparing state.
        """
        session = WarRoomSession(
            project_id=project_id,
            workflow_id=workflow_id,
            title=title,
            purpose=purpose,
            status="Preparing",
            created_by=created_by
        )
        self.db.add(session)
        await self.db.flush()

        # Log timeline event
        await self.log_timeline_event(session.id, "Session Started", f"War room session '{title}' created.")
        return session

    async def invite_agents(self, session_id: uuid.UUID) -> List[WarRoomParticipant]:
        """
        Invites default active specialists (CEO, PM, Architect, Backend, Frontend, QA) into the session.
        """
        stmt_session = select(WarRoomSession).filter(WarRoomSession.id == session_id)
        res_sess = await self.db.execute(stmt_session)
        session = res_sess.scalars().first()
        if not session:
            raise ValueError("Session not found")

        # Load agents from the DB
        stmt_agents = select(Agent).filter(Agent.is_active == True)
        res_agents = await self.db.execute(stmt_agents)
        db_agents = res_agents.scalars().all()

        participants = []
        # Map roles to invite
        invited_roles = ["CEO", "Product Manager", "Software Architect", "Backend Engineer", "Frontend Engineer", "QA Engineer"]
        
        for agent in db_agents:
            if agent.role in invited_roles:
                participant = WarRoomParticipant(
                    session_id=session_id,
                    agent_id=agent.id,
                    role=agent.role,
                    status="Joined"
                )
                self.db.add(participant)
                participants.append(participant)

        await self.db.flush()
        await self.log_timeline_event(session_id, "Agent Joined", f"Invited {len(participants)} specialists to the war room.")
        return participants

    async def start_discussion(self, session_id: uuid.UUID) -> WarRoomSession:
        """
        Transitions session state to Running and posts introductory remarks.
        """
        stmt = select(WarRoomSession).filter(WarRoomSession.id == session_id)
        res = await self.db.execute(stmt)
        session = res.scalars().first()
        if not session:
            raise ValueError("Session not found")

        session.status = "Running"
        session.started_at = datetime.utcnow()
        await self.db.flush()

        await self.log_timeline_event(session_id, "DiscussionStarted", "Discussion thread opened. Specialists are reviewing purpose statement.")
        
        # Post mock introductory message from CEO
        ceo_participant = await self._find_participant_by_role(session_id, "CEO")
        if ceo_participant:
            intro_msg = WarRoomMessage(
                session_id=session_id,
                agent_id=ceo_participant.agent_id,
                message=f"Welcome team. Let's debate on '{session.title}' to ensure our implementation aligns with milestones.",
                message_type="Suggestion"
            )
            self.db.add(intro_msg)
            await self.db.flush()

        return session

    async def post_message(
        self,
        session_id: uuid.UUID,
        agent_id: uuid.UUID,
        message: str,
        message_type: str = "Suggestion",
        parent_message_id: Optional[uuid.UUID] = None,
        confidence: float = 0.90
    ) -> WarRoomMessage:
        """
        Posts a text message to the discussion thread.
        """
        msg = WarRoomMessage(
            session_id=session_id,
            agent_id=agent_id,
            message=message,
            message_type=message_type,
            parent_message_id=parent_message_id,
            confidence=confidence
        )
        self.db.add(msg)
        await self.db.flush()

        await self.log_timeline_event(session_id, "Message Posted", f"Message type '{message_type}' posted to thread.")
        return msg

    async def simulate_discussion_turn(self, session_id: uuid.UUID) -> List[WarRoomMessage]:
        """
        Simulates structured agent commentary using the ReasoningEngine.
        """
        stmt_sess = select(WarRoomSession).filter(WarRoomSession.id == session_id)
        res_sess = await self.db.execute(stmt_sess)
        session = res_sess.scalars().first()
        if not session:
            raise ValueError("Session not found")

        stmt_parts = select(WarRoomParticipant).filter(WarRoomParticipant.session_id == session_id)
        res_parts = await self.db.execute(stmt_parts)
        participants = res_parts.scalars().all()

        registry = AgentRegistry()
        engine = ReasoningEngine()
        responses = []

        # Run reasoning for each participant to simulate the meeting turns
        for p in participants:
            agent_instance = registry.find_by_role(p.role)
            if not agent_instance:
                continue

            # Skip CEO for intro since they already spoke
            if p.role == "CEO":
                continue

            # Query reasoning loop
            structured_res = await engine.reason(
                agent=agent_instance,
                task_title=f"Debate: {session.title}",
                task_description=f"Formulate professional design opinions about {session.purpose}",
                context={"project_name": session.title}
            )

            msg = WarRoomMessage(
                session_id=session_id,
                agent_id=p.agent_id,
                message=structured_res.result,
                message_type="Proposal" if "proposal" in structured_res.result.lower() else "Suggestion",
                confidence=structured_res.confidence
            )
            self.db.add(msg)
            responses.append(msg)
            await self.db.flush()

            await self.log_timeline_event(session_id, "AgentResponded", f"Specialist {p.role} posted design argument.")

        return responses

    async def initiate_voting(
        self,
        session_id: uuid.UUID,
        title: str,
        description: str,
        decision_type: str
    ) -> Decision:
        """
        Creates a Decision draft and transitions the session status to Voting.
        """
        stmt_sess = select(WarRoomSession).filter(WarRoomSession.id == session_id)
        res_sess = await self.db.execute(stmt_sess)
        session = res_sess.scalars().first()
        if not session:
            raise ValueError("Session not found")

        session.status = "Voting"

        decision = Decision(
            session_id=session_id,
            title=title,
            description=description,
            decision_type=decision_type,
            approved=False
        )
        self.db.add(decision)
        await self.db.flush()

        await self.log_timeline_event(session_id, "VoteCompleted", f"Decision card '{title}' submitted for vote.")
        return decision

    async def cast_vote(
        self,
        decision_id: uuid.UUID,
        agent_id: uuid.UUID,
        vote_choice: str,
        reason: Optional[str] = None
    ) -> Vote:
        """
        Registers an individual agent's choice (Approve, Reject, Abstain, NeedsInfo).
        """
        vote = Vote(
            decision_id=decision_id,
            agent_id=agent_id,
            vote=vote_choice,
            reason=reason
        )
        self.db.add(vote)
        await self.db.flush()
        return vote

    async def auto_cast_participant_votes(self, decision_id: uuid.UUID) -> List[Vote]:
        """
        Simulates all session participants casting votes on the decision card.
        """
        stmt_dec = select(Decision).filter(Decision.id == decision_id)
        res_dec = await self.db.execute(stmt_dec)
        decision = res_dec.scalars().first()
        if not decision:
            raise ValueError("Decision not found")

        stmt_parts = select(WarRoomParticipant).filter(WarRoomParticipant.session_id == decision.session_id)
        res_parts = await self.db.execute(stmt_parts)
        participants = res_parts.scalars().all()

        votes = []
        for p in participants:
            # Logic: QA Engineer rejects if title has bugs, DevOps approves, CEO approves
            vote_choice = "Approve"
            reason = "Matches milestone targets perfectly."

            if p.role == "QA Engineer" and "bug" in decision.title.lower():
                vote_choice = "Reject"
                reason = "Fails baseline integration review checklist."

            vote = Vote(
                decision_id=decision_id,
                agent_id=p.agent_id,
                vote=vote_choice,
                reason=reason
            )
            self.db.add(vote)
            votes.append(vote)

        await self.db.flush()
        return votes

    async def approve_override(
        self,
        decision_id: uuid.UUID,
        approved_by: uuid.UUID,
        reasoning: str
    ) -> Decision:
        """
        Executes a manual executive override (typically by the CEO) to finalize a decision.
        """
        stmt_dec = select(Decision).filter(Decision.id == decision_id)
        res_dec = await self.db.execute(stmt_dec)
        decision = res_dec.scalars().first()
        if not decision:
            raise ValueError("Decision not found")

        decision.approved = True
        decision.approved_by = approved_by
        decision.reasoning = reasoning
        decision.confidence = 1.0

        session_id = decision.session_id
        stmt_sess = select(WarRoomSession).filter(WarRoomSession.id == session_id)
        res_sess = await self.db.execute(stmt_sess)
        session = res_sess.scalars().first()
        if session:
            session.status = "Approved"

        await self.db.flush()
        await self.log_timeline_event(session_id, "DecisionApproved", f"Decision '{decision.title}' approved via executive override.")
        return decision

    async def close_session(self, session_id: uuid.UUID) -> WarRoomSession:
        """
        Finalizes session, evaluates consensus percentages, updates statuses, and records timeline.
        """
        stmt_sess = select(WarRoomSession).filter(WarRoomSession.id == session_id)
        res_sess = await self.db.execute(stmt_sess)
        session = res_sess.scalars().first()
        if not session:
            raise ValueError("Session not found")

        # Load Decisions
        stmt_dec = select(Decision).filter(Decision.session_id == session_id)
        res_dec = await self.db.execute(stmt_dec)
        decisions = res_dec.scalars().all()

        # Load CEO agent ID to check weighted vetoes
        stmt_ceo = select(Agent).filter(Agent.role == "CEO")
        res_ceo = await self.db.execute(stmt_ceo)
        ceo = res_ceo.scalars().first()
        ceo_id = ceo.id if ceo else None

        approved_count = 0
        for d in decisions:
            stmt_votes = select(Vote).filter(Vote.decision_id == d.id)
            res_votes = await self.db.execute(stmt_votes)
            votes = list(res_votes.scalars().all())

            # Run Consensus and Voting Engines
            consensus_metrics = ConsensusEngine.calculate_consensus(d, votes)
            voting_metrics = VotingEngine.evaluate_votes(votes, ceo_agent_id=ceo_id)

            d.confidence = consensus_metrics["confidence"]
            d.reasoning = f"Consensus ratio: {consensus_metrics['consensus_ratio']}%. Verdict: {voting_metrics['verdict']}. CEO Override: {voting_metrics['ceo_override']}"
            
            if voting_metrics["verdict"] == "Approved":
                d.approved = True
                approved_count += 1
            else:
                d.approved = False

        session.status = "Completed" if approved_count > 0 else "Rejected"
        session.ended_at = datetime.utcnow()
        await self.db.flush()

        # Workflow resume trigger integration
        # Automatically resume the workflow after a decision is made
        from backend.app.models.workflow import Workflow
        stmt_wf = select(Workflow).filter(Workflow.id == session.workflow_id)
        res_wf = await self.db.execute(stmt_wf)
        wf = res_wf.scalars().first()
        if wf and wf.status == "Paused":
            wf.status = "Running"

        await self.log_timeline_event(session_id, "MeetingClosed", f"Session closed with status: {session.status}.")
        return session

    async def log_timeline_event(self, session_id: uuid.UUID, event: str, message: str) -> None:
        """
        Appends event records to the session workflow timeline history.
        """
        # We can write these events to database messages or logs.
        # To maintain a simple query-friendly registry, we write them as special system messages!
        # System messages have a custom type 'Summary' or similar.
        # This keeps database structure clean and 100% relational.
        system_agent_id = uuid.uuid4() # Mock system log agent
        # Find CEO or first agent to assign as author of system log if foreign key requires it
        stmt_agent = select(Agent).limit(1)
        res_agent = await self.db.execute(stmt_agent)
        agent = res_agent.scalars().first()
        author_id = agent.id if agent else system_agent_id

        msg = WarRoomMessage(
            session_id=session_id,
            agent_id=author_id,
            message=f"[{event}] {message}",
            message_type="Summary",
            confidence=1.0
        )
        self.db.add(msg)
        await self.db.flush()
        
    async def get_timeline(self, session_id: uuid.UUID) -> List[Dict[str, Any]]:
        stmt = select(WarRoomMessage).filter(
            WarRoomMessage.session_id == session_id,
            WarRoomMessage.message_type == "Summary"
        ).order_by(WarRoomMessage.created_at.asc())
        res = await self.db.execute(stmt)
        msgs = res.scalars().all()

        timeline = []
        for m in msgs:
            # Parse '[EventName] Message text'
            parts = m.message.split("] ", 1)
            event_name = parts[0][1:] if len(parts) > 0 else "Event"
            msg_text = parts[1] if len(parts) > 1 else m.message
            timeline.append({
                "event": event_name,
                "message": msg_text,
                "timestamp": m.created_at
            })
        return timeline

    async def _find_participant_by_role(self, session_id: uuid.UUID, role: str) -> Optional[WarRoomParticipant]:
        stmt = select(WarRoomParticipant).filter(
            WarRoomParticipant.session_id == session_id,
            WarRoomParticipant.role == role
        )
        res = await self.db.execute(stmt)
        return res.scalars().first()

from typing import List, Dict, Any
from backend.app.models.warroom import WarRoomSession, WarRoomMessage, Decision

class SummaryEngine:
    @staticmethod
    def generate_summary(
        session: WarRoomSession,
        messages: List[WarRoomMessage],
        decisions: List[Decision]
    ) -> Dict[str, Any]:
        """
        Synthesizes War Room transaction history into structured minutes, actions, and risks.
        """
        meeting_minutes = f"AI War Room meeting minutes for session: '{session.title}'. Purpose: {session.purpose}."
        
        # Pull action items and risks from message suggestions
        action_items = []
        open_questions = []
        risks = []

        for msg in messages:
            msg_lower = msg.message.lower()
            if msg.message_type == "Concern" or "risk" in msg_lower:
                risks.append(f"Risk flagged by Agent: {msg.message}")
            elif msg.message_type == "Question" or "?" in msg_lower:
                open_questions.append(f"Open Question: {msg.message}")
            elif msg.message_type == "Proposal" or "todo" in msg_lower or "should" in msg_lower:
                action_items.append(f"Action: {msg.message}")

        # Baseline actions if discussion was short
        if not action_items:
            action_items.append("Action: Draft initial system structure model cards")
        if not risks:
            risks.append("Risk: Fast-tracked alignment without multi-stage code reviews")

        # Compile decisions
        final_decisions = []
        for d in decisions:
            status_text = "Approved" if d.approved else "Rejected"
            final_decisions.append({
                "decision_id": str(d.id),
                "title": d.title,
                "status": status_text,
                "confidence": d.confidence,
                "reasoning": d.reasoning
            })

        return {
            "session_id": str(session.id),
            "title": session.title,
            "purpose": session.purpose,
            "meeting_minutes": meeting_minutes,
            "final_decisions": final_decisions,
            "action_items": action_items,
            "open_questions": open_questions,
            "risks": risks,
            "assigned_tasks": [f"Task: Implement approved designs for {session.title}"]
        }

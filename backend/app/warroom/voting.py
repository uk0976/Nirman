import uuid
from typing import List, Dict, Any, Optional
from backend.app.models.warroom import Vote

class VotingEngine:
    @staticmethod
    def evaluate_votes(votes: List[Vote], ceo_agent_id: Optional[uuid.UUID] = None) -> Dict[str, Any]:
        """
        Processes weighted agent choices to output consensus scores.
        CEO has veto authority and final approval power.
        """
        weighted_score = 0.0
        ceo_override = None

        for v in votes:
            # Determine weight
            weight = 1.0
            is_ceo = ceo_agent_id and (v.agent_id == ceo_agent_id)
            if is_ceo:
                weight = 1.5
                if v.vote == "Approve":
                    ceo_override = "Approve"
                elif v.vote == "Reject":
                    ceo_override = "Reject"

            if v.vote == "Approve":
                weighted_score += weight
            elif v.vote == "Reject":
                weighted_score -= weight

        # Final decision logic
        if ceo_override == "Approve":
            verdict = "Approved"
        elif ceo_override == "Reject":
            verdict = "Rejected"
        else:
            verdict = "Approved" if weighted_score > 0 else "Rejected"

        return {
            "verdict": verdict,
            "weighted_score": weighted_score,
            "ceo_override": ceo_override is not None,
            "total_votes": len(votes)
        }

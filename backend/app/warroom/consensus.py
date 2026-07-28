from typing import List, Dict, Any
from backend.app.models.warroom import Decision, Vote

class ConsensusEngine:
    @staticmethod
    def calculate_consensus(decision: Decision, votes: List[Vote]) -> Dict[str, Any]:
        """
        Determines the percentage of agreement among participant votes.
        Consensus is Tentatively reached if approval ratio >= 70%.
        """
        total = len(votes)
        if total == 0:
            return {
                "consensus_reached": False,
                "consensus_ratio": 0.0,
                "approvals": 0,
                "rejections": 0,
                "disagreements": [],
                "confidence": 0.0
            }

        approvals = sum(1 for v in votes if v.vote == "Approve")
        rejections = sum(1 for v in votes if v.vote == "Reject")
        abstains = sum(1 for v in votes if v.vote == "Abstain")
        needs_info = sum(1 for v in votes if v.vote == "NeedsInfo")

        # Disagreements details
        disagreements = [
            {"agent_id": str(v.agent_id), "reason": v.reason}
            for v in votes if v.vote in ["Reject", "NeedsInfo"]
        ]

        # Calculate consensus ratio (exclude abstains and needs info from base or handle them)
        eval_base = approvals + rejections
        ratio = (approvals / eval_base) if eval_base > 0 else 0.0

        # Consensus reached if >= 70% approval
        consensus_reached = ratio >= 0.70 and needs_info == 0

        # Measure confidence (scale by responses)
        confidence = float(approvals) / float(total)

        return {
            "consensus_reached": bool(consensus_reached),
            "consensus_ratio": round(ratio * 100.0, 2),
            "approvals": approvals,
            "rejections": rejections,
            "disagreements": disagreements,
            "confidence": round(confidence, 2)
        }

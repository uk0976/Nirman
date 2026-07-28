import uuid
from typing import Dict, Any, List

class CostTracker:
    def __init__(self):
        """
        Tracks running cost budgets for LLM usage across agent tasks.
        """
        self.transactions: List[Dict[str, Any]] = []

    def record_usage(
        self,
        workflow_id: uuid.UUID,
        agent_role: str,
        provider: str,
        model: str,
        prompt_tokens: int,
        completion_tokens: int,
        estimated_cost: float,
        execution_time_ms: float
    ) -> None:
        self.transactions.append({
            "workflow_id": workflow_id,
            "agent_role": agent_role,
            "provider": provider,
            "model": model,
            "prompt_tokens": prompt_tokens,
            "completion_tokens": completion_tokens,
            "estimated_cost": estimated_cost,
            "execution_time_ms": execution_time_ms
        })

    def get_total_costs(self) -> Dict[str, Any]:
        total_cost = sum(t["estimated_cost"] for t in self.transactions)
        total_tokens = sum(t["prompt_tokens"] + t["completion_tokens"] for t in self.transactions)
        prompt_tokens = sum(t["prompt_tokens"] for t in self.transactions)
        completion_tokens = sum(t["completion_tokens"] for t in self.transactions)

        return {
            "total_cost": round(total_cost, 6),
            "total_tokens": total_tokens,
            "prompt_tokens": prompt_tokens,
            "completion_tokens": completion_tokens,
            "transaction_count": len(self.transactions)
        }

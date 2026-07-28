from typing import Dict, List, Any, Optional

class TelemetryTracker:
    def __init__(self):
        """
        ...
        """
        self.logs: List[Dict[str, Any]] = []

    def log_transaction(
        self,
        agent_role: str,
        provider: str,
        latency_ms: float,
        is_error: bool = False,
        retries: int = 0,
        error_message: Optional[str] = None
    ) -> None:
        self.logs.append({
            "agent_role": agent_role,
            "provider": provider,
            "latency_ms": latency_ms,
            "is_error": is_error,
            "retries": retries,
            "error_message": error_message
        })

    def get_metrics(self) -> Dict[str, Any]:
        total = len(self.logs)
        if total == 0:
            return {"total_calls": 0, "error_rate": 0.0, "avg_latency_ms": 0.0}

        errors = sum(1 for log in self.logs if log["is_error"])
        total_latency = sum(log["latency_ms"] for log in self.logs)

        return {
            "total_calls": total,
            "error_rate": round(errors / total * 100.0, 2),
            "success_rate": round((total - errors) / total * 100.0, 2),
            "avg_latency_ms": round(total_latency / total, 2)
        }

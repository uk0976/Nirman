from typing import Dict, Any, List
import datetime

class AgentObservability:
    def __init__(self):
        self.metrics = {
            "total_prompt_tokens": 0,
            "total_completion_tokens": 0,
            "estimated_cost_usd": 0.0,
            "total_agent_executions": 0,
            "failed_executions": 0
        }
        self.log_stream: List[Dict[str, Any]] = []

    def record_llm_usage(self, prompt_tokens: int, completion_tokens: int, model: str = "gemini-1.5-pro") -> None:
        self.metrics["total_prompt_tokens"] += prompt_tokens
        self.metrics["total_completion_tokens"] += completion_tokens
        
        # Approximate cost calculation ($0.00125 per 1k input tokens, $0.005 per 1k output tokens)
        cost = (prompt_tokens / 1000.0) * 0.00125 + (completion_tokens / 1000.0) * 0.005
        self.metrics["estimated_cost_usd"] += round(cost, 6)

    def log_event(self, agent_id: str, level: str, task_name: str, message: str) -> None:
        event = {
            "timestamp": datetime.datetime.utcnow().isoformat(),
            "agent_id": agent_id,
            "level": level,
            "task_name": task_name,
            "message": message
        }
        self.log_stream.append(event)
        self.metrics["total_agent_executions"] += 1
        if level == "ERROR":
            self.metrics["failed_executions"] += 1

    def get_metrics(self) -> Dict[str, Any]:
        return self.metrics

    def get_logs(self, limit: int = 100) -> List[Dict[str, Any]]:
        return self.log_stream[-limit:]

agent_observability = AgentObservability()

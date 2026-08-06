from typing import Dict, Any, List, Callable
from pydantic import BaseModel, Field
import datetime
import asyncio

class InterAgentMessage(BaseModel):
    message_id: str
    sender_agent_id: str
    recipient_agent_id: str
    event_type: str # TASK_HANDOFF, DIRECTIVE, DECISION, ARTIFACT_READY
    payload: Dict[str, Any]
    timestamp: str = Field(default_factory=lambda: datetime.datetime.utcnow().isoformat())

class AgentCommunicationBus:
    def __init__(self):
        self._history: List[InterAgentMessage] = []
        self._subscribers: List[Callable[[InterAgentMessage], None]] = []

    def subscribe(self, callback: Callable[[InterAgentMessage], None]) -> None:
        self._subscribers.append(callback)

    async def publish(self, message: InterAgentMessage) -> None:
        self._history.append(message)
        for sub in self._subscribers:
            try:
                if asyncio.iscoroutinefunction(sub):
                    await sub(message)
                else:
                    sub(message)
            except Exception as e:
                print(f"Error dispatching message {message.message_id}: {e}")

    def get_history(self, limit: int = 50) -> List[Dict[str, Any]]:
        return [msg.dict() for msg in self._history[-limit:]]

communication_bus = AgentCommunicationBus()

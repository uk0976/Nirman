import asyncio
import logging
from typing import Dict, Any, Callable, List

logger = logging.getLogger(__name__)

class EventBus:
    """
    Asynchronous event bus streaming real-time agent execution events,
    token consumption, cost metrics, and thinking states.
    """
    
    def __init__(self):
        self._subscribers: List[Callable[[Dict[str, Any]], None]] = []

    def subscribe(self, callback: Callable[[Dict[str, Any]], None]):
        self._subscribers.append(callback)

    async def publish(self, event_type: str, payload: Dict[str, Any]):
        event = {
            "type": event_type,
            "payload": payload
        }
        logger.info(f"EventBus publishing event '{event_type}': {payload.get('task_id', '')}")
        for sub in self._subscribers:
            try:
                if asyncio.iscoroutinefunction(sub):
                    await sub(event)
                else:
                    sub(event)
            except Exception as err:
                logger.error(f"Error notifying EventBus subscriber: {err}")

# Global instance
event_bus = EventBus()

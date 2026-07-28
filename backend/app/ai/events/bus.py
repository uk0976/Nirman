from typing import Callable, Dict, List, Any

class AIEventBus:
    def __init__(self):
        """
        Asynchronous Event Bus distributing telemetry metrics and agent actions.
        """
        # Dict mapping event_name -> list of callback functions
        self.listeners: Dict[str, List[Callable[[Dict[str, Any]], None]]] = {}

    def subscribe(self, event: str, callback: Callable[[Dict[str, Any]], None]) -> None:
        if event not in self.listeners:
            self.listeners[event] = []
        self.listeners[event].append(callback)

    def publish(self, event: str, data: Dict[str, Any]) -> None:
        if event not in self.listeners:
            return
        for callback in self.listeners[event]:
            try:
                callback(data)
            except Exception:
                pass # Suppress listener exceptions to keep event bus resilient

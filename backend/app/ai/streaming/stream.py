from typing import AsyncGenerator, Dict, Any, Optional

class StreamingEvent:
    def __init__(self, type: str, content: str, progress: float = 0.0, metadata: Optional[Dict[str, Any]] = None):
        self.type = type # 'token', 'event', 'progress'
        self.content = content
        self.progress = progress
        self.metadata = metadata or {}

    def to_dict(self) -> Dict[str, Any]:
        return {
            "type": self.type,
            "content": self.content,
            "progress": self.progress,
            "metadata": self.metadata
        }


class AIStreamHandler:
    @staticmethod
    async def process_stream(
        token_generator: AsyncGenerator[str, None],
        event_name: str = "Agent Stream Processing"
    ) -> AsyncGenerator[Dict[str, Any], None]:
        """
        Wraps a raw token generator into formatted streaming metadata events.
        """
        yield StreamingEvent(type="event", content=f"Started: {event_name}", progress=0.0).to_dict()

        accumulated = []
        # Simulate progress stepping
        step = 10.0
        progress = 10.0

        async for token in token_generator:
            accumulated.append(token)
            progress = min(progress + step, 90.0)
            yield StreamingEvent(
                type="token",
                content=token,
                progress=progress,
                metadata={"accumulated_length": sum(len(t) for t in accumulated)}
            ).to_dict()

        yield StreamingEvent(type="progress", content="Task processing complete", progress=100.0).to_dict()
        yield StreamingEvent(type="event", content=f"Finished: {event_name}", progress=100.0).to_dict()

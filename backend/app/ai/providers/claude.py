import json
from typing import AsyncGenerator, List, Optional, Dict, Any, Type
from pydantic import BaseModel
from backend.app.ai.providers.base import LLMProvider
from backend.app.ai.providers.openai import generate_mock_json_from_schema

class ClaudeProvider(LLMProvider):
    def __init__(self, model: str = "claude-3-5-sonnet"):
        self.default_model = model

    async def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        response_schema: Optional[Type[BaseModel]] = None,
        config: Optional[Dict[str, Any]] = None
    ) -> str:
        """
        Generates simulated Claude XML-oriented completions.
        """
        if response_schema:
            return generate_mock_json_from_schema(response_schema)
        return f"<response>Claude mock output response for prompt: {prompt[:50]}...</response>"

    async def stream(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        config: Optional[Dict[str, Any]] = None
    ) -> AsyncGenerator[str, None]:
        tokens = ["Claude", " streaming", " mock", " tokens", " completed."]
        for token in tokens:
            yield token

    async def embeddings(self, texts: List[str]) -> List[List[float]]:
        # Return mock 1536-dim embeddings
        return [[0.02] * 1536 for _ in texts]

    async def health(self) -> bool:
        return True

    async def models(self) -> List[str]:
        return ["claude-3-5-sonnet", "claude-3-opus", "claude-3-haiku"]

    def estimate_cost(self, prompt_tokens: int, completion_tokens: int, model: str) -> float:
        # Claude 3.5 Sonnet: $3.00 / 1M input, $15.00 / 1M output tokens
        input_cost = (prompt_tokens / 1_000_000) * 3.0
        output_cost = (completion_tokens / 1_000_000) * 15.0
        return input_cost + output_cost

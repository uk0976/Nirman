import json
from typing import AsyncGenerator, List, Optional, Dict, Any, Type
from pydantic import BaseModel
from backend.app.ai.providers.base import LLMProvider
from backend.app.ai.providers.openai import generate_mock_json_from_schema

class GeminiProvider(LLMProvider):
    def __init__(self, model: str = "gemini-1.5-pro"):
        self.default_model = model

    async def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        response_schema: Optional[Type[BaseModel]] = None,
        config: Optional[Dict[str, Any]] = None
    ) -> str:
        """
        Generates simulated Gemini completions.
        """
        if response_schema:
            return generate_mock_json_from_schema(response_schema)
        return f"Gemini mock output response for prompt: {prompt[:50]}..."

    async def stream(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        config: Optional[Dict[str, Any]] = None
    ) -> AsyncGenerator[str, None]:
        tokens = ["Gemini", " streaming", " mock", " tokens", " completed."]
        for token in tokens:
            yield token

    async def embeddings(self, texts: List[str]) -> List[List[float]]:
        return [[0.03] * 768 for _ in texts]

    async def health(self) -> bool:
        return True

    async def models(self) -> List[str]:
        return ["gemini-1.5-pro", "gemini-1.5-flash", "gemma-2-9b"]

    def estimate_cost(self, prompt_tokens: int, completion_tokens: int, model: str) -> float:
        # Gemini 1.5 Pro: $1.25 / 1M input, $5.00 / 1M output tokens
        input_cost = (prompt_tokens / 1_000_000) * 1.25
        output_cost = (completion_tokens / 1_000_000) * 5.0
        return input_cost + output_cost

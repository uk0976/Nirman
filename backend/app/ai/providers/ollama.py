import json
from typing import AsyncGenerator, List, Optional, Dict, Any, Type
from pydantic import BaseModel
from backend.app.ai.providers.base import LLMProvider
from backend.app.ai.providers.openai import generate_mock_json_from_schema

class OllamaProvider(LLMProvider):
    def __init__(self, model: str = "llama3"):
        self.default_model = model

    async def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        response_schema: Optional[Type[BaseModel]] = None,
        config: Optional[Dict[str, Any]] = None
    ) -> str:
        """
        Generates simulated Ollama completions.
        """
        if response_schema:
            return generate_mock_json_from_schema(response_schema)
        return f"Ollama mock output response for prompt: {prompt[:50]}..."

    async def stream(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        config: Optional[Dict[str, Any]] = None
    ) -> AsyncGenerator[str, None]:
        tokens = ["Ollama", " streaming", " mock", " tokens", " completed."]
        for token in tokens:
            yield token

    async def embeddings(self, texts: List[str]) -> List[List[float]]:
        return [[0.04] * 4096 for _ in texts]

    async def health(self) -> bool:
        return True

    async def models(self) -> List[str]:
        return ["llama3", "mistral", "phi3"]

    def estimate_cost(self, prompt_tokens: int, completion_tokens: int, model: str) -> float:
        # Local model, cost is zero!
        return 0.0

import json
import uuid
from typing import AsyncGenerator, List, Optional, Dict, Any, Type
from pydantic import BaseModel
from backend.app.ai.providers.base import LLMProvider

def generate_mock_json_from_schema(schema: Type[BaseModel]) -> str:
    """
    Constructs a valid mock JSON payload matching the Pydantic schema.
    """
    mock_dict = {}
    for name, field in schema.model_fields.items():
        annotation = field.annotation
        # Standard typing checks
        origin = getattr(annotation, "__origin__", None)
        args = getattr(annotation, "__args__", None)

        if annotation is str:
            mock_dict[name] = f"Mocked {name} string"
        elif annotation is int:
            mock_dict[name] = 100
        elif annotation is float:
            mock_dict[name] = 75.5
        elif annotation is bool:
            mock_dict[name] = True
        elif annotation is uuid.UUID:
            mock_dict[name] = str(uuid.uuid4())
        elif origin is list or annotation is list:
            item_type = args[0] if args else str
            if item_type is str:
                mock_dict[name] = ["FastAPI", "Sqlite"]
            elif item_type is int:
                mock_dict[name] = [1, 2, 3]
            else:
                mock_dict[name] = []
        elif origin is dict or annotation is dict:
            mock_dict[name] = {"status": "success", "count": 1}
        elif origin is Optional or origin is Any:
            mock_dict[name] = f"Mocked optional {name}"
        else:
            # Fallback for nested schemas or unhandled types
            if isinstance(annotation, type) and issubclass(annotation, BaseModel):
                mock_dict[name] = json.loads(generate_mock_json_from_schema(annotation))
            else:
                mock_dict[name] = f"Mocked generic {name}"
    return json.dumps(mock_dict)


class OpenAIProvider(LLMProvider):
    def __init__(self, model: str = "gpt-4o"):
        self.default_model = model

    async def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        response_schema: Optional[Type[BaseModel]] = None,
        config: Optional[Dict[str, Any]] = None
    ) -> str:
        """
        Generates simulated OpenAI completions matching prompt parameters.
        """
        if response_schema:
            return generate_mock_json_from_schema(response_schema)
        return f"OpenAI mock output response for prompt: {prompt[:50]}..."

    async def stream(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        config: Optional[Dict[str, Any]] = None
    ) -> AsyncGenerator[str, None]:
        tokens = ["OpenAI", " streaming", " mock", " tokens", " completed."]
        for token in tokens:
            yield token

    async def embeddings(self, texts: List[str]) -> List[List[float]]:
        # Return mock 1536-dim embeddings
        return [[0.01] * 1536 for _ in texts]

    async def health(self) -> bool:
        return True

    async def models(self) -> List[str]:
        return ["gpt-4o", "gpt-4o-mini", "o1-preview"]

    def estimate_cost(self, prompt_tokens: int, completion_tokens: int, model: str) -> float:
        # GPT-4o pricing: $5.00 / 1M input, $15.00 / 1M output tokens
        input_cost = (prompt_tokens / 1_000_000) * 5.0
        output_cost = (completion_tokens / 1_000_000) * 15.0
        return input_cost + output_cost

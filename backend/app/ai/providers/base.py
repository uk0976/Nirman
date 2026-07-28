import abc
from typing import AsyncGenerator, List, Optional, Dict, Any, Type
from pydantic import BaseModel

class LLMProvider(abc.ABC):
    """
    Abstract Base Class defining a provider-independent LLM interface.
    """

    @abc.abstractmethod
    async def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        response_schema: Optional[Type[BaseModel]] = None,
        config: Optional[Dict[str, Any]] = None
    ) -> str:
        """
        Generates a text or structured JSON response.
        """
        pass

    @abc.abstractmethod
    async def stream(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        config: Optional[Dict[str, Any]] = None
    ) -> AsyncGenerator[str, None]:
        """
        Streams response text tokens.
        """
        pass

    @abc.abstractmethod
    async def embeddings(self, texts: List[str]) -> List[List[float]]:
        """
        Generates semantic embeddings for a list of strings.
        """
        pass

    @abc.abstractmethod
    async def health(self) -> bool:
        """
        Checks connection status of the provider API.
        """
        pass

    @abc.abstractmethod
    async def models(self) -> List[str]:
        """
        Lists available LLM model versions.
        """
        pass

    @abc.abstractmethod
    def estimate_cost(self, prompt_tokens: int, completion_tokens: int, model: str) -> float:
        """
        Calculates the pricing of the LLM transaction.
        """
        pass

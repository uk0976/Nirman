import logging
from typing import Dict, Any, Optional

from app.ai.providers.base import LLMProvider
from app.ai.providers.openai import OpenAIProvider
from app.ai.providers.claude import ClaudeProvider
from app.ai.providers.gemini import GeminiProvider
from app.ai.providers.ollama import OllamaProvider
from app.ai.providers.azure import AzureOpenAIProvider

logger = logging.getLogger(__name__)

_PROVIDER_CACHE: Dict[str, LLMProvider] = {}

def get_llm_provider(provider_name: str = "openai") -> LLMProvider:
    """
    Factory function returning provider-independent LLM instances.
    Supports 'openai', 'anthropic', 'claude', 'gemini', 'ollama', and 'azure'.
    """
    name = provider_name.lower().strip()
    if name in _PROVIDER_CACHE:
        return _PROVIDER_CACHE[name]

    if name in ["openai", "default"]:
        provider = OpenAIProvider()
    elif name in ["anthropic", "claude"]:
        provider = ClaudeProvider()
    elif name == "gemini":
        provider = GeminiProvider()
    elif name == "ollama":
        provider = OllamaProvider()
    elif name == "azure":
        provider = AzureOpenAIProvider()
    else:
        logger.warning(f"Unknown provider '{provider_name}'. Defaulting to OpenAIProvider.")
        provider = OpenAIProvider()

    _PROVIDER_CACHE[name] = provider
    return provider

import abc
from typing import Dict, Any, List, Optional

class MemoryTier(abc.ABC):
    """
    Interface for a specific memory storage tier (e.g. Short-term, Long-term).
    """

    @abc.abstractmethod
    async def get(self, key: str) -> Optional[str]:
        pass

    @abc.abstractmethod
    async def set(self, key: str, value: str, metadata: Optional[Dict[str, Any]] = None) -> None:
        pass

    @abc.abstractmethod
    async def list_all(self) -> List[Dict[str, Any]]:
        pass

    @abc.abstractmethod
    async def clear(self) -> None:
        pass


class ShortTermMemory(MemoryTier):
    def __init__(self):
        self.store = {}

    async def get(self, key: str) -> Optional[str]:
        return self.store.get(key)

    async def set(self, key: str, value: str, metadata: Optional[Dict[str, Any]] = None) -> None:
        self.store[key] = value

    async def list_all(self) -> List[Dict[str, Any]]:
        return [{"key": k, "value": v} for k, v in self.store.items()]

    async def clear(self) -> None:
        self.store.clear()


class LongTermMemory(MemoryTier):
    def __init__(self):
        self.store = {}

    async def get(self, key: str) -> Optional[str]:
        return self.store.get(key)

    async def set(self, key: str, value: str, metadata: Optional[Dict[str, Any]] = None) -> None:
        self.store[key] = value

    async def list_all(self) -> List[Dict[str, Any]]:
        return [{"key": k, "value": v} for k, v in self.store.items()]

    async def clear(self) -> None:
        self.store.clear()


class MemoryManager:
    def __init__(self):
        """
        Manages the various tiers of memory access for AI agents.
        """
        self.short_term = ShortTermMemory()
        self.long_term = LongTermMemory()
        self.project_memory = ShortTermMemory()
        self.conversation_memory = ShortTermMemory()
        self.team_memory = ShortTermMemory()
        self.global_memory = ShortTermMemory()

    async def store_context(self, key: str, value: str, tier: str = "short") -> None:
        if tier == "short":
            await self.short_term.set(key, value)
        elif tier == "long":
            await self.long_term.set(key, value)
        elif tier == "project":
            await self.project_memory.set(key, value)
        elif tier == "team":
            await self.team_memory.set(key, value)
        elif tier == "conversation":
            await self.conversation_memory.set(key, value)
        else:
            await self.global_memory.set(key, value)

    async def retrieve_context(self, key: str, tier: str = "short") -> Optional[str]:
        if tier == "short":
            return await self.short_term.get(key)
        elif tier == "long":
            return await self.long_term.get(key)
        elif tier == "project":
            return await self.project_memory.get(key)
        elif tier == "team":
            return await self.team_memory.get(key)
        elif tier == "conversation":
            return await self.conversation_memory.get(key)
        return await self.global_memory.get(key)

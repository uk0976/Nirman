from typing import Dict, Any, Callable, Optional
from abc import ABC, abstractmethod

class BaseTool(ABC):
    def __init__(self, tool_id: str, name: str, description: str, required_permission: str):
        self.tool_id = tool_id
        self.name = name
        self.description = description
        self.required_permission = required_permission

    @abstractmethod
    async def execute(self, params: Dict[str, Any]) -> Dict[str, Any]:
        pass

class ToolRegistry:
    def __init__(self):
        self._tools: Dict[str, BaseTool] = {}

    def register_tool(self, tool: BaseTool) -> None:
        self._tools[tool.tool_id] = tool

    def get_tool(self, tool_id: str) -> Optional[BaseTool]:
        return self._tools.get(tool_id)

    def list_tools(self) -> Dict[str, Any]:
        return {
            t_id: {
                "name": tool.name,
                "description": tool.description,
                "required_permission": tool.required_permission
            }
            for t_id, tool in self._tools.items()
        }

tool_registry = ToolRegistry()

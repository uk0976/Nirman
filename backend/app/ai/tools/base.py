import abc
from typing import Dict, Any, List, Optional

class Tool(abc.ABC):
    """
    Abstract interface for executing system tools (Filesystem, GitHub, Terminal).
    """

    @abc.abstractmethod
    async def execute(self, args: Dict[str, Any]) -> Any:
        pass

    @abc.abstractmethod
    def validate(self, args: Dict[str, Any]) -> bool:
        pass

    @abc.abstractmethod
    def permissions(self) -> List[str]:
        pass

    @abc.abstractmethod
    def metadata(self) -> Dict[str, Any]:
        pass


class ToolRegistry:
    def __init__(self):
        """
        Manages discovery and permission checking of system execution tools.
        """
        self.tools: Dict[str, Tool] = {}

    def register_tool(self, name: str, tool: Tool) -> None:
        self.tools[name] = tool

    def get_tool(self, name: str) -> Optional[Tool]:
        return self.tools.get(name)

    def list_tools(self) -> List[Dict[str, Any]]:
        return [t.metadata() for t in self.tools.values()]

    def check_permissions(self, tool_name: str, agent_permissions: List[str]) -> bool:
        tool = self.get_tool(tool_name)
        if not tool:
            return False
        # Every permission required by tool must be present in agent's permissions
        return all(p in agent_permissions for p in tool.permissions())

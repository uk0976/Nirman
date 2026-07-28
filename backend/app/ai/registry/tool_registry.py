from typing import Dict, Any, List, Optional
from backend.app.ai.tools.base import Tool, ToolRegistry

class FilesystemTool(Tool):
    async def execute(self, args: Dict[str, Any]) -> Any:
        action = args.get("action", "read")
        path = args.get("path", "")
        return f"FilesystemTool: Successfully performed '{action}' on path '{path}'."

    def validate(self, args: Dict[str, Any]) -> bool:
        return "path" in args

    def permissions(self) -> List[str]:
        return ["FilesRead", "FilesWrite"]

    def metadata(self) -> Dict[str, Any]:
        return {
            "name": "Filesystem",
            "description": "Reads and writes files on the workspace local disk.",
            "permissions": self.permissions()
        }


class GitHubTool(Tool):
    async def execute(self, args: Dict[str, Any]) -> Any:
        repo = args.get("repo", "")
        return f"GitHubTool: Pulled commit history for repo '{repo}'."

    def validate(self, args: Dict[str, Any]) -> bool:
        return "repo" in args

    def permissions(self) -> List[str]:
        return ["GitHubPull"]

    def metadata(self) -> Dict[str, Any]:
        return {
            "name": "GitHub",
            "description": "Pulls code repositories and posts issues or commits.",
            "permissions": self.permissions()
        }


class TerminalTool(Tool):
    async def execute(self, args: Dict[str, Any]) -> Any:
        command = args.get("command", "")
        return f"TerminalTool: Executed command '{command}'. Status code 0."

    def validate(self, args: Dict[str, Any]) -> bool:
        return "command" in args

    def permissions(self) -> List[str]:
        return ["ShellExecute"]

    def metadata(self) -> Dict[str, Any]:
        return {
            "name": "Terminal",
            "description": "Executes shell commands on host terminal.",
            "permissions": self.permissions()
        }


class DatabaseTool(Tool):
    async def execute(self, args: Dict[str, Any]) -> Any:
        query = args.get("query", "")
        return f"DatabaseTool: Executed SQL query: '{query}'. Rows returned: 0."

    def validate(self, args: Dict[str, Any]) -> bool:
        return "query" in args

    def permissions(self) -> List[str]:
        return ["DatabaseWrite"]

    def metadata(self) -> Dict[str, Any]:
        return {
            "name": "Database",
            "description": "Executes SQL and manages migrations.",
            "permissions": self.permissions()
        }


class DiscoverableToolRegistry(ToolRegistry):
    def __init__(self):
        """
        Tool registry auto-discovering all available mock execution tools.
        """
        super().__init__()
        self.register_tool("filesystem", FilesystemTool())
        self.register_tool("github", GitHubTool())
        self.register_tool("terminal", TerminalTool())
        self.register_tool("database", DatabaseTool())

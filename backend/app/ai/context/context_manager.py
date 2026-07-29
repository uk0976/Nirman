import logging
from typing import Dict, Any, List, Optional

logger = logging.getLogger(__name__)

class ContextManager:
    """
    Manages active project context, conversation history,
    system instructions, and context window trimming.
    """
    
    def __init__(self):
        self._project_contexts: Dict[str, Dict[str, Any]] = {}

    def set_project_context(self, project_id: str, context_data: Dict[str, Any]):
        self._project_contexts[project_id] = context_data

    def get_project_context(self, project_id: str) -> Dict[str, Any]:
        return self._project_contexts.get(project_id, {})

    def format_context_for_prompt(self, project_id: str, upstream_results: Dict[str, Any]) -> str:
        proj = self.get_project_context(project_id)
        ctx_str = f"Project Context: {proj.get('name', 'Nirman Project')}\n"
        ctx_str += f"Requirements: {proj.get('description', 'Build production app')}\n\n"
        
        if upstream_results:
            ctx_str += "Upstream AI Agent Deliverables:\n"
            for task_id, res in upstream_results.items():
                ctx_str += f"--- [{task_id}] Output ---\n{str(res)[:1000]}\n\n"

        return ctx_str

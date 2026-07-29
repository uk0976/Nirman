import logging
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

class MemoryManager:
    """
    Shared key-value state and memory store across parallel AI employees
    during workflow execution.
    """
    
    def __init__(self):
        self._shared_memory: Dict[str, Dict[str, Any]] = {}

    def set_task_output(self, workflow_id: str, task_id: str, output: Any):
        if workflow_id not in self._shared_memory:
            self._shared_memory[workflow_id] = {}
        self._shared_memory[workflow_id][task_id] = output
        logger.info(f"MemoryManager stored output for workflow {workflow_id}, task {task_id}")

    def get_workflow_memory(self, workflow_id: str) -> Dict[str, Any]:
        return self._shared_memory.get(workflow_id, {})

    def clear_workflow_memory(self, workflow_id: str):
        if workflow_id in self._shared_memory:
            del self._shared_memory[workflow_id]

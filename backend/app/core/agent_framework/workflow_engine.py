from typing import Dict, Any, List, Optional
from pydantic import BaseModel
import datetime

class WorkflowNode(BaseModel):
    node_id: str
    stage_name: str
    assigned_agent_id: str
    dependencies: List[str] = []
    status: str = "PENDING" # PENDING, IN_PROGRESS, WAITING_APPROVAL, COMPLETED, FAILED

class WorkflowEngine:
    def __init__(self, workflow_id: str, name: str):
        self.workflow_id = workflow_id
        self.name = name
        self.nodes: Dict[str, WorkflowNode] = {}
        self.execution_state: str = "IDLE" # IDLE, RUNNING, PAUSED, COMPLETED, FAILED

    def add_node(self, node: WorkflowNode) -> None:
        self.nodes[node.node_id] = node

    def can_execute(self, node_id: str) -> bool:
        node = self.nodes.get(node_id)
        if not node or node.status != "PENDING":
            return False
        
        # Check if all dependency nodes are COMPLETED
        for dep_id in node.dependencies:
            dep_node = self.nodes.get(dep_id)
            if not dep_node or dep_node.status != "COMPLETED":
                return False
        return True

    def update_node_status(self, node_id: str, status: str) -> None:
        if node_id in self.nodes:
            self.nodes[node_id].status = status

    def get_progress(self) -> float:
        if not self.nodes:
            return 0.0
        completed = sum(1 for n in self.nodes.values() if n.status == "COMPLETED")
        return round((completed / len(self.nodes)) * 100, 1)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "workflow_id": self.workflow_id,
            "name": self.name,
            "execution_state": self.execution_state,
            "progress": self.get_progress(),
            "nodes": [n.dict() for n in self.nodes.values()]
        }

from typing import Dict, Any, List, Optional
import uuid
import datetime

class ArtifactNode:
    def __init__(self, artifact_type: str, source_agent_id: str, content: Dict[str, Any], parent_id: Optional[str] = None):
        self.id = str(uuid.uuid4())
        self.artifact_type = artifact_type
        self.source_agent_id = source_agent_id
        self.content = content
        self.parent_id = parent_id
        self.version = "1.0"
        self.created_at = datetime.datetime.utcnow().isoformat()
        self.approval_state = "PENDING"

class ArtifactPipeline:
    """
    Maintains complete artifact lineage, versioning, and parent references.
    """
    def __init__(self):
        self.artifacts: Dict[str, ArtifactNode] = {}

    def register_artifact(self, artifact_type: str, source_agent_id: str, content: Dict[str, Any], parent_id: Optional[str] = None) -> ArtifactNode:
        node = ArtifactNode(artifact_type, source_agent_id, content, parent_id)
        self.artifacts[node.id] = node
        return node

    def get_lineage(self, artifact_id: str) -> List[Dict[str, Any]]:
        lineage = []
        curr_id = artifact_id
        while curr_id and curr_id in self.artifacts:
            node = self.artifacts[curr_id]
            lineage.append({
                "id": node.id,
                "type": node.artifact_type,
                "agent": node.source_agent_id,
                "created_at": node.created_at
            })
            curr_id = node.parent_id
        return lineage

artifact_pipeline_instance = ArtifactPipeline()

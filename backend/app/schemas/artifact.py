from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict

class ArtifactCreate(BaseModel):
    project_id: str
    name: str
    artifact_type: str
    file_path: Optional[str] = None
    content: Optional[str] = None
    author_agent: Optional[str] = None

class ArtifactResponse(BaseModel):
    id: str
    project_id: str
    name: str
    artifact_type: str
    file_path: Optional[str] = None
    content: Optional[str] = None
    version: int
    author_agent: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

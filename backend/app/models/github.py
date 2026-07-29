import uuid
from datetime import datetime
from typing import Optional
from sqlalchemy import DateTime, ForeignKey, String, Boolean, JSON, Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.app.models.base import Base

class GitHubRepository(Base):
    """
    GitHubRepository model linking a GitHub repository 1:1 with a Nirman project,
    storing encrypted OAuth access tokens, default branches, and repository metadata.
    """
    __tablename__ = "github_repositories"

    project_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, unique=True)
    repo_name: Mapped[str] = mapped_column(String(255), nullable=False) # e.g. "nirman-ai/inventory-control-api"
    repo_url: Mapped[str] = mapped_column(String(512), nullable=False) # e.g. "https://github.com/nirman-ai/inventory-control-api.git"
    default_branch: Mapped[str] = mapped_column(String(100), default="main", nullable=False)
    encrypted_access_token: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    is_private: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    metadata_json: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)

    def __repr__(self) -> str:
        return f"<GitHubRepository repo_name={self.repo_name} branch={self.default_branch}>"

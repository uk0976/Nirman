import uuid
from datetime import datetime
from typing import Optional, List
from sqlalchemy import DateTime, ForeignKey, String, Boolean, JSON, Uuid, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.app.models.base import Base

class DeploymentRecord(Base):
    """
    DeploymentRecord model tracking multi-cloud deployments across Docker, Vercel, Render,
    Railway, AWS, Azure, and GCP with build/deployment logs, URL generation, and health probes.
    """
    __tablename__ = "deployments"

    project_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    provider: Mapped[str] = mapped_column(String(50), default="docker", nullable=False) # docker, vercel, render, railway, aws, azure, gcp
    environment: Mapped[str] = mapped_column(String(50), default="production", nullable=False) # production, staging, preview
    status: Mapped[str] = mapped_column(String(50), default="PENDING", nullable=False) # PENDING, BUILDING, DEPLOYING, HEALTHY, FAILED, ROLLED_BACK
    deployment_url: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    health_status: Mapped[str] = mapped_column(String(50), default="UNKNOWN", nullable=False) # HEALTHY, UNHEALTHY, UNKNOWN
    
    env_vars: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)
    build_logs: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    deployment_logs: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    
    deployed_by: Mapped[str] = mapped_column(String(100), default="Kate (DevOps)", nullable=False)

    def __repr__(self) -> str:
        return f"<DeploymentRecord provider={self.provider} status={self.status} url={self.deployment_url}>"

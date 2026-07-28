import uuid
from datetime import datetime
from typing import Optional
from sqlalchemy import String, Text, ForeignKey, JSON, Integer, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.app.models.base import Base

class AIAuditLog(Base):
    """
    AIAuditLog model to audit agent transactions, cost metrics, and prompts configurations.
    """
    __tablename__ = "ai_audit_logs"

    workflow_id: Mapped[Optional[uuid.UUID]] = mapped_column(ForeignKey("workflows.id", ondelete="SET NULL"), nullable=True)
    task_id: Mapped[Optional[uuid.UUID]] = mapped_column(ForeignKey("workflow_tasks.id", ondelete="SET NULL"), nullable=True)
    agent_id: Mapped[Optional[uuid.UUID]] = mapped_column(ForeignKey("agents.id", ondelete="SET NULL"), nullable=True)
    execution_id: Mapped[uuid.UUID] = mapped_column(nullable=False, index=True)
    prompt_version: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    agent_role: Mapped[str] = mapped_column(String(100), nullable=False)
    model: Mapped[str] = mapped_column(String(100), nullable=False)
    provider: Mapped[str] = mapped_column(String(100), nullable=False)
    response_metadata: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)

    def __repr__(self) -> str:
        return f"<AIAuditLog id={self.id} agent_role={self.agent_role} model={self.model}>"

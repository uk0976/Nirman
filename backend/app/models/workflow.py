import uuid
from datetime import datetime
from typing import List, Optional
from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, Text, Uuid, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.app.models.base import Base

class Workflow(Base):
    """
    Workflow model representing an orchestration path for a Project.
    Only one active workflow can exist per project.
    """
    __tablename__ = "workflows"

    project_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    
    # Status options: Draft, Running, Paused, Completed, Cancelled, Failed
    status: Mapped[str] = mapped_column(String(50), default="Draft", nullable=False)
    
    # Current stage name in progression
    current_stage: Mapped[str] = mapped_column(String(100), default="Requirement Analysis", nullable=False)
    
    started_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    completed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    project: Mapped["Project"] = relationship()
    stages: Mapped[List["WorkflowStage"]] = relationship(
        back_populates="workflow",
        order_by="WorkflowStage.order.asc()",
        cascade="all, delete-orphan"
    )
    executions: Mapped[List["WorkflowExecution"]] = relationship(
        back_populates="workflow",
        cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<Workflow name={self.name} status={self.status} current_stage={self.current_stage}>"


class WorkflowStage(Base):
    """
    WorkflowStage model representing a single phase in the pipeline (e.g. Architecture, UI Design).
    """
    __tablename__ = "workflow_stages"

    workflow_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("workflows.id", ondelete="CASCADE"), nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    order: Mapped[int] = mapped_column(Integer, nullable=False)
    
    # Status options: Pending, Running, Completed, Failed
    status: Mapped[str] = mapped_column(String(50), default="Pending", nullable=False)
    
    assigned_agent_id: Mapped[Optional[uuid.UUID]] = mapped_column(Uuid, ForeignKey("agents.id", ondelete="SET NULL"), nullable=True)
    started_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    completed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    workflow: Mapped["Workflow"] = relationship(back_populates="stages")
    tasks: Mapped[List["WorkflowTask"]] = relationship(
        back_populates="stage",
        cascade="all, delete-orphan"
    )
    assigned_agent: Mapped[Optional["Agent"]] = relationship(foreign_keys=[assigned_agent_id])

    def __repr__(self) -> str:
        return f"<WorkflowStage name={self.name} order={self.order} status={self.status}>"


class WorkflowTask(Base):
    """
    WorkflowTask model representing individual developer assignments within a stage.
    """
    __tablename__ = "workflow_tasks"

    workflow_stage_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("workflow_stages.id", ondelete="CASCADE"), nullable=False)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    assigned_agent_id: Mapped[Optional[uuid.UUID]] = mapped_column(Uuid, ForeignKey("agents.id", ondelete="SET NULL"), nullable=True)
    
    # Priority options: Low, Medium, High, Critical
    priority: Mapped[str] = mapped_column(String(50), default="Medium", nullable=False)
    
    # Status options: Pending, Ready, Assigned, Working, Waiting, Blocked, Review, Completed, Failed
    status: Mapped[str] = mapped_column(String(50), default="Pending", nullable=False)
    
    # Self referential task dependency: Task depends on depends_on completion.
    depends_on: Mapped[Optional[uuid.UUID]] = mapped_column(Uuid, ForeignKey("workflow_tasks.id", ondelete="SET NULL"), nullable=True)
    
    started_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    completed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    stage: Mapped["WorkflowStage"] = relationship(back_populates="tasks")
    assigned_agent: Mapped[Optional["Agent"]] = relationship(foreign_keys=[assigned_agent_id])
    dependency: Mapped[Optional["WorkflowTask"]] = relationship(remote_side="WorkflowTask.id")

    def __repr__(self) -> str:
        return f"<WorkflowTask title={self.title} status={self.status} priority={self.priority}>"


class WorkflowExecution(Base):
    """
    WorkflowExecution model representing chronological event triggers in a workflow timeline.
    """
    __tablename__ = "workflow_executions"

    workflow_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("workflows.id", ondelete="CASCADE"), nullable=False)
    
    # Event types: Workflow Started, Task Assigned, Task Completed, Stage Completed, Workflow Completed, etc.
    event: Mapped[str] = mapped_column(String(100), nullable=False)
    
    agent_id: Mapped[Optional[uuid.UUID]] = mapped_column(Uuid, ForeignKey("agents.id", ondelete="SET NULL"), nullable=True)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    metadata_json: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)

    # Relationships
    workflow: Mapped["Workflow"] = relationship(back_populates="executions")
    agent: Mapped[Optional["Agent"]] = relationship(foreign_keys=[agent_id])

    def __repr__(self) -> str:
        return f"<WorkflowExecution event={self.event} message={self.message}>"

import uuid
from datetime import datetime
from typing import List, Optional
from sqlalchemy import DateTime, Float, ForeignKey, Integer, String, Text, Uuid, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.app.models.base import Base

class Project(Base):
    """
    Project model representing client request definitions, tech stacks, and progression milestones.
    """
    __tablename__ = "projects"

    workspace_id: Mapped[Optional[uuid.UUID]] = mapped_column(Uuid, nullable=True)
    owner_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    
    # Status values: Draft, Planning, Architecture, Design, Development, Testing, Deployment, Completed, Archived
    status: Mapped[str] = mapped_column(String(50), default="Draft", nullable=False)
    
    # Priority values: Low, Medium, High, Critical
    priority: Mapped[str] = mapped_column(String(50), default="Medium", nullable=False)
    
    # Technology Stack represented as JSON array of strings
    technology_stack: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    
    visibility: Mapped[str] = mapped_column(String(50), default="private", nullable=False)
    current_phase: Mapped[str] = mapped_column(String(50), default="Planning", nullable=False)
    progress: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    estimated_completion: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    # Using string references to User avoids circular import locks
    owner: Mapped["User"] = relationship(foreign_keys=[owner_id])
    requirements: Mapped[List["ProjectRequirement"]] = relationship(
        back_populates="project",
        cascade="all, delete-orphan"
    )
    files: Mapped[List["ProjectFile"]] = relationship(
        back_populates="project",
        cascade="all, delete-orphan"
    )
    activities: Mapped[List["ProjectActivity"]] = relationship(
        back_populates="project",
        cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<Project name={self.name} status={self.status} progress={self.progress}%>"


class ProjectRequirement(Base):
    """
    ProjectRequirement model representing detailed functional requirements, PM user stories and specs.
    """
    __tablename__ = "project_requirements"

    project_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    type: Mapped[str] = mapped_column(String(100), nullable=False) # e.g. Functional, Non-Functional, User Story
    priority: Mapped[str] = mapped_column(String(50), default="Medium", nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="Draft", nullable=False) # e.g. Draft, Approved, In Progress, Verified

    # Relationships
    project: Mapped["Project"] = relationship(back_populates="requirements")

    def __repr__(self) -> str:
        return f"<ProjectRequirement title={self.title} priority={self.priority} status={self.status}>"


class ProjectFile(Base):
    """
    ProjectFile model representing uploaded spec sheets, design mockups, zip bundles, or diagrams.
    """
    __tablename__ = "project_files"

    project_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    filename: Mapped[str] = mapped_column(String(255), nullable=False)
    file_type: Mapped[str] = mapped_column(String(100), nullable=False)
    file_size: Mapped[int] = mapped_column(Integer, nullable=False) # In bytes
    storage_path: Mapped[str] = mapped_column(String(512), nullable=False) # Local disk path or object storage URI
    uploaded_by: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)

    # Relationships
    project: Mapped["Project"] = relationship(back_populates="files")
    uploader: Mapped["User"] = relationship(foreign_keys=[uploaded_by])

    def __repr__(self) -> str:
        return f"<ProjectFile filename={self.filename} size={self.file_size} bytes>"


class ProjectActivity(Base):
    """
    ProjectActivity model representing audit logs tracking team actions and phase progressions.
    """
    __tablename__ = "project_activities"

    project_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    user_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    activity: Mapped[str] = mapped_column(String(255), nullable=False)
    metadata_json: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False) # Custom key-value event logs

    # Relationships
    project: Mapped["Project"] = relationship(back_populates="activities")
    user: Mapped["User"] = relationship(foreign_keys=[user_id])

    def __repr__(self) -> str:
        return f"<ProjectActivity event={self.activity} project={self.project_id}>"

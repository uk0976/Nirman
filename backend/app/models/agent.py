import uuid
from typing import List, Optional
from sqlalchemy import Boolean, Float, ForeignKey, String, Text, Uuid, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.app.models.base import Base

class AgentDepartment(Base):
    """
    AgentDepartment model representing organizational departments in the AI Software Company.
    """
    __tablename__ = "agent_departments"

    name: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    def __repr__(self) -> str:
        return f"<AgentDepartment name={self.name}>"


class AgentSkill(Base):
    """
    AgentSkill model cataloging specific developer skills (e.g. FastAPI, CI/CD, React).
    """
    __tablename__ = "agent_skills"

    name: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    category: Mapped[str] = mapped_column(String(100), nullable=False) # e.g. Backend, Frontend, DevOps, Design
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    def __repr__(self) -> str:
        return f"<AgentSkill name={self.name} category={self.category}>"


class AgentCapability(Base):
    """
    AgentCapability model representing system capabilities (e.g. SQL Generation, Docker Build).
    """
    __tablename__ = "agent_capabilities"

    name: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    def __repr__(self) -> str:
        return f"<AgentCapability name={self.name}>"


class Agent(Base):
    """
    Agent model representing virtual AI employees working at Nirman.
    """
    __tablename__ = "agents"

    name: Mapped[str] = mapped_column(String(100), nullable=False)
    display_name: Mapped[str] = mapped_column(String(100), nullable=False)
    role: Mapped[str] = mapped_column(String(100), nullable=False) # e.g. CEO, Product Manager, Architect
    department: Mapped[str] = mapped_column(String(100), nullable=False) # e.g. Management, Architecture
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    avatar: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    
    # Status options: Idle, Working, Thinking, Planning, Reviewing, Coding, Testing, Deploying, Offline
    status: Mapped[str] = mapped_column(String(50), default="Offline", nullable=False)
    
    availability: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    current_project_id: Mapped[Optional[uuid.UUID]] = mapped_column(Uuid, ForeignKey("projects.id", ondelete="SET NULL"), nullable=True)
    current_task_id: Mapped[Optional[uuid.UUID]] = mapped_column(Uuid, nullable=True)
    workload_percentage: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    
    # List of skills & capabilities stored as JSON arrays
    skills: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    capabilities: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    
    experience_level: Mapped[str] = mapped_column(String(50), default="Senior", nullable=False) # Junior, Mid, Senior, Lead, Principal
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    # Relationships
    current_project: Mapped[Optional["Project"]] = relationship(foreign_keys=[current_project_id])

    def __repr__(self) -> str:
        return f"<Agent name={self.name} role={self.role} status={self.status}>"


class AgentConversation(Base):
    """
    AgentConversation model representing message threads/Slack-like rooms for collaboration.
    """
    __tablename__ = "agent_conversations"

    project_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    title: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)

    # Relationships
    project: Mapped["Project"] = relationship(foreign_keys=[project_id])
    messages: Mapped[List["AgentMessage"]] = relationship(
        back_populates="conversation",
        cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<AgentConversation id={self.id} title={self.title}>"


class AgentMessage(Base):
    """
    AgentMessage model representing individual message transmissions.
    """
    __tablename__ = "agent_messages"

    conversation_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("agent_conversations.id", ondelete="CASCADE"), nullable=False)
    sender_agent_id: Mapped[Optional[uuid.UUID]] = mapped_column(Uuid, ForeignKey("agents.id", ondelete="SET NULL"), nullable=True)
    sender_user_id: Mapped[Optional[uuid.UUID]] = mapped_column(Uuid, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    content: Mapped[str] = mapped_column(Text, nullable=False)

    # Relationships
    conversation: Mapped["AgentConversation"] = relationship(back_populates="messages")
    sender_agent: Mapped[Optional["Agent"]] = relationship(foreign_keys=[sender_agent_id])
    sender_user: Mapped[Optional["User"]] = relationship(foreign_keys=[sender_user_id])

    def __repr__(self) -> str:
        return f"<AgentMessage sender_agent={self.sender_agent_id} sender_user={self.sender_user_id}>"


class AgentMemory(Base):
    """
    AgentMemory model storing semantic and contextual data for individual agents.
    """
    __tablename__ = "agent_memories"

    agent_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("agents.id", ondelete="CASCADE"), nullable=False)
    memory_type: Mapped[str] = mapped_column(String(50), nullable=False) # e.g. Short-term, Long-term, Context
    key: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    value: Mapped[str] = mapped_column(Text, nullable=False)
    metadata_json: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)

    # Relationships
    agent: Mapped["Agent"] = relationship(foreign_keys=[agent_id])

    def __repr__(self) -> str:
        return f"<AgentMemory agent={self.agent_id} type={self.memory_type} key={self.key}>"

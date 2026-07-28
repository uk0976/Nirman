import uuid
from datetime import datetime
from typing import Optional, List
from sqlalchemy import String, Text, ForeignKey, JSON, Integer, DateTime, Boolean, Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.app.models.base import Base

class WarRoomSession(Base):
    """
    WarRoomSession represents a dynamic collaborative discussion meeting.
    """
    __tablename__ = "warroom_sessions"

    project_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    workflow_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("workflows.id", ondelete="CASCADE"), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    purpose: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="Preparing", nullable=False) # Preparing, Running, Waiting, Voting, Approved, Rejected, Completed
    created_by: Mapped[Optional[uuid.UUID]] = mapped_column(Uuid, nullable=True)
    started_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    ended_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)

    # Relationships
    project: Mapped["Project"] = relationship(foreign_keys=[project_id])
    workflow: Mapped["Workflow"] = relationship(foreign_keys=[workflow_id])
    participants: Mapped[List["WarRoomParticipant"]] = relationship(back_populates="session", cascade="all, delete-orphan")
    messages: Mapped[List["WarRoomMessage"]] = relationship(back_populates="session", cascade="all, delete-orphan")
    decisions: Mapped[List["Decision"]] = relationship(back_populates="session", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<WarRoomSession id={self.id} title={self.title} status={self.status}>"


class WarRoomParticipant(Base):
    """
    Tracks AI agent participants inside a WarRoom Session.
    """
    __tablename__ = "warroom_participants"

    session_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("warroom_sessions.id", ondelete="CASCADE"), nullable=False)
    agent_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("agents.id", ondelete="CASCADE"), nullable=False)
    role: Mapped[str] = mapped_column(String(100), nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="Joined", nullable=False) # Joined, Speaking, Idle, Left
    joined_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    session: Mapped["WarRoomSession"] = relationship(back_populates="participants")
    agent: Mapped["Agent"] = relationship(foreign_keys=[agent_id])

    def __repr__(self) -> str:
        return f"<WarRoomParticipant session={self.session_id} agent={self.agent_id} role={self.role}>"


class WarRoomMessage(Base):
    """
    Represents an individual message posted by an agent in a session.
    """
    __tablename__ = "warroom_messages"

    session_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("warroom_sessions.id", ondelete="CASCADE"), nullable=False)
    agent_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("agents.id", ondelete="CASCADE"), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    message_type: Mapped[str] = mapped_column(String(50), default="Suggestion", nullable=False) # Suggestion, Question, Concern, Proposal, Review, Approval, Rejection, Summary
    parent_message_id: Mapped[Optional[uuid.UUID]] = mapped_column(Uuid, nullable=True)
    confidence: Mapped[float] = mapped_column(default=0.90, nullable=False)

    # Relationships
    session: Mapped["WarRoomSession"] = relationship(back_populates="messages")
    agent: Mapped["Agent"] = relationship(foreign_keys=[agent_id])

    def __repr__(self) -> str:
        return f"<WarRoomMessage session={self.session_id} agent={self.agent_id} type={self.message_type}>"


class Decision(Base):
    """
    Represents a design decision draft or resolution inside a session.
    """
    __tablename__ = "warroom_decisions"

    session_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("warroom_sessions.id", ondelete="CASCADE"), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    decision_type: Mapped[str] = mapped_column(String(100), nullable=False) # e.g. Architecture, Tech Stack, Security
    approved: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    approved_by: Mapped[Optional[uuid.UUID]] = mapped_column(Uuid, nullable=True)
    confidence: Mapped[float] = mapped_column(default=0.0, nullable=False)
    reasoning: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Relationships
    session: Mapped["WarRoomSession"] = relationship(back_populates="decisions")
    votes: Mapped[List["Vote"]] = relationship(back_populates="decision", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Decision id={self.id} title={self.title} approved={self.approved}>"


class Vote(Base):
    """
    Represents a specific agent vote on a decision draft.
    """
    __tablename__ = "warroom_votes"

    decision_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("warroom_decisions.id", ondelete="CASCADE"), nullable=False)
    agent_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("agents.id", ondelete="CASCADE"), nullable=False)
    vote: Mapped[str] = mapped_column(String(50), nullable=False) # Approve, Reject, Abstain, NeedsInfo
    reason: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    decision: Mapped["Decision"] = relationship(back_populates="votes")
    agent: Mapped["Agent"] = relationship(foreign_keys=[agent_id])

    def __repr__(self) -> str:
        return f"<Vote decision={self.decision_id} agent={self.agent_id} vote={self.vote}>"

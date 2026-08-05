from datetime import datetime, timezone
import uuid
from sqlalchemy import String, Text, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base

class Project(Base):
    __tablename__ = "projects"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="DISCOVERY")  # DISCOVERY, PLANNING, IN_PROGRESS, COMPLETED, ARCHIVED
    sdlc_phase: Mapped[int] = mapped_column(default=1)  # Phase 1 to 20
    tech_stack: Mapped[dict] = mapped_column(JSON, default=dict)
    architecture_style: Mapped[str] = mapped_column(String(100), default="MODULAR_MONOLITH")
    health_score: Mapped[int] = mapped_column(default=100)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

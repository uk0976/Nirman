from datetime import datetime, timezone
import uuid
from sqlalchemy import String, Text, DateTime, JSON, Float
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base

class Agent(Base):
    __tablename__ = "agents"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    role: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False) # CEO, PRODUCT_MANAGER, SYSTEM_ARCHITECT, DB_ARCHITECT, etc.
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    avatar: Mapped[str] = mapped_column(String(255), nullable=True)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    capabilities: Mapped[list] = mapped_column(JSON, default=list)
    system_prompt: Mapped[str] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="IDLE") # IDLE, THINKING, EXECUTING, WAITING, ERROR
    completed_tasks: Mapped[int] = mapped_column(default=0)
    accuracy_rating: Mapped[float] = mapped_column(Float, default=99.4)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))

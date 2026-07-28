from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from backend.app.models.base import Base

class User(Base):
    """
    User database model representing registrants, developers, admins and clients.
    """
    __tablename__ = "users"
    
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(50), default="user", nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    def __repr__(self) -> str:
        return f"<User email={self.email} role={self.role} is_active={self.is_active}>"

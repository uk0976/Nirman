from datetime import datetime
import uuid
from typing import Optional
from pydantic import BaseModel, EmailStr, ConfigDict, Field

class UserBase(BaseModel):
    email: EmailStr = Field(..., description="Unique email address of the user")
    full_name: str = Field(..., min_length=1, max_length=100, description="Full name of the user")
    role: str = Field("user", description="System role (e.g. user, admin, developer, client)")
    is_active: bool = Field(True, description="Flag indicating if the user is active")
    is_verified: bool = Field(False, description="Flag indicating if the user's email is verified")

class UserCreate(UserBase):
    password: str = Field(..., min_length=8, description="Plaintext password, minimum 8 characters")

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    role: Optional[str] = None
    is_active: Optional[bool] = None
    is_verified: Optional[bool] = None
    password: Optional[str] = None

class UserResponse(UserBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    # Pydantic v2 configurations
    model_config = ConfigDict(from_attributes=True)

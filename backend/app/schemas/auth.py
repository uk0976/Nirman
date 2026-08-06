from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, EmailStr, ConfigDict

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None
    terms_accepted: Optional[bool] = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    remember_me: Optional[bool] = False

class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordResetConfirm(BaseModel):
    token: str
    new_password: str

class EmailVerificationRequest(BaseModel):
    token: str

class OnboardingSubmit(BaseModel):
    role_type: str
    organization_name: Optional[str] = None
    ai_provider_preference: Optional[str] = "GEMINI"
    experience_level: Optional[str] = "INTERMEDIATE"

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    full_name: Optional[str] = None
    organization_name: Optional[str] = None
    role: str
    role_type: Optional[str] = "DEVELOPER"
    is_active: bool
    is_verified: bool
    onboarding_completed: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    refresh_token: Optional[str] = None
    token_type: str = "bearer"
    user: Optional[UserResponse] = None

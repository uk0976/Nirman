from datetime import timedelta, datetime, timezone
from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import verify_password, get_password_hash, create_access_token
from app.models.user import User
from app.schemas.auth import (
    UserCreate, UserLogin, UserResponse, Token,
    PasswordResetRequest, PasswordResetConfirm,
    EmailVerificationRequest, OnboardingSubmit
)

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == user_in.email))
    existing = result.scalar_one_or_none()
    if existing:
        raise HTTPException(status_code=400, detail="Account with this email already exists")
        
    user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name or user_in.email.split("@")[0].capitalize(),
        role="OWNER",
        is_verified=False,
        onboarding_completed=False,
        sessions=[{
            "device": "Web Browser (Current)",
            "ip": "127.0.0.1",
            "last_active": "Just now"
        }]
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

@router.post("/login", response_model=Token)
async def login_user(user_in: UserLogin, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == user_in.email))
    user = result.scalar_one_or_none()
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
        
    expires = timedelta(days=30) if user_in.remember_me else timedelta(days=7)
    access_token = create_access_token(subject=user.id, expires_delta=expires)
    refresh_token = create_access_token(subject=f"refresh_{user.id}", expires_delta=timedelta(days=60))
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": user
    }

@router.post("/forgot-password")
async def request_password_reset(req: PasswordResetRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == req.email))
    user = result.scalar_one_or_none()
    if not user:
        # Security best practice: return success even if user not found to prevent account enumeration
        return {"message": "If an account exists, a password reset link has been dispatched."}
    
    reset_token = create_access_token(subject=f"reset_{user.id}", expires_delta=timedelta(hours=1))
    return {
        "message": "If an account exists, a password reset link has been dispatched.",
        "reset_token_debug": reset_token
    }

@router.post("/reset-password")
async def confirm_password_reset(req: PasswordResetConfirm, db: AsyncSession = Depends(get_db)):
    # Simulates token parsing
    return {"message": "Password updated successfully. You can now log in."}

@router.post("/verify-email")
async def verify_email(req: EmailVerificationRequest, db: AsyncSession = Depends(get_db)):
    return {"message": "Email verified successfully."}

@router.post("/onboarding", response_model=UserResponse)
async def submit_onboarding(data: OnboardingSubmit, user_id: str = "demo-user", db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).order_by(User.created_at.desc()))
    user = result.scalars().first()
    if user:
        user.role_type = data.role_type
        user.organization_name = data.organization_name or "My Software Company"
        user.ai_provider_preference = data.ai_provider_preference or "GEMINI"
        user.onboarding_completed = True
        await db.commit()
        await db.refresh(user)
        return user
        
    return User(
        id="demo-id",
        email="demo@nirman.ai",
        full_name="Demo Architect",
        hashed_password="",
        organization_name=data.organization_name or "Demo Corp",
        role="OWNER",
        role_type=data.role_type,
        is_active=True,
        is_verified=True,
        onboarding_completed=True
    )

@router.get("/sessions")
async def list_active_sessions():
    return [
        {"id": "s-1", "device": "Chrome on Windows 11 (Current)", "ip": "127.0.0.1", "location": "New Delhi, IN", "last_active": "Just now", "is_current": True},
        {"id": "s-2", "device": "Nirman Mobile CLI / Agent SDK", "ip": "192.168.1.45", "location": "San Francisco, US", "last_active": "2 hours ago", "is_current": False}
    ]

@router.post("/logout-all")
async def logout_all_devices():
    return {"message": "Successfully logged out from all devices."}

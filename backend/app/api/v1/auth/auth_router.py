from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.core.database import get_db
from backend.app.schemas.auth import LoginRequest, TokenResponse, RefreshTokenRequest
from backend.app.schemas.user import UserCreate, UserResponse
from backend.app.services.auth_service import AuthService
from backend.app.utils.exceptions import (
    UserAlreadyExistsException,
    InvalidCredentialsException,
    InactiveUserException,
    InvalidTokenException
)

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
    description="Creates a new user profile with a default 'user' role and secure hashed password."
)
async def register(
    user_in: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    auth_service = AuthService(db)
    try:
        return await auth_service.register_user(user_in)
    except UserAlreadyExistsException as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=e.message
        )
    except Exception:
        # DB connection exception fallback
        return auth_service.register_user_offline(user_in)


@router.post(
    "/login",
    response_model=TokenResponse,
    summary="Authenticate user and obtain JWT tokens",
    description="Validates user credentials and returns both JWT access and refresh tokens."
)
async def login(
    credentials: LoginRequest,
    db: AsyncSession = Depends(get_db)
):
    auth_service = AuthService(db)
    try:
        return await auth_service.login_user(credentials.email, credentials.password)
    except (InvalidCredentialsException, InactiveUserException) as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=e.message
        )
    except Exception:
        # DB connection exception fallback
        try:
            return await auth_service.login_user(credentials.email, credentials.password)
        except (InvalidCredentialsException, InactiveUserException) as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=e.message
            )


@router.post(
    "/refresh",
    response_model=TokenResponse,
    summary="Refresh JWT access tokens",
    description="Validates a refresh token and generates a fresh access token."
)
async def refresh(
    refresh_data: RefreshTokenRequest,
    db: AsyncSession = Depends(get_db)
):
    auth_service = AuthService(db)
    try:
        return await auth_service.refresh_access_token(refresh_data.refresh_token)
    except (InvalidTokenException, InactiveUserException) as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=e.message
        )

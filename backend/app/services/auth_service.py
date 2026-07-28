import uuid
import jwt
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.user import User
from backend.app.repositories.user_repository import UserRepository
from backend.app.schemas.user import UserCreate
from backend.app.core.config import settings
from backend.app.core.security import (
    get_password_hash,
    verify_password,
    create_access_token,
    create_refresh_token,
    decode_token
)
from backend.app.utils.exceptions import (
    UserAlreadyExistsException,
    InvalidCredentialsException,
    InactiveUserException,
    InvalidTokenException
)

class AuthService:
    def __init__(self, db: AsyncSession):
        """
        Service layer for managing authentication, registration and JWT sessions.
        """
        self.repo = UserRepository(db)
        self.db = db

    async def register_user(self, user_in: UserCreate) -> User:
        """
        Registers a new user after verifying that the email address is unique.
        """
        existing_user = await self.repo.get_by_email(user_in.email)
        if existing_user:
            raise UserAlreadyExistsException(f"Email {user_in.email} is already in use.")

        hashed_password = get_password_hash(user_in.password)
        
        # Strip password field and populate password_hash
        user_data = user_in.model_dump(exclude={"password"})
        user_data["password_hash"] = hashed_password
        
        user = await self.repo.create(user_data)
        await self.db.commit()
        await self.db.refresh(user)
        return user

    async def authenticate_user(self, email: str, plain_password: str) -> User:
        """
        Verifies credentials and returns the User object if successful.
        """
        user = await self.repo.get_by_email(email)
        if not user:
            raise InvalidCredentialsException("Invalid email or password.")
        
        if not verify_password(plain_password, user.password_hash):
            raise InvalidCredentialsException("Invalid email or password.")
            
        if not user.is_active:
            raise InactiveUserException("User account has been deactivated.")
            
        return user

    async def login_user(self, email: str, plain_password: str) -> dict:
        """
        Validates login and returns a structured TokenResponse dataset.
        """
        user = await self.authenticate_user(email, plain_password)
        
        payload = {
            "sub": str(user.id),
            "email": user.email,
            "role": user.role
        }
        
        access_token = create_access_token(data=payload)
        refresh_token = create_refresh_token(data=payload)
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
        }

    async def refresh_access_token(self, refresh_token: str) -> dict:
        """
        Validates a JWT refresh token and issues a new access token.
        """
        try:
            payload = decode_token(refresh_token, is_refresh=True)
            user_id = payload.get("sub")
            if not user_id:
                raise InvalidTokenException("Invalid refresh token payload.")
        except jwt.ExpiredSignatureError:
            raise InvalidTokenException("Refresh token has expired.")
        except jwt.PyJWTError:
            raise InvalidTokenException("Invalid refresh token signature or formatting.")

        try:
            uid = uuid.UUID(user_id)
        except ValueError:
            raise InvalidTokenException("Invalid user ID representation in token.")

        user = await self.repo.get(uid)
        if not user:
            raise InvalidTokenException("User associated with token not found.")
        if not user.is_active:
            raise InactiveUserException("User account is inactive.")

        # Re-issue new access token
        payload = {
            "sub": str(user.id),
            "email": user.email,
            "role": user.role
        }
        new_access_token = create_access_token(data=payload)
        
        return {
            "access_token": new_access_token,
            "refresh_token": refresh_token, # Reuse the existing refresh token
            "token_type": "bearer",
            "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
        }

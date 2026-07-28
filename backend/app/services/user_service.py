from typing import List, Optional
import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.user import User
from backend.app.repositories.user_repository import UserRepository
from backend.app.schemas.user import UserUpdate
from backend.app.core.security import get_password_hash

class UserService:
    def __init__(self, db: AsyncSession):
        """
        Service layer for user business operations.
        """
        self.repo = UserRepository(db)
        self.db = db

    async def get_user_by_id(self, user_id: uuid.UUID) -> Optional[User]:
        """
        Retrieve user by UUID.
        """
        return await self.repo.get(user_id)

    async def get_user_by_email(self, email: str) -> Optional[User]:
        """
        Retrieve user by email.
        """
        return await self.repo.get_by_email(email)

    async def get_users(self, skip: int = 0, limit: int = 100) -> List[User]:
        """
        Retrieve list of users with pagination.
        """
        return await self.repo.get_all(skip, limit)

    async def update_user(self, db_user: User, user_in: UserUpdate) -> User:
        """
        Update user profile properties and securely hashes any new passwords.
        """
        update_data = user_in.model_dump(exclude_unset=True)
        if "password" in update_data and update_data["password"]:
            update_data["password_hash"] = get_password_hash(update_data["password"])
            del update_data["password"]
            
        updated_user = await self.repo.update(db_user, update_data)
        await self.db.commit()
        await self.db.refresh(updated_user)
        return updated_user

    async def delete_user(self, user_id: uuid.UUID) -> Optional[User]:
        """
        Remove user by UUID.
        """
        deleted_user = await self.repo.delete(user_id)
        if deleted_user:
            await self.db.commit()
        return deleted_user

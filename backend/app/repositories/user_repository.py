from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.app.models.user import User
from backend.app.repositories.base import BaseRepository

class UserRepository(BaseRepository[User]):
    def __init__(self, db: AsyncSession):
        """
        User repository for database transactions relating to the User model.
        """
        super().__init__(User, db)

    async def get_by_email(self, email: str) -> Optional[User]:
        """
        Lookup a user by their email address.
        """
        query = select(User).filter(User.email == email)
        result = await self.db.execute(query)
        return result.scalars().first()

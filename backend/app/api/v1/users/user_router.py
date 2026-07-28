import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.core.database import get_db
from backend.app.core.dependencies import get_current_user, RoleChecker
from backend.app.models.user import User
from backend.app.schemas.user import UserResponse, UserUpdate
from backend.app.services.user_service import UserService

router = APIRouter(prefix="/users", tags=["Users"])

@router.get(
    "/me",
    response_model=UserResponse,
    summary="Get current user details",
    description="Returns the profile information of the currently logged-in user."
)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.put(
    "/me",
    response_model=UserResponse,
    summary="Update current user details",
    description="Updates credentials or profiles for the current user. Restricts unauthorized role escalation."
)
async def update_me(
    user_in: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Regular users cannot escalate their own system role privileges
    if user_in.role and user_in.role != current_user.role and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to modify your system role permissions level"
        )
        
    user_service = UserService(db)
    return await user_service.update_user(current_user, user_in)


@router.get(
    "/",
    response_model=List[UserResponse],
    summary="List all users",
    description="Retrieves a list of users with pagination. Accessible only by Administrators and Developers.",
    dependencies=[Depends(RoleChecker(["admin", "developer"]))]
)
async def list_users(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    user_service = UserService(db)
    return await user_service.get_users(skip, limit)


@router.get(
    "/{user_id}",
    response_model=UserResponse,
    summary="Get user by UUID",
    description="Returns a user profile. Users can query themselves; other profiles require admin or developer rights."
)
async def get_user_by_id(
    user_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if current_user.id != user_id and current_user.role not in ["admin", "developer"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access Denied: You cannot view other users' profiles"
        )
        
    user_service = UserService(db)
    user = await user_service.get_user_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user


@router.delete(
    "/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a user profile",
    description="Terminates a user profile. Restricted to Administrator accounts.",
    dependencies=[Depends(RoleChecker(["admin"]))]
)
async def delete_user(
    user_id: uuid.UUID,
    db: AsyncSession = Depends(get_db)
):
    user_service = UserService(db)
    deleted_user = await user_service.delete_user(user_id)
    if not deleted_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return

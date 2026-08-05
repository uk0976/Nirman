from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.artifact import Artifact
from app.schemas.artifact import ArtifactResponse

router = APIRouter()

@router.get("/{project_id}", response_model=List[ArtifactResponse])
async def list_artifacts(project_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Artifact).where(Artifact.project_id == project_id))
    return result.scalars().all()

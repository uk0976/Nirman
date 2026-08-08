from fastapi import APIRouter
from sqlalchemy import text
from app.core.config import settings
from app.core.database import AsyncSessionLocal

router = APIRouter()

@router.get("/health")
async def health_check():
    db_status = "error"
    try:
        async with AsyncSessionLocal() as session:
            result = await session.execute(text("SELECT 1"))
            if result.scalar() == 1:
                db_status = "ok"
    except Exception as e:
        db_status = f"error: {str(e)}"

    return {
        "status": "ok" if db_status == "ok" else "degraded",
        "platform": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": "development",
        "services": {
            "database": db_status,
            "redis": "ok (simulated fallback)"
        },
        "sdlc_phases_supported": 20,
        "agents_available": 14
    }

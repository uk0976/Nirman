import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from sqlalchemy.sql import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.core.config import settings
from backend.app.core.logging import logger
from backend.app.core.database import engine, get_db, AsyncSessionLocal
from backend.app.api.v1.router import v1_router
from backend.app.middleware.logging import RequestLoggingMiddleware
from backend.app.middleware.security import SecurityHeadersMiddleware
from backend.app.utils.exceptions import (
    NirmanException,
    UserAlreadyExistsException,
    InvalidCredentialsException,
    UserNotFoundException,
    InactiveUserException,
    InvalidTokenException,
    UnauthorizedException
)

# Startup & Shutdown lifecycle manager
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Log system startup details
    logger.info(f"Nirman Backend platform starting up in '{settings.ENVIRONMENT}' environment...")
    
    # Auto-seed database metadata and AI agents if empty on boot
    try:
        async with AsyncSessionLocal() as session:
            from backend.app.services.agent_service import AgentService
            agent_service = AgentService(session)
            await agent_service.seed_agents_database_if_empty()
            logger.info("Database startup checks: agents catalog is seeded and healthy.")
    except Exception as e:
        logger.error(f"Failed performing database startup seeding: {str(e)}", exc_info=True)

    yield
    # Cleanup connection pools on shutdown
    logger.info("Nirman Backend platform shutting down. Closing database pools...")
    await engine.dispose()

# Instantiate FastAPI application
app = FastAPI(
    title="Nirman (निर्माण)",
    description="Backend API foundation for the Nirman Autonomous AI Software Company Platform",
    version="1.0.0",
    lifespan=lifespan
)

# Apply Middlewares (evaluation order is bottom-up for ASGI middlewares)
# 1. Custom Security headers
app.add_middleware(SecurityHeadersMiddleware)

# 2. CORS configuration
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# 3. Request timing & logger interceptor
app.add_middleware(RequestLoggingMiddleware)


# =====================================================================
# GLOBAL EXCEPTION HANDLERS
# =====================================================================

@app.exception_handler(NirmanException)
async def domain_exception_handler(request: Request, exc: NirmanException):
    """
    Translates custom domain exception types into standard HTTP error responses.
    """
    status_code = status.HTTP_400_BAD_REQUEST
    
    if isinstance(exc, (InvalidCredentialsException, InvalidTokenException)):
        status_code = status.HTTP_401_UNAUTHORIZED
    elif isinstance(exc, (InactiveUserException, UnauthorizedException)):
        status_code = status.HTTP_403_FORBIDDEN
    elif isinstance(exc, UserNotFoundException):
        status_code = status.HTTP_404_NOT_FOUND
        
    return JSONResponse(
        status_code=status_code,
        content={"detail": exc.message}
    )


@app.exception_handler(SQLAlchemyError)
async def database_exception_handler(request: Request, exc: SQLAlchemyError):
    """
    Prevents database-specific errors and tracebacks from leaking in response payloads.
    """
    logger.critical(f"Database Integrity Error: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail="A database system error occurred. Access logs for details."
    )


@app.exception_handler(Exception)
async def catch_all_exception_handler(request: Request, exc: Exception):
    """
    Global backup catch-all for untracked python exceptions.
    """
    logger.error(f"Unhandled System Error: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal system error occurred."}
    )


# =====================================================================
# SYSTEM ROUTES
# =====================================================================

@app.get(
    "/",
    tags=["System"],
    summary="Root greeting message"
)
async def root():
    return {
        "platform": "Nirman (निर्माण)",
        "status": "online",
        "description": "Autonomous AI Software Company SaaS platform backend.",
        "documentation": "/docs"
    }


@app.get(
    "/health",
    tags=["System"],
    summary="Active system health check"
)
async def health_check(db: AsyncSession = Depends(get_db)):
    """
    Executes live DB queries to check server connection metrics and status.
    """
    db_status = "unhealthy"
    try:
        await db.execute(text("SELECT 1"))
        db_status = "healthy"
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"
        
    return {
        "status": "online" if db_status == "healthy" else "degraded",
        "database": db_status,
        "environment": settings.ENVIRONMENT
    }

# Register V1 API routers namespace
app.include_router(v1_router, prefix="/api/v1")

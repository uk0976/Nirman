import logging
import sys
from backend.app.core.config import settings

def setup_logging() -> None:
    """
    Sets up enterprise logging format and handlers.
    In development, it uses human-readable formatting.
    In production, it can be extended to use structured JSON.
    """
    log_level = getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO)
    
    # High-quality readable console formatter
    log_format = (
        "[%(asctime)s.%(msecs)03d] %(levelname)-8s [%(name)s:%(lineno)d] - %(message)s"
    )
    date_format = "%Y-%m-%d %H:%M:%S"
    
    # Configure root logger
    logging.basicConfig(
        level=log_level,
        format=log_format,
        datefmt=date_format,
        handlers=[
            logging.StreamHandler(sys.stdout)
        ],
        force=True
    )
    
    # Suppress verbose loggers from dependencies unless debug is active
    if settings.LOG_LEVEL.upper() != "DEBUG":
        logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
        logging.getLogger("uvicorn.error").setLevel(logging.WARNING)
        logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)
        logging.getLogger("aiosqlite").setLevel(logging.WARNING)
    
    logger = logging.getLogger("app")
    logger.info(f"Structured logging system initialized with level: {settings.LOG_LEVEL}")

# Initialize logging when module is imported
setup_logging()
logger = logging.getLogger("app")

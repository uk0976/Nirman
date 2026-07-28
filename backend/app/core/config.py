import os
from pathlib import Path
from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

# Base Directory of the Project
BASE_DIR = Path(__file__).resolve().parent.parent.parent

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=os.path.join(BASE_DIR, ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )
    
    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "INFO"
    
    # PostgreSQL configuration
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "nirman"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432
    
    # Database URL
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/nirman"
    
    # Security & JWT Configuration
    JWT_SECRET_KEY: str
    JWT_REFRESH_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # CORS Origins (allow comma-separated string or list)
    BACKEND_CORS_ORIGINS: Union[str, List[str]] = ["*"]
    
    # File Upload Directory
    UPLOAD_DIR: str = os.path.join(BASE_DIR, "uploads")

    # OpenAI & Codex configurations
    OPENAI_API_KEY: str = "mock_key"
    OPENAI_MODEL: str = "gpt-4o"
    OPENAI_CODE_MODEL: str = "gpt-4o"
    OPENAI_BASE_URL: str = "https://api.openai.com/v1"
    OPENAI_TIMEOUT: float = 30.0
    OPENAI_MAX_RETRIES: int = 3
    OPENAI_TEMPERATURE: float = 0.7
    OPENAI_MAX_OUTPUT_TOKENS: int = 4096


    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        return v

# Instantiate global settings
settings = Settings()

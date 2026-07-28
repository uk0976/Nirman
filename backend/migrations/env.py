import asyncio
from logging.config import fileConfig

from sqlalchemy import pool
from sqlalchemy.ext.asyncio import async_engine_from_config
from alembic import context

# Import settings and models for autogenerate support
from backend.app.core.config import settings
from backend.app.models.base import Base
from backend.app.models.user import User  # Must be imported to register table metadata
from backend.app.models.project import Project, ProjectRequirement, ProjectFile, ProjectActivity
from backend.app.models.agent import Agent, AgentDepartment, AgentSkill, AgentCapability, AgentMemory, AgentConversation, AgentMessage
from backend.app.models.workflow import Workflow, WorkflowStage, WorkflowTask, WorkflowExecution
from backend.app.models.ai_audit import AIAuditLog
from backend.app.models.warroom import WarRoomSession, WarRoomParticipant, WarRoomMessage, Decision, Vote




# Access the Alembic configuration object
config = context.config

# Interpret the config file for Python logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Set target metadata for autogenerate detection
target_metadata = Base.metadata

# Inject database URL from settings dynamically
config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.
    Emits SQL scripts directly to output.
    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection):
    """
    Helper transaction execution callback invoked synchronously.
    """
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online() -> None:
    """Run migrations in 'online' mode.
    Connects to database engine asynchronously.
    """
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())

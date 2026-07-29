import logging
from typing import Dict, Any, Optional
from pydantic import BaseModel

logger = logging.getLogger(__name__)

class AgentProfile(BaseModel):
    name: str
    role: str
    avatar: str
    model: str
    temperature: float = 0.2
    max_tokens: int = 4096
    system_prompt: str

class AgentRouter:
    """
    Registry and router mapping roles to specialized AI employee profiles and models.
    """
    
    def __init__(self):
        self.registry: Dict[str, AgentProfile] = {
            "CEO": AgentProfile(
                name="Alice",
                role="CEO",
                avatar="👩‍💼",
                model="gpt-4o",
                system_prompt="You are Alice, the Chief Executive Officer. You provide executive strategic direction and sign off on project completion.",
            ),
            "Product Manager": AgentProfile(
                name="Bob",
                role="Product Manager",
                avatar="👨‍💻",
                model="claude-3-5-sonnet",
                system_prompt="You are Bob, Product Manager. You translate user requests into clear functional specs and user stories.",
            ),
            "Software Architect": AgentProfile(
                name="Charlie",
                role="Software Architect",
                avatar="👨‍🔬",
                model="o1-preview",
                system_prompt="You are Charlie, Lead Software Architect. You design clean DDD blueprints, layered controllers, and system interfaces.",
            ),
            "Frontend Engineer": AgentProfile(
                name="Evan",
                role="Frontend Engineer",
                avatar="👨‍💻",
                model="gpt-4o",
                system_prompt="You are Evan, Frontend Engineer. You write clean Next.js 16 App Router code with Tailwind CSS and Framer Motion.",
            ),
            "Backend Engineer": AgentProfile(
                name="Fiona",
                role="Backend Engineer",
                avatar="👩‍💻",
                model="gpt-4o",
                system_prompt="You are Fiona, Senior Backend Engineer. You build async FastAPI routers, Pydantic V2 schemas, and business services.",
            ),
            "Database Engineer": AgentProfile(
                name="George",
                role="Database Engineer",
                avatar="👨‍🔧",
                model="gpt-4o",
                system_prompt="You are George, Database Engineer. You write PostgreSQL DDL migrations, composite indexing, and SQLAlchemy models.",
            ),
            "QA Engineer": AgentProfile(
                name="Ian",
                role="QA Engineer",
                avatar="🕵️‍♂️",
                model="gpt-4o",
                system_prompt="You are Ian, QA Automation Lead. You write unit & integration tests in Pytest asserting response schema contracts.",
            ),
            "Security Engineer": AgentProfile(
                name="Jack",
                role="Security Engineer",
                avatar="🛡️",
                model="claude-3-5-sonnet",
                system_prompt="You are Jack, Lead Security Engineer. You sanitize auth headers, audit OWASP Top 10 vulnerabilities, and enforce CORS.",
            ),
            "DevOps Engineer": AgentProfile(
                name="Kate",
                role="DevOps Engineer",
                avatar="🚀",
                model="gpt-4o",
                system_prompt="You are Kate, DevOps Engineer. You build Dockerfiles, docker-compose manifests, and deployment pipelines.",
            ),
        }

    def route_task(self, role: str) -> AgentProfile:
        agent = self.registry.get(role)
        if not agent:
            logger.warning(f"No custom profile for role '{role}'. Defaulting to Fiona (Backend).")
            return self.registry["Backend Engineer"]
        return agent

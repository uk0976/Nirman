import uuid
from typing import Dict, List, Optional
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.models.agent import Agent, AgentDepartment, AgentSkill, AgentCapability
from backend.app.repositories.agent_repository import AgentRepository
from backend.app.schemas.agent import AgentUpdateStatus, AgentUpdateAvailability

class AgentService:
    def __init__(self, db: AsyncSession):
        """
        Service layer coordinating AI employees profiles, workload, and assignments.
        """
        self.repo = AgentRepository(db)
        self.db = db

    async def get_agent_by_id(self, agent_id: uuid.UUID) -> Optional[Agent]:
        """
        Retrieve a single agent profile.
        """
        return await self.repo.get(agent_id)

    async def search_and_filter_agents(
        self,
        query: Optional[str] = None,
        status: Optional[str] = None,
        availability: Optional[bool] = None,
        department: Optional[str] = None,
        project_id: Optional[uuid.UUID] = None,
        skill: Optional[str] = None,
        skip: int = 0,
        limit: int = 100
    ) -> List[Agent]:
        """
        Retrieves a filtered list of agents.
        """
        return await self.repo.search_and_filter_agents(
            query=query,
            status=status,
            availability=availability,
            department=department,
            project_id=project_id,
            skill=skill,
            skip=skip,
            limit=limit
        )

    async def update_agent_status(self, agent_id: uuid.UUID, status_in: AgentUpdateStatus) -> Optional[Agent]:
        """
        Updates an agent's current status and triggers workload recalculations.
        """
        agent = await self.repo.get(agent_id)
        if not agent:
            return None

        agent.status = status_in.status
        self._recalculate_workload(agent)
        
        await self.db.flush()
        await self.db.commit()
        await self.db.refresh(agent)
        return agent

    async def update_agent_availability(self, agent_id: uuid.UUID, availability_in: AgentUpdateAvailability) -> Optional[Agent]:
        """
        Updates an agent's availability flag.
        """
        agent = await self.repo.get(agent_id)
        if not agent:
            return None

        agent.availability = availability_in.availability
        
        await self.db.flush()
        await self.db.commit()
        await self.db.refresh(agent)
        return agent

    async def assign_agent_to_project(self, agent_id: uuid.UUID, project_id: Optional[uuid.UUID]) -> Optional[Agent]:
        """
        Links an agent to a project and recalculates workload.
        """
        agent = await self.repo.get(agent_id)
        if not agent:
            return None

        agent.current_project_id = project_id
        if project_id and agent.status == "Offline":
            # Automatically set active status when assigned a project
            agent.status = "Idle"
            agent.availability = True
            
        self._recalculate_workload(agent)
        
        await self.db.flush()
        await self.db.commit()
        await self.db.refresh(agent)
        return agent

    async def assign_agent_to_task(self, agent_id: uuid.UUID, task_id: Optional[uuid.UUID]) -> Optional[Agent]:
        """
        Links an agent to a task and recalculates workload.
        """
        agent = await self.repo.get(agent_id)
        if not agent:
            return None

        agent.current_task_id = task_id
        self._recalculate_workload(agent)
        
        await self.db.flush()
        await self.db.commit()
        await self.db.refresh(agent)
        return agent

    def _recalculate_workload(self, agent: Agent) -> None:
        """
        Internal utility mapping agent assignment states to workload percentages.
        """
        # Base workload logic:
        # Idle/Offline with no assignments = 0%
        # Project assigned with no task = 40%
        # Task assigned with no project = 60%
        # Both project and task assigned = 100%
        if agent.status == "Offline":
            agent.workload_percentage = 0.0
            return

        workload = 0.0
        if agent.current_project_id:
            workload += 40.0
        if agent.current_task_id:
            workload += 60.0
            
        # Bound limits
        agent.workload_percentage = min(workload, 100.0)

    async def get_departments(self) -> List[AgentDepartment]:
        """
        List all departments.
        """
        stmt = select(AgentDepartment).order_by(AgentDepartment.name.asc())
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def get_skills(self) -> List[AgentSkill]:
        """
        List all skills.
        """
        stmt = select(AgentSkill).order_by(AgentSkill.name.asc())
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def get_status_summary(self) -> Dict[str, any]:
        """
        Compiles health statistics on currently active and online agents.
        """
        agents = await self.repo.get_all(0, 100)
        
        offline_count = 0
        busy_count = 0
        online_count = 0
        status_distribution = {}

        for a in agents:
            status_distribution[a.status] = status_distribution.get(a.status, 0) + 1
            if a.status == "Offline":
                offline_count += 1
            else:
                online_count += 1
                if a.status in ["Working", "Thinking", "Coding", "Testing", "Deploying"]:
                    busy_count += 1

        return {
            "online_count": online_count,
            "busy_count": busy_count,
            "offline_count": offline_count,
            "status_distribution": status_distribution
        }

    # =====================================================================
    # SEEDING INFRASTRUCTURE
    # =====================================================================

    async def seed_agents_database_if_empty(self) -> None:
        """
        Seeds departments, skills, capabilities, and the 12 core AI employees if not already present.
        """
        # Check if already seeded
        dept_check = await self.db.execute(select(func.count(AgentDepartment.id)))
        if dept_check.scalar() > 0:
            return # Seeding already completed

        # 1. Seed Departments
        departments = [
            ("Management", "Responsible for company direction and oversight"),
            ("Product", "Responsible for PRDs, functional specs, and milestones"),
            ("Architecture", "Designs folder structures, databases, and microservices"),
            ("Design", "Designs user experience and wireframes"),
            ("Frontend", "Implements Next.js/Tailwind user interfaces"),
            ("Backend", "Implements business logic APIs using FastAPI"),
            ("Database", "Manages PostgreSQL schemas and optimizations"),
            ("Artificial Intelligence", "Designs custom prompt flows and RAG pipelines"),
            ("Quality Assurance", "Implements pytest frameworks and finds bugs"),
            ("Security", "Ensures OWASP compliance and reviews integrations"),
            ("DevOps", "Orchestrates Docker, Docker Compose, and CI/CD pipelines"),
            ("Documentation", "Maintains READMEs and API documentation Guides")
        ]
        
        for name, desc in departments:
            self.db.add(AgentDepartment(name=name, description=desc))

        # 2. Seed Skills
        skills = [
            ("Strategic Planning", "Management", "CEO leadership planning"),
            ("PRD Drafting", "Product", "Writing functional requirements"),
            ("System Design", "Architecture", "Engineering system structures"),
            ("Database Modeling", "Database", "Designing ERDs"),
            ("Wireframing", "Design", "Creating component layouts"),
            ("React", "Frontend", "Building reusable web components"),
            ("FastAPI", "Backend", "Building async APIs"),
            ("SQL", "Database", "Writing relational SQL"),
            ("Prompt Engineering", "Artificial Intelligence", "Optimizing LLM flows"),
            ("Pytest", "Quality Assurance", "Writing automated test suites"),
            ("Security Auditing", "Security", "Verifying credentials and OWASP guides"),
            ("Docker", "DevOps", "Building container images"),
            ("Technical Writing", "Documentation", "Drafting deployment guidelines")
        ]
        
        for name, cat, desc in skills:
            self.db.add(AgentSkill(name=name, category=cat, description=desc))

        # 3. Seed Capabilities
        capabilities = [
            ("Project Initialization", "Start project scopes and budgets"),
            ("PRD Generation", "Write markdown-based requirements documents"),
            ("Architecture Design", "Generate folder mappings and ERD diagrams"),
            ("Style Guide Creation", "Establish color systems and layout variables"),
            ("Frontend Code Generation", "Generate Next.js components"),
            ("API Implementation", "Write FastAPI routes"),
            ("SQL Generation", "Write postgres DDL schemas"),
            ("Agent Tuning", "Construct prompt flows"),
            ("Test Suite Generation", "Write automated tests"),
            ("Security Scanning", "Check SQL injection vulnerabilities"),
            ("Containerization", "Configure Dockerfiles"),
            ("API Doc Generation", "Generate Swagger schemas")
        ]
        
        for name, desc in capabilities:
            self.db.add(AgentCapability(name=name, description=desc))

        # Flush metadata before constructing agents
        await self.db.flush()

        # 4. Seed 12 Specialized Employees
        agents_data = [
            ("Alice", "Alice (CEO)", "CEO", "Management", "Oversees client deliverables and delegates project sprints", ["Strategic Planning"], ["Project Initialization"]),
            ("Bob", "Bob (PM)", "Product Manager", "Product", "Drafts requirements documents and coordinates features", ["PRD Drafting"], ["PRD Generation"]),
            ("Charlie", "Charlie (Architect)", "Software Architect", "Architecture", "Designs database layouts and microservices structures", ["System Design"], ["Architecture Design"]),
            ("Diana", "Diana (Designer)", "UI/UX Designer", "Design", "Designs Figma wireframes and Tailwind UI variables", ["Wireframing"], ["Style Guide Creation"]),
            ("Evan", "Evan (Frontend)", "Frontend Engineer", "Frontend", "Implements Next.js and React client applications", ["React"], ["Frontend Code Generation"]),
            ("Fiona", "Fiona (Backend)", "Backend Engineer", "Backend", "Implements FastAPI backend servers and business logic", ["FastAPI"], ["API Implementation"]),
            ("George", "George (Database)", "Database Engineer", "Database", "Designs PostgreSQL structures and optimizes migrations", ["SQL"], ["SQL Generation"]),
            ("Hope", "Hope (AI)", "AI Engineer", "Artificial Intelligence", "Constructs prompt flows and integrates models", ["Prompt Engineering"], ["Agent Tuning"]),
            ("Ian", "Ian (QA)", "QA Engineer", "Quality Assurance", "Writes pytest scripts and verifies deliverables", ["Pytest"], ["Test Suite Generation"]),
            ("Jack", "Jack (Security)", "Security Engineer", "Security", "Reviews auth credentials and sanitizes input vectors", ["Security Auditing"], ["Security Scanning"]),
            ("Kate", "Kate (DevOps)", "DevOps Engineer", "DevOps", "Configures Docker containers and deploys servers", ["Docker"], ["Containerization"]),
            ("Leo", "Leo (Docs)", "Documentation Engineer", "Documentation", "Writes technical documents and OpenAPI specs", ["Technical Writing"], ["API Doc Generation"])
        ]

        for name, disp, role, dept, desc, sk_list, cap_list in agents_data:
            self.db.add(Agent(
                name=name,
                display_name=disp,
                role=role,
                department=dept,
                description=desc,
                status="Offline",
                availability=True,
                skills=sk_list,
                capabilities=cap_list,
                experience_level="Senior" if role != "CEO" else "Principal",
                is_active=True
            ))

        await self.db.flush()
        await self.db.commit()

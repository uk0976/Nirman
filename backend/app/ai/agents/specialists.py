from backend.app.ai.agents.base import BaseAgent

class CEOAgent(BaseAgent):
    def __init__(self, name: str = "Alice"):
        super().__init__(name, "CEO", "Management", "Direct Nirman sprints and deliver client software specifications successfully")
        self.responsibilities = ["Strategic Sprint Allocation", "Reviewing Deliverables"]
        self.skills = ["Strategic Planning", "Leadership"]
        self.capabilities = ["Project Initialization"]
        self.tools = ["Filesystem"]
        self.permissions = ["Admin"]
        self.priority = "Critical"

    def get_system_prompt(self) -> str:
        return f"You are {self.name}, the Principal CEO AI Agent. Mission: {self.mission}."


class ProductManagerAgent(BaseAgent):
    def __init__(self, name: str = "Bob"):
        super().__init__(name, "Product Manager", "Product", "Draft requirements specs (PRD) and translate client requests to developer task cards")
        self.responsibilities = ["Requirements Gathering", "Story Splitting"]
        self.skills = ["PRD Drafting", "User Stories"]
        self.capabilities = ["PRD Generation"]
        self.tools = ["Filesystem"]
        self.permissions = ["ProductWrite"]

    def get_system_prompt(self) -> str:
        return f"You are {self.name}, the Product Manager AI Agent. Mission: {self.mission}."


class SoftwareArchitectAgent(BaseAgent):
    def __init__(self, name: str = "Charlie"):
        super().__init__(name, "Software Architect", "Architecture", "Design folder paths, database structures, and REST API boundaries")
        self.responsibilities = ["Architecture Design", "System Topology Definition"]
        self.skills = ["System Design"]
        self.capabilities = ["Architecture Design"]
        self.tools = ["Filesystem"]
        self.permissions = ["ArchitectureWrite"]

    def get_system_prompt(self) -> str:
        return f"You are {self.name}, the Software Architect AI Agent. Mission: {self.mission}."


class UIDesignerAgent(BaseAgent):
    def __init__(self, name: str = "Diana"):
        super().__init__(name, "UI/UX Designer", "Design", "Design look-and-feel guidelines, CSS wireframes, and aesthetic layout structures")
        self.responsibilities = ["Wireframe Generation", "Style Guide Creation"]
        self.skills = ["Wireframing"]
        self.capabilities = ["Style Guide Creation"]
        self.tools = ["Filesystem"]
        self.permissions = ["DesignWrite"]

    def get_system_prompt(self) -> str:
        return f"You are {self.name}, the UI/UX Designer AI Agent. Mission: {self.mission}."


class FrontendEngineerAgent(BaseAgent):
    def __init__(self, name: str = "Evan"):
        super().__init__(name, "Frontend Engineer", "Frontend", "Implement client interfaces using React, Next.js, and CSS styling sheets")
        self.responsibilities = ["Frontend Code Generation", "Client Page Assembly"]
        self.skills = ["React"]
        self.capabilities = ["Frontend Code Generation"]
        self.tools = ["Filesystem", "Browser"]
        self.permissions = ["CodeWrite"]

    def get_system_prompt(self) -> str:
        return f"You are {self.name}, the Frontend Engineer AI Agent. Mission: {self.mission}."


class BackendEngineerAgent(BaseAgent):
    def __init__(self, name: str = "Fiona"):
        super().__init__(name, "Backend Engineer", "Backend", "Implement endpoints, service logic engines, and backend controllers using FastAPI")
        self.responsibilities = ["API Implementation", "Business Logic Coding"]
        self.skills = ["FastAPI"]
        self.capabilities = ["API Implementation"]
        self.tools = ["Filesystem", "Database"]
        self.permissions = ["CodeWrite"]

    def get_system_prompt(self) -> str:
        return f"You are {self.name}, the Backend Engineer AI Agent. Mission: {self.mission}."


class DatabaseEngineerAgent(BaseAgent):
    def __init__(self, name: str = "George"):
        super().__init__(name, "Database Engineer", "Database", "Optimise postgres databases schemas, index mappings, and SQL migrations")
        self.responsibilities = ["SQL Schema Scripting", "Query Optimization"]
        self.skills = ["SQL"]
        self.capabilities = ["SQL Generation"]
        self.tools = ["Database"]
        self.permissions = ["DatabaseWrite"]

    def get_system_prompt(self) -> str:
        return f"You are {self.name}, the Database Engineer AI Agent. Mission: {self.mission}."


class AIEngineerAgent(BaseAgent):
    def __init__(self, name: str = "Hope"):
        super().__init__(name, "AI Engineer", "Artificial Intelligence", "Construct prompt pipelines and coordinate LLM provider chains")
        self.responsibilities = ["Prompt Optimization", "Reasoning Orchestration"]
        self.skills = ["Prompt Engineering"]
        self.capabilities = ["Agent Tuning"]
        self.tools = ["Filesystem"]
        self.permissions = ["CodeWrite"]

    def get_system_prompt(self) -> str:
        return f"You are {self.name}, the AI Engineer AI Agent. Mission: {self.mission}."


class QAEngineerAgent(BaseAgent):
    def __init__(self, name: str = "Ian"):
        super().__init__(name, "QA Engineer", "Quality Assurance", "Write pytest modules, run checks, and catch syntax exceptions or logical bugs")
        self.responsibilities = ["Test Suite Creation", "Bug Hunting"]
        self.skills = ["Pytest"]
        self.capabilities = ["Test Suite Generation"]
        self.tools = ["Filesystem", "Terminal"]
        self.permissions = ["TestExecute"]

    def get_system_prompt(self) -> str:
        return f"You are {self.name}, the QA Engineer AI Agent. Mission: {self.mission}."


class SecurityEngineerAgent(BaseAgent):
    def __init__(self, name: str = "Jack"):
        super().__init__(name, "Security Engineer", "Security", "Perform credentials auditing and OWASP vulnerability scans")
        self.responsibilities = ["Vulnerability Audits", "Secure Configuration Verification"]
        self.skills = ["Security Auditing"]
        self.capabilities = ["Security Scanning"]
        self.tools = ["Filesystem", "Terminal"]
        self.permissions = ["SecurityRead"]

    def get_system_prompt(self) -> str:
        return f"You are {self.name}, the Security Engineer AI Agent. Mission: {self.mission}."


class DevOpsEngineerAgent(BaseAgent):
    def __init__(self, name: str = "Kate"):
        super().__init__(name, "DevOps Engineer", "DevOps", "Construct Docker packaging setups and orchestrate deployment networks")
        self.responsibilities = ["Docker Orchestration", "CI/CD Pipeline Configurations"]
        self.skills = ["Docker"]
        self.capabilities = ["Containerization"]
        self.tools = ["Terminal"]
        self.permissions = ["DeployWrite"]

    def get_system_prompt(self) -> str:
        return f"You are {self.name}, the DevOps Engineer AI Agent. Mission: {self.mission}."


class DocumentationEngineerAgent(BaseAgent):
    def __init__(self, name: str = "Leo"):
        super().__init__(name, "Documentation Engineer", "Documentation", "Write technical guidebooks, README logs, and OpenAPI Swagger references")
        self.responsibilities = ["Technical Writing", "Swagger Document Drafting"]
        self.skills = ["Technical Writing"]
        self.capabilities = ["API Doc Generation"]
        self.tools = ["Filesystem"]
        self.permissions = ["DocsWrite"]

    def get_system_prompt(self) -> str:
        return f"You are {self.name}, the Documentation Engineer AI Agent. Mission: {self.mission}."

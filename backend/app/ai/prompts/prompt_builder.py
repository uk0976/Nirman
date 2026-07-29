from typing import Dict, Any, List
from backend.app.ai.registry.agent_router import AgentProfile

class PromptBuilder:
    """
    Constructs system personas, target output formatting schemas,
    and execution context into structured LLM prompts.
    """
    
    @staticmethod
    def build_agent_prompt(
        agent: AgentProfile,
        task_title: str,
        task_description: str,
        formatted_context: str
    ) -> List[Dict[str, str]]:
        
        system_instruction = (
            f"{agent.system_prompt}\n\n"
            f"You are part of an autonomous software engineering team at निर्माण | Nirman.\n"
            f"Always produce high-quality, production-ready, clean deliverables.\n"
            f"DO NOT include fluff or conversation outside requested artifacts."
        )

        user_content = (
            f"Task: {task_title}\n"
            f"Description: {task_description}\n\n"
            f"{formatted_context}\n\n"
            f"Please fulfill this task now."
        )

        return [
            {"role": "system", "content": system_instruction},
            {"role": "user", "content": user_content},
        ]

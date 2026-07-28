from typing import Dict, Any, List, Optional

class PromptBuilder:
    @staticmethod
    def build_prompt(
        system_prompt: str,
        project_context: Optional[str] = None,
        task_context: Optional[str] = None,
        conversation_context: Optional[str] = None,
        memory: Optional[str] = None,
        files: Optional[List[str]] = None,
        requirements: Optional[List[str]] = None,
        expected_output: Optional[str] = None,
        constraints: Optional[List[str]] = None
    ) -> str:
        """
        Dynamically assembles a prompt string from context segments.
        """
        prompt_parts = []

        if system_prompt:
            prompt_parts.append(f"## System Guidelines:\n{system_prompt}")

        if project_context:
            prompt_parts.append(f"## Project Background:\n{project_context}")

        if task_context:
            prompt_parts.append(f"## Active Task Description:\n{task_context}")

        if conversation_context:
            prompt_parts.append(f"## Recent Discussion context:\n{conversation_context}")

        if memory:
            prompt_parts.append(f"## Associated Memories:\n{memory}")

        if files:
            files_section = "\n".join([f"- {f}" for f in files])
            prompt_parts.append(f"## Target Workspace Files:\n{files_section}")

        if requirements:
            req_section = "\n".join([f"- {r}" for r in requirements])
            prompt_parts.append(f"## Product Requirements:\n{req_section}")

        if constraints:
            con_section = "\n".join([f"- {c}" for c in constraints])
            prompt_parts.append(f"## Engineering Constraints:\n{con_section}")

        if expected_output:
            prompt_parts.append(f"## Expected Deliverable Shape:\n{expected_output}")

        return "\n\n".join(prompt_parts)

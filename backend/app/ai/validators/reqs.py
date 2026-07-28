from backend.app.ai.validators.base import ResponseValidator

class RequirementsValidator(ResponseValidator):
    def validate(self, output: str) -> bool:
        """
        Mock validates if LLM response maps to specified functional requirements.
        """
        if "missing requirement" in output.lower():
            raise ValueError("Functional specs mapping failure. Not all required PRD stories are met.")
        return True

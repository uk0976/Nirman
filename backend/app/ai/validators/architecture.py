from backend.app.ai.validators.base import ResponseValidator

class ArchitectureValidator(ResponseValidator):
    def validate(self, output: str) -> bool:
        """
        Mock validates architectural design patterns (e.g. Clean Architecture bounds).
        """
        if "circular dependency" in output.lower():
            raise ValueError("System architecture designs fail layer isolation checks. Circular dependencies found.")
        return True

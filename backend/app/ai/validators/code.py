from backend.app.ai.validators.base import ResponseValidator

class CodeValidator(ResponseValidator):
    def validate(self, output: str) -> bool:
        """
        Mock validates generated code structure (e.g. check basic syntax tokens).
        """
        # Look for explicit failure tags in mock inputs
        if "syntax error" in output.lower():
            raise ValueError("Syntactic code layout validation failed. Missing brackets or indents.")
        return True

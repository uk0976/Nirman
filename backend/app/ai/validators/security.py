from backend.app.ai.validators.base import ResponseValidator

class SecurityValidator(ResponseValidator):
    def validate(self, output: str) -> bool:
        """
        Mock validates OWASP guidelines compliance and sanitization boundaries.
        """
        if "sql injection" in output.lower() or "hardcoded password" in output.lower():
            raise ValueError("Security scan failed. Potential injection vector or exposed credential secrets detected.")
        return True

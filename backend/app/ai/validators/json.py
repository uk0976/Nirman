import json
from backend.app.ai.validators.base import ResponseValidator

class JSONValidator(ResponseValidator):
    def validate(self, output: str) -> bool:
        """
        Validates if the content is a syntactically correct JSON string.
        """
        try:
            json.loads(output)
            return True
        except Exception as e:
            raise ValueError(f"Invalid JSON content payload: {str(e)}")

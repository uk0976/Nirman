import abc

class ResponseValidator(abc.ABC):
    """
    Abstract Base Class for LLM output content validations.
    """

    @abc.abstractmethod
    def validate(self, output: str) -> bool:
        """
        Validates the raw LLM output. Returns True if valid, else raises ValueError.
        """
        pass

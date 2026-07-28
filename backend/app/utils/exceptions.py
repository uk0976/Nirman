class NirmanException(Exception):
    """
    Base exception for Nirman backend domain errors.
    """
    def __init__(self, message: str):
        self.message = message
        super().__init__(message)


class UserAlreadyExistsException(NirmanException):
    """
    Raised when registering a user with an email that is already in use.
    """
    pass


class InvalidCredentialsException(NirmanException):
    """
    Raised when password verification or email lookup fails during authentication.
    """
    pass


class UserNotFoundException(NirmanException):
    """
    Raised when a queried user is not found in the database.
    """
    pass


class InactiveUserException(NirmanException):
    """
    Raised when attempting an action on a deactivated user account.
    """
    pass


class InvalidTokenException(NirmanException):
    """
    Raised when JWT decoding or validation fails.
    """
    pass


class UnauthorizedException(NirmanException):
    """
    Raised when a user attempts to access a resource they do not have permissions for.
    """
    pass

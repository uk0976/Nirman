from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        """
        Intercepts outgoing responses to append standard OWASP compliance security headers.
        """
        response = await call_next(request)
        
        # Prevent clickjacking attacks by blocking iframe embedding
        response.headers["X-Frame-Options"] = "DENY"
        
        # Block MIME-sniffing
        response.headers["X-Content-Type-Options"] = "nosniff"
        
        # Enable browser XSS protection block filters
        response.headers["X-XSS-Protection"] = "1; mode=block"
        
        # Protect referrer leakage across origins
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        
        # Limit frame parent embedding
        response.headers["Content-Security-Policy"] = "frame-ancestors 'none';"
        
        return response

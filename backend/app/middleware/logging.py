import time
import logging
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware

# Obtain dedicated logger for middleware scope
logger = logging.getLogger("app.request_tracker")

class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        """
        Intercepts incoming HTTP requests to log parameters and measures route latency.
        """
        start_time = time.perf_counter()
        
        method = request.method
        path = request.url.path
        query = request.url.query
        client_host = request.client.host if request.client else "unknown"
        
        logger.info(
            f"HTTP Request: {method} {path} from client {client_host} (Query: '{query}')"
        )
        
        try:
            response = await call_next(request)
            process_time = (time.perf_counter() - start_time) * 1000
            
            # Inject custom header showing duration in milliseconds
            response.headers["X-Process-Time-Ms"] = f"{process_time:.2f}"
            
            logger.info(
                f"HTTP Response: {method} {path} | Status: {response.status_code} | Latency: {process_time:.2f}ms"
            )
            return response
            
        except Exception as e:
            process_time = (time.perf_counter() - start_time) * 1000
            logger.error(
                f"HTTP Error: {method} {path} failed | Error: {str(e)} | Latency: {process_time:.2f}ms",
                exc_info=True
            )
            raise

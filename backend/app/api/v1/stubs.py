from fastapi import APIRouter, Depends
from backend.app.core.dependencies import get_current_user
from backend.app.models.user import User

def create_stub_router(name: str, tag: str) -> APIRouter:
    """
    Utility factory to build standard protected endpoints for future development modules.
    """
    router = APIRouter(prefix=f"/{name}", tags=[tag])
    
    @router.get(
        "/",
        summary=f"Stub dashboard endpoint for {name}",
        description=f"Standard stub endpoint returning future connection options for {name} module."
    )
    async def get_stub(current_user: User = Depends(get_current_user)):
        return {
            "status": "stub",
            "module": name,
            "message": f"This is the production-ready infrastructure stub for the '{name}' module.",
            "authorized_user": {
                "id": str(current_user.id),
                "email": current_user.email,
                "role": current_user.role
            }
        }
        
    return router

# Generate stub routers matching requested folder structure
analytics_router = create_stub_router("analytics", "Analytics")
deployments_router = create_stub_router("deployments", "Deployments")

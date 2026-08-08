from fastapi import APIRouter
from app.core.validation.production_validator import production_validator_instance

router = APIRouter()

@router.post("/run-audit")
async def run_production_audit():
    report = production_validator_instance.run_full_validation_audit()
    return {
        "status": "AUDIT_COMPLETED",
        "report": report
    }

@router.get("/readiness-report")
async def get_readiness_report():
    return production_validator_instance.run_full_validation_audit()

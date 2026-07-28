import uuid
from typing import Dict, Any, List
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.execution import Deliverable

class VerificationEngine:
    @staticmethod
    async def validate_stage_deliverables(
        execution_id: uuid.UUID,
        stage_name: str,
        db: AsyncSession
    ) -> Dict[str, Any]:
        """
        Validates that required checklist deliverables for the stage are completed and approved.
        """
        # Map pipeline stage name to required category of deliverables
        stage_to_category = {
            "Architecture": "Architecture",
            "Database Design": "Database",
            "API Design": "API",
            "Testing": "Testing",
            "Security Review": "Security",
            "Documentation": "Documentation"
        }

        required_category = stage_to_category.get(stage_name)
        if not required_category:
            # Stage does not have a strict deliverables gate
            return {"valid": True, "reason": "No strict gate deliverables required for this stage."}

        stmt = select(Deliverable).filter(
            Deliverable.execution_id == execution_id,
            Deliverable.category == required_category
        )
        res = await db.execute(stmt)
        deliverables = res.scalars().all()

        if not deliverables:
            return {
                "valid": False,
                "reason": f"Required deliverable category '{required_category}' was not created."
            }

        unapproved = [d for d in deliverables if not d.approved or d.status != "Completed"]
        if unapproved:
            return {
                "valid": False,
                "reason": f"Deliverable category '{required_category}' exists but is not approved or completed yet."
            }

        return {
            "valid": True,
            "reason": f"Deliverable category '{required_category}' verified successfully."
        }

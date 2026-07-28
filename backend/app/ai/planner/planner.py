from typing import Dict, Any, List, Optional
from pydantic import BaseModel

class SubTask(BaseModel):
    id: str
    title: str
    description: str
    depends_on: List[str] = []
    status: str = "Pending"


class Plan(BaseModel):
    workflow_stage: str
    milestones: List[str] = []
    subtasks: List[SubTask] = []


class Planner:
    @staticmethod
    def break_task(stage_name: str, task_title: str, task_description: Optional[str] = None) -> Plan:
        """
        Deconstructs a high-level stage assignment into sequentially executable subtask cards.
        """
        # Formulate some mock subtasks depending on the stage and title
        subtasks = [
            SubTask(
                id="subtask-1",
                title=f"Analyze {task_title}",
                description="Gather dependencies and analyze requirements specs",
                depends_on=[]
            ),
            SubTask(
                id="subtask-2",
                title=f"Draft design for {task_title}",
                description="Construct logic schemas and component wireframes",
                depends_on=["subtask-1"]
            ),
            SubTask(
                id="subtask-3",
                title=f"Implement {task_title}",
                description="Write code templates and execute tests",
                depends_on=["subtask-2"]
            )
        ]

        return Plan(
            workflow_stage=stage_name,
            milestones=[f"Phase 1: Analysis for {task_title}", f"Phase 2: Implementation of {task_title}"],
            subtasks=subtasks
        )

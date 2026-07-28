import time
import json
import uuid
from typing import Dict, Any, List, Optional, Type
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.ai.providers import OpenAIProvider, ClaudeProvider, GeminiProvider
from backend.app.ai.validators import (
    ResponseValidator, JSONValidator, CodeValidator,
    ArchitectureValidator, SecurityValidator, RequirementsValidator
)
from backend.app.ai.events.bus import AIEventBus
from backend.app.ai.telemetry.telemetry import TelemetryTracker
from backend.app.ai.cost.tracker import CostTracker
from backend.app.ai.prompts.builder import PromptBuilder
from backend.app.ai.agents.base import BaseAgent
from backend.app.schemas.ai import StructuredAIResponse

class ReasoningEngine:
    def __init__(
        self,
        event_bus: Optional[AIEventBus] = None,
        telemetry: Optional[TelemetryTracker] = None,
        cost_tracker: Optional[CostTracker] = None
    ):
        """
        Reasoning Engine driving agent queries, output validation, and retry logic.
        """
        self.event_bus = event_bus or AIEventBus()
        self.telemetry = telemetry or TelemetryTracker()
        self.cost_tracker = cost_tracker or CostTracker()

        # Instantiate providers
        self.providers = {
            "openai": OpenAIProvider(),
            "claude": ClaudeProvider(),
            "gemini": GeminiProvider()
        }

    async def reason(
        self,
        agent: BaseAgent,
        task_title: str,
        task_description: str,
        context: Dict[str, Any],
        response_schema: Optional[Type[BaseModel]] = None,
        validator_types: Optional[List[str]] = None,
        max_retries: int = 3,
        primary_provider: str = "openai",
        workflow_id: Optional[uuid.UUID] = None,
        task_id: Optional[uuid.UUID] = None,
        db: Optional[AsyncSession] = None
    ) -> StructuredAIResponse:
        """
        Coordinates the reasoning loop: selects provider, formats prompts, runs retries on validation errors,
        tracks transaction costs, and fires EventBus events.
        """
        execution_id = uuid.uuid4()
        wf_id = workflow_id or uuid.uuid4()
        
        # 1. Publish starting events
        self.event_bus.publish("Agent Started", {"agent": agent.role, "task": task_title})

        # 2. Model Routing Configuration
        # Route to code-capable models if agent belongs to code disciplines
        model = self.providers["openai"].default_model
        if agent.role in ["Software Architect", "Frontend Engineer", "Backend Engineer", "Database Engineer", "DevOps Engineer"]:
            model = self.providers["openai"].code_model
        
        provider_name = primary_provider
        # Fallback to OpenAI default if provider is not registered
        provider = self.providers.get(provider_name, self.providers["openai"])

        # 3. Build Prompt
        prompt = PromptBuilder.build_prompt(
            system_prompt=agent.get_system_prompt(),
            project_context=context.get("project_name", "Nirman Project"),
            task_context=f"{task_title}: {task_description}",
            requirements=context.get("requirements", []),
            files=context.get("files", []),
            expected_output=response_schema.__name__ if response_schema else None
        )
        self.event_bus.publish("Prompt Built", {"prompt_length": len(prompt)})

        # 4. Compile Validators
        validators = self._resolve_validators(validator_types)
        if response_schema and not any(isinstance(v, JSONValidator) for v in validators):
            validators.append(JSONValidator())

        retries = 0
        error_feedback = ""
        start_time = time.time()
        output = ""

        # 5. Execution & Validation Loop
        while retries <= max_retries:
            # Fallback model provider policy on failures
            if retries == 1:
                provider_name = "claude"
            elif retries == 2:
                provider_name = "gemini"

            provider = self.providers.get(provider_name, self.providers["openai"])
            self.event_bus.publish("Provider Selected", {"provider": provider_name, "retry": retries})

            adjusted_prompt = prompt
            if error_feedback:
                adjusted_prompt += f"\n\n[SYSTEM FEEDBACK]: Previous attempt failed validation:\n{error_feedback}\nPlease resolve this issue and output correct format."

            try:
                # Query Provider
                output = await provider.generate(
                    prompt=adjusted_prompt,
                    system_prompt=agent.get_system_prompt(),
                    response_schema=response_schema,
                    config={"model": model}
                )

                # Validate Output
                for validator in validators:
                    validator.validate(output)

                # Successfully validated!
                self.event_bus.publish("Response Validated", {"provider": provider_name, "retries": retries})
                break

            except ValueError as e:
                retries += 1
                error_feedback = str(e)
                self.event_bus.publish("Reasoning Failed", {"error": error_feedback, "retry": retries})
                if retries > max_retries:
                    # Log failure in telemetry
                    latency_ms = (time.time() - start_time) * 1000
                    self.telemetry.log_transaction(
                        agent_role=agent.role,
                        provider=provider_name,
                        latency_ms=latency_ms,
                        is_error=True,
                        retries=retries - 1,
                        error_message=error_feedback
                    )
                    raise ValueError(f"Failed to obtain valid response after {max_retries} retries. Error: {error_feedback}")

        latency_ms = (time.time() - start_time) * 1000
        
        # 6. Parse Output Structures
        output_dict = {}
        try:
            output_dict = json.loads(output)
        except Exception:
            pass

        status = "success"
        confidence = 0.95
        reasoning_summary = "Execution processed and output validated successfully."
        result = output
        warnings = []
        metadata = {}

        if isinstance(output_dict, dict):
            status = output_dict.get("status", "success")
            confidence = output_dict.get("confidence", 0.95)
            reasoning_summary = output_dict.get("reasoning_summary", reasoning_summary)
            result = str(output_dict.get("result", output))
            warnings = output_dict.get("warnings", [])
            metadata = output_dict.get("metadata", {})

        # 7. Orchestrate Tool Execution if requested
        if isinstance(output_dict, dict) and "tool" in output_dict:
            tool_name = output_dict["tool"]
            tool_args = output_dict.get("args", {})
            
            # Load Tool Registry
            from backend.app.ai.registry.tool_registry import DiscoverableToolRegistry
            tool_registry = DiscoverableToolRegistry()
            
            if tool_registry.check_permissions(tool_name, agent.permissions):
                tool = tool_registry.get_tool(tool_name)
                if tool:
                    self.event_bus.publish("Tool Invoked", {"tool": tool_name})
                    tool_result = await tool.execute(tool_args)
                    metadata["tool_execution_result"] = tool_result
            else:
                warnings.append(f"Agent failed authorization check to execute tool '{tool_name}'")

        # 8. Token Accounting
        prompt_tokens = len(prompt) // 4
        completion_tokens = len(output) // 4
        cost = provider.estimate_cost(prompt_tokens, completion_tokens, model)

        # Log Cost Tracker and Telemetry
        self.telemetry.log_transaction(
            agent_role=agent.role,
            provider=provider_name,
            latency_ms=latency_ms,
            is_error=False,
            retries=retries
        )
        self.cost_tracker.record_usage(
            workflow_id=wf_id,
            agent_role=agent.role,
            provider=provider_name,
            model=model,
            prompt_tokens=prompt_tokens,
            completion_tokens=completion_tokens,
            estimated_cost=cost,
            execution_time_ms=latency_ms
        )

        structured_response = StructuredAIResponse(
            status=status,
            confidence=confidence,
            reasoning_summary=reasoning_summary,
            result=result,
            warnings=warnings,
            metadata=metadata,
            usage={
                "prompt_tokens": prompt_tokens,
                "completion_tokens": completion_tokens,
                "total_tokens": prompt_tokens + completion_tokens,
                "estimated_cost": cost
            },
            provider=provider_name,
            model=model,
            latency=latency_ms
        )

        # 9. Database Audit Logging
        if db:
            from backend.app.models.ai_audit import AIAuditLog
            audit = AIAuditLog(
                workflow_id=wf_id,
                task_id=task_id,
                execution_id=execution_id,
                prompt_version=1,
                agent_role=agent.role,
                model=model,
                provider=provider_name,
                response_metadata={
                    "status": status,
                    "confidence": confidence,
                    "latency_ms": latency_ms,
                    "cost": cost,
                    "prompt_tokens": prompt_tokens,
                    "completion_tokens": completion_tokens,
                    "warnings": warnings
                }
            )
            db.add(audit)

        self.event_bus.publish("Task Completed", {"agent": agent.role, "cost": cost})
        return structured_response

    def _resolve_validators(self, types: Optional[List[str]]) -> List[ResponseValidator]:
        if not types:
            return []

        validators = []
        mapping = {
            "json": JSONValidator(),
            "code": CodeValidator(),
            "architecture": ArchitectureValidator(),
            "security": SecurityValidator(),
            "requirements": RequirementsValidator()
        }
        for t in types:
            val = mapping.get(t.lower())
            if val:
                validators.append(val)
        return validators

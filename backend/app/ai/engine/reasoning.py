import time
import uuid
from typing import Dict, Any, List, Optional, Type
from pydantic import BaseModel

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
        workflow_id: Optional[uuid.UUID] = None
    ) -> str:
        """
        Coordinates the reasoning loop: selects provider, formats prompts, runs retries on validation errors,
        tracks transaction costs, and fires EventBus events.
        """
        wf_id = workflow_id or uuid.uuid4()
        
        # 1. Publish starting events
        self.event_bus.publish("Agent Started", {"agent": agent.role, "task": task_title})

        # 2. Build prompt
        prompt = PromptBuilder.build_prompt(
            system_prompt=agent.get_system_prompt(),
            project_context=context.get("project_name", "Nirman Project"),
            task_context=f"{task_title}: {task_description}",
            requirements=context.get("requirements", []),
            files=context.get("files", []),
            expected_output=response_schema.__name__ if response_schema else None
        )
        self.event_bus.publish("Prompt Built", {"prompt_length": len(prompt)})

        # 3. Compile Validators
        validators = self._resolve_validators(validator_types)
        if response_schema and not any(isinstance(v, JSONValidator) for v in validators):
            validators.append(JSONValidator())

        provider_name = primary_provider
        retries = 0
        error_feedback = ""

        start_time = time.time()
        output = ""

        # 4. Execution & Validation Loop
        while retries <= max_retries:
            # Fallback policy: if primary provider fails on retry, switch to Claude/Gemini!
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
                    response_schema=response_schema
                )

                # Validate Output
                for validator in validators:
                    validator.validate(output)

                # Successfully validated!
                self.event_bus.publish("Response Validated", {"provider": provider_name, "retries": retries})
                break

            except ValueError as e:
                # Validation error - trigger retry
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

        # 5. Log Telemetry and Cost
        latency_ms = (time.time() - start_time) * 1000
        self.telemetry.log_transaction(
            agent_role=agent.role,
            provider=provider_name,
            latency_ms=latency_ms,
            is_error=False,
            retries=retries
        )

        # Mock token calculations
        prompt_tokens = len(prompt) // 4
        completion_tokens = len(output) // 4
        cost = provider.estimate_cost(prompt_tokens, completion_tokens, provider_name)

        self.cost_tracker.record_usage(
            workflow_id=wf_id,
            agent_role=agent.role,
            provider=provider_name,
            model=provider_name,
            prompt_tokens=prompt_tokens,
            completion_tokens=completion_tokens,
            estimated_cost=cost,
            execution_time_ms=latency_ms
        )

        self.event_bus.publish("Task Completed", {"agent": agent.role, "cost": cost})
        return output

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

from typing import Dict, Any, List

class ContextManager:
    """
    Filters and formats context for specialized agents to prevent prompt context bloat.
    """
    def filter_context_for_agent(self, agent_id: str, full_context: Dict[str, Any]) -> Dict[str, Any]:
        """Extracts only task-relevant upstream artifacts for the specified agent."""
        if agent_id == "agent-ceo-evelyn":
            return {"raw_idea": full_context.get("raw_idea", "")}
        elif agent_id == "agent-ba-marcus":
            return {"vision": full_context.get("strategic_vision", {})}
        elif agent_id == "agent-pm-sarah":
            return {
                "vision": full_context.get("strategic_vision", {}),
                "srs": full_context.get("srs_document", {})
            }
        elif agent_id == "agent-fe-lucas":
            return {
                "ux_specs": full_context.get("ux_design_system", {}),
                "api_contracts": full_context.get("system_architecture", {}).get("api_routes", [])
            }
        elif agent_id == "agent-be-ethan":
            return {
                "db_ddl": full_context.get("db_architecture", {}).get("sql_ddl", ""),
                "system_arch": full_context.get("system_architecture", {})
            }
        
        # Default pass-through
        return full_context

context_manager_instance = ContextManager()

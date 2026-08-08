from typing import Dict, Any, List
import datetime
from app.core.agent_framework.base_agent import BaseAgent, AgentCapability, AgentTask, AgentState

UX_DESIGNER_SYSTEM_PROMPT = """You are Sophia Martinez, Principal Product Designer at Nirman.
Your persona is a Principal Product Designer working on large-scale SaaS platforms (Linear, Vercel, Stripe, Notion, Cursor).
Your sole responsibility is UX Architecture, Interaction Design, Design System Tokens, AI-specific UI Component Specs, and WCAG 2.2 AA Accessibility Guidelines.

Rules:
1. You DO NOT write production HTML/CSS or React code.
2. You transform database schemas and system architecture into a complete, consistent, accessible, and implementation-ready Product Design System (DSD v1.0).
3. You synthesize Design Tokens (Colors, Typography, Spacing, Shadows), User Journey Maps, AI Component Specifications (Agent Cards, Workflow Nodes, Timelines, Approvals), Screen State Matrix, and WCAG 2.2 AA Rules.
"""

class UXDesignerAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="agent-ux-sophia",
            name="Sophia Martinez",
            role="Principal Product Designer",
            description="Designs the Nirman Product Design System, Design Tokens, User Journey Maps, AI-specific UI components, and WCAG 2.2 AA accessibility guidelines.",
            system_prompt=UX_DESIGNER_SYSTEM_PROMPT,
            capabilities=[AgentCapability.FRONTEND_ENGINEERING],
            allowed_tools=["code_gen", "file_io"],
            version="1.0.0"
        )

    async def plan(self, task: AgentTask) -> Dict[str, Any]:
        self.set_state(AgentState.PLANNING)
        return {
            "agent_id": self.agent_id,
            "status": "UX_DESIGN_PLANNING_COMPLETE",
            "design_language": "Nirman Dark Glassmorphic Enterprise Language",
            "accessibility_standard": "WCAG 2.2 Level AA"
        }

    async def execute(self, task: AgentTask, context: Dict[str, Any]) -> Dict[str, Any]:
        self.set_state(AgentState.EXECUTING)
        project_name = task.input_payload.get("project_name", "Nirman SaaS Core Platform")
        
        design_system_package = {
            "project_name": project_name,
            "dsd_version": "v1.0",
            "executive_summary": "Product Design System & UX Specification Document (DSD v1.0) synthesized from Database Architecture #DAD-001. Implementation-ready for Frontend Engineering.",
            "design_tokens": {
                "colors": {
                    "background": "#07090E",
                    "surface": "#0B0D14",
                    "card": "#151824",
                    "primary": "#4F46E5",
                    "primary_glow": "rgba(99, 102, 241, 0.2)",
                    "success": "#10B981",
                    "warning": "#F59E0B",
                    "error": "#EF4444",
                    "text_primary": "#FFFFFF",
                    "text_secondary": "#9CA3AF"
                },
                "typography": {
                    "font_sans": "Inter, system-ui, sans-serif",
                    "font_mono": "JetBrains Mono, monospace",
                    "heading_scale": {"h1": "24px (Bold)", "h2": "18px (Bold)", "h3": "14px (Bold)"},
                    "body_scale": {"body": "12px (Regular)", "caption": "10px (Mono)"}
                },
                "spacing": {"xs": "4px", "sm": "8px", "md": "16px", "lg": "24px", "xl": "32px"},
                "glassmorphism": {"blur": "12px", "border": "rgba(255, 255, 255, 0.1)"}
            },
            "user_journeys": [
                {
                    "journey": "New User Onboarding",
                    "flow": ["Landing Page", "Sign Up", "Verify Email", "4-Step Onboarding Wizard", "Dashboard"]
                },
                {
                    "journey": "Project Initiation",
                    "flow": ["Dashboard", "New Project Wizard", "CEO Discovery Workshop", "Strategic Plan Approval"]
                },
                {
                    "journey": "AI Workflow Execution",
                    "flow": ["User Directive", "Multi-Agent Handoff", "Artifact Preview", "Human Approval Gate", "Phase Completion"]
                }
            ],
            "ai_component_specs": [
                {"component": "Agent Card", "spec": "Displays avatar, role badge, state indicator (Executing, Thinking, Waiting), token usage, and cost meter."},
                {"component": "Workflow Node Canvas", "spec": "Interactive 10-stage SDLC node graph with completed, active, and queued status colors."},
                {"component": "Conversation Timeline", "spec": "Timestamped collaborative stream distinguishing human directives vs AI decisions."},
                {"component": "Human Approval Request Card", "spec": "Amber-accented modal displaying artifact diff, feedback input, and Approve/Reject controls."}
            ],
            "screen_states": ["Default State", "Loading Skeleton", "Empty State", "Error Alert", "Success Celebration", "Processing Spinner"],
            "accessibility_matrix": {
                "contrast_ratio": "Minimum 4.5:1 for body text, 3:1 for large headings",
                "keyboard_navigation": "Full tab ordering, Cmd+K search overlay, ESC key modal close",
                "focus_indicators": "Indigo-500 ring with 2px offset on focused controls"
            },
            "created_at": datetime.datetime.utcnow().isoformat()
        }

        self.set_state(AgentState.WAITING_HUMAN_APPROVAL)
        return design_system_package

ux_designer_agent_instance = UXDesignerAgent()

from typing import Dict, Any, List
import datetime
from app.core.agent_framework.base_agent import BaseAgent, AgentCapability, AgentTask, AgentState

FRONTEND_SYSTEM_PROMPT = """You are Lucas Meyer, Senior Principal Frontend Engineer at Nirman.
Your persona is a Principal Frontend Engineer building large-scale SaaS applications with Next.js 15, React 19, TypeScript, Tailwind CSS, TanStack Query, React Hook Form, Zod, and Playwright.

Rules:
1. You follow approved architecture and design system specifications with strict adherence to WCAG 2.2 AA accessibility and feature-first directory structures.
2. You design and implement typed API clients (ApiClient), server-state hooks, form validation schemas, real-time WebSocket/SSE event listeners, and automated test pipelines (Vitest & Playwright).
3. You produce clean, modular, production-ready frontend specifications and code without relying on fake APIs or hardcoded mock placeholders.
"""

class FrontendAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="agent-fe-lucas",
            name="Lucas Meyer",
            role="Senior Principal Frontend Engineer",
            description="Implements Next.js 15 App Router frontend architecture, typed API clients, TanStack Query hooks, real-time event listeners, and Vitest/Playwright test suites.",
            system_prompt=FRONTEND_SYSTEM_PROMPT,
            capabilities=[AgentCapability.FRONTEND_ENGINEERING],
            allowed_tools=["code_gen", "file_io"],
            version="1.0.0"
        )

    async def plan(self, task: AgentTask) -> Dict[str, Any]:
        self.set_state(AgentState.PLANNING)
        return {
            "agent_id": self.agent_id,
            "status": "FRONTEND_PLANNING_COMPLETE",
            "framework": "Next.js 15.1 (App Router)",
            "state_management": "TanStack Query v5 + React Context",
            "testing_stack": "Vitest (Unit/Component) + Playwright (E2E)"
        }

    async def execute(self, task: AgentTask, context: Dict[str, Any]) -> Dict[str, Any]:
        self.set_state(AgentState.EXECUTING)
        project_name = task.input_payload.get("project_name", "Nirman SaaS Core Platform")
        
        api_client_code = """// ========================================================
// NIRMAN AI PLATFORM — CENTRALIZED TYPED API CLIENT
// ========================================================

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    });

    this.client.interceptors.request.use((config) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("nirman_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && typeof window !== "undefined") {
          localStorage.removeItem("nirman_token");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res: AxiosResponse<T> = await this.client.get(url, config);
    return res.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const res: AxiosResponse<T> = await this.client.post(url, data, config);
    return res.data;
  }
}

export const apiClient = new ApiClient();
"""

        frontend_package = {
            "project_name": project_name,
            "fad_version": "v1.0",
            "executive_summary": "Production Frontend Architecture Document (FAD v1.0) synthesized from Design System #DSD-001. Configured for Next.js 15 App Router.",
            "api_client_code": api_client_code,
            "directory_structure": [
                "src/app/ (App Router pages & API routes)",
                "src/components/ui/ (Reusable glassmorphic UI atoms)",
                "src/components/dashboard/ (Shell & Navigation components)",
                "src/components/ceo/ (CEO Workshop components)",
                "src/components/ba/ (BA Requirements components)",
                "src/components/pm/ (Product Strategy components)",
                "src/components/architect/ (Solution Architecture components)",
                "src/components/system-architect/ (System Design components)",
                "src/components/database/ (Database DDL components)",
                "src/components/ux/ (UI/UX Design Tokens components)",
                "src/lib/ (ApiClient, Auth, Utilities)",
                "src/hooks/ (TanStack Query custom data hooks)"
            ],
            "test_suite_specs": {
                "unit_tests": "Vitest for ApiClient interceptors, date formatters, and Zod validators",
                "component_tests": "React Testing Library for Login form, Sidebar tabs, and Approval Modals",
                "e2e_tests": "Playwright for Auth Login flow, Project Creation wizard, and SDLC approval gates"
            },
            "definition_of_done": [
                "1. Zero TypeScript compilation errors (npx tsc --noEmit)",
                "2. 100% Next.js static & dynamic route build pass (npx next build)",
                "3. Full WCAG 2.2 AA keyboard tab order & screen reader ARIA labels",
                "4. All API requests routed through centralized ApiClient instance"
            ],
            "created_at": datetime.datetime.utcnow().isoformat()
        }

        self.set_state(AgentState.WAITING_HUMAN_APPROVAL)
        return frontend_package

frontend_agent_instance = FrontendAgent()

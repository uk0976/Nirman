"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { ADRList } from "@/components/architect/ADRList";
import { TopologyDiagram } from "@/components/architect/TopologyDiagram";
import { TechStackMatrix } from "@/components/architect/TechStackMatrix";
import { FileCode2, Layers, Cpu, Check, ArrowRight, ShieldCheck } from "lucide-react";

export default function ArchitectStudioPage() {
  const [activeTab, setActiveTab] = useState("adrs");
  const [approved, setApproved] = useState(false);

  const archData = {
    adrs: [
      {
        adr_id: "ADR-001",
        title: "Clean Architecture Modular Monolith Pattern",
        status: "ACCEPTED",
        context: "Need high engineering velocity with clear component boundaries for 14 AI agents.",
        decision: "Adopt a Modular Monolith with decoupled domain services before considering distributed microservices.",
        consequences: "Simplified deployment, zero IPC latency, easy refactoring."
      },
      {
        adr_id: "ADR-002",
        title: "Next.js 15 App Router & React 19 Frontend",
        status: "ACCEPTED",
        context: "Requires fast initial page loads, SEO optimization, and rich interactive glassmorphism UI.",
        decision: "Use Next.js 15 App Router with Server Components and Tailwind CSS.",
        consequences: "High performance, static site generation, responsive UI."
      },
      {
        adr_id: "ADR-003",
        title: "FastAPI Async Python Backend & Pydantic v2",
        status: "ACCEPTED",
        context: "Requires high-concurrency async non-blocking IO for LLM API streaming and DAG execution.",
        decision: "Use FastAPI (Python 3.11+) with Async SQLAlchemy and Pydantic v2 schemas.",
        consequences: "Automatic OpenAPI docs, async performance rivaling Node.js/Go."
      },
      {
        adr_id: "ADR-004",
        title: "PostgreSQL 3NF Schema & Redis Caching",
        status: "ACCEPTED",
        context: "Relational data integrity is mandatory for multi-tenant projects and task execution history.",
        decision: "Use PostgreSQL 16 normalized to 3NF as primary store, Redis for session cache.",
        consequences: "ACID compliance, zero data redundancy, high read throughput."
      },
      {
        adr_id: "ADR-005",
        title: "LangGraph State Machine Orchestration Engine",
        status: "ACCEPTED",
        context: "Need deterministic state machine execution for 14 specialized AI agents across 20 SDLC phases.",
        decision: "Use LangGraph state graphs with human approval checkpoint hooks.",
        consequences: "Full trace capability, pause/resume support, state recovery."
      }
    ],
    topology: [
      { component: "API Gateway & Nginx Proxy", responsibility: "TLS Termination, Rate Limiting, CORS, Static Asset Routing" },
      { component: "Auth & Security Service", responsibility: "JWT Issuance, Google/GitHub OAuth2, 2FA TOTP, RBAC Authorization" },
      { component: "Project Management Engine", responsibility: "Multi-Tenant Project Workspaces, SDLC Phase Tracking" },
      { component: "AI Workspace Command Center", responsibility: "3-Pane Layout, Real-Time Inter-Agent Pub/Sub Message Bus" },
      { component: "Multi-Agent Framework Core", responsibility: "BaseAgent Lifecycle State Machine, AgentRegistry, Tool Execution" },
      { component: "Persistence & Cache Layer", responsibility: "PostgreSQL 3NF Relational Store, Redis Session State, Vector Store RAG" }
    ],
    stack: [
      { layer: "Frontend Studio", tech: "Next.js 15, React 19, Tailwind CSS, TypeScript", justification: "Premium SSR performance, typed UI components" },
      { layer: "Backend Engine", tech: "FastAPI, Python 3.11+, Pydantic v2", justification: "Async non-blocking performance, AI ecosystem integration" },
      { layer: "Persistence Layer", tech: "PostgreSQL 16, Redis 7, Async SQLAlchemy", justification: "ACID compliance 3NF schema, high-speed session cache" }
    ]
  };

  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopNavbar />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📐</span>
                <h1 className="text-2xl font-bold text-white tracking-tight">Solution Architect High-Level Design Studio</h1>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  Elena Rostova (Principal Architect)
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                High-Level System Design (SAD v1.0), Architecture Decision Records (ADRs), and Component Topology.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 gap-2 font-mono text-xs">
            {[
              { id: "adrs", label: "Architecture Decision Records (ADRs)", icon: FileCode2 },
              { id: "topology", label: "Component Topology", icon: Layers },
              { id: "stack", label: "Tech Stack Matrix", icon: Cpu }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 border ${
                    activeTab === tab.id
                      ? "bg-indigo-600/20 border-indigo-500 text-white font-bold"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 text-indigo-400" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active View Render */}
          {activeTab === "adrs" && <ADRList adrs={archData.adrs} />}
          {activeTab === "topology" && <TopologyDiagram components={archData.topology} />}
          {activeTab === "stack" && <TechStackMatrix stack={archData.stack} />}

          {/* Human Approval Action Bar */}
          <div className="p-5 border-t border-white/10 bg-[#0B0D14] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="font-bold text-white">Solution Architecture Approval Gate</span>
              <p className="text-[11px] text-gray-400 font-sans">
                Approving this architecture blueprint hands off execution to Database Architect (David Chen) for 3NF PostgreSQL modeling.
              </p>
            </div>

            {approved ? (
              <div className="px-6 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-center">
                ✓ Architecture Approved! Handoff sent to Database Architect David Chen...
              </div>
            ) : (
              <button
                onClick={() => setApproved(true)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-glow transition flex items-center justify-center gap-2 shrink-0"
              >
                <Check className="w-4 h-4" />
                <span>Approve Architecture & Handoff to DB Architect</span>
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { CleanArchitectureTree } from "@/components/system-architect/CleanArchitectureTree";
import { SequenceDiagramViewer } from "@/components/system-architect/SequenceDiagramViewer";
import { DesignPatternMap } from "@/components/system-architect/DesignPatternMap";
import { Layers, Terminal, Cpu, Check, ArrowRight, ShieldCheck } from "lucide-react";

export default function SystemArchitectStudioPage() {
  const [activeTab, setActiveTab] = useState("architecture");
  const [approved, setApproved] = useState(false);

  const sysData = {
    clean_architecture: {
      domain_layer: {
        purpose: "Contains pure business logic, entities, value objects, and domain events. Zero external framework dependencies.",
        entities: ["Project", "Agent", "WorkflowExecution", "WorkflowStep", "Artifact", "User", "Session"],
        value_objects: ["Slug", "Email", "PasswordHash", "SDLCPhase"],
        domain_events: ["ProjectCreatedEvent", "TaskAssignedEvent", "ArtifactApprovedEvent"]
      },
      application_layer: {
        purpose: "Contains application use cases, DTOs, and ports/interfaces. Orchestrates domain logic.",
        use_cases: ["CreateProjectUseCase", "ExecuteSDLCPhaseUseCase", "ApproveHumanGateUseCase", "DispatchInterAgentMessageUseCase"],
        dtos: ["ProjectCreateDTO", "ProjectResponseDTO", "ApprovalActionDTO"]
      },
      infrastructure_layer: {
        purpose: "Implements interfaces for persistence, external LLM APIs, Redis cache, and messaging.",
        adapters: ["AsyncSQLAlchemyProjectRepository", "RedisSessionCacheAdapter", "GeminiLLMProviderAdapter", "PubSubEventBusAdapter"]
      },
      presentation_layer: {
        purpose: "FastAPI Async Controllers & Next.js React 19 UI Controllers. Handles HTTP request/response validation.",
        controllers: ["ProjectController", "AuthController", "WarRoomController", "CEOController"]
      }
    },
    sequence_flow: [
      { step: 1, from: "Client Browser (Next.js)", to: "API Gateway (FastAPI)", action: "POST /api/v1/projects (ProjectCreateDTO)" },
      { step: 2, from: "API Gateway", to: "CreateProjectUseCase", action: "Invoke use case with validated payload" },
      { step: 3, from: "CreateProjectUseCase", to: "Project Domain Entity", action: "Instantiate Project entity & publish ProjectCreatedEvent" },
      { step: 4, from: "CreateProjectUseCase", to: "AsyncSQLAlchemyProjectRepository", action: "Persist entity to PostgreSQL 3NF table" },
      { step: 5, from: "PubSubEventBus", to: "CEOAgent", action: "Dispatch task to CEO Agent for strategic discovery" }
    ],
    design_patterns: [
      { pattern: "Repository Pattern", location: "Infrastructure / Persistence", justification: "Decouples domain use cases from SQLAlchemy ORM data access." },
      { pattern: "Strategy Pattern", location: "Infrastructure / LLM Providers", justification: "Allows seamless swapping between Google Gemini, OpenAI GPT-4o, and Anthropic Claude." },
      { pattern: "Observer / Event Bus Pattern", location: "Core / Communication Engine", justification: "Enables asynchronous inter-agent messaging and task handoffs." },
      { pattern: "Factory Pattern", location: "Core / Agent Framework", justification: "Instantiates specialized AI agents dynamically based on registered capabilities." }
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
                <span className="text-2xl">⚙️</span>
                <h1 className="text-2xl font-bold text-white tracking-tight">System Architect Detailed Design Studio</h1>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  Elena Rostova (System Architect)
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Detailed System Design Document (DSDD v1.0), Clean Architecture 4-Layer Topology, and Design Pattern Mappings.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 gap-2 font-mono text-xs">
            {[
              { id: "architecture", label: "Clean Architecture 4-Layer Tree", icon: Layers },
              { id: "sequence", label: "Sequence & Interaction Diagrams", icon: Terminal },
              { id: "patterns", label: "Design Pattern Mapping", icon: Cpu }
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
          {activeTab === "architecture" && <CleanArchitectureTree architecture={sysData.clean_architecture} />}
          {activeTab === "sequence" && <SequenceDiagramViewer steps={sysData.sequence_flow} />}
          {activeTab === "patterns" && <DesignPatternMap patterns={sysData.design_patterns} />}

          {/* Human Approval Action Bar */}
          <div className="p-5 border-t border-white/10 bg-[#0B0D14] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="font-bold text-white">System Design Approval Gate</span>
              <p className="text-[11px] text-gray-400 font-sans">
                Approving this detailed system design hands off execution to Database Architect (David Chen) for 3NF PostgreSQL DDL modeling.
              </p>
            </div>

            {approved ? (
              <div className="px-6 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-center">
                ✓ System Design Approved! Handoff sent to Database Architect David Chen...
              </div>
            ) : (
              <button
                onClick={() => setApproved(true)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-glow transition flex items-center justify-center gap-2 shrink-0"
              >
                <Check className="w-4 h-4" />
                <span>Approve System Design & Handoff to DB Architect</span>
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

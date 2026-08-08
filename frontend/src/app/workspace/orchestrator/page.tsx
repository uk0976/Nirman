"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { WorkflowDAGCanvas } from "@/components/orchestrator/WorkflowDAGCanvas";
import { AgentTelemetryPanel } from "@/components/orchestrator/AgentTelemetryPanel";
import { Play, Pause, RotateCcw, Check, Sparkles, ShieldCheck } from "lucide-react";

export default function OrchestratorStudioPage() {
  const [tokens, setTokens] = useState(162500);
  const [costUsd, setCostUsd] = useState(0.3250);
  const [activeStep, setActiveStep] = useState(13);

  const [nodes, setNodes] = useState<Array<{ id: string; name: string; role: string; status: "COMPLETED" | "RUNNING" | "WAITING" | "PARALLEL" }>>([
    { id: "1", name: "Evelyn Vance", role: "CEO Agent", status: "COMPLETED" },
    { id: "2", name: "Marcus Brody", role: "Business Analyst", status: "COMPLETED" },
    { id: "3", name: "Sarah Lin", role: "Product Manager", status: "COMPLETED" },
    { id: "4", name: "Elena Rostova", role: "Solution Architect", status: "COMPLETED" },
    { id: "5", name: "Elena Rostova", role: "System Architect", status: "COMPLETED" },
    { id: "6", name: "David Chen", role: "Database Architect", status: "COMPLETED" },
    { id: "7", name: "Sophia Martinez", role: "UI/UX Designer", status: "COMPLETED" },
    { id: "8", name: "Lucas Meyer", role: "Frontend Engineer", status: "COMPLETED" },
    { id: "9", name: "Ethan Vance", role: "Backend Engineer", status: "COMPLETED" },
    { id: "10", name: "Rachel Adams", role: "QA Engineer", status: "COMPLETED" },
    { id: "11", name: "Devon Vance", role: "Security Engineer", status: "COMPLETED" },
    { id: "12", name: "Marcus Vance", role: "DevOps Engineer", status: "COMPLETED" },
    { id: "13", name: "Amara Okafor", role: "Technical Writer", status: "COMPLETED" },
    { id: "14", name: "Lead Orchestrator", role: "SDLC DAG Engine", status: "COMPLETED" }
  ]);

  const logs = [
    { timestamp: "2026-08-09T00:20:00Z", agent_name: "Evelyn Vance", role: "CEO Agent", status: "COMPLETED" },
    { timestamp: "2026-08-09T00:20:10Z", agent_name: "Marcus Brody", role: "Business Analyst", status: "COMPLETED" },
    { timestamp: "2026-08-09T00:20:20Z", agent_name: "Sarah Lin", role: "Product Manager", status: "COMPLETED" },
    { timestamp: "2026-08-09T00:20:30Z", agent_name: "Elena Rostova", role: "Solution Architect", status: "COMPLETED" },
    { timestamp: "2026-08-09T00:20:40Z", event: "PARALLEL_EXECUTION_STARTED", status: "PARALLEL" },
    { timestamp: "2026-08-09T00:20:50Z", agent_name: "David Chen & Sophia Martinez", role: "DB + UI/UX", status: "COMPLETED" },
    { timestamp: "2026-08-09T00:21:00Z", event: "PARALLEL_ENGINEERING_STARTED", status: "PARALLEL" },
    { timestamp: "2026-08-09T00:21:10Z", agent_name: "Lucas Meyer & Ethan Vance", role: "Frontend + Backend", status: "COMPLETED" },
    { timestamp: "2026-08-09T00:21:20Z", agent_name: "Rachel Adams", role: "QA Engineer", status: "COMPLETED" },
    { timestamp: "2026-08-09T00:21:30Z", agent_name: "Devon Vance", role: "Security Engineer", status: "COMPLETED" },
    { timestamp: "2026-08-09T00:21:40Z", agent_name: "Marcus Vance", role: "DevOps Engineer", status: "COMPLETED" },
    { timestamp: "2026-08-09T00:21:50Z", agent_name: "Amara Okafor", role: "Technical Writer", status: "COMPLETED" }
  ];

  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopNavbar />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                <h1 className="text-2xl font-bold text-white tracking-tight">AI Orchestrator & Multi-Agent Command Center</h1>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  14 Autonomous Agents Coordinated
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Dependency-Aware DAG Orchestration Engine managing state machine transitions, parallel branches, and human approval gates.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={() => {
                  setTokens((t) => t + 12500);
                  setCostUsd((c) => c + 0.025);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition flex items-center gap-1.5 shadow-glow"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Execute Next Step</span>
              </button>
            </div>
          </div>

          {/* Workflow DAG Canvas */}
          <WorkflowDAGCanvas nodes={nodes} />

          {/* Telemetry & Execution Log Stream */}
          <AgentTelemetryPanel tokens={tokens} costUsd={costUsd} logs={logs} />

          {/* Workflow Completion Action Bar */}
          <div className="p-5 border-t border-white/10 bg-[#0B0D14] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="font-bold text-white">Full SDLC Execution Status</span>
              <p className="text-[11px] text-gray-400 font-sans">
                All 14 specialized SDLC agents have executed their respective engineering phases and verified the complete application.
              </p>
            </div>

            <div className="px-6 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-center flex items-center gap-2 shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>✓ All 14 SDLC Agents Coordinated & SDLC Pipeline Complete!</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

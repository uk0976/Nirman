"use client";

import { useState } from "react";
import { Workflow, CheckCircle2, Clock, ArrowRight, Layers, Database, Code2, ShieldCheck, Terminal, Bot } from "lucide-react";

const CANVAS_NODES = [
  { id: "n-1", stage: "01. Discovery", title: "Product Discovery & Market Research", agent: "Business Analyst (Marcus Brody)", status: "COMPLETED", output: "Competitor Matrix & Personas v1.0" },
  { id: "n-2", stage: "02. Requirements", title: "PRD & SRS Specification Contract", agent: "Product Manager (Sarah Lin)", status: "COMPLETED", output: "45 User Stories & PRD Spec" },
  { id: "n-3", stage: "03. Architecture", title: "Clean Architecture Modular Monolith", agent: "System Architect (Elena Rostova)", status: "IN_PROGRESS", output: "UML Sequence Diagrams & Topology" },
  { id: "n-4", stage: "04. Database 3NF", title: "PostgreSQL 3NF Schema & Migrations", agent: "Database Architect (David Chen)", status: "WAITING_APPROVAL", output: "Alembic Migration Scripts" },
  { id: "n-5", stage: "05. API Design", title: "OpenAPI 3.1 REST Contracts", agent: "API Engineer (Omar Al-Mansoor)", status: "QUEUED", output: "Swagger / OpenAPI JSON Schema" },
  { id: "n-6", stage: "06. Backend Services", title: "FastAPI Async Services & SQLAlchemy", agent: "Backend Engineer (Aria Takahashi)", status: "QUEUED", output: "Python Async Microservices" },
  { id: "n-7", stage: "07. Frontend Studio", title: "Next.js 15 App Router Components", agent: "Frontend Engineer (Lucas Meyer)", status: "QUEUED", output: "Tailwind Glassmorphic UI Specs" },
  { id: "n-8", stage: "08. QA & Testing", title: "PyTest Async Unit & Integration Suites", agent: "QA Engineer (Devon Hayes)", status: "QUEUED", output: "100% Async PyTest Fixtures" },
  { id: "n-9", stage: "09. Security Audit", title: "OWASP Top 10 Audit & JWT RBAC", agent: "Security Engineer (Alex Mercer)", status: "QUEUED", output: "TLS 1.3 & JWT Security Audit" },
  { id: "n-10", stage: "10. DevOps Deploy", title: "Multi-Stage Docker Compose & Nginx", agent: "DevOps Engineer (Kaito Tanaka)", status: "QUEUED", output: "Docker Compose Configuration" }
];

export function WorkflowCanvas() {
  const [selectedNode, setSelectedNode] = useState(CANVAS_NODES[2]);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Workflow className="w-5 h-5 text-indigo-400" />
          <h2 className="text-sm font-bold text-white tracking-tight">Interactive SDLC Workflow Node Canvas</h2>
        </div>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
          Node Graph Active
        </span>
      </div>

      {/* Interactive Node Graph Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {CANVAS_NODES.map((node) => {
          const isSelected = selectedNode.id === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-3 ${
                isSelected
                  ? "bg-indigo-600/20 border-indigo-500 shadow-glow"
                  : node.status === "COMPLETED"
                  ? "bg-[#151824] border-emerald-500/30"
                  : node.status === "IN_PROGRESS"
                  ? "bg-indigo-950/40 border-indigo-500/40 animate-pulse"
                  : node.status === "WAITING_APPROVAL"
                  ? "bg-amber-500/10 border-amber-500/30"
                  : "bg-[#0D0F17] border-white/5 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-indigo-400 font-bold">{node.stage}</span>
                {node.status === "COMPLETED" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                {node.status === "IN_PROGRESS" && <Clock className="w-3.5 h-3.5 text-indigo-400 animate-spin" />}
              </div>

              <h3 className="font-bold text-xs text-white tracking-tight leading-tight">{node.title}</h3>
              <p className="text-[10px] font-mono text-gray-400 truncate">{node.agent}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Node Details Card */}
      {selectedNode && (
        <div className="p-6 rounded-2xl bg-[#0D0F17] border border-indigo-500/30 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-indigo-400 font-bold">{selectedNode.stage} DETAIL VIEW</span>
              <h4 className="text-sm font-bold text-white mt-0.5">{selectedNode.title}</h4>
            </div>
            <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
              Status: {selectedNode.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <span className="text-gray-500 text-[10px] uppercase">Assigned AI Agent</span>
              <p className="font-bold text-white text-xs">{selectedNode.agent}</p>
            </div>
            <div>
              <span className="text-gray-500 text-[10px] uppercase">Generated Output Contract</span>
              <p className="font-bold text-emerald-400 text-xs">{selectedNode.output}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

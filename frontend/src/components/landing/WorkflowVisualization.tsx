"use client";

import { useState } from "react";
import { Workflow, CheckCircle2, ArrowRight, Layers, Database, Code2, ShieldCheck, Terminal } from "lucide-react";

const STAGES = [
  { step: 1, title: "Product Discovery", role: "Business Analyst", detail: "Market research, competitor breakdown, functional user personas synthesized." },
  { step: 2, title: "Requirements & PRD", role: "Product Manager", detail: "PRD & SRS contracts compiled with 40+ structured User Stories." },
  { step: 3, title: "System Architecture", role: "System Architect", detail: "Clean Architecture Modular Monolith & UML sequence diagrams." },
  { step: 4, title: "Database 3NF", role: "Database Architect", detail: "PostgreSQL 3NF normalized schema, pgvector embeddings & migrations." },
  { step: 5, title: "Backend API", role: "Backend Engineer", detail: "FastAPI micro-services, Pydantic v2 schemas & Async SQLAlchemy." },
  { step: 6, title: "Frontend Studio", role: "Frontend Engineer", detail: "Next.js 15 App Router, React 19, Tailwind glassmorphic components." },
  { step: 7, title: "Testing & QA", role: "QA Engineer", detail: "Async PyTest unit suites, HTTPX integration tests & coverage reports." },
  { step: 8, title: "DevOps & Deploy", role: "DevOps Engineer", detail: "Multi-stage Docker Compose, Nginx proxy, Prometheus & Grafana monitoring." }
];

export function WorkflowVisualization() {
  const [activeStep, setActiveStep] = useState(2);

  return (
    <section className="py-24 border-t border-white/10 bg-[#0B0D14]/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
            <Workflow className="w-3.5 h-3.5 text-indigo-400" />
            End-to-End SDLC Pipeline
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How Nirman Transforms Ideas Into Software
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Click on any phase below to inspect the deterministic outputs produced by specialized AI agents.
          </p>
        </div>

        {/* Pipeline Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
          {STAGES.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-xl border text-left transition flex flex-col justify-between space-y-2 ${
                activeStep === idx
                  ? "bg-indigo-600/20 border-indigo-500 shadow-glow"
                  : "bg-[#151824] border-white/5 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className={activeStep === idx ? "text-indigo-300 font-bold" : "text-gray-500"}>
                  0{s.step}
                </span>
                {idx <= activeStep && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              </div>
              <p className={`text-xs font-bold truncate ${activeStep === idx ? "text-white" : "text-gray-300"}`}>
                {s.title}
              </p>
            </button>
          ))}
        </div>

        {/* Selected Step Detail Panel */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono text-indigo-400">PHASE 0{STAGES[activeStep].step} SPECIFICATION</span>
              <h3 className="text-xl font-bold text-white mt-1">{STAGES[activeStep].title}</h3>
            </div>
            <span className="px-3 py-1 rounded text-xs font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Lead: {STAGES[activeStep].role}
            </span>
          </div>
          <p className="text-sm text-gray-300 font-mono leading-relaxed">{STAGES[activeStep].detail}</p>
        </div>
      </div>
    </section>
  );
}

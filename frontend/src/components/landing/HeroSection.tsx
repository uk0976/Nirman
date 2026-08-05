"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Play, Terminal, CheckCircle2 } from "lucide-react";

const SIMULATED_STREAM = [
  { role: "CEO", name: "Evelyn Vance", avatar: "👔", text: "Project vision approved: Initializing 20-phase SDLC pipeline for enterprise SaaS.", phase: "Phase 1: Discovery" },
  { role: "Business Analyst", name: "Marcus Brody", avatar: "📊", text: "Synthesized 3 market personas & competitor matrix.", phase: "Phase 4: Analysis" },
  { role: "Product Manager", name: "Sarah Lin", avatar: "📋", text: "PRD & SRS specifications compiled (45 User Stories).", phase: "Phase 6: PRD & SRS" },
  { role: "System Architect", name: "Elena Rostova", avatar: "📐", text: "Clean Architecture Modular Monolith specified with Next.js 15 & FastAPI.", phase: "Phase 7: Architecture" },
  { role: "Database Architect", name: "David Chen", avatar: "🗄️", text: "3NF ER schema normalized & Alembic migration scripts synthesized.", phase: "Phase 8: 3NF Database" },
  { role: "Backend Engineer", name: "Aria Takahashi", avatar: "⚙️", text: "FastAPI domain services & async SQLAlchemy handlers active.", phase: "Phase 10: Core Setup" },
  { role: "QA Engineer", name: "Devon Hayes", avatar: "🧪", text: "100% PyTest async test suites passing cleanly.", phase: "Phase 16: Integration" },
  { role: "DevOps Engineer", name: "Kaito Tanaka", avatar: "🐳", text: "Multi-stage Docker Compose stack & Nginx reverse proxy compiled.", phase: "Phase 18: Deployment" }
];

export function HeroSection() {
  const [streamIndex, setStreamIndex] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setStreamIndex((prev) => (prev + 1) % SIMULATED_STREAM.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-20 pb-20 px-6 max-w-7xl mx-auto text-center flex flex-col items-center">
      {/* Background glow gradient mesh */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none" />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-8">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        Autonomous AI Software Company Platform
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-5xl leading-[1.12] text-white">
        Transform Raw Ideas Into <br />
        <span className="glow-text">Production Software Products</span>
      </h1>

      {/* Supporting Text */}
      <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-3xl leading-relaxed">
        Nirman coordinates 14 specialized AI engineering roles across the complete 20-phase Software Development Life Cycle (SDLC) — from product discovery and architecture to code generation, testing, and deployment.
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/dashboard"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-7 py-3.5 rounded-xl shadow-glow transition flex items-center gap-2"
        >
          <span>Start Building Free</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <a
          href="#demo"
          className="bg-[#151824] hover:bg-white/10 border border-white/10 text-gray-200 font-semibold text-sm px-7 py-3.5 rounded-xl transition flex items-center gap-2"
        >
          <Play className="w-4 h-4 text-indigo-400 fill-current" />
          <span>Watch Demo</span>
        </a>
      </div>

      {/* Live AI Workflow Console Simulation */}
      <div id="demo" className="mt-16 w-full max-w-5xl rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-2xl p-6 text-left">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs font-mono text-gray-400">nirman-sdlc-orchestrator // live-company-stream</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded border border-emerald-500/30 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            14 AGENTS COLLABORATING
          </div>
        </div>

        {/* Live Stream Logs */}
        <div className="space-y-3 font-mono text-xs">
          {SIMULATED_STREAM.slice(0, streamIndex + 1).map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#0D0F17] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all">
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.avatar}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-200 text-xs">{item.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {item.role}
                    </span>
                  </div>
                  <p className="text-gray-300 font-sans text-xs mt-0.5">{item.text}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] text-emerald-400 font-semibold">{item.phase}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

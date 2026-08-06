"use client";

import { useState } from "react";
import { Check, ShieldCheck, FileText, CheckCircle2, AlertCircle, Play, ArrowRight } from "lucide-react";

interface StrategicPlanViewerProps {
  planData: any;
  onApprovePlan: () => void;
}

export function StrategicPlanViewer({ planData, onApprovePlan }: StrategicPlanViewerProps) {
  const [approved, setApproved] = useState(false);

  const handleApprove = () => {
    setApproved(true);
    setTimeout(() => {
      onApprovePlan();
    }, 1000);
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 animate-fade-in font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 font-bold">
            STRATEGIC PLAN ARTIFACT #CEO-001
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            {planData.projectName || "Nirman SaaS Core Platform"} — Executive Plan
          </h2>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-[#151824] border border-white/5 space-y-0.5 text-center">
            <span className="text-[9px] text-gray-400">COMPLEXITY INDEX</span>
            <p className="font-bold text-indigo-400 text-sm">78 / 100</p>
          </div>
          <div className="p-3 rounded-xl bg-[#151824] border border-white/5 space-y-0.5 text-center">
            <span className="text-[9px] text-gray-400">FEASIBILITY SCORE</span>
            <p className="font-bold text-emerald-400 text-sm">92 / 100</p>
          </div>
        </div>
      </div>

      {/* Strategic Sections */}
      <div className="space-y-4 text-xs">
        <div className="p-4 rounded-2xl bg-[#151824] border border-white/5 space-y-1.5 font-mono">
          <h3 className="font-bold text-indigo-300 text-xs uppercase">Executive Summary</h3>
          <p className="text-gray-200 leading-relaxed font-sans text-xs">
            {planData.ideaDescription ||
              "Enterprise software platform designed for high scale, zero-trust security, and AI agent orchestration across 20 SDLC phases."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#151824] border border-white/5 space-y-1.5 font-mono">
            <h3 className="font-bold text-white text-xs uppercase">Vision Statement</h3>
            <p className="text-gray-300 font-sans text-xs">
              To transform software engineering into an autonomous, AI-driven company collaboration model.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#151824] border border-white/5 space-y-1.5 font-mono">
            <h3 className="font-bold text-white text-xs uppercase">Mission Statement</h3>
            <p className="text-gray-300 font-sans text-xs">
              Deliver production-ready enterprise software applications through deterministic 20-phase SDLC execution.
            </p>
          </div>
        </div>

        {/* Scope Definition Matrix */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3 font-mono">
          <h3 className="font-bold text-white text-xs uppercase">Product Scope Matrix</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
              <span className="font-bold text-emerald-300 text-[11px]">IN-SCOPE (MVP Phase 1)</span>
              <ul className="text-[11px] text-gray-300 font-sans space-y-1 list-disc pl-4">
                <li>Next.js 15 App Router Frontend</li>
                <li>FastAPI Async Backend Services</li>
                <li>PostgreSQL 3NF Schema & Migrations</li>
                <li>JWT Auth & 2FA Security</li>
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
              <span className="font-bold text-indigo-300 text-[11px]">FUTURE SCOPE (Phase 2)</span>
              <ul className="text-[11px] text-gray-300 font-sans space-y-1 list-disc pl-4">
                <li>Multi-region Kubernetes deployment</li>
                <li>Real-time AI voice coding assistant</li>
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 space-y-1">
              <span className="font-bold text-red-300 text-[11px]">OUT OF SCOPE</span>
              <ul className="text-[11px] text-gray-300 font-sans space-y-1 list-disc pl-4">
                <li>Legacy monolith code migration</li>
                <li>Manual QA testing workflows</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Human Approval Action Gate */}
      <div className="p-5 border-t border-white/10 bg-[#0B0D14] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div>
          <span className="font-bold text-white">Strategic Approval Gate</span>
          <p className="text-[11px] text-gray-400 font-sans">
            Approving this plan initiates task delegation to Business Analyst, Product Manager, and System Architect agents.
          </p>
        </div>

        {approved ? (
          <div className="px-6 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-center">
            ✓ Plan Approved! Delegating tasks...
          </div>
        ) : (
          <button
            onClick={handleApprove}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-glow transition flex items-center justify-center gap-2 shrink-0"
          >
            <Check className="w-4 h-4" />
            <span>Approve Strategic Plan & Delegate</span>
          </button>
        )}
      </div>
    </div>
  );
}

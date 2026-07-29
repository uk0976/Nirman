"use client";

import React from "react";
import { FileText, CheckCircle2, Sparkles, Download } from "lucide-react";

export const RequirementViewer: React.FC = () => {
  const criteria = [
    { title: "Authentication API Endpoints", desc: "Support /auth/login, /auth/register, and /auth/refresh token endpoints.", done: true },
    { title: "PostgreSQL Database Schemas", desc: "Enforce foreign keys, indexes, and async SQLAlchemy models.", done: true },
    { title: "Automated QA Test Coverage", desc: "Exceed 90% endpoint assertion coverage via Pytest runner.", done: false },
    { title: "Docker Container Packaging", desc: "Produce production-ready multi-stage Docker build files.", done: false },
  ];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Functional Requirements &amp; Scope Specs</h3>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] text-xs font-semibold text-slate-300 hover:bg-white/[0.08]">
          <Download className="w-3.5 h-3.5" /> Export Specs
        </button>
      </div>

      {/* AI Analysis Summary Box */}
      <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-indigo-300">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>AI Requirement Scope Sizing (Product Manager Bob)</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          The requested system is sized at <strong className="text-white">Medium Complexity</strong> (14 total software execution tasks). Architecture requires asynchronous FastAPI endpoints connected to PostgreSQL with Docker containerization.
        </p>
      </div>

      {/* Acceptance Criteria */}
      <div className="space-y-2.5 pt-2">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Acceptance Criteria</h4>
        <div className="space-y-2">
          {criteria.map((c) => (
            <div key={c.title} className="p-3 rounded-xl bg-black/40 border border-white/[0.04] flex items-start gap-3 text-xs">
              <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${c.done ? "text-emerald-400" : "text-slate-600"}`} />
              <div>
                <span className={`font-bold block ${c.done ? "text-slate-200" : "text-slate-400"}`}>{c.title}</span>
                <span className="text-[11px] text-slate-500 leading-tight block">{c.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

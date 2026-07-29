"use client";

import React from "react";
import { Cpu, Sparkles } from "lucide-react";

export const SkillsSection: React.FC = () => {
  const skills = [
    { name: "FastAPI Async Routing", category: "Backend", count: "3 Specialists" },
    { name: "Next.js 16 App Router", category: "Frontend", count: "2 Specialists" },
    { name: "PostgreSQL DDL & Indexing", category: "Database", count: "2 Specialists" },
    { name: "Docker Containerization", category: "DevOps", count: "2 Specialists" },
    { name: "OWASP Vulnerability Audit", category: "Security", count: "2 Specialists" },
    { name: "Pytest Endpoint Fixtures", category: "Quality", count: "2 Specialists" },
  ];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Core Technical Skills Matrix</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {skills.map((sk) => (
          <div key={sk.name} className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-200 block">{sk.name}</span>
              <span className="text-[10px] font-mono text-indigo-400 block">{sk.category}</span>
            </div>
            <span className="text-[9px] font-mono text-slate-500 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
              {sk.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

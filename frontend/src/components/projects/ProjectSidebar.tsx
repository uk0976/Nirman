"use client";

import React from "react";
import { Pin, Sparkles, FolderPlus, ArrowUpRight, Star } from "lucide-react";

export const ProjectSidebar: React.FC = () => {
  return (
    <aside className="w-80 shrink-0 space-y-6 hidden xl:block text-left">
      {/* Pinned Projects */}
      <div className="glass-panel p-5 border border-white/[0.08] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pin className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Pinned Projects</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-500">2 Pinned</span>
        </div>

        <div className="space-y-2">
          <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] hover:border-indigo-500/30 transition-all flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">Inventory Control API</span>
              <span className="text-[10px] font-mono text-emerald-400">Stage 5: API Design</span>
            </div>
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] hover:border-indigo-500/30 transition-all flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">Mobile Warehouse Portal</span>
              <span className="text-[10px] font-mono text-amber-400">Stage 4: War Room Gate</span>
            </div>
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          </div>
        </div>
      </div>

      {/* Quick Starter Templates */}
      <div className="glass-panel p-5 border border-white/[0.08] space-y-3">
        <div className="flex items-center gap-2">
          <FolderPlus className="w-4 h-4 text-purple-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Project Templates</h3>
        </div>

        <div className="space-y-2">
          {[
            { title: "SaaS Application Stack", desc: "Next.js 16 + FastAPI + PostgreSQL" },
            { title: "REST Microservice Suite", desc: "FastAPI + Docker + Pytest Suite" },
            { title: "AI RAG Knowledge Engine", desc: "OpenAI Responses API + Vector DB" },
          ].map((tmpl) => (
            <button
              key={tmpl.title}
              className="w-full text-left p-3 rounded-xl bg-black/40 border border-white/[0.04] hover:border-white/15 transition-all space-y-0.5 group"
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-200 group-hover:text-indigo-300">
                <span>{tmpl.title}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <p className="text-[10px] text-slate-500 font-mono">{tmpl.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

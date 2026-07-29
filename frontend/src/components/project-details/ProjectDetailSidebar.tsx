"use client";

import React from "react";
import { Sparkles, Code, FileText, ShieldCheck, MessageSquare, ArrowUpRight, CheckCircle2 } from "lucide-react";

interface ProjectDetailSidebarProps {
  onOpenWarRoom: () => void;
}

export const ProjectDetailSidebar: React.FC<ProjectDetailSidebarProps> = ({ onOpenWarRoom }) => {
  const actions = [
    { label: "Generate Architecture", icon: FileText, color: "text-purple-400" },
    { label: "Generate Backend API", icon: Code, color: "text-indigo-400" },
    { label: "Generate Frontend UI", icon: Code, color: "text-cyan-400" },
    { label: "Generate Test Suites", icon: ShieldCheck, color: "text-emerald-400" },
    { label: "Generate Documentation", icon: FileText, color: "text-amber-400" },
  ];

  return (
    <aside className="w-80 shrink-0 space-y-6 hidden xl:block text-left">
      {/* Quick Generator Actions */}
      <div className="glass-panel p-5 border border-white/[0.08] space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Quick Generation Actions</h3>
        </div>

        <div className="space-y-2">
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.label}
                className="w-full text-left p-3 rounded-xl bg-black/40 border border-white/[0.04] hover:border-indigo-500/30 transition-all flex items-center justify-between group text-xs"
              >
                <div className="flex items-center gap-2 text-slate-300 group-hover:text-white font-semibold">
                  <Icon className={`w-3.5 h-3.5 ${act.color}`} />
                  <span>{act.label}</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400" />
              </button>
            );
          })}

          <button
            onClick={onOpenWarRoom}
            className="w-full text-left p-3 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:bg-purple-600/30 transition-all flex items-center justify-between text-xs font-bold"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Initiate AI War Room</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Next Milestones */}
      <div className="glass-panel p-5 border border-white/[0.08] space-y-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Next Milestones</h3>
        <div className="space-y-2">
          <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-200 block">Sprint 1 API Release</span>
              <span className="text-[10px] font-mono text-slate-500">Target: Tomorrow</span>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-200 block">Security Audit Gate</span>
              <span className="text-[10px] font-mono text-slate-500">Target: 2 days left</span>
            </div>
            <CheckCircle2 className="w-4 h-4 text-slate-600" />
          </div>
        </div>
      </div>
    </aside>
  );
};

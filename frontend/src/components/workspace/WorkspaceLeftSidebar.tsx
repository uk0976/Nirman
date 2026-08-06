"use client";

import Link from "next/link";
import { Bot, FolderGit2, Workflow, FileText, CheckSquare, BookOpen, Clock, Sparkles } from "lucide-react";

interface WorkspaceLeftSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function WorkspaceLeftSidebar({ activeView, onViewChange }: WorkspaceLeftSidebarProps) {
  const ITEMS = [
    { id: "timeline", label: "Conversation Stream", icon: Clock, badge: "Live" },
    { id: "canvas", label: "Workflow Canvas", icon: Workflow },
    { id: "tasks", label: "Live Task Queue", icon: CheckSquare, count: "6" },
    { id: "agents", label: "14 AI Employees", icon: Bot, count: "14" },
    { id: "artifacts", label: "Generated Artifacts", icon: FileText },
    { id: "kb", label: "Project Context Memory", icon: BookOpen }
  ];

  return (
    <div className="w-64 border-r border-white/10 bg-[#0B0D14] p-4 flex flex-col justify-between h-full select-none">
      <div className="space-y-4">
        {/* Workspace Brand */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-400 p-[1px] shadow-glow">
            <div className="w-full h-full bg-[#0D0F17] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-xs text-white tracking-tight">AI Command Center</h2>
            <p className="text-[10px] text-gray-400 font-mono">Nirman SaaS Core</p>
          </div>
        </div>

        {/* View Switcher Navigation */}
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-gray-500 uppercase px-2">Navigation Views</span>
          {ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                  isActive
                    ? "bg-indigo-600/20 text-white font-bold border border-indigo-500/40 shadow-sm"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-gray-400"}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold animate-pulse">
                    {item.badge}
                  </span>
                )}
                {item.count && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/5 text-gray-400">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-3 rounded-xl bg-[#151824] border border-white/5 space-y-1 font-mono text-[11px] text-gray-400">
        <div className="flex items-center justify-between text-emerald-400 font-bold">
          <span>Engine Status</span>
          <span>Nominal</span>
        </div>
        <p className="text-[10px] text-gray-500">100% Deterministic SDLC Graph</p>
      </div>
    </div>
  );
}

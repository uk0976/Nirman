"use client";

import React, { useState } from "react";
import {
  FolderKanban,
  Play,
  Pause,
  RotateCcw,
  MessageSquare,
  Sparkles,
  Settings,
  ChevronRight,
  ShieldCheck,
  Zap,
  Code
} from "lucide-react";

interface ProjectHeaderProps {
  project: {
    id: string;
    name: string;
    description: string;
    status: string;
    priority: string;
    techStack: string[];
    owner: string;
    createdAt: string;
  };
  onStartExecution: () => void;
  onPauseExecution: () => void;
  onOpenWarRoom: () => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  project,
  onStartExecution,
  onPauseExecution,
  onOpenWarRoom,
}) => {
  const [isRunning, setIsRunning] = useState(true);

  return (
    <div className="glass-panel p-6 border border-white/[0.08] relative overflow-hidden text-left mb-8">
      {/* Background glow bar */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500" />
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-600/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
        <a href="/projects" className="hover:text-indigo-400 transition-colors">Projects</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-200 font-bold truncate">{project.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Title & Metadata */}
        <div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              {project.name}
            </h1>

            <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {project.status}
            </span>

            <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {project.priority} Priority
            </span>
          </div>

          <p className="text-xs md:text-sm text-slate-400 max-w-2xl leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
            <span>Owner: <strong className="text-slate-200">{project.owner}</strong></span>
            <span>Created: <strong className="text-slate-200">{project.createdAt}</strong></span>
            <div className="flex items-center gap-1.5">
              {project.techStack.map((tech) => (
                <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          {isRunning ? (
            <button
              onClick={() => {
                setIsRunning(false);
                onPauseExecution();
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 text-xs font-semibold transition-all"
            >
              <Pause className="w-4 h-4" /> Pause Execution
            </button>
          ) : (
            <button
              onClick={() => {
                setIsRunning(true);
                onStartExecution();
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Play className="w-4 h-4 fill-current" /> Resume Execution
            </button>
          )}

          <button
            onClick={onOpenWarRoom}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-all"
          >
            <MessageSquare className="w-4 h-4" /> War Room
          </button>

          <button
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.08] text-xs font-semibold transition-all"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" /> Artifacts
          </button>

          <a
            href="/settings"
            className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.08] transition-all"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

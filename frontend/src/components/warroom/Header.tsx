"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Play, Pause, Square, Download, Clock, Zap, ShieldCheck } from "lucide-react";

interface HeaderProps {
  sessionTitle: string;
  projectName: string;
  workflowStage: string;
  onExportMinutes?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  sessionTitle,
  projectName,
  workflowStage,
  onExportMinutes,
}) => {
  const [isRunning, setIsRunning] = useState(true);
  const [seconds, setSeconds] = useState(868); // 14m 28s

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs > 0 ? `${hrs}:` : ""}${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="glass-panel p-5 border border-white/[0.08] relative overflow-hidden text-left mb-6">
      {/* Top accent glow */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Title & Badges */}
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white">
              {sessionTitle}
            </h1>

            <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Collaboration
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-400 flex-wrap">
            <span>Project: <strong className="text-slate-200">{projectName}</strong></span>
            <span>Stage: <strong className="text-indigo-400">{workflowStage}</strong></span>
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-indigo-400" /> {formatTime(seconds)}
            </span>
          </div>
        </div>

        {/* Meeting Controls */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          {isRunning ? (
            <button
              onClick={() => setIsRunning(false)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/30 transition-all"
            >
              <Pause className="w-3.5 h-3.5" /> Pause Session
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Resume Session
            </button>
          )}

          <button
            onClick={onExportMinutes}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.08] hover:bg-white/[0.08] text-xs font-semibold transition-all"
          >
            <Download className="w-3.5 h-3.5" /> Export Minutes
          </button>

          <button
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold hover:bg-rose-500/30 transition-all"
          >
            <Square className="w-3.5 h-3.5" /> End Session
          </button>
        </div>
      </div>
    </div>
  );
};

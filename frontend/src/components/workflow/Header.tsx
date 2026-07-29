"use client";

import React, { useState, useEffect } from "react";
import { Workflow, Play, Pause, XCircle, Download, RotateCcw, Clock, Zap } from "lucide-react";

interface HeaderProps {
  projectName: string;
  workflowId: string;
  currentStage: string;
  progress: number;
  onReplayToggle?: () => void;
  isReplaying?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  projectName,
  workflowId,
  currentStage,
  progress,
  onReplayToggle,
  isReplaying = false,
}) => {
  const [isRunning, setIsRunning] = useState(true);
  const [seconds, setSeconds] = useState(1122); // 18m 42s

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="glass-panel p-5 border border-white/[0.08] relative overflow-hidden text-left mb-6">
      {/* Accent glow bar */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Title & Badges */}
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Workflow className="w-4 h-4" />
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white">
              Autonomous Development Lifecycle
            </h1>

            <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {isReplaying ? "Replay Mode" : "Live Execution"}
            </span>

            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/[0.04] text-indigo-300 border border-white/[0.08]">
              {workflowId}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-400 flex-wrap">
            <span>Project: <strong className="text-slate-200">{projectName}</strong></span>
            <span>Current Stage: <strong className="text-indigo-400">{currentStage}</strong></span>
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-indigo-400" /> Elapsed: {formatTime(seconds)}
            </span>
          </div>
        </div>

        {/* Workflow Controls */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={onReplayToggle}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isReplaying
                ? "bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/30"
                : "bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30"
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" /> Replay Mode
          </button>

          {isRunning ? (
            <button
              onClick={() => setIsRunning(false)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/30 transition-all"
            >
              <Pause className="w-3.5 h-3.5" /> Pause Workflow
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Resume Workflow
            </button>
          )}

          <button
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.08] hover:bg-white/[0.08] text-xs font-semibold transition-all"
          >
            <Download className="w-3.5 h-3.5" /> Export Timeline
          </button>

          <button
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold hover:bg-rose-500/30 transition-all"
          >
            <XCircle className="w-3.5 h-3.5" /> Cancel Workflow
          </button>
        </div>
      </div>
    </div>
  );
};

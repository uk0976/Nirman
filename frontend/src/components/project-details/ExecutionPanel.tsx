"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Cpu, Sparkles, CheckCircle2, Play } from "lucide-react";
import { motion } from "framer-motion";

export const ExecutionPanel: React.FC = () => {
  const [currentPrompt, setCurrentPrompt] = useState("Generating async FastAPI controllers for /api/v1/auth router...");
  const [thinkingStep, setThinkingStep] = useState("Fiona (Backend) is parsing Pydantic schema validation rules...");
  const [progress, setProgress] = useState(68);

  useEffect(() => {
    const prompts = [
      "Fiona (Backend) is creating async OAuth token refresh endpoints...",
      "Ian (QA) is writing Pytest fixtures for JWT bearer assertions...",
      "Jack (Security) is reviewing argon2id password hashing constraints...",
    ];
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setCurrentPrompt(prompts[idx % prompts.length]);
      setProgress((prev) => (prev >= 95 ? 68 : prev + 4));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left relative overflow-hidden">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live AI Execution Stream</h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          Streaming via Codex Engine
        </div>
      </div>

      <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08] space-y-3 font-mono text-xs mb-4">
        <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-white/[0.06] pb-2">
          <span>Active Agent: <strong className="text-indigo-400">Fiona (Backend Engineer)</strong></span>
          <span>Model: <strong className="text-purple-400">gpt-4o-code</strong></span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Current Prompt</span>
          <p className="text-slate-200 text-xs leading-relaxed">{currentPrompt}</p>
        </div>

        <div className="flex items-center gap-2 text-cyan-300 text-[11px] pt-1">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>{thinkingStep}</span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs font-mono text-slate-400">
          <span>Execution Progress</span>
          <span className="text-indigo-400 font-bold">{progress}%</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

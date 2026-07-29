"use client";

import React, { useState } from "react";
import { Cpu, CheckCircle2, RefreshCw, Zap, Sliders, ShieldCheck } from "lucide-react";

export const AIProviderSettings: React.FC = () => {
  const [providers] = useState([
    { name: "OpenAI Platform", model: "gpt-4o / o1-preview", status: "Connected", latency: "142ms", health: "99.9%" },
    { name: "Anthropic Claude", model: "claude-3-5-sonnet", status: "Connected", latency: "185ms", health: "99.8%" },
    { name: "Google Gemini AI", model: "gemini-1.5-pro", status: "Connected", latency: "120ms", health: "100%" },
    { name: "Azure OpenAI", model: "gpt-4o-enterprise", status: "Connected", latency: "98ms", health: "99.9%" },
    { name: "Ollama (Local LLM)", model: "llama-3-70b", status: "Disabled", latency: "N/A", health: "Offline" },
  ]);

  return (
    <div className="glass-panel p-6 border border-white/[0.08] text-left space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <h2 className="text-base font-bold text-white uppercase tracking-wider">AI Model Providers &amp; Infrastructure</h2>
        </div>
        <span className="text-xs font-mono text-emerald-400 font-bold">4 Active Providers</span>
      </div>

      {/* Provider List */}
      <div className="space-y-3">
        {providers.map((pr) => (
          <div
            key={pr.name}
            className="p-4 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between gap-4 text-xs font-mono"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold shrink-0">
                ⚡
              </div>
              <div>
                <span className="font-bold text-white font-sans text-sm block">{pr.name}</span>
                <span className="text-slate-400">Default Model: <strong className="text-indigo-300">{pr.model}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <span className="text-slate-400">Latency: <strong className="text-emerald-400">{pr.latency}</strong></span>
              <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${
                pr.status === "Connected" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-slate-500/20 text-slate-400 border-slate-500/30"
              }`}>
                {pr.status}
              </span>
              <button className="px-3 py-1.5 rounded-lg bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.06]">
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

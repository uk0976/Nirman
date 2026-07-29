"use client";

import React, { useState } from "react";
import { Key, Eye, EyeOff, Copy, RefreshCw, Check, ShieldCheck } from "lucide-react";

export const APIKeyManager: React.FC = () => {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const keys = [
    { name: "OpenAI Platform API Key", env: "OPENAI_API_KEY", key: "sk-proj-94827104928174918274" },
    { name: "Anthropic Claude API Key", env: "ANTHROPIC_API_KEY", key: "sk-ant-api03-918274918274" },
    { name: "Google Gemini AI API Key", env: "GEMINI_API_KEY", key: "AIzaSyD91827491827491827" },
    { name: "GitHub Access Token", env: "GITHUB_TOKEN", key: "ghp_91827491827491827491" },
  ];

  const toggleReveal = (env: string) => {
    setRevealed((prev) => ({ ...prev, [env]: !prev[env] }));
  };

  return (
    <div className="glass-panel p-6 border border-white/[0.08] text-left space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Key className="w-5 h-5 text-indigo-400" />
          <h2 className="text-base font-bold text-white uppercase tracking-wider">API Credentials &amp; Key Vault</h2>
        </div>
        <button className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30">
          + Add New Key
        </button>
      </div>

      <div className="space-y-4">
        {keys.map((k) => (
          <div key={k.env} className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white font-sans text-sm">{k.name}</span>
              <span className="text-[10px] text-slate-500 font-mono">{k.env}</span>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/60 border border-white/10">
              <input
                type={revealed[k.env] ? "text" : "password"}
                readOnly
                value={k.key}
                className="w-full bg-transparent text-indigo-300 font-mono focus:outline-none"
              />
              <button
                onClick={() => toggleReveal(k.env)}
                className="p-1.5 text-slate-400 hover:text-white rounded"
              >
                {revealed[k.env] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

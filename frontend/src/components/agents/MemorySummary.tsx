"use client";

import React from "react";
import { Brain, Sparkles, CheckCircle2 } from "lucide-react";

export const MemorySummary: React.FC = () => {
  const memories = [
    { agent: "Charlie (Architect)", decision: "Enforced layered router layout in FastAPI project.", time: "1 hour ago" },
    { agent: "Jack (Security)", decision: "Required Argon2id password hashing for OWASP compliance.", time: "2 hours ago" },
    { agent: "George (Database)", decision: "Added composite index on user_id to optimize search queries.", time: "3 hours ago" },
  ];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Active Memory &amp; Context Store</h3>
        </div>
        <span className="text-xs font-mono text-purple-400">128 KB Vector Store Active</span>
      </div>

      <div className="space-y-3">
        {memories.map((m) => (
          <div key={m.agent} className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-indigo-300 block">{m.agent}</span>
              <span className="text-slate-300 block">{m.decision}</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 shrink-0 ml-2">{m.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

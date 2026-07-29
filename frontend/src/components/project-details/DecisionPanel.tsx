"use client";

import React from "react";
import { MessageSquare, CheckCircle2, ShieldCheck, Award } from "lucide-react";

export const DecisionPanel: React.FC = () => {
  const decisions = [
    { title: "Layered FastAPI Architecture", reason: "Charlie selected multi-file router modules to separate domain business logic from API controllers.", confidence: 96, time: "2 hours ago" },
    { title: "Argon2id Password Hashing", reason: "Jack (Security) enforced Argon2id over standard bcrypt for OWASP compliance.", confidence: 98, time: "3 hours ago" },
    { title: "PostgreSQL Composite Indexing", reason: "George (Database) added composite index on user_id + execution_id to optimize search by 40%.", confidence: 94, time: "4 hours ago" },
  ];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent AI War Room Decisions</h3>
        </div>
        <span className="text-xs font-mono text-purple-400">3 Verified Consensus Decisions</span>
      </div>

      <div className="space-y-3">
        {decisions.map((d) => (
          <div key={d.title} className="p-4 rounded-xl bg-black/40 border border-white/[0.06] hover:border-purple-500/30 transition-all space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">{d.title}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                {d.confidence}% Confidence
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">{d.reason}</p>
            <span className="text-[10px] font-mono text-slate-500 block pt-1">{d.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

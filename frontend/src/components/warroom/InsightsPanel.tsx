"use client";

import React from "react";
import { Sparkles, AlertTriangle, CheckCircle2, HelpCircle, ArrowUpRight } from "lucide-react";

export const InsightsPanel: React.FC = () => {
  return (
    <aside className="w-80 shrink-0 space-y-6 hidden xl:block text-left">
      {/* Session Summary */}
      <div className="glass-panel p-5 border border-white/[0.08] space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Session Summary</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          The team agreed to adopt multi-file FastAPI layered routing and PostgreSQL composite indexing for the Inventory Control API.
        </p>
      </div>

      {/* Open Risk Alerts */}
      <div className="glass-panel p-5 border border-rose-500/20 bg-rose-500/[0.02] space-y-2">
        <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase">
          <AlertTriangle className="w-4 h-4" /> Open Risks
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Jack (Security) flagged potential refresh token expiration loops if client cookies are cleared before expiration.
        </p>
      </div>

      {/* Pending Questions */}
      <div className="glass-panel p-5 border border-white/[0.08] space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Pending Questions</h3>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">1 Open</span>
        </div>
        <div className="p-3 rounded-xl bg-black/40 border border-white/[0.04] text-xs text-slate-300">
          Should OAuth refresh tokens be stored in HttpOnly cookies or localStorage?
        </div>
      </div>
    </aside>
  );
};

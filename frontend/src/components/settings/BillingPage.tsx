"use client";

import React from "react";
import { CreditCard, Zap, CheckCircle2, Award, Download } from "lucide-react";

export const BillingPage: React.FC = () => {
  return (
    <div className="glass-panel p-6 border border-white/[0.08] text-left space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-indigo-400" />
          <h2 className="text-base font-bold text-white uppercase tracking-wider">Billing &amp; Subscription Plan</h2>
        </div>
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
          Enterprise AI Tier
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
        <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
          <span className="text-slate-400 uppercase text-[10px] block">Token Usage</span>
          <span className="text-xl font-extrabold text-white block">1.4M / 5.0M</span>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-indigo-500 w-[28%]" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
          <span className="text-slate-400 uppercase text-[10px] block">Storage Allocation</span>
          <span className="text-xl font-extrabold text-white block">48.2 MB / 10 GB</span>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-emerald-500 w-[5%]" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
          <span className="text-slate-400 uppercase text-[10px] block">AI Employee Seats</span>
          <span className="text-xl font-extrabold text-white block">12 / 12 Active</span>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-cyan-500 w-[100%]" />
          </div>
        </div>
      </div>
    </div>
  );
};

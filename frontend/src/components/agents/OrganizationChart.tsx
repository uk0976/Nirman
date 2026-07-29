"use client";

import React from "react";
import { Users, ChevronDown, ArrowDown } from "lucide-react";

export const OrganizationChart: React.FC = () => {
  return (
    <div className="glass-panel p-8 border border-white/[0.08] mb-8 text-center space-y-8 overflow-x-auto">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] text-left">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Company Organizational Hierarchy</h3>
        </div>
        <span className="text-xs font-mono text-indigo-400">12 Specialist Roles</span>
      </div>

      <div className="flex flex-col items-center space-y-6 min-w-[800px]">
        {/* Tier 1: Executive */}
        <div className="p-4 rounded-xl bg-purple-600/20 border border-purple-500/30 text-white w-64 shadow-xl">
          <span className="text-2xl block mb-1">👩‍💼</span>
          <h4 className="text-sm font-bold">Alice</h4>
          <span className="text-[11px] font-mono text-purple-300 block">Chief Executive Officer (CEO)</span>
        </div>

        <ArrowDown className="w-4 h-4 text-slate-500" />

        {/* Tier 2: Product */}
        <div className="p-4 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-white w-64 shadow-xl">
          <span className="text-2xl block mb-1">👨‍💻</span>
          <h4 className="text-sm font-bold">Bob</h4>
          <span className="text-[11px] font-mono text-indigo-300 block">Product Manager (PM)</span>
        </div>

        <ArrowDown className="w-4 h-4 text-slate-500" />

        {/* Tier 3: Architecture */}
        <div className="p-4 rounded-xl bg-cyan-600/20 border border-cyan-500/30 text-white w-64 shadow-xl">
          <span className="text-2xl block mb-1">👨‍🔬</span>
          <h4 className="text-sm font-bold">Charlie</h4>
          <span className="text-[11px] font-mono text-cyan-300 block">Software Architect</span>
        </div>

        <ArrowDown className="w-4 h-4 text-slate-500" />

        {/* Tier 4: Engineering Core */}
        <div className="grid grid-cols-4 gap-4 w-full max-w-4xl">
          <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] text-white">
            <span className="text-xl block mb-1">👩‍🎨</span>
            <h5 className="text-xs font-bold">Diana</h5>
            <span className="text-[10px] font-mono text-slate-400 block">UI/UX Designer</span>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] text-white">
            <span className="text-xl block mb-1">👨‍💻</span>
            <h5 className="text-xs font-bold">Evan</h5>
            <span className="text-[10px] font-mono text-slate-400 block">Frontend Engineer</span>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] text-white">
            <span className="text-xl block mb-1">👩‍💻</span>
            <h5 className="text-xs font-bold">Fiona</h5>
            <span className="text-[10px] font-mono text-slate-400 block">Backend Engineer</span>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] text-white">
            <span className="text-xl block mb-1">👨‍🔧</span>
            <h5 className="text-xs font-bold">George</h5>
            <span className="text-[10px] font-mono text-slate-400 block">Database Engineer</span>
          </div>
        </div>

        <ArrowDown className="w-4 h-4 text-slate-500" />

        {/* Tier 5: Quality, Security, DevOps, Docs */}
        <div className="grid grid-cols-5 gap-3 w-full max-w-5xl">
          <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] text-white">
            <span className="text-xl block mb-1">🤖</span>
            <h5 className="text-xs font-bold">Hope</h5>
            <span className="text-[10px] font-mono text-slate-400 block">AI Engineer</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] text-white">
            <span className="text-xl block mb-1">🕵️‍♂️</span>
            <h5 className="text-xs font-bold">Ian</h5>
            <span className="text-[10px] font-mono text-slate-400 block">QA Engineer</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] text-white">
            <span className="text-xl block mb-1">🛡️</span>
            <h5 className="text-xs font-bold">Jack</h5>
            <span className="text-[10px] font-mono text-slate-400 block">Security Engineer</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] text-white">
            <span className="text-xl block mb-1">🚀</span>
            <h5 className="text-xs font-bold">Kate</h5>
            <span className="text-[10px] font-mono text-slate-400 block">DevOps Engineer</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] text-white">
            <span className="text-xl block mb-1">📝</span>
            <h5 className="text-xs font-bold">Leo</h5>
            <span className="text-[10px] font-mono text-slate-400 block">Documentation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { Layers, CheckCircle2, RefreshCw, ExternalLink } from "lucide-react";

export const IntegrationsPage: React.FC = () => {
  const integrations = [
    { name: "GitHub Repositories", desc: "Automated PR creations & repo pushes", status: "Connected", sync: "2m ago" },
    { name: "Docker Hub Registry", desc: "Automated container image publishing", status: "Connected", sync: "15m ago" },
    { name: "Vercel Platform", desc: "Automated frontend preview deployments", status: "Connected", sync: "1h ago" },
    { name: "AWS Cloud Infrastructure", desc: "ECS & Lambda deployment target", status: "Connected", sync: "4h ago" },
    { name: "Slack Workspaces", desc: "War Room notifications & alerts", status: "Connected", sync: "Just now" },
  ];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] text-left space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h2 className="text-base font-bold text-white uppercase tracking-wider">Enterprise Service Integrations</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((it) => (
          <div key={it.name} className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm font-sans">{it.name}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-[10px]">
                {it.status}
              </span>
            </div>
            <p className="text-slate-400">{it.desc}</p>
            <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between font-mono text-[10px] text-slate-500">
              <span>Last Sync: {it.sync}</span>
              <button className="text-indigo-400 hover:text-indigo-300 font-bold">Sync Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, BarChart3 } from "lucide-react";

export const Analytics: React.FC = () => {
  const data = [
    { time: "00:00", progress: 10, confidence: 90 },
    { time: "04:00", progress: 25, confidence: 94 },
    { time: "08:00", progress: 40, confidence: 92 },
    { time: "12:00", progress: 55, confidence: 96 },
    { time: "16:00", progress: 68, confidence: 95 },
  ];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Project Progress Velocity &amp; AI Confidence</h3>
        </div>
        <span className="text-xs font-mono text-slate-400 font-bold">24-Hour Velocity Trend</span>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="projGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: "#09090d", borderColor: "#1e293b", borderRadius: "8px", fontSize: "11px" }} />
            <Area type="monotone" dataKey="progress" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#projGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

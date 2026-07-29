"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart3, TrendingUp } from "lucide-react";

export const PerformanceCharts: React.FC = () => {
  const data = [
    { name: "Mon", tasks: 42, confidence: 94 },
    { name: "Tue", tasks: 58, confidence: 96 },
    { name: "Wed", tasks: 64, confidence: 95 },
    { name: "Thu", tasks: 72, confidence: 97 },
    { name: "Fri", tasks: 89, confidence: 98 },
  ];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Workforce Performance &amp; Confidence Output</h3>
        </div>
        <span className="text-xs font-mono text-slate-400">Weekly Task Velocity</span>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="agentPerf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: "#09090d", borderColor: "#1e293b", borderRadius: "8px", fontSize: "11px" }} />
            <Area type="monotone" dataKey="tasks" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#agentPerf)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

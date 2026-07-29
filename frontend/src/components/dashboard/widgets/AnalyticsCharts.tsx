"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3, PieChart as PieIcon, TrendingUp } from "lucide-react";

export const AnalyticsCharts: React.FC = () => {
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">("daily");

  const dailyTokenData = [
    { name: "Mon", tokens: 240000, cost: 4.8 },
    { name: "Tue", tokens: 380000, cost: 7.6 },
    { name: "Wed", tokens: 520000, cost: 10.4 },
    { name: "Thu", tokens: 410000, cost: 8.2 },
    { name: "Fri", tokens: 680000, cost: 13.6 },
    { name: "Sat", tokens: 290000, cost: 5.8 },
    { name: "Sun", tokens: 490000, cost: 9.8 },
  ];

  const modelDistData = [
    { name: "Codex (gpt-4o-code)", value: 55, color: "#6366f1" },
    { name: "Responses API (gpt-4o)", value: 30, color: "#a855f7" },
    { name: "Mini Auditor (gpt-4o-mini)", value: 15, color: "#06b6d4" },
  ];

  const costByDeptData = [
    { dept: "Engineering", cost: 42.5 },
    { dept: "Architecture", cost: 24.0 },
    { dept: "Product & PM", cost: 14.2 },
    { dept: "QA & Testing", cost: 12.8 },
    { dept: "Security", cost: 8.5 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 text-left">
      
      {/* Area Chart: Token Usage Trends */}
      <div className="lg:col-span-8 glass-panel p-6 border border-white/[0.08] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Token Consumption Trends</h3>
            </div>
            <div className="flex gap-1">
              {(["daily", "weekly", "monthly"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono capitalize transition-all ${
                    timeframe === t
                      ? "bg-indigo-600 text-white font-bold"
                      : "bg-white/[0.04] text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyTokenData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="tokenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#09090d", borderColor: "#1e293b", borderRadius: "8px", fontSize: "11px" }}
                  formatter={(val: any) => [`${(Number(val) / 1000).toFixed(0)}K Tokens`, "Volume"]}
                />
                <Area type="monotone" dataKey="tokens" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#tokenGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pie Chart: Model Distribution */}
      <div className="lg:col-span-4 glass-panel p-6 border border-white/[0.08] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
            <div className="flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Model Routing</h3>
            </div>
          </div>

          <div className="h-44 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={modelDistData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={4}>
                  {modelDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#09090d", borderColor: "#1e293b", borderRadius: "8px", fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-4 border-t border-white/[0.04]">
            {modelDistData.map((m) => (
              <div key={m.name} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                  <span className="text-slate-300 truncate">{m.name}</span>
                </div>
                <span className="font-mono font-bold text-white">{m.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

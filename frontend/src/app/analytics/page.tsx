"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { SearchDialog } from "@/components/dashboard/SearchDialog";
import { AnalyticsCharts } from "@/components/dashboard/widgets/AnalyticsCharts";
import { MetricCardGrid } from "@/components/dashboard/widgets/MetricCardGrid";
import { BarChart3, TrendingUp, Cpu, Zap, Award } from "lucide-react";

export default function AnalyticsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030303] text-slate-100 relative font-sans selection:bg-indigo-500/30">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <TopNavbar
        sidebarCollapsed={sidebarCollapsed}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenQuickCreate={() => setSearchOpen(true)}
      />

      <NotificationPanel
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      <SearchDialog
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <main
        className={`pt-20 pb-16 px-6 transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="max-w-[1600px] mx-auto space-y-8">
          
          {/* Header */}
          <div className="glass-panel p-8 border border-white/[0.08] relative overflow-hidden text-left">
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-3">
                  <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Performance & Intelligence Analytics</span>
                </div>
                <h1 className="text-3xl font-extrabold text-white mb-2">
                  Company Performance Analytics
                </h1>
                <p className="text-xs text-slate-400">
                  Track token consumption, agent throughput, consensus accuracy, build speeds, and multi-agent resource allocation.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/[0.06] text-center">
                  <span className="block text-[10px] font-mono text-slate-500">ACCURACY SCORE</span>
                  <span className="text-xs font-bold text-emerald-400">99.4% Consensus</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Cards */}
          <MetricCardGrid />

          {/* Charts */}
          <AnalyticsCharts />

        </div>
      </main>
    </div>
  );
}

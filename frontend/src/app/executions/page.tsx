"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { SearchDialog } from "@/components/dashboard/SearchDialog";
import { ExecutionTable } from "@/components/dashboard/widgets/ExecutionTable";
import { WorkflowTimeline } from "@/components/dashboard/widgets/WorkflowTimeline";
import { Cpu, Terminal, RefreshCw, CheckCircle2, AlertTriangle, Clock } from "lucide-react";

export default function ExecutionsPage() {
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
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Nirman Execution Manager</span>
                </div>
                <h1 className="text-3xl font-extrabold text-white mb-2">
                  AI Task & Sandbox Executions
                </h1>
                <p className="text-xs text-slate-400">
                  Monitor real-time sandbox execution runs, container logs, exit codes, and memory utilization across active agents.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-slate-200 transition-all flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-indigo-400" /> Refresh Stream
                </button>
              </div>
            </div>
          </div>

          {/* Workflow Timeline */}
          <WorkflowTimeline />

          {/* Execution Table */}
          <ExecutionTable />

        </div>
      </main>
    </div>
  );
}

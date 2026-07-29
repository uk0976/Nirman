"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { SearchDialog } from "@/components/dashboard/SearchDialog";

import { Header } from "@/components/workflow/Header";
import { OverviewCards } from "@/components/workflow/OverviewCards";
import { MainTimeline } from "@/components/workflow/MainTimeline";
import { ExecutionGraph } from "@/components/workflow/ExecutionGraph";
import { ExecutionConsole } from "@/components/workflow/ExecutionConsole";
import { QualityGateCards } from "@/components/workflow/QualityGateCards";
import { ReplayControls } from "@/components/workflow/ReplayControls";
import { WorkflowSidebar } from "@/components/workflow/WorkflowSidebar";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export default function WorkflowTimelinePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isReplaying, setIsReplaying] = useState(false);

  // Fetch Workflow data from backend API
  const { data: workflowData } = useQuery({
    queryKey: ["workflow"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/workflows/");
        if (Array.isArray(res.data) && res.data.length > 0) {
          return {
            id: res.data[0].id || "WF-902",
            projectName: res.data[0].project_name || "Inventory Control API",
            stage: res.data[0].current_stage || "Stage 7: Backend Development",
            progress: res.data[0].progress || 68,
          };
        }
      } catch (err) {
        // Fallback
      }
      return {
        id: "WF-902",
        projectName: "Inventory Control API",
        stage: "Stage 7: Backend Development",
        progress: 68,
      };
    },
  });

  const wf = workflowData || {
    id: "WF-902",
    projectName: "Inventory Control API",
    stage: "Stage 7: Backend Development",
    progress: 68,
  };

  return (
    <div className="min-h-screen bg-[#030303] text-slate-100 relative font-sans selection:bg-indigo-500/30">
      
      {/* Sidebar Navigation */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Top Navbar */}
      <TopNavbar
        sidebarCollapsed={sidebarCollapsed}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenQuickCreate={() => setSearchOpen(true)}
      />

      {/* Notification Slide-out Panel */}
      <NotificationPanel
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      {/* Global Search Dialog (Ctrl+K) */}
      <SearchDialog
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      {/* Main Workflow Workspace */}
      <main
        className={`pt-20 pb-16 px-6 transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="max-w-[1600px] mx-auto">
          
          {/* Header */}
          <Header
            projectName={wf.projectName}
            workflowId={wf.id}
            currentStage={wf.stage}
            progress={wf.progress}
            isReplaying={isReplaying}
            onReplayToggle={() => setIsReplaying(!isReplaying)}
          />

          {/* KPI Metrics */}
          <OverviewCards />

          {/* Replay Controls (Visible in Replay Mode) */}
          <ReplayControls
            isReplaying={isReplaying}
            onToggleReplay={() => setIsReplaying(false)}
          />

          {/* Main 2-Column Content */}
          <div className="flex items-start gap-8">
            
            {/* Left Column: Timeline, Graph, Console */}
            <div className="flex-1 min-w-0">
              <MainTimeline />
              <ExecutionGraph />
              <ExecutionConsole />
              <QualityGateCards />
            </div>

            {/* Right Column: Insights */}
            <WorkflowSidebar />

          </div>

        </div>
      </main>

    </div>
  );
}

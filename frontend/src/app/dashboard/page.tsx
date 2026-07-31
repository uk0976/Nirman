"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { RightSidebar } from "@/components/dashboard/RightSidebar";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { SearchDialog } from "@/components/dashboard/SearchDialog";
import { CreateProjectWizard } from "@/components/projects/CreateProjectWizard";

import { WelcomeHeader } from "@/components/dashboard/widgets/WelcomeHeader";
import { MetricCardGrid } from "@/components/dashboard/widgets/MetricCardGrid";
import { LiveAICompanyGrid } from "@/components/dashboard/widgets/LiveAICompanyGrid";
import { LiveActivityFeed } from "@/components/dashboard/widgets/LiveActivityFeed";
import { RunningProjects } from "@/components/dashboard/widgets/RunningProjects";
import { WorkflowTimeline } from "@/components/dashboard/widgets/WorkflowTimeline";
import { ExecutionTable } from "@/components/dashboard/widgets/ExecutionTable";
import { AnalyticsCharts } from "@/components/dashboard/widgets/AnalyticsCharts";
import { RecentArtifacts } from "@/components/dashboard/widgets/RecentArtifacts";

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [createWizardOpen, setCreateWizardOpen] = useState(false);

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
        onOpenQuickCreate={() => setCreateWizardOpen(true)}
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

      {/* 5-Step Project Creation Wizard Modal */}
      <CreateProjectWizard
        isOpen={createWizardOpen}
        onClose={() => setCreateWizardOpen(false)}
        onSuccess={() => {}}
      />

      {/* Main Workspace Scroll Area */}
      <main
        className={`pt-20 pb-16 px-6 transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-start gap-8">
          
          {/* Central Command Column */}
          <div className="flex-1 min-w-0">
            
            {/* Welcome Header */}
            <WelcomeHeader />

            {/* KPI Metric Cards */}
            <MetricCardGrid />

            {/* Live AI Company Employees Grid */}
            <LiveAICompanyGrid />

            {/* Middle Section: Activity Feed + Running Projects */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
              <div className="lg:col-span-6">
                <LiveActivityFeed />
              </div>
              <div className="lg:col-span-6">
                <RunningProjects />
              </div>
            </div>

            {/* Workflow Timeline Visualization */}
            <WorkflowTimeline />

            {/* Recent AI Execution Logs Table */}
            <ExecutionTable />

            {/* Analytics Charts */}
            <AnalyticsCharts />

            {/* Recent System Artifacts */}
            <RecentArtifacts />

          </div>

          {/* Right Summary Sidebar */}
          <RightSidebar />

        </div>
      </main>

    </div>
  );
}

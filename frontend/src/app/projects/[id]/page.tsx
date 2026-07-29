"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { SearchDialog } from "@/components/dashboard/SearchDialog";

import { ProjectHeader } from "@/components/project-details/ProjectHeader";
import { OverviewCards } from "@/components/project-details/OverviewCards";
import { Timeline } from "@/components/project-details/Timeline";
import { AIEmployeePanel } from "@/components/project-details/AIEmployeePanel";
import { ExecutionPanel } from "@/components/project-details/ExecutionPanel";
import { TaskBoard } from "@/components/project-details/TaskBoard";
import { RequirementViewer } from "@/components/project-details/RequirementViewer";
import { ArtifactGallery } from "@/components/project-details/ArtifactGallery";
import { FileExplorer } from "@/components/project-details/FileExplorer";
import { WorkflowDiagram } from "@/components/project-details/WorkflowDiagram";
import { ExecutionLogs } from "@/components/project-details/ExecutionLogs";
import { DecisionPanel } from "@/components/project-details/DecisionPanel";
import { Analytics } from "@/components/project-details/Analytics";
import { HealthCard } from "@/components/project-details/HealthCard";
import { ProjectDetailSidebar } from "@/components/project-details/ProjectDetailSidebar";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { Layers, Activity, FolderKanban, FileText, FileCode2, Folder, Workflow, Terminal, MessageSquare, BarChart3 } from "lucide-react";

export default function ProjectMissionControlPage() {
  const params = useParams();
  const projectId = (params?.id as string) || "1";

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "execution" | "tasks" | "requirements" | "artifacts" | "files" | "workflow" | "logs" | "analytics"
  >("overview");

  // Fetch project details from backend API
  const { data: projectData } = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      try {
        const res = await apiClient.get(`/projects/${projectId}`);
        if (res.data) {
          return {
            id: res.data.id || projectId,
            name: res.data.name || "Inventory Control API",
            description: res.data.description || "Asynchronous Python FastAPI service handling warehouse inventory counts.",
            status: res.data.status || "Running",
            priority: res.data.priority || "High",
            techStack: res.data.tech_stack || ["FastAPI", "PostgreSQL", "Docker", "Pytest"],
            owner: "Alex Dev",
            createdAt: "2 days ago",
          };
        }
      } catch (err) {
        // Fallback
      }
      return {
        id: projectId,
        name: "Inventory Control API",
        description: "Asynchronous Python FastAPI service handling warehouse inventory counts, SKU tracking, and PostgreSQL indexing.",
        status: "Running",
        priority: "High",
        techStack: ["FastAPI", "PostgreSQL", "Docker", "Pytest"],
        owner: "Alex Dev",
        createdAt: "2 days ago",
      };
    },
  });

  const project = projectData || {
    id: projectId,
    name: "Inventory Control API",
    description: "Asynchronous Python FastAPI service handling warehouse inventory counts, SKU tracking, and PostgreSQL indexing.",
    status: "Running",
    priority: "High",
    techStack: ["FastAPI", "PostgreSQL", "Docker", "Pytest"],
    owner: "Alex Dev",
    createdAt: "2 days ago",
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Layers },
    { id: "execution", label: "Live Execution", icon: Activity },
    { id: "tasks", label: "Tasks", icon: FolderKanban },
    { id: "requirements", label: "Requirements", icon: FileText },
    { id: "artifacts", label: "Artifacts", icon: FileCode2 },
    { id: "files", label: "Repository Tree", icon: Folder },
    { id: "workflow", label: "Workflow Diagram", icon: Workflow },
    { id: "logs", label: "Logs & Decisions", icon: Terminal },
    { id: "analytics", label: "Analytics & Health", icon: BarChart3 },
  ];

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

      {/* Main Mission Control Workspace */}
      <main
        className={`pt-20 pb-16 px-6 transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-start gap-8">
          
          {/* Main Command Column */}
          <div className="flex-1 min-w-0">
            
            {/* Project Header */}
            <ProjectHeader
              project={project}
              onStartExecution={() => {}}
              onPauseExecution={() => {}}
              onOpenWarRoom={() => {
                window.location.href = "/warroom";
              }}
            />

            {/* Mission Control Tab Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/[0.08] mb-8 text-xs font-semibold">
              {tabs.map((tb) => {
                const Icon = tb.icon;
                const active = activeTab === tb.id;
                return (
                  <button
                    key={tb.id}
                    onClick={() => setActiveTab(tb.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all shrink-0 ${
                      active
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-bold"
                        : "bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tb.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Views */}
            {activeTab === "overview" && (
              <>
                <OverviewCards />
                <Timeline />
                <AIEmployeePanel />
                <ExecutionPanel />
                <TaskBoard />
              </>
            )}

            {activeTab === "execution" && (
              <>
                <ExecutionPanel />
                <ExecutionLogs />
              </>
            )}

            {activeTab === "tasks" && <TaskBoard />}

            {activeTab === "requirements" && <RequirementViewer />}

            {activeTab === "artifacts" && <ArtifactGallery />}

            {activeTab === "files" && <FileExplorer />}

            {activeTab === "workflow" && <WorkflowDiagram />}

            {activeTab === "logs" && (
              <>
                <ExecutionLogs />
                <DecisionPanel />
              </>
            )}

            {activeTab === "analytics" && (
              <>
                <HealthCard />
                <Analytics />
              </>
            )}

          </div>

          {/* Right Sidebar */}
          <ProjectDetailSidebar
            onOpenWarRoom={() => {
              window.location.href = "/warroom";
            }}
          />

        </div>
      </main>

    </div>
  );
}

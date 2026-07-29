"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { SearchDialog } from "@/components/dashboard/SearchDialog";

import { ProjectHeader, ViewMode } from "@/components/projects/ProjectHeader";
import { ProjectMetrics } from "@/components/projects/ProjectMetrics";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectList } from "@/components/projects/ProjectList";
import { ProjectKanban } from "@/components/projects/ProjectKanban";
import { ProjectTimeline } from "@/components/projects/ProjectTimeline";
import { CreateProjectWizard } from "@/components/projects/CreateProjectWizard";
import { ProjectSidebar } from "@/components/projects/ProjectSidebar";
import { EmptyState } from "@/components/projects/EmptyState";
import { ProjectData } from "@/components/projects/ProjectCard";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export default function ProjectsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [createWizardOpen, setCreateWizardOpen] = useState(false);

  // View Mode & Filters
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [techFilter, setTechFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated");

  // Fallback / Initial Seed Projects
  const mockProjects: ProjectData[] = [
    {
      id: "1",
      name: "Inventory Control API",
      description: "Asynchronous Python FastAPI service handling warehouse inventory counts, SKU tracking, and PostgreSQL indexing.",
      priority: "High",
      status: "Running",
      currentPhase: "Stage 5: API Development",
      progress: 68,
      workflowStage: "Development",
      techStack: ["FastAPI", "PostgreSQL", "Docker", "Pytest"],
      assignedAgents: [
        { name: "Bob", avatar: "👨‍💻", role: "Product Manager" },
        { name: "Charlie", avatar: "👨‍🔬", role: "Software Architect" },
        { name: "Fiona", avatar: "👩‍💻", role: "Backend Engineer" },
        { name: "Ian", avatar: "🕵️‍♂️", role: "QA Engineer" },
      ],
      estCompletion: "Tomorrow, 4:00 PM",
      updatedAt: "10m ago",
      owner: "Alex Dev",
    },
    {
      id: "2",
      name: "Mobile Warehouse Portal",
      description: "Next.js client interface for tablet scanners, with offline caching and real-time WebSocket inventory feeds.",
      priority: "Critical",
      status: "Paused",
      currentPhase: "Stage 4: Architecture Gate Review",
      progress: 42,
      workflowStage: "Architecture",
      techStack: ["Next.js", "Tailwind UI", "WebSockets"],
      assignedAgents: [
        { name: "Charlie", avatar: "👨‍🔬", role: "Software Architect" },
        { name: "Diana", avatar: "👩‍🎨", role: "UI Designer" },
        { name: "Evan", avatar: "👨‍💻", role: "Frontend Engineer" },
        { name: "Jack", avatar: "🛡️", role: "Security Engineer" },
      ],
      estCompletion: "2 days left",
      updatedAt: "15m ago",
      owner: "Alex Dev",
    },
    {
      id: "3",
      name: "Security OAuth Microservice",
      description: "Dedicated auth token refresh microservice enforcing argon2id password hashing and JWT rotation.",
      priority: "Medium",
      status: "Running",
      currentPhase: "Stage 9: Security Audit",
      progress: 88,
      workflowStage: "Testing",
      techStack: ["FastAPI", "Docker", "Argon2"],
      assignedAgents: [
        { name: "Jack", avatar: "🛡️", role: "Security Engineer" },
        { name: "Fiona", avatar: "👩‍💻", role: "Backend Engineer" },
        { name: "Kate", avatar: "🚀", role: "DevOps Engineer" },
      ],
      estCompletion: "Today, 6:30 PM",
      updatedAt: "2m ago",
      owner: "Alex Dev",
    },
    {
      id: "4",
      name: "AI Knowledge Base RAG",
      description: "Vector database indexing service integrating OpenAI Responses API for context retrieval.",
      priority: "High",
      status: "Completed",
      currentPhase: "Stage 14: Completed",
      progress: 100,
      workflowStage: "Completed",
      techStack: ["Python", "OpenAI API", "PGVector"],
      assignedAgents: [
        { name: "Hope", avatar: "🤖", role: "AI Engineer" },
        { name: "Leo", avatar: "📝", role: "Documentation" },
      ],
      estCompletion: "Delivered",
      updatedAt: "1 day ago",
      owner: "Alex Dev",
    },
  ];

  // Fetch Projects from Backend API
  const { data: apiProjects, refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/projects/");
        if (Array.isArray(res.data) && res.data.length > 0) {
          return res.data.map((p: any, idx: number) => ({
            id: p.id || `${idx + 1}`,
            name: p.name || "Untitled Project",
            description: p.description || "No description provided.",
            priority: p.priority || "High",
            status: p.status || "Running",
            currentPhase: p.current_stage || "Stage 1: Planning",
            progress: p.progress || 25,
            workflowStage: p.workflow_stage || "Planning",
            techStack: p.tech_stack || ["FastAPI", "Next.js"],
            assignedAgents: [
              { name: "Bob", avatar: "👨‍💻", role: "Product Manager" },
              { name: "Fiona", avatar: "👩‍💻", role: "Backend Engineer" },
            ],
            estCompletion: "In progress",
            updatedAt: "Just now",
            owner: "Alex Dev",
          }));
        }
        return mockProjects;
      } catch (err) {
        return mockProjects;
      }
    },
    initialData: mockProjects,
  });

  const projectsList = apiProjects || mockProjects;

  // Filter & Search Logic
  const filteredProjects = projectsList.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      (p?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p?.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p?.techStack || []).some((t: string) => (t || "").toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || p.priority === priorityFilter;
    const matchesTech = techFilter === "all" || (p?.techStack || []).includes(techFilter);

    return matchesSearch && matchesStatus && matchesPriority && matchesTech;
  });

  const handleOpenProject = (id: string) => {
    // Navigates to project workspace
    window.location.href = `/dashboard`;
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
        onSuccess={() => refetch()}
      />

      {/* Main Workspace Area */}
      <main
        className={`pt-20 pb-16 px-6 transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-start gap-8">
          
          {/* Main Content Body */}
          <div className="flex-1 min-w-0">
            
            {/* Header with Title & View Toggles */}
            <ProjectHeader
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onOpenNewProject={() => setCreateWizardOpen(true)}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {/* Project Metrics KPIs */}
            <ProjectMetrics />

            {/* Project Filters & Search */}
            <ProjectFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={setPriorityFilter}
              techFilter={techFilter}
              onTechFilterChange={setTechFilter}
            />

            {/* View Mode Switching */}
            {filteredProjects.length === 0 ? (
              <EmptyState onOpenCreate={() => setCreateWizardOpen(true)} />
            ) : (
              <>
                {viewMode === "grid" && (
                  <ProjectGrid projects={filteredProjects} onOpenProject={handleOpenProject} />
                )}
                {viewMode === "list" && (
                  <ProjectList projects={filteredProjects} onOpenProject={handleOpenProject} />
                )}
                {viewMode === "kanban" && (
                  <ProjectKanban projects={filteredProjects} onOpenProject={handleOpenProject} />
                )}
                {viewMode === "timeline" && (
                  <ProjectTimeline projects={filteredProjects} onOpenProject={handleOpenProject} />
                )}
              </>
            )}

          </div>

          {/* Right Sidebar */}
          <ProjectSidebar />

        </div>
      </main>

    </div>
  );
}

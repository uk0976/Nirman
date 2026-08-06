"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { ProjectFilters, ViewMode, FilterTab } from "@/components/projects/ProjectFilters";
import { ProjectCard, ProjectData } from "@/components/projects/ProjectCard";
import { ProjectList } from "@/components/projects/ProjectList";
import { ProjectKanban } from "@/components/projects/ProjectKanban";
import { ProjectTimeline } from "@/components/projects/ProjectTimeline";
import { CreateProjectWizard } from "@/components/projects/CreateProjectWizard";

const INITIAL_PROJECTS: ProjectData[] = [
  {
    id: "proj-1",
    name: "Nirman SaaS Core Platform",
    slug: "nirman-saas-core",
    description: "Enterprise-grade AI software company platform operating across 20 SDLC phases.",
    phase: "Phase 6: PRD & SRS Specifications",
    progress: 30,
    status: "IN_PROGRESS",
    health: 98,
    updated: "10m ago",
    stack: ["Next.js 15", "FastAPI", "PostgreSQL", "Docker"],
    starred: true
  },
  {
    id: "proj-2",
    name: "Apex Algorithmic Trading Bot",
    slug: "apex-trading-bot",
    description: "High-frequency trade execution platform with real-time WebSocket telemetry.",
    phase: "Phase 18: Docker & Deployment",
    progress: 90,
    status: "COMPLETED",
    health: 100,
    updated: "2h ago",
    stack: ["Python", "Redis", "Grafana", "WebSockets"],
    starred: false
  },
  {
    id: "proj-3",
    name: "MedPulse Telehealth Analytics",
    slug: "medpulse-telehealth",
    description: "HIPAA compliant patient telemetry analytics SaaS with RAG clinical assistant.",
    phase: "Phase 12: AI Infrastructure",
    progress: 60,
    status: "IN_PROGRESS",
    health: 95,
    updated: "Yesterday",
    stack: ["React", "Tailwind", "LangChain", "FastAPI"],
    starred: true
  }
];

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("GRID");
  const [activeTab, setActiveTab] = useState<FilterTab>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [projects, setProjects] = useState<ProjectData[]>(INITIAL_PROJECTS);

  const handleToggleStar = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, starred: !p.starred } : p))
    );
  };

  const filteredProjects = projects.filter((p) => {
    if (activeTab === "STARRED" && !p.starred) return false;
    if (activeTab === "ARCHIVED" && p.status !== "ARCHIVED") return false;
    if (searchQuery.trim() !== "") {
      return (
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    return true;
  });

  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopNavbar />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          <ProjectFilters
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onCreateClick={() => setIsWizardOpen(true)}
          />

          {/* View Mode Switching Render */}
          {viewMode === "GRID" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProjects.map((proj) => (
                <ProjectCard key={proj.id} project={proj} onToggleStar={handleToggleStar} />
              ))}
            </div>
          )}

          {viewMode === "LIST" && <ProjectList projects={filteredProjects} />}

          {viewMode === "KANBAN" && <ProjectKanban projects={filteredProjects} />}

          {viewMode === "TIMELINE" && <ProjectTimeline projects={filteredProjects} />}
        </main>
      </div>

      <CreateProjectWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
    </div>
  );
}

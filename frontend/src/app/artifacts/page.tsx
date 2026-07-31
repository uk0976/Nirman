"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { SearchDialog } from "@/components/dashboard/SearchDialog";

import { Header, ViewMode } from "@/components/artifacts/Header";
import { KPICards } from "@/components/artifacts/KPICards";
import { ArtifactCard, ArtifactData } from "@/components/artifacts/ArtifactCard";
import { ArtifactGrid } from "@/components/artifacts/ArtifactGrid";
import { ArtifactList } from "@/components/artifacts/ArtifactList";
import { FolderExplorer } from "@/components/artifacts/FolderExplorer";
import { ArtifactPreviewModal } from "@/components/artifacts/ArtifactPreviewModal";
import { VersionHistoryModal } from "@/components/artifacts/VersionHistoryModal";
import { ArtifactFilters } from "@/components/artifacts/ArtifactFilters";
import { ArtifactSidebar } from "@/components/artifacts/ArtifactSidebar";
import { ShareModal } from "@/components/artifacts/ShareModal";
import { CreateProjectWizard } from "@/components/projects/CreateProjectWizard";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export default function ArtifactsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [createWizardOpen, setCreateWizardOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Modals state
  const [previewArtifact, setPreviewArtifact] = useState<ArtifactData | null>(null);
  const [versionArtifact, setVersionArtifact] = useState<ArtifactData | null>(null);
  const [shareArtifact, setShareArtifact] = useState<ArtifactData | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const mockArtifacts: ArtifactData[] = [
    {
      id: "1",
      name: "Architecture.md",
      project: "Inventory Control API",
      author: "Charlie",
      authorAvatar: "👨‍🔬",
      type: "Architecture Spec",
      version: "v2.1",
      size: "14.2 KB",
      updatedAt: "10m ago",
      tags: ["architecture", "fastapi", "ddd"],
      content: "# Architecture Blueprint\n\n- Backend: FastAPI Layered Routers\n- Database: PostgreSQL Async Pool\n- Auth: Argon2id + HttpOnly Cookies",
    },
    {
      id: "2",
      name: "Database.sql",
      project: "Inventory Control API",
      author: "George",
      authorAvatar: "👨‍🔧",
      type: "PostgreSQL DDL",
      version: "v1.2",
      size: "28.6 KB",
      updatedAt: "15m ago",
      tags: ["database", "sql", "indices"],
      content: "CREATE TABLE inventory_items (\n  id UUID PRIMARY KEY,\n  sku VARCHAR(64) UNIQUE NOT NULL,\n  quantity INT DEFAULT 0\n);",
    },
    {
      id: "3",
      name: "OpenAPI.yaml",
      project: "Inventory Control API",
      author: "Fiona",
      authorAvatar: "👩‍💻",
      type: "Swagger API Spec",
      version: "v1.4",
      size: "42.1 KB",
      updatedAt: "25m ago",
      tags: ["api", "openapi", "swagger"],
      content: "openapi: 3.0.0\ninfo:\n  title: Inventory Control API\n  version: 1.0.0",
    },
    {
      id: "4",
      name: "Dockerfile",
      project: "Inventory Control API",
      author: "Kate",
      authorAvatar: "🚀",
      type: "Docker Config",
      version: "v1.0",
      size: "4.8 KB",
      updatedAt: "45m ago",
      tags: ["devops", "docker", "staging"],
      content: "FROM python:3.11-slim\nWORKDIR /app\nCOPY . .\nRUN pip install -r requirements.txt",
    },
  ];

  // Fetch Real Artifacts from Backend Pipeline API
  const { data: apiArtifacts } = useQuery({
    queryKey: ["artifacts"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/pipeline/list");
        if (Array.isArray(res.data) && res.data.length > 0) {
          const list: ArtifactData[] = [];
          res.data.forEach((pipe: any) => {
            (pipe.stages || []).forEach((stg: any, i: number) => {
              if (stg.artifact_produced && stg.artifact_content) {
                list.push({
                  id: `${pipe.pipeline_id}-${i}`,
                  name: stg.artifact_produced,
                  project: `Project ${pipe.project_id || "Active"}`,
                  author: stg.assigned_agent || "AI Agent",
                  authorAvatar: "🤖",
                  type: `${stg.name || "Stage"} Artifact`,
                  version: "v1.0",
                  size: `${Math.round(stg.artifact_content.length / 100) / 10} KB`,
                  updatedAt: stg.completed_at ? new Date(stg.completed_at * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now",
                  tags: ["ai-generated", stg.name.toLowerCase()],
                  content: stg.artifact_content,
                });
              }
            });
          });
          if (list.length > 0) return list.reverse();
        }
      } catch (err) {
        // Fallback
      }
      return [];
    },
    refetchInterval: 1000,
    initialData: [],
  });

  const artifactList = apiArtifacts || [];

  const filteredArtifacts = artifactList.filter((art) => {
    const matchesSearch =
      !searchQuery ||
      (art?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art?.project || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art?.tags || []).some((t) => (t || "").toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = typeFilter === "all" || (art?.type || "").includes(typeFilter);

    return matchesSearch && matchesType;
  });

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

      {/* Preview Modal */}
      <ArtifactPreviewModal
        artifact={previewArtifact}
        onClose={() => setPreviewArtifact(null)}
      />

      {/* Version History Modal */}
      <VersionHistoryModal
        artifact={versionArtifact}
        onClose={() => setVersionArtifact(null)}
      />

      {/* Share Link Modal */}
      <ShareModal
        artifact={shareArtifact}
        onClose={() => setShareArtifact(null)}
      />

      {/* Main Workspace Area */}
      <main
        className={`pt-20 pb-16 px-6 transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-start gap-8">
          
          {/* Main Content Column */}
          <div className="flex-1 min-w-0">
            
            {/* Header with Title & View Toggles */}
            <Header
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onOpenGenerateModal={() => setCreateWizardOpen(true)}
            />

            {/* KPI Cards */}
            <KPICards />

            {/* Filters */}
            <ArtifactFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              typeFilter={typeFilter}
              onTypeChange={setTypeFilter}
            />

            {/* View Modes */}
            {viewMode === "grid" && (
              <ArtifactGrid
                artifacts={filteredArtifacts}
                onPreview={(art) => setPreviewArtifact(art)}
                onVersionHistory={(art) => setVersionArtifact(art)}
                onShare={(art) => setShareArtifact(art)}
                onOpenCreateWizard={() => setCreateWizardOpen(true)}
              />
            )}

            {viewMode === "list" && (
              <ArtifactList
                artifacts={filteredArtifacts}
                onPreview={(art) => setPreviewArtifact(art)}
                onVersionHistory={(art) => setVersionArtifact(art)}
                onShare={(art) => setShareArtifact(art)}
              />
            )}

            {viewMode === "folder" && (
              <FolderExplorer
                artifacts={filteredArtifacts}
                onPreview={(art) => setPreviewArtifact(art)}
              />
            )}

            {viewMode === "timeline" && (
              <ArtifactGrid
                artifacts={filteredArtifacts}
                onPreview={(art) => setPreviewArtifact(art)}
                onVersionHistory={(art) => setVersionArtifact(art)}
                onShare={(art) => setShareArtifact(art)}
              />
            )}

          </div>

          {/* Right Sidebar */}
          <ArtifactSidebar />

        </div>
      </main>

    </div>
  );
}

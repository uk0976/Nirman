"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { SearchDialog } from "@/components/dashboard/SearchDialog";

import { Header } from "@/components/agents/Header";
import { KPISection } from "@/components/agents/KPISection";
import { OrganizationChart } from "@/components/agents/OrganizationChart";
import { EmployeeGrid } from "@/components/agents/EmployeeGrid";
import { EmployeeCard, EmployeeData } from "@/components/agents/EmployeeCard";
import { EmployeeProfileDrawer } from "@/components/agents/EmployeeProfileDrawer";
import { PerformanceCharts } from "@/components/agents/PerformanceCharts";
import { SkillsSection } from "@/components/agents/SkillsSection";
import { CapabilitiesGrid } from "@/components/agents/CapabilitiesGrid";
import { MemorySummary } from "@/components/agents/MemorySummary";
import { EmployeeFilters } from "@/components/agents/EmployeeFilters";
import { EmployeeSidebar } from "@/components/agents/EmployeeSidebar";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export default function AIEmployeesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeView, setActiveView] = useState<"grid" | "org" | "analytics">("grid");
  const [selectedProfile, setSelectedProfile] = useState<EmployeeData | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const mockEmployees: EmployeeData[] = [
    { id: "1", name: "Alice", role: "CEO", dept: "Executive", status: "Reviewing", task: "Sprint 1 Deliverable Approval", project: "Inventory Control API", confidence: 96, workload: 40, avatar: "👩‍💼", model: "gpt-4o", responseTime: "1.1s", tasksCompleted: 142, successRate: 98.4 },
    { id: "2", name: "Bob", role: "Product Manager", dept: "Product", status: "Planning", task: "PRD Requirements Scope Sizing", project: "Mobile Warehouse Portal", confidence: 94, workload: 65, avatar: "👨‍💻", model: "gpt-4o", responseTime: "1.4s", tasksCompleted: 189, successRate: 97.2 },
    { id: "3", name: "Charlie", role: "Software Architect", dept: "Architecture", status: "Reviewing", task: "FastAPI Layered Blueprint", project: "Inventory Control API", confidence: 92, workload: 80, avatar: "👨‍🔬", model: "gpt-4o", responseTime: "1.8s", tasksCompleted: 210, successRate: 95.8 },
    { id: "4", name: "Diana", role: "UI/UX Designer", dept: "Design", status: "Idle", task: "Tailwind Token Palette Specs", project: "Mobile Warehouse Portal", confidence: 98, workload: 20, avatar: "👩‍🎨", model: "gpt-4o", responseTime: "0.9s", tasksCompleted: 94, successRate: 99.1 },
    { id: "5", name: "Evan", role: "Frontend Engineer", dept: "Frontend", status: "Coding", task: "Next.js Dashboard Components", project: "Mobile Warehouse Portal", confidence: 95, workload: 90, avatar: "👨‍💻", model: "gpt-4o-code", responseTime: "2.1s", tasksCompleted: 312, successRate: 96.5 },
    { id: "6", name: "Fiona", role: "Backend Engineer", dept: "Backend", status: "Coding", task: "SQLAlchemy Async Routers", project: "Inventory Control API", confidence: 93, workload: 85, avatar: "👩‍💻", model: "gpt-4o-code", responseTime: "2.4s", tasksCompleted: 420, successRate: 96.4 },
    { id: "7", name: "George", role: "Database Engineer", dept: "Database", status: "Coding", task: "PostgreSQL Composite Indexing", project: "Inventory Control API", confidence: 96, workload: 70, avatar: "👨‍🔧", model: "gpt-4o", responseTime: "1.3s", tasksCompleted: 165, successRate: 98.0 },
    { id: "8", name: "Hope", role: "AI Engineer", dept: "AI", status: "Planning", task: "Prompt Chain Optimization", project: "RAG Knowledge Engine", confidence: 91, workload: 50, avatar: "🤖", model: "gpt-4o", responseTime: "1.5s", tasksCompleted: 118, successRate: 94.8 },
    { id: "9", name: "Ian", role: "QA Engineer", dept: "Quality", status: "Testing", task: "Running Pytest Suite", project: "Inventory Control API", confidence: 97, workload: 75, avatar: "🕵️‍♂️", model: "gpt-4o-mini", responseTime: "3.1s", tasksCompleted: 530, successRate: 99.4 },
    { id: "10", name: "Jack", role: "Security Engineer", dept: "Security", status: "Reviewing", task: "OWASP Vulnerability Audit", project: "Security Microservice", confidence: 95, workload: 60, avatar: "🛡️", model: "gpt-4o", responseTime: "1.2s", tasksCompleted: 175, successRate: 97.9 },
    { id: "11", name: "Kate", role: "DevOps Engineer", dept: "DevOps", status: "Deploying", task: "Packaging Docker Containers", project: "Inventory Control API", confidence: 98, workload: 55, avatar: "🚀", model: "gpt-4o", responseTime: "1.0s", tasksCompleted: 240, successRate: 98.8 },
    { id: "12", name: "Leo", role: "Documentation", dept: "Docs", status: "Idle", task: "Swagger OpenAPI Specs", project: "Inventory Control API", confidence: 99, workload: 15, avatar: "📝", model: "gpt-4o-mini", responseTime: "0.8s", tasksCompleted: 310, successRate: 99.5 },
  ];

  // Fetch agents from backend API
  const { data: apiAgents } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/agents/");
        if (Array.isArray(res.data) && res.data.length > 0) {
          return res.data.map((a: any, i: number) => ({
            id: a.id || `${i + 1}`,
            name: a.name || mockEmployees[i % 12].name,
            role: a.role || mockEmployees[i % 12].role,
            dept: a.department || mockEmployees[i % 12].dept,
            status: a.status || mockEmployees[i % 12].status,
            task: a.current_task || mockEmployees[i % 12].task,
            project: a.current_project || mockEmployees[i % 12].project,
            confidence: a.confidence || 95,
            workload: a.workload || 60,
            avatar: mockEmployees[i % 12].avatar,
            model: a.model_used || "gpt-4o",
            responseTime: "1.2s",
            tasksCompleted: 150,
            successRate: 97.5,
          }));
        }
      } catch (err) {
        // Fallback
      }
      return mockEmployees;
    },
    initialData: mockEmployees,
  });

  const employeeList = apiAgents || mockEmployees;

  // Filtering
  const filteredEmployees = employeeList.filter((emp) => {
    const matchesSearch =
      !searchQuery ||
      (emp?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (emp?.role || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (emp?.dept || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (emp?.task || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = departmentFilter === "all" || emp.dept === departmentFilter;
    const matchesStatus = statusFilter === "all" || emp.status === statusFilter;

    return matchesSearch && matchesDept && matchesStatus;
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

      {/* Employee Profile Slide-out Drawer */}
      <EmployeeProfileDrawer
        employee={selectedProfile}
        onClose={() => setSelectedProfile(null)}
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
            
            {/* Header with Title & View Switcher */}
            <Header
              activeView={activeView}
              onViewChange={setActiveView}
              onOpenAddAgent={() => {}}
            />

            {/* Workforce KPIs */}
            <KPISection />

            {/* Filters & Search */}
            <EmployeeFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              departmentFilter={departmentFilter}
              onDepartmentChange={setDepartmentFilter}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
            />

            {/* Dynamic Views */}
            {activeView === "grid" && (
              <>
                <EmployeeGrid
                  employees={filteredEmployees}
                  onOpenProfile={(emp) => setSelectedProfile(emp)}
                />
                <SkillsSection />
                <CapabilitiesGrid />
                <MemorySummary />
              </>
            )}

            {activeView === "org" && (
              <>
                <OrganizationChart />
                <EmployeeGrid
                  employees={filteredEmployees}
                  onOpenProfile={(emp) => setSelectedProfile(emp)}
                />
              </>
            )}

            {activeView === "analytics" && (
              <>
                <PerformanceCharts />
                <EmployeeGrid
                  employees={filteredEmployees}
                  onOpenProfile={(emp) => setSelectedProfile(emp)}
                />
              </>
            )}

          </div>

          {/* Right Sidebar */}
          <EmployeeSidebar />

        </div>
      </main>

    </div>
  );
}

"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { RoadmapTimeline } from "@/components/pm/RoadmapTimeline";
import { MoSCoWMatrix } from "@/components/pm/MoSCoWMatrix";
import { EpicsBacklog } from "@/components/pm/EpicsBacklog";
import { Calendar, Sparkles, Layers, Check, ArrowRight, ShieldCheck } from "lucide-react";

export default function PMStudioPage() {
  const [activeTab, setActiveTab] = useState("roadmap");
  const [approved, setApproved] = useState(false);

  const pmData = {
    moscow: {
      must_have: [
        "Multi-Tenant Project Dashboard & Core Layout",
        "Autonomous 14-Agent DAG Task Engine",
        "JWT Auth, Google & GitHub OAuth2 SSO, 2FA TOTP",
        "Human Approval Gates for DB & Code Deployments"
      ],
      should_have: [
        "Cmd+K Universal Command Palette",
        "Real-Time Inter-Agent Pub/Sub Message Bus",
        "Live Execution Log Console"
      ],
      could_have: [
        "AI Voice Coding Assistant",
        "Custom Dark/Light Theme Builder"
      ],
      wont_have_current: [
        "Legacy Monolith Automatic Code Migrator",
        "Third-Party Jira Sync Plugin"
      ]
    },
    phases: [
      {
        phase: "Phase 1: Foundation & Authentication",
        duration: "Sprint 1 - 2",
        goals: "Core Next.js 15 App Shell, FastAPI Async Backend, JWT SSO Auth.",
        deliverables: ["Login/Register Pages", "Sidebar Navigation", "User Onboarding Wizard"],
        status: "COMPLETED"
      },
      {
        phase: "Phase 2: AI Workspace & Project Management",
        duration: "Sprint 3 - 4",
        goals: "3-Pane Command Center, 18-Tab Project Hub, Multi-View Dashboards.",
        deliverables: ["Workflow Canvas", "Kanban/Timeline Views", "File Explorer"],
        status: "IN_PROGRESS"
      },
      {
        phase: "Phase 3: Multi-Agent Infrastructure",
        duration: "Sprint 5 - 6",
        goals: "BaseAgent Framework, AgentRegistry, Pub/Sub Event Bus.",
        deliverables: ["Agent Status Roster", "Tool Matrix", "Observability Dashboard"],
        status: "READY"
      },
      {
        phase: "Phase 4: Production Rollout & Monitoring",
        duration: "Sprint 7 - 8",
        goals: "Docker Compose Stack, Nginx SSL Proxy, Prometheus Monitoring.",
        deliverables: ["Production Container Image", "SOC2 Compliance Specs"],
        status: "PLANNED"
      }
    ],
    epics: [
      { epic_id: "EPIC-001", name: "Authentication & Onboarding", story_count: 5, status: "COMPLETED" },
      { epic_id: "EPIC-002", name: "Core Workspace & Navigation", story_count: 8, status: "COMPLETED" },
      { epic_id: "EPIC-003", name: "Project Management System", story_count: 12, status: "IN_PROGRESS" },
      { epic_id: "EPIC-004", name: "AI Workspace Command Center", story_count: 10, status: "IN_PROGRESS" },
      { epic_id: "EPIC-005", name: "Multi-Agent Framework Core", story_count: 10, status: "READY" }
    ],
    sprintPlan: {
      sprint_number: 1,
      sprint_goal: "Establish Core App Shell, Auth Suite, and Base Dashboard.",
      capacity_points: 34,
      stories_assigned: ["US-001 (5 pts)", "US-002 (3 pts)", "US-003 (8 pts)"],
      definition_of_done: "Code merged to main, zero lints, 100% Next.js build pass."
    }
  };

  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopNavbar />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📋</span>
                <h1 className="text-2xl font-bold text-white tracking-tight">Product Manager Strategy & Roadmap Studio</h1>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  Sarah Lin (Senior PM)
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Feature Prioritization (MoSCoW/RICE), 4-Phase Product Roadmap, Epics Backlog, and Release Planning.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 gap-2 font-mono text-xs">
            {[
              { id: "roadmap", label: "4-Phase Roadmap", icon: Calendar },
              { id: "moscow", label: "MoSCoW Matrix", icon: Sparkles },
              { id: "epics", label: "Epics & Sprint Plan", icon: Layers }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 border ${
                    activeTab === tab.id
                      ? "bg-indigo-600/20 border-indigo-500 text-white font-bold"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 text-indigo-400" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active View Render */}
          {activeTab === "roadmap" && <RoadmapTimeline phases={pmData.phases} />}
          {activeTab === "moscow" && <MoSCoWMatrix data={pmData.moscow} />}
          {activeTab === "epics" && <EpicsBacklog epics={pmData.epics} sprintPlan={pmData.sprintPlan} />}

          {/* Human Approval Action Bar */}
          <div className="p-5 border-t border-white/10 bg-[#0B0D14] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="font-bold text-white">Product Strategy Approval Gate</span>
              <p className="text-[11px] text-gray-400 font-sans">
                Approving this strategy hands off execution to System Architect (Elena Rostova) for Clean Architecture topology design.
              </p>
            </div>

            {approved ? (
              <div className="px-6 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-center">
                ✓ Product Roadmap Approved! Handoff sent to System Architect Elena Rostova...
              </div>
            ) : (
              <button
                onClick={() => setApproved(true)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-glow transition flex items-center justify-center gap-2 shrink-0"
              >
                <Check className="w-4 h-4" />
                <span>Approve Strategy & Handoff to Architect</span>
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

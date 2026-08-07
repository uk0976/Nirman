"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { FRDTable } from "@/components/ba/FRDTable";
import { UserStoriesList } from "@/components/ba/UserStoriesList";
import { TraceabilityMatrix } from "@/components/ba/TraceabilityMatrix";
import { FileCode2, Check, ArrowRight, ShieldCheck, Sparkles, Layers, FileText } from "lucide-react";

export default function BAStudioPage() {
  const [activeTab, setActiveTab] = useState("frd");
  const [approved, setApproved] = useState(false);

  const reqData = {
    functional: [
      {
        req_id: "FR-001",
        title: "Multi-Tenant Workspace & Project Management",
        description: "System shall allow organizations to create and manage software projects.",
        priority: "CRITICAL",
        business_value: "High",
        acceptance_criteria: "User can create, edit, list, and archive projects with < 100ms latency.",
        status: "APPROVED"
      },
      {
        req_id: "FR-002",
        title: "Autonomous AI Agent Task Orchestration",
        description: "System shall orchestrate 14 specialized AI agents across 20 SDLC phases.",
        priority: "CRITICAL",
        business_value: "High",
        acceptance_criteria: "Agents execute DAG nodes and pause on human approval gates.",
        status: "APPROVED"
      },
      {
        req_id: "FR-003",
        title: "JWT Authentication & Social SSO",
        description: "System shall support email/password auth, Google & GitHub OAuth2 SSO, and TOTP 2FA.",
        priority: "HIGH",
        business_value: "High",
        acceptance_criteria: "JWT access token issued upon verification with 15m expiration.",
        status: "APPROVED"
      }
    ],
    nfr: [
      { category: "Performance", metric: "API response latency < 100ms for 95th percentile requests." },
      { category: "Security", metric: "OWASP Top 10 compliance, TLS 1.3 encryption, bcrypt password hashing." },
      { category: "Scalability", metric: "Support 100,000 active concurrent sessions via Redis state cache." },
      { category: "Availability", metric: "99.9% monthly uptime SLA." }
    ],
    stories: [
      {
        story_id: "US-001",
        user_role: "Lead Architect",
        goal: "initialize a new software project and assign an AI agent roster",
        benefit: "the platform can automatically execute SDLC phase 1 through 20",
        story_points: 5,
        acceptance_criteria: "Project created with slug, tech stack options, and active agent roster."
      },
      {
        story_id: "US-002",
        user_role: "Security Auditor",
        goal: "review human approval requests before 3NF database schema migration",
        benefit: "no breaking database changes occur without human verification",
        story_points: 3,
        acceptance_criteria: "Approval modal displays diff, accepts feedback, and resumes pipeline."
      }
    ],
    matrix: [
      { business_goal: "10x Faster SDLC", func_req: "FR-002", user_story: "US-001", use_case: "UC-001", test_case: "TC-001" }
    ]
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
                <span className="text-2xl">📊</span>
                <h1 className="text-2xl font-bold text-white tracking-tight">Business Analyst Requirements Studio</h1>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  Marcus Brody (Senior BA)
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                BRD, FRD, NFR, User Stories, Use Cases, and Requirement Traceability Matrix Engineering.
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-white/10 gap-2 font-mono text-xs">
            {[
              { id: "frd", label: "Functional Requirements (FRD)", icon: FileCode2 },
              { id: "stories", label: "Agile User Stories", icon: FileText },
              { id: "matrix", label: "Traceability Matrix (RTM)", icon: Layers }
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
          {activeTab === "frd" && <FRDTable requirements={reqData.functional} />}
          {activeTab === "stories" && <UserStoriesList stories={reqData.stories} />}
          {activeTab === "matrix" && <TraceabilityMatrix matrix={reqData.matrix} />}

          {/* Human Approval Action Bar */}
          <div className="p-5 border-t border-white/10 bg-[#0B0D14] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="font-bold text-white">Requirements Approval Gate</span>
              <p className="text-[11px] text-gray-400 font-sans">
                Approving this requirements package hands off execution to Product Manager (Sarah Lin) for PRD synthesis.
              </p>
            </div>

            {approved ? (
              <div className="px-6 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-center">
                ✓ Requirements Approved! Handoff sent to Product Manager Sarah Lin...
              </div>
            ) : (
              <button
                onClick={() => setApproved(true)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-glow transition flex items-center justify-center gap-2 shrink-0"
              >
                <Check className="w-4 h-4" />
                <span>Approve Requirements & Handoff to PM</span>
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

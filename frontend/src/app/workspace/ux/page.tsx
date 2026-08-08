"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { DesignTokensViewer } from "@/components/ux/DesignTokensViewer";
import { UserJourneyMap } from "@/components/ux/UserJourneyMap";
import { AIComponentSpecs } from "@/components/ux/AIComponentSpecs";
import { Palette, Compass, Sparkles, Check, ArrowRight, ShieldCheck } from "lucide-react";

export default function UXStudioPage() {
  const [activeTab, setActiveTab] = useState("tokens");
  const [approved, setApproved] = useState(false);

  const uxData = {
    tokens: {
      colors: {
        background: "#07090E",
        surface: "#0B0D14",
        card: "#151824",
        primary: "#4F46E5",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        text_primary: "#FFFFFF"
      },
      typography: {
        font_sans: "Inter, system-ui, sans-serif",
        font_mono: "JetBrains Mono, monospace"
      },
      spacing: { xs: "4px", sm: "8px", md: "16px", lg: "24px" }
    },
    journeys: [
      {
        journey: "New User Onboarding",
        flow: ["Landing Page", "Sign Up", "Verify Email", "4-Step Onboarding Wizard", "Dashboard"]
      },
      {
        journey: "Project Initiation",
        flow: ["Dashboard", "New Project Wizard", "CEO Discovery Workshop", "Strategic Plan Approval"]
      },
      {
        journey: "AI Workflow Execution",
        flow: ["User Directive", "Multi-Agent Handoff", "Artifact Preview", "Human Approval Gate", "Phase Completion"]
      }
    ],
    ai_specs: [
      { component: "Agent Card", spec: "Displays avatar, role badge, state indicator (Executing, Thinking, Waiting), token usage, and cost meter." },
      { component: "Workflow Node Canvas", spec: "Interactive 10-stage SDLC node graph with completed, active, and queued status colors." },
      { component: "Conversation Timeline", spec: "Timestamped collaborative stream distinguishing human directives vs AI decisions." },
      { component: "Human Approval Request Card", spec: "Amber-accented modal displaying artifact diff, feedback input, and Approve/Reject controls." }
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
                <span className="text-2xl">🎨</span>
                <h1 className="text-2xl font-bold text-white tracking-tight">UI/UX Product Design System Studio</h1>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  Sophia Martinez (Principal Designer)
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Product Design System (DSD v1.0), Design Tokens, User Journey Maps, and AI Component UX Specifications.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 gap-2 font-mono text-xs">
            {[
              { id: "tokens", label: "Design Tokens & Swatches", icon: Palette },
              { id: "journeys", label: "User Journey Maps", icon: Compass },
              { id: "specs", label: "AI Component Specifications", icon: Sparkles }
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
          {activeTab === "tokens" && <DesignTokensViewer tokens={uxData.tokens} />}
          {activeTab === "journeys" && <UserJourneyMap journeys={uxData.journeys} />}
          {activeTab === "specs" && <AIComponentSpecs specs={uxData.ai_specs} />}

          {/* Human Approval Action Bar */}
          <div className="p-5 border-t border-white/10 bg-[#0B0D14] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="font-bold text-white">Product Design Approval Gate</span>
              <p className="text-[11px] text-gray-400 font-sans">
                Approving this design system hands off execution to Frontend Engineer Agent (Lucas Meyer) for Next.js 15 component implementation.
              </p>
            </div>

            {approved ? (
              <div className="px-6 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-center">
                ✓ Product Design System Approved! Handoff sent to Frontend Engineer Lucas Meyer...
              </div>
            ) : (
              <button
                onClick={() => setApproved(true)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-glow transition flex items-center justify-center gap-2 shrink-0"
              >
                <Check className="w-4 h-4" />
                <span>Approve Design & Handoff to Frontend Engineer</span>
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

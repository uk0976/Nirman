"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { DiscoveryWorkshop } from "@/components/ceo/DiscoveryWorkshop";
import { StrategicPlanViewer } from "@/components/ceo/StrategicPlanViewer";
import { AgentDelegationMatrix } from "@/components/ceo/AgentDelegationMatrix";
import { Sparkles, Bot, ArrowRight, ShieldCheck } from "lucide-react";

export default function CEOExecutiveStudioPage() {
  const [planData, setPlanData] = useState<any | null>({
    projectName: "Nirman SaaS Core Platform",
    ideaDescription: "Enterprise-grade AI software company platform operating across 20 SDLC phases."
  });
  const [planApproved, setPlanApproved] = useState(false);

  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopNavbar />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">👔</span>
                <h1 className="text-2xl font-bold text-white tracking-tight">CEO Executive Strategy Studio</h1>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  Evelyn Vance (CEO)
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Project Initiation, Business Vision, Scope Definition, and Downstream Agent Delegation.
              </p>
            </div>
          </div>

          {/* Discovery Workshop Form */}
          <DiscoveryWorkshop onSynthesizePlan={(data) => setPlanData(data)} />

          {/* Generated Strategic Plan Viewer */}
          {planData && (
            <StrategicPlanViewer planData={planData} onApprovePlan={() => setPlanApproved(true)} />
          )}

          {/* Downstream Agent Delegation Matrix */}
          <AgentDelegationMatrix />
        </main>
      </div>
    </div>
  );
}

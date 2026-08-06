import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { WelcomeHeader } from "@/components/dashboard/widgets/WelcomeHeader";
import { MetricCardGrid } from "@/components/dashboard/widgets/MetricCardGrid";
import { LiveAICompanyGrid } from "@/components/dashboard/widgets/LiveAICompanyGrid";
import { RunningProjects } from "@/components/dashboard/widgets/RunningProjects";
import { Activity } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      {/* Collapsible Sidebar with Nested Submenus */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar with Cmd+K Command Palette, Search & Notifications */}
        <TopNavbar />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          {/* Welcome Header */}
          <WelcomeHeader />

          {/* Metric Cards Grid */}
          <MetricCardGrid />

          {/* AI Company Roster Grid */}
          <LiveAICompanyGrid />

          {/* Projects & Activity Timeline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RunningProjects />
            </div>

            {/* Live Activity Stream */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold text-white tracking-tight">Live SDLC Activity Feed</h2>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { agent: "Evelyn Vance (CEO)", action: "Approved PRD Specification Document v1.0", time: "2m ago" },
                  { agent: "Sarah Lin (PM)", action: "Finalized 45 User Stories for Auth & Billing", time: "5m ago" },
                  { agent: "David Chen (DB Architect)", action: "Generated 3NF Schema & Alembic Migration script", time: "12m ago" },
                  { agent: "Kaito Tanaka (DevOps)", action: "Synthesized Docker Compose & Nginx Proxy", time: "25m ago" }
                ].map((act, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#151824] border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-indigo-300 font-semibold">{act.agent}</span>
                      <span className="text-gray-500 text-[10px]">{act.time}</span>
                    </div>
                    <p className="text-gray-300 text-[11px] leading-tight font-sans">{act.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { LiveMessageBus } from "@/components/agents/LiveMessageBus";
import { ToolMatrix } from "@/components/agents/ToolMatrix";
import { LifecycleStateVisualizer } from "@/components/agents/LifecycleStateVisualizer";
import { Cpu, Zap, DollarSign, Activity } from "lucide-react";

export default function AgentFrameworkPage() {
  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopNavbar />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">AI Multi-Agent Infrastructure</h1>
              <p className="text-xs text-gray-400 mt-1">
                Centralized agent registry, pub-sub event bus, permissioned tools, and observability metrics.
              </p>
            </div>

            <span className="px-3 py-1 rounded text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
              14/14 Agents Operational
            </span>
          </div>

          {/* Observability Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1">
              <span className="text-gray-400 text-[10px]">TOTAL PROMPT TOKENS</span>
              <p className="text-xl font-bold text-white">1,836,600</p>
            </div>
            <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1">
              <span className="text-gray-400 text-[10px]">TOTAL COMPLETION TOKENS</span>
              <p className="text-xl font-bold text-white">420,500</p>
            </div>
            <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1">
              <span className="text-gray-400 text-[10px]">ESTIMATED LLM COST</span>
              <p className="text-xl font-bold text-emerald-400">$3.59 USD</p>
            </div>
            <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1">
              <span className="text-gray-400 text-[10px]">AGENT EXECUTION ACCURACY</span>
              <p className="text-xl font-bold text-indigo-400">100.0%</p>
            </div>
          </div>

          {/* Lifecycle State Machine */}
          <LifecycleStateVisualizer />

          {/* Grid: Message Bus & Tool Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LiveMessageBus />
            <ToolMatrix />
          </div>
        </main>
      </div>
    </div>
  );
}

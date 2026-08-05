import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { BarChart3, TrendingUp, Cpu, Zap, CheckCircle2 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Navbar />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          <div className="border-b border-white/10 pb-5">
            <h1 className="text-2xl font-bold text-white tracking-tight">Platform Execution Analytics</h1>
            <p className="text-xs text-gray-400 mt-1">Multi-agent execution speed, token utilization, and SDLC phase metrics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-2">
              <span className="text-xs text-gray-400 font-mono">TOTAL TOKEN CONSUMPTION</span>
              <p className="text-3xl font-bold text-white tracking-tight">1.24M Tokens</p>
              <p className="text-[11px] text-emerald-400 font-mono">LiteLLM Cost Optimized</p>
            </div>
            <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-2">
              <span className="text-xs text-gray-400 font-mono">AVERAGE SDLC EXECUTION SPEED</span>
              <p className="text-3xl font-bold text-white tracking-tight">4.2 Minutes</p>
              <p className="text-[11px] text-indigo-400 font-mono">Phase 1 to Phase 20</p>
            </div>
            <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-2">
              <span className="text-xs text-gray-400 font-mono">AGENT ACCURACY RATE</span>
              <p className="text-3xl font-bold text-emerald-400 tracking-tight">99.6%</p>
              <p className="text-[11px] text-gray-400 font-mono">Zero Critical Hallucinations</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { CreditCard, Check, Sparkles, ShieldCheck } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopNavbar />

        <main className="p-6 max-w-4xl mx-auto w-full space-y-6">
          <div className="border-b border-white/10 pb-5">
            <h1 className="text-2xl font-bold text-white tracking-tight">Billing & Organization Subscription</h1>
            <p className="text-xs text-gray-400 mt-1">Manage platform plan, invoices, and payment methods.</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-indigo-400">CURRENT PLAN</span>
                <h2 className="text-xl font-bold text-white">Pro Software Team Plan</h2>
              </div>
              <span className="px-3 py-1 rounded text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                Active · $119/mo (Annual)
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Unlimited Active SDLC Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>14 Specialized AI Agent Roles Operational</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>FastAPI & Next.js Source Code Export</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

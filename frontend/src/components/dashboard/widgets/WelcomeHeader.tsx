import Link from "next/link";
import { Sparkles, ArrowRight, Play, Terminal, Plus } from "lucide-react";

export function WelcomeHeader() {
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-48 bg-indigo-600/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="space-y-2 max-w-xl z-10">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold animate-pulse">
            14/14 AI Employees Active
          </span>
          <span className="text-xs text-gray-400 font-mono">· Acme Labs Workspace</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Welcome back, <span className="glow-text">Umer Khan</span> 👋
        </h1>

        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          Your autonomous software engineering platform has 4 active projects in progress across 20 SDLC phases.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 z-10">
        <Link
          href="/projects/proj-1"
          className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-glow transition flex items-center gap-2"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Continue 'Nirman SaaS Core'</span>
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 relative">
      <div className="glass-panel p-12 sm:p-16 rounded-3xl border border-indigo-500/40 shadow-2xl relative overflow-hidden text-center flex flex-col items-center">
        {/* Glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/25 blur-[140px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Ready to Deploy Your Autonomous AI Engineering Organization?
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl leading-tight">
          Transform Your Ideas Into <span className="glow-text">Production Software Today</span>
        </h2>

        <p className="mt-4 text-gray-300 text-sm max-w-xl leading-relaxed">
          Join thousands of founders and software architects building robust, scalable applications with Nirman's 14 specialized AI agents.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-glow transition flex items-center gap-2"
          >
            <span>Launch AI Company Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

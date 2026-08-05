import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Zap,
  Terminal,
  CheckCircle2,
  Cpu,
  GitBranch,
  Bot,
  Database,
  Code2
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-gray-100 flex flex-col font-sans">
      {/* Top Banner */}
      <header className="border-b border-white/10 bg-[#0B0D14]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 p-[1px] flex items-center justify-center shadow-glow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">NIRMAN</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#sdlc" className="hover:text-white transition">20 SDLC Phases</a>
            <a href="#agents" className="hover:text-white transition">AI Employees</a>
            <a href="#enterprise" className="hover:text-white transition">Enterprise</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-xs text-gray-300 hover:text-white font-medium transition">
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-4 py-2 rounded-lg shadow-glow transition flex items-center gap-2"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto text-center flex flex-col items-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Nirman 1.0 — Production-Grade AI Software Company Platform
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl leading-[1.15] text-white">
          Transform Your Idea Into a <span className="glow-text">Production Software Product</span>
        </h1>

        <p className="mt-6 text-lg text-gray-400 max-w-2xl leading-relaxed">
          Nirman simulates an entire software engineering organization. 14 specialized AI agents collaborate across all 20 SDLC phases to architect, design, build, test, and deploy enterprise applications.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-glow transition flex items-center gap-2"
          >
            <span>Open AI Company Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#sdlc"
            className="bg-[#151824] hover:bg-white/10 border border-white/10 text-gray-300 font-semibold text-sm px-6 py-3 rounded-xl transition"
          >
            Explore SDLC Engine
          </a>
        </div>

        {/* Hero Interactive Preview Card */}
        <div className="mt-16 w-full max-w-5xl rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-2xl p-6 text-left">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs font-mono text-gray-400">nirman-warroom-console // project-sdlc-live</span>
            </div>
            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
              14/14 AGENTS COLLABORATING
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-4 rounded-xl bg-[#0D0F17] border border-white/5 space-y-2">
              <div className="text-gray-400 font-bold uppercase text-[10px] flex items-center justify-between">
                <span>Phase 1-5: Business & PRD</span>
                <span className="text-emerald-400">100%</span>
              </div>
              <p className="text-gray-200">👔 CEO & PM generated complete PRD and SRS specifications.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0D0F17] border border-white/5 space-y-2">
              <div className="text-gray-400 font-bold uppercase text-[10px] flex items-center justify-between">
                <span>Phase 6-10: System Architecture</span>
                <span className="text-indigo-400">95%</span>
              </div>
              <p className="text-gray-200">📐 Clean Architecture UML & 3NF ER schema finalized.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0D0F17] border border-white/5 space-y-2">
              <div className="text-gray-400 font-bold uppercase text-[10px] flex items-center justify-between">
                <span>Phase 11-20: Code & DevOps</span>
                <span className="text-indigo-300">IN PROGRESS</span>
              </div>
              <p className="text-gray-200">🐳 FastAPI + Next.js + PyTest suites synthesized.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 20 SDLC Phases Section */}
      <section id="sdlc" className="py-20 border-t border-white/10 bg-[#0B0D14]/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white tracking-tight">The 20-Phase SDLC Pipeline</h2>
            <p className="mt-3 text-sm text-gray-400">
              Nirman skips zero steps. Every project undergoes full enterprise engineering from discovery to monitoring.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 text-xs font-mono">
            {[
              "1. Product Discovery", "2. Requirements", "3. Product Vision", "4. Competitor Analysis",
              "5. User Personas", "6. PRD & SRS Specs", "7. System Architecture", "8. Database 3NF",
              "9. API Specs", "10. Core Setup", "11. JWT Auth & RBAC", "12. AI Infrastructure",
              "13. AI Agents Dev", "14. Agent Unit Tests", "15. Multi-Agent Engine", "16. Integration Tests",
              "17. Performance Audit", "18. Docker & Deploy", "19. Prometheus Metrics", "20. Live Docs"
            ].map((phase, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#151824] border border-white/5 hover:border-indigo-500/40 transition flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate text-gray-300">{phase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 bg-[#07090E] mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2026 Nirman AI Platform. Production-Grade Autonomous Software Company.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            <Link href="/warroom" className="hover:text-gray-300">AI War Room</Link>
            <Link href="/agents" className="hover:text-gray-300">Agents</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

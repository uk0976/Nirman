import { Sparkles, Bot, CheckCircle2, ShieldCheck, Workflow, Cpu } from "lucide-react";

export function SolutionSection() {
  return (
    <section className="py-24 border-t border-white/10 bg-[#0B0D14]/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column Text */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            The Nirman Paradigm
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            An Autonomous <span className="glow-emerald-text">AI Software Company</span> In One Platform
          </h2>

          <p className="text-gray-300 text-sm leading-relaxed">
            Instead of acting as a simple code completion assistant, Nirman deploys 14 specialized AI roles that collaborate like a real engineering organization.
          </p>

          <div className="space-y-3 font-mono text-xs text-gray-300">
            {[
              "Complete SDLC Coverage: 20 phases from discovery to deployment.",
              "Clean Architecture Specs: SOLID principles, 3NF schema, REST APIs.",
              "Deterministic Quality: Automated PyTest suites & OWASP security audits.",
              "Enterprise Ready: Containerized Docker Compose & Grafana telemetry."
            ].map((point, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-[#151824] border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column Visual Card */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10 relative space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              <span className="font-bold text-sm text-white font-mono">Autonomous Company Graph</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded border border-emerald-500/30">
              100% Deterministic Engine
            </span>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-[#0D0F17] border border-indigo-500/30 space-y-1">
              <span className="text-indigo-400 font-bold">👔 CEO & Product Manager</span>
              <p className="text-gray-300">Synthesizes PRD & SRS specification contracts.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0D0F17] border border-indigo-500/30 space-y-1">
              <span className="text-emerald-400 font-bold">📐 System & DB Architect</span>
              <p className="text-gray-300">Designs Clean Architecture UML & 3NF database schema.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0D0F17] border border-indigo-500/30 space-y-1">
              <span className="text-purple-400 font-bold">⚙️ Backend & QA Engineers</span>
              <p className="text-gray-300">Writes FastAPI services & PyTest async test suites.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

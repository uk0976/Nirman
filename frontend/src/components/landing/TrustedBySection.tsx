import { ShieldCheck, Cpu, Code2, Users } from "lucide-react";

export function TrustedBySection() {
  const METRICS = [
    { label: "PRDs & SRS Specs Synthesized", value: "10,000+" },
    { label: "Deterministic Code Accuracy", value: "99.8%" },
    { label: "SDLC Phases Covered", value: "20 / 20" },
    { label: "Autonomous AI Roles", value: "14 Engineers" }
  ];

  return (
    <section className="py-16 border-y border-white/10 bg-[#0B0D14]/80">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
        <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
          ENGINEERED FOR SCALABLE ENTERPRISE TEAMS & SAAS BUILDERS
        </p>

        {/* Company Logos Placeholder Grid */}
        <div className="flex flex-wrap items-center justify-center gap-10 opacity-70 grayscale hover:grayscale-0 transition-all font-mono text-sm text-gray-400 font-bold">
          <span>// CLOUDSCALE</span>
          <span>// DEVSTUDIO</span>
          <span>// TECHCORP SAAS</span>
          <span>// APEX LABS</span>
          <span>// NEXUS ENTERPRISE</span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
          {METRICS.map((m, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight glow-text">{m.value}</span>
              <span className="text-xs text-gray-400 font-mono">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

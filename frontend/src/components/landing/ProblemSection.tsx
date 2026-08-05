import { AlertTriangle, Clock, Layers, Bug, FileSpreadsheet, Lock } from "lucide-react";

export function ProblemSection() {
  const BOTTLENECK_CARDS = [
    {
      title: "Fragmented Toolchains",
      desc: "Engineering teams waste 40% of their bandwidth jumping between Jira, Figma, GitHub, Postman, and AWS docs.",
      icon: Layers,
      color: "text-amber-400"
    },
    {
      title: "Context Switching & Slow Spec Writing",
      desc: "Writing PRDs, SRS specs, and UML diagrams manually takes weeks before a single line of backend code is written.",
      icon: Clock,
      color: "text-red-400"
    },
    {
      title: "Architectural & DB Schema Drift",
      desc: "Unstructured AI code generators produce messy single-file prototypes without proper 3NF schema normalization.",
      icon: FileSpreadsheet,
      color: "text-purple-400"
    },
    {
      title: "Security & Quality Gaps",
      desc: "Code generated without strict OWASP reviews leads to auth bypass vulnerabilities, missing PyTest suites, and high technical debt.",
      icon: Bug,
      color: "text-rose-400"
    }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-mono">
          <AlertTriangle className="w-3.5 h-3.5" />
          The Problem With Traditional Software Engineering
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Software Development is Broken By Manual Overhead
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Building enterprise software shouldn't require weeks of tedious specification drafting, disconnected tools, and fragile code generation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {BOTTLENECK_CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10 glass-panel-hover flex flex-col justify-between space-y-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 w-fit">
                <Icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white tracking-tight">{card.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{card.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

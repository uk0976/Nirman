import { Sparkles, FileText, Layers, Database, Code2, ShieldCheck, Terminal, Cpu } from "lucide-react";

export function FeatureGrid() {
  const FEATURES = [
    { title: "AI Project Planning", desc: "Automated PRD & SRS synthesis with 40+ user stories & competitor analysis.", icon: FileText, color: "text-indigo-400" },
    { title: "Clean System Architecture", desc: "Modular Monolith design, SOLID principles, and UML sequence diagrams.", icon: Layers, color: "text-emerald-400" },
    { title: "3NF Database Design", desc: "PostgreSQL schema normalization, pgvector embeddings, and Alembic migrations.", icon: Database, color: "text-purple-400" },
    { title: "Full-Stack Code Generation", desc: "Production-ready FastAPI backend & Next.js 15 App Router frontend.", icon: Code2, color: "text-amber-400" },
    { title: "Automated QA & Testing", desc: "100% PyTest async unit suites and HTTPX integration test generation.", icon: ShieldCheck, color: "text-rose-400" },
    { title: "DevOps & Monitoring Stack", desc: "Multi-stage Docker Compose, Nginx proxy, Prometheus & Grafana metrics.", icon: Terminal, color: "text-cyan-400" }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Enterprise Platform Capabilities
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Everything Required For Software Delivery
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Nirman automates the entire software engineering stack without cutting corners or skipping phases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="glass-panel p-7 rounded-2xl border border-white/10 glass-panel-hover flex flex-col justify-between space-y-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 w-fit">
                <Icon className={`w-6 h-6 ${f.color}`} />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white tracking-tight">{f.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

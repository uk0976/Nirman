import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { Bot, CheckCircle2, Cpu, Sparkles, BrainCircuit, ShieldCheck } from "lucide-react";

const AGENTS_LIST = [
  { role: "CEO Agent", name: "Evelyn Vance", avatar: "👔", desc: "Executive vision, ROI alignment, resource strategy & project sign-off.", rating: "99.8%", status: "Active", skills: ["Vision", "ROI Analysis", "Executive Approval"] },
  { role: "Business Analyst", name: "Marcus Brody", avatar: "📊", desc: "Market research, competitor analysis, functional user personas.", rating: "99.4%", status: "Active", skills: ["Market Discovery", "Personas", "Competitor Matrix"] },
  { role: "Product Manager", name: "Sarah Lin", avatar: "📋", desc: "PRD synthesis, SRS documentation, feature prioritization & roadmap.", rating: "99.6%", status: "Active", skills: ["PRD Synthesis", "SRS Specs", "Sprint Planning"] },
  { role: "Solution Architect", name: "Vikram Patel", avatar: "🏗️", desc: "High-level topology, non-functional requirements & ADR creation.", rating: "99.5%", status: "Active", skills: ["Topology", "ADR Specs", "NFR Auditing"] },
  { role: "System Architect", name: "Elena Rostova", avatar: "📐", desc: "Clean Architecture modular boundaries & UML sequence diagrams.", rating: "99.7%", status: "Active", skills: ["Clean Architecture", "UML Specs", "Domain Design"] },
  { role: "Database Architect", name: "David Chen", avatar: "🗄️", desc: "3NF normalized schema design, ER graphs, pgvector & migrations.", rating: "99.9%", status: "Active", skills: ["3NF Schema", "ER Graphs", "Alembic Migrations"] },
  { role: "UI/UX Designer", name: "Chloe Dubois", avatar: "🎨", desc: "Design system definition, Tailwind tokens & glassmorphic layouts.", rating: "99.3%", status: "Active", skills: ["Design Systems", "Component Tokens", "WCAG Specs"] },
  { role: "Frontend Engineer", name: "Lucas Meyer", avatar: "⚛️", desc: "Next.js App Router, React 19, TypeScript & state machines.", rating: "99.6%", status: "Active", skills: ["Next.js App Router", "React 19", "Zod Validation"] },
  { role: "Backend Engineer", name: "Aria Takahashi", avatar: "⚙️", desc: "FastAPI endpoints, async SQLAlchemy ORM & service domain logic.", rating: "99.8%", status: "Active", skills: ["FastAPI Services", "Async SQLAlchemy", "RESTful Architecture"] },
  { role: "API Engineer", name: "Omar Al-Mansoor", avatar: "🔌", desc: "OpenAPI 3.1 contracts, REST versioning & payload validation.", rating: "99.5%", status: "Active", skills: ["OpenAPI Specs", "Rate Limiting", "Payload Schemas"] },
  { role: "AI Engineer", name: "Dr. Sophia Sterling", avatar: "🤖", desc: "LangGraph state orchestrator, LiteLLM proxy & RAG pipelines.", rating: "99.9%", status: "Active", skills: ["LangGraph State", "LiteLLM Router", "Vector Search"] },
  { role: "Security Engineer", name: "Alex Mercer", avatar: "🛡️", desc: "OWASP top 10 auditing, JWT HS256 auth & RBAC middleware.", rating: "99.9%", status: "Active", skills: ["JWT & RBAC", "OWASP Audit", "Input Sanitization"] },
  { role: "QA & Test Engineer", name: "Devon Hayes", avatar: "🧪", desc: "PyTest unit suites, integration tests & coverage reports.", rating: "99.4%", status: "Active", skills: ["PyTest Suites", "Jest Tests", "Coverage Reports"] },
  { role: "DevOps Engineer", name: "Kaito Tanaka", avatar: "🐳", desc: "Docker Compose stacks, Nginx proxy & Prometheus metrics.", rating: "99.7%", status: "Active", skills: ["Docker Compose", "GitHub Actions", "Prometheus Metrics"] }
];

export default function AgentsPage() {
  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Navbar />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-indigo-400" />
                <h1 className="text-2xl font-bold text-white tracking-tight">AI Employee Organization Roster</h1>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                14 specialized AI roles collaborating to build production-grade software applications.
              </p>
            </div>
            <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30">
              14/14 Roles Deployed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AGENTS_LIST.map((agent, i) => (
              <div key={i} className="glass-panel p-5 rounded-2xl border border-white/10 glass-panel-hover flex flex-col justify-between space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                      {agent.avatar}
                    </div>
                    <div>
                      <h2 className="font-bold text-sm text-white">{agent.name}</h2>
                      <span className="text-[11px] font-mono text-indigo-400">{agent.role}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {agent.status}
                  </span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed">{agent.desc}</p>

                <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-gray-500">Accuracy Score</span>
                    <span className="text-emerald-400 font-bold">{agent.rating}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {agent.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/5 text-gray-300 border border-white/5">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

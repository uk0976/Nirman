"use client";

import { useState } from "react";
import { Bot, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

const AGENT_LIST = [
  { role: "CEO Agent", name: "Evelyn Vance", avatar: "👔", category: "Leadership", desc: "Executive vision, business viability, resource allocation, and project milestone sign-off." },
  { role: "Business Analyst", name: "Marcus Brody", avatar: "📊", category: "Product", desc: "Product discovery, market breakdown, competitor matrix, functional user personas." },
  { role: "Product Manager", name: "Sarah Lin", avatar: "📋", category: "Product", desc: "PRD synthesis, SRS documentation, feature roadmap prioritization, and backlog management." },
  { role: "Solution Architect", name: "Vikram Patel", avatar: "🏗️", category: "Architecture", desc: "High-level topology, non-functional requirements, technology stack selection, ADR drafting." },
  { role: "System Architect", name: "Elena Rostova", avatar: "📐", category: "Architecture", desc: "Clean Architecture specification, modular monolith boundaries, and UML sequence diagrams." },
  { role: "Database Architect", name: "David Chen", avatar: "🗄️", category: "Architecture", desc: "3NF normalized schema design, ER diagrams, indexing strategy, and Alembic migrations." },
  { role: "UI/UX Designer", name: "Chloe Dubois", avatar: "🎨", category: "Frontend", desc: "Design system definition, typography, glassmorphic layout tokens, and component specs." },
  { role: "Frontend Engineer", name: "Lucas Meyer", avatar: "⚛️", category: "Frontend", desc: "Next.js 15 App Router, React 19, Tailwind CSS, TanStack Query, and Zod state validation." },
  { role: "Backend Engineer", name: "Aria Takahashi", avatar: "⚙️", category: "Backend", desc: "FastAPI micro-services, Pydantic v2 schemas, async SQLAlchemy ORM, and domain logic." },
  { role: "API Engineer", name: "Omar Al-Mansoor", avatar: "🔌", category: "Backend", desc: "OpenAPI 3.1 contracts, REST versioning guidelines, rate limiting, and payload validation." },
  { role: "AI Engineer", name: "Dr. Sophia Sterling", avatar: "🤖", category: "Core AI", desc: "LangGraph state orchestrator, LiteLLM proxy, prompt engineering, and pgvector RAG." },
  { role: "Security Engineer", name: "Alex Mercer", avatar: "🛡️", category: "DevOps & QA", desc: "OWASP top 10 auditing, JWT auth enforcement, RBAC middleware, and key encryption." },
  { role: "QA Engineer", name: "Devon Hayes", avatar: "🧪", category: "DevOps & QA", desc: "PyTest unit suites, integration testing, end-to-end simulation, and coverage reports." },
  { role: "DevOps Engineer", name: "Kaito Tanaka", avatar: "🐳", category: "DevOps & QA", desc: "Docker Compose multi-stage builds, Nginx reverse proxy, and Prometheus/Grafana metrics." }
];

const CATEGORIES = ["All", "Leadership", "Product", "Architecture", "Backend", "Frontend", "DevOps & QA"];

export function AgentShowcase() {
  const [selectedCat, setSelectedCat] = useState("All");

  const filteredAgents = selectedCat === "All"
    ? AGENT_LIST
    : AGENT_LIST.filter(a => a.category === selectedCat);

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
          <Bot className="w-3.5 h-3.5 text-indigo-400" />
          The AI Software Engineering Team
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Meet Your 14 Specialized AI Employees
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Each agent brings specialized domain expertise and communicates through Nirman's central orchestration engine.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                selectedCat === cat
                  ? "bg-indigo-600 text-white font-semibold shadow-glow"
                  : "bg-[#151824] text-gray-400 hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10 glass-panel-hover flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                    {agent.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white tracking-tight">{agent.name}</h3>
                    <span className="text-[11px] font-mono text-indigo-400">{agent.role}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-gray-400 border border-white/10">
                  {agent.category}
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{agent.desc}</p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-emerald-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Active Agent
              </span>
              <span className="text-gray-500 text-[10px]">Deterministic Output</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

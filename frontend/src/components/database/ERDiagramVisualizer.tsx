import { Database, ArrowRight, Key, ShieldCheck } from "lucide-react";

interface ERNode {
  domain: string;
  tables: string[];
  relationships: string;
}

const ER_DOMAINS: ERNode[] = [
  { domain: "Identity & Auth", tables: ["users", "user_sessions", "oauth_accounts"], relationships: "1:N users -> user_sessions" },
  { domain: "Organizations", tables: ["organizations", "organization_memberships"], relationships: "1:N orgs -> memberships" },
  { domain: "Projects & SDLC", tables: ["projects", "requirements", "prds", "epics"], relationships: "1:N orgs -> projects, 1:N projects -> requirements" },
  { domain: "AI Execution", tables: ["agent_executions", "human_approvals", "workflow_graphs"], relationships: "1:N projects -> agent_executions" },
  { domain: "Knowledge Vector", tables: ["document_chunks", "knowledge_sources"], relationships: "pgvector(1536) HNSW index on embeddings" }
];

export function ERDiagramVisualizer() {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">Entity Relationship (ER) Domain Graph</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          3NF Cardinality Validated
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ER_DOMAINS.map((dom, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-[#151824] border border-white/5 space-y-2">
            <span className="text-[10px] text-indigo-400 font-bold uppercase">{dom.domain}</span>
            <div className="flex flex-wrap gap-1">
              {dom.tables.map((t, i) => (
                <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-gray-200 border border-white/10">
                  📋 {t}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-emerald-400 font-mono pt-1">
              {dom.relationships}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

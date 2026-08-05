import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { FileCode2, Download, Search, FileText, Database, Layers, ShieldCheck } from "lucide-react";

const ARTIFACTS_LIST = [
  { name: "Product Requirement Document (PRD v1.0)", type: "PRD", author: "Sarah Lin (PM)", size: "45 KB", date: "Today" },
  { name: "Software Requirement Specification (SRS)", type: "SRS", author: "Sarah Lin (PM)", size: "62 KB", date: "Today" },
  { name: "Clean Architecture System Spec", type: "ARCHITECTURE", author: "Elena Rostova (System Architect)", size: "110 KB", date: "Today" },
  { name: "3NF Database Schema & Migration", type: "DB_SCHEMA", author: "David Chen (DB Architect)", size: "38 KB", date: "Today" },
  { name: "FastAPI REST API Contract (OpenAPI 3.1)", type: "API_SPECS", author: "Omar Al-Mansoor (API Engineer)", size: "85 KB", date: "Today" },
  { name: "Docker Compose Stack Specification", type: "DOCKER", author: "Kaito Tanaka (DevOps)", size: "14 KB", date: "Today" },
];

export default function ArtifactsPage() {
  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Navbar />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <FileCode2 className="w-5 h-5 text-indigo-400" />
                <h1 className="text-2xl font-bold text-white tracking-tight">Artifacts & Specifications Hub</h1>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Centralized repository of PRDs, SRS docs, architecture diagrams, schemas, and generated code.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ARTIFACTS_LIST.map((art, i) => (
              <div key={i} className="glass-panel p-5 rounded-2xl border border-white/10 glass-panel-hover flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {art.type}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">{art.size}</span>
                  </div>
                  <h3 className="font-bold text-sm text-white tracking-tight">{art.name}</h3>
                  <p className="text-xs text-gray-400 font-mono">Synthesized by {art.author}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-mono text-[10px]">{art.date}</span>
                  <button className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Spec</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

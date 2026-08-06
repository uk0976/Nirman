import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { Cpu, CheckCircle2, Github, Terminal, Cloud } from "lucide-react";

const INTEGRATIONS = [
  { name: "Google Gemini 1.5 Pro", type: "LLM Provider", status: "Connected", desc: "Default AI provider for SDLC orchestration." },
  { name: "GitHub Repository Sync", type: "Version Control", status: "Connected", desc: "Automated git commit & PR creation." },
  { name: "LiteLLM Proxy Engine", type: "LLM Router", status: "Configured", desc: "Enterprise cost optimization & failover." },
  { name: "Docker Compose Stack", type: "DevOps Container", status: "Active", desc: "Local & cloud multi-stage builds." }
];

export default function IntegrationsPage() {
  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopNavbar />

        <main className="p-6 max-w-5xl mx-auto w-full space-y-6">
          <div className="border-b border-white/10 pb-5">
            <h1 className="text-2xl font-bold text-white tracking-tight">Integrations & Developer Toolchain</h1>
            <p className="text-xs text-gray-400 mt-1">Connect GitHub, Docker, LLM providers, and monitoring stacks.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INTEGRATIONS.map((item, i) => (
              <div key={i} className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white">{item.name}</h3>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-mono">{item.desc}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

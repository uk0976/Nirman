import { Layers, ShieldCheck, Database, Globe, Cpu } from "lucide-react";

interface CleanArchData {
  domain_layer: { purpose: string; entities: string[]; value_objects: string[]; domain_events: string[] };
  application_layer: { purpose: string; use_cases: string[]; dtos: string[] };
  infrastructure_layer: { purpose: string; adapters: string[] };
  presentation_layer: { purpose: string; controllers: string[] };
}

interface CleanArchitectureTreeProps {
  architecture: CleanArchData;
}

export function CleanArchitectureTree({ architecture }: CleanArchitectureTreeProps) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">Clean Architecture 4-Layer Boundaries</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Onion Architecture Pattern
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Domain Layer */}
        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-purple-300 text-xs">1. DOMAIN LAYER (Innermost Core)</span>
            <span className="text-[9px] text-purple-400">Zero Dependencies</span>
          </div>
          <p className="text-[11px] text-gray-300 font-sans">{architecture.domain_layer.purpose}</p>
          <div className="flex flex-wrap gap-1 pt-1">
            {architecture.domain_layer.entities.map((e, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded text-[9px] bg-purple-500/20 text-purple-200 border border-purple-500/30">
                Entity: {e}
              </span>
            ))}
          </div>
        </div>

        {/* Application Layer */}
        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-indigo-300 text-xs">2. APPLICATION LAYER (Use Cases)</span>
            <span className="text-[9px] text-indigo-400">Orchestrates Domain</span>
          </div>
          <p className="text-[11px] text-gray-300 font-sans">{architecture.application_layer.purpose}</p>
          <div className="flex flex-wrap gap-1 pt-1">
            {architecture.application_layer.use_cases.map((uc, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded text-[9px] bg-indigo-500/20 text-indigo-200 border border-indigo-500/30">
                UseCase: {uc}
              </span>
            ))}
          </div>
        </div>

        {/* Infrastructure Layer */}
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-emerald-300 text-xs">3. INFRASTRUCTURE LAYER (Adapters)</span>
            <span className="text-[9px] text-emerald-400">Persistence & LLM APIs</span>
          </div>
          <p className="text-[11px] text-gray-300 font-sans">{architecture.infrastructure_layer.purpose}</p>
          <div className="flex flex-wrap gap-1 pt-1">
            {architecture.infrastructure_layer.adapters.map((ad, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-200 border border-emerald-500/30">
                Adapter: {ad}
              </span>
            ))}
          </div>
        </div>

        {/* Presentation Layer */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-300 text-xs">4. PRESENTATION LAYER (Controllers)</span>
            <span className="text-[9px] text-amber-400">FastAPI & Next.js UI</span>
          </div>
          <p className="text-[11px] text-gray-300 font-sans">{architecture.presentation_layer.purpose}</p>
          <div className="flex flex-wrap gap-1 pt-1">
            {architecture.presentation_layer.controllers.map((ctl, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded text-[9px] bg-amber-500/20 text-amber-200 border border-amber-500/30">
                Controller: {ctl}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

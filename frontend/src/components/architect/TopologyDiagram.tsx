import { Layers, ArrowRight, Server, ShieldCheck, Database, Globe, Cpu } from "lucide-react";

interface ComponentNode {
  component: string;
  responsibility: string;
}

interface TopologyDiagramProps {
  components: ComponentNode[];
}

export function TopologyDiagram({ components }: TopologyDiagramProps) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">System Component Topology (Clean Architecture)</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Modular Monolith Topo
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {components.map((comp, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-[#151824] border border-white/5 space-y-1.5">
            <span className="text-[10px] text-indigo-400 font-bold uppercase">Component Node {idx + 1}</span>
            <h4 className="font-bold text-white text-xs">{comp.component}</h4>
            <p className="text-[11px] text-gray-300 font-sans leading-tight">{comp.responsibility}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { GitBranch, CheckCircle2, Clock, AlertTriangle, ArrowRight } from "lucide-react";

interface DAGNode {
  id: string;
  name: string;
  role: string;
  status: "COMPLETED" | "RUNNING" | "WAITING" | "PARALLEL";
}

interface WorkflowDAGCanvasProps {
  nodes: DAGNode[];
}

export function WorkflowDAGCanvas({ nodes }: WorkflowDAGCanvasProps) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">Full-Lifecycle Multi-Agent Workflow DAG Canvas</h3>
        </div>
        <span className="text-[10px] text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
          Dependency-Aware Graph
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {nodes.map((n) => (
          <div
            key={n.id}
            className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 transition ${
              n.status === "COMPLETED"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : n.status === "RUNNING"
                ? "bg-indigo-600/20 border-indigo-500 text-white animate-pulse"
                : n.status === "PARALLEL"
                ? "bg-purple-500/10 border-purple-500/30 text-purple-300"
                : "bg-[#151824] border-white/5 text-gray-400"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase">{n.role}</span>
              {n.status === "COMPLETED" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              {n.status === "RUNNING" && <Clock className="w-3.5 h-3.5 text-indigo-400 animate-spin" />}
              {n.status === "PARALLEL" && <GitBranch className="w-3.5 h-3.5 text-purple-400" />}
            </div>
            <span className="font-sans font-bold text-xs text-white">{n.name}</span>
            <div className="flex items-center justify-between text-[10px]">
              <span>STATUS:</span>
              <span className="font-bold">{n.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

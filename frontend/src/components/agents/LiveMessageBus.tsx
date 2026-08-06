import { MessageSquare, ArrowRight, Bot, ShieldCheck } from "lucide-react";

const MESSAGES = [
  { timestamp: "10:42:01", sender: "CEO (Evelyn Vance)", recipient: "PM (Sarah Lin)", type: "DIRECTIVE", message: "Synthesize PRD for Nirman SaaS Core Platform." },
  { timestamp: "10:42:30", sender: "PM (Sarah Lin)", recipient: "Architect (Elena Rostova)", type: "HANDOFF", message: "PRD Spec completed with 45 User Stories. Proceed to Architecture." },
  { timestamp: "10:43:15", sender: "Architect (Elena Rostova)", recipient: "DB Architect (David Chen)", type: "HANDOFF", message: "Clean Architecture specified. Synthesize 3NF PostgreSQL schema." },
  { timestamp: "10:44:00", sender: "DB Architect (David Chen)", recipient: "Security (Alex Mercer)", type: "APPROVAL_REQ", message: "Human approval requested for 3NF PostgreSQL schema migration script." }
];

export function LiveMessageBus() {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">Inter-Agent Pub/Sub Message Bus</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Async Event Stream
        </span>
      </div>

      <div className="space-y-3">
        {MESSAGES.map((msg, i) => (
          <div key={i} className="p-3.5 rounded-xl bg-[#151824] border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <span className="text-indigo-300 font-bold">{msg.sender}</span>
                <ArrowRight className="w-3 h-3 text-gray-500" />
                <span className="text-emerald-300 font-bold">{msg.recipient}</span>
              </div>
              <span className="text-[10px] text-gray-500">{msg.timestamp}</span>
            </div>
            <p className="text-gray-300 text-xs font-sans mt-1">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

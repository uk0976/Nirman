import { Calendar, CheckCircle2, Clock, ArrowRight } from "lucide-react";

interface PhaseItem {
  phase: string;
  duration: string;
  goals: string;
  deliverables: string[];
  status: string;
}

interface RoadmapTimelineProps {
  phases: PhaseItem[];
}

export function RoadmapTimeline({ phases }: RoadmapTimelineProps) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">4-Phase Release Roadmap</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Iterative Release Strategy
        </span>
      </div>

      <div className="space-y-3">
        {phases.map((p, i) => (
          <div key={i} className="p-4 rounded-xl bg-[#151824] border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs">{p.phase}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-indigo-400">{p.duration}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                    p.status === "COMPLETED"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : p.status === "IN_PROGRESS"
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 animate-pulse"
                      : "bg-white/5 text-gray-400"
                  }`}
                >
                  {p.status}
                </span>
              </div>
            </div>

            <p className="text-gray-300 font-sans text-xs">{p.goals}</p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {p.deliverables.map((del, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-gray-300 border border-white/10">
                  ✓ {del}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

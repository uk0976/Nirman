import Link from "next/link";
import { ProjectData } from "@/components/projects/ProjectCard";
import { Calendar, ArrowRight } from "lucide-react";

interface ProjectTimelineProps {
  projects: ProjectData[];
}

export function ProjectTimeline({ projects }: ProjectTimelineProps) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">SDLC Execution Timeline (20 Phases)</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Real-Time Pipeline
        </span>
      </div>

      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p.id} className="p-4 rounded-xl bg-[#151824] border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-xs">{p.name}</span>
                <span className="text-[10px] text-indigo-400 font-mono">({p.phase})</span>
              </div>

              <Link href={`/projects/${p.id}`} className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 text-[11px]">
                <span>View Timeline</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Timeline Stepper Visualizer */}
            <div className="grid grid-cols-20 gap-1 pt-2">
              {Array.from({ length: 20 }).map((_, idx) => {
                const phaseNum = idx + 1;
                const isCurrent = Math.ceil(p.progress / 5) === phaseNum;
                const isDone = Math.ceil(p.progress / 5) > phaseNum;

                return (
                  <div
                    key={idx}
                    title={`Phase ${phaseNum}`}
                    className={`h-4 rounded transition-all ${
                      isDone
                        ? "bg-emerald-400"
                        : isCurrent
                        ? "bg-indigo-500 animate-pulse ring-2 ring-indigo-400/50"
                        : "bg-white/5"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

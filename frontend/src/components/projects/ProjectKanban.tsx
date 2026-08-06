import Link from "next/link";
import { ProjectData } from "@/components/projects/ProjectCard";
import { ArrowRight, Plus } from "lucide-react";

interface ProjectKanbanProps {
  projects: ProjectData[];
}

const KANBAN_COLUMNS = [
  { id: "DISCOVERY", title: "Discovery & Planning", status: "DISCOVERY" },
  { id: "IN_PROGRESS", title: "In Development", status: "IN_PROGRESS" },
  { id: "QA_REVIEW", title: "Testing & Review", status: "REVIEW" },
  { id: "COMPLETED", title: "Deployed / Done", status: "COMPLETED" }
];

export function ProjectKanban({ projects }: ProjectKanbanProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto">
      {KANBAN_COLUMNS.map((col) => {
        const colProjects = projects.filter((p) =>
          col.status === "COMPLETED" ? p.status === "COMPLETED" : p.status === col.status || (col.status === "DISCOVERY" && p.progress < 20)
        );

        return (
          <div key={col.id} className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col min-h-[450px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <h3 className="font-mono text-xs font-bold text-white uppercase">{col.title}</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-gray-400">
                {colProjects.length}
              </span>
            </div>

            <div className="space-y-3 flex-1">
              {colProjects.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-[#151824] border border-white/5 space-y-2.5 hover:border-indigo-500/40 transition">
                  <h4 className="font-bold text-xs text-white">{p.name}</h4>
                  <p className="text-[11px] text-gray-400 line-clamp-2">{p.description}</p>
                  
                  <div className="flex items-center justify-between text-[10px] font-mono pt-1 text-emerald-400">
                    <span>{p.phase}</span>
                    <span>{p.progress}%</span>
                  </div>

                  <Link
                    href={`/projects/${p.id}`}
                    className="w-full mt-2 bg-white/5 hover:bg-white/10 text-gray-200 font-medium text-[11px] py-1.5 rounded-lg transition flex items-center justify-center gap-1 border border-white/5"
                  >
                    <span>Inspect Hub</span>
                    <ArrowRight className="w-3 h-3 text-indigo-400" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

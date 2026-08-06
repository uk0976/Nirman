import Link from "next/link";
import { ProjectData } from "@/components/projects/ProjectCard";
import { ArrowRight, Star } from "lucide-react";

interface ProjectListProps {
  projects: ProjectData[];
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-white/10 bg-[#0B0D14] text-gray-400 font-bold uppercase">
              <th className="p-4">Project Name</th>
              <th className="p-4">SDLC Status</th>
              <th className="p-4">Completion</th>
              <th className="p-4">Tech Stack</th>
              <th className="p-4">Last Updated</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-white/5 transition">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white font-sans text-xs">{p.name}</span>
                  </div>
                  <p className="text-[11px] text-gray-400 font-sans truncate max-w-xs">{p.description}</p>
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                    {p.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="w-32 space-y-1">
                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span>{p.progress}%</span>
                      <span>Phase {Math.ceil(p.progress / 5)}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${p.progress}%` }} />
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {p.stack.slice(0, 2).map((s, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded text-[9px] bg-white/5 text-gray-300 border border-white/5">
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-gray-400">{p.updated}</td>
                <td className="p-4 text-right">
                  <Link
                    href={`/projects/${p.id}`}
                    className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-bold"
                  >
                    <span>Open</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

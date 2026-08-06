"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ArrowRight, MoreVertical, Layers, CheckCircle2 } from "lucide-react";

export interface ProjectData {
  id: string;
  name: string;
  slug: string;
  description: string;
  phase: string;
  progress: number;
  status: string;
  health: number;
  updated: string;
  stack: string[];
  starred?: boolean;
}

interface ProjectCardProps {
  project: ProjectData;
  onToggleStar?: (id: string) => void;
}

export function ProjectCard({ project, onToggleStar }: ProjectCardProps) {
  const [starred, setStarred] = useState(project.starred || false);

  const handleStar = (e: React.MouseEvent) => {
    e.preventDefault();
    setStarred(!starred);
    if (onToggleStar) onToggleStar(project.id);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 glass-panel-hover flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
            {project.status}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-emerald-400">Health: {project.health}%</span>
            <button
              onClick={handleStar}
              className={`p-1 rounded-lg transition ${
                starred ? "text-amber-400" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <Star className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>

        <h3 className="text-base font-bold text-white tracking-tight">{project.name}</h3>
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{project.description}</p>
      </div>

      <div className="space-y-3 pt-3 border-t border-white/10 text-xs font-mono">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-gray-400">SDLC Phase</span>
          <span className="text-emerald-400 font-semibold">{project.phase}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full" style={{ width: `${project.progress}%` }} />
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((tech, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-gray-300 border border-white/10">
              {tech}
            </span>
          ))}
        </div>

        <Link
          href={`/projects/${project.id}`}
          className="w-full mt-2 bg-[#151824] hover:bg-white/10 text-gray-200 font-medium text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-2 border border-white/5"
        >
          <span>Open Project Workspace</span>
          <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
        </Link>
      </div>
    </div>
  );
}

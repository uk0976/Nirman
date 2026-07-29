"use client";

import React from "react";
import { ProjectCard, ProjectData } from "./ProjectCard";

interface ProjectGridProps {
  projects: ProjectData[];
  onOpenProject: (id: string) => void;
  onAction?: (action: string, id: string) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onOpenProject, onAction }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} onOpen={onOpenProject} onAction={onAction} />
      ))}
    </div>
  );
};

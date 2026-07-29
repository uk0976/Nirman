"use client";

import React from "react";
import { ArtifactCard, ArtifactData } from "./ArtifactCard";

interface ArtifactGridProps {
  artifacts: ArtifactData[];
  onPreview: (art: ArtifactData) => void;
  onVersionHistory: (art: ArtifactData) => void;
  onShare: (art: ArtifactData) => void;
}

export const ArtifactGrid: React.FC<ArtifactGridProps> = ({
  artifacts,
  onPreview,
  onVersionHistory,
  onShare,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {artifacts.map((art) => (
        <ArtifactCard
          key={art.id}
          artifact={art}
          onPreview={onPreview}
          onVersionHistory={onVersionHistory}
          onShare={onShare}
        />
      ))}
    </div>
  );
};

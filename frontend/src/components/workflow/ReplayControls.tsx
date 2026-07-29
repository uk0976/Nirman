"use client";

import React, { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, RotateCcw, FastForward } from "lucide-react";

interface ReplayControlsProps {
  isReplaying: boolean;
  onToggleReplay: () => void;
}

export const ReplayControls: React.FC<ReplayControlsProps> = ({ isReplaying, onToggleReplay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrubValue, setScrubValue] = useState(55);
  const [speed, setSpeed] = useState("1x");

  if (!isReplaying) return null;

  return (
    <div className="glass-panel p-4 border border-purple-500/30 bg-purple-500/[0.04] mb-6 text-left space-y-3">
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-purple-300 font-bold">
          <RotateCcw className="w-4 h-4 animate-spin" />
          <span>Workflow Execution Replay Engine Active</span>
        </div>
        <span className="text-slate-400">Scrubbing Stage 7 / 13</span>
      </div>

      {/* Scrubber Range Input */}
      <input
        type="range"
        min={0}
        max={100}
        value={scrubValue}
        onChange={(e) => setScrubValue(Number(e.target.value))}
        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
      />

      {/* Scrubber Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => setScrubValue(Math.max(0, scrubValue - 10))} className="p-1.5 rounded-lg bg-black/40 text-slate-300 hover:text-white">
            <SkipBack className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
          >
            {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white fill-current" />}
          </button>
          <button onClick={() => setScrubValue(Math.min(100, scrubValue + 10))} className="p-1.5 rounded-lg bg-black/40 text-slate-300 hover:text-white">
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Speed Options */}
        <div className="flex items-center gap-1 font-mono text-[10px]">
          {["1x", "2x", "5x"].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2 py-0.5 rounded ${speed === s ? "bg-purple-600 text-white font-bold" : "bg-black/40 text-slate-400"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

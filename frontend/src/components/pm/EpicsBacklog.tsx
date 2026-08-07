import { Layers, CheckCircle2, Clock } from "lucide-react";

interface EpicItem {
  epic_id: string;
  name: string;
  story_count: number;
  status: string;
}

interface SprintPlan {
  sprint_number: number;
  sprint_goal: string;
  capacity_points: number;
  stories_assigned: string[];
  definition_of_done: string;
}

interface EpicsBacklogProps {
  epics: EpicItem[];
  sprintPlan: SprintPlan;
}

export function EpicsBacklog({ epics, sprintPlan }: EpicsBacklogProps) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6 font-mono text-xs">
      {/* Epics Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <h3 className="font-bold text-white uppercase text-xs">Epics & Feature Backlog</h3>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {epics.length} Epics Defined
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {epics.map((epic) => (
            <div key={epic.epic_id} className="p-3.5 rounded-xl bg-[#151824] border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-400">{epic.epic_id}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                    epic.status === "COMPLETED"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : epic.status === "IN_PROGRESS"
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 animate-pulse"
                      : "bg-white/5 text-gray-400"
                  }`}
                >
                  {epic.status}
                </span>
              </div>
              <h4 className="font-bold text-white text-xs">{epic.name}</h4>
              <p className="text-[10px] text-gray-400">{epic.story_count} User Stories</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sprint 1 Plan */}
      <div className="p-4 rounded-xl bg-[#0D0F17] border border-indigo-500/30 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-indigo-300">SPRINT {sprintPlan.sprint_number} EXECUTION PLAN</span>
          <span className="text-emerald-400 font-bold">{sprintPlan.capacity_points} Story Points Capacity</span>
        </div>
        <p className="text-gray-300 font-sans text-xs"><strong>Sprint Goal:</strong> {sprintPlan.sprint_goal}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {sprintPlan.stories_assigned.map((st, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-indigo-300 border border-indigo-500/30">
              {st}
            </span>
          ))}
        </div>
        <p className="text-[11px] text-gray-400 font-sans pt-1"><strong>Definition of Done:</strong> {sprintPlan.definition_of_done}</p>
      </div>
    </div>
  );
}

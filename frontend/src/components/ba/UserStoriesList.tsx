import { FileText, CheckCircle2 } from "lucide-react";

interface StoryItem {
  story_id: string;
  user_role: string;
  goal: string;
  benefit: string;
  story_points: number;
  acceptance_criteria: string;
}

interface UserStoriesListProps {
  stories: StoryItem[];
}

export function UserStoriesList({ stories }: UserStoriesListProps) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">Agile User Stories Backlog</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          INVEST Criteria Validated
        </span>
      </div>

      <div className="space-y-3">
        {stories.map((s) => (
          <div key={s.story_id} className="p-4 rounded-xl bg-[#151824] border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-indigo-400">{s.story_id}</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-gray-300 font-bold">
                {s.story_points} Story Points
              </span>
            </div>

            <p className="text-gray-200 text-xs font-sans leading-relaxed">
              <strong>As a</strong> <span className="text-indigo-300 font-mono">{s.user_role}</span>,{" "}
              <strong>I want to</strong> <span className="text-gray-100 font-mono">{s.goal}</span>,{" "}
              <strong>so that</strong> <span className="text-emerald-300 font-mono">{s.benefit}</span>.
            </p>

            <div className="pt-2 border-t border-white/5 text-[11px] text-gray-400 font-sans">
              <strong className="text-gray-300 font-mono">Acceptance Criteria:</strong> {s.acceptance_criteria}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

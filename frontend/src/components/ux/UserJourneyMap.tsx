import { ArrowRight, Compass } from "lucide-react";

interface JourneyItem {
  journey: string;
  flow: string[];
}

interface UserJourneyMapProps {
  journeys: JourneyItem[];
}

export function UserJourneyMap({ journeys }: UserJourneyMapProps) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">End-to-End User Journey Maps</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          UX Flow Validated
        </span>
      </div>

      <div className="space-y-3">
        {journeys.map((j, i) => (
          <div key={i} className="p-4 rounded-xl bg-[#151824] border border-white/5 space-y-2">
            <span className="font-bold text-white text-xs">{j.journey}</span>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {j.flow.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] bg-white/5 text-gray-200 border border-white/10 font-bold">
                    {step}
                  </span>
                  {idx < j.flow.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

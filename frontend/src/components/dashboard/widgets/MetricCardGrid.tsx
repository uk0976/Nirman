import { FolderGit2, Bot, Workflow, FileText, TrendingUp, CheckCircle2 } from "lucide-react";

export function MetricCardGrid() {
  const METRICS = [
    {
      title: "Active Projects",
      value: "4",
      change: "+2 this week",
      icon: FolderGit2,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/20"
    },
    {
      title: "AI Employees Deployed",
      value: "14 / 14",
      change: "100% Operational",
      icon: Bot,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20"
    },
    {
      title: "SDLC Phases Executed",
      value: "20 / 20",
      change: "Phase 6 Active",
      icon: Workflow,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20"
    },
    {
      title: "Artifacts Synthesized",
      value: "48 Docs & Code",
      change: "PRD, SRS, 3NF DB, APIs",
      icon: FileText,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {METRICS.map((metric, i) => {
        const Icon = metric.icon;
        return (
          <div key={i} className="glass-panel p-5 rounded-xl border border-white/10 glass-panel-hover flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-400">{metric.title}</span>
              <div className={`p-2 rounded-lg border ${metric.bg}`}>
                <Icon className={`w-4 h-4 ${metric.color}`} />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-white tracking-tight">{metric.value}</span>
              <div className="flex items-center gap-1 mt-1 text-[11px] text-gray-400">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span>{metric.change}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

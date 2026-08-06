import { Wrench, Shield, CheckCircle2, Lock } from "lucide-react";

const TOOLS = [
  { id: "code_gen", name: "Code Generation Engine", permission: "WRITE_CODE", status: "ENABLED", usage: "1,240 calls" },
  { id: "file_io", name: "FileSystem Workspace IO", permission: "WRITE_FILES", status: "ENABLED", usage: "480 calls" },
  { id: "db_migrate", name: "Alembic DB Migrator", permission: "ADMIN_DB", status: "HUMAN_APPROVAL", usage: "32 calls" },
  { id: "shell_exec", name: "Terminal Execution", permission: "SHELL_EXEC", status: "SANDBOXED", usage: "115 calls" },
  { id: "git_commit", name: "Git Commit & Push", permission: "GIT_WRITE", status: "ENABLED", usage: "85 commits" }
];

export function ToolMatrix() {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">Permissioned Tool Execution Matrix</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          RBAC Protected
        </span>
      </div>

      <div className="space-y-2.5">
        {TOOLS.map((t) => (
          <div key={t.id} className="p-3.5 rounded-xl bg-[#151824] border border-white/5 flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-bold text-white text-xs">{t.name}</h4>
              <p className="text-[10px] text-indigo-400">Permission: {t.permission}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] text-gray-500">{t.usage}</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  t.status === "ENABLED"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : t.status === "HUMAN_APPROVAL"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                }`}
              >
                {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

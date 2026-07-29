"use client";

import React, { useState } from "react";
import { CheckCircle2, Clock, Users, ArrowUpRight, FolderKanban, LayoutGrid, List } from "lucide-react";

export const TaskBoard: React.FC = () => {
  const [view, setView] = useState<"kanban" | "list">("kanban");

  const tasks = [
    { id: "TASK-1", title: "Setup FastAPI Layered Router Architecture", agent: "Fiona", priority: "High", status: "In Progress", progress: 85, duration: "1.2s", dep: "None" },
    { id: "TASK-2", title: "Pydantic V2 Request & Response Schemas", agent: "Fiona", priority: "Medium", status: "In Progress", progress: 60, duration: "2.4s", dep: "TASK-1" },
    { id: "TASK-3", title: "PostgreSQL Migration DDL & Indexing", agent: "George", priority: "High", status: "Completed", progress: 100, duration: "3.1s", dep: "TASK-1" },
    { id: "TASK-4", title: "Write Async Pytest Endpoint Fixtures", agent: "Ian", priority: "Medium", status: "Todo", progress: 0, duration: "Pending", dep: "TASK-2" },
  ];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
        <div className="flex items-center gap-2">
          <FolderKanban className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Project Engineering Tasks</h3>
        </div>

        <div className="flex p-1 rounded-lg bg-black/40 border border-white/[0.08]">
          <button
            onClick={() => setView("kanban")}
            className={`px-3 py-1 rounded text-xs font-semibold ${view === "kanban" ? "bg-indigo-600 text-white" : "text-slate-400"}`}
          >
            Kanban
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1 rounded text-xs font-semibold ${view === "list" ? "bg-indigo-600 text-white" : "text-slate-400"}`}
          >
            List
          </button>
        </div>
      </div>

      {view === "kanban" ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["Todo", "In Progress", "Completed"].map((statusCol) => {
            const colTasks = tasks.filter((t) => t.status === statusCol);
            return (
              <div key={statusCol} className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
                  <span className="text-xs font-bold text-white uppercase">{statusCol}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-400 font-bold">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {colTasks.map((t) => (
                    <div key={t.id} className="p-3 rounded-lg bg-[#0a0a0e] border border-white/[0.06] space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-indigo-400 font-bold">{t.id}</span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                          {t.priority}
                        </span>
                      </div>
                      <span className="font-bold text-slate-200 block">{t.title}</span>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                        <span>Agent: {t.agent}</span>
                        <span>{t.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] text-[10px] font-mono text-slate-500 uppercase">
                <th className="py-2.5 px-3">Task ID</th>
                <th className="py-2.5 px-3">Title</th>
                <th className="py-2.5 px-3">Agent</th>
                <th className="py-2.5 px-3">Priority</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Progress</th>
                <th className="py-2.5 px-3">Dependencies</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {tasks.map((t) => (
                <tr key={t.id}>
                  <td className="py-2.5 px-3 font-mono text-indigo-400 font-bold">{t.id}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-200">{t.title}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400">{t.agent}</td>
                  <td className="py-2.5 px-3 font-mono text-indigo-300">{t.priority}</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400">{t.status}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-300">{t.progress}%</td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">{t.dep}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { CheckCircle2, Activity, Clock, ChevronRight, FileCode2, Users, ChevronDown, Workflow } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface StageData {
  id: number;
  title: string;
  agent: string;
  role: string;
  status: "Completed" | "In Progress" | "Pending";
  startTime: string;
  duration: string;
  confidence: number;
  artifacts: string[];
  description: string;
}

export const MainTimeline: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState(7); // Stage 7: Backend Development
  const [expandedStage, setExpandedStage] = useState<number | null>(7);

  const stages: StageData[] = [
    { id: 1, title: "Requirement Analysis", agent: "Bob", role: "Product Manager", status: "Completed", startTime: "18:22", duration: "1.2m", confidence: 98, artifacts: ["PRD.md"], description: "Gathered initial client functional requirements." },
    { id: 2, title: "Business Analysis", agent: "Alice", role: "CEO", status: "Completed", startTime: "18:24", duration: "1.5m", confidence: 96, artifacts: ["BusinessScope.json"], description: "Validated revenue goals and timeline constraints." },
    { id: 3, title: "Planning & Sizing", agent: "Bob", role: "Product Manager", status: "Completed", startTime: "18:26", duration: "2.1m", confidence: 95, artifacts: ["SprintRoadmap.md"], description: "Decomposed requirements into 14 execution tasks." },
    { id: 4, title: "War Room Discussion", agent: "All Employees", role: "Multi-Agent Board", status: "Completed", startTime: "18:28", duration: "4.0m", confidence: 94, artifacts: ["WarRoomMinutes.md"], description: "Debated layered router architecture & security protocols." },
    { id: 5, title: "Architecture Blueprint", agent: "Charlie", role: "Software Architect", status: "Completed", startTime: "18:32", duration: "3.2m", confidence: 92, artifacts: ["Architecture.md"], description: "Formulated multi-file FastAPI layered routing blueprint." },
    { id: 6, title: "Frontend Development", agent: "Evan", role: "Frontend Engineer", status: "Completed", startTime: "18:35", duration: "3.5m", confidence: 95, artifacts: ["DashboardUI.tsx"], description: "Built Next.js 16 App Router interface components." },
    { id: 7, title: "Backend Development", agent: "Fiona", role: "Backend Engineer", status: "In Progress", startTime: "18:39", duration: "Running (2.8m)", confidence: 93, artifacts: ["auth_router.py", "inventory_router.py"], description: "Generating FastAPI OAuth token & inventory routing controllers." },
    { id: 8, title: "Database Design", agent: "George", role: "Database Engineer", status: "Pending", startTime: "Upcoming", duration: "Est 2.0m", confidence: 0, artifacts: [], description: "Will generate PostgreSQL DDL migration scripts & indices." },
    { id: 9, title: "Testing Suite Execution", agent: "Ian", role: "QA Engineer", status: "Pending", startTime: "Upcoming", duration: "Est 2.5m", confidence: 0, artifacts: [], description: "Will run Pytest endpoint assertion suite." },
    { id: 10, title: "Security Audit Review", agent: "Jack", role: "Security Engineer", status: "Pending", startTime: "Upcoming", duration: "Est 1.5m", confidence: 0, artifacts: [], description: "Will sanitize headers and verify OWASP Top 10 rules." },
    { id: 11, title: "Documentation Generation", agent: "Leo", role: "Documentation", status: "Pending", startTime: "Upcoming", duration: "Est 1.0m", confidence: 0, artifacts: [], description: "Will generate Swagger OpenAPI specs & README.md." },
    { id: 12, title: "Deployment Preparation", agent: "Kate", role: "DevOps Engineer", status: "Pending", startTime: "Upcoming", duration: "Est 1.5m", confidence: 0, artifacts: [], description: "Will package Docker containers and staging manifests." },
    { id: 13, title: "Completed & Verified", agent: "System", role: "Nirman Core", status: "Pending", startTime: "Upcoming", duration: "Est 0.5m", confidence: 0, artifacts: [], description: "Final release packaging." },
  ];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] text-left mb-6 relative overflow-hidden">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
        <div className="flex items-center gap-2">
          <Workflow className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">13-Stage Vertical Execution Pipeline</h3>
        </div>
        <span className="text-xs font-mono text-indigo-400">Stage 7 Active • Fiona Coding</span>
      </div>

      <div className="space-y-4 relative">
        {/* Track Line */}
        <div className="absolute top-4 bottom-4 left-6 w-0.5 bg-white/[0.06] -z-10" />

        {stages.map((stg) => {
          const isDone = stg.status === "Completed";
          const isCurrent = stg.status === "In Progress";
          const isExpanded = expandedStage === stg.id;

          return (
            <motion.div
              key={stg.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-xl border transition-all text-xs ${
                isCurrent
                  ? "bg-indigo-600/15 border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                  : isDone
                  ? "bg-black/40 border-white/[0.06]"
                  : "bg-black/20 border-white/[0.03] opacity-60"
              }`}
            >
              <div className="flex items-start justify-between gap-4 cursor-pointer" onClick={() => setExpandedStage(isExpanded ? null : stg.id)}>
                <div className="flex items-start gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center border shrink-0 text-xs mt-0.5 ${
                      isDone
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : isCurrent
                        ? "border-indigo-500 bg-indigo-500/20 text-indigo-300 animate-pulse"
                        : "border-white/10 bg-black text-slate-600"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : isCurrent ? <Activity className="w-4 h-4" /> : stg.id}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className={`text-sm font-bold ${isCurrent ? "text-white" : isDone ? "text-slate-200" : "text-slate-500"}`}>
                        Stage {stg.id}: {stg.title}
                      </h4>
                      <span
                        className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                          isDone
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : isCurrent
                            ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 animate-pulse"
                            : "bg-white/[0.04] text-slate-600"
                        }`}
                      >
                        {stg.status}
                      </span>
                    </div>

                    <p className="text-slate-400 text-xs mt-0.5">{stg.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 font-mono text-[10px] text-slate-400">
                  <span>{stg.agent} ({stg.role})</span>
                  <span>{stg.duration}</span>
                  {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
                </div>
              </div>

              {/* Expandable Stage Details */}
              {isExpanded && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400"
                  >
                    <div className="flex items-center gap-2">
                      <FileCode2 className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Artifacts:</span>
                      {stg.artifacts.length > 0 ? (
                        stg.artifacts.map((art) => (
                          <span key={art} className="px-2 py-0.5 rounded bg-white/[0.04] text-indigo-300 border border-white/[0.08]">
                            {art}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-600">Pending</span>
                      )}
                    </div>

                    {isDone && <span className="text-emerald-400 font-bold">Confidence: {stg.confidence}%</span>}
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

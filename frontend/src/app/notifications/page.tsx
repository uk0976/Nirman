import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { Bell, CheckCircle2, ShieldCheck } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopNavbar />

        <main className="p-6 max-w-4xl mx-auto w-full space-y-6">
          <div className="border-b border-white/10 pb-5">
            <h1 className="text-2xl font-bold text-white tracking-tight">System & AI Notifications</h1>
            <p className="text-xs text-gray-400 mt-1">Full audit trail of AI agent task completions and platform notifications.</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3 font-mono text-xs">
            {[
              { title: "PRD Specification Finalized", desc: "Sarah Lin (PM) approved PRD Document v1.0.", time: "10 mins ago" },
              { title: "OWASP Security Audit Complete", desc: "Alex Mercer (Security) passed 100% auth endpoints.", time: "1 hour ago" },
              { title: "3NF Database Schema Compiled", desc: "David Chen (DB Architect) generated PostgreSQL schema.", time: "3 hours ago" }
            ].map((n, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#151824] border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{n.title}</span>
                  <span className="text-[10px] text-gray-500">{n.time}</span>
                </div>
                <p className="text-gray-300 font-sans text-xs">{n.desc}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { Users, Plus, Shield, Mail, UserCheck } from "lucide-react";

const MEMBERS = [
  { name: "Umer Khan", email: "umer@acmelabs.com", role: "Owner / Lead Architect", status: "Active", avatar: "UK" },
  { name: "Sarah Lin", email: "sarah@acmelabs.com", role: "Product Manager", status: "Active", avatar: "SL" },
  { name: "David Chen", email: "david@acmelabs.com", role: "Database Engineer", status: "Active", avatar: "DC" },
  { name: "Alex Mercer", email: "alex@acmelabs.com", role: "Security Auditor", status: "Invited", avatar: "AM" }
];

export default function TeamPage() {
  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopNavbar />

        <main className="p-6 max-w-5xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Organization Team Members</h1>
              <p className="text-xs text-gray-400 mt-1">Manage team RBAC permissions and human-in-the-loop collaborators.</p>
            </div>

            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-4 py-2 rounded-xl shadow-glow transition flex items-center gap-2">
              <Plus className="w-3.5 h-3.5" />
              <span>Invite Team Member</span>
            </button>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="space-y-3 font-mono text-xs">
              {MEMBERS.map((m, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#151824] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-600 p-[1px] flex items-center justify-center font-bold text-xs text-white">
                      {m.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xs">{m.name}</h3>
                      <p className="text-[11px] text-gray-400 font-sans">{m.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {m.role}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold">{m.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

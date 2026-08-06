import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { ShieldCheck, Key, Lock, Smartphone, Laptop, LogOut, CheckCircle2 } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Navbar />

        <main className="p-6 max-w-4xl mx-auto w-full space-y-6">
          <div className="border-b border-white/10 pb-5">
            <h1 className="text-2xl font-bold text-white tracking-tight">Security & Authentication Architecture</h1>
            <p className="text-xs text-gray-400 mt-1">Manage Two-Factor Authentication (2FA), Passkeys, Active Device Sessions, and JWT tokens.</p>
          </div>

          {/* 2FA & Passkey Preview Card */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h2 className="text-sm font-bold text-white">Multi-Factor Authentication (MFA / 2FA)</h2>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                Enterprise Ready
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-[#151824] border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-indigo-400" />
                    <span className="font-bold text-white">Authenticator App (TOTP)</span>
                  </div>
                  <span className="text-emerald-400 text-[10px]">Enabled</span>
                </div>
                <p className="text-gray-400 text-[11px]">Google Authenticator / 1Password TOTP token code.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#151824] border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-purple-400" />
                    <span className="font-bold text-white">Passkeys & Hardware Keys</span>
                  </div>
                  <span className="text-gray-500 text-[10px]">Configurable</span>
                </div>
                <p className="text-gray-400 text-[11px]">FIDO2 WebAuthn passkeys & YubiKey hardware security.</p>
              </div>
            </div>
          </div>

          {/* Active Sessions Card */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Laptop className="w-5 h-5 text-indigo-400" />
                <h2 className="text-sm font-bold text-white">Active Device Sessions</h2>
              </div>
              <button className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs px-3 py-1.5 rounded-lg transition flex items-center gap-1.5">
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout All Other Devices</span>
              </button>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              {[
                { device: "Chrome on Windows 11", location: "New Delhi, IN", ip: "127.0.0.1", status: "Current Device", active: "Just now" },
                { device: "Nirman Mobile CLI / Agent SDK", location: "San Francisco, US", ip: "192.168.1.45", status: "Active Session", active: "2 hours ago" }
              ].map((sess, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#151824] border border-white/5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-bold text-white text-xs">{sess.device}</p>
                    <p className="text-[10px] text-gray-400">{sess.location} · {sess.ip} · {sess.active}</p>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                    {sess.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

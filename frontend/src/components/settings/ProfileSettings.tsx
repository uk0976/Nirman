"use client";

import React from "react";
import { User, Mail, Globe, Clock, ShieldCheck } from "lucide-react";

export const ProfileSettings: React.FC = () => {
  return (
    <div className="glass-panel p-6 border border-white/[0.08] text-left space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-white/[0.06]">
        <User className="w-5 h-5 text-indigo-400" />
        <h2 className="text-base font-bold text-white uppercase tracking-wider">User Account Profile</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div>
          <label className="text-slate-400 font-mono block mb-1.5">Full Name</label>
          <input
            type="text"
            defaultValue="Umer Khan"
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white font-sans focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="text-slate-400 font-mono block mb-1.5">Email Address</label>
          <input
            type="email"
            defaultValue="umer.khan@nirman.ai"
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white font-sans focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="text-slate-400 font-mono block mb-1.5">Account Role</label>
          <input
            type="text"
            disabled
            value="Lead AI Engineering Director (Admin)"
            className="w-full bg-black/20 border border-white/[0.04] text-slate-400 rounded-xl px-4 py-2.5 font-sans cursor-not-allowed"
          />
        </div>

        <div>
          <label className="text-slate-400 font-mono block mb-1.5">Timezone</label>
          <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white font-sans focus:outline-none focus:border-indigo-500">
            <option>UTC+05:30 (Asia/Kolkata)</option>
            <option>UTC+00:00 (London/GMT)</option>
            <option>UTC-05:00 (America/New_York)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

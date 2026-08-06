"use client";

import { Chrome, Github } from "lucide-react";

export function SocialLogins() {
  const handleSocialClick = (provider: string) => {
    window.location.href = "/onboarding";
  };

  return (
    <div className="space-y-3">
      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-white/10 w-full" />
        <span className="bg-[#0D0F17] px-3 text-[11px] text-gray-400 font-mono absolute">
          OR CONTINUE WITH
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <button
          type="button"
          onClick={() => handleSocialClick("Google")}
          className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#151824] hover:bg-white/10 border border-white/10 text-gray-200 transition font-medium"
        >
          <Chrome className="w-4 h-4 text-emerald-400" />
          <span>Google</span>
        </button>

        <button
          type="button"
          onClick={() => handleSocialClick("GitHub")}
          className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#151824] hover:bg-white/10 border border-white/10 text-gray-200 transition font-medium"
        >
          <Github className="w-4 h-4 text-gray-200" />
          <span>GitHub</span>
        </button>

        <button
          type="button"
          onClick={() => handleSocialClick("Microsoft")}
          className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#151824] hover:bg-white/10 border border-white/10 text-gray-200 transition font-medium"
        >
          <span className="w-3.5 h-3.5 bg-indigo-500 rounded-sm inline-block" />
          <span>Microsoft</span>
        </button>
      </div>
    </div>
  );
}

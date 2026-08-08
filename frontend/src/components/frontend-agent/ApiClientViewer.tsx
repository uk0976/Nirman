"use client";

import { Code2, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ApiClientViewerProps {
  code: string;
}

export function ApiClientViewer({ code }: ApiClientViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">Centralized Typed ApiClient (src/lib/ApiClient.ts)</h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 bg-white/5 hover:bg-white/10 text-gray-300 text-[11px] px-3 py-1.5 rounded-lg border border-white/10 transition"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied" : "Copy Code"}</span>
        </button>
      </div>

      <pre className="p-4 rounded-xl bg-[#0D0F17] border border-white/5 text-gray-200 font-mono text-xs overflow-x-auto max-h-[380px] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

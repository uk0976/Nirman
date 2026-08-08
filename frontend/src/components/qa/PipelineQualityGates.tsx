"use client";

import { ShieldCheck, Terminal, Copy, Check } from "lucide-react";
import { useState } from "react";

interface PipelineProps {
  yamlContent: string;
  gates: string[];
}

export function PipelineQualityGates({ yamlContent, gates }: PipelineProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(yamlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6 font-mono text-xs">
      {/* CI/CD YAML */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <h3 className="font-bold text-white uppercase text-xs">GitHub Actions CI/CD Pipeline (.github/workflows/ci.yml)</h3>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 bg-white/5 hover:bg-white/10 text-gray-300 text-[11px] px-3 py-1.5 rounded-lg border border-white/10 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy YAML"}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-[#0D0F17] border border-white/5 text-gray-200 font-mono text-xs overflow-x-auto max-h-[300px] leading-relaxed">
          <code>{yamlContent}</code>
        </pre>
      </div>

      {/* Release Quality Gates */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-white uppercase text-xs">Production Release Quality Gates</h3>
        </div>
        <div className="space-y-2">
          {gates.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#151824] border border-white/5 flex items-center gap-2 text-gray-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-sans text-xs">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

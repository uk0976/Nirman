"use client";

import { useMemo } from "react";
import { Check, X } from "lucide-react";

interface PasswordStrengthProps {
  password?: string;
}

export function PasswordStrengthMeter({ password = "" }: PasswordStrengthProps) {
  const analysis = useMemo(() => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    };

    const passedCount = Object.values(checks).filter(Boolean).length;
    let score = 0;
    if (password.length > 0) {
      if (passedCount <= 1) score = 1;
      else if (passedCount === 2) score = 2;
      else if (passedCount === 3) score = 3;
      else if (passedCount === 4) score = 4;
    }

    return { checks, score };
  }, [password]);

  if (!password) return null;

  const labels = ["Weak", "Fair", "Good", "Strong"];
  const colors = ["bg-red-500", "bg-amber-500", "bg-indigo-500", "bg-emerald-500"];

  return (
    <div className="space-y-2 text-xs pt-1">
      {/* Strength Bar */}
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              step <= analysis.score ? colors[analysis.score - 1] : "bg-white/10"
            }`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono">
        <span className="text-gray-400">Password Strength:</span>
        <span className={analysis.score > 0 ? "font-bold text-white" : "text-gray-500"}>
          {analysis.score > 0 ? labels[analysis.score - 1] : "Enter password"}
        </span>
      </div>

      {/* Criteria Checklist */}
      <div className="grid grid-cols-2 gap-1 text-[10px] text-gray-400 font-mono pt-1">
        <div className="flex items-center gap-1">
          {analysis.checks.length ? <Check className="w-3 h-3 text-emerald-400" /> : <X className="w-3 h-3 text-gray-500" />}
          <span>8+ characters</span>
        </div>
        <div className="flex items-center gap-1">
          {analysis.checks.uppercase ? <Check className="w-3 h-3 text-emerald-400" /> : <X className="w-3 h-3 text-gray-500" />}
          <span>Uppercase letter</span>
        </div>
        <div className="flex items-center gap-1">
          {analysis.checks.number ? <Check className="w-3 h-3 text-emerald-400" /> : <X className="w-3 h-3 text-gray-500" />}
          <span>Number (0-9)</span>
        </div>
        <div className="flex items-center gap-1">
          {analysis.checks.special ? <Check className="w-3 h-3 text-emerald-400" /> : <X className="w-3 h-3 text-gray-500" />}
          <span>Special character</span>
        </div>
      </div>
    </div>
  );
}

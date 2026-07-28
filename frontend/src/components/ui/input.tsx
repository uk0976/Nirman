import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, type = "text", id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="flex flex-col gap-1 w-full text-left">
        <label htmlFor={id} className="text-xs font-semibold text-slate-400">
          {label}
        </label>
        <div className="relative">
          <input
            id={id}
            ref={ref}
            type={inputType}
            className={`w-full px-4 py-2.5 rounded-lg text-sm bg-black/40 border transition-all text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 ${
              error
                ? "border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/50"
                : "border-white/10 focus:border-indigo-500 focus:ring-indigo-500/50"
            } ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
        </div>
        {error && <span className="text-[11px] text-rose-400 mt-0.5">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

import { Palette, Sparkles, Type } from "lucide-react";

interface ColorsDict {
  background: string;
  surface: string;
  card: string;
  primary: string;
  success: string;
  warning: string;
  error: string;
  text_primary: string;
}

interface TokensProps {
  tokens: {
    colors: ColorsDict;
    typography: { font_sans: string; font_mono: string };
    spacing: Record<string, string>;
  };
}

export function DesignTokensViewer({ tokens }: TokensProps) {
  const colorSwatches = [
    { label: "Background", hex: tokens.colors.background },
    { label: "Surface", hex: tokens.colors.surface },
    { label: "Card / Panel", hex: tokens.colors.card },
    { label: "Primary Brand", hex: tokens.colors.primary },
    { label: "Success Accent", hex: tokens.colors.success },
    { label: "Warning Accent", hex: tokens.colors.warning },
    { label: "Error Accent", hex: tokens.colors.error }
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">Nirman Design System Tokens & Swatches</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Dark Glassmorphic Palette
        </span>
      </div>

      {/* Swatches */}
      <div className="space-y-2">
        <h4 className="font-bold text-gray-300 text-xs uppercase">Color Tokens</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {colorSwatches.map((c, i) => (
            <div key={i} className="p-3 rounded-xl bg-[#151824] border border-white/5 space-y-2">
              <div className="h-10 rounded-lg border border-white/10 shadow-inner" style={{ backgroundColor: c.hex }} />
              <div>
                <p className="font-bold text-white text-[11px]">{c.label}</p>
                <p className="text-[10px] text-indigo-400 font-mono">{c.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Tokens */}
      <div className="p-4 rounded-xl bg-[#151824] border border-white/5 space-y-2 font-sans">
        <div className="flex items-center gap-2 font-mono text-xs">
          <Type className="w-4 h-4 text-indigo-400" />
          <span className="font-bold text-white">Typography Standards</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs">
          <div>
            <span className="text-gray-400 font-mono text-[10px]">Primary Sans:</span>
            <p className="font-bold text-white">{tokens.typography.font_sans}</p>
          </div>
          <div>
            <span className="text-gray-400 font-mono text-[10px]">Code & Logs Mono:</span>
            <p className="font-bold text-indigo-300 font-mono">{tokens.typography.font_mono}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

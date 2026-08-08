import { FolderTree, FileText } from "lucide-react";

interface DocTreeViewerProps {
  hierarchy: string[];
}

export function DocTreeViewer({ hierarchy }: DocTreeViewerProps) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <FolderTree className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">Master Documentation Hierarchy (7 SDLC Domains)</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Single Source of Truth
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {hierarchy.map((item, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-[#151824] border border-white/5 flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="font-mono text-gray-200 text-xs font-bold">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

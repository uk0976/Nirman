import { ShieldCheck, CheckCircle2, Terminal } from "lucide-react";

interface BackendTestSuiteProps {
  specs: {
    unit_tests: string;
    repository_tests: string;
    api_security_tests: string;
  };
  dod: string[];
}

export function BackendTestSuiteViewer({ specs, dod }: BackendTestSuiteProps) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6 font-mono text-xs">
      {/* Test Pipelines */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <h3 className="font-bold text-white uppercase text-xs">Pytest Test Suite & Integration Pipelines</h3>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Pipeline Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
            <span className="font-bold text-indigo-300 text-xs">UNIT TESTS (Pytest)</span>
            <p className="text-[11px] text-gray-300 font-sans">{specs.unit_tests}</p>
          </div>
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-1">
            <span className="font-bold text-purple-300 text-xs">REPOSITORY INTEGRATION</span>
            <p className="text-[11px] text-gray-300 font-sans">{specs.repository_tests}</p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
            <span className="font-bold text-emerald-300 text-xs">API SECURITY & RBAC</span>
            <p className="text-[11px] text-gray-300 font-sans">{specs.api_security_tests}</p>
          </div>
        </div>
      </div>

      {/* Definition of Done */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-white uppercase text-xs">Backend Definition of Done (DoD) Checklist</h3>
        </div>
        <div className="space-y-2">
          {dod.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#151824] border border-white/5 flex items-center gap-2 text-gray-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-sans text-xs">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

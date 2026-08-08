import { Key, ShieldCheck, CheckCircle2 } from "lucide-react";

interface SecretsProps {
  dataProtection: {
    password_hashing: string;
    field_encryption: string;
    transit_encryption: string;
  };
  owasp: {
    sast_scanner: string;
    dast_scanner: string;
    dependency_scanner: string;
  };
}

export function SecretsEncryptionViewer({ dataProtection, owasp }: SecretsProps) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6 font-mono text-xs">
      {/* Data Protection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-indigo-400" />
            <h3 className="font-bold text-white uppercase text-xs">Data Protection & Encryption Standards</h3>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            AES-256-GCM / Argon2id
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
            <span className="font-bold text-indigo-300 text-xs">PASSWORD HASHING</span>
            <p className="text-[11px] text-gray-300 font-sans">{dataProtection.password_hashing}</p>
          </div>
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-1">
            <span className="font-bold text-purple-300 text-xs">FIELD ENCRYPTION</span>
            <p className="text-[11px] text-gray-300 font-sans">{dataProtection.field_encryption}</p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
            <span className="font-bold text-emerald-300 text-xs">TRANSIT ENCRYPTION</span>
            <p className="text-[11px] text-gray-300 font-sans">{dataProtection.transit_encryption}</p>
          </div>
        </div>
      </div>

      {/* OWASP Audit Results */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-white uppercase text-xs">OWASP Vulnerability Audit Results</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-[#151824] border border-white/5 space-y-1">
            <span className="font-bold text-gray-300 text-xs">SAST Scanner</span>
            <p className="text-[11px] text-emerald-300 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{owasp.sast_scanner}</span>
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#151824] border border-white/5 space-y-1">
            <span className="font-bold text-gray-300 text-xs">DAST Scanner</span>
            <p className="text-[11px] text-emerald-300 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{owasp.dast_scanner}</span>
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#151824] border border-white/5 space-y-1">
            <span className="font-bold text-gray-300 text-xs">Dependency Scanner</span>
            <p className="text-[11px] text-emerald-300 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{owasp.dependency_scanner}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

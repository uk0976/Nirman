import { Cloud, Server, Database, Lock } from "lucide-react";

interface TerraformSpec {
  cloud_provider: string;
  compute_service: string;
  database_service: string;
  cache_service: string;
  object_storage: string;
}

interface TerraformBlueprintViewerProps {
  blueprint: TerraformSpec;
}

export function TerraformBlueprintViewer({ blueprint }: TerraformBlueprintViewerProps) {
  const cloudResources = [
    { title: "Cloud Provider", val: blueprint.cloud_provider, icon: Cloud, color: "text-indigo-400" },
    { title: "Container Compute Cluster", val: blueprint.compute_service, icon: Server, color: "text-purple-400" },
    { title: "Managed Relational Database", val: blueprint.database_service, icon: Database, color: "text-emerald-400" },
    { title: "Distributed Cache Cluster", val: blueprint.cache_service, icon: Server, color: "text-amber-400" },
    { title: "Encrypted Object Storage", val: blueprint.object_storage, icon: Lock, color: "text-cyan-400" }
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Cloud className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">Terraform Infrastructure-as-Code (IaC) Cloud Blueprint</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Terraform 1.6+ Reproducible
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {cloudResources.map((res, idx) => {
          const Icon = res.icon;
          return (
            <div key={idx} className="p-4 rounded-xl bg-[#151824] border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${res.color}`} />
                <span className="font-bold text-white text-xs">{res.title}</span>
              </div>
              <p className="text-[11px] text-gray-300 font-sans leading-tight pt-1">{res.val}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

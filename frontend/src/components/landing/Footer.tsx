import Link from "next/link";
import { Sparkles, ShieldCheck, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#07090E] pt-16 pb-12 text-xs text-gray-400">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        {/* Col 1 Brand */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 p-[1px] flex items-center justify-center shadow-glow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-base tracking-tight text-white">NIRMAN</span>
          </div>
          <p className="text-gray-400 max-w-sm leading-relaxed text-xs">
            Nirman is a production-grade AI Software Engineering Platform. 14 specialized AI roles collaborate across the 20 SDLC phases to build production-ready software.
          </p>
          <div className="flex items-center gap-3 text-gray-400">
            <a href="https://github.com/uk0976/Nirman" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-[#151824] hover:text-white transition">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-[#151824] hover:text-white transition">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-[#151824] hover:text-white transition">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2 Product */}
        <div className="space-y-3">
          <h4 className="font-bold text-gray-200 uppercase tracking-wider font-mono text-[11px]">Product</h4>
          <ul className="space-y-2">
            <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
            <li><Link href="/warroom" className="hover:text-white transition">AI War Room</Link></li>
            <li><Link href="/agents" className="hover:text-white transition">AI Employee Roster</Link></li>
            <li><Link href="/workflow" className="hover:text-white transition">20 SDLC Engine</Link></li>
            <li><Link href="/artifacts" className="hover:text-white transition">Artifacts & PRDs</Link></li>
          </ul>
        </div>

        {/* Col 3 Architecture */}
        <div className="space-y-3">
          <h4 className="font-bold text-gray-200 uppercase tracking-wider font-mono text-[11px]">Engineering</h4>
          <ul className="space-y-2 font-mono text-[11px]">
            <li className="text-gray-500">Next.js 15 App Router</li>
            <li className="text-gray-500">FastAPI Async Python</li>
            <li className="text-gray-500">3NF PostgreSQL & pgvector</li>
            <li className="text-gray-500">Docker Compose & Nginx</li>
          </ul>
        </div>

        {/* Col 4 Company & Legal */}
        <div className="space-y-3">
          <h4 className="font-bold text-gray-200 uppercase tracking-wider font-mono text-[11px]">Company & Legal</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">About Nirman</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition">SOC2 & ISO 27001</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 font-mono">
        <p>© 2026 Nirman AI Platform. All rights reserved.</p>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Enterprise Encrypted & SOC2 Compliant</span>
        </div>
      </div>
    </footer>
  );
}

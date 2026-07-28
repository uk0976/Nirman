"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Cpu, Layers, Shield, Workflow, Settings, Activity, 
  CheckCircle, MessageSquare, TrendingUp, Users, Check, 
  HelpCircle, ArrowRight, Globe, FileText, 
  Database, Code, Terminal, ChevronDown, CheckSquare, Award
} from "lucide-react";

export default function Home() {
  // Timeline Active Stage state
  const [activeTimelineStage, setActiveTimelineStage] = useState(0);

  // FAQ Accordion states
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Terminal Simulated logs state
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Initializing Nirman Autonomous Pipeline...",
  ]);
  const logTerminalRef = useRef<HTMLDivElement>(null);

  // War Room Simulated state variables
  const [warRoomStep, setWarRoomStep] = useState(0);
  const [consensusRatio, setConsensusRatio] = useState(65);
  const [voteApproved, setVoteApproved] = useState<boolean | null>(null);

  // 12 Core AI Employee data
  const aiEmployees = [
    { name: "Alice", role: "CEO", dept: "Management", desc: "Oversees company direction, client deliverables, and approves final sprints.", avatar: "👩‍💼", accent: "from-blue-500 to-indigo-500" },
    { name: "Bob", role: "Product Manager", dept: "Product", desc: "Drafts detailed requirements specs (PRD) and coordinates developer tasks.", avatar: "👨‍💻", accent: "from-indigo-500 to-purple-500" },
    { name: "Charlie", role: "Software Architect", dept: "Architecture", desc: "Designs complex system layouts, microservice boundaries, and REST APIs.", avatar: "👨‍🔬", accent: "from-purple-500 to-pink-500" },
    { name: "Diana", role: "UI/UX Designer", dept: "Design", desc: "Crafts premium glassmorphic mockups and Tailwind styling variables.", avatar: "👩‍🎨", accent: "from-pink-500 to-rose-500" },
    { name: "Evan", role: "Frontend Engineer", dept: "Frontend", desc: "Generates high-performance Next.js and Tailwind client interfaces.", avatar: "👨‍💻", accent: "from-rose-500 to-orange-500" },
    { name: "Fiona", role: "Backend Engineer", dept: "Backend", desc: "Develops clean database wrappers and asynchronous FastAPI endpoints.", avatar: "👩‍💻", accent: "from-orange-500 to-amber-500" },
    { name: "George", role: "Database Engineer", dept: "Database", desc: "Manages robust PostgreSQL schema definitions and index optimizations.", avatar: "👨‍🔧", accent: "from-amber-500 to-yellow-500" },
    { name: "Hope", role: "AI Engineer", dept: "AI", desc: "Tunes prompt engineering chains and integrates pluggable LLM configurations.", avatar: "🤖", accent: "from-teal-500 to-cyan-500" },
    { name: "Ian", role: "QA Engineer", dept: "Quality Assurance", desc: "Implements automated pytest suites to guard system endpoints.", avatar: "🕵️‍♂️", accent: "from-cyan-500 to-blue-500" },
    { name: "Jack", role: "Security Engineer", dept: "Security", desc: "Audits OWASP vulnerabilities and reviews credentials configurations.", avatar: "🛡️", accent: "from-red-500 to-orange-500" },
    { name: "Kate", role: "DevOps Engineer", dept: "DevOps", desc: "Builds lightweight Docker containers and schedules workflow executions.", avatar: "🚀", accent: "from-emerald-500 to-teal-500" },
    { name: "Leo", role: "Documentation Engineer", dept: "Documentation", desc: "Generates API specifications, guides, and comprehensive README files.", avatar: "📝", accent: "from-gray-500 to-slate-500" }
  ];

  // How Nirman Works stages details
  const pipelineStages = [
    { title: "Requirement Analysis", agent: "Bob (PM)", output: "PRD Specs Document", description: "Product Manager gathers requirements, refines user stories, and parses scope constraints." },
    { title: "Project Planning", agent: "Alice (CEO)", output: "Milestones Schedule", description: "Generates execution plan, tech stacks selection, and complexity sizing estimations." },
    { title: "Architecture", agent: "Charlie (Architect)", output: "Folder Blueprint Specs", description: "Designs folder structure layouts, system boundaries, and API interfaces." },
    { title: "Database Design", agent: "George (Database)", output: "PostgreSQL Schema DDL", description: "Designs ERD models and indices configuration optimized for concurrent reads." },
    { title: "API Development", agent: "Fiona (Backend)", output: "FastAPI Routing Modules", description: "Constructs async controller routes and response verification schemas." },
    { title: "Frontend Mocking", agent: "Evan (Frontend)", output: "Vercel Next.js Pages", description: "Assembles stateful interface screens using Tailwind utility frameworks." },
    { title: "Testing Integration", agent: "Ian (QA)", output: "Pytest Test Suite Logs", description: "Automates test runs to guard against regression bugs." },
    { title: "Security Scan", agent: "Jack (Security)", output: "OWASP Vulnerability Audit", description: "Sanitizes queries inputs and inspects authorization tokens parameters." },
    { title: "Documentation", agent: "Leo (Docs)", output: "Swagger & Markdown Guides", description: "Generates developer instructions, API schemas, and deployment guidance." },
    { title: "Delivery Release", agent: "Kate (DevOps)", output: "Docker Deployment Bundle", description: "Packages modules into containers, completing the pipeline flow." }
  ];

  // Interactive Terminal Simulated Outputs
  useEffect(() => {
    const pipelineLogs = [
      "[PLANNER] Sizing scope... Complexity set to High.",
      "[PM] PRD requirements successfully formulated.",
      "[COORDINATOR] Spawning AI War Room session for Architecture review...",
      "[WAR ROOM] Alice (CEO) joined. Charlie (Architect) joined. Jack (Security) joined.",
      "[WAR ROOM] Charlie: Suggesting layered microservices with SQLAlchemy async backend.",
      "[WAR ROOM] Jack: Ensure password hashes use argon2id algorithms.",
      "[WAR ROOM] Consensus ratio reached 88%. CEO approved. Closing session.",
      "[ARCHITECT] System structural layout generated.",
      "[DB] george: SQLite connection engine established.",
      "[BACKEND] Fiona: Added /api/v1/auth controller endpoints.",
      "[FRONTEND] Evan: Added glassmorphism dashboard UI pages.",
      "[QA] Ian: Executing backend/tests... 40 tests passed successfully.",
      "[SECURITY] Jack: Static analysis verified. SQL Injection risk: 0%.",
      "[DOCS] Leo: Swagger configuration docs exported to index.html.",
      "[DEVOPS] Kate: Packaging Docker image... nirman-backend:latest ready.",
      "[SYSTEM] Autonomous execution run completed successfully. Status: Completed."
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < pipelineLogs.length) {
        setLogs(prev => [...prev, pipelineLogs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        // Reset terminal logs loop
        setLogs(["[SYSTEM] Initializing Nirman Autonomous Pipeline..."]);
        currentLogIndex = 0;
      }
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom of terminal whenever logs update
  useEffect(() => {
    if (logTerminalRef.current) {
      logTerminalRef.current.scrollTop = logTerminalRef.current.scrollHeight;
    }
  }, [logs]);

  // Simulated War Room Discussion Chat loop
  const warRoomDebates = [
    { role: "CEO", message: "Welcome team. Let's debate on the production database choices for the new Sprint.", type: "Suggestion" },
    { role: "Software Architect", message: "I recommend PostgreSQL over SQLite to support concurrent transactions and jsonb columns.", type: "Proposal" },
    { role: "Database Engineer", message: "Agreed. PostgreSQL indexes will allow faster lookup rates on execution staging tables.", type: "Suggestion" },
    { role: "QA Engineer", message: "I have reservations. Do we have connection pools verified in pytest?", type: "Concern" },
    { role: "CEO", message: "If Fiona sets up connection pooling, we can proceed. Calling consensus votes.", type: "Proposal" }
  ];

  useEffect(() => {
    const debateInterval = setInterval(() => {
      setWarRoomStep(prev => {
        const next = (prev + 1) % warRoomDebates.length;
        // Update consensus score dynamically
        if (next === 1) setConsensusRatio(50);
        else if (next === 2) setConsensusRatio(75);
        else if (next === 3) setConsensusRatio(65);
        else if (next === 4) {
          setConsensusRatio(90);
          setVoteApproved(true);
        } else {
          setConsensusRatio(35);
          setVoteApproved(null);
        }
        return next;
      });
    }, 4500);

    return () => clearInterval(debateInterval);
  }, []);

  return (
    <div className="bg-[#030303] text-slate-100 min-h-screen relative font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Background Grids and glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] pointer-events-none" />
      <div className="absolute top-[-10%] left-[10%] w-[50%] h-[50%] radial-glow opacity-[0.5] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] cyan-radial-glow opacity-[0.3] pointer-events-none" />

      {/* 1. STICKY NAVIGATION BAR */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#030303]/80 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo Branding */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              निर्माण | Nirman
            </span>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            {["Home", "Features", "How it Works", "AI Employees", "Pricing", "FAQ"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="hover:text-slate-100 transition-colors relative group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-indigo-500 transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Nav CTAs */}
          <div className="flex items-center gap-4">
            <a href="#login" className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors">
              Login
            </a>
            <a 
              href="#get-started" 
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)]"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section id="home" className="max-w-7xl mx-auto px-6 pt-24 pb-20 relative text-center">
        
        {/* Glow center */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-300 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            From Vision to Production, Powered by AI
          </div>

          {/* Large Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-white">
            Autonomous AI Software <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Development Company
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-slate-400 font-normal leading-relaxed mb-10 max-w-2xl mx-auto">
            Nirman is a collaborative Multi-Agent platform orchestrating specialized AI employees. 
            Provide requirements, review designs in the AI War Room, and watch your project deploy automatically.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <a 
              href="#get-started" 
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-sm font-semibold rounded-lg shadow-lg shadow-indigo-600/30 hover:opacity-90 transition-all flex items-center justify-center gap-2 group text-white"
            >
              Start Building <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#watch-demo" 
              className="w-full sm:w-auto px-8 py-4 border border-white/10 hover:border-white/20 text-sm font-semibold rounded-lg bg-white/5 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" /> Watch Demo
            </a>
          </div>

          {/* Interactive Visual Preview (Collaboration Sandbox) */}
          <div className="glass-panel p-6 border border-white/10 shadow-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            
            {/* Window bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono text-slate-500 ml-2">nirman-autonomous-terminal</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  PIPELINE RUNNING
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Graphic Sandbox - Nodes Graph */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center bg-[#070708] border border-white/[0.05] rounded-xl p-8 min-h-[300px] relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.2]" />
                
                {/* Simulated Nodes Representation */}
                <div className="grid grid-cols-3 gap-8 relative z-10 w-full max-w-md">
                  {[
                    { name: "Alice (CEO)", role: "Management", avatar: "👩‍💼", active: warRoomStep === 0 || warRoomStep === 4 },
                    { name: "Bob (PM)", role: "Product", avatar: "Bob", active: false },
                    { name: "Charlie (Arch)", role: "Architecture", avatar: "Charlie", active: warRoomStep === 1 },
                    { name: "Fiona (Backend)", role: "Backend", avatar: "Fiona", active: false },
                    { name: "George (DB)", role: "Database", avatar: "George", active: warRoomStep === 2 },
                    { name: "Ian (QA)", role: "QA", avatar: "Ian", active: warRoomStep === 3 }
                  ].map((node, i) => (
                    <div 
                      key={i} 
                      className={`flex flex-col items-center p-3 rounded-lg border transition-all duration-500 ${
                        node.active 
                          ? "border-indigo-500 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.25)] scale-105" 
                          : "border-white/[0.05] bg-black/40"
                      }`}
                    >
                      <span className="text-2xl mb-1">
                        {node.name.includes("Alice") ? "👩‍💼" : "🤖"}
                      </span>
                      <span className="text-[11px] font-bold text-slate-200">{node.name.split(" ")[0]}</span>
                      <span className="text-[9px] text-slate-500">{node.role}</span>
                    </div>
                  ))}
                </div>

                {/* Status Badge */}
                <div className="absolute bottom-4 left-4 bg-black/60 border border-white/5 px-3 py-1 rounded text-[10px] font-mono text-indigo-300">
                  Active Room debate: Stage 5 - Tech Stack Selection
                </div>
              </div>

              {/* Log Panel */}
              <div className="lg:col-span-5 flex flex-col bg-[#050506] border border-white/[0.05] rounded-xl p-4 min-h-[300px]">
                <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2 mb-3">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-xs font-mono font-bold text-slate-300">Execution Logs</span>
                </div>
                <div 
                  ref={logTerminalRef}
                  className="flex-1 font-mono text-[11px] text-slate-400 overflow-y-auto space-y-2 h-[220px] pr-1"
                >
                  <AnimatePresence>
                    {logs.map((log, i) => {
                      const isSystem = log.includes("[SYSTEM]");
                      const isWarning = log.includes("[WAR ROOM]");
                      const isQA = log.includes("[QA]");
                      return (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className={`${
                            isSystem 
                              ? "text-cyan-400" 
                              : isWarning 
                                ? "text-indigo-400" 
                                : isQA 
                                  ? "text-emerald-400" 
                                  : "text-slate-400"
                          }`}
                        >
                          {log}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUSTED BY */}
      <section className="max-w-7xl mx-auto px-6 py-10 border-t border-white/[0.04] border-b border-white/[0.04]">
        <div className="text-center text-xs font-mono tracking-wider text-slate-500 uppercase mb-8">
          Orchestrating Next-Gen Software Organizations
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center opacity-40 grayscale contrast-200">
          {["Vercel", "GitHub", "Stripe", "Linear", "Cursor", "Notion"].map((name) => (
            <span key={name} className="text-xl font-bold tracking-tight text-slate-400 select-none">
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* 4. FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Designed to Operate Like a <br />
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Real Software Enterprise</span>
          </h2>
          <p className="text-slate-400 text-base">
            Nirman combines clean domain boundaries with robust workflow timing gates to automate coding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Cpu, title: "AI Company", desc: "Define departments, skill trees, and capability blocks mapping to individual specialized agents." },
            { icon: MessageSquare, title: "AI War Room", desc: "Collaborate, review system designs, debate choices, and cast consensus votes before coding." },
            { icon: Layers, title: "Autonomous Planning", desc: "Evaluate text requirements to output technology stacks recommendations, milestones, and effort schedules." },
            { icon: Users, title: "AI Employees", desc: "Grid of 12 specialists assigned roles from CEO and Product Manager to security engineers and database specialists." },
            { icon: Workflow, title: "Workflow Engine", desc: "Maintains timing gates and sequential dependencies, pausing flows automatically for War Room sessions." },
            { icon: FileText, title: "Artifact Generation", desc: "Stores DDL schemas, Next.js client screens, FastAPI modules, test reports, and READMEs in local directories." },
            { icon: Activity, title: "Real-time Collaboration", desc: "WebSocket channels stream active stages, log outputs, voting meters, and progress updates." },
            { icon: TrendingUp, title: "Project Analytics", desc: "Measure latency counts, token cost parameters, execution durations, and approvals metrics." }
          ].map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div key={i} className="glass-card p-6 rounded-2xl flex flex-col h-full">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-slate-100">{feat.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed flex-1">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. HOW NIRMAN WORKS (Interactive Timeline) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/[0.04]">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            The Autonomous Staging Pipeline
          </h2>
          <p className="text-slate-400 text-sm">
            Watch how Nirman advances from raw functional specifications to verified production deliverables.
          </p>
        </div>

        {/* Interactive Timeline Mappings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Stage list */}
          <div className="lg:col-span-5 space-y-3">
            {pipelineStages.map((stage, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTimelineStage(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                  activeTimelineStage === idx
                    ? "border-indigo-500 bg-indigo-500/10 text-white"
                    : "border-white/[0.05] bg-black/40 text-slate-400 hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono ${
                    activeTimelineStage === idx ? "bg-indigo-500 text-white" : "bg-white/[0.05]"
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="text-sm font-semibold">{stage.title}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                  activeTimelineStage === idx ? "-rotate-90 text-indigo-400" : "text-slate-600"
                }`} />
              </button>
            ))}
          </div>

          {/* Stage details panel */}
          <div className="lg:col-span-7 glass-panel p-8 border border-white/10 sticky top-24 min-h-[350px] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-indigo-500/10 text-indigo-300 text-xs font-mono mb-6">
                STAGE {activeTimelineStage + 1} OF 10
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {pipelineStages[activeTimelineStage].title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {pipelineStages[activeTimelineStage].description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/[0.06]">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Assigned Agent</span>
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  {pipelineStages[activeTimelineStage].agent}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Expected Deliverable</span>
                <span className="text-sm font-semibold text-cyan-400 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  {pipelineStages[activeTimelineStage].output}
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. MEET YOUR AI TEAM */}
      <section id="ai-employees" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/[0.04]">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Meet Your AI Specialists
          </h2>
          <p className="text-slate-400 text-sm">
            Nirman features 12 specialized agents, each with dedicated skills, capabilities, and tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiEmployees.map((emp, i) => (
            <div key={i} className="glass-panel p-6 border border-white/[0.06] flex flex-col justify-between hover:border-white/15 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{emp.avatar}</span>
                  <span className="text-[10px] font-mono bg-white/[0.04] px-2 py-0.5 rounded text-slate-400">
                    {emp.dept}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{emp.name}</h3>
                <p className="text-xs font-mono text-indigo-400 mb-4">{emp.role}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{emp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. AI WAR ROOM PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/[0.04]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-purple-500/10 text-purple-300 text-xs font-mono">
              COLLABORATION ENGINE
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              The AI War Room Discussion
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              When design questions or security constraints arise, the pipeline triggers a War Room session. 
              Agents analyze specs, propose changes, and vote. The CEO has final approval override power.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Weighted voting logic (CEO has weight 1.5)
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Consensus triggers at &gt;= 70% approval
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Automatic pause/resume workflow timing
              </div>
            </div>
          </div>

          {/* Interactive War Room Simulated Panel */}
          <div className="lg:col-span-7 glass-panel p-6 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-slate-200">Active Session: PostgreSQL vs SQLite</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">Consensus:</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 text-xs font-mono font-bold">
                  {consensusRatio}%
                </span>
              </div>
            </div>

            {/* Chat Box */}
            <div className="space-y-4 mb-6 min-h-[200px] flex flex-col justify-end">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={warRoomStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/[0.02] border border-white/[0.04] p-4 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-indigo-400">
                      {warRoomDebates[warRoomStep].role}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {warRoomDebates[warRoomStep].type}
                    </span>
                  </div>
                  <p className="text-slate-200 text-xs leading-relaxed">
                    "{warRoomDebates[warRoomStep].message}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Consensus Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>Agreement Threshold</span>
                <span>70% Required</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/[0.04] overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
                  style={{ width: `${consensusRatio}%` }}
                />
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-[10px] font-mono text-slate-500">Status: {consensusRatio >= 70 ? "Consensus reached" : "Debating"}</span>
                {voteApproved && (
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                    CEO overridden &amp; Approved
                  </span>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. WORKFLOW VISUALIZATION */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/[0.04] text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            The Flow Orchestrator
          </h2>
          <p className="text-slate-400 text-sm">
            Nirman maintains sequential task allocations, updating percentages, timelines, and dependencies automatically.
          </p>
        </div>

        {/* Animated flow path */}
        <div className="relative glass-panel p-8 border border-white/10 max-w-4xl mx-auto overflow-x-auto">
          <div className="flex justify-between items-center min-w-[700px] gap-4 relative">
            
            {/* Flow line */}
            <div className="absolute top-[35px] inset-x-0 h-1 bg-white/[0.04] -z-10" />
            <div className="absolute top-[35px] left-0 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 -z-10 transition-all duration-[3000ms]" style={{ width: "70%" }} />

            {[
              { title: "Planning", desc: "100% complete", icon: CheckCircle, active: true },
              { title: "Design", desc: "100% complete", icon: CheckCircle, active: true },
              { title: "Development", desc: "In progress", icon: Activity, active: true },
              { title: "Testing", desc: "Queue checks", icon: Settings, active: false },
              { title: "Deployment", desc: "Pending stage", icon: Cpu, active: false }
            ].map((node, i) => {
              const Icon = node.icon;
              return (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all ${
                    node.desc.includes("100%") 
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" 
                      : node.desc.includes("progress") 
                        ? "border-indigo-500 bg-indigo-500/10 text-indigo-400 animate-pulse" 
                        : "border-white/10 bg-black/40 text-slate-500"
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-200 mt-4">{node.title}</span>
                  <span className="text-[10px] font-mono text-slate-500 mt-1">{node.desc}</span>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* 9. STATISTICS */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/[0.04] border-b border-white/[0.04]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { metric: "4,820+", label: "Projects Completed" },
            { metric: "142,900+", label: "AI Pipeline Executions" },
            { metric: "890,500+", label: "Artifacts Archived" },
            { metric: "12 / 12", label: "Specialists Online" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-2 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                {stat.metric}
              </h3>
              <p className="text-xs font-mono text-slate-500 tracking-wider uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. PRICING */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Plans for Teams of All Sizes
          </h2>
          <p className="text-slate-400 text-sm">
            Scale your multi-agent organization with execution runtime credits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Starter", price: "$49", desc: "For builders and freelancers prototyping ideas.", features: ["2 Projects Slots", "10,000 token limit / query", "5 Execution runs / mo", "Core 6 Agents access", "Standard support"] },
            { name: "Professional", price: "$199", desc: "For scaling agencies needing complete workflows.", features: ["Unlimited Projects Slots", "100,000 token limit / query", "50 Execution runs / mo", "All 12 Agents profiles", "AI War Room access", "Priority Slack support"], featured: true },
            { name: "Enterprise", price: "Custom", desc: "For enterprises requiring isolated private LLM networks.", features: ["Infinite Projects Slots", "Infinite token bounds", "Dedicated private nodes", "Custom Agents trees", "On-Premises deployment", "SLA contract guarantee"] }
          ].map((plan, i) => (
            <div 
              key={i} 
              className={`glass-panel p-8 border rounded-2xl relative flex flex-col justify-between ${
                plan.featured ? "border-indigo-500 bg-[#090910]/80" : "border-white/[0.06]"
              }`}
            >
              {plan.featured && (
                <span className="absolute top-4 right-4 bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  RECOMMENDED
                </span>
              )}
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-slate-500 mb-6">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-xs text-slate-500">/month</span>}
                </div>
                
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-400 leading-normal">
                      <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full py-3 rounded-lg text-xs font-bold transition-all ${
                plan.featured 
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30" 
                  : "border border-white/10 hover:border-white/20 text-slate-200 bg-white/5"
              }`}>
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 11. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/[0.04]">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Loved by Builders
          </h2>
          <p className="text-slate-400 text-sm">
            Discover how tech leaders use Nirman to move from vision to production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { quote: "Nirman turned our PRD into a deployed database structure and clean FastAPI service in 15 minutes. The War Room is an incredible collaboration engine.", author: "Marcus Thompson", title: "VP of Engineering, Vercel Stack" },
            { quote: "Having a dedicated AI security engineer audit the backend database routes automatically saved us weeks of audit testing. Highly recommended.", author: "Sophia Lopez", title: "Technical Founder, SafeGuard API" },
            { quote: "The Multi-Agent coordinator simulates a real software meeting. It's like having a full senior developer team working for you on demand.", author: "Daniel Chen", title: "Lead Architect, FlowData Solutions" }
          ].map((test, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl flex flex-col justify-between">
              <p className="text-slate-300 text-xs italic leading-relaxed mb-6">
                "{test.quote}"
              </p>
              <div>
                <h4 className="text-sm font-bold text-white">{test.author}</h4>
                <p className="text-[10px] font-mono text-indigo-400">{test.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. FAQ ACCORDION */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-24 border-t border-white/[0.04]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {[
            { q: "Is Nirman running actual LLM calls under the hood?", a: "Yes. Nirman features a provider-independent AI intelligence platform integrated with OpenAI's Responses API and Codex models routing pipelines." },
            { q: "Can I customize the agent roles and department skill sets?", a: "Absolutely. The AI Company framework lets you define custom specialties, tool access permissions, and workload sizing." },
            { q: "How does the AI War Room consensus model resolve disputes?", a: "Specialist votes are compiled by the consensus engine. If any agent objects with a Concern or Reject, the conflict is logged and consensus ratio adjustments are calculated. The CEO has executive veto override." },
            { q: "What database does Nirman support for project metadata?", a: "The backend is fully designed using asynchronous PostgreSQL engine wrappers and SQLAlchemy ORM models." }
          ].map((faq, i) => (
            <div key={i} className="border-b border-white/[0.08] pb-4">
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full flex items-center justify-between text-left py-3 font-semibold text-sm hover:text-indigo-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeFaq === i ? "rotate-180 text-indigo-400" : "text-slate-500"}`} />
              </button>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-slate-400 leading-relaxed pt-2 pb-3">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#020202] py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">निर्माण | Nirman</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              From Vision to Production, Powered by AI. Build software autonomously.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://github.com" className="text-slate-500 hover:text-white transition-colors" aria-label="GitHub">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
              <a href="https://twitter.com" className="text-slate-500 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://nirman.ai" className="text-slate-500 hover:text-white transition-colors" aria-label="Website">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GitHub Repository</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API References</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security Disclosure</a></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <span>&copy; {new Date().getFullYear()} निर्माण | Nirman. All rights reserved.</span>
          <span>Designed for modern autonomous developer networks.</span>
        </div>
      </footer>

    </div>
  );
}

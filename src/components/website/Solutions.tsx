import React, { useState, useEffect } from 'react';
import { 
  Building2, Bot, PhoneCall, DollarSign, Shield, Globe, 
  Check, Play, ArrowRight, Activity, HelpCircle, Briefcase, 
  Cpu, Users, Milestone, Landmark, ShieldCheck, Mail, Send,
  ArrowLeft, Coins, CheckCircle2, ChevronRight, FileSpreadsheet,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ALL_SOLUTIONS_DATA, SOLUTION_CATEGORIES, getSolutionIcon, Solution 
} from '../../data/solutions';
import { PremiumCardWrapper } from '../PremiumCardWrapper';

interface SolutionsProps {
  onLoginClick: () => void;
  onStartTrialClick: () => void;
  solutionsList: any[];
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export default function Solutions({
  onLoginClick,
  onStartTrialClick,
  solutionsList,
  currentPath = "/solutions",
  onNavigate
}: SolutionsProps) {
  const [activeTab, setActiveTab] = useState<'layer' | 'industry'>('layer');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  
  // Lead form states
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    company: "",
    scope: "",
    nodesCount: "1-10"
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Sync to top on path changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentPath]);

  // Routing parsing: /solutions/erp, /solutions/crm, etc.
  const routeParts = currentPath.split('/');
  const solutionSubId = routeParts[2]; // can be undefined or specific ID

  const matchedSol = solutionSubId ? ALL_SOLUTIONS_DATA[solutionSubId] : undefined;
  
  const activeSolutionData = matchedSol ? {
    id: matchedSol.slug,
    name: matchedSol.title,
    tagline: matchedSol.tagline,
    category: matchedSol.category,
    iconName: matchedSol.icon,
    description: matchedSol.description,
    heroTitle: matchedSol.heroTitle || matchedSol.title,
    overview: matchedSol.overview,
    features: matchedSol.features,
    benefits: matchedSol.benefits,
    industries: matchedSol.industries,
    workflow: matchedSol.workflow,
    faqs: matchedSol.faqs,
    featured: matchedSol.featured
  } : undefined;

  // Handle lead submit
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setLeadForm({ name: "", email: "", company: "", scope: "", nodesCount: "1-10" });
      setFormSubmitted(false);
    }, 4500);
  };

  const handleBackToGrid = () => {
    if (onNavigate) onNavigate('/solutions');
  };

  const handleSolutionRedirect = (id: string) => {
    let cleanId = id.toLowerCase();
    if (cleanId.startsWith('sol-')) {
      cleanId = cleanId.substring(4);
    }
    if (onNavigate) {
      // Safely route to the correct slug from unified database
      const matched = Object.values(ALL_SOLUTIONS_DATA).find(
        s => s.slug === cleanId || s.id === cleanId || s.slug.startsWith(cleanId) || cleanId.startsWith(s.slug)
      );
      if (matched) {
        onNavigate(`/solutions/${matched.slug}`);
      } else {
        onNavigate(`/solutions/${cleanId}`);
      }
    }
  };

  // ━━━━━━━━━━━━━━━━ VIEW 1: RENDER DEDICATED SOLUTION PAGE ━━━━━━━━━━━━━━━━
  if (activeSolutionData) {
    const sol = activeSolutionData;
    const CategoryIcon = getSolutionIcon(sol.iconName);

    return (
      <div className="animate-fadeIn min-h-screen text-zinc-300 text-left bg-[#020205] relative" id={`solutionpage-${sol.id}`}>
        
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#110406_1px,transparent_1px),linear-gradient(to_bottom,#110406_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25 pointer-events-none" />
        <div className="absolute top-[20%] right-0 w-80 h-80 bg-red-600/5 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[30%] left-[-10%] w-96 h-96 bg-red-800/5 rounded-full filter blur-[150px] pointer-events-none" />

        {/* Dynamic Navigation Trail */}
        <div className="max-w-7xl mx-auto px-6 pt-24 relative z-10" id="solution-breadcrumb">
          <button
            onClick={handleBackToGrid}
            className="group inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-[#FF3D4F] transition-colors uppercase font-bold cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Solutions Catalog</span>
          </button>
        </div>

        {/* 1. HERO SECTION */}
        <section className="relative pt-12 pb-24 px-6 overflow-hidden" id="solution-hero">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF3D4F]/10 border border-[#FF3D4F]/20 text-[#FF3D4F] rounded-full text-[10px] font-bold tracking-widest uppercase">
                <CategoryIcon className="w-3.5 h-3.5" />
                <span>Eurosia Core System</span>
                <span className="w-1 h-1 rounded-full bg-[#FF3D4F] animate-pulse" />
                <span>{sol.category}</span>
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white uppercase">
                {sol.heroTitle}
              </h1>

              <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed max-w-xl">
                {sol.tagline} {sol.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={onStartTrialClick}
                  className="px-6 py-3 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white text-xs font-bold font-mono tracking-wider transition-all cursor-pointer uppercase rounded shadow-lg shadow-[#FF3D4F]/20 hover:scale-[1.02] active:scale-95 flex items-center gap-2"
                >
                  <span>Deploy Trial Sandbox</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#lead-form-anchor"
                  className="px-6 py-3 bg-zinc-950 border border-zinc-900 hover:border-[#FF3D4F]/40 text-zinc-300 text-xs font-bold font-mono tracking-wider transition-all cursor-pointer uppercase rounded"
                >
                  Request Technical Arch Diagram
                </a>
              </div>
            </div>

            {/* Hero Right Graphic Card: Core Telemetry Matrix */}
            <div className="lg:col-span-5 relative" id="solution-dashboard-mockup">
              <div className="relative bg-zinc-950/80 border border-zinc-900 rounded-2xl p-6 shadow-2xl backdrop-blur-md overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-[#FF3D4F] to-red-800" />
                
                {/* Header Mock */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-900 text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-wider">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
                    <span>SECURE NODE STATUS: ONLINE</span>
                  </div>
                  <span>EUROSIA FRAME v7.4</span>
                </div>

                {/* Simulated Telemetry Stats */}
                <div className="py-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
                      <span className="block text-[9px] font-mono text-zinc-500 uppercase font-bold">REDUNDANCY RATIO</span>
                      <span className="text-lg font-black text-white font-mono">99.999%</span>
                    </div>
                    <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
                      <span className="block text-[9px] font-mono text-zinc-500 uppercase font-bold">LATENCY PROFILE</span>
                      <span className="text-lg font-black text-[#FF3D4F] font-mono">&lt;45ms API</span>
                    </div>
                  </div>

                  <div className="bg-[#FF3D4F]/5 border border-[#FF3D4F]/25 p-4 rounded-xl flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#FF3D4F] flex-shrink-0" />
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white uppercase font-mono">Isolated tenant isolation keys active</h4>
                      <p className="text-[10px] text-zinc-400 font-light leading-relaxed">
                        This environment automatically isolates transactional memory records utilizing 256-bit AES encryption schemes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative Terminal Code Lines */}
                <div className="bg-[#050508] p-3 rounded-lg border border-zinc-900 font-mono text-[9px] text-[#FF3D4F]/80 space-y-1 overflow-x-auto select-none">
                  <p>&gt; sys_client_reconcile --id "{sol.id}"</p>
                  <p className="text-[#00FF66]">&gt;&gt; [OK] active-active DB logs synchronized cleanly</p>
                  <p className="text-zinc-500">&gt;&gt; telemetry heartbeat rate frequency 120hz</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. OVERVIEW SECTION */}
        <section className="py-16 border-y border-zinc-950 bg-black/40 px-6" id="solution-overview">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-[0.25em] font-bold">SYSTEM OVERVIEW</span>
              <h2 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-tight">Sovereign Architecture Definition</h2>
            </div>
            <p className="text-zinc-300 leading-relaxed font-light text-center text-sm md:text-base">
              {sol.overview} Eurosia structures every element of the <span className="text-white font-medium">{sol.name}</span> environment to ensure complete enterprise data isolation, security, and real-time operations. This infrastructure replaces slow legacy structures with automated, zero-trust cryptographic log systems that support rapid scaling across and between cross-border teams.
            </p>
          </div>
        </section>

        {/* 3. FEATURES MATRIX */}
        <section className="py-24 px-6 max-w-7xl mx-auto space-y-12" id="solution-features">
          <div className="text-left space-y-2">
            <span className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-[0.2em] font-bold">OPERATIONAL PROTOCOLS</span>
            <h2 className="text-3xl font-light text-white uppercase">Guaranteed System Capabilities</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {sol.features.map((feat, idx) => (
              <div 
                key={idx}
                className="bg-zinc-950/60 p-6.5 rounded-xl border border-zinc-900 hover:border-[#FF3D4F]/40 hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4"
              >
                <div className="bg-[#FF3D4F]/10 border border-[#FF3D4F]/20 text-[#FF3D4F] p-2.5 rounded-lg flex-shrink-0">
                  <Check className="w-5 h-5 text-[#FF3D4F]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Metric Protocol 0{idx + 1}</h4>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {feat}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. BENEFITS SUMMARY */}
        <section className="py-24 bg-black border-y border-zinc-950 px-6" id="solution-benefits">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Box Benefits list */}
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-[0.2em] font-bold">KEY CONVERSIONS & BENEFITS</span>
                <h2 className="text-3xl font-light text-white uppercase">Measurable Enterprise Impact</h2>
              </div>

              <div className="space-y-3">
                {sol.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Graphic Box: ROI Telemetry mockup */}
            <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-900 space-y-6">
              <div className="border-b border-zinc-900 pb-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Eurosia ROI Analyzer Output</h4>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400 uppercase mb-1">
                    <span>Average Operational Efficiency Gain</span>
                    <span className="text-emerald-400 font-bold">+42%</span>
                  </div>
                  <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#FF3D4F] h-1.5 rounded-full" style={{ width: '84%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400 uppercase mb-1">
                    <span>Audit Time Shortened</span>
                    <span className="text-[#FF3D4F] font-bold">-80%</span>
                  </div>
                  <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-red-600 h-1.5 rounded-full" style={{ width: '90%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400 uppercase mb-1">
                    <span>System Administration Downtime</span>
                    <span className="text-emerald-400 font-bold">0% ACCIDENTAL OUTAGES</span>
                  </div>
                  <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 5. INDUSTRIES SERVED */}
        <section className="py-20 px-6 max-w-7xl mx-auto space-y-8" id="solution-industries">
          <div className="text-center space-y-2">
            <span className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-[0.2em] font-bold">SPATIAL SECTOR SCOPE</span>
            <h2 className="text-2xl sm:text-3xl font-light text-white uppercase">Target Industries Served</h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {sol.industries.map((industry, idx) => (
              <span 
                key={idx}
                className="px-5 py-2.5 bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-[#FF3D4F] rounded-full text-xs font-semibold tracking-wider transition-colors hover:border-[#FF3D4F]/35 flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF3D4F]" />
                <span>{industry}</span>
              </span>
            ))}
          </div>
        </section>

        {/* 6. TIMELINE WORKFLOW */}
        <section className="py-24 bg-black border-y border-zinc-950" id="solution-workflow">
          <div className="max-w-7xl mx-auto space-y-16 px-6">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-widest font-bold">DEPLOYMENT ROUTINE MATRIX</span>
              <h2 className="text-3xl font-light text-white uppercase tracking-tight">Structured Integration Workflow</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {sol.workflow.map((step, i) => (
                <div key={i} className="space-y-4 relative p-6 bg-zinc-950 border border-zinc-900 rounded-xl flex flex-col justify-between h-48">
                  <div className="space-y-2">
                    <span className="text-3xl font-mono font-black text-[#FF3D4F]/20 block">0{i+1}</span>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      {step.split(':')[0]}
                    </h4>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
                      {step.split(':')[1] || step}
                    </p>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-red-600 to-transparent w-2/3 rounded-full mt-2" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. PRICING CTA */}
        <section className="py-24 px-6 max-w-4xl mx-auto" id="solution-pricing-cta">
          <div className="bg-gradient-to-br from-[#110406] via-zinc-950 to-[#020205] border border-[#FF3D4F]/30 p-8 sm:p-12 rounded-3xl text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-[10%] right-[10%] w-60 h-60 bg-red-600/5 rounded-full filter blur-3xl pointer-events-none" />
            
            <span className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-widest font-bold">SECURE DEMO PROVISIONING</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase leading-none">
              Get Started with <span className="text-[#FF3D4F]">{sol.name}</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
              Activate an automated sandboxed node of this operational framework completely free for 14 days under standard whitelabel compliance limits. No card configuration required.
            </p>

            <div className="flex justify-center gap-3 pt-4">
              <button
                onClick={onStartTrialClick}
                className="px-6 py-3 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white text-xs font-bold font-mono tracking-wider transition-all cursor-pointer uppercase rounded"
              >
                Provision Trial Node
              </button>
              <button
                onClick={onLoginClick}
                className="px-6 py-3 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 text-xs font-bold font-mono tracking-wider transition-all cursor-pointer uppercase rounded"
              >
                Access Tenant Portal
              </button>
            </div>
          </div>
        </section>

        {/* 8. FAQ ACCORDION SECTION */}
        <section className="py-24 bg-black border-t border-zinc-950 px-6" id="solution-faqs">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <HelpCircle className="w-8 h-8 text-[#FF3D4F] mx-auto animate-pulse" />
              <h2 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-wider">Solution Helpdesk & FAQs</h2>
            </div>

            <div className="space-y-4 text-left">
              {sol.faqs.map((faq, idx) => {
                const isExpanded = expandedFaqIndex === idx;
                return (
                  <div key={idx} className="bg-zinc-950 border border-zinc-900/80 rounded-xl overflow-hidden transition-all">
                    <button
                      onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                      className="w-full px-6 py-4.5 text-left font-bold text-sm text-white uppercase tracking-wide flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-900/40"
                    >
                      <span className="flex items-start gap-1.5">
                        <span className="text-[#FF3D4F] font-mono">0{idx + 1}.</span>
                        <span>{faq.q}</span>
                      </span>
                      <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform ${isExpanded ? 'rotate-90 text-[#FF3D4F]' : ''}`} />
                    </button>
                    
                    {isExpanded && (
                      <div className="px-6 pb-5 pt-1 border-t border-zinc-900/40">
                        <p className="text-xs text-zinc-400 pl-4 border-l border-[#FF3D4F] leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 9. CONTACT ARCHITECT LEAD FORM SECTION */}
        <section className="py-24 border-t border-zinc-950 px-6 max-w-7xl mx-auto" id="lead-form-anchor">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact left info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-widest font-bold">TECHNICAL DISPATCH</span>
              <h2 className="text-3xl font-light text-white uppercase leading-none">Schedule Integration Consultation</h2>
              <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                Connect with our systems architects. We analyze database clusters, regional constraints, API layers, and provide migration scripts supporting legacy SQL server imports.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3.5 text-xs text-zinc-400">
                  <Mail className="w-5 h-5 text-[#FF3D4F] flex-shrink-0" />
                  <span>architects@eurosia.app</span>
                </div>
                <div className="flex items-center gap-3.5 text-xs text-zinc-400">
                  <ShieldCheck className="w-5 h-5 text-[#FF3D4F] flex-shrink-0" />
                  <span>ISO-27001 Secure Tenant Encryption</span>
                </div>
              </div>
            </div>

            {/* Contact Form input cards */}
            <div className="lg:col-span-7 bg-zinc-950 border border-zinc-900/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
              <h4 className="text-xs font-mono tracking-widest text-[#FF3D4F] uppercase font-bold mb-4">
                Platform Blueprint Request Form
              </h4>

              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center space-y-4 flex flex-col items-center justify-center"
                    key="submitted-state"
                  >
                    <CheckCircle2 className="w-12 h-12 text-[#FF3D4F] animate-bounce" />
                    <h5 className="font-bold text-white uppercase">Blueprint Request Queued Successful</h5>
                    <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed font-light">
                      Eurosia tech architects will analyze your parameters and dispatch direct connection schemata to your email box within 120 operational minutes.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-4" key="form-state">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-mono text-zinc-500 font-bold mb-1.5">Architect Name</label>
                        <input
                          type="text"
                          required
                          value={leadForm.name}
                          onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                          placeholder="Arthur Pendelton"
                          className="w-full text-xs bg-black border border-zinc-900 focus:border-[#FF3D4F] outline-none px-4 py-2.5 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-mono text-zinc-500 font-bold mb-1.5">Secure Corporate Email</label>
                        <input
                          type="email"
                          required
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          placeholder="pendelton@corporate.com"
                          className="w-full text-xs bg-black border border-zinc-900 focus:border-[#FF3D4F] outline-none px-4 py-2.5 rounded text-white"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-mono text-zinc-500 font-bold mb-1.5">Company Legal Title</label>
                        <input
                          type="text"
                          value={leadForm.company}
                          onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                          placeholder="Pendelton Group Ltd."
                          className="w-full text-xs bg-black border border-zinc-900 focus:border-[#FF3D4F] outline-none px-4 py-2.5 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-mono text-zinc-500 font-bold mb-1.5">Estimated Terminal Nodes</label>
                        <select
                          value={leadForm.nodesCount}
                          onChange={(e) => setLeadForm({ ...leadForm, nodesCount: e.target.value })}
                          className="w-full text-xs bg-black border border-zinc-900 focus:border-[#FF3D4F] outline-none px-4 py-2.5 rounded text-white"
                        >
                          <option value="1-10">1 - 10 nodes (Small Branch)</option>
                          <option value="11-50">11 - 50 nodes (Corporate)</option>
                          <option value="51-200">51 - 200 nodes (Enterprise Suite)</option>
                          <option value="200+">200+ global branches (Consolidated System)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono text-zinc-500 font-bold mb-1.5">Brief Integration Scope Details</label>
                      <textarea
                        rows={3}
                        value={leadForm.scope}
                        onChange={(e) => setLeadForm({ ...leadForm, scope: e.target.value })}
                        placeholder="Migrating multi-channel database sheets from MS SQL, requiring real-time bKash ledger sync..."
                        className="w-full text-xs bg-black border border-zinc-900 focus:border-[#FF3D4F] outline-none px-4 py-2.5 rounded text-white resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white text-xs font-bold font-mono tracking-wider transition-all cursor-pointer uppercase rounded flex items-center justify-center gap-2"
                    >
                      <span>Lock Blueprint Parameters</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>

          </div>
        </section>

      </div>
    );
  }

  // ━━━━━━━━━━━━━━━━ VIEW 2: RENDER COMPLETE CATALOG GRID ━━━━━━━━━━━━━━━━
  return (
    <div className="animate-fadeIn min-h-screen text-zinc-300 text-left bg-[#020205]">
      {/* ━━━━━━━━━━━━━━━━ EXQUISITE CATALOG HERO ━━━━━━━━━━━━━━━━ */}
      <section className="relative pt-24 pb-16 px-6 bg-black text-white overflow-hidden border-b border-zinc-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0205_1px,transparent_1px),linear-gradient(to_bottom,#0c0205_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25"></div>
        <div className="absolute top-[10%] left-[-10%] w-96 h-96 bg-red-600/5 rounded-full filter blur-[100px] animate-pulse"></div>

        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-[#FF3D4F] rounded-full text-[10px] font-bold tracking-widest uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>ENTERPRISE SOLUTIONS BLUEPRINT MATRIX</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase text-white">
            Enterprise Operating <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-red-400">Platform Systems</span>
          </h1>

          <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed max-w-2xl">
            Explore Eurosia's 44 localized application layers. We deliver pre-vetted environments configured with AES physical database isolation and real-time offline synchronization for heavy operational workloads.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('layer')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold font-mono tracking-wider transition-all cursor-pointer uppercase ${activeTab === 'layer' ? 'bg-[#FF3D4F] text-white shadow-lg shadow-[#FF3D4F]/20' : 'bg-zinc-950 border border-zinc-900 text-zinc-500 hover:text-zinc-300'}`}
            >
              Technology Core Sectors
            </button>
            <button
              onClick={() => setActiveTab('industry')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold font-mono tracking-wider transition-all cursor-pointer uppercase ${activeTab === 'industry' ? 'bg-[#FF3D4F] text-white shadow-lg shadow-[#FF3D4F]/20' : 'bg-zinc-950 border border-zinc-900 text-zinc-500 hover:text-zinc-300'}`}
            >
              Enterprise Deployment Registers
            </button>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ CATALOG BODY VIEWS ━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-16">
        
        {activeTab === 'layer' ? (
          /* BENTO GRID: 9 CORE SYSTEM CATEGORIES WITH DIRECT NAVIGATION ENGINES */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SOLUTION_CATEGORIES.map((category) => {
              const Icon = getSolutionIcon(category.iconName);
              return (
                <PremiumCardWrapper
                  key={category.id}
                  title={category.name}
                  url={`/solutions/${category.solutions[0]?.id || 'erp'}`}
                  ctaText="View Details"
                  onNavigate={onNavigate}
                  className="bg-zinc-950 p-8 rounded-2xl border border-zinc-900 h-[360px] flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="premium-card-icon bg-[#FF3D4F]/10 border border-[#FF3D4F]/20 text-[#FF3D4F] p-3 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] font-mono font-bold text-zinc-500 border border-zinc-900 px-2 py-0.5 rounded">
                        {category.solutions.length} ENV REGISTERED
                      </span>
                    </div>
                    
                    <h3 className="premium-card-title font-extrabold text-lg text-white transition-colors uppercase tracking-wide">
                      {category.name}
                    </h3>
                    <p className="premium-card-desc text-xs text-zinc-400 font-light leading-relaxed">
                      {category.description}
                    </p>

                    {/* Simple dynamic list of solutions inside category card */}
                    <div className="space-y-1.5 pt-2">
                      {category.solutions.slice(0, 3).map((sol) => (
                        <button
                          key={sol.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSolutionRedirect(sol.id);
                          }}
                          className="stop-propagation-click w-full text-left text-[11px] text-zinc-500 hover:text-white transition-colors flex items-center justify-between cursor-pointer group/line py-0.5"
                        >
                          <span className="truncate">{sol.name}</span>
                          <ChevronRight className="w-3 h-3 text-[#FF3D4F] opacity-0 group-hover/line:opacity-100 transition-opacity" />
                        </button>
                      ))}
                      {category.solutions.length > 3 && (
                        <span className="text-[10px] text-zinc-650 block pl-1 font-mono uppercase">
                          + {category.solutions.length - 3} more systems configured
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-900 flex items-center justify-between w-full">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (category.solutions[0]) handleSolutionRedirect(category.solutions[0].id);
                      }}
                      className="stop-propagation-click text-xs font-bold text-[#FF3D4F] uppercase flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore Dimension</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </PremiumCardWrapper>
              );
            })}
          </div>
        ) : (
          /* ACTIVE CONFIG REGISTER: ACCORDS LIST WITH DETAILS */
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
              {solutionsList.map((sol, index) => (
                <PremiumCardWrapper 
                  key={sol.id || index}
                  title={sol.name}
                  url={`/solutions/${sol.id || 'erp'}`}
                  ctaText="View Details"
                  onNavigate={onNavigate}
                  className="bg-[#05050a] p-8 rounded-2xl border border-zinc-900 h-72 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-[#FF3D4F]/10 border border-[#FF3D4F]/20 text-[#FF3D4F] font-mono px-3 py-1 rounded-full uppercase font-bold">
                        {sol.category || "General Core Preset"}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-500 uppercase">
                        Secure Status: <span className="text-emerald-400 font-bold">{sol.status || "ACTIVE"}</span>
                      </span>
                    </div>
                    <h3 className="premium-card-title text-xl font-bold text-white uppercase">{sol.name}</h3>
                    <p className="premium-card-desc text-xs text-zinc-400 leading-relaxed font-light line-clamp-3">
                      {sol.description}
                    </p>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSolutionRedirect(sol.id || 'erp');
                    }}
                    className="text-xs font-bold text-[#FF3D4F] uppercase flex items-center gap-1.5 pt-4 border-t border-zinc-900 mt-4 cursor-pointer"
                  >
                    <span>View Operational Matrix ➔</span>
                  </button>
                </PremiumCardWrapper>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ━━━━━━━━━━━━━━━━ STANDARD GLOBAL WORKFLOW TIMELINE ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 bg-black border-y border-zinc-950">
        <div className="max-w-7xl mx-auto space-y-16 px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-widest font-bold">RELIABILITY TIMELINE ROUTINE</span>
            <h2 className="text-3xl font-light text-white uppercase tracking-tight">Our Deployment Workflow</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Terminal Diagnostic", desc: "Our technical staff assesses active registers, network trunks and regional database clusters." },
              { title: "Tenant Isolation", desc: "Deploy exclusive cache space and active encryption rings preventing data exposures." },
              { title: "Apps Tailoring", desc: "Toggle custom layouts, setup localized billing headers, map currencies and factors." },
              { title: "Autonomous Synchronization", desc: "Start live actions. Watch local transactions push securely to web nodes once online." }
            ].map((step, i) => (
              <div key={i} className="space-y-4 relative p-6 bg-zinc-950 border border-zinc-900 rounded-xl">
                <span className="text-3xl font-mono font-black text-[#FF3D4F]/15">0{i+1}</span>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">{step.title}</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

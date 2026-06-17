import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Bot, ArrowLeft, ArrowRight, Check, CheckCircle2, 
  HelpCircle, Mail, ShieldCheck, Send, ChevronRight, Activity, 
  Sparkles, Terminal, FileCheck2, Cpu, MessageSquareText, PhoneCall
} from 'lucide-react';
import { ALL_SOLUTIONS_DATA, getSolutionIcon } from '../data/solutions';
import { getCatalogSolution } from '../data/solutionsCatalog';

interface SolutionDetailPageProps {
  solutionId?: string;
  onNavigate: (path: string) => void;
  onLoginClick: () => void;
  onStartTrialClick: () => void;
}

export default function SolutionDetailPage({
  solutionId = "erp",
  onNavigate,
  onLoginClick,
  onStartTrialClick,
}: SolutionDetailPageProps) {
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    company: "",
    scope: "",
    nodesCount: "1-10"
  });

  // Pull fully cataloged expanded metadata which exceeds 1200+ words
  const catalogSol = getCatalogSolution(solutionId);

  const sol = {
    id: catalogSol.slug,
    name: catalogSol.title,
    tagline: catalogSol.tagline,
    categorySlug: catalogSol.category,
    icon: catalogSol.iconName,
    description: catalogSol.description,
    heroTitle: catalogSol.bannerTitle,
    overview: catalogSol.overview,
    features: catalogSol.features.map(f => `${f.title}: ${f.desc}`),
    benefits: catalogSol.benefits.map(b => `${b.title}: ${b.desc}`),
    industries: catalogSol.useCases.map(u => u.industry),
    workflow: catalogSol.workflow,
    statistics: catalogSol.statistics,
    successStory: {
      client: catalogSol.caseStudy.client,
      challenge: catalogSol.caseStudy.challenge,
      outcome: catalogSol.caseStudy.solution,
      metrics: catalogSol.caseStudy.roi
    },
    faqs: catalogSol.faqs,
    seoTitle: `${catalogSol.title} | Sovereign Solutions | Eurosia App Ecosystem`,
    seoDescription: catalogSol.description,
    featured: false,
    active: true,
    sortOrder: 1,
    technicalArchitecture: catalogSol.technicalArchitecture,
    apiSpec: catalogSol.apiSpec,
    useCases: catalogSol.useCases
  };

  const CategoryIcon = getSolutionIcon(sol.icon);

  // Helper generator to establish the targeted direct WhatsApp messaging portal (Problem 4)
  const getWhatsAppUrl = (actionType: 'consultation' | 'demo' | 'expert' | 'custom') => {
    const actionLabelMap = {
      consultation: "WhatsApp Consultation",
      demo: "Book Demo",
      expert: "Talk to Expert",
      custom: "Request Proposal"
    };

    const actionText = actionLabelMap[actionType];

    const msg = `Hello Eurosia Team,

I am interested in:
${sol.name} (${actionText})

Please provide details.

Company Name:
Phone Number:
Requirements:

Thank You.`;

    return `https://wa.me/8801711408725?text=${encodeURIComponent(msg)}`;
  };

  // Automated persistence for recently viewed solutions tracking inside the browser session (Problem 7)
  useEffect(() => {
    if (!solutionId) return;
    const stored = localStorage.getItem('eurosia_recent_solutions');
    let recents: string[] = [];
    if (stored) {
      try {
        recents = JSON.parse(stored);
      } catch (e) {
        recents = [];
      }
    }
    // Prepend active slug and limit recents array length to 4
    const updated = [solutionId, ...recents.filter(item => item !== solutionId)].slice(0, 4);
    localStorage.setItem('eurosia_recent_solutions', JSON.stringify(updated));
  }, [solutionId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    
    // Update Document SEO titles dynamically
    if (sol.seoTitle) {
      document.title = sol.seoTitle;
    } else {
      document.title = `${sol.name} - Sovereign Solutions | Eurosia App Ecosystem`;
    }

    // Dynamic description tag trigger
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", sol.seoDescription || sol.tagline);
    }
  }, [solutionId, sol]);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setLeadForm({ name: "", email: "", company: "", scope: "", nodesCount: "1-10" });
      setFormSubmitted(false);
    }, 4500);
  };

  return (
    <div className="animate-fadeIn min-h-screen text-zinc-300 text-left bg-[#020205] relative pb-20" id={`solutiondetail-${sol.id}`}>
      {/* ━━━━━━━━━━━━━━━━ GRID LINE DECORATIONS ━━━━━━━━━━━━━━━━ */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#110406_1px,transparent_1px),linear-gradient(to_bottom,#110406_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
      <div className="absolute top-[15%] right-0 w-80 h-80 bg-red-600/5 rounded-full filter blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[25%] left-[-10%] w-96 h-96 bg-red-800/5 rounded-full filter blur-[150px] pointer-events-none" />

      {/* ━━━━━━━━━━━━━━━━ BREADCRUMBS BREADCRUMB trail ━━━━━━━━━━━━━━━━ */}
      <div className="max-w-7xl mx-auto px-6 pt-24 relative z-10" id="solution-detail-nav">
        <button
          onClick={() => onNavigate('/solutions')}
          className="group inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-[#FF3D4F] transition-colors uppercase font-bold cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Solutions Catalog</span>
        </button>
      </div>

      {/* ━━━━━━━━━━━━━━━━ 1. HERO SECTION ━━━━━━━━━━━━━━━━ */}
      <section className="relative pt-12 pb-20 px-6 overflow-hidden" id="details-hero">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left panel metrics */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF3D4F]/10 border border-[#FF3D4F]/25 text-[#FF3D4F] rounded-full text-[10px] font-bold tracking-widest uppercase">
              <CategoryIcon className="w-3.5 h-3.5" />
              <span>Sovereign Module</span>
              <span className="w-1 h-1 rounded-full bg-[#FF3D4F] animate-ping" />
              <span>{sol.categorySlug.toUpperCase()}</span>
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white uppercase">
              {sol.heroTitle || sol.name}
            </h1>

            <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed max-w-xl">
              {sol.tagline} {sol.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onStartTrialClick}
                className="px-6 py-3 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white text-xs font-bold font-mono tracking-wider transition-all cursor-pointer uppercase rounded shadow-lg shadow-[#FF3D4F]/15 hover:scale-[1.02] active:scale-95 flex items-center gap-2"
              >
                <span>Deploy Trial Sandbox</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#blueprint-lead-form"
                className="px-6 py-3 bg-zinc-950 border border-zinc-900 hover:border-[#FF3D4F]/40 text-zinc-300 text-xs font-bold font-mono tracking-wider transition-all cursor-pointer uppercase rounded"
              >
                Request Systems Blueprint
              </a>
            </div>

            {/* ━━━━━━━━━━━━━━━━ WHATSAPP DIRECT CONTACT PLATFORMS ━━━━━━━━━━━━━━━━ */}
            <div className="pt-6 border-t border-zinc-900/80 space-y-3">
              <span className="block text-[10px] font-mono tracking-widest text-[#FF3D4F] uppercase font-bold">
                WhatsApp Direct Channels | Swift Response Team
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={getWhatsAppUrl('consultation')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-3 bg-[#FF3D4F]/5 border border-emerald-500/10 hover:border-emerald-500/40 hover:bg-emerald-500/5 text-center text-zinc-300 hover:text-white text-xs font-bold font-mono tracking-wider transition-all uppercase rounded flex items-center justify-center gap-2"
                >
                  <MessageSquareText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WHATSAPP CONSULTATION</span>
                </a>
                <a
                  href={getWhatsAppUrl('demo')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-3 bg-[#FF3D4F]/5 border border-emerald-500/10 hover:border-emerald-500/40 hover:bg-emerald-500/5 text-center text-zinc-300 hover:text-white text-xs font-bold font-mono tracking-wider transition-all uppercase rounded flex items-center justify-center gap-2"
                >
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>BOOK DEMO</span>
                </a>
                <a
                  href={getWhatsAppUrl('expert')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-3 bg-[#FF3D4F]/5 border border-[#FF3D4F]/10 hover:border-[#FF3D4F]/40 hover:bg-[#FF3D4F]/5 text-center text-zinc-300 hover:text-white text-xs font-bold font-mono tracking-wider transition-all uppercase rounded flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#FF3D4F]" />
                  <span>TALK TO EXPERT</span>
                </a>
                <a
                  href={getWhatsAppUrl('custom')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-3 bg-[#FF3D4F]/5 border border-emerald-500/10 hover:border-emerald-500/40 hover:bg-emerald-500/5 text-center text-zinc-300 hover:text-white text-xs font-bold font-mono tracking-wider transition-all uppercase rounded flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>REQUEST PROPOSAL</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right graphic box panel */}
          <div className="lg:col-span-5 relative" id="details-hero-telem">
            <div className="relative bg-zinc-950/80 border border-zinc-900 rounded-2xl p-6 shadow-2xl backdrop-blur-md overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF3D4F]" />
              
              <div className="flex items-center justify-between pb-4 border-b border-zinc-900 text-[10px] font-mono text-zinc-500 uppercase font-black">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>NODE STATUS: COMPILED</span>
                </div>
                <span>CORE METRICS</span>
              </div>

              {/* Dynamic stats */}
              <div className="py-5 space-y-3.5">
                {sol.statistics?.slice(0, 3).map((stat, i) => (
                  <div key={i} className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-900 flex items-center justify-between">
                    <div>
                      <span className="block text-[9px] font-mono text-zinc-500 uppercase font-bold">{stat.label}</span>
                      <span className="text-[11px] text-zinc-400 mt-0.5 block">{stat.detail}</span>
                    </div>
                    <span className="text-xl font-black text-[#FF3D4F] font-mono">{stat.value}</span>
                  </div>
                ))}

                <div className="bg-[#FF3D4F]/5 border border-[#FF3D4F]/20 p-3.5 rounded-xl flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#FF3D4F] mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <h5 className="text-[10px] uppercase font-mono font-bold text-white">Encrypted Local Instances Active</h5>
                    <p className="text-[9.5px] text-zinc-400 font-light leading-relaxed">
                      Transactions cache elements automatically synchronize utilizing 256-bit AES algorithms.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#05051B] p-2.5 rounded-lg border border-zinc-900 font-mono text-[9px] text-[#FF3D4F]/85 space-y-0.5 overflow-x-auto text-left select-none">
                <p>&gt; sys_verify_reconciler --slug "{sol.id}"</p>
                <p className="text-[#00FF55]">&gt;&gt; [VERIFIED] cloud-replica secure handshake successful</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ 1B. BUSINESS CHALLENGES ━━━━━━━━━━━━━━━━ */}
      <section className="py-16 px-6 max-w-7xl mx-auto space-y-8" id="details-challenges">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-widest font-bold">OPERATIONAL FRICTION</span>
          <h2 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-tight leading-none">Core Business Challenges Addressed</h2>
          <p className="text-xs text-zinc-400 font-light mt-1">
            Legacy systems introduce operational bottlenecks, security loops, and slow processing limits that restrict high-volume growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 pt-4">
          <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
              <span className="text-xs font-mono tracking-wider text-[#FF3D4F] uppercase font-bold block">01 / Legacy Fragmentation</span>
              <Activity className="w-3.5 h-3.5 text-[#FF3D4F]" />
            </div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Siloed Data & Multi-System Latency</h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
              Disconnected databases force manual synchronization, causing high latency, data overlap errors, and reporting delays that blind executive decision-making.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
              <span className="text-xs font-mono tracking-wider text-[#FF3D4F] uppercase font-bold block">02 / Scaling Limitations</span>
              <Cpu className="w-3.5 h-3.5 text-[#FF3D4F]" />
            </div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Transaction Bottlenecks</h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
              Underlying database engines struggle with parallel reads and writes during high-volume periods, resulting in transactional locks, session timeouts, and critical customer abandonment.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
              <span className="text-xs font-mono tracking-wider text-[#FF3D4F] uppercase font-bold block">03 / Security Compliance Risks</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Insecure Handshakes & Vulnerable Nodes</h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
              Unencrypted local logs and unverified regional endpoints risk severe data leaks and penetration, exposing company metrics and violations against data compliance rules.
            </p>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ 2. SOLUTION OVERVIEW ━━━━━━━━━━━━━━━━ */}
      <section className="py-16 border-y border-zinc-900/60 bg-black/30 px-6" id="details-overview">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-center space-y-1">
            <span className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-[0.2em] font-bold">SOVEREIGN CORE ARCHITECTURE</span>
            <h2 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-tight">Technical Overview Matrix</h2>
          </div>
          <div className="text-zinc-300 leading-relaxed font-light text-left text-xs sm:text-sm md:text-base space-y-4">
            <p className="whitespace-pre-line">{sol.overview}</p>
            <p>
              Eurosia processes transactional operations internally with maximum telemetry and absolute data isolation. This infrastructure replaces slow legacy structures with automated, zero-trust cryptographic log systems that support rapid scaling across and between cross-border teams. By containerizing each independent utility into dedicated services, we prevent cross-tenant memory sharing leaks entirely.
            </p>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ 3. KEY FEATURES MATRIX ━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-12" id="details-features">
        <div className="text-left space-y-1">
          <span className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-[0.2em] font-bold">OPERATIONAL PROTOCOLS</span>
          <h2 className="text-3xl font-light text-white uppercase">Sovereign Standard Capabilities</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sol.features.map((feat, idx) => (
            <div 
              key={idx}
              className="bg-zinc-950/70 p-6 rounded-2xl border border-zinc-900 hover:border-[#FF3D4F]/30 hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4"
            >
              <div className="bg-[#FF3D4F]/10 border border-[#FF3D4F]/20 text-[#FF3D4F] p-2.5 rounded-xl shrink-0">
                <Check className="w-5 h-5 text-[#FF3D4F]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Capability 0{idx + 1}</h4>
                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  <strong>{feat.split(':')[0]}:</strong>{feat.split(':')[1] || feat}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ 4. BENEFITS SUMMARY ━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-black border-y border-zinc-900/60 px-6" id="details-benefits">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-[0.2em] font-bold">MEASURABLE PERFORMANCE</span>
              <h2 className="text-3xl font-light text-white uppercase">Ecosystem Core Business Outcomes</h2>
            </div>

            <div className="space-y-4">
              {sol.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 mt-0.5 shrink-0" />
                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                    <strong>{benefit.split(':')[0]}:</strong>{benefit.split(':')[1] || benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-zinc-950 p-6 rounded-2xl border border-zinc-900 space-y-6">
            <h4 className="text-xs font-mono tracking-wider font-bold text-white uppercase border-b border-zinc-900 pb-3">Eurosia ROI Analyzer Output</h4>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-mono text-zinc-400 uppercase mb-1">
                  <span>Operational Output Factor</span>
                  <span className="text-emerald-400 font-bold">+45%</span>
                </div>
                <div className="w-full bg-zinc-900 rounded-full h-1">
                  <div className="bg-[#FF3D4F] h-1 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-mono text-zinc-400 uppercase mb-1">
                  <span>Data Processing Lags</span>
                  <span className="text-[#FF3D4F] font-bold">-92%</span>
                </div>
                <div className="w-full bg-zinc-900 rounded-full h-1">
                  <div className="bg-red-650 h-1 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-mono text-zinc-400 uppercase mb-1">
                  <span>Server Security Failures</span>
                  <span className="text-emerald-400 font-bold">0% INCIDENTS RECORDED</span>
                </div>
                <div className="w-full bg-zinc-900 rounded-full h-1">
                  <div className="bg-emerald-500 h-1 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ 5. WORKFLOW PROCESS ━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-12" id="details-workflow">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-widest font-bold">DEPLOYMENT ROUTINES</span>
          <h2 className="text-3xl font-light text-white uppercase tracking-tight leading-none">Seamless Integration Sequence</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sol.workflow.map((step, i) => (
            <div key={i} className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl flex flex-col justify-between h-44 relative">
              <div className="space-y-2 text-left">
                <span className="text-2xl font-mono font-black text-[#FF3D4F]/20 block">STAGE 0{i + 1}</span>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">{step.split(':')[0]}</h4>
                <p className="text-[10.5px] text-zinc-400 leading-relaxed font-light">{step.split(':')[1] || step}</p>
              </div>
              <div className="h-[2px] bg-gradient-to-r from-[#FF3D4F] to-transparent w-2/3 rounded-full mt-2" />
            </div>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ 6. INDUSTRY USE CASES ━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-6 bg-black/40 border-y border-zinc-900/60" id="details-industries">
        <div className="max-w-5xl mx-auto space-y-8 text-left">
          <div className="space-y-1 text-center">
            <span className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-widest font-bold font-mono">SOVEREIGN OUTCOMES</span>
            <h2 className="text-2xl sm:text-3xl font-light text-white uppercase">Operational Target Industries & Case Profiles</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-4">
            {sol.useCases.map((use, idx) => (
              <div key={idx} className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl space-y-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FF3D4F]/10 border border-[#FF3D4F]/25 text-[#FF3D4F] rounded-full text-[9px] font-bold font-mono tracking-wider uppercase">
                  {use.industry}
                </span>
                <p className="text-[11.5px] text-zinc-400 leading-relaxed font-light">
                  <strong>Operational Scenario:</strong> {use.scenario}
                </p>
                <p className="text-[11.5px] text-zinc-300 leading-relaxed font-semibold pl-3.5 border-l border-[#FF3D4F]/40">
                  <strong>Outcome Accomplished:</strong> {use.outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ 7. STATISTICS SECTION ━━━━━━━━━━━━━━━━ */}
      <section className="py-16 px-6 max-w-7xl mx-auto" id="details-statistics">
        <div className="grid sm:grid-cols-3 gap-6">
          {sol.statistics?.map((stat, i) => (
            <div key={i} className="bg-zinc-950/80 border border-zinc-900 p-6 rounded-2xl text-center space-y-2">
              <span className="text-3xl font-black text-[#FF3D4F] font-mono block">{stat.value}</span>
              <h5 className="text-[10px] font-mono uppercase tracking-wider text-white font-bold">{stat.label}</h5>
              <p className="text-[11px] text-zinc-500 font-light">{stat.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ 8. SUCCESS STORIES ━━━━━━━━━━━━━━━━ */}
      {sol.successStory && (
        <section className="py-20 px-6 max-w-7xl mx-auto" id="details-stories">
          <div className="bg-gradient-to-br from-[#110406] to-black border border-[#FF3D4F]/20 p-8 rounded-3xl relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full filter blur-2xl pointer-events-none" />
            
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-[9px] font-mono tracking-[0.25em] text-[#FF3D4F] bg-[#FF3D4F]/10 border border-[#FF3D4F]/25 px-2 py-0.5 rounded uppercase font-bold">
                  CLIENT SUCCESS FILE
                </span>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                  Case Study: {sol.successStory.client}
                </h3>
                <div className="space-y-2 text-zinc-300 text-xs sm:text-sm font-light">
                  <p><b>The Challenge:</b> {sol.successStory.challenge}</p>
                  <p><b>The Deployment:</b> {sol.successStory.outcome}</p>
                </div>
              </div>

              <div className="lg:col-span-4 bg-zinc-950/80 border border-zinc-900 p-6 rounded-2xl text-center space-y-1.5 shrink-0">
                <span className="text-xs font-mono text-zinc-500 uppercase font-bold">AUDITED IMPACT</span>
                <span className="text-2xl font-black text-emerald-400 font-mono block">{sol.successStory.metrics}</span>
                <p className="text-[10px] text-zinc-400 leading-normal font-light">
                  Successfully measured down the integration line.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ━━━━━━━━━━━━━━━━ 9. SYSTEM ARCHITECTURE SPECIFICATIONS (1200+ Words Goal) ━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-zinc-950/40 border-t border-zinc-900/60 px-6" id="technical-specifications">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start text-left">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1">
              <span className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-[0.15em] font-bold">DEVELOPER LEVEL SPECS</span>
              <h2 className="text-3xl font-light text-white uppercase font-sans">Systems Infrastructure Architecture</h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light whitespace-pre-line">
              {sol.technicalArchitecture}
            </p>
            <div className="bg-[#05051B] border border-zinc-900 rounded-2xl p-5 space-y-3">
              <h4 className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">Active Database Engine Isolation Check</h4>
              <p className="text-[10.5px] text-zinc-400 leading-relaxed font-light">
                Our schema structure enforces Row-Level Security policies on regional PostgreSQL nodes to ensure database isolation. Tenant isolation guarantees zero risk of data overlapping or leaking during concurrent data sync procedures.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <h4 className="text-xs font-mono tracking-widest text-[#FF3D4F] uppercase font-bold">Unified RPC Handshake Endpoint Specification</h4>
            <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-5 font-mono text-[10.5px] text-sky-400 overflow-x-auto select-all leading-normal whitespace-pre">
              {sol.apiSpec}
            </div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide leading-relaxed">
              Verify SSL certificates dynamically using standard cryptographic handshakes. Authorized nodes merge delta logs back to core clusters every 300 seconds.
            </p>
          </div>

        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ 10. FAQ ACCORDION SUMMARY ━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-black/30 border-t border-zinc-900/60 px-6" id="details-faqs">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <HelpCircle className="w-8 h-8 text-[#FF3D4F] mx-auto animate-pulse" />
            <h2 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-wider text-center">Helpdesk & FAQs</h2>
          </div>

          <div className="space-y-4 text-left">
            {sol.faqs.map((faq, idx) => {
              const isExpanded = expandedFaqIndex === idx;
              return (
                <div key={idx} className="bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                    className="w-full px-6 py-4.5 text-left font-bold text-xs text-white uppercase tracking-wide flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-900/50 text-left"
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

      {/* ━━━━━━━━━━━━━━━━ 11. CONTACT ARCHITECT LEAD FORM ━━━━━━━━━━━━━━━━ */}
      <section className="py-20 border-t border-zinc-900/60 px-6 max-w-7xl mx-auto" id="blueprint-lead-form">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-widest font-bold">TECHNICAL DISPATCH</span>
            <h2 className="text-3xl font-light text-white uppercase leading-none text-left">Blueprint & Architecture Dispatch</h2>
            <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed text-left">
              Connect directly with Eurosia ecosystem architects. We evaluate cluster specifications, regional compliance requirements, check schema designs, and ship migration scripts to your inbox.
            </p>

            <div className="space-y-4 pt-2 text-left">
              <div className="flex items-center gap-3 text-xs text-zinc-400">
                <Mail className="w-5 h-5 text-[#FF3D4F] shrink-0" />
                <span>architects@eurosia.app</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-400 text-left">
                <ShieldCheck className="w-5 h-5 text-[#FF3D4F] shrink-0" />
                <span>ISO-27001 Cryptography Secured Networks</span>
              </div>
            </div>

            {/* QUICK WHATSAPP CHANNELS IN FOOTER TOO */}
            <div className="pt-4 border-t border-zinc-900/80 space-y-3 text-left">
              <span className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-black">
                URGENT INQUIRY CHANNELS
              </span>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={getWhatsAppUrl('consultation')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500 text-emerald-400 hover:text-white text-[10px] font-bold font-mono tracking-wider transition-all uppercase rounded flex items-center justify-center gap-1.5"
                >
                  <MessageSquareText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WHATSAPP CONSULTATION</span>
                </a>
                <a
                  href={getWhatsAppUrl('demo')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500 text-emerald-400 hover:text-white text-[10px] font-bold font-mono tracking-wider transition-all uppercase rounded flex items-center justify-center gap-1.5"
                >
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>BOOK DEMO</span>
                </a>
                <a
                  href={getWhatsAppUrl('expert')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-[10px] font-bold font-mono tracking-wider transition-all uppercase rounded flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-zinc-400" />
                  <span>TALK TO EXPERT</span>
                </a>
                <a
                  href={getWhatsAppUrl('custom')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500 text-emerald-400 hover:text-white text-[10px] font-bold font-mono tracking-wider transition-all uppercase rounded flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>REQUEST PROPOSAL</span>
                </a>
              </div>
            </div>

          </div>

          <div className="lg:col-span-7 bg-[#05051B] border border-zinc-900 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
            <h4 className="text-xs font-mono tracking-widest text-[#FF3D4F] uppercase font-bold mb-4 text-left">
              Blueprint Request Form
            </h4>

            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-4 flex flex-col items-center justify-center"
                  key="successful-submitted-key"
                >
                  <CheckCircle2 className="w-12 h-12 text-[#FF3D4F] animate-bounce" />
                  <h5 className="font-bold text-white uppercase">Blueprint Request Dispatch Successful</h5>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed font-light text-center">
                    Your architecture parameters have been logged successfully. Dedicated engineers will analyze your parameters and dispatch direct connection models to your mailbox.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-4 text-xs font-semibold text-left" key="actual-form-key">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-zinc-500 font-bold mb-1.5">Architect Name</label>
                      <input
                        type="text"
                        required
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        placeholder="Arthur Vance"
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
                        placeholder="vance@corporate.com"
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
                        placeholder="Vance Logistics Ltd"
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
                      placeholder="Migrating decentralized server tables from physical hosts to local cloud containers..."
                      className="w-full text-xs bg-black border border-zinc-900 focus:border-[#FF3D4F] outline-none px-4 py-2.5 rounded text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white text-xs font-bold font-mono tracking-wider transition-all cursor-pointer uppercase rounded flex items-center justify-center gap-2"
                  >
                    <span>Transmit Blueprint Specs</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ FLOATING WHATSAPP CTA BUTTON ━━━━━━━━━━━━━━━━ */}
      <div className="fixed bottom-6 right-6 z-50 group flex items-center gap-2">
        <div className="bg-black/90 border border-zinc-800 px-3 py-1.5 rounded-xl text-[10px] font-mono tracking-wider text-emerald-400 font-bold uppercase transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 pointer-events-none shadow-md backdrop-blur-sm">
          Chat regarding {sol.name}
        </div>
        <a
          href={getWhatsAppUrl('expert')}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba56] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 relative border border-[#25D366]/20 group-hover:shadow-[#25D366]/20 group-hover:shadow-2xl"
          aria-label="Contact on WhatsApp"
        >
          {/* Animated rings */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-pulse pointer-events-none" />
          <svg
            className="w-7 h-7 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.1 1.45 4.7 1.45 5.4 0 9.8-4.4 9.8-9.8s-4.4-9.8-9.8-9.8c-5.4 0-9.8 4.4-9.8 9.8 0 2.1.6 4.1 1.7 5.8l-.2.7-.9 3.4 3.5-.9.7-.4zm10.7-6.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.4-1.5-.9-.8-1.5-1.7-1.7-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.4-.3-.7-.6-.6-.8-.6h-.6c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.1-1.3-.1-.3-.3-.4-.6-.5z" />
          </svg>
        </a>
      </div>

    </div>
  );
}

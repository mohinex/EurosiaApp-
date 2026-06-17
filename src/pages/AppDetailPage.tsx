import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Bot, ArrowLeft, ArrowRight, Check, CheckCircle2, 
  HelpCircle, Mail, ShieldCheck, Send, ChevronRight, Activity, 
  Sparkles, Terminal, FileCheck2, Cpu, MessageSquareText, PhoneCall
} from 'lucide-react';
import { fallbackApps } from '../data/appsFallbackData';

interface AppDetailPageProps {
  appId?: string;
  onNavigate: (path: string) => void;
  onLoginClick: () => void;
  onStartTrialClick: () => void;
}

export default function AppDetailPage({
  appId = "eurosia-pos",
  onNavigate,
  onLoginClick,
  onStartTrialClick,
}: AppDetailPageProps) {
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    company: "",
    scope: "",
    nodesCount: "1-10"
  });

  // Fetch the selected App from catalog
  const app = fallbackApps.find(
    a => a.slug === appId || a.id === appId || a.slug === `eurosia-${appId}`
  ) || fallbackApps[0];

  const appName = app.name;
  const appSlug = app.slug;

  const getWhatsAppUrl = (actionType: 'consultation' | 'demo' | 'expert' | 'custom') => {
    const actionLabelMap = {
      consultation: "WhatsApp Consultation",
      demo: "Book Demo",
      expert: "Talk to Expert",
      custom: "Request Proposal"
    };

    const actionText = actionLabelMap[actionType];

    const msg = `Hello Eurosia Team,\n\nI am interested in:\n${appName} (${actionText})\n\nPlease provide details.\n\nCompany Name:\nPhone Number:\nRequirements:\n\nThank You.`;
    return `https://wa.me/8801711408725?text=${encodeURIComponent(msg)}`;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    document.title = `${appName} | Core App Engine | Eurosia Systems`;
    
    // Update description meta tag dynamically
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", app.description || "Core System Automation Suite");
    }
  }, [appId, appName, app]);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setLeadForm({ name: "", email: "", company: "", scope: "", nodesCount: "1-10" });
      setFormSubmitted(false);
    }, 4500);
  };

  // Tailored features matrix depending on categories
  const getAppFeatures = () => {
    switch (app.category) {
      case 'retail':
        return [
          { title: "Offline Synced Ledger", desc: "Allows full operation of store registers during complete internet blackouts with instantaneous local storage." },
          { title: "Modular Loyalty Pipeline", desc: "Integrates discount profiles, points triggers, and customized membership maps across invoice routes." },
          { title: "Live Cash-Drawer Audit", desc: "Provides high-frequency telemetric counting of terminal registers for senior operators." }
        ];
      case 'healthcare':
        return [
          { title: "HIPAA Compliant Vaults", desc: "Ensures medical charts and biometric logs stay fully encrypted under on-premise local directories." },
          { title: "Smart Scheduling Nodes", desc: "Prevents treatment grid conflicts and handles outpatient appointments via high-efficiency automation." },
          { title: "Direct Pharmacy Reminders", desc: "Dispatches prescriptions directly to authorized local pharmaceutical centers during checkout." }
        ];
      case 'communication':
        return [
          { title: "High-Density SIP Routing", desc: "Optimizes VoIP connection routes under low bandwidth latency models to bypass localized ISP drops." },
          { title: "Instant Call Recording", desc: "Secures customer conversation records in compressed flac file systems for compliance verification." },
          { title: "Dynamic IVR Constructors", desc: "Drag-and-drop operator flow dashboards to manage agent redirections during high call volumes." }
        ];
      case 'ai':
        return [
          { title: "Sovereign Context Models", desc: "Runs highly specialized local models trained strictly on customer support vectors to eliminate hallucinations." },
          { title: "Autonomous Trigger Actions", desc: "Triggers API sync flows, updates checkout items, or opens custom support cases dynamically." },
          { title: "Multi-Language Translators", desc: "Recognizes localized regional speech structures and handles conversions instantly." }
        ];
      case 'cybersecurity':
        return [
          { title: "Zero-Trust Active Defenses", desc: "Monitors workspace port entries, blocks unauthorized API keys, and isolates compromised browser modules." },
          { title: "Local Double-Entry Hashes", desc: "Prevents database row injection by generating real-time cryptographic audit trails." },
          { title: "Encrypted Backups Matrix", desc: "Automates continuous full-estate snapshots to local physical hardware modules." }
        ];
      default:
        return [
          { title: "Robust Local Execution", desc: "Runs lightning-fast offline operations using browser-isolated database pools." },
          { title: "Dynamic License Manager", desc: "Link multiple client terminals or mobile units to one dashboard with visual status trackers." },
          { title: "Double-Entry Bookkeeping", desc: "Generates standardized accounting registers and ledger items cleanly." }
        ];
    }
  };

  // Customizable FAQs tailored for the specific app
  const appFaqs = [
    {
      q: `Can I run ${appName} offline without internet?`,
      a: "Yes. Our core apps utilize localized Storage Isolation Engines. Invoices, schedules, or client files are cached locally and synced through high-frequency background merges when an active connection is established."
    },
    {
      q: "How does the pricing license work?",
      a: `License access is billed under a modular monthly fee of ৳${app.fee}/month. You may scale out or cancel specific application nodes instantly via the central administrative hub without licensing penalties.`
    },
    {
      q: "Do you assist with historical database migration?",
      a: "Our migration desk provides full database table sync models at no extra cost. We ingest standard spreadsheet templates, CSV formats, or SQL backups directly into your new workspace container."
    }
  ];

  return (
    <div className="animate-fadeIn min-h-screen text-zinc-300 text-left bg-[#020205] relative pb-20" id={`appdetail-${appSlug}`}>
      {/* Grid Pattern Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#110406_1px,transparent_1px),linear-gradient(to_bottom,#110406_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
      <div className="absolute top-[12%] right-0 w-80 h-80 bg-red-600/5 rounded-full filter blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[20%] left-[-10%] w-96 h-96 bg-red-800/5 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Navigation Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-24 relative z-10" id="app-detail-nav">
        <button
          onClick={() => onNavigate('/apps')}
          className="group inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#FF3D4F]" />
          <span>Back to App Suites Portal</span>
        </button>
      </div>

      {/* Hero Header */}
      <section className="relative pt-10 pb-16 px-6 overflow-hidden" id="app-hero">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-[#FF3D4F] rounded-full text-[10px] font-bold tracking-widest uppercase font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{app.category} application node</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-none">
              {appName} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-[#FF3D4F]">Operation Engine</span>
            </h1>

            <p className="text-zinc-400 font-light text-base sm:text-lg leading-relaxed max-w-2xl">
              {app.description}. Designed for professional teams requesting complete modular scaling, database synchronization consistency, and high-frequency transaction security.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-zinc-900/60 py-5">
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">Deploy Fee</span>
                <span className="text-lg font-bold text-white font-mono">৳{app.fee}/month</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">Performance Rating</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">⭐ {app.rating}/5.0</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">Deploy Architecture</span>
                <span className="text-xs font-bold text-[#FF3D4F] uppercase font-mono">SOVEREIGN WORKSPACE</span>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-900/80 space-y-4">
              <div className="flex">
                <button
                  onClick={onStartTrialClick}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#FF3D4F] hover:bg-[#CC1A2F ] text-white text-xs tracking-wider uppercase font-extrabold rounded-xl transition-all cursor-pointer shadow-lg shadow-red-500/10 flex items-center justify-center gap-2"
                >
                  <span>PROVISION TRIAL INSTANCE ➔</span>
                </button>
              </div>

              <div className="space-y-2">
                <span className="block text-[10px] font-mono tracking-widest text-[#FF3D4F] uppercase font-bold text-left">
                  Direct WhatsApp Channels | Swift Response Team
                </span>
                <div className="grid grid-cols-2 gap-2 max-w-xl">
                  <a
                    href={getWhatsAppUrl('consultation')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-3 bg-[#FF3D4F]/5 border border-emerald-500/10 hover:border-emerald-500/35 hover:bg-emerald-500/5 text-center text-zinc-300 hover:text-white text-[10.5px] font-bold font-mono tracking-wider transition-all uppercase rounded flex items-center justify-center gap-1.5"
                  >
                    <MessageSquareText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WHATSAPP CONSULTATION</span>
                  </a>
                  <a
                    href={getWhatsAppUrl('demo')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-3 bg-[#FF3D4F]/5 border border-emerald-500/10 hover:border-emerald-500/35 hover:bg-emerald-500/5 text-center text-zinc-300 hover:text-white text-[10.5px] font-bold font-mono tracking-wider transition-all uppercase rounded flex items-center justify-center gap-1.5"
                  >
                    <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                    <span>BOOK DEMO</span>
                  </a>
                  <a
                    href={getWhatsAppUrl('expert')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-3 bg-[#FF3D4F]/5 border border-[#FF3D4F]/10 hover:border-[#FF3D4F]/35 hover:bg-[#FF3D4F]/5 text-center text-zinc-300 hover:text-white text-[10.5px] font-bold font-mono tracking-wider transition-all uppercase rounded flex items-center justify-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#FF3D4F]" />
                    <span>TALK TO EXPERT</span>
                  </a>
                  <a
                    href={getWhatsAppUrl('custom')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-3 bg-[#FF3D4F]/5 border border-emerald-500/10 hover:border-emerald-500/35 hover:bg-emerald-500/5 text-center text-zinc-300 hover:text-white text-[10.5px] font-bold font-mono tracking-wider transition-all uppercase rounded flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>REQUEST PROPOSAL</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-zinc-950 border border-zinc-900/60 p-8 rounded-2xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF3D4F]/5 rounded-full filter blur-2xl pointer-events-none" />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider border-b border-zinc-900 pb-3 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#FF3D4F]" /> Deploy Parameters
              </h3>
              
              <div className="space-y-4 font-mono text-[10px] leading-relaxed text-zinc-400">
                <div className="p-3 bg-black/40 border border-zinc-900 rounded-lg">
                  <span className="text-zinc-650 block text-[9px] uppercase">CONTAINER STATE</span>
                  <span className="text-emerald-400 font-bold">READY_TO_DEPLOY</span>
                </div>
                <div className="p-3 bg-black/40 border border-zinc-900 rounded-lg">
                  <span className="text-zinc-650 block text-[9px] uppercase">DATABASE LINK</span>
                  <span className="text-indigo-400">LOCAL_ISOLATION_RELIABILITY_PASS</span>
                </div>
                <div className="p-3 bg-black/40 border border-zinc-900 rounded-lg">
                  <span className="text-zinc-650 block text-[9px] uppercase">TRAFFIC GATEWAYS</span>
                  <span>TLS_INSEC_BLOCKED (Active Firewalls)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Feature Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-12" id="app-features">
        <div className="text-center md:text-left space-y-3">
          <span className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-widest font-bold">TECHNICAL SPECIFICATIONS MODULES</span>
          <h2 className="text-3xl font-light text-white uppercase tracking-tight">Core Application Capabilities</h2>
          <div className="h-0.5 w-12 bg-[#FF3D4F] mt-2 block" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getAppFeatures().map((f, i) => (
            <div key={i} className="bg-zinc-950 p-6 rounded-xl border border-zinc-900 text-left space-y-3 hover:border-[#FF3D4F]/30 transition-all">
              <div className="w-9 h-9 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-center text-[#FF3D4F]">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-white uppercase tracking-wider">{f.title}</h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-light">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Integration Lead Capture */}
      <section className="py-20 border-t border-zinc-900/60 px-6 max-w-7xl mx-auto" id="app-lead-form">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-[#FF3D4F] font-mono text-[10px] font-bold tracking-widest uppercase">
              REQUISITION & PILOT DEPLOYMENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-white uppercase tracking-tight leading-none">
              Setup Your Sovereign <br />
              Workspace Matrix
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
              Submit your specific business parameters, estimated checkout lines, client databases, and security configurations. A senior technical deployment manager will reach out with a direct docker container pilot or localized installer binary package.
            </p>

            <ul className="space-y-4 text-xs">
              <li className="flex items-center gap-3">
                <span className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>Fast provisioning within 48-72 business hours</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>Localized offline client setup assistance included</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-zinc-950 border border-zinc-900/60 p-8 rounded-2xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleLeadSubmit} 
                    className="space-y-5 text-left"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-zinc-500 block font-mono font-bold">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={leadForm.name}
                          onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                          className="w-full bg-[#050510] border border-zinc-800 text-xs text-white rounded-lg px-3.5 py-2.5 focus:border-[#FF3D4F] focus:outline-none focus:ring-1 focus:ring-[#FF3D4F]/30 transition-all"
                          placeholder="e.g. Tanvir Rahman"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-zinc-500 block font-mono font-bold">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          className="w-full bg-[#050510] border border-zinc-800 text-xs text-white rounded-lg px-3.5 py-2.5 focus:border-[#FF3D4F] focus:outline-none focus:ring-1 focus:ring-[#FF3D4F]/30 transition-all"
                          placeholder="tanvir@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-zinc-500 block font-mono font-bold">Company / Project Name</label>
                        <input
                          type="text"
                          value={leadForm.company}
                          onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                          className="w-full bg-[#050510] border border-zinc-800 text-xs text-white rounded-lg px-3.5 py-2.5 focus:border-[#FF3D4F] focus:outline-none transition-all"
                          placeholder="e.g. Eurosia Corp Bangladesh"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-zinc-500 block font-mono font-bold">Estimated Terminal Nodes</label>
                        <select
                          value={leadForm.nodesCount}
                          onChange={(e) => setLeadForm({ ...leadForm, nodesCount: e.target.value })}
                          className="w-full bg-[#050510] border border-zinc-800 text-xs text-white rounded-lg px-3.5 py-2.5 focus:border-[#FF3D4F] focus:outline-none transition-all"
                        >
                          <option value="1-10">1 - 10 nodes</option>
                          <option value="11-50">11 - 50 nodes</option>
                          <option value="51-200">51 - 200 nodes</option>
                          <option value="200+">200+ Global Nodes</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-zinc-500 block font-mono font-bold">Requirements / Target Workflows</label>
                      <textarea
                        rows={3}
                        value={leadForm.scope}
                        onChange={(e) => setLeadForm({ ...leadForm, scope: e.target.value })}
                        className="w-full bg-[#050510] border border-zinc-800 text-xs text-white rounded-lg px-3.5 py-2.5 focus:border-[#FF3D4F] focus:outline-none transition-all"
                        placeholder="Detail which workflows should run completely offline, barcode integrations, printer setup, database limits etc."
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
                      <p className="text-[10px] text-zinc-500 font-light flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" /> Enterprise secure form submission
                      </p>
                      
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-2.5 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white font-mono text-[10px] font-extrabold uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>SUBMIT BLUEPRINT REQUEST</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16 text-center space-y-4"
                  >
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                    <h4 className="font-extrabold text-sm uppercase text-white tracking-widest">BLUEPRINT SPECIFICATIONS RECEIVED</h4>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-md mx-auto">
                      Thank you, {leadForm.name || "Officer"}. Your core requirements have been successfully written to Eurosia’s active queue registry. A senior technical architect will evaluate the parameters and transmit deployment binaries.
                    </p>
                    <div className="pt-2 font-mono text-[9px] text-zinc-600">
                      REGISTRY ID: EUX-{Math.floor(Math.random() * 900000 + 100000)} | STATE: ENQUEUED
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-[#020205] border-t border-zinc-900/60 px-6" id="app-faqs">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <HelpCircle className="w-8 h-8 text-[#FF3D4F] mx-auto animate-pulse" />
            <h2 className="text-3xl font-light text-white uppercase tracking-tight">Technical FAQS</h2>
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest font-bold">Frequently Asked Technical Queries</p>
          </div>

          <div className="space-y-4">
            {appFaqs.map((faq, idx) => {
              const isExpanded = expandedFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-zinc-950 border border-zinc-905 rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                    className="w-full p-5 text-left flex justify-between items-center gap-4 focus:outline-none hover:bg-zinc-900/40 cursor-pointer"
                  >
                    <h4 className="font-extrabold text-xs text-white uppercase tracking-wider flex items-start gap-1.5">
                      <span className="text-[#FF3D4F] font-mono shrink-0">['Q']</span>
                      <span>{faq.q}</span>
                    </h4>
                    <ChevronRight className={`w-4 h-4 text-[#FF3D4F] transition-transform duration-250 shrink-0 ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 pt-0 text-[11px] text-zinc-400 leading-relaxed font-light border-t border-zinc-900/50 pl-5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp contact button */}
      <div className="fixed bottom-6 right-6 z-50 group flex items-center gap-2">
        <div className="bg-black/90 border border-zinc-800 px-3 py-1.5 rounded-xl text-[10px] font-mono tracking-wider text-emerald-400 font-bold uppercase transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 pointer-events-none shadow-md backdrop-blur-sm">
          Chat regarding {appName}
        </div>
        <a
          href={getWhatsAppUrl('expert')}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba56] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 relative border border-[#25D366]/20 group-hover:shadow-[#25D366]/20 group-hover:shadow-2xl"
          aria-label="Contact on WhatsApp"
        >
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

import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, Check, Play, Star, ArrowUpRight, 
  Layers, Smile, Cpu, Cloud, Bot, Server, Globe, Activity, 
  Shield, PhoneCall, DollarSign, Mic, MessageSquareText, ShieldAlert,
  Building2, BookOpen, Receipt, Hourglass, Wheat, ShoppingBag, Megaphone,
  Network, Zap, RefreshCw, Layers3, Users, Landmark, ChevronRight
} from 'lucide-react';
import { PremiumCardWrapper } from '../PremiumCardWrapper';

interface HomeProps {
  onLoginClick: () => void;
  onStartTrialClick: () => void;
  onExploreDashboard: () => void;
  apps: any[];
  solutions: any[];
  onNavigate?: (path: string) => void;
}

export default function Home({
  onLoginClick,
  onStartTrialClick,
  onExploreDashboard,
  apps,
  solutions,
  onNavigate
}: HomeProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'retail' | 'healthcare' | 'ai' | 'industry'>('all');

  // Trusted Stats of Eurosia
  const stats = [
    { value: "5,000+", label: "Businesses Connected", desc: "Deploying production nodes daily" },
    { value: "15+", label: "Countries Active", desc: "Crossing regional regulatory frameworks" },
    { value: "99.9%", label: "Uptime Guaranteed", desc: "Governed by active telemetry nodes" }
  ];

  // Icons mapper helper
  const getIcon = (name: string, className = "w-6 h-6") => {
    switch (name) {
      case 'Building2': return <Building2 className={className} />;
      case 'Bot': return <Bot className={className} />;
      case 'PhoneCall': return <PhoneCall className={className} />;
      case 'DollarSign': return <DollarSign className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'Activity': return <Activity className={className} />;
      case 'Mic': return <Mic className={className} />;
      case 'MessageSquareText': return <MessageSquareText className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'BookOpen': return <BookOpen className={className} />;
      case 'Receipt': return <Receipt className={className} />;
      case 'Hourglass': return <Hourglass className={className} />;
      case 'Wheat': return <Wheat className={className} />;
      case 'Cloud': return <Cloud className={className} />;
      case 'ShoppingBag': return <ShoppingBag className={className} />;
      case 'Megaphone': return <Megaphone className={className} />;
      default: return <Cpu className={className} />;
    }
  };

  // Why Choose Us features
  const features = [
    {
      title: "Isolated Node Security",
      desc: "Each tenant configuration resides in its own isolated cache layer, preventing crosstalk or security breaches while achieving instant multi-regional replication.",
      icon: <Shield className="w-5 h-5 text-[#FF3D4F]" />
    },
    {
      title: "Real-Time AI-Assistance",
      desc: "Autonomously parse invoices, log client calls, draft contracts, and conduct comprehensive financial auditing in real time using local Gemini LLM pipelines.",
      icon: <Sparkles className="w-5 h-5 text-red-500" />
    },
    {
      title: "Offline-First Synchronization",
      desc: "Keep processing sales, recording healthcare visits, and taking inventory even during major internet outstages. Local SQLite instances auto-merge to cloud.",
      icon: <RefreshCw className="w-5 h-5 text-red-400" />
    }
  ];

  // Testimonials (Human written, high conversion)
  const testimonials = [
    {
      quote: "Eurosia has fundamentally reshaped our retail multi-branch workflows. Operating POS registers offline while our inventory instantly syncs the moment nodes establish connectivity is truly incredible.",
      author: "Shamsur Rahman",
      role: "Chief Technology Officer",
      company: "Apex Retail Group",
      rating: 5,
      avatarBg: "bg-red-500/20 text-[#FF3D4F]"
    },
    {
      quote: "Running standard medical records under localized encryption ensures full healthcare policy compliance. The transition from manual billing to automated Eurosia Care in our clinics reduced operational delay by 45%.",
      author: "Dr. Farhana Yasmin",
      role: "Operations Director",
      company: "CareHealth Medical",
      rating: 5,
      avatarBg: "bg-amber-500/20 text-amber-400"
    },
    {
      quote: "Our global customer support was revolutionized by the Eurosia CloudPBX. Auto call routing, voice transcript analysis, and seamless staff sign-on saved us thousands of dollars.",
      author: "Michael Sterling",
      role: "Founder & CEO",
      company: "Sterling Communication Systems",
      rating: 5,
      avatarBg: "bg-blue-500/20 text-blue-400"
    }
  ];

  // Latest updates/news
  const updates = [
    {
      tag: "SYSTEM UPGRADE",
      title: "Eurosia POS v5.2 Native Sandbox Released",
      desc: "Introducing ultra-fast local invoice queues, advanced barcode parsing algorithms, and deep integration with mobile bkash terminal layers.",
      date: "June 12, 2026",
      readTime: "4 min read"
    },
    {
      tag: "AI DEVELOPMENT",
      title: "Kabyo Kotha AI Natural Tone Framework Upgrade",
      desc: "Enhanced Bengali conversational synthesis capabilities for regional voice dialing call centers. Achieved 94% customer sentiment classification accuracy.",
      date: "June 08, 2026",
      readTime: "6 min read"
    },
    {
      tag: "SECURITY CORNER",
      title: "Establishing Multi-Tenant Database Isolation Shield",
      desc: "We have fully deployed zero-trust containerization routines to protect regional database clusters and secure custom whitelabel setups.",
      date: "May 30, 2026",
      readTime: "3 min read"
    }
  ];

  // Fallback Product Portfolio List
  const portfolioApps = [
    { name: "EUROSIA POS", desc: "Smart Restaurant & Retail Management", icon: "ShoppingBag", cat: "retail", link: "/apps/eurosia-pos" },
    { name: "EUROSIA Care", desc: "Digital Clinic & Healthcare Platform", icon: "Activity", cat: "healthcare", link: "/apps/eurosia-care" },
    { name: "EUROSIA CloudPBX", desc: "Cloud PBX & Call Center System", icon: "PhoneCall", cat: "communication", link: "/apps/eurosia-cloudpbx" },
    { name: "EUROSIA AI Calling", desc: "AI-Powered Voice Automation", icon: "Mic", cat: "ai", link: "/apps/eurosia-ai-calling" },
    { name: "EUROSIA AI Chatbot", desc: "Autonomous Customer Support Agent", icon: "Bot", cat: "ai", link: "/apps/eurosia-ai-chatbot" },
    { name: "EUROSIA DataPilot AI", desc: "System Automation & Web Intelligence", icon: "Database", cat: "ai", link: "/apps/eurosia-datapilot-ai" },
    { name: "EUROSIA Defender X", desc: "Global Zero-Trust Cyber Defense", icon: "ShieldAlert", cat: "cybersecurity", link: "/apps/eurosia-defender-x" },
    { name: "EUROSIA BuildNex", desc: "Property ERP & Construction Flow", icon: "Building2", cat: "industry", link: "/apps/eurosia-buildnex" },
    { name: "EUROSIA InvoiceNex", desc: "Intelligent Custom Billing System", icon: "Receipt", cat: "industry", link: "/apps/eurosia-invoicenex" },
    { name: "EUROSIA PayBill", desc: "Bill Ledger & Multi-Gateway Adapter", icon: "Hourglass", cat: "industry", link: "/apps/eurosia-paybill" },
    { name: "NexFarmer", desc: "Agricultural Invoice & Crop Accounting", icon: "Wheat", cat: "industry", link: "/apps/nexfarmer" },
    { name: "EUROSIA Cloud", desc: "Advanced Multi-Tenant SaaS Master Core", icon: "Cloud", cat: "retail", link: "/apps/eurosia-cloud" }
  ];

  return (
    <div className="animate-fadeIn">
      {/* ━━━━━━━━━━━━━━━━ HERO SECTION ━━━━━━━━━━━━━━━━ */}
      <section className="relative pt-24 pb-28 px-6 overflow-hidden bg-black text-white">
        {/* Cyberpunk matrix vector and glowing red backdrops */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#090916_1px,transparent_1px),linear-gradient(to_bottom,#090916_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40"></div>
        <div className="absolute top-[10%] right-[10%] w-[450px] h-[450px] bg-red-600/10 rounded-full filter blur-[120px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-[5%] left-[5%] w-[350px] h-[350px] bg-indigo-950/25 rounded-full filter blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF3D4F]/10 border border-[#FF3D4F]/30 rounded-full text-xs font-semibold tracking-wider text-[#FF3D4F] uppercase animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE ECOSYSTEM-POWERED BUSINESS OS</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7.5xl font-extrabold leading-[1.05] tracking-tight text-white font-sans">
              Your Complete<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-400 to-[#FF3D4F]">Business</span><br />
              Operating System
            </h1>

            <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed max-w-xl">
              EUROSIA App Ecosystem integrates enterprise planning, secure digital billing, intelligent local AI nodes, advanced CloudPBX communication gateways, and threat-shielded cyber defenses into a unified, high-performing workspace. 
            </p>

            {/* BUTTON Group */}
            <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-4 pt-2">
              <button 
                onClick={onStartTrialClick}
                className="px-6 py-4 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white font-bold text-xs tracking-wider rounded-xl shadow-xl shadow-[#FF3D4F]/15 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 font-sans shrink-0"
              >
                <span>Start with EUROSIA App</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={onExploreDashboard}
                className="px-6 py-4 bg-zinc-950 hover:bg-zinc-900 text-white font-bold text-xs tracking-wider rounded-xl border border-zinc-800 hover:border-zinc-700 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 font-sans shrink-0"
              >
                <span>Explore Ecosystem</span>
                <Play className="w-3.5 h-3.5 text-[#FF3D4F] fill-current" />
              </button>
              <button 
                onClick={() => onNavigate && onNavigate('/custom-solution')}
                className="px-6 py-4 bg-transparent hover:bg-[#FF3D4F]/10 text-[#FF3D4F] hover:text-white font-bold text-xs tracking-wider rounded-xl border border-[#FF3D4F] hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 font-sans shrink-0"
              >
                <span>Need Custom Spec?</span>
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              </button>
            </div>

            {/* Micro trusted metrics stack */}
            <div className="pt-8 border-t border-zinc-900/60 grid grid-cols-3 gap-6">
              {stats.map((st, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">{st.value}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{st.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            {/* Visual preview block representing four feature cards */}
            <div className="relative bg-gradient-to-tr from-zinc-950 to-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-3xl overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#FF3D4F]/20 rounded-full filter blur-xl group-hover:scale-125 transition-transform duration-500"></div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-800pb-4 pb-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Active System Modules</span>
                  <span className="text-[9px] font-mono text-[#FF3D4F] bg-[#FF3D4F]/10 border border-[#FF3D4F]/20 px-2 py-0.5 rounded uppercase">Zero Trust</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 hover:border-[#FF3D4F]/40 hover:bg-zinc-900/60 rounded-xl transition-all group/card">
                    <Bot className="w-5 h-5 text-[#FF3D4F] mb-3 group-hover/card:scale-110 transition-transform" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">AI Assistant</h4>
                    <p className="text-[9px] text-zinc-400 mt-1">Autonomous reports & contract parser</p>
                  </div>

                  <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 hover:border-[#FF3D4F]/40 hover:bg-zinc-900/60 rounded-xl transition-all group/card">
                    <ShoppingBag className="w-5 h-5 text-[#FF3D4F] mb-3 group-hover/card:scale-110 transition-transform" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">POS System</h4>
                    <p className="text-[9px] text-zinc-400 mt-1">Smart offline billing & registers</p>
                  </div>

                  <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 hover:border-[#FF3D4F]/40 hover:bg-zinc-900/60 rounded-xl transition-all group/card">
                    <PhoneCall className="w-5 h-5 text-[#FF3D4F] mb-3 group-hover/card:scale-110 transition-transform" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Cloud PBX</h4>
                    <p className="text-[9px] text-zinc-400 mt-1">VoIP SIP servers & agent lines</p>
                  </div>

                  <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 hover:border-[#FF3D4F]/40 hover:bg-zinc-900/60 rounded-xl transition-all group/card">
                    <Activity className="w-5 h-5 text-[#FF3D4F] mb-3 group-hover/card:scale-110 transition-transform" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Analytics</h4>
                    <p className="text-[9px] text-zinc-400 mt-1">Ledger summaries & real-time audits</p>
                  </div>
                </div>

                <div className="p-3 bg-[#FF3D4F]/5 border border-[#FF3D4F]/20 rounded-xl flex items-center justify-between text-[11px] font-mono text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <Network className="w-3.5 h-3.5 text-[#FF3D4F] animate-pulse" />
                    Node ID: EUR-8839-MAIN
                  </span>
                  <span className="text-emerald-400 font-bold">● ACTIVE GATEWAY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ VALUE STRIP ECOSYSTEM ━━━━━━━━━━━━━━━━ */}
      <section className="bg-white text-zinc-950 border-y border-zinc-200 py-10 px-6 font-sans relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <span className="p-2.5 bg-red-50 text-[#FF3D4F] rounded-xl"><Layers className="w-5 h-5" /></span>
            <div className="text-left font-sans">
              <h5 className="font-bold text-xs text-zinc-900">One Platform</h5>
              <p className="text-[9px] text-zinc-500 font-semibold tracking-wider uppercase">Unified Systems</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <span className="p-2.5 bg-zinc-100 text-zinc-900 rounded-xl"><Smile className="w-5 h-5" /></span>
            <div className="text-left font-sans">
              <h5 className="font-bold text-xs text-zinc-900">One Login</h5>
              <p className="text-[9px] text-zinc-500 font-semibold tracking-wider uppercase">SSO Authentication</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <span className="p-2.5 bg-red-50 text-[#FF3D4F] rounded-xl"><Cpu className="w-5 h-5" /></span>
            <div className="text-left font-sans">
              <h5 className="font-bold text-xs text-zinc-900">Unlimited Apps</h5>
              <p className="text-[9px] text-zinc-500 font-semibold tracking-wider uppercase">Modular Suites</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <span className="p-2.5 bg-zinc-100 text-zinc-900 rounded-xl"><Cloud className="w-5 h-5" /></span>
            <div className="text-left font-sans">
              <h5 className="font-bold text-xs text-zinc-900">Offline + Cloud</h5>
              <p className="text-[9px] text-zinc-500 font-semibold tracking-wider uppercase">Resilient Sync</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <span className="p-2.5 bg-red-50 text-[#FF3D4F] rounded-xl"><Bot className="w-5 h-5" /></span>
            <div className="text-left font-sans">
              <h5 className="font-bold text-xs text-zinc-900">AI-Native</h5>
              <p className="text-[9px] text-zinc-500 font-semibold tracking-wider uppercase">Intelligent Autopilot</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <span className="p-2.5 bg-zinc-100 text-[#FF3D4F] rounded-xl"><Server className="w-5 h-5" /></span>
            <div className="text-left font-sans">
              <h5 className="font-bold text-xs text-zinc-900">Multi-Tenant SaaS</h5>
              <p className="text-[9px] text-zinc-500 font-semibold tracking-wider uppercase">Infinite Scaling</p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ TECHNOLOGY LAYERS ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-6 bg-black border-b border-zinc-900 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-widest font-bold">Powerful Technology Layers</p>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">Built on a Strong Foundation</h2>
            <div className="h-0.5 w-12 bg-[#FF3D4F] mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#05051B] p-8 rounded-2xl border border-zinc-900 hover:border-[#FF3D4F]/50 group transition-all duration-300 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full filter blur-xl group-hover:scale-150 transition-all pointer-events-none"></div>
              <div className="w-12 h-12 bg-red-500/10 text-[#FF3D4F] border border-[#FF3D4F]/20 rounded-xl flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white mb-2 group-hover:text-[#FF3D4F] transition-colors uppercase">Business Management Layer</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Enterprise resource planning frameworks including HR management operations, active double-entry accounting files, project taskboards, and secure logistics channels.
              </p>
            </div>

            <div className="bg-[#05051B] p-8 rounded-2xl border border-zinc-900 hover:border-[#FF3D4F]/50 group transition-all duration-300 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full filter blur-xl group-hover:scale-150 transition-all pointer-events-none"></div>
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl flex items-center justify-center mb-6">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white mb-2 group-hover:text-[#FF3D4F] transition-colors uppercase">Artificial Intelligence Layer</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Context-aware customer communication chatbots, automated invoice parsing engines, dynamic audio transcript matrices, and smart corporate reports.
              </p>
            </div>

            <div className="bg-[#05051B] p-8 rounded-2xl border border-zinc-900 hover:border-[#FF3D4F]/50 group transition-all duration-300 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full filter blur-xl group-hover:scale-150 transition-all pointer-events-none"></div>
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white mb-2 group-hover:text-[#FF3D4F] transition-colors uppercase">Communication Layer</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Eurosia CloudPBX frameworks, VoIP SIP terminals registration, live chat aggregation streams, and structured call logs bridging regional office teams.
              </p>
            </div>

            <div className="bg-[#05051B] p-8 rounded-2xl border border-zinc-900 hover:border-[#FF3D4F]/50 group transition-all duration-300 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full filter blur-xl group-hover:scale-150 transition-all pointer-events-none"></div>
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white mb-2 group-hover:text-[#FF3D4F] transition-colors uppercase">Fintech Layer</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Omnichannel double-entry ledgers, dynamic customer invoice generation, secure bKash payment API integrations, and automate monthly payouts.
              </p>
            </div>

            <div className="bg-[#05051B] p-8 rounded-2xl border border-zinc-900 hover:border-[#FF3D4F]/50 group transition-all duration-300 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full filter blur-xl group-hover:scale-150 transition-all pointer-events-none"></div>
              <div className="w-12 h-12 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white mb-2 group-hover:text-[#FF3D4F] transition-colors uppercase">Cybersecurity Layer</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Full-device binding authorization codes, rigid local cache encryption keys, isolated memory processes, and continuous auditing telemetry nodes.
              </p>
            </div>

            <div className="bg-[#05051B] p-8 rounded-2xl border border-zinc-900 hover:border-[#FF3D4F]/50 group transition-all duration-300 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full filter blur-xl group-hover:scale-150 transition-all pointer-events-none"></div>
              <div className="w-12 h-12 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white mb-2 group-hover:text-[#FF3D4F] transition-colors uppercase">Industry Solutions Layer</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Custom pre-packaged application clusters designed for healthcare clinic charts, construction material procurement logs, and farming invoicing maps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ PRODUCT PORTFOLIO ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-6 bg-[#02020A] relative text-zinc-300">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-900 pb-8 text-left">
            <div className="space-y-3">
              <p className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-widest font-bold">Our Product Portfolio</p>
              <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">Unlimited Solutions. One Ecosystem.</h2>
            </div>
            
            {/* Quick Filter tabs */}
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              {(['all', 'retail', 'healthcare', 'ai', 'industry'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                    activeTab === t 
                      ? 'bg-[#FF3D4F] text-white border-[#FF3D4F]' 
                      : 'bg-zinc-950/80 text-zinc-500 border-zinc-800 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioApps
              .filter(app => activeTab === 'all' || app.cat === activeTab)
              .map((app, index) => (
                <PremiumCardWrapper
                  key={index}
                  title={app.name}
                  url={app.link}
                  ctaText="View Details"
                  onNavigate={onNavigate}
                  className="bg-zinc-950/80 p-6 rounded-xl border border-zinc-900 h-56 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="premium-card-icon w-10 h-10 bg-[#FF3D4F]/10 text-[#FF3D4F] border border-[#FF3D4F]/20 rounded-lg flex items-center justify-center">
                        {getIcon(app.icon, "w-5 h-5")}
                      </div>
                      <span className="text-[9px] font-mono text-zinc-500 border border-zinc-850 bg-zinc-900/40 px-2 py-0.5 rounded uppercase font-bold">
                        {app.cat}
                      </span>
                    </div>
                    <div>
                      <h4 className="premium-card-title font-bold text-white transition-colors">{app.name}</h4>
                      <p className="premium-card-desc text-[11px] text-zinc-400 mt-1">{app.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-900/40 text-[10px] font-mono text-zinc-500">
                    <span className="uppercase">{app.cat}</span>
                    <span className="text-[#FF3D4F] inline-flex items-center gap-1">LAUNCH ➔</span>
                  </div>
                </PremiumCardWrapper>
              ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ WHY CHOOSE US WORKSPACE ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-6 bg-black relative border-t border-zinc-950">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-[#FF3D4F] font-mono text-[10px] font-bold tracking-widest uppercase">
              EXPERIENCE NEXT GEN SCALING
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
              Enterprise Resilience Designed for Global Business
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
              We stand apart from legacy, fragmented architectures by ensuring complete offline autonomy paired with high-frequency database synchronization routines. Our security models actively block unauthorized intrusion attempts, yielding a bulletproof software core.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-[#FF3D4F]/10 text-[#FF3D4F] border border-[#FF3D4F]/30 rounded-lg shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Zero Setup Latency</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Configure, map regional warehouses and active licenses in minutes.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-[#FF3D4F]/10 text-[#FF3D4F] border border-[#FF3D4F]/30 rounded-lg shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Dynamic Multi-Tenant Separation</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Each agency license has isolated file storage and memory rings.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-[-5%] left-[50%] w-56 h-56 bg-[#FF3D4F]/5 rounded-full filter blur-xl pointer-events-none"></div>
              
              <h3 className="text-sm font-bold text-white text-left uppercase tracking-wider border-b border-zinc-900 pb-3">Why Industry Leaders Choose Eurosia</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((feat, index) => (
                  <PremiumCardWrapper 
                    key={index} 
                    title={feat.title}
                    url="/custom-solution"
                    ctaText="Learn More"
                    onNavigate={onNavigate}
                    className="space-y-3 p-4 bg-zinc-900/40 rounded-xl border border-zinc-900 text-left"
                  >
                    <div className="premium-card-icon w-9 h-9 bg-zinc-950 rounded-lg flex items-center justify-center border border-zinc-800 text-indigo-400">
                      {feat.icon}
                    </div>
                    <h4 className="premium-card-title font-bold text-xs text-white uppercase tracking-wider">{feat.title}</h4>
                    <p className="premium-card-desc text-[11px] text-zinc-400 leading-relaxed font-light">{feat.desc}</p>
                  </PremiumCardWrapper>
                ))}
                
                <div className="p-4 bg-[#FF3D4F]/10 rounded-xl border border-[#FF3D4F]/20 text-left flex flex-col justify-between h-40">
                  <span className="text-[11.5px] font-mono text-white leading-normal font-medium">Have dedicated hardware requirements or need an on-premise custom binary built?</span>
                  <button 
                    onClick={onLoginClick}
                    className="text-[11px] font-bold text-[#FF3D4F] uppercase tracking-wider inline-flex items-center gap-1.5 hover:underline text-left mt-3"
                  >
                    Contact Enterprise Node ➔
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ WORKFLOW STEPS ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-6 bg-[#02020A]/80 relative overflow-hidden text-zinc-300">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-widest font-bold">SIMPLE STEPS TO COMPLETE BUSINESS MANAGEMENT</p>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">How EUROSIA App Ecosystem Works</h2>
            <div className="h-0.5 w-12 bg-[#FF3D4F] mx-auto mt-4" />
          </div>

          <div className="grid sm:grid-cols-3 lg:grid-cols-9 gap-6 text-zinc-300 font-sans">
            {[
              { num: "01", name: "Visit Website", act: "Explore Suite", detail: "Browse modular applications suites" },
              { num: "02", name: "Create Account", act: "Register", detail: "Set up security credentials" },
              { num: "03", name: "Create Company", act: "Tenant Setup", detail: "Set up company records" },
              { num: "04", name: "Choose Apps", act: "Select Suite", detail: "Install custom app modular vectors" },
              { num: "05", name: "Activate License", act: "Secure Link", detail: "Map license tokens on terminal devices" },
              { num: "06", name: "Use Dashboard", act: "Manage Live", detail: "Operate invoice, communications, and audit tools" },
              { num: "07", name: "Work Offline", act: "Local Safe", detail: "Run registers without active connection" },
              { num: "08", name: "Auto Sync Cloud", act: "Merge Data", detail: "Push saved registers to web nodes" },
              { num: "09", name: "Scale & Grow", act: "Add Nodes", detail: "Deploy more terminals, operators and branches" }
            ].map((step, idx) => (
              <div 
                key={idx} 
                className="bg-zinc-950/80 p-5 rounded-2xl border border-zinc-900 hover:border-[#FF3D4F]/30 hover:bg-zinc-900/20 text-left transition-all lg:col-span-3 flex flex-col justify-between h-48 relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-mono font-black text-[#FF3D4F]/30">{step.num}</span>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 font-mono">
                      {step.act}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white tracking-tight uppercase">{step.name}</h4>
                  <p className="text-[11px] text-zinc-400 mt-2 font-light leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ TESTIMONIALS SLIDER ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-6 bg-black relative border-t border-zinc-900">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-widest font-bold">REAL REVIEWS FROM INDUSTRY READINESS</span>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">Trusted by Leading Companies</h2>
            <div className="h-0.5 w-12 bg-[#FF3D4F] mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((test, index) => (
              <div 
                key={index} 
                className="bg-zinc-950/70 p-8 rounded-2xl border border-zinc-900 hover:border-[#FF3D4F]/30 hover:scale-[1.01] transition-all text-left flex flex-col justify-between h-80 relative"
              >
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-red-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-300 italic leading-relaxed font-light">
                    "{test.quote}"
                  </p>
                </div>
                
                <div className="flex items-center gap-3 pt-4 border-t border-zinc-900/50 mt-6">
                  <div className={`w-9 h-9 rounded-full ${test.avatarBg} flex items-center justify-center font-bold text-xs shrink-0`}>
                    {test.author[0]}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase">{test.author}</h5>
                    <p className="text-[10px] text-zinc-500">{test.role}, <span className="text-zinc-400 font-semibold">{test.company}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ SERVICE / LATEST UPDATES NEWS ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-6 bg-[#02020A] relative text-zinc-300 border-t border-zinc-950">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-widest font-bold">ANNOUNCEMENTS & LATEST ARTICLES</span>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">Stay Connected with Updates</h2>
            <div className="h-0.5 w-12 bg-[#FF3D4F] mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {updates.map((up, i) => (
              <PremiumCardWrapper 
                key={i} 
                title={up.title}
                url="/custom-solution"
                ctaText="Learn More"
                onNavigate={onNavigate}
                className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl flex flex-col justify-between h-72 text-left"
              >
                <div className="space-y-4">
                  <span className="text-[9px] font-mono font-bold text-[#FF3D4F] bg-[#FF3D4F]/10 border border-[#FF3D4F]/20 px-2 py-0.5 rounded uppercase self-start">
                    {up.tag}
                  </span>
                  <h4 className="premium-card-title font-bold text-base text-white transition-colors leading-snug">
                    {up.title}
                  </h4>
                  <p className="premium-card-desc text-xs text-zinc-400 leading-relaxed font-light line-clamp-3">
                    {up.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-900/50 mt-4 flex items-center justify-between text-[10px] font-mono text-zinc-500 w-full">
                  <span>{up.date}</span>
                  <span>{up.readTime}</span>
                </div>
              </PremiumCardWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ PITCH BAR CTA ━━━━━━━━━━━━━━━━ */}
      <section className="py-16 px-6 relative bg-gradient-to-r from-black via-zinc-950 to-black border-y border-zinc-900 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight max-w-4xl mx-auto leading-snug">
          Build, manage and scale your entire business operations<br />
          from <span className="font-bold text-[#FF3D4F]">one unified, cloud-secure platform.</span>
        </h2>
        <button 
          onClick={onStartTrialClick}
          className="px-8 py-3 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white font-bold text-xs tracking-wider rounded-lg shadow-xl shadow-[#FF3D4F]/10 cursor-pointer hover:scale-[1.03] active:scale-95 transition-all font-sans"
        >
          Start with EUROSIA App
        </button>
      </section>
    </div>
  );
}

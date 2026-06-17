import React from 'react';
import { 
  Building2, Milestone, ShieldCheck, Landmark, Users, 
  Sparkles, Globe, Heart, Award, ArrowRight
} from 'lucide-react';

interface AboutProps {
  onLoginClick: () => void;
  onStartTrialClick: () => void;
}

export default function About({
  onLoginClick,
  onStartTrialClick
}: AboutProps) {
  const values = [
    {
      title: "Zero-Trust Sovereignty",
      desc: "Each tenant deserves isolated data space and memory cycles. We actively build frameworks that enforce privacy automatically without security compromises.",
      icon: <ShieldCheck className="w-5 h-5 text-[#FF3D4F]" />
    },
    {
      title: "Continuous Innovation",
      desc: "We prioritize building robust local-offline architectures rather than superficial cosmetic charts. Core stability guides every software bundle we compile.",
      icon: <Sparkles className="w-5 h-5 text-red-500" />
    },
    {
      title: "Human Empathetic Focus",
      desc: "We write software to assist retail employees, medical staff, and voice support personnel in performing critical assignments safely with lower cognitive strain.",
      icon: <Heart className="w-5 h-5 text-red-400" />
    }
  ];

  const milestones = [
    { year: "2021", event: "Ecosystem Foundation", desc: "First release of unified multi-tenant database frameworks." },
    { year: "2023", event: "Empowering 2,000+ Retail Nodes", desc: "Eurosia POS offline invoice queues deployed globally." },
    { year: "2025", event: "Eurosia Care Medical Suite", desc: "Digital clinical charts with localized encryption launched." },
    { year: "2026", event: "Voice Dialing Call Automation", desc: "Kabyo Kotha AI voice system deployed for regional call centers." }
  ];

  return (
    <div className="animate-fadeIn min-h-screen text-zinc-300 text-left">
      {/* ━━━━━━━━━━━━━━━━ ABOUT HERO HERO ━━━━━━━━━━━━━━━━ */}
      <section className="relative pt-24 pb-20 px-6 bg-black text-white overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1033_1px,transparent_1px),linear-gradient(to_bottom,#0c1033_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25"></div>
        <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-red-600/10 rounded-full filter blur-[100px] animate-pulse"></div>

        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-[#FF3D4F] rounded-full text-[10px] font-bold tracking-widest uppercase">
            <Building2 className="w-3.5 h-3.5" />
            <span>TRANSFORMING GLOBAL BUSINESS SOFTWARE MANAGEMENT</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase">
            The Eurosia Narrative <br />
            <span className="text-[#FF3D4F] font-sans">& Core Values</span>
          </h1>

          <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed max-w-2xl">
            We are a decentralized network of engineers, designers, and systems architects. Our core objective is writing robust, secure business software interfaces that run beautifully under extreme real-world constraints.
          </p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ DESIGN STORY STORY ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-widest font-bold">OUR ORIGIN CHRONICLE</span>
          <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">
            Tackling Software Fragmentation
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
            Eurosia was founded after witnessing countless businesses cope with expensive, legacy, and fragmented visual utilities that crash the moment internet connectivity spikes. Most operations spent significant capital paying external consultants just to link localized registers with central cloud databases.
          </p>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
            Our teams committed to writing an offline-capable, server-hardened business operating system. By consolidating client-SSO credentials, voice dialers, patient databases, and accounting ledgers under a single multi-tenant kernel, Eurosia eliminates integration costs and ensures secure deployment.
          </p>

          <div className="pt-4 border-t border-zinc-900/60 grid grid-cols-2 gap-6 font-sans">
            <div>
              <p className="text-2xl font-black text-white font-mono uppercase">24 Million+</p>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Audit logs merged</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#FF3D4F] font-mono uppercase">99.99% Uptime</p>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Targeted Node Recovery</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full filter blur-xl pointer-events-none"></div>
            
            <h3 className="font-bold text-sm text-white uppercase tracking-wider border-b border-zinc-900 pb-3 flex items-center gap-1.5 mb-6">
              <Award className="w-4 h-4 text-[#FF3D4F]" /> Corporate Capabilities
            </h3>

            <div className="space-y-4">
              {[
                { label: "Systems Architecture", score: "98%" },
                { label: "Offline-First Sync Speed", score: "0.2ms avg check" },
                { label: "Secure Multi-Tenant Isolation", score: "Grade-A Shield" }
              ].map((cap, i) => (
                <div key={i} className="space-y-1 text-xs">
                  <div className="flex justify-between font-mono font-bold text-zinc-400">
                    <span>{cap.label}</span>
                    <span className="text-[#FF3D4F]">{cap.score}</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 rounded-full" style={{ width: i === 0 ? '98%' : i === 1 ? '90%' : '95%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ CORE SYSTEM VALUES ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 bg-black border-y border-zinc-900">
        <div className="max-w-7xl mx-auto space-y-16 px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-widest font-bold">FOUNDATIONAL MATRICES</p>
            <h2 className="text-3xl font-light text-white uppercase tracking-tight">Our Core Values</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="bg-zinc-950 p-6 rounded-xl border border-zinc-900 text-left space-y-4">
                <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-center">
                  {val.icon}
                </div>
                <h4 className="font-bold text-sm text-white uppercase tracking-wider">{val.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ MILESTONES TIMELINE ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Milestone className="w-8 h-8 text-[#FF3D4F] mx-auto animate-pulse" />
          <h2 className="text-3xl font-light text-white uppercase tracking-tight">Evolution Milestones</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {milestones.map((m, i) => (
            <div 
              key={i} 
              className="bg-zinc-950 border border-zinc-900/80 p-6 rounded-xl text-left hover:border-[#FF3D4F]/30 transition-colors"
            >
              <span className="text-3xl font-mono font-black text-red-500/20">{m.year}</span>
              <h4 className="font-bold text-sm text-white uppercase mt-2">{m.event}</h4>
              <p className="text-xs text-zinc-400 mt-2 font-light leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ TRUST PITCH ━━━━━━━━━━━━━━━━ */}
      <section className="py-16 bg-gradient-to-r from-zinc-950 via-[#FF3D4F]/5 to-zinc-950 text-center space-y-6">
        <h3 className="text-xl font-light text-white tracking-tight uppercase">
          Eager to register your company and verify our <br />
          core <span className="font-bold text-[#FF3D4F]">tenant isolation metrics?</span>
        </h3>
        <button
          onClick={onStartTrialClick}
          className="px-6 py-3 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white font-bold text-xs tracking-wider rounded-lg transition-all cursor-pointer uppercase inline-flex items-center gap-1.5"
        >
          Begin Free Activation ➔
        </button>
      </section>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  ShoppingBag, Sparkles, Code, Check, ArrowRight, ShieldCheck, 
  HelpCircle, Star, Search, Filter, HelpCircle as Ask, 
  Pocket, Zap, Network, Bot, PhoneCall, DollarSign, Database
} from 'lucide-react';

interface MarketplaceProps {
  onLoginClick: () => void;
  onStartTrialClick: () => void;
}

export default function Marketplace({
  onLoginClick,
  onStartTrialClick
}: MarketplaceProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'fintech' | 'telecom' | 'utilities'>('all');
  const [search, setSearch] = useState('');

  const catalog = [
    {
      id: "addon-sip",
      name: "Eurosia SIP Trunk Extender",
      desc: "Connect local SIP physical trunk lines directly with our cloud-PBX dialing routing channels. Supports automated caller ID tracking and callback queues.",
      price: "৳ 1,500/mo",
      rating: 4.9,
      cat: "telecom",
      icon: <PhoneCall className="w-5 h-5 text-blue-400" />,
      features: ["Low-latency voice streams", "SIP Trunk auto-failover", "Caller ID logs"]
    },
    {
      id: "addon-bio",
      name: "Biometric Hardware Gate Sync",
      desc: "Synchronize local fingerprints, facial scanners or RFID time clocks with our cloud HR rosters. Automatic device authentication keys mapped.",
      price: "৳ 2,990/mo",
      rating: 4.8,
      cat: "utilities",
      icon: <Database className="w-5 h-5 text-yellow-500" />,
      features: ["Wiegand reader compatible", "Real-time clock validation", "Isolated log memory"]
    },
    {
      id: "addon-bkash",
      name: "bKash Automatic Checkout API",
      desc: "Establish direct bank-audited payment hooks inside individual retail registers. Pushes instant callbacks to invoice status matrices upon cash match.",
      price: "৳ 990/mo",
      rating: 4.9,
      cat: "fintech",
      icon: <DollarSign className="w-5 h-5 text-[#FF3D4F]" />,
      features: ["Tokenized payment tokens", "Split business payouts", "Chargeback webhooks"]
    },
    {
      id: "addon-wp",
      name: "WhatsApp Omnichannel Bot Integration",
      desc: "Map messaging loops directly with active customer CRM sheets. Automatically transcribes text arrays, suggests templates and triggers shipping notices.",
      price: "৳ 1,200/mo",
      rating: 4.7,
      cat: "telecom",
      icon: <Bot className="w-5 h-5 text-emerald-400" />,
      features: ["Official Meta API connect", "Multi-agent assignment", "Fallback text loops"]
    }
  ];

  const filteredCatalog = catalog.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'all' || item.cat === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="animate-fadeIn min-h-screen text-zinc-300 text-left">
      {/* ━━━━━━━━━━━━━━━━ HERO HERO ━━━━━━━━━━━━━━━━ */}
      <section className="relative pt-24 pb-20 px-6 bg-black text-white overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1033_1px,transparent_1px),linear-gradient(to_bottom,#0c1033_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25"></div>
        <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-[#FF3D4F]/10 rounded-full filter blur-[100px] animate-pulse"></div>

        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-[#FF3D4F] rounded-full text-[10px] font-bold tracking-widest uppercase">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>EUROSIA APPLICATION MODULE PLUGINS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase">
            Integrated Cyber <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-[#FF3D4F]">Marketplace Storefronts</span>
          </h1>

          <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed max-w-2xl">
            Acquire specialized add-on plugins, physical device connectors, automated API bindings, or customized whitelabel templates to supercharge your modular business operating system.
          </p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ CATALOG GRID ━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        
        {/* Search controls */}
        <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search add-on catalog..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#05051B] border border-zinc-800 focus:border-[#FF3D4F] text-white rounded-xl pl-11 pr-4 py-2.5 text-xs focus:outline-none placeholder-zinc-500 font-semibold"
            />
          </div>

          <div className="flex gap-2">
            {(['all', 'fintech', 'telecom', 'utilities'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-[10px] font-bold tracking-wider uppercase border transition-all cursor-pointer ${activeCategory === cat ? 'bg-[#FF3D4F] text-white border-[#FF3D4F]' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Displays */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredCatalog.map(item => (
            <div 
              key={item.id}
              className="bg-zinc-950 border border-zinc-900 hover:border-[#FF3D4F]/50 p-8 rounded-2xl flex flex-col justify-between h-96 relative hover:shadow-2xl hover:shadow-red-500/5 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-zinc-900/40">
                  <div className="w-10 h-10 bg-[#FF3D4F]/10 border border-[#FF3D4F]/20 text-[#FF3D4F] rounded-lg flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">{item.price}</p>
                    <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono font-bold">LICENSED PORT</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white uppercase group-hover:text-[#FF3D4F] transition-colors">{item.name}</h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">{item.desc}</p>
                </div>

                <ul className="grid sm:grid-cols-2 gap-2 pt-2">
                  {item.features.map((feat, i) => (
                    <li key={i} className="text-[10px] font-mono text-zinc-400 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#FF3D4F]" /> {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={onStartTrialClick}
                className="w-full py-2.5 bg-zinc-900 group-hover:bg-[#FF3D4F] border border-zinc-800 group-hover:border-red-500 text-white rounded-lg text-xs font-bold font-sans uppercase tracking-wider mt-6 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Provision Extender Node</span>
                <Zap className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {filteredCatalog.length === 0 && (
            <div className="col-span-full py-16 text-center space-y-4">
              <Network className="w-12 h-12 text-zinc-600 mx-auto animate-spin" />
              <p className="text-zinc-500 font-mono text-xs uppercase">No plugins matched specified parameters.</p>
            </div>
          )}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ INTEGRATION GUIDELINES ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 bg-black border-y border-zinc-900 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-[#FF3D4F] font-mono text-[10px] uppercase tracking-widest font-bold">SIMPLE MANUAL CONNECTIONS</span>
          <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">How Store Addons Install</h2>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
            Eurosia makes hardware mapping straightforward. There are zero requirements for low-level socket programming or unencrypted telnet tunnels.
          </p>

          <div className="space-y-4 pt-2">
            {[
              { title: "Select Addon", desc: "Toggle checkout, click install and authenticate connection parameters." },
              { title: "Secure Terminal Binding", desc: "Input verification codes directly inside localized desktop registers." },
              { title: "Telemetry Validation", desc: "Acknowledge diagnostic confirmation packets and begin active operations." }
            ].map((st, i) => (
              <div key={i} className="flex gap-3 text-left">
                <span className="text-sm font-mono font-black text-[#FF3D4F]/30 self-start mt-0.5">0{i+1}</span>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{st.title}</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed font-light">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#05051B] p-8 rounded-2xl border border-zinc-900 space-y-4 text-left relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-red-600/5 rounded-full filter blur-xl pointer-events-none"></div>
          <h3 className="font-bold text-sm text-white uppercase tracking-wider pb-3 border-b border-zinc-900 flex items-center gap-1.5">
            <Code className="w-4 h-4 text-[#FF3D4F]" /> Webhook Verification Test
          </h3>
          <p className="text-xs text-zinc-400 leading-normal font-light">
            Developers can intercept instant callbacks and construct localized, custom telemetry dashboards using our standard REST triggers.
          </p>
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 text-[10.5px] font-mono leading-relaxed space-y-1">
            <p className="text-zinc-500">{"{"}</p>
            <p className="pl-4 text-[#FF3D4F]">"event": <span className="text-white">"transaction.completed"</span>,</p>
            <p className="pl-4 text-[#FF3D4F]">"license_port": <span className="text-white">3000</span>,</p>
            <p className="pl-4 text-[#FF3D4F]">"status": <span className="text-white">"merged_verified"</span></p>
            <p className="text-zinc-500">{"}"}</p>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ CONTACT MARKET DIALOG ━━━━━━━━━━━━━━━━ */}
      <section className="py-16 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-center space-y-6">
        <h3 className="text-xl font-light text-white uppercase tracking-tight">
          Are you a developer hoping to publish <br />
          modular client solutions on our <span className="font-bold text-[#FF3D4F]">storefront?</span>
        </h3>
        <button
          onClick={onLoginClick}
          className="px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-[#FF3D4F] text-zinc-300 hover:text-white text-xs font-bold rounded-lg tracking-wider transition-all cursor-pointer uppercase inline-flex items-center gap-1.5"
        >
          Request Developer Token ➔
        </button>
      </section>
    </div>
  );
}

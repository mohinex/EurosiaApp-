import React, { useState } from 'react';
import { 
  Search, Sparkles, Star, ChevronLeft, ChevronRight, 
  Check, ArrowRight, ShieldCheck, Cpu, Database, 
  HelpCircle, MessageSquare, Code, Play
} from 'lucide-react';
import { PremiumCardWrapper } from '../PremiumCardWrapper';

interface AppsProps {
  onLoginClick: () => void;
  onStartTrialClick: () => void;
  appsList: any[];
  onNavigate?: (path: string) => void;
}

export default function Apps({
  onLoginClick,
  onStartTrialClick,
  appsList,
  onNavigate
}: AppsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'retail' | 'healthcare' | 'communication' | 'ai' | 'cybersecurity' | 'industry'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter apps list
  const filteredApps = appsList.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const paginatedApps = filteredApps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const categories = [
    { id: 'all', label: 'All Suites' },
    { id: 'retail', label: 'Retail & Commerce' },
    { id: 'healthcare', label: 'Healthcare Systems' },
    { id: 'communication', label: 'Communications & VoIP' },
    { id: 'ai', label: 'Artificial Intelligence' },
    { id: 'cybersecurity', label: 'Cyber Defense' },
    { id: 'industry', label: 'Industry Specialized' }
  ] as const;

  const faqs = [
    {
      q: "Can I install specific apps or do I have to purchase the entire suite?",
      a: "Our ecosystem is fully modular. You are free to establish localized workspaces containing single applications (e.g. EUROSIA POS) and scale horizontally by installing CRM, CloudPBX, or digital invoice models down the road."
    },
    {
      q: "How does the cloud synchronization handle conflict resolution?",
      a: "When a node reconnects after working offline, our database engine runs high-frequency sync merges. If identical invoice indexes have split ledger records, the operator receives an automatic conflict selection prompt."
    },
    {
      q: "Is there on-premise installation support available?",
      a: "Yes. For wholesale enterprise contracts, we configure localized hardware, perform biometric terminal mapping, and build specialized offline binary instances under localized whitelabel domains."
    }
  ];

  return (
    <div className="animate-fadeIn min-h-screen text-zinc-300">
      {/* ━━━━━━━━━━━━━━━━ DESIGNED HERO BANNER ━━━━━━━━━━━━━━━━ */}
      <section className="relative pt-24 pb-20 px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1033_1px,transparent_1px),linear-gradient(to_bottom,#0c1033_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-[#FF3D4F]/10 rounded-full filter blur-[100px] animate-pulse"></div>

        <div className="max-w-7xl mx-auto space-y-6 text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-[#FF3D4F] rounded-full text-[10px] font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GLOBAL APPLICATION STACK MATRIX</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none uppercase">
            Eurosia Application <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-[#FF3D4F]">Portal Stores</span>
          </h1>

          <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed max-w-2xl">
            Explore our curated selection of high-performing, cloud-sync capable modular applications. Switch on specific tools to optimize medical schedules, process offline store invoices, run SIP VoIP routing, or secure local client ledgers with ease.
          </p>

          <div className="flex gap-4 pt-2">
            <div className="flex -space-x-2">
              <span className="w-8 h-8 rounded-full border-2 border-black bg-red-600/30 text-white font-bold text-[10px] flex items-center justify-center">E</span>
              <span className="w-8 h-8 rounded-full border-2 border-black bg-blue-600/30 text-white font-bold text-[10px] flex items-center justify-center">C</span>
              <span className="w-8 h-8 rounded-full border-2 border-black bg-amber-600/30 text-white font-bold text-[10px] flex items-center justify-center">A</span>
            </div>
            <p className="text-xs text-zinc-500 self-center font-mono">Governing 17+ active systems modules</p>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ INTERACTIVE APPLICATION GRID ━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        
        {/* Search Deck & Filters */}
        <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by application parameters..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full bg-[#05051B] border border-zinc-800 focus:border-[#FF3D4F] text-white rounded-xl pl-11 pr-4 py-3 text-xs focus:outline-none transition-all placeholder-zinc-500 font-semibold"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 justify-start">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
                className={`px-3.5 py-2 text-[10px] font-bold tracking-wider rounded-lg uppercase border transition-all cursor-pointer ${
                  selectedCategory === cat.id 
                    ? 'bg-[#FF3D4F] text-white border-[#FF3D4F] shadow-lg shadow-red-500/10'
                    : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Apps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {paginatedApps.map((app) => (
            <PremiumCardWrapper
              key={app.id}
              title={app.name}
              url={`/apps/${app.slug}`}
              ctaText="View Details"
              onNavigate={onNavigate}
              className="bg-zinc-950 p-6 rounded-2xl border border-zinc-900 h-72 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="premium-card-icon w-10 h-10 bg-[#FF3D4F]/10 text-[#FF3D4F] border border-[#FF3D4F]/20 rounded-xl flex items-center justify-center">
                    {app.icon === 'DollarSign' && <Database className="w-5 h-5" />}
                    {app.icon === 'Activity' && <Star className="w-5 h-5 fill-current" />}
                    {app.icon !== 'DollarSign' && app.icon !== 'Activity' && <Cpu className="w-5 h-5" />}
                  </div>
                  <span className="text-[9px] font-mono font-bold text-zinc-500 border border-zinc-800 bg-zinc-900 px-2 py-0.5 rounded uppercase">
                    {app.category}
                  </span>
                </div>

                <div className="space-y-2 font-sans">
                  <h3 className="premium-card-title font-bold text-white transition-colors uppercase tracking-wide">
                    {app.name}
                  </h3>
                  <p className="premium-card-desc text-xs text-zinc-400 font-light leading-relaxed">
                    {app.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-900/40 flex items-center justify-between text-[11px] font-mono mt-4">
                <span>৳ {app.fee}/mo</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStartTrialClick();
                  }}
                  className="text-[#FF3D4F] font-bold inline-flex items-center gap-1 cursor-pointer"
                >
                  START TRIAL ➔
                </button>
              </div>
            </PremiumCardWrapper>
          ))}

          {filteredApps.length === 0 && (
            <div className="col-span-full py-20 text-center space-y-4">
              <Database className="w-12 h-12 text-zinc-600 mx-auto animate-bounce" />
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider">No application parameters matched your queries.</p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 pt-6">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2.5 rounded-lg border text-white ${currentPage === 1 ? 'border-zinc-900 text-zinc-700 cursor-not-allowed' : 'border-zinc-800 hover:border-zinc-600 bg-zinc-900/50 cursor-pointer'}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-zinc-400">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2.5 rounded-lg border text-white ${currentPage === totalPages ? 'border-zinc-900 text-zinc-700 cursor-not-allowed' : 'border-zinc-800 hover:border-zinc-600 bg-zinc-900/50 cursor-pointer'}`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* ━━━━━━━━━━━━━━━━ BENEFITS SECTION ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 bg-black border-y border-zinc-900">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center px-6">
          <div className="space-y-6 text-left">
            <span className="text-[#FF3D4F] font-mono text-[10px] uppercase font-bold tracking-widest">ECOSYSTEM ADVANTAGES</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase leading-tight">
              Modular Scaling Engineered <br />
              <span className="text-[#FF3D4F]">For Future Growth</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
              Why use isolated, manual databases that disconnect? Eurosia ties each single business workflow (POS billing lines, clinic prescription logs, VoIP routing matrices) under one customer SSO directory.
            </p>

            <ul className="space-y-4">
              {[
                { title: "Localized Storage Isolation", desc: "No multi-tenant data leaks. Memory threads stay fully contained." },
                { title: "Dynamic License Mapping", desc: "Instantly link desktop client nodes, register devices and hand scanners." },
                { title: "Continuous Auditing Pools", desc: "Export double-entry logs and sales matrices directly to external advisors." }
              ].map((adv, i) => (
                <li key={i} className="flex gap-3">
                  <span className="p-1.5 bg-red-500/10 border border-red-500/20 text-[#FF3D4F] rounded-lg shrink-0 mt-0.5"><Check className="w-4 h-4" /></span>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">{adv.title}</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5 font-light">{adv.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#05051B] border border-zinc-900 p-8 rounded-2xl space-y-6 relative text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF3D4F]/5 rounded-full filter blur-xl pointer-events-none"></div>
            <h3 className="font-bold text-base text-white border-b border-zinc-900 pb-3 uppercase tracking-wider flex items-center gap-1.5">
              <Code className="w-4 h-4 text-[#FF3D4F]" /> Systems Integration Matrix
            </h3>
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-2">
                <span className="text-[9px] font-mono text-zinc-500 uppercase">Input Terminal Adapter</span>
                <p className="font-bold text-white font-mono text-xs">{"API_TUNNEL_PORT: 3000 -> TLS_TLSv1.3"}</p>
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-2">
                <span className="text-[9px] font-mono text-zinc-500 uppercase">Device Authorization Nodes</span>
                <p className="font-bold text-[#FF3D4F] font-mono text-xs">ONLINE NODE REGISTERED (144/Dhaka)</p>
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ SERVICE SPECIFIC FAQ ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-6 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <HelpCircle className="w-8 h-8 text-[#FF3D4F] mx-auto animate-pulse" />
          <h2 className="text-3xl font-light text-white uppercase tracking-tight">Application Faqs</h2>
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest font-bold">Frequently Asked Technical Queries</p>
        </div>

        <div className="space-y-4 text-left">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-zinc-950 p-6 rounded-xl border border-zinc-900 hover:border-zinc-800 transition-colors">
              <h4 className="font-bold text-sm text-white uppercase tracking-wide mb-2 flex items-start gap-1.5">
                <span className="text-[#FF3D4F] font-mono">Q:</span>
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed pl-4 border-l border-zinc-900 mt-2">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ CONTACT SERVICE CTA ━━━━━━━━━━━━━━━━ */}
      <section className="py-16 bg-gradient-to-r from-zinc-950 via-red-950/20 to-zinc-950 border-t border-zinc-900 text-center space-y-6">
        <h3 className="text-2xl font-light text-white tracking-tight uppercase leading-snug">
          Need a personalized whitelabel workspace <br />
          or unique <span className="font-bold text-[#FF3D4F]">industry modules?</span>
        </h3>
        <div className="flex justify-center gap-4">
          <button
            onClick={onStartTrialClick}
            className="px-6 py-3 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white font-bold text-xs tracking-wider rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            Start Free Trial ➔
          </button>
        </div>
      </section>
    </div>
  );
}

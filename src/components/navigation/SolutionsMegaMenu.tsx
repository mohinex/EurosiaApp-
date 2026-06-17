import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Bot, Globe, ShieldCheck, HelpCircle, 
  Clock, Sparkles, Terminal, ChevronRight, CheckCircle2, ArrowRight
} from 'lucide-react';
import { 
  SOLUTION_CATEGORIES, getSolutionIcon, ALL_SOLUTIONS_DATA, Solution 
} from '../../data/solutions';
import MegaMenuColumn from './MegaMenuColumn';
import MegaMenuSearch from './MegaMenuSearch';
import FeaturedSolutionCard from './FeaturedSolutionCard';

interface SolutionsMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  isLight?: boolean;
  currentPath?: string;
}

// Enterprise Operating Pillars grouping the 11 categories for high usability
const OPERATING_PILLARS = [
  {
    id: "enterprise",
    name: "Enterprise Core",
    shortName: "CORE SAAS",
    icon: Building2,
    badge: "Pillar 1",
    description: "SaaS operations, ledgers, & sovereign digital service pipelines",
    categories: ["business", "finance", "digital"]
  },
  {
    id: "commercial",
    name: "Commercial & Logistics",
    shortName: "LOGISTICS & COMMERCE",
    icon: Globe,
    badge: "Pillar 2",
    description: "Supply chain, retail marketplaces, property portfolios, & factories",
    categories: ["retail", "logistics", "realestate", "hospitality", "industrial"]
  },
  {
    id: "ai_lifecare",
    name: "AI & Lifecare Systems",
    shortName: "AI & SOCIALS",
    icon: Bot,
    badge: "Pillar 3",
    description: "Private agent models, autonomous flows, hospitals, & colleges",
    categories: ["ai", "healthcare", "education"]
  }
];

export default function SolutionsMegaMenu({ 
  isOpen, 
  onClose, 
  onNavigate,
  isLight = false,
  currentPath = ""
}: SolutionsMegaMenuProps) {
  const [activePillar, setActivePillar] = useState<string>("enterprise");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [activeRightTab, setActiveRightTab] = useState<'featured' | 'popular' | 'recents' | 'recommended'>('featured');
  const containerRef = useRef<HTMLDivElement>(null);

  // Load recently viewed from local memory
  useEffect(() => {
    const stored = localStorage.getItem('eurosia_recent_solutions');
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch (e) {
        setRecentlyViewed(['erp', 'ai-chatbot', 'hospital-management', 'ecommerce-platform']);
      }
    } else {
      const defaults = ['erp', 'ai-chatbot', 'hospital-management', 'ecommerce-platform'];
      setRecentlyViewed(defaults);
      localStorage.setItem('eurosia_recent_solutions', JSON.stringify(defaults));
    }
  }, []);

  const addToRecent = (id: string) => {
    const updated = [id, ...recentlyViewed.filter(item => item !== id)].slice(0, 4);
    setRecentlyViewed(updated);
    localStorage.setItem('eurosia_recent_solutions', JSON.stringify(updated));
  };

  // Close on Escape press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Click outside detection
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        // Only trigger close if click is not on the primary nav-solutions trigger button
        const trigger = document.getElementById('nav-solutions-root');
        if (trigger && trigger.contains(e.target as Node)) {
          return;
        }
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Resolve current active pillar categories
  const activePillarObj = OPERATING_PILLARS.find(p => p.id === activePillar) || OPERATING_PILLARS[0];
  const activeCategories = SOLUTION_CATEGORIES.filter(cat => activePillarObj.categories.includes(cat.id));

  // Unified multi-entity search results: Solutions, Apps, Marketplace Items, Services, Pages, FAQ Content
  interface SearchResultItem {
    id: string;
    title: string;
    description: string;
    type: 'Solution' | 'App' | 'Marketplace Item' | 'Service' | 'Page' | 'FAQ Content';
    url: string;
    iconName?: string;
  }

  const query = searchQuery.trim().toLowerCase();
  const indexResults: SearchResultItem[] = [];

  if (query.length > 0) {
    // 1. Search Solutions
    Object.keys(ALL_SOLUTIONS_DATA).forEach(key => {
      const item = ALL_SOLUTIONS_DATA[key];
      let type: 'Solution' | 'App' | 'Marketplace Item' | 'Service' = 'Solution';
      if (item.category === 'digital') {
        type = 'Service';
      } else if (item.slug === 'multi-vendor' || item.slug === 'ecommerce' || item.slug.includes('marketplace')) {
        type = 'Marketplace Item';
      } else if (item.slug.includes('chatbot') || item.slug.includes('portal') || item.slug.includes('assistant')) {
        type = 'App';
      }

      if (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tagline.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      ) {
        indexResults.push({
          id: item.slug,
          title: item.title,
          description: item.tagline || item.description,
          type: type,
          url: `/solutions/${item.slug}`,
          iconName: item.icon
        });
      }

      // 2. Search FAQs
      if (item.faqs && item.faqs.length > 0) {
        item.faqs.forEach((faq, fIdx) => {
          if (faq.q.toLowerCase().includes(query) || faq.a.toLowerCase().includes(query)) {
            indexResults.push({
              id: `${item.slug}-faq-${fIdx}`,
              title: `FAQ: ${faq.q}`,
              description: faq.a,
              type: 'FAQ Content',
              url: `/solutions/${item.slug}`,
              iconName: 'HelpCircle'
            });
          }
        });
      }
    });

    // 3. Search Pages
    const staticPages = [
      { title: 'Eurosia Solutions Directory', description: 'Browse and configure our complete 44 sovereign application layers.', url: '/solutions' },
      { title: 'Contact Eurosia Systems / Integration Consultation Call', description: 'Schedule a call with technical staff to discuss blueprints, database sync, and regional API deployments.', url: '/contact' },
      { title: 'SaaS Platform Home', description: 'Eurosia Systems central business operating cloud terminal.', url: '/' }
    ];

    staticPages.forEach(page => {
      if (page.title.toLowerCase().includes(query) || page.description.toLowerCase().includes(query)) {
        indexResults.push({
          id: page.url,
          title: page.title,
          description: page.description,
          type: 'Page',
          url: page.url,
          iconName: 'Globe'
        });
      }
    });
  }

  // Dynamic Right Column Section Data
  const getRightSectionData = () => {
    switch (activeRightTab) {
      case 'featured':
        return Object.values(ALL_SOLUTIONS_DATA).filter(s => s.featured).slice(0, 3);
      case 'popular':
        return ['crm', 'pos', 'accounting'].map(slug => {
          return Object.values(ALL_SOLUTIONS_DATA).find(s => s.slug === slug || s.id === slug);
        }).filter((x): x is Solution => !!x);
      case 'recents':
        return recentlyViewed.map(slug => {
          return Object.values(ALL_SOLUTIONS_DATA).find(s => s.slug === slug || s.id === slug);
        }).filter((x): x is Solution => !!x);
      case 'recommended':
        return ['custom-software', 'saas-development', 'cloud-solutions'].map(slug => {
          return Object.values(ALL_SOLUTIONS_DATA).find(s => s.slug === slug || s.id === slug);
        }).filter((x): x is Solution => !!x);
      default:
        return [];
    }
  };

  const handleSolutionClickLocal = (id: string, url: string) => {
    addToRecent(id);
    onClose();
    onNavigate(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      ref={containerRef}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[calc(100vw-3rem)] max-w-7xl mt-2 p-6 bg-[#FFFFFF] border border-[#EEEEEE] shadow-[0_20px_60px_rgba(0,0,0,0.12)] rounded-2xl z-50 overflow-hidden font-sans text-slate-800"
      role="menu"
      aria-label="Enterprise Solutions Mega Menu Matrix"
      id="solutions-mega-nav-card"
    >
      <div className="w-full" id="eurosia-mega-menu-inner">
        
        {/* ━━━━━━━━━━━━━━━━ UPPER PILLARS SEGMENT BAR ━━━━━━━━━━━━━━━━ */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#EEEEEE] mb-6" id="mega-segment-bar">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#FF0000] uppercase bg-[#FFF5F5] border border-[#FF0000]/20 px-2 py-0.5 rounded">
              MATRIX
            </span>
            <div className="flex flex-col text-left">
              <h3 className="text-xs font-black text-black uppercase tracking-wider">
                Eurosia Systems Matrix Catalogue
              </h3>
              <p className="text-[10px] text-[#666666] font-normal hidden lg:block">
                Choose and launch modular services integrated directly onto cloud tenants.
              </p>
            </div>
          </div>

          {/* Pillars List */}
          <div className="flex flex-wrap items-center bg-slate-50 p-1 rounded-xl border border-[#EEEEEE]" id="mega-tab-list">
            {OPERATING_PILLARS.map((pillar) => {
              const PillarIcon = pillar.icon;
              const isActive = pillar.id === activePillar;

              return (
                <button
                  key={pillar.id}
                  onMouseEnter={() => {
                    setActivePillar(pillar.id);
                    setSearchQuery(""); // Clear search to focus on selected category
                  }}
                  onClick={() => {
                    setActivePillar(pillar.id);
                    setSearchQuery("");
                  }}
                  className={`px-4 py-2 rounded-lg transition-all text-left flex items-center gap-2.5 cursor-pointer relative ${
                    isActive 
                      ? "bg-[#FF0000] text-white font-bold shadow-md shadow-[#FF0000]/10" 
                      : "text-slate-600 hover:text-black hover:bg-slate-100"
                  }`}
                  role="tab"
                  aria-selected={isActive}
                >
                  <PillarIcon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#666666]'}`} />
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold leading-none">{pillar.name}</span>
                    <span className={`text-[8px] font-mono leading-none mt-0.5 ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                      {pillar.badge} • CONFIGS
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━ MAIN CANVAS WORKSPACE ━━━━━━━━━━━━━━━━ */}
        <div className="grid grid-cols-12 gap-8 min-h-[400px]" id="mega-canvas-workspace">
          
          {/* LEFT 9 COLUMNS: DYNAMIC COLUMNS BASED ON PILLARS / SEARCH */}
          <div className="col-span-9" id="mega-left-canvas">
            <AnimatePresence mode="wait">
              {searchQuery.trim().length > 0 ? (
                /* 🔍 CASE A: SEAMLESS SEARCH RESULTS */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key="search-state"
                  className="space-y-4 text-left"
                >
                  <div className="flex justify-between items-center text-slate-500 text-[10.5px] font-mono pb-2 border-b border-[#EEEEEE]">
                    <span>INDEX RESULTS FOR SEARCH FILTER: "{searchQuery}"</span>
                    <span className="text-[#FF0000] font-bold">{indexResults.length} matches online</span>
                  </div>

                  {indexResults.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4 overflow-y-auto max-h-[350px] pr-2 scrollbar-thin">
                      {indexResults.slice(0, 15).map((item) => {
                        const Icon = item.iconName ? getSolutionIcon(item.iconName) : HelpCircle;
                        
                        // Custom colored badges per item type for premium readability and classification
                        const badgeColors = {
                          'Solution': 'bg-[#FFF5F5] text-[#FF0000] border-[#FF0000]/10',
                          'App': 'bg-indigo-50 text-indigo-600 border-indigo-100',
                          'Marketplace Item': 'bg-emerald-50 text-emerald-600 border-emerald-100',
                          'Service': 'bg-amber-50 text-amber-600 border-amber-100',
                          'Page': 'bg-blue-50 text-blue-600 border-blue-100',
                          'FAQ Content': 'bg-purple-50 text-purple-600 border-purple-100'
                        }[item.type] || 'bg-slate-50 text-slate-600 border-slate-100';

                        return (
                          <div
                            key={item.id}
                            onClick={() => handleSolutionClickLocal(item.id, item.url)}
                            className="bg-white hover:bg-[#FFF5F5]/40 border border-[#EEEEEE] hover:border-[#FF0000] p-4 h-[125px] rounded-2xl cursor-pointer transition-all duration-250 ease-out hover:-translate-y-0.5 shadow-sm hover:shadow-md flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1.5">
                                <span className={`text-[8px] font-mono tracking-wider uppercase font-black px-1.5 py-0.5 rounded border truncate ${badgeColors}`}>
                                  {item.type}
                                </span>
                                <Icon className="w-3.5 h-3.5 text-[#FF0000] shrink-0" />
                              </div>
                              <h4 className="font-extrabold text-[11px] text-[#000000] uppercase mt-1.5 tracking-wide truncate">
                                {item.title}
                              </h4>
                              <p className="text-[10px] text-[#666666] line-clamp-2 leading-relaxed mt-1 font-normal">
                                {item.description}
                              </p>
                            </div>
                            <span className="text-[8.5px] text-[#FF0000] font-mono flex items-center gap-0.5 uppercase font-bold mt-1 group-hover/item:underline">
                              LAUNCH PROTOCOL ➔
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
                      <div className="bg-[#FFF5F5] border border-[#FF0000]/10 text-[#FF0000] p-3 rounded-full">
                        <Terminal className="w-6 h-6 animate-pulse" />
                      </div>
                      <p className="text-xs text-slate-500 font-mono text-center">
                        NO MODULE MATCHED IN SECURE SEARCH DATABASE.<br />
                        <span className="text-[10px] text-slate-600 block mt-1">Try scanning "ERP", "Hospital", "POS", or "AI Chatbot".</span>
                      </p>
                    </div>
                  )}
                </motion.div>
              ) : (
                /* 📊 CASE B: THE STANDARD PILLAR COLS */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={activePillar}
                  className="grid grid-cols-3 gap-6 text-left align-top"
                >
                  {activeCategories.map((cat) => {
                    return (
                      <MegaMenuColumn
                        key={cat.id}
                        categoryId={cat.id}
                        categoryName={cat.name}
                        categoryDesc={cat.description}
                        iconName={cat.iconName}
                        solutions={cat.solutions as any}
                        onSolutionClick={handleSolutionClickLocal}
                        currentPath={currentPath}
                        isLight={isLight || false}
                      />
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT 3 COLUMNS: INTERACTIVE FILTERS & CHASSIS CONSTRUCTIONS */}
          <div className="col-span-3 border-l border-[#EEEEEE] pl-6 flex flex-col justify-between text-left" id="mega-right-panel">
            {/* Realtime filter input */}
            <MegaMenuSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchResults={[] as any}
              handleSolutionClick={handleSolutionClickLocal}
              isLight={isLight}
            />

            {/* ━━━━━━━━━━━━━━━━ INTERACTIVE SOLUTIONS MATRIX TABS (Featured, Popular, Recents, Recommended) ━━━━━━━━━━━━━━━━ */}
            <div className="space-y-3 mt-4" id="mega-interactive-tabs-section">
              <div className="grid grid-cols-2 gap-1 bg-slate-50 border border-slate-200 p-1 rounded-xl text-[8.5px] font-mono font-extrabold uppercase overflow-hidden" id="mega-tabs-list-bar">
                {(['featured', 'popular', 'recents', 'recommended'] as const).map((tabId) => (
                  <button
                    key={tabId}
                    onClick={() => {
                      setActiveRightTab(tabId);
                    }}
                    className={`py-1 rounded-md transition-all cursor-pointer text-center ${
                      activeRightTab === tabId
                        ? "bg-[#FF0000] text-white shadow-sm font-bold"
                        : "text-slate-500 hover:text-black hover:bg-slate-100"
                    }`}
                  >
                    {tabId === 'recents' ? 'Recents' : tabId === 'featured' ? 'Featured' : tabId === 'popular' ? 'Popular' : 'Suggested'}
                  </button>
                ))}
              </div>

              {/* Render dynamic tab cards */}
              <div className="space-y-2 overflow-y-auto max-h-[220px] pr-1" id="mega-tab-solutions-cards-wrapper">
                {getRightSectionData().map((sol) => {
                  const Icon = getSolutionIcon(sol.icon);
                  return (
                    <div
                      key={sol.id}
                      onClick={() => handleSolutionClickLocal(sol.slug, `/solutions/${sol.slug}`)}
                      className="bg-white hover:bg-[#FFF5F5] border border-[#EEEEEE] hover:border-[#FF0000] p-2.5 rounded-xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md flex items-start gap-2.5 group"
                    >
                      <div className="bg-[#FFF5F5] border border-[#FF0000]/10 text-[#FF0000] p-1.5 rounded-lg shrink-0 group-hover:bg-[#FF0000] group-hover:text-white transition-colors">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-extrabold text-[10px] text-slate-900 group-hover:text-[#FF0000] transition-colors uppercase tracking-wider truncate">
                          {sol.title}
                        </h4>
                        <p className="text-[9px] text-[#666666] line-clamp-2 mt-0.5 font-light leading-snug">
                          {sol.tagline || sol.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {getRightSectionData().length === 0 && (
                  <div className="py-8 text-center text-slate-400 text-[10px] font-mono">
                    NO SOLUTIONS LOGGED
                  </div>
                )}
              </div>
            </div>

            {/* Recommender Action Replaced Card */}
            <div className={`p-4 rounded-xl border mt-4 text-left ${
              isLight 
                ? "bg-[#FFF8F8] border-[#FF0000]/20 text-slate-800" 
                : "bg-[#0A0304] border-[#FF3D4F]/20 text-zinc-300"
            }`} id="mega-custom-sol-card">
              <div className="flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#FF0000] animate-pulse" />
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#FF0000] font-black">
                  Special Enterprise Requisition
                </span>
              </div>
              <h4 className={`text-xs font-extrabold uppercase tracking-wide ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Need a Custom Solution?
              </h4>
              <p className={`text-[10px] mt-1 leading-relaxed font-light ${isLight ? 'text-slate-650' : 'text-zinc-400'}`}>
                Schedule an integration call with technical staff to discuss blueprints, database sync, and regional API deployments.
              </p>
              <div className="flex flex-col gap-1.5 mt-3">
                <a
                  href={`https://wa.me/8801711408725?text=${encodeURIComponent("Hello Eurosia Team,\n\nI want to discuss a Custom Solution for my organization.\n\nCompany Name:\nPhone Number:\nRequirements:\n\nThank You.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-[#FF0000] hover:bg-[#CC0000] text-[#FFFFFF] hover:text-white text-center text-[9px] font-bold font-mono tracking-wider transition-all uppercase rounded-lg flex items-center justify-center gap-1.5 shadow-sm shadow-[#FF0000]/10"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━ LOWER RIBBON FLOATING BUTTON ━━━━━━━━━━━━━━━━ */}
        <div className="flex items-center justify-between pt-4 border-t border-[#EEEEEE] mt-6 text-[10.5px] text-slate-500 font-mono" id="mega-bottom-controls">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#FF0000]" />
            <span>ISO-27001 Cybersecurity Certified Ecosystem • Standard SSL Encryptions</span>
          </span>
          <div className="flex gap-6">
            <button
              onClick={() => { onClose(); onNavigate('/solutions'); }}
              className="text-slate-600 hover:text-[#FF0000] uppercase font-bold cursor-pointer text-[10px] tracking-wider transition-colors duration-200"
            >
              Browse Complete Matrix
            </button>
            <button
              onClick={() => { onClose(); onNavigate('/contact'); }}
              className="text-[#FF0000] hover:underline uppercase font-bold cursor-pointer flex items-center gap-1 text-[10px] tracking-wider"
            >
              Start Architecture Call ➔
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

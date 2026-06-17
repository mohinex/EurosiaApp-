/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, ChevronDown, Cpu, Sparkles, Menu, X, 
  ChevronRight, ArrowRight, ShieldCheck, Database, LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SolutionsMegaMenu from './SolutionsMegaMenu.tsx';
import { LanguageSwitcher } from './LanguageSwitcher.tsx';
import { SOLUTION_CATEGORIES, getSolutionIcon } from '../data/solutions';
import { useLanguage } from '../hooks/useLanguage.ts';
import { getSocialIconComponent } from './website/FloatingSocialBar.tsx';
import { SocialPlatform } from '../types/app';

const DEFAULT_PLATFORMS: SocialPlatform[] = [
  { id: 'soc-facebook', name: 'Facebook', url: 'https://www.facebook.com/EurosiaOfficial', icon: 'Facebook', status: 'active', sortOrder: 1 },
  { id: 'soc-x', name: 'X (Twitter)', url: 'https://x.com/EurosiaOfficial', icon: 'Twitter', status: 'active', sortOrder: 2 },
  { id: 'soc-linkedin', name: 'LinkedIn', url: 'https://linkedin.com/in/EurosiaOfficial', icon: 'Linkedin', status: 'active', sortOrder: 3 },
  { id: 'soc-instagram', name: 'Instagram', url: 'https://www.instagram.com/EurosiaOfficial', icon: 'Instagram', status: 'active', sortOrder: 4 }
];

export interface NavItemConfig {
  label: string;
  url: string;
  hasDropdown?: boolean;
  isActive?: boolean;
  sortOrder?: number;
}

export interface NavbarProps {
  theme?: "dark" | "light";
  currentPath: string;
  onNavigate: (path: string) => void;
  onLoginClick: () => void;
  onStartTrialClick?: () => void;
  onOwnerUnlock: () => void;
  navItems?: NavItemConfig[];
}

export const pageConfig: Record<string, { navbarTheme: 'dark' | 'light'; title: string }> = {
  "/": { navbarTheme: "dark", title: "Home" },
  "/solutions": { navbarTheme: "light", title: "Solutions" },
  "/apps": { navbarTheme: "light", title: "Apps" },
  "/marketplace": { navbarTheme: "light", title: "Marketplace" },
  "/pricing": { navbarTheme: "light", title: "Pricing" },
  "/about": { navbarTheme: "light", title: "About" },
  "/contact": { navbarTheme: "light", title: "Contact" }
};

export const DEFAULT_NAV_ITEMS: NavItemConfig[] = [
  { label: "Home", url: "/", sortOrder: 1 },
  { label: "Apps", url: "/apps", sortOrder: 2 },
  { label: "Solutions", url: "/solutions", hasDropdown: true, sortOrder: 3 },
  { label: "Marketplace", url: "/marketplace", sortOrder: 4 },
  { label: "Pricing", url: "/pricing", sortOrder: 5 },
  { label: "About", url: "/about", sortOrder: 6 },
  { label: "Contact", url: "/contact", sortOrder: 7 }
];

export function Navbar({
  theme = "dark",
  currentPath,
  onNavigate,
  onLoginClick,
  onStartTrialClick,
  onOwnerUnlock,
  navItems = DEFAULT_NAV_ITEMS
}: NavbarProps) {
  const { t } = useLanguage();
  const [socialPlatforms, setSocialPlatforms] = useState<SocialPlatform[]>(DEFAULT_PLATFORMS);

  useEffect(() => {
    fetch('/api/site/social')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Fallback');
      })
      .then((data: SocialPlatform[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setSocialPlatforms(data);
        }
      })
      .catch(() => {
        setSocialPlatforms(DEFAULT_PLATFORMS.filter(p => p.status === 'active'));
      });
  }, []);

  const localizedNavItems = navItems.map((item) => {
    let localizedLabel = item.label;
    const lower = item.label.toLowerCase();
    if (lower === 'home') localizedLabel = t('navbar.home', 'Home');
    else if (lower === 'apps') localizedLabel = t('navbar.apps', 'Apps');
    else if (lower === 'solutions') localizedLabel = t('navbar.solutions', 'Solutions');
    else if (lower === 'marketplace') localizedLabel = t('navbar.marketplace', 'Marketplace');
    else if (lower === 'pricing') localizedLabel = t('navbar.pricing', 'Pricing');
    else if (lower === 'about') localizedLabel = t('navbar.about', 'About');
    else if (lower === 'contact') localizedLabel = t('navbar.contact', 'Contact');
    
    return {
      ...item,
      label: localizedLabel
    };
  });

  const isLight = theme === "light";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  
  // Mobile accordion state inside mobile drawer
  const [isMobileSolutionsExpanded, setIsMobileSolutionsExpanded] = useState(false);
  const [expandedMobileCategories, setExpandedMobileCategories] = useState<Record<string, boolean>>({});

  // Stable event handlers for Solutions Mega Menu (Problems 1 & 5)
  const handleLinkMouseEnter = () => {
    // Optional hover support to reveal the menu on desktop
    setShowMegaMenu(true);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close menus on path navigation
  const triggerNavigation = (path: string) => {
    onNavigate(path);
    setShowMegaMenu(false);
    setIsMobileMenuOpen(false);
  };

  const headerBgClass = isLight 
    ? "bg-white/95 border-b border-[#E5E7EB] shadow-sm text-slate-900" 
    : "bg-[#02020A]/70 border-b border-[#16166F]/40 text-white";

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md px-6 py-4 transition-all duration-300 ${headerBgClass}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* BRAND IDENTITY BLOCK + DESKTOP NAV MENU (Aligned to Left) */}
        <div className="flex items-center gap-10">
          
          {/* Organization SEO Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "EUROSIA",
              "url": "https://www.eurosia.app",
              "brand": {
                "@type": "Brand",
                "name": "EUROSIA App Ecosystem"
              },
              "logo": "https://www.eurosia.app/logo.png"
            })}
          </script>

          {/* BRAND IDENTITY BLOCK (Logo and text behave as one brand block) */}
          <div 
            onClick={() => triggerNavigation('/')}
            className="flex items-center gap-4 cursor-pointer select-none group focus:outline-none"
            id="header-brand-block"
            title="EUROSIA - App Ecosystem"
          >
            {/* [LOGO] with hover animations: Scale 1.05 and soft red glow */}
            <div 
              className={`relative bg-black rounded-xl border border-zinc-900 shadow-md w-10 h-10 flex items-center justify-center p-1.5 overflow-hidden transition-all duration-300 
                group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(255,61,79,0.35)] group-hover:border-[#FF3D4F]/50`}
            >
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full select-none"
                referrerPolicy="no-referrer"
              >
                {/* Red block top bar of E */}
                <rect x="41" y="32" width="18" height="6.6" fill="#FF3D4F" />

                {/* White rounded shape with middle & bottom bar of E */}
                <path
                  d="
                    M 41,60.2 
                    H 59 
                    V 54.4 
                    H 49.3 
                    V 51 
                    H 56.5 
                    V 47.5 
                    H 49.3 
                    V 41.2 
                    C 41,41.2 41,41.2 41,47.5 
                    L 41,60.2 Z
                  "
                  fill="#FFFFFF"
                />
              </svg>
            </div>

            {/* BRAND TYPOGRAPHY: Line 1 EUROSIA, Line 2 Subtitle with smooth text layout animation */}
            <div className="flex flex-col justify-center leading-none">
              {/* Line 1: EUROSIA (Brand Text Highlight transition) */}
              <span 
                className={`font-mono text-base tracking-[0.2em] font-extrabold uppercase transition-all duration-300 
                  ${isLight ? 'text-zinc-950 group-hover:text-[#CC1A2F]' : 'text-white group-hover:text-[#FF3D4F]'}`}
              >
                EUROSIA
              </span>
              
              {/* Line 2: APP ECOSYSTEM */}
              {/* Desktop: Full Brand (APP ECOSYSTEM visible) */}
              <span 
                className={`text-[8.5px] uppercase tracking-[0.15em] font-bold mt-0.5 transition-all duration-300 
                  ${isLight ? 'text-zinc-500 group-hover:text-[#CC1A2F]/80' : 'text-zinc-400 group-hover:text-[#FF3D4F]/80'}
                  hidden lg:block`}
              >
                APP ECOSYSTEM
              </span>
              
              {/* Tablet: Compact Brand (Ecosystem) */}
              <span 
                className={`text-[7.5px] uppercase tracking-[0.12em] font-semibold mt-0.5 transition-colors 
                  ${isLight ? 'text-zinc-400 group-hover:text-[#CC1A2F]/60' : 'text-zinc-500 group-hover:text-[#FF3D4F]/60'}
                  hidden md:block lg:hidden`}
              >
                Ecosystem
              </span>
            </div>
          </div>

          {/* DESKTOP NAV MENU */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider">
            {localizedNavItems
              .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
              .map((item, index) => {
                const isActive = currentPath === item.url || (item.url === '/solutions' && currentPath.startsWith('/solutions'));
                const colorClass = isLight
                  ? isActive ? "text-[#CC1A2F]" : "text-slate-600 hover:text-[#CC1A2F]/80"
                  : isActive ? "text-[#FF3D4F]" : "text-gray-300 hover:text-[#FF3D4F]";

                if (item.hasDropdown) {
                  const isDropdownActive = isActive || showMegaMenu;
                  const dropdownBtnClass = isDropdownActive
                    ? "bg-[#FFFFFF] text-[#FF0000] font-semibold border border-[#EEEEEE] rounded-lg px-3 py-1.5 shadow-sm"
                    : isLight
                      ? "text-slate-600 hover:text-[#FF0000] hover:bg-slate-50 px-3 py-1.5 rounded-lg border border-transparent"
                      : "text-gray-300 hover:text-[#FF0000] hover:bg-white/5 px-3 py-1.5 rounded-lg border border-transparent";

                  return (
                    <div
                      key={index}
                      onMouseEnter={handleLinkMouseEnter}
                      className="relative py-2 focus-within:outline-none"
                      id="nav-solutions-root"
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setShowMegaMenu(!showMegaMenu);
                        }}
                        className={`flex items-center gap-1 transition-all duration-200 cursor-pointer uppercase ${dropdownBtnClass}`}
                        aria-expanded={showMegaMenu}
                        aria-haspopup="true"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-current transition-transform duration-200 ${showMegaMenu ? 'rotate-180 text-[#FF0000]' : ''}`} />
                      </button>
                    </div>
                  );
                }

                return (
                  <a
                    key={index}
                    href={item.url}
                    onClick={(e) => {
                      e.preventDefault();
                      triggerNavigation(item.url);
                    }}
                    className={`transition-colors uppercase ${colorClass}`}
                  >
                    {item.label}
                  </a>
                );
              })}
          </nav>
        </div>

        {/* RIGHT CONTROLS */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher theme={theme} />
          
          <a
            href="/custom-solution"
            onClick={(e) => {
              e.preventDefault();
              triggerNavigation('/custom-solution');
            }}
            className="h-9 px-5 md:px-4 lg:px-5 text-xs font-bold border border-[#FF3D4F] text-[#FF3D4F] bg-transparent hover:bg-[#FF3D4F]/10 rounded-full transition-all duration-300 cursor-pointer inline-flex items-center justify-center font-sans hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_15px_rgba(255,61,79,0.25)] hover:border-[#FF3D4F]/90 focus:outline-none focus:ring-2 focus:ring-[#FF3D4F]/40 shrink-0"
            id="nav-custom-solution-btn"
            aria-label="Request dynamic custom enterprise specification sheet"
          >
            Need Custom Spec?
          </a>

          <TerminalLoginLink 
            theme={theme} 
            onLoginClick={onLoginClick} 
          />
          
          <CTAButton 
            onClick={onStartTrialClick || onLoginClick} 
          />
        </div>

        {/* MOBILE HAMBURGER TOGGLE BUTTON */}
        <button
          onClick={toggleMobileMenu}
          className={`md:hidden p-2 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF3D4F]/50 ${
            isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-zinc-300 hover:bg-zinc-900'
          }`}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ━━━━━━━━━━━━━━━━ DESKTOP MEGA MENU MOUNT POINT ━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {showMegaMenu && (
          <div
            className="absolute top-full left-0 right-0 w-full z-[99999]"
            id="nav-mega-menu-wrapper"
          >
            <SolutionsMegaMenu
              isOpen={showMegaMenu}
              onClose={() => setShowMegaMenu(false)}
              onNavigate={triggerNavigation}
              isLight={isLight}
              currentPath={currentPath}
            />
          </div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━ MOBILE/TABLET RESPONSIVE DRAWER ━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute top-full left-0 right-0 w-full border-b overflow-y-auto max-h-[calc(100vh-80px)] z-50 ${
              isLight 
                ? "bg-white text-slate-800 border-slate-200" 
                : "bg-[#02020A] text-zinc-300 border-zinc-900"
            }`}
          >
            <div className="px-6 py-6 space-y-6">
              
              {/* Core Nav items */}
              <div className="flex flex-col gap-4 font-bold tracking-wider text-sm uppercase">
                {localizedNavItems
                  .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                  .map((item, index) => {
                    const isActive = currentPath === item.url || (item.url === '/solutions' && currentPath.startsWith('/solutions'));
                    const colorClass = isLight
                      ? isActive ? "text-[#CC1A2F]" : "text-slate-700 hover:text-[#CC1A2F]"
                      : isActive ? "text-[#FF3D4F]" : "text-zinc-300 hover:text-white";

                    if (item.hasDropdown) {
                      return (
                        <div key={index} className="space-y-3" id="mobile-solutions-accordion">
                          <button
                            onClick={() => {
                              // Expand solutions list accordion
                              setIsMobileSolutionsExpanded(!isMobileSolutionsExpanded);
                            }}
                            className={`flex items-center justify-between w-full uppercase transition-all py-1 ${colorClass}`}
                          >
                            <span>{item.label}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileSolutionsExpanded ? "rotate-180 text-[#FF3D4F]" : ""}`} />
                          </button>

                          {/* 🔽 MOBILE CATEGORY ACCORDION (Requirement 3 & 4: Touch/Mobile Friendly) */}
                          <AnimatePresence>
                            {isMobileSolutionsExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className={`pl-4 border-l ${isLight ? 'border-slate-200' : 'border-zinc-800'} space-y-4 pt-1`}
                              >
                                {SOLUTION_CATEGORIES.map((cat) => {
                                  const Icon = getSolutionIcon(cat.iconName);
                                  const isCatOpened = !!expandedMobileCategories[cat.id];

                                  return (
                                    <div key={cat.id} className="space-y-2">
                                      <button
                                        onClick={() => {
                                          setExpandedMobileCategories(prev => ({
                                            ...prev,
                                            [cat.id]: !prev[cat.id]
                                          }));
                                        }}
                                        className="text-xs font-bold text-zinc-400 hover:text-[#FF3D4F] uppercase flex items-center justify-between w-full"
                                      >
                                        <div className="flex items-center gap-2">
                                          <Icon className="w-3.5 h-3.5 text-[#FF3D4F]" />
                                          <span>{cat.name}</span>
                                        </div>
                                        <ChevronRight className={`w-3 h-3 transition-transform ${isCatOpened ? 'rotate-90' : ''}`} />
                                      </button>

                                      {/* Sub Solutions under category inside accordion */}
                                      {isCatOpened && (
                                        <div className="pl-5 space-y-1.5 flex flex-col pt-1">
                                          {cat.solutions.map((subSol) => (
                                            <a
                                              key={subSol.id}
                                              href={subSol.url}
                                              onClick={(e) => {
                                                e.preventDefault();
                                                triggerNavigation(subSol.url);
                                              }}
                                              className={`text-[11px] py-1 pl-1 border-l-2 transition-all ${
                                                isLight 
                                                  ? 'border-slate-100 hover:border-[#FF3D4F] text-slate-600 hover:text-slate-900' 
                                                  : 'border-zinc-900 hover:border-[#FF3D4F] text-zinc-400 hover:text-white'
                                              }`}
                                            >
                                              {subSol.name}
                                            </a>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}

                                {/* Quick view all portal link */}
                                <a 
                                  href="/solutions"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    triggerNavigation('/solutions');
                                  }}
                                  className="text-xs uppercase text-[#FF3D4F] hover:underline flex items-center gap-1 font-bold pt-2 block"
                                >
                                  View Solutions Matrix <ArrowRight className="w-3.5 h-3.5" />
                                </a>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <a
                        key={index}
                        href={item.url}
                        onClick={(e) => {
                          e.preventDefault();
                          triggerNavigation(item.url);
                        }}
                        className={`transition-all py-1 ${colorClass}`}
                      >
                        {item.label}
                      </a>
                    );
                  })}
              </div>

              {/* Mobile actions */}
              <div className={`pt-6 border-t ${isLight ? 'border-slate-100' : 'border-zinc-900'} flex flex-col gap-3`}>
                <LanguageSwitcher theme={theme} />
                
                <a
                  href="https://www.eurosia.app/login"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    onLoginClick();
                  }}
                  className={`py-2.5 rounded-lg text-xs font-bold uppercase transition-all tracking-wider text-center ${
                    isLight 
                      ? 'bg-slate-100 text-slate-800' 
                      : 'bg-zinc-900 text-zinc-200 border border-zinc-800'
                  }`}
                >
                  Terminal Login
                </a>
                
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onStartTrialClick) onStartTrialClick();
                    else onLoginClick();
                  }}
                  className="bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white py-2.5 rounded-lg text-xs font-bold uppercase transition-all tracking-wider text-center"
                >
                  {t('navbar.startTrial', 'Start Free Trial')}
                </button>
                
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    triggerNavigation('/custom-solution');
                  }}
                  className="bg-transparent border border-[#FF3D4F] text-[#FF3D4F] hover:bg-[#FF3D4F] hover:text-white py-2.5 rounded-lg text-xs font-bold uppercase transition-all tracking-wider text-center cursor-pointer"
                >
                  {t('navbar.custom_spec', 'Need Something Custom?')}
                </button>

                {/* Mobile Menu clickable social icons */}
                <div className="flex items-center justify-center gap-3 pt-3.5 mt-1 border-t border-zinc-900/40">
                  <span className="text-[10px] font-mono font-bold uppercase text-zinc-500 mr-2 tracking-widest">Follow us:</span>
                  {socialPlatforms.map((platform) => {
                    const IconComponent = getSocialIconComponent(platform.icon);
                    return (
                      <a
                        key={platform.id}
                        href={platform.url || '#'}
                        target={platform.url ? "_blank" : undefined}
                        rel={platform.url ? "noopener noreferrer" : undefined}
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-label={`Follow Eurosia on ${platform.name}`}
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                          isLight 
                            ? 'bg-slate-50 border-slate-200 text-slate-500 hover:text-white hover:bg-[#FF3D4F] hover:border-[#FF3D4F]' 
                            : 'bg-zinc-900/50 border-zinc-900 text-zinc-400 hover:text-white hover:bg-[#FF3D4F] hover:border-[#FF3D4F]'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 animate-pulse" />
                      </a>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

interface UtilityProps {
  theme: "dark" | "light";
}

// Custom LanguageSwitcher is imported above from './LanguageSwitcher.tsx' and exported natively.
export { LanguageSwitcher };

interface LoginProps {
  theme: "dark" | "light";
  onLoginClick: () => void;
}

export function TerminalLoginLink({ theme, onLoginClick }: LoginProps) {
  const { t } = useLanguage();
  const isLight = theme === "light";
  const loginBtnClass = isLight
    ? "bg-slate-100/90 border border-slate-300 text-slate-800 hover:bg-slate-200 hover:border-slate-400"
    : "bg-[#11135E]/50 border border-[#16166F] text-white hover:bg-[#16166F] hover:border-[#FF3D4F]";

  return (
    <a 
      href="https://www.eurosia.app/login"
      onClick={(e) => {
        e.preventDefault();
        onLoginClick();
      }}
      className={`h-9 px-5 md:px-4 lg:px-5 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#FF3D4F]/40 hover:scale-[1.02] active:scale-[0.98] shrink-0 ${loginBtnClass}`}
      id="nav-login-btn"
      aria-label="Login to Eurosia Operations Console"
    >
      {t('navbar.login', 'Login')}
    </a>
  );
}

interface CTAProps {
  onClick: () => void;
}

export function CTAButton({ onClick }: CTAProps) {
  const { t } = useLanguage();
  return (
    <a 
      href="https://www.eurosia.app/signup"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="h-9 px-6 md:px-5 lg:px-6 text-xs font-semibold bg-[#FF3D4F] hover:bg-gradient-to-r hover:from-[#FF3D4F] hover:to-[#FF5E6D] text-white rounded-full shadow-md shadow-[#FF3D4F]/10 hover:shadow-lg hover:shadow-[#FF3D4F]/25 hover:scale-[1.02] active:scale-[1.01] transition-all duration-300 cursor-pointer inline-flex items-center justify-center font-sans focus:outline-none focus:ring-2 focus:ring-[#FF3D4F]/40 shrink-0"
      id="nav-trial-btn"
      aria-label="Start Free Trial of Eurosia Business Operating System"
    >
      {t('navbar.startTrial', 'Start Free Trial')}
    </a>
  );
}

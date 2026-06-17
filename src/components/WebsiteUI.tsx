import React, { useState, useEffect } from 'react';
import { 
  Building2, Bot, PhoneCall, DollarSign, Shield, Globe, 
  Activity, Mic, MessageSquareText, ShieldCheck, Cpu,
  Mail, Facebook, Linkedin, Twitter, Monitor, Sparkles, Laptop
} from 'lucide-react';
import { Navbar, pageConfig } from './Navbar.tsx';
import Logo from './Logo.tsx';
import PWAInstallButton from './PWAInstallButton.tsx';
import { fallbackApps } from '../data/appsFallbackData';
import { fallbackSolutions, fallbackPricing } from '../data/homeFallbackData';

// Modular Multi-Page Components
import Home from './website/Home.tsx';
import Apps from './website/Apps.tsx';
import Solutions from './website/Solutions.tsx';
import Marketplace from './website/Marketplace.tsx';
import Pricing from './website/Pricing.tsx';
import About from './website/About.tsx';
import Contact from './website/Contact.tsx';
import CustomSolution from './website/CustomSolution.tsx';
import SolutionDetailPage from '../pages/SolutionDetailPage.tsx';
import AppDetailPage from '../pages/AppDetailPage.tsx';
import Footer from './layout/Footer.tsx';
import InstallAppButton from './pwa/InstallAppButton.tsx';
import FloatingSocialBar from './website/FloatingSocialBar.tsx';

interface WebsiteUIProps {
  onLoginClick: () => void;
  onStartTrialClick: () => void;
  onExploreDashboard: () => void;
  onOwnerUnlock: () => void;
  currentUser?: any;
}

export default function WebsiteUI({ 
  onLoginClick, 
  onStartTrialClick, 
  onExploreDashboard, 
  onOwnerUnlock,
  currentUser
}: WebsiteUIProps) {
  const [apps, setApps] = useState<any[]>([]);
  const [solutions, setSolutions] = useState<any[]>([]);
  const [pricing, setPricing] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Sync page path selection logic based on pathname / hash fallback
  const getPathFromHashOrPathname = () => {
    const path = window.location.pathname;
    if (path.startsWith('/solutions/')) return path;
    if (path.startsWith('/apps/')) return path;
    if (path === '/solutions') return '/solutions';
    if (path === '/apps') return '/apps';
    if (path === '/marketplace') return '/marketplace';
    if (path === '/pricing') return '/pricing';
    if (path === '/about') return '/about';
    if (path === '/contact') return '/contact';
    if (path === '/custom-solution') return '/custom-solution';
    
    // Hash indicators support for robust previews
    const hash = window.location.hash || '';
    if (hash.startsWith('#/solutions/') || hash.startsWith('#solutions/')) {
      return hash.replace('#', '');
    }
    if (hash.startsWith('#/apps/') || hash.startsWith('#apps/')) {
      return hash.replace('#', '');
    }
    if (hash === '#apps' || hash === '#/apps') return '/apps';
    if (hash === '#pricing' || hash === '#/pricing') return '/pricing';
    if (hash === '#contact' || hash === '#/contact') return '/contact';
    if (hash === '#custom-solution' || hash === '#/custom-solution') return '/custom-solution';
    if (hash === '#solutions' || hash === '#/solutions') return '/solutions';
    if (hash === '#marketplace' || hash === '#/marketplace') return '/marketplace';
    if (hash === '#about' || hash === '#/about') return '/about';
    
    return '/';
  };

  const [currentPath, setCurrentPath] = useState<string>("/");

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(getPathFromHashOrPathname());
    };
    
    handleLocationChange();

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    // Push the history state cleanly
    window.history.pushState(null, '', path);
    // BAN SINGLE PAGE SCROLLING: instantly snap user to page top
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  // Load CMS data elements from backends
  useEffect(() => {
    async function loadWebsiteCMS() {
      try {
        setLoading(true);
        const appsRes = await fetch('/api/apps');
        if (appsRes.ok) {
          const appsData = await appsRes.json();
          setApps(appsData);
        }

        const solRes = await fetch('/api/solutions');
        if (solRes.ok) {
          const solData = await solRes.json();
          setSolutions(solData);
        }

        const pricingRes = await fetch('/api/pricing');
        if (pricingRes.ok) {
          const pricingData = await pricingRes.json();
          setPricing(pricingData);
        }
      } catch (e) {
        console.error("Failed loading website dynamic backend parameters", e);
      } finally {
        setLoading(false);
      }
    }
    loadWebsiteCMS();
  }, []);

  // Resolve final datasets (fetched / fallback data)
  const activeAppsList = apps.length > 0 ? apps : fallbackApps;
  const activeSolutionsList = solutions.length > 0 ? solutions : fallbackSolutions;
  const activePricingList = pricing.length > 0 ? pricing : fallbackPricing;

  // Determine current navbar config settings
  const resolvedPathKey = currentPath.startsWith('/solutions') ? '/solutions' : currentPath;
  const currentConfig = pageConfig[resolvedPathKey] || pageConfig["/"];
  const navbarTheme = currentConfig.navbarTheme;

  if (loading) {
    return (
      <div className="bg-[#02020A] text-white min-h-screen flex flex-col items-center justify-center font-sans select-none" id="brand-system-preloader">
        <div className="flex flex-col items-center gap-6">
          <Logo variant="optimized" size="xl" className="animate-pulse" />
          
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5 justify-center mt-2">
              <span className="w-2 h-2 rounded-full bg-[#FF3D4F] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-[#FF3D4F] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-[#FF3D4F] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-mono text-zinc-500 mt-2 text-center">
              Accessing Eurosia Core Telemetry...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render the current path component
  const renderPageComponent = () => {
    if (currentPath.startsWith('/solutions/')) {
      const parts = currentPath.split('/');
      const slug = parts[2];
      if (slug) {
        return (
          <SolutionDetailPage
            solutionId={slug}
            onNavigate={handleNavigate}
            onLoginClick={onLoginClick}
            onStartTrialClick={onStartTrialClick}
          />
        );
      }
    }

    if (currentPath.startsWith('/apps/')) {
      const parts = currentPath.split('/');
      const slug = parts[2];
      if (slug) {
        return (
          <AppDetailPage
            appId={slug}
            onNavigate={handleNavigate}
            onLoginClick={onLoginClick}
            onStartTrialClick={onStartTrialClick}
          />
        );
      }
    }

    if (currentPath.startsWith('/solutions')) {
      return (
        <Solutions 
          solutionsList={activeSolutionsList} 
          onLoginClick={onLoginClick} 
          onStartTrialClick={onStartTrialClick} 
          currentPath={currentPath}
          onNavigate={handleNavigate}
        />
      );
    }

    switch (currentPath) {
      case '/apps':
        return (
          <Apps 
            appsList={activeAppsList} 
            onLoginClick={onLoginClick} 
            onStartTrialClick={onStartTrialClick} 
            onNavigate={handleNavigate}
          />
        );
      case '/solutions':
        return (
          <Solutions 
            solutionsList={activeSolutionsList} 
            onLoginClick={onLoginClick} 
            onStartTrialClick={onStartTrialClick} 
          />
        );
      case '/marketplace':
        return (
          <Marketplace 
            onLoginClick={onLoginClick} 
            onStartTrialClick={onStartTrialClick} 
          />
        );
      case '/pricing':
        return (
          <Pricing 
            pricingList={activePricingList} 
            onLoginClick={onLoginClick} 
            onStartTrialClick={onStartTrialClick} 
          />
        );
      case '/about':
        return (
          <About 
            onLoginClick={onLoginClick} 
            onStartTrialClick={onStartTrialClick} 
          />
        );
      case '/contact':
        return (
          <Contact 
            onLoginClick={onLoginClick} 
            onStartTrialClick={onStartTrialClick} 
          />
        );
      case '/custom-solution':
        return (
          <CustomSolution 
            onLoginClick={onLoginClick} 
            onStartTrialClick={onStartTrialClick} 
          />
        );
      case '/':
      default:
        return (
          <Home 
            apps={activeAppsList} 
            solutions={activeSolutionsList} 
            onLoginClick={onLoginClick} 
            onStartTrialClick={onStartTrialClick} 
            onExploreDashboard={onExploreDashboard} 
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="bg-black text-white relative min-h-screen flex flex-col justify-between font-sans selection:bg-[#FF3D4F] selection:text-white">
      {/* Sticky Header Navbar */}
      <Navbar 
        theme={navbarTheme} 
        currentPath={currentPath} 
        onNavigate={handleNavigate} 
        onLoginClick={onLoginClick} 
        onStartTrialClick={onStartTrialClick} 
        onOwnerUnlock={onOwnerUnlock} 
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-grow">
        {renderPageComponent()}
      </main>

      {/* ━━━━━━━━━━━━━━━━ FOOTER ━━━━━━━━━━━━━━━━ */}
      <Footer onNavigate={handleNavigate} onOwnerUnlock={onOwnerUnlock} currentUser={currentUser} />

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/8801711408725" 
        className="whatsapp-float fixed left-[20px] bottom-[20px] w-[65px] h-[65px] bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.25)] z-[9999] transition-transform duration-300 hover:scale-[1.08] group" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        id="whatsapp-float-trigger"
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
          alt="WhatsApp"
          className="w-[38px] h-[38px]"
          referrerPolicy="no-referrer"
        />
        <span className="absolute left-[75px] whitespace-nowrap bg-white text-[#333333] px-4.5 py-2.5 rounded-[14px] text-[15px] font-semibold shadow-[0_4px_15px_rgba(0,0,0,0.12)] border border-gray-100 transition-all duration-300 pointer-events-none opacity-0 scale-90 translate-x-[-10px] group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
          Contact us
        </span>
      </a>

      {/* Progressive Web App Install Controller */}
      <InstallAppButton />

      {/* Floating social links bar overlay */}
      <FloatingSocialBar />
    </div>
  );
}

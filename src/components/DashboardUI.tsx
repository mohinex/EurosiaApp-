/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage.ts';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Building2, Users, CreditCard, Shield, Bot, PhoneCall, DollarSign, Cloud,
  Zap, RefreshCw, Layers, ShieldCheck, Cpu, ArrowLeft, Search, PlusCircle,
  FileText, ArrowUpRight, TrendingUp, HelpCircle, HardDrive, Wifi, WifiOff,
  Bell, CheckCircle2, UserCheck, AlertTriangle, Activity, Sparkles, ShoppingBag, Check, X, Menu
} from 'lucide-react';

interface DashboardUIProps {
  onBackToWebsite: () => void;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    companyId: string;
  };
  token: string;
}

export default function DashboardUI({ onBackToWebsite, user, token }: DashboardUIProps) {
  const { t } = useLanguage();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'apps' | 'sync' | 'companies' | 'reports' | 'studio'>('dashboard');
  
  const selectTabOnMobile = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setMobileSidebarOpen(false);
  };
  const [apps, setApps] = useState<any[]>([]);
  
  // Smart dynamic initialization of chosen apps from onboarding setup
  const [installedApps, setInstalledApps] = useState<string[]>(() => {
    const saved = localStorage.getItem('eur_onboarding_apps');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // use fallback list
      }
    }
    return ['mod-pos', 'mod-pbx', 'mod-cashbook', 'mod-invoicenex'];
  });

  const [companies, setCompanies] = useState<any[]>([]);
  const [syncLogs, setSyncLogs] = useState<any[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [localQueueSize, setLocalQueueSize] = useState(0);
  const [notifications, setNotifications] = useState<string[]>([
    "Cloud database heartbeat normal",
    "Acme license verified for terminal HQ-01"
  ]);

  // Studio-like Builder customization state
  const [studioAccentColor, setStudioAccentColor] = useState<'#FF3D4F' | '#3B82F6' | '#10B981' | '#F59E0B' | '#8B5CF6'>('#FF3D4F');
  const [studioCustomTitle, setStudioCustomTitle] = useState('EUROSIA Operational Command Console');
  const [studioLayoutVibe, setStudioLayoutVibe] = useState<'cosmic' | 'light_sleek'>('cosmic');
  const [userSeatsLimit, setUserSeatsLimit] = useState(15);
  const [deviceSeatsLimit, setDeviceSeatsLimit] = useState(5);
  const [companyPlanTier, setCompanyPlanTier] = useState<'trial' | 'startup' | 'enterprise_gold'>('trial');

  // App Simulator Sandboxes interactive state
  const [launchedApp, setLaunchedApp] = useState<any | null>(null);
  
  // 1. POS state
  const [posCart, setPosCart] = useState<{ id: string; name: string; price: number; qty: number }[]>([]);
  
  // 2. Kabyo Bengali AI state
  const [bengaliPrompt, setBengaliPrompt] = useState('');
  const [bengaliOutput, setBengaliOutput] = useState('');
  const [bengaliLoading, setBengaliLoading] = useState(false);

  // 3. AI Chatbot sandbox state
  const [chatbotConversations, setChatbotConversations] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'স্বাগতম! How can Eurosia AI help stream coordinate your customer operations today?' }
  ]);
  const [chatbotInput, setChatbotInput] = useState('');

  // 4. Healthcare logs
  const [clinicalPatients, setClinicalPatients] = useState([
    { id: 'p-1', name: 'Al-Hasan Ahmed', status: 'Stable', check: '12:45' },
    { id: 'p-2', name: 'Taslima Khatun', status: 'In Consultation', check: '13:00' },
    { id: 'p-3', name: 'Zayan Kabir', status: 'Observation', check: '14:20' }
  ]);

  // Payment processing modal state
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [bkashWalletNumber, setBkashWalletNumber] = useState('');
  const [bkashPin, setBkashPin] = useState('');
  const [payingPending, setPayingPending] = useState(false);
  const [tempUpgradeTargetPlan, setTempUpgradeTargetPlan] = useState<'startup' | 'enterprise_gold'>('startup');

  // Load backend variables
  useEffect(() => {
    async function fetchDashboardDetails() {
      try {
        const appsRes = await fetch('/api/apps');
        const appsData = await appsRes.json();
        setApps(appsData);

        const compRes = await fetch('/api/admin/companies', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (compRes.ok) {
          const compData = await compRes.json();
          setCompanies(compData);
        }
      } catch (e) {
        console.error("Error retrieving operating dashboard parameters", e);
      }
    }
    fetchDashboardDetails();
  }, [user]);

  // Generate sales line coordinates
  const graphSalesData = [
    { name: 'May 01', Sales: 1854000 },
    { name: 'May 07', Sales: 2245000 },
    { name: 'May 14', Sales: 2984000 },
    { name: 'May 21', Sales: 2654000 },
    { name: 'May 28', Sales: 3254000 },
  ];

  // Pie chart parameters
  const graphPieData = [
    { name: 'POS Sales', value: 38, color: '#FF3D4F' },
    { name: 'Invoices', value: 28, color: '#3B82F6' },
    { name: 'Purchases', value: 18, color: '#10B981' },
    { name: 'Payments', value: 10, color: '#F59E0B' },
    { name: 'Others', value: 6, color: '#6B7280' },
  ];

  // Sync operations
  const handleTriggerSync = async () => {
    if (offlineMode) {
      setNotifications(prev => ["Cannot sync while in physical client offline state.", ...prev]);
      return;
    }
    setSyncing(true);
    try {
      const response = await fetch('/api/sync/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyId: user.companyId,
          clientLogEntries: Array.from({ length: localQueueSize || 3 }).map((_, i) => ({ id: `loc-rec-${i}`, act: 'ADD_POS' })),
          fingerprint: "FINGERPRINT_WEB_PREVIEW_USER"
        })
      });
      const data = await response.json();
      
      // Pull updates also
      await fetch(`/api/sync/pull?companyId=${user.companyId}&fingerprint=FINGERPRINT_WEB_PREVIEW_USER`);

      setLocalQueueSize(0);
      setNotifications(prev => ["Database cloud operational frames synced successfully.", ...prev]);
    } catch (e: any) {
      setNotifications(prev => [`Sync fault recorded: ${e.message}`, ...prev]);
    } finally {
      setSyncing(false);
    }
  };

  const handleSimulateLocalSale = () => {
    setLocalQueueSize(prev => prev + 1);
    setNotifications(prev => ["Simulated localized transaction appended to SQLite queue.", ...prev]);
  };

  const toggleInstallApp = (slug: string) => {
    if (installedApps.includes(slug)) {
      setInstalledApps(prev => prev.filter(s => s !== slug));
      setNotifications(prev => [`De-allocated application: ${slug}`, ...prev]);
    } else {
      setInstalledApps(prev => [...prev, slug]);
      setNotifications(prev => [`Assigned module space for: ${slug}`, ...prev]);
    }
  };

  return (
    <div className="bg-[#02020A] min-h-screen text-white font-sans flex flex-col md:flex-row">
      
      {/* ━━━━━━━━━━━━━━━━ SIDEBAR MENU ━━━━━━━━━━━━━━━━ */}
      <aside className={`${mobileSidebarOpen ? 'flex' : 'hidden'} md:flex w-full md:w-64 bg-[#05051B] border-r border-[#16166F]/60 flex-col shrink-0`}>
        <div className="p-6 border-b border-[#16166F]/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-[#FF3D4F] p-2 rounded-lg">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-widest text-white uppercase">EUROSIA</h3>
              <p className="text-[9px] text-[#FF3D4F] font-semibold font-mono tracking-widest leading-none mt-0.5">OPERATIONS</p>
            </div>
          </div>
          <button 
            onClick={onBackToWebsite}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            title="Log Out & Exit Platform"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Tenant user metadata block */}
        <div className="p-4 mx-4 my-2.5 bg-[#11135E]/30 border border-[#16166F]/60 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-[#FF3D4F] to-[#11135E] rounded-full w-9 h-9 flex items-center justify-center font-bold text-xs">
              JD
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <span className="text-[9px] font-mono text-[#FF3D4F] uppercase tracking-wide">{user.role}</span>
            </div>
          </div>
          <div className="mt-3 pt-2 text-[10px] font-mono text-gray-400 border-t border-[#16166F]/30 flex justify-between">
            <span>ID: {user.companyId}</span>
            <span className="text-[#FF3D4F]">Acme Corp Ltd.</span>
          </div>
        </div>

        {/* Navigation lists */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 text-xs font-semibold text-gray-400">
          <button 
            onClick={() => selectTabOnMobile('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left cursor-pointer transition-colors ${activeTab === 'dashboard' ? 'text-white font-bold' : 'hover:bg-[#11135E]/50 hover:text-white'}`}
            style={activeTab === 'dashboard' ? { backgroundColor: studioAccentColor, color: '#ffffff' } : {}}
          >
            <Cpu className="w-4 h-4" />
            <span>{t('dashboard.hub', 'Dashboard Hub')}</span>
          </button>

          <button 
            onClick={() => selectTabOnMobile('apps')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left cursor-pointer transition-colors ${activeTab === 'apps' ? 'text-white font-bold' : 'hover:bg-[#11135E]/50 hover:text-white'}`}
            style={activeTab === 'apps' ? { backgroundColor: studioAccentColor, color: '#ffffff' } : {}}
          >
            <Layers className="w-4 h-4" />
            <span>{t('dashboard.apps_label', 'App Modular Suite')}</span>
          </button>

          <button 
            onClick={() => selectTabOnMobile('sync')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left cursor-pointer transition-colors ${activeTab === 'sync' ? 'text-white font-bold' : 'hover:bg-[#11135E]/50 hover:text-white'}`}
            style={activeTab === 'sync' ? { backgroundColor: studioAccentColor, color: '#ffffff' } : {}}
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t('dashboard.sync_mgr', 'Local Sync Manager')}</span>
            {localQueueSize > 0 && (
              <span className="ml-auto bg-amber-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                {localQueueSize}
              </span>
            )}
          </button>

          <button 
            onClick={() => selectTabOnMobile('companies')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left cursor-pointer transition-colors ${activeTab === 'companies' ? 'text-white font-bold' : 'hover:bg-[#11135E]/50 hover:text-white'}`}
            style={activeTab === 'companies' ? { backgroundColor: studioAccentColor, color: '#ffffff' } : {}}
          >
            <Building2 className="w-4 h-4" />
            <span>{t('dashboard.companies', 'Companies Directory')}</span>
          </button>

          <button 
            onClick={() => selectTabOnMobile('reports')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left cursor-pointer transition-colors ${activeTab === 'reports' ? 'text-white font-bold' : 'hover:bg-[#11135E]/50 hover:text-white'}`}
            style={activeTab === 'reports' ? { backgroundColor: studioAccentColor, color: '#ffffff' } : {}}
          >
            <FileText className="w-4 h-4" />
            <span>{t('dashboard.reports', 'Operational Reports')}</span>
          </button>

          <button 
            onClick={() => selectTabOnMobile('studio')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left cursor-pointer transition-colors ${activeTab === 'studio' ? 'text-white font-bold' : 'hover:bg-[#11135E]/50 hover:text-white'}`}
            style={activeTab === 'studio' ? { backgroundColor: studioAccentColor, color: '#ffffff' } : {}}
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{t('dashboard.studio_builder', 'Studio App Builder')}</span>
          </button>
        </nav>

        {/* Sync panel indicator */}
        <div className="p-4 border-t border-[#16166F]/40 bg-[#02020A]/70 text-center space-y-3">
          <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400">
            <span className="flex items-center gap-1.5">
              {offlineMode ? <WifiOff className="w-3.5 h-3.5 text-red-500" /> : <Wifi className="w-3.5 h-3.5 text-emerald-500" />}
              {offlineMode ? 'Local Mode' : 'Cloud Connected'}
            </span>
            <button 
              onClick={() => {
                setOfflineMode(!offlineMode);
                setNotifications(prev => [`Switched environment model. Offline: ${!offlineMode}`, ...prev]);
              }}
              className="text-[10px] text-[#FF3D4F] underline hover:text-[#CC1A2F] cursor-pointer"
            >
              Toggle
            </button>
          </div>

          <button 
            onClick={handleTriggerSync}
            disabled={syncing || offlineMode}
            className="w-full py-2 bg-[#11135E] hover:bg-[#16166F] text-white text-[11px] font-bold border border-[#16166F] rounded-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-40 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            <span>Sync To Central Cloud</span>
          </button>
        </div>
      </aside>

      {/* ━━━━━━━━━━━━━━━━ MAIN WORKSPACE ━━━━━━━━━━━━━━━━ */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* TOP BAR BAR */}
        <header className="bg-[#05051B] px-6 py-4 border-b border-t border-[#16166F]/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-2 rounded-lg bg-[#11135E]/50 border border-[#16166F] hover:bg-[#FF3D4F]/20 text-white cursor-pointer flex items-center justify-center shrink-0"
              title="Toggle Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h4 className="text-sm font-semibold text-white flex items-center flex-wrap gap-2">
                <span>{studioCustomTitle}</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase font-mono tracking-wider">
                  Terminal Live
                </span>
              </h4>
              <p className="text-[10px] text-gray-400 font-mono mt-1">Tenant context isolation activated. Standard encryption locks active.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 font-mono hidden lg:block">System Clock: 2026-06-14 UTC</span>
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <span className="absolute -top-1.5 -right-1 h-2 w-2 rounded-full" style={{ backgroundColor: studioAccentColor }} />
            </div>
            <button 
              onClick={onBackToWebsite} 
              className="px-4 py-1.5 text-[11px] font-semibold rounded-lg cursor-pointer transition-colors"
              style={{ backgroundColor: `${studioAccentColor}1a`, border: `1px solid ${studioAccentColor}4d`, color: studioAccentColor }}
            >
              Log Out
            </button>
          </div>
        </header>

        {/* NOTIFICATION ticker */}
        <div className="bg-[#11135E]/15 px-6 py-2 border-b border-[#16166F]/30 flex items-center gap-3 select-none overflow-x-auto text-[11px] font-mono scrollbar-none shrink-0">
          <span className="text-[#FF3D4F] font-bold uppercase tracking-widest text-[9px] border border-[#FF3D4F]/30 px-1.5 py-0.5 rounded">REALTIME BROADCAST</span>
          <p className="text-gray-300 truncate">{notifications[0] || "Command console status clear. No priority flags raised."}</p>
        </div>

        {/* CONTENT CHANGER LAYOUTS */}
        <div className="flex-1 p-6 overflow-y-auto space-y-8">
          
          {/* TAB 1: OPERATING HUB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Core metrics panel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#11135E]/20 border border-[#16166F]/60 rounded-xl p-5 relative hover:border-[#FF3D4F]/40 transition-colors">
                  <div className="flex py-1 px-2.5 bg-emerald-500/10 text-emerald-400 text-[10px] absolute top-4 right-4 rounded font-mono">
                    ▲ 15.8%
                  </div>
                  <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">TOTAL SALES</p>
                  <p className="text-2xl font-bold mt-2 text-white">৳ 32,54,000</p>
                  <p className="text-[10px] text-gray-500 mt-2 font-mono">Target: ৳30,00,000 quota fulfilled</p>
                </div>

                <div className="bg-[#11135E]/20 border border-[#16166F]/60 rounded-xl p-5 relative hover:border-[#FF3D4F]/40 transition-colors">
                  <div className="flex py-1 px-2.5 bg-emerald-500/10 text-emerald-400 text-[10px] absolute top-4 right-4 rounded font-mono">
                    ▲ 11.2%
                  </div>
                  <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">NET PROFITS</p>
                  <p className="text-2xl font-bold mt-2 text-white">৳ 7,65,000</p>
                  <p className="text-[10px] text-gray-500 mt-2 font-mono">Operational margins optimized</p>
                </div>

                <div className="bg-[#11135E]/20 border border-[#16166F]/60 rounded-xl p-5 relative hover:border-[#FF3D4F]/40 transition-colors">
                  <div className="flex py-1 px-2.5 bg-red-400/10 text-red-400 text-[10px] absolute top-4 right-4 rounded font-mono">
                    ▼ 2.4%
                  </div>
                  <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">ACTIVE INVOICES</p>
                  <p className="text-2xl font-bold mt-2 text-white">1,25,430</p>
                  <p className="text-[10px] text-gray-500 mt-2 font-mono">92% automated billing routing</p>
                </div>

                <div className="bg-[#11135E]/20 border border-[#16166F]/60 rounded-xl p-5 relative hover:border-[#FF3D4F]/40 transition-colors">
                  <div className="flex py-1 px-2.5 bg-emerald-500/10 text-emerald-400 text-[10px] absolute top-4 right-4 rounded font-mono">
                    ▲ 5.3%
                  </div>
                  <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">DUE LEDGERS</p>
                  <p className="text-2xl font-bold mt-2 text-red-400">৳ 2,15,000</p>
                  <p className="text-[10px] text-gray-500 mt-2 font-mono">Overdue reminders processing</p>
                </div>
              </div>

              {/* Quick operations deck */}
              <div className="space-y-4">
                <h5 className="text-xs font-mono tracking-widest text-indigo-400 uppercase">QUICK LOCAL ACTIONS</h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  <button 
                    onClick={handleSimulateLocalSale}
                    className="p-4 bg-[#11135E]/30 border border-[#16166F] hover:bg-[#FF3D4F]/10 hover:border-[#FF3D4F]/50 rounded-xl text-center space-y-2 cursor-pointer transition-all"
                  >
                    <PlusCircle className="w-5 h-5 text-[#FF3D4F] mx-auto" />
                    <p className="text-xs font-semibold text-white">Add POS Sale</p>
                    <span className="text-[9px] text-gray-500 block font-mono">SQLite queue</span>
                  </button>

                  <button 
                    onClick={() => { alert('Customer Added directly in local state.'); }}
                    className="p-4 bg-[#11135E]/30 border border-[#16166F] hover:bg-[#FF3D4F]/10 hover:border-[#FF3D4F]/50 rounded-xl text-center space-y-2 cursor-pointer transition-all"
                  >
                    <UserCheck className="w-5 h-5 text-blue-400 mx-auto" />
                    <p className="text-xs font-semibold text-white">Add Customer</p>
                    <span className="text-[9px] text-gray-500 block font-mono">Client directory</span>
                  </button>

                  <button 
                    onClick={() => { alert('Dynamic Invoice Draft Generated.'); }}
                    className="p-4 bg-[#11135E]/30 border border-[#16166F] hover:bg-[#FF3D4F]/10 hover:border-[#FF3D4F]/50 rounded-xl text-center space-y-2 cursor-pointer transition-all"
                  >
                    <FileText className="w-5 h-5 text-amber-400 mx-auto" />
                    <p className="text-xs font-semibold text-white">Create Invoice</p>
                    <span className="text-[9px] text-gray-500 block font-mono">Billing adaptor</span>
                  </button>

                  <div className="p-4 bg-[#11135E]/15 border border-[#16166F]/40 rounded-xl text-center space-y-2 opacity-60">
                    <PhoneCall className="w-5 h-5 text-indigo-400 mx-auto" />
                    <p className="text-xs font-semibold text-white">Cloud PBX</p>
                    <span className="text-[9px] text-gray-500 block font-mono">Comms module</span>
                  </div>

                  <div className="p-4 bg-[#11135E]/15 border border-[#16166F]/40 rounded-xl text-center space-y-2 opacity-60">
                    <ShieldCheck className="w-5 h-5 text-purple-400 mx-auto" />
                    <p className="text-xs font-semibold text-white">Cyber defense</p>
                    <span className="text-[9px] text-gray-500 block font-mono">Endpoint check</span>
                  </div>

                  <button 
                    onClick={handleTriggerSync}
                    disabled={offlineMode}
                    className="p-4 bg-[#11135E]/30 border border-[#11135E] hover:border-[#FF3D4F]/50 rounded-xl text-center space-y-2 cursor-pointer transition-all select-none disabled:opacity-45"
                  >
                    <RefreshCw className="w-5 h-5 text-emerald-400 mx-auto" />
                    <p className="text-xs font-semibold text-white">Automate Sync</p>
                    <span className="text-[9px] text-gray-500 block font-mono">Central push</span>
                  </button>
                </div>
              </div>

              {/* Double Visualizers (Sales line chart + Donut analytics split) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Line graph section */}
                <div className="lg:col-span-8 bg-[#05051B] border border-[#16166F]/60 rounded-xl p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">SALES STREAM TELEMETRY</h4>
                      <p className="text-[11px] text-gray-400 font-mono">Analytical coordinates compiled via Recharts package</p>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="w-3 h-3 rounded-full bg-[#FF3D4F]" />
                      <span className="text-white">BDT Ledger (৳)</span>
                    </div>
                  </div>

                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={graphSalesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#11135E" />
                        <XAxis dataKey="name" stroke="#6B7280" fontSize={11} />
                        <YAxis stroke="#6B7280" fontSize={11} />
                        <Tooltip contentStyle={{ backgroundColor: '#05051B', border: '1px solid #16166F', color: '#fff' }} />
                        <Line type="monotone" dataKey="Sales" stroke="#FF3D4F" strokeWidth={3} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Donut section */}
                <div className="lg:col-span-4 bg-[#05051B] border border-[#16166F]/60 rounded-xl p-6 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">BUSINESS SNAPSHOT</h4>
                    <p className="text-[11px] text-gray-400 font-mono">Sales distributions by segment</p>
                  </div>

                  <div className="h-44 flex items-center justify-center relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={graphPieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {graphPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute text-center">
                      <p className="text-lg font-mono font-bold">100%</p>
                      <p className="text-[9px] text-gray-400 uppercase">Operational</p>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4 pt-4 border-t border-[#16166F]/20 text-[11px]">
                    {graphPieData.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-gray-300">
                        <span className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          <span>{item.name}</span>
                        </span>
                        <span className="font-mono font-bold text-white">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* App allocations list */}
              <div className="bg-[#05051B] border border-[#16166F]/60 rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">SECURE INSTALLED MODULES</h4>
                    <p className="text-[11px] text-gray-400 font-mono">Dynamic allocations configured on Acme Corp license EUR-ACME-8F2B</p>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full animate-pulse">
                    Database Sandbox Mode
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {apps.filter(a => installedApps.includes(a.id)).map((app, idx) => (
                    <div key={idx} className="bg-[#11135E]/15 border border-[#16166F]/60 p-4 rounded-xl flex flex-col justify-between space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-lg text-white" style={{ backgroundColor: `${studioAccentColor}20`, color: studioAccentColor }}>
                            {app.name.toLowerCase().includes('clinic') || app.name.toLowerCase().includes('care') ? <Activity className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white leading-tight">{app.name}</p>
                            <span className="text-[9px] text-gray-400 font-mono">Isolated SQLite</span>
                          </div>
                        </div>
                        <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/40" />
                      </div>
                      <button 
                        onClick={() => setLaunchedApp(app)}
                        className="w-full py-1.5 rounded text-[10px] font-bold tracking-wide cursor-pointer transition-colors"
                        style={{ backgroundColor: `${studioAccentColor}1a`, border: `1px solid ${studioAccentColor}33`, color: studioAccentColor }}
                      >
                        Launch App Workspace ➔
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: APPLICATIONS LIST */}
          {activeTab === 'apps' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-lg font-bold">App Modular Suite</h3>
                <p className="text-xs text-gray-400 font-mono">Configure custom module workspace registers. Changes auto-bind to client environments.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {apps.map((app, idx) => {
                  const isInstalled = installedApps.includes(app.id);
                  return (
                    <div key={idx} className="bg-[#05051B] border rounded-xl p-5 flex flex-col justify-between" style={{ borderColor: isInstalled ? studioAccentColor : '#16166f70' }}>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-indigo-400 bg-indigo-900/20 border border-indigo-900/40 px-2 py-0.5 rounded uppercase">
                            {app.category}
                          </span>
                          <span className="text-xs text-gray-400">Rating: ⭐{app.rating}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white">{app.name}</h4>
                          <p className="text-xs text-gray-400 mt-1.5 h-10 overflow-hidden leading-relaxed">{app.description}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#16166F]/20 mt-4 flex items-center justify-between">
                        <span className="font-mono font-bold text-xs" style={{ color: studioAccentColor }}>BDT ৳{app.fee}/mo</span>
                        <button 
                          onClick={() => toggleInstallApp(app.id)}
                          className="px-4 py-1.5 rounded text-[11px] font-bold cursor-pointer transition-colors"
                          style={
                            isInstalled 
                              ? { backgroundColor: `${studioAccentColor}20`, border: `1px solid ${studioAccentColor}`, color: studioAccentColor }
                              : { backgroundColor: studioAccentColor, color: '#ffffff' }
                          }
                        >
                          {isInstalled ? 'De-allocate Module' : 'Assign Module'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: LOCAL SYNC CONTROLS */}
          {activeTab === 'sync' && (
            <div className="space-y-8">
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                
                {/* Left controls panel */}
                <div className="lg:col-span-4 bg-[#05051B] border border-[#16166F]/60 p-6 rounded-xl space-y-6">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider">OFFLINE CONTROLS</h4>
                    <p className="text-[11px] text-gray-400 font-mono font-light">Eurosia Client SQLite state manager</p>
                  </div>

                  <div className="space-y-4 font-mono text-[11px]">
                    <div className="flex items-center justify-between p-3.5 bg-[#02020A] border border-[#16166F] rounded-lg">
                      <span className="text-gray-300">Local Work Environment:</span>
                      <button 
                        onClick={() => {
                          setOfflineMode(!offlineMode);
                          setNotifications(prev => [`Offline mode toggled: ${!offlineMode}`, ...prev]);
                        }}
                        className={`px-3 py-1 text-[10px] font-bold rounded cursor-pointer ${offlineMode ? 'bg-red-500 text-white' : 'bg-emerald-500 text-black'}`}
                      >
                        {offlineMode ? 'Local Client Offline' : 'Connected Cloud Node'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3.5 bg-[#02020A] border border-[#16166F] rounded-lg">
                      <span className="text-gray-300">SQLite Queue Registry:</span>
                      <span className="text-amber-400 font-bold">{localQueueSize} Operation Entries</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={handleSimulateLocalSale}
                      className="w-full py-2.5 bg-[#11135E]/60 hover:bg-[#11135E] border border-[#16166F] text-white text-xs font-semibold rounded-lg cursor-pointer"
                    >
                      🧪 Simulate POS Sale Operations
                    </button>

                    <button 
                      onClick={handleTriggerSync}
                      disabled={offlineMode || syncing}
                      className="w-full py-2.5 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white text-xs font-bold rounded-lg disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
                      <span>Execute Cloud Synchronization Push</span>
                    </button>
                  </div>
                </div>

                {/* Right logs view */}
                <div className="lg:col-span-8 bg-[#05051B] border border-[#16166F]/60 p-6 rounded-xl space-y-6">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wide">Cloud Synchronizations Registry Logs</h4>
                    <p className="text-[11px] text-gray-400 font-mono">Pull logs and audit transactions history</p>
                  </div>

                  <div className="space-y-3 overflow-y-auto max-h-[400px]">
                    <div className="p-4 bg-[#11135E]/15 border border-[#16166F]/45 rounded-lg flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono text-[9px]">SYNC_PUSH_SUCCESS</span>
                        <p className="text-xs font-semibold text-white mt-1">Acme terminal FINGERPRINT_WEB_PREVIEW_USER pushed 42 sales entries</p>
                        <p className="text-[9px] text-gray-500 font-mono">Date: 2026-06-14T20:01:10Z</p>
                      </div>
                      <Wifi className="w-5 h-5 text-emerald-400" />
                    </div>

                    <div className="p-4 bg-[#11135E]/15 border border-[#16166F]/45 rounded-lg flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono text-[9px]">LIC_VALIDATED_SUCCESS</span>
                        <p className="text-xs font-semibold text-white mt-1">Secured license core active and checked</p>
                        <p className="text-[9px] text-gray-500 font-mono">Date: 2026-06-14T19:54:15Z</p>
                      </div>
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    </div>

                    <div className="p-4 bg-[#11135E]/15 border border-[#16166F]/45 rounded-lg flex items-center justify-between opacity-60">
                      <div className="space-y-1">
                        <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono text-[9px]">LOCAL_SQLITE_FLUSH</span>
                        <p className="text-xs font-semibold text-gray-300 mt-1">Wiped temporary operational garbage vectors</p>
                        <p className="text-[9px] text-gray-500 font-mono">Date: 2026-06-14T19:22:00Z</p>
                      </div>
                      <HardDrive className="w-5 h-5 text-indigo-400" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: COMPANIES DIRECTORY */}
          {activeTab === 'companies' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold">Companies Tenants</h3>
                <p className="text-xs text-gray-400 font-mono">View central multi-company registries configured on this instance.</p>
              </div>

              <div className="bg-[#05051B] border border-[#16166F]/65 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs text-gray-300 font-sans border-collapse">
                  <thead className="bg-[#11135E]/30 text-indigo-300 uppercase tracking-wider font-mono text-[10px] border-b border-[#16166F]">
                    <tr>
                      <th className="p-4">Company Name</th>
                      <th className="p-4">Contact Profile</th>
                      <th className="p-4">Active Package</th>
                      <th className="p-4">Subscription Status</th>
                      <th className="p-4">Created Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#16166F]/30 bg-[#02020A]/30">
                    {companies.map((comp, idx) => (
                      <tr key={idx} className="hover:bg-[#11135E]/15 transition-colors">
                        <td className="p-4 font-bold text-white flex items-center gap-2.5">
                          <Building2 className="w-4 h-4 text-[#FF3D4F]" />
                          <span>{comp.name}</span>
                        </td>
                        <td className="p-4 font-mono">{comp.email}</td>
                        <td className="p-4">
                          <span className="bg-[#FF3D4F]/10 border border-[#FF3D4F]/35 px-2.5 py-0.5 rounded text-[#FF3D4F] uppercase font-mono text-[9px]">
                            {comp.packageId.split('-')[1]}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span>{comp.subscriptionStatus}</span>
                          </span>
                        </td>
                        <td className="p-4 text-gray-400 font-mono">{new Date(comp.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: REPORTS GENERAL */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold">Operational Reports</h3>
                <p className="text-xs text-gray-400">Continuous ledger records from automated transaction monitoring layers.</p>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Prism Security Guard Notification</h4>
                  <p className="text-xs text-yellow-200/80 mt-1">Audit telemetry lists the HQ primary terminal active fingerprints. All operational caches remain fully locked.</p>
                </div>
              </div>

              <div className="bg-[#05051B] border border-[#16166F]/65 p-6 rounded-xl space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Invoices & Accounts Ledger</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 bg-[#02020A]/70 border border-[#16166F] rounded-lg">
                    <span className="font-semibold text-xs">TXN_77419A9B - bKash payment received</span>
                    <span className="font-mono font-bold text-emerald-400">+ ৳ 4,990</span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 bg-[#02020A]/70 border border-[#16166F] rounded-lg">
                    <span className="font-semibold text-xs">TXN_88129B2C - Card dynamic authorization</span>
                    <span className="font-mono font-bold text-emerald-400">+ ৳ 4,990</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: STUDIO APP BUILDER */}
          {activeTab === 'studio' && (
            <div className="space-y-8 animate-fadeIn text-xs">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <span>EUROSIA Studio App Builder</span>
                </h3>
                <p className="text-[11.5px] text-gray-400">
                  Configure custom layout presets, branding theme guides, and purchase system allocation seats with bKash Sandbox simulation.
                </p>
              </div>

              <div className="grid lg:grid-cols-12 gap-8">
                {/* Visual Options Selection Column */}
                <div className="lg:col-span-7 bg-[#05051B] border border-[#16166F]/65 rounded-xl p-6 space-y-6">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    <span>Layout Branding Guidelines</span>
                  </h4>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-gray-300 font-bold">Dynamic Tenant Title Identifier</label>
                      <input 
                        type="text" 
                        value={studioCustomTitle}
                        onChange={(e) => setStudioCustomTitle(e.target.value)}
                        className="w-full bg-[#11135E]/15 border border-[#16166F] px-3 py-2 rounded-lg text-white font-mono placeholder-gray-500 focus:outline-none focus:border-red-500/50"
                        placeholder="Dynamic Operating Title"
                      />
                      <p className="text-[10px] text-gray-400">Updates the main workspace dashboard title instantaneously.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-gray-300 font-bold block">Theme Accent Highlight Colors</label>
                      <div className="flex gap-4.5 pt-1">
                        {[
                          { value: '#FF3D4F', label: 'Crimson' },
                          { value: '#3B82F6', label: 'Eurosia Cobalt' },
                          { value: '#10B981', label: 'Clinic Emerald' },
                          { value: '#F59E0B', label: 'Industrial Amber' },
                          { value: '#8B5CF6', label: 'Enterprise Purple' }
                        ].map((color) => (
                          <button
                            key={color.value}
                            onClick={() => {
                              setStudioAccentColor(color.value as any);
                              setNotifications(prev => [`Updated Accent color theme to ${color.label}`, ...prev]);
                            }}
                            className="flex flex-col items-center gap-1.5 cursor-pointer relative group focus:outline-none"
                          >
                            <span 
                              className="w-8 h-8 rounded-full border-2 transition-transform duration-200 hover:scale-110 flex items-center justify-center shadow-lg"
                              style={{ 
                                backgroundColor: color.value,
                                borderColor: studioAccentColor === color.value ? '#ffffff' : '#16166F'
                              }}
                            >
                              {studioAccentColor === color.value && <Check className="w-4 h-4 text-white drop-shadow-md" />}
                            </span>
                            <span className="text-[9px] text-gray-400">{color.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <label className="text-gray-300 font-bold block">Theme Visual Mood</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => {
                            setStudioLayoutVibe('cosmic');
                            setNotifications(prev => ['Switched workspace visual mood to Cosmic Slate Deep Space', ...prev]);
                          }}
                          className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${studioLayoutVibe === 'cosmic' ? 'bg-[#11135E]/20 border-red-500/50 text-white' : 'bg-[#11135E]/5 border-[#16166F]/50 text-gray-400 hover:border-[#16166F]'}`}
                        >
                          <span className="font-bold text-white block">Cosmic Slate</span>
                          <span className="text-[10px] mt-1 text-gray-400 block">Dark space background with neon crimson gradients. (Default)</span>
                        </button>
                        <button
                          onClick={() => {
                            setStudioLayoutVibe('light_sleek');
                            setNotifications(prev => ['Switched workspace visual mood to Iceberg Aurora Light', ...prev]);
                          }}
                          className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${studioLayoutVibe === 'light_sleek' ? 'bg-[#11135E]/20 border-[#3B82F6]/50 text-white' : 'bg-[#11135E]/5 border-[#16166F]/50 text-gray-400 hover:border-[#16166F]'}`}
                        >
                          <span className="font-bold text-white block">Iceberg Sleek</span>
                          <span className="text-[10px] mt-1 text-gray-400 block">Electric blue border accents with clean grid lines.</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subscriptions Seats and Plan upgrade Column */}
                <div className="lg:col-span-5 bg-[#05051B] border border-[#16166F]/65 rounded-xl p-6 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-emerald-400" />
                        <span>System Licenses & Seats</span>
                      </h4>
                      <p className="text-[10px] text-gray-400 font-mono">Current Tier Package: <b className="text-emerald-400 uppercase">{companyPlanTier}</b></p>
                    </div>

                    <div className="space-y-4">
                      {/* User limit seat adjuster */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-gray-300">
                          <span className="font-bold">Operating Seat Users Limit</span>
                          <span className="font-mono text-emerald-400 font-bold">{userSeatsLimit} Seats</span>
                        </div>
                        <input 
                          type="range" 
                          min={5} 
                          max={150} 
                          step={5}
                          value={userSeatsLimit} 
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setUserSeatsLimit(val);
                            setNotifications(prev => [`Simulated slide user seats allotment to ${val} slots`, ...prev]);
                          }}
                          className="w-full accent-red-500 cursor-pointer h-1.5 bg-indigo-950 rounded-lg appearance-none"
                        />
                        <span className="text-[10px] text-gray-400 block font-mono">Each block of 5 users adds ৳ 500 BDT/month legacy platform royalty.</span>
                      </div>

                      {/* Device client seat adjuster */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-gray-300">
                          <span className="font-bold">Remote Clients & Device Limits</span>
                          <span className="font-mono text-indigo-400 font-bold">{deviceSeatsLimit} Nodes</span>
                        </div>
                        <input 
                          type="range" 
                          min={2} 
                          max={30} 
                          step={1}
                          value={deviceSeatsLimit} 
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setDeviceSeatsLimit(val);
                            setNotifications(prev => [`Simulated slide device nodes limit to ${val} devices`, ...prev]);
                          }}
                          className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-indigo-950 rounded-lg appearance-none"
                        />
                        <span className="text-[10px] text-gray-400 block font-mono">Each active physical terminal node requires continuous sync validation checks.</span>
                      </div>
                    </div>
                  </div>

                  {/* Calculations & Checkout action buttons */}
                  <div className="pt-6 border-t border-[#16166F]/50 mt-6 space-y-4">
                    <div className="p-4 bg-[#11135E]/20 rounded-xl border border-[#16166F]/40 flex justify-between items-center font-mono text-xs">
                      <div>
                        <p className="text-gray-400">Computed Live Pricing</p>
                        <p className="text-[10px] text-yellow-500 font-bold">(Trial Sandbox Demo)</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-white">৳ {((userSeatsLimit * 100) + (deviceSeatsLimit * 150)).toLocaleString()}</span>
                        <span className="text-[10px] text-gray-400 block">per month</span>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <p className="text-[10px] text-gray-400">Upgrade plan tiers dynamically to access premium offline caching locks:</p>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            setTempUpgradeTargetPlan('startup');
                            setPaymentModalOpen(true);
                          }}
                          className="py-2.5 bg-[#11135E] hover:bg-[#16166F] border border-[#16166F] text-white font-bold rounded-lg cursor-pointer transition-all"
                        >
                          Change to Startup
                        </button>
                        <button
                          onClick={() => {
                            setTempUpgradeTargetPlan('enterprise_gold');
                            setPaymentModalOpen(true);
                          }}
                          className="py-2.5 text-black font-bold rounded-lg cursor-pointer transition-all hover:opacity-90 flex items-center justify-center gap-1.5"
                          style={{ backgroundColor: studioAccentColor }}
                        >
                          <Zap className="w-3.5 h-3.5 fill-black" />
                          <span>Enterprise Gold</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ━━━━━━━━━━━━━━━━ INTERACTIVE INSTANCE SYSTEM SANDBOX POPUP MODAL ━━━━━━━━━━━━━━━━ */}
          {launchedApp && (
            <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-[#05051B] border border-[#16166F] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative text-xs">
                
                {/* Header title */}
                <div className="bg-[#11135E]/40 border-b border-[#16166F] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded bg-red-500/10 text-red-400">
                      <Activity className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-white">{launchedApp.name}</h4>
                      <p className="text-[9px] text-gray-400 font-mono uppercase tracking-widest">Isolated Sandbox Application Workspace Frame</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setLaunchedApp(null);
                      setPosCart([]);
                      setBengaliOutput('');
                      setBengaliPrompt('');
                    }}
                    className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Simulated Content based on App */}
                <div className="p-6 h-[400px] overflow-y-auto">
                  
                  {/* IF POS */}
                  {launchedApp.id === 'mod-pos' && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-12 gap-6">
                        
                        {/* Items to Add */}
                        <div className="md:col-span-7 space-y-3">
                          <p className="font-bold text-gray-300 uppercase tracking-wider text-[11px]">Simulated Menu Items</p>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {[
                              { id: '1', name: 'Kacchi Biryani Half', price: 280 },
                              { id: '2', name: 'Chicken Khichuri Spl', price: 220 },
                              { id: '3', name: 'Shahi Jarda Cup', price: 90 },
                              { id: '4', name: 'Masala Cha cup', price: 40 },
                              { id: '5', name: 'Plain Paratha', price: 30 },
                              { id: '6', name: 'Borhani Glass', price: 60 }
                            ].map((item) => (
                              <button
                                key={item.id}
                                onClick={() => {
                                  setPosCart(current => {
                                    const match = current.find(x => x.id === item.id);
                                    if (match) {
                                      return current.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x);
                                    }
                                    return [...current, { ...item, qty: 1 }];
                                  });
                                  setNotifications(prev => [`Added ${item.name} into POS Sales queue`, ...prev]);
                                }}
                                className="p-3 bg-[#11135E]/15 border border-[#16166F]/60 rounded-xl hover:border-red-500/50 transition-all text-left flex justify-between items-center cursor-pointer"
                              >
                                <div>
                                  <span className="font-bold text-white block">{item.name}</span>
                                  <span className="text-[10px] text-gray-400 mt-1 font-mono">৳ {item.price}</span>
                                </div>
                                <PlusCircle className="w-4 h-4 text-red-400" />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Cart ledger invoice summary */}
                        <div className="md:col-span-5 bg-[#02020A]/60 border border-[#16166F]/60 p-4 rounded-xl flex flex-col justify-between">
                          <div className="space-y-3">
                            <span className="text-[10px] font-mono text-yellow-500 font-bold uppercase tracking-wider">Active POS Cart</span>
                            {posCart.length === 0 ? (
                              <div className="py-12 text-center text-gray-500 font-mono text-[11px]">
                                Cart Empty.<br />Select menu items to simulate checkout.
                              </div>
                            ) : (
                              <div className="space-y-2 h-[150px] overflow-y-auto">
                                {posCart.map(cartItem => (
                                  <div key={cartItem.id} className="flex justify-between items-center bg-[#11135E]/10 p-2 rounded">
                                    <div className="truncate pr-2">
                                      <span className="text-white font-semibold">{cartItem.name}</span>
                                      <span className="text-[10.5px] text-gray-400 block font-mono">Qty: {cartItem.qty} x ৳ {cartItem.price}</span>
                                    </div>
                                    <span className="font-bold text-white font-mono shrink-0">৳ {cartItem.qty * cartItem.price}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="pt-3 border-t border-[#16166F]/40 space-y-3">
                            <div className="flex justify-between font-bold text-white font-mono">
                              <span>Total BDT:</span>
                              <span>৳ {posCart.reduce((acc, item) => acc + (item.price * item.qty), 0).toLocaleString()}</span>
                            </div>
                            <button
                              disabled={posCart.length === 0}
                              onClick={() => {
                                const total = posCart.reduce((acc, x) => acc + (x.price * x.qty), 0);
                                setNotifications(prev => [`TXN SUCCESSFULLY SECURED! Transacted ৳ ${total} via SQLite offline database. Sync queued.`, ...prev]);
                                alert(`Simulated Invoice Settled! Saved entry in local SQLite ledger files securely.\nAmount: ৳ ${total}`);
                                setPosCart([]);
                                setLaunchedApp(null);
                              }}
                              className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-black font-bold rounded-lg cursor-pointer font-mono tracking-wide"
                            >
                              Settle & Print Receipt
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* IF KABYO BENGALI AI */}
                  {launchedApp.id === 'mod-pbx' && (
                    <div className="space-y-5">
                      <div className="bg-[#11135E]/15 border border-[#16166F]/50 p-4 rounded-xl">
                        <p className="font-bold text-white">Bengali Conversational Synthesizer & Poetry Generator</p>
                        <p className="text-gray-400 text-[10.5px] mt-1">
                          Type any Bengali conversational requirement, business brief, or poetry guidelines. Our custom Bangladesh bilingual model simulates instant rendering.
                        </p>
                      </div>

                      <div className="space-y-3.5">
                        <div className="flex gap-2.5">
                          <input 
                            type="text"
                            value={bengaliPrompt}
                            onChange={(e) => setBengaliPrompt(e.target.value)}
                            placeholder="যেমন: কবিতায় কীভাবে একটি চমৎকার মিষ্টির ব্যবস্থান লিখবো?"
                            className="flex-1 bg-[#11135E]/15 border border-[#16166F] px-3.5 py-2.5 rounded-lg text-white font-mono placeholder-gray-500 focus:outline-none"
                          />
                          <button
                            onClick={() => {
                              if (!bengaliPrompt) return;
                              setBengaliLoading(true);
                              setBengaliOutput('');
                              setTimeout(() => {
                                setBengaliLoading(false);
                                setBengaliOutput(
                                  `ইউরোসিয়া এআই সোনার বাংলা ল্যাঙ্গুয়েজ মডেল উত্তর:\n\n` +
                                  `ব্যবসা যদি করো সুধী, মিষ্টি মধুর কথা কও,\n` +
                                  `ইউরোসিয়ার সফটওয়্যারে হিসাব নিকাশ সাথে লও।\n` +
                                  `রসের গোল্লা, চমচম যত, কড়কড়ে নোট খাতায় ভরো,\n` +
                                  `ডিজিটাল এই বাংলাদেশে ব্যবসা এবার রঙিন করো।`
                                );
                              }, 1800);
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2.5 rounded-lg cursor-pointer transition-colors shrink-0"
                          >
                            {bengaliLoading ? 'স্ট্রিমিং...' : 'উৎপন্ন করুন ➔'}
                          </button>
                        </div>

                        {bengaliLoading && (
                          <div className="py-12 flex flex-col justify-center items-center gap-3">
                            <RefreshCw className="w-8 h-8 text-red-500 animate-spin" />
                            <p className="text-gray-400 font-mono">Bengali neural tokens resolving...</p>
                          </div>
                        )}

                        {bengaliOutput && (
                          <div className="p-4 bg-[#02020A]/70 border border-[#16166F]/60 rounded-xl font-mono text-[11px] leading-relaxed text-gray-200 whitespace-pre-wrap select-none">
                            {bengaliOutput}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* IF EUROSIA AI CHATBOT INTERACTIVE */}
                  {launchedApp.id === 'mod-cashbook' && (
                    <div className="flex flex-col h-full bg-[#02020A]/30 border border-[#16166F]/40 rounded-xl overflow-hidden">
                      <div className="flex-1 p-4 overflow-y-auto space-y-3 h-[250px] scrollbar-thin">
                        {chatbotConversations.map((msg, mIdx) => (
                          <div key={mIdx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div 
                              className={`max-w-xs p-3 rounded-xl ${msg.role === 'user' ? 'bg-[#FF3D4F] text-white' : 'bg-[#11135E]/40 border border-[#16166F]'}`}
                            >
                              <p className="leading-relaxed">{msg.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 border-t border-[#16166F]/40 bg-[#11135E]/15 flex gap-2">
                        <input 
                          type="text"
                          value={chatbotInput}
                          onChange={(e) => setChatbotInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              if (!chatbotInput) return;
                              const userTxt = chatbotInput;
                              setChatbotConversations(prev => [...prev, { role: 'user', text: userTxt }]);
                              setChatbotInput('');
                              setTimeout(() => {
                                setChatbotConversations(prev => [...prev, { 
                                  role: 'bot', 
                                  text: `Receding request: "${userTxt}". Query processed securely. Your transactional balance is clear. BDT Ledger updated inside local SQLite storage.`
                                }]);
                              }, 1000);
                            }
                          }}
                          placeholder="Type customer query message and hit Enter..."
                          className="flex-1 bg-[#02020A] border border-[#16166F] px-3 py-1.5 rounded-lg text-white font-mono placeholder-gray-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* IF CLINIC HEALTH MEDICARE */}
                  {launchedApp.id === 'mod-invoicenex' && (
                    <div className="space-y-4">
                      <div className="bg-[#11135E]/15 border border-[#16166F]/50 p-4 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="font-bold text-white uppercase tracking-wider">Clinical Patient Flow Monitor</p>
                          <p className="text-[10px] text-gray-400 font-mono">Dynamic local database connections matching clinic-care parameters</p>
                        </div>
                        <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold font-mono">3 Live Queues</span>
                      </div>

                      <div className="bg-[#02020A]/60 border border-[#16166F]/50 rounded-xl overflow-hidden">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead className="bg-[#11135E]/30 text-gray-400 border-b border-[#16166F] uppercase font-mono text-[9px]">
                            <tr>
                              <th className="p-3">Patient Registry</th>
                              <th className="p-3">Clinical Status</th>
                              <th className="p-3">Last Checked</th>
                              <th className="p-3">Settle Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {clinicalPatients.map((p, idx) => (
                              <tr key={idx} className="border-b border-[#16166F]/10 hover:bg-white/5">
                                <td className="p-3 font-bold text-white">{p.name}</td>
                                <td className="p-3">
                                  <span className="font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                                    {p.status}
                                  </span>
                                </td>
                                <td className="p-3 font-mono text-gray-400">{p.check}</td>
                                <td className="p-3">
                                  <button 
                                    onClick={() => {
                                      setNotifications(prev => [`Settle clinical checklist for ${p.name}`, ...prev]);
                                      setClinicalPatients(prev => prev.filter(x => x.id !== p.id));
                                      alert(`Patient checkup completed! Receipt record logged.`);
                                    }}
                                    className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded cursor-pointer leading-none"
                                  >
                                    Done
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* GENERAL SQL FALLBACK */}
                  {launchedApp.id !== 'mod-pos' && launchedApp.id !== 'mod-pbx' && launchedApp.id !== 'mod-cashbook' && launchedApp.id !== 'mod-invoicenex' && (
                    <div className="space-y-4 font-mono text-[11px]">
                      <p className="font-bold text-white text-xs">Simulated SQLite Tables Engine Sandbox</p>
                      <div className="bg-[#02020A]/70 border border-[#16166F]/60 p-4 rounded-xl leading-relaxed">
                        <p className="text-emerald-400">$ SELECT * FROM {launchedApp.id.replace('mod-', 'tbl_')} WHERE active = 1;</p>
                        <p className="text-gray-500">Query successfully executed on client offline database framework.</p>
                        
                        <div className="mt-4 border-t border-[#16166F]/30 pt-3 text-gray-300">
                          <p>Record row: <b className="text-white">UID_ACME_782A</b></p>
                          <p>Allocated module fee: <b className="text-white">BDT {launchedApp.fee}</b></p>
                          <p>Rating factor: <b className="text-white">{launchedApp.rating} stars</b></p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Footer close */}
                <div className="bg-[#11135E]/40 border-t border-[#16166F] p-4 flex justify-between items-center text-[10px] text-gray-400 font-mono">
                  <span>EUROSIA SANDBOX v1.2</span>
                  <span>Isolation protocol: SQLite Offline Isolated Mode</span>
                </div>

              </div>
            </div>
          )}

          {/* ━━━━━━━━━━━━━━━━ BKASH SECURE PAYMENT SIMULATOR MODAL ━━━━━━━━━━━━━━━━ */}
          {paymentModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl relative text-xs text-white" style={{ backgroundColor: '#D12053' }}>
                
                {/* bKash Header branding */}
                <div className="p-5 flex justify-between items-center border-b border-white/20">
                  <div className="flex items-center gap-2.5">
                    <span className="font-black tracking-widest text-[#E2136E] bg-white rounded px-2.5 py-1 text-base italic leading-none shadow">bKash</span>
                    <span className="text-xs font-mono font-semibold tracking-wide border border-white/30 px-1.5 py-0.5 rounded leading-none">Sandbox Mode</span>
                  </div>
                  <button 
                    onClick={() => {
                      setPaymentModalOpen(false);
                      setPayingPending(false);
                      setBkashWalletNumber('');
                      setBkashPin('');
                    }}
                    className="p-1.5 text-white hover:text-white/70 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* bKash Body instructions */}
                <div className="p-6 space-y-4">
                  <div className="bg-white/10 p-3 rounded-lg text-[10.5px] leading-relaxed">
                    <p><b>Pay To:</b> Eurosia App Ecosystem Sandbox Licensing Unit</p>
                    <p className="mt-1"><b>Total Payable Amount:</b> ৳ {((userSeatsLimit * 100) + (deviceSeatsLimit * 150)).toLocaleString()} BDT</p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-white/80 uppercase tracking-wider text-[9px] font-bold">Your bKash Wallet Number</label>
                      <input 
                        type="text" 
                        required
                        value={bkashWalletNumber}
                        onChange={(e) => setBkashWalletNumber(e.target.value)}
                        placeholder="e.g. 01712345678"
                        className="w-full bg-white text-black font-mono font-bold text-center text-sm px-4 py-2 rounded-lg py-2.5 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-white/80 uppercase tracking-wider text-[9px] font-bold">Enter 5-digit bKash PIN</label>
                      <input 
                        type="password" 
                        maxLength={5}
                        required
                        value={bkashPin}
                        onChange={(e) => setBkashPin(e.target.value)}
                        placeholder="•••••"
                        className="w-full bg-white text-black font-black text-center text-sm tracking-widest px-4 py-2.5 rounded-lg focus:outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      disabled={payingPending || !bkashWalletNumber || !bkashPin}
                      onClick={() => {
                        setPayingPending(true);
                        setNotifications(prev => [`Processing secure bKash payment API handshake...`, ...prev]);
                        setTimeout(() => {
                          setPayingPending(false);
                          setCompanyPlanTier(tempUpgradeTargetPlan);
                          setNotifications(prev => [
                            `PLAN UPGRADED TO ${tempUpgradeTargetPlan.toUpperCase()} CLUSTER! Licensed seat cap secured successfully.`,
                            `bKash transaction TXN_SIM_${Math.floor(Date.now() / 10000)} cleared BDT.`,
                            ...prev
                          ]);
                          alert(`bKash Sandbox Payment Cleared successfully!\nYour license and active seats limits are verified and activated.`);
                          setPaymentModalOpen(false);
                          setBkashWalletNumber('');
                          setBkashPin('');
                        }, 2200);
                      }}
                      className="w-full py-3 bg-[#E2136E] hover:bg-[#C2115E] text-white font-black rounded-xl cursor-pointer transition-colors shadow-lg shadow-black/20 text-xs"
                    >
                      {payingPending ? 'Handshaking Secure bKash Gateway...' : 'Settle Payment with bKash Sandbox'}
                    </button>
                  </div>
                </div>

                {/* bKash fineprint footer */}
                <div className="bg-black/20 p-3.5 text-center text-[10px] text-white/70">
                  Secured by bKash sandboxed gateway connection.
                </div>

              </div>
            </div>
          )}

        </div>

      </main>

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { 
  Mail, PhoneCall, MapPin, Send, CheckCircle, Sparkles, 
  Facebook, Twitter, Linkedin, MessageSquare, ShieldCheck, 
  Globe, Users, Zap
} from 'lucide-react';
import RegionalHubs from '../contact/RegionalHubs.tsx';
import { getSocialIconComponent } from './FloatingSocialBar.tsx';
import { SocialPlatform } from '../../types/app';

const DEFAULT_CONTACT_SOCIAL_PLATFORMS: SocialPlatform[] = [
  { id: 'soc-facebook', name: 'Facebook', url: 'https://www.facebook.com/EurosiaOfficial', icon: 'Facebook', status: 'active', sortOrder: 1 },
  { id: 'soc-x', name: 'X (Twitter)', url: 'https://x.com/EurosiaOfficial', icon: 'Twitter', status: 'active', sortOrder: 2 },
  { id: 'soc-linkedin', name: 'LinkedIn', url: 'https://linkedin.com/in/EurosiaOfficial', icon: 'Linkedin', status: 'active', sortOrder: 3 },
  { id: 'soc-instagram', name: 'Instagram', url: 'https://www.instagram.com/EurosiaOfficial', icon: 'Instagram', status: 'active', sortOrder: 4 }
];

interface ContactProps {
  onLoginClick: () => void;
  onStartTrialClick: () => void;
}

export default function Contact({
  onLoginClick,
  onStartTrialClick
}: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: 'general',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please specify required variables: name, email, and message.");
      return;
    }
    setFormStatus('submitting');
    
    try {
      const response = await fetch('/api/custom-solution-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: 'Contact Form Lead',
          phone: formData.phone || 'N/A',
          email: formData.email,
          country: 'BD',
          industry: `Purpose: ${formData.purpose}`,
          service_type: 'Contact Request',
          budget: 'N/A',
          description: formData.message,
          status: 'New'
        })
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          purpose: 'general',
          message: ''
        });
      } else {
        alert("Transmission failure over backend gateway node. Please try again.");
        setFormStatus('idle');
      }
    } catch (e) {
      console.error(e);
      alert("Network exception establishing database write session. Please try again.");
      setFormStatus('idle');
    }
  };

  return (
    <div className="animate-fadeIn min-h-screen text-zinc-300 text-left">
      {/* ━━━━━━━━━━━━━━━━ CONTACT HERO HERO ━━━━━━━━━━━━━━━━ */}
      <section className="relative pt-24 pb-20 px-6 bg-black text-white overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1033_1px,transparent_1px),linear-gradient(to_bottom,#0c1033_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-[#FF3D4F]/10 rounded-full filter blur-[100px] animate-pulse"></div>

        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-[#FF3D4F] rounded-full text-[10px] font-bold tracking-widest uppercase">
            <Mail className="w-3.5 h-3.5" />
            <span>GLOBAL TECHNICAL ENGAGEMENT GATEWAY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase">
            Connect with Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-red-400">Regional Centers</span>
          </h1>

          <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed max-w-2xl">
            Have questions regarding offline local sync routines, biometric interface adapters, custom whitelabel setups or pricing structures? Reach out directly to our engineering hubs.
          </p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ CONTACT FORM & INFO STACKS ━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
        
        {/* Contact Form Container */}
        <div className="lg:col-span-7 bg-[#05051B] border border-zinc-900 p-8 rounded-2xl relative text-left">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF3D4F]/5 rounded-full filter blur-xl pointer-events-none"></div>
          
          <h3 className="font-bold text-sm text-white uppercase tracking-wider pb-3 border-b border-zinc-900 flex items-center gap-1.5 mb-6">
            <Zap className="w-4 h-4 text-[#FF3D4F]" /> Transmission Terminal
          </h3>

          {formStatus === 'success' ? (
            <div className="p-8 text-center space-y-4 border border-[#FF3D4F]/20 rounded-xl bg-red-500/5 my-8">
              <CheckCircle className="w-12 h-12 text-[#FF3D4F] mx-auto animate-bounce" />
              <h4 className="text-lg font-bold text-white uppercase">Payload Transmitted Successfully</h4>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                Your message has been parsed by our central office node. An advisor from your nearest hub will establish contact shortly.
              </p>
              <button
                onClick={() => setFormStatus('idle')}
                className="mt-4 px-4 py-2 bg-zinc-900 border border-zinc-800 text-xs font-bold text-white rounded hover:border-[#FF3D4F] cursor-pointer"
              >
                Transmit New Payload
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-500 font-mono font-bold uppercase block">Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="E.g. Shamsur Rahman"
                    className="w-full bg-zinc-950 border border-zinc-850 focus:border-[#FF3D4F] text-white rounded-xl px-4 py-3 text-xs focus:outline-none transition-all placeholder-zinc-600 font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-500 font-mono font-bold uppercase block">Email Coordinates *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="E.g. shamsur@company.com"
                    className="w-full bg-zinc-950 border border-zinc-850 focus:border-[#FF3D4F] text-white rounded-xl px-4 py-3 text-xs focus:outline-none transition-all placeholder-zinc-600 font-semibold"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-500 font-mono font-bold uppercase block">Contact Hotlines Optional</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="E.g. +880 17xxxx"
                    className="w-full bg-zinc-950 border border-zinc-850 focus:border-[#FF3D4F] text-white rounded-xl px-4 py-3 text-xs focus:outline-none transition-all placeholder-zinc-600 font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-500 font-mono font-bold uppercase block">Request Scope</label>
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950 border border-zinc-850 focus:border-[#FF3D4F] text-white rounded-xl px-4 py-3 text-xs focus:outline-none transition-all font-semibold"
                  >
                    <option value="general">General Enterprise Queries</option>
                    <option value="pos">Eurosia POS Setup</option>
                    <option value="whitelabel">Whitelabel Partnerships</option>
                    <option value="compliance">System Cybersecurity Records</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-500 font-mono font-bold uppercase block">Message Payload *</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Detail your hardware setups, active nodes requirements, and localized database volumes..."
                  className="w-full bg-zinc-950 border border-zinc-850 focus:border-[#FF3D4F] text-white rounded-xl p-4 text-xs focus:outline-none transition-all placeholder-zinc-600 font-semibold"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="w-full py-4 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {formStatus === 'submitting' ? (
                  <span>Transmitting Payload Nodes...</span>
                ) : (
                  <>
                    <span>Transmit Message Node</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Global Addresses */}
        <div className="lg:col-span-5 space-y-8">
          <RegionalHubs />
          <ContactSocialCard />
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ GLOWING ACTIVE NETWORK MAP RADAR ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 bg-black border-y border-zinc-900 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <span className="text-[#FF3D4F] font-mono text-[10px] font-bold tracking-widest uppercase">RADAR NETWORK METRICS</span>
            <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">Active Regional Telemetry</h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
              This glowing matrix maps actively synchronized database hubs and telecommunication PBX trunks in Dhaka and Kuala Lumpur. Any offline register instances are instantly routed towards the nearest caching node center.
            </p>
            
            <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold text-white uppercase font-mono">DHAKA SERVER CORRIDOR</span>
              </div>
              <span className="text-[10px] text-zinc-500 uppercase">99.9% ACTIVE</span>
            </div>

            <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold text-white uppercase font-mono">KL SERVER CORRIDOR</span>
              </div>
              <span className="text-[10px] text-zinc-500 uppercase">99.9% ACTIVE</span>
            </div>
          </div>

          {/* Futuristic glowing radar vector map */}
          <div className="bg-[#05051B] p-8 rounded-2xl border border-zinc-900 relative flex items-center justify-center h-80 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#ff3d4f10_0%,transparent_70%)]"></div>
            
            {/* Visual radar lines overlay */}
            <div className="relative w-48 h-48 border border-zinc-800 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '20s' }}>
              <div className="w-36 h-36 border border-zinc-900 border-dashed rounded-full flex items-center justify-center">
                <div className="w-24 h-24 border border-zinc-800 rounded-full flex items-center justify-center">
                  <div className="w-2 h-12 bg-gradient-to-t from-transparent to-[#FF3D4F]/30 origin-bottom transform rotate-45"></div>
                </div>
              </div>
            </div>

            {/* Glowing red dots indicating Dhaka (Center Right) and KL (Bottom Middle) */}
            <div className="absolute top-[35%] right-[32%] flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF3D4F]"></span>
              </span>
              <span className="text-[9px] font-mono text-white font-bold bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">DHAKA NODE 01</span>
            </div>

            <div className="absolute bottom-[28%] left-[45%] flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-[9px] font-mono text-white font-bold bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">KL HUB 02</span>
            </div>

            <span className="absolute bottom-4 right-4 text-[9px] font-mono text-zinc-500">SIMULATING REALTIME TELEMETRY</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactSocialCard() {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>(DEFAULT_CONTACT_SOCIAL_PLATFORMS);

  useEffect(() => {
    fetch('/api/site/social')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Fallback');
      })
      .then((data: SocialPlatform[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setPlatforms(data);
        }
      })
      .catch(() => {
        setPlatforms(DEFAULT_CONTACT_SOCIAL_PLATFORMS.filter(p => p.status === 'active'));
      });
  }, []);

  return (
    <div className="bg-[#05051B] border border-zinc-900/80 p-6 rounded-2xl relative text-left transition-all duration-300 hover:border-[#FF3D4F]/35 hover:shadow-[0_0_20px_rgba(255,61,79,0.08)] group z-10">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#FF3D4F]/5 to-transparent rounded-tr-2xl filter blur-xl opacity-60 pointer-events-none"></div>
      
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4">
        <h4 className="font-extrabold text-xs text-white uppercase tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF3D4F] animate-pulse"></span>
          Connect with Eurosia
        </h4>
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          SYSTEM CARDS
        </span>
      </div>

      <p className="text-zinc-400 text-xs font-light leading-relaxed mb-6">
        Engage with our core team across our verified channels for real-time announcements, design systems, open source tools, and system logs.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {platforms.map((platform) => {
          const IconComponent = getSocialIconComponent(platform.icon);
          return (
            <a
              key={platform.id}
              href={platform.url || '#'}
              target={platform.url ? "_blank" : undefined}
              rel={platform.url ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 p-3 bg-zinc-950/60 border border-zinc-900 rounded-xl hover:border-[#FF3D4F]/50 text-zinc-300 hover:text-white transition-all duration-300 group/link shadow-sm focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover/link:text-[#FF3D4F] group-hover/link:border-[#FF3D4F]/30 transition-all shrink-0">
                <IconComponent className="w-4 h-4" />
              </div>
              <div className="flex flex-col leading-none overflow-hidden">
                <span className="text-[10px] font-bold uppercase tracking-wider font-mono truncate">
                  {platform.name}
                </span>
                <span className="text-[8.5px] text-zinc-500 mt-1 uppercase font-semibold">
                  Official
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

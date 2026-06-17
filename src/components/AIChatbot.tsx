/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, Send, X, Bot, Sparkles, RefreshCw, 
  Phone, Check, Calendar, Code, Laptop, Smartphone, 
  Layers, CreditCard, ChevronRight, ArrowLeft 
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage.ts';

interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export default function AIChatbot() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState<'hub' | 'chat' | 'software_form' | 'demo_form'>('hub');
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Chat state
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'assistant',
      text: 'Greetings. I am EUROSIA AI, your enterprise operations digital advisor. How can I assist you with modules, licensing configurations, or database sync today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  // Software request form state
  const [softwareForm, setSoftwareForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    projectType: 'Custom Enterprise Software',
    requirements: '',
    budget: '$5,000 - $15,000',
    timeline: '1-3 Months'
  });
  const [softwareSubmitting, setSoftwareSubmitting] = useState(false);
  const [softwareSuccess, setSoftwareSuccess] = useState(false);

  // Demo form state
  const [demoForm, setDemoForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    preferredDate: '',
    preferredTime: '10:00 AM'
  });
  const [demoSubmitting, setDemoSubmitting] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);

  // Redirect loading state (for WhatsApp actions)
  const [redirectingMessage, setRedirectingMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeView === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeView]);

  // Handle WhatsApp Link Click + Silent Database Lead Registration
  const handleWhatsAppAction = async (title: string, prefillMessage: string, url: string) => {
    setRedirectingMessage(`Connecting to Eurosia Support for ${title}...`);
    
    try {
      // Register Lead silently to Admin Dashboard
      await fetch('/api/custom-solution-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `WhatsApp Lead (Client)`,
          company: 'Website Visitor',
          phone: 'Direct WhatsApp Tap',
          email: 'visitor@eurosia.app',
          country: 'BD',
          industry: 'Inbound Inquiry',
          service_type: `WhatsApp Lead: ${title}`,
          budget: 'To Be Discussed',
          description: `User tapped WhatsApp Consultation shortcut. Prefill template: "${prefillMessage}"`,
          status: 'New'
        })
      });
    } catch (e) {
      console.error("Silent lead record tracking failed:", e);
    }

    setTimeout(() => {
      setRedirectingMessage(null);
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 1200);
  };

  // Submit custom software form
  const handleSoftwareSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!softwareForm.name || !softwareForm.phone || !softwareForm.email || !softwareForm.requirements) {
      alert("Please fill out Name, Phone, Email, and Requirements.");
      return;
    }

    setSoftwareSubmitting(true);
    try {
      const response = await fetch('/api/custom-solution-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: softwareForm.name,
          company: softwareForm.company || 'Private Client',
          phone: softwareForm.phone,
          email: softwareForm.email,
          country: 'BD',
          industry: softwareForm.projectType,
          service_type: 'Custom Software Request',
          budget: softwareForm.budget,
          description: `${softwareForm.requirements}\n\n[Project Timeline Request: ${softwareForm.timeline}]`,
          status: 'New'
        })
      });

      if (response.ok) {
        setSoftwareSuccess(true);
        setSoftwareForm({
          name: '',
          company: '',
          phone: '',
          email: '',
          projectType: 'Custom Enterprise Software',
          requirements: '',
          budget: '$5,000 - $15,000',
          timeline: '1-3 Months'
        });
      } else {
        alert("Failed to submit requirements. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during submission.");
    } finally {
      setSoftwareSubmitting(false);
    }
  };

  // Submit Demo booking form
  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoForm.name || !demoForm.phone || !demoForm.email || !demoForm.preferredDate) {
      alert("Please specify Name, Phone, Email, and Date.");
      return;
    }

    setDemoSubmitting(true);
    try {
      const response = await fetch('/api/custom-solution-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: demoForm.name,
          company: demoForm.company || 'Inquiring Enterprise',
          phone: demoForm.phone,
          email: demoForm.email,
          country: 'BD',
          industry: 'Product Demo Access',
          service_type: 'Demo Request',
          budget: 'N/A',
          description: `Booked system walkthrough / demonstration.\nPreferred Date: ${demoForm.preferredDate}\nPreferred Time Selection: ${demoForm.preferredTime}`,
          status: 'New'
        })
      });

      if (response.ok) {
        setDemoSuccess(true);
        setDemoForm({
          name: '',
          phone: '',
          email: '',
          company: '',
          preferredDate: '',
          preferredTime: '10:00 AM'
        });
      } else {
        alert("Booking request rejected by live validation nodes.");
      }
    } catch (error) {
      console.error(error);
      alert("Server response error while scheduling demo.");
    } finally {
      setDemoSubmitting(false);
    }
  };

  // Chat message submission
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const userText = message;
    setMessage('');
    setMessages(prev => [...prev, {
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString()
    }]);

    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      const data = await response.json();
      
      setMessages(prev => [...prev, {
        sender: 'assistant',
        text: data.response || 'Connection lost, please retry.',
        timestamp: new Date().toLocaleTimeString()
      }]);
    } catch (e: any) {
      setMessages(prev => [...prev, {
        sender: 'assistant',
        text: `Error connecting to AI Node: ${e.message}`,
        timestamp: new Date().toLocaleTimeString()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const currentPath = window.location.pathname;

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      
      {/* On-Hover Dynamic Tooltip / Toast Status for Conversion Optimization */}
      {showTooltip && !isOpen && (
        <div className="absolute bottom-16 right-0 bg-[#05051F]/95 border border-[#16166F] px-4 py-2 rounded-xl shadow-2xl backdrop-blur-md text-slate-100 text-[11px] font-semibold w-52 pointer-events-none animate-fadeIn mr-1">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-0.5 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>🟢 OPERATORS ONLINE</span>
          </div>
          <p className="text-[10px] text-gray-400">Average response: <span className="text-white font-bold">5 minutes</span></p>
        </div>
      )}

      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="relative flex items-center gap-2.5 bg-gradient-to-r from-[#FF3D4F] to-[#CC1A2F] text-white px-5 py-3.5 rounded-full shadow-2xl shadow-[#FF3D4F]/35 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-emerald-500/10 hover:border-emerald-500/20"
          id="btn-ai-chat-launcher"
        >
          {/* Animated online ring status */}
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#FF3D4F] to-[#CC1A2F] opacity-25 blur animate-pulse pointer-events-none"></span>
          
          <Bot className="w-5.5 h-5.5 animate-bounce text-white relative z-10" />
          <span className="font-extrabold text-xs tracking-widest relative z-10 font-mono uppercase">EUROSIA AI</span>
          
          {/* Beacon status dot */}
          <span className="flex h-2.5 w-2.5 relative z-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-black/20"></span>
          </span>

          {/* Unread Alert Badge (Conversion trigger) */}
          <span className="absolute -top-1.5 -right-1 bg-amber-500 text-black text-[9px] font-black font-mono h-4 w-4 rounded-full flex items-center justify-center border-2 border-[#05051F]">
            1
          </span>
        </button>
      )}

      {/* Glassmorphic Communication Panel / Bottom Sheet */}
      {isOpen && (
        <div 
          className="bg-gradient-to-b from-[#0a0c2e]/98 to-[#05051F]/95 border border-[#16166F] w-[394px] max-w-[calc(100vw-2rem)] h-[620px] max-h-[calc(100vh-6rem)] rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-fadeIn"
          id="panel-ai-chat-window"
        >
          {/* Panel Header */}
          <div className="bg-gradient-to-r from-[#11135E]/80 to-[#0A0A6B]/80 p-4 shrink-0 flex items-center justify-between border-b border-[#16166F]/80">
            <div className="flex items-center gap-3">
              <div className="bg-[#FF3D4F]/15 p-2 rounded-xl border border-[#FF3D4F]/30 animate-pulse">
                <Sparkles className="w-5 h-5 text-[#FF3D4F]" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-black text-white tracking-widest uppercase font-mono">Eurosia Support</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[9px] text-[#25D366] font-bold font-mono tracking-wider uppercase">ONLINE • FAST RESPONSE</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-all cursor-pointer p-1.5 rounded-lg hover:bg-[#16166F]/40"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Persistent Tab Selection */}
          <div className="bg-[#02020A]/60 border-b border-[#16166F]/50 px-3 py-2 flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveView('hub')}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
                activeView === 'hub' || activeView === 'software_form' || activeView === 'demo_form'
                  ? 'bg-[#FF3D4F] text-white shadow-md shadow-[#FF3D4F]/20'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#16166F]/30'
              }`}
            >
              🛠️ Communications Hub
            </button>
            <button
              onClick={() => setActiveView('chat')}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
                activeView === 'chat'
                  ? 'bg-[#FF3D4F] text-white shadow-md shadow-[#FF3D4F]/20'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#16166F]/30'
              }`}
            >
              🤖 Tech-AI Assistant
            </button>
          </div>

          {/* Action-pending Redirect Spinner Overlay */}
          {redirectingMessage && (
            <div className="absolute inset-0 bg-[#05051F]/90 z-50 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
              <RefreshCw className="w-10 h-10 text-[#FF3D4F] animate-spin mb-4" />
              <p className="text-sm font-bold text-white transition-all">{redirectingMessage}</p>
              <p className="text-[10px] text-zinc-500 mt-2 font-mono uppercase tracking-wider">Establishing WhatsApp Secure Gateway...</p>
            </div>
          )}

          {/* Core Panel Contents */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none">
            
            {/* VIEW 1: DYNAMICAL HUB OPTIONS GALLERY */}
            {activeView === 'hub' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-[#11135E]/20 border border-[#16166F]/40 p-3 rounded-xl text-left">
                  <p className="text-[11px] text-zinc-300 leading-relaxed font-semibold">
                    Welcome to the <span className="text-[#FF3D4F]">Eurosia Communication Terminal</span>. Select our streamlined channels to initiate customized software builds, consultations, or bookings instantly.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {/* OPTION 1: WhatsApp Consultation */}
                  <button
                    onClick={() => handleWhatsAppAction(
                      'Primary Consultation',
                      'I would like to discuss my project requirements.',
                      'https://wa.me/8801711408725?text=Hello%20Eurosia%20Team%2C%20I%20would%20like%20to%20discuss%20my%20project%20requirements.%20Please%20contact%20me.'
                    )}
                    className="w-full relative group overflow-hidden bg-gradient-to-r from-emerald-600/20 to-emerald-950/20 border border-emerald-500/30 hover:border-emerald-500/70 hover:bg-emerald-500/10 rounded-xl p-3.5 transition-all text-left flex items-center justify-between cursor-pointer active:scale-[0.99] font-sans"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-500 text-white p-2 rounded-lg group-hover:scale-105 transition-all">
                        <Phone className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h5 className="text-[11px] font-black text-white uppercase tracking-wider">WhatsApp Consultation</h5>
                        <p className="text-[10px] text-zinc-400 mt-0.5">Instant chat with engineers directly on WhatsApp</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* OPTION 2: Request Custom Software */}
                  <button
                    onClick={() => setActiveView('software_form')}
                    className="w-full group bg-[#11135E]/15 hover:bg-[#11135E]/30 border border-[#16166F]/50 hover:border-[#FF3D4F]/40 rounded-xl p-3.5 transition-all text-left flex items-center justify-between cursor-pointer active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-[#FF3D4F]/10 text-[#FF3D4F] border border-[#FF3D4F]/20 p-2 rounded-lg group-hover:bg-[#FF3D4F]/20 transition-all">
                        <Code className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h5 className="text-[11px] font-black text-white uppercase tracking-wider">Request Custom Software</h5>
                        <p className="text-[10px] text-zinc-400 mt-0.5">Submit detailed build specs directly to admin desk</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>

                  {/* OPTION 8: Book Demo Form */}
                  <button
                    onClick={() => setActiveView('demo_form')}
                    className="w-full group bg-[#11135E]/15 hover:bg-[#11135E]/30 border border-[#16166F]/50 hover:border-[#FF3D4F]/40 rounded-xl p-3.5 transition-all text-left flex items-center justify-between cursor-pointer active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 p-2 rounded-lg group-hover:bg-indigo-500/20 transition-all">
                        <Calendar className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h5 className="text-[11px] font-black text-white uppercase tracking-wider">Book System Live Demo</h5>
                        <p className="text-[10px] text-zinc-400 mt-0.5">Schedule a live guided visual tour with technical staff</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>

                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-[#16166F]/40"></span></div>
                    <div className="relative flex justify-center text-[9px] uppercase tracking-widest font-mono text-zinc-500"><span className="bg-[#05051F] px-3 font-bold">Quick Quotations & Inquiries</span></div>
                  </div>

                  {/* OPTION 3: Req Website Developer */}
                  <button
                    onClick={() => handleWhatsAppAction(
                      'Website Development',
                      'I need a Website Development quotation.',
                      'https://wa.me/8801711408725?text=Hello%20Eurosia%20Team%2C%20I%20need%20a%20Website%20Development%20quotation.'
                    )}
                    className="w-full group bg-[#02020A]/45 hover:bg-[#11135E]/20 border border-[#16166F]/45 rounded-xl px-3 py-2.5 transition-all text-left flex items-center justify-between cursor-pointer text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <Laptop className="w-4 h-4 text-[#FF3D4F]" />
                      <span className="font-bold text-zinc-200 group-hover:text-white tracking-wide text-[10.5px]">Request Website Development</span>
                    </div>
                    <span className="text-[9px] bg-[#25D366]/10 text-[#25D366] font-mono font-bold uppercase px-2 py-0.5 rounded border border-[#25D366]/20 group-hover:scale-105 transition-all">WhatsApp</span>
                  </button>

                  {/* OPTION 4: Req Mobile App Developer */}
                  <button
                    onClick={() => handleWhatsAppAction(
                      'Mobile App Development',
                      'I need a Mobile App Development quotation.',
                      'https://wa.me/8801711408725?text=Hello%20Eurosia%20Team%2C%20I%20need%20a%20Mobile%20App%20Development%20quotation.'
                    )}
                    className="w-full group bg-[#02020A]/45 hover:bg-[#11135E]/20 border border-[#16166F]/45 rounded-xl px-3 py-2.5 transition-all text-left flex items-center justify-between cursor-pointer text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <Smartphone className="w-4 h-4 text-sky-400" />
                      <span className="font-bold text-zinc-200 group-hover:text-white tracking-wide text-[10.5px]">Request Mobile App Development</span>
                    </div>
                    <span className="text-[9px] bg-[#25D366]/10 text-[#25D366] font-mono font-bold uppercase px-2 py-0.5 rounded border border-[#25D366]/20 group-hover:scale-105 transition-all">WhatsApp</span>
                  </button>

                  {/* OPTION 5: Req ERP Solution */}
                  <button
                    onClick={() => handleWhatsAppAction(
                      'ERP Solution Info',
                      'I need ERP Solution information.',
                      'https://wa.me/8801711408725?text=Hello%20Eurosia%20Team%2C%20I%20need%20ERP%20Solution%20information.'
                    )}
                    className="w-full group bg-[#02020A]/45 hover:bg-[#11135E]/20 border border-[#16166F]/45 rounded-xl px-3 py-2.5 transition-all text-left flex items-center justify-between cursor-pointer text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-violet-400" />
                      <span className="font-bold text-zinc-200 group-hover:text-white tracking-wide text-[10.5px]">Request ERP Suite Quotation</span>
                    </div>
                    <span className="text-[9px] bg-[#25D366]/10 text-[#25D366] font-mono font-bold uppercase px-2 py-0.5 rounded border border-[#25D366]/20 group-hover:scale-105 transition-all">WhatsApp</span>
                  </button>

                  {/* OPTION 6: Req POS Solution */}
                  <button
                    onClick={() => handleWhatsAppAction(
                      'POS Solution Info',
                      'I need POS Solution information.',
                      'https://wa.me/8801711408725?text=Hello%20Eurosia%20Team%2C%20I%20need%20POS%20Solution%20information.'
                    )}
                    className="w-full group bg-[#02020A]/45 hover:bg-[#11135E]/20 border border-[#16166F]/45 rounded-xl px-3 py-2.5 transition-all text-left flex items-center justify-between cursor-pointer text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <CreditCard className="w-4 h-4 text-amber-400" />
                      <span className="font-bold text-zinc-200 group-hover:text-white tracking-wide text-[10.5px]">Request POS Setup Quotation</span>
                    </div>
                    <span className="text-[9px] bg-[#25D366]/10 text-[#25D366] font-mono font-bold uppercase px-2 py-0.5 rounded border border-[#25D366]/20 group-hover:scale-105 transition-all">WhatsApp</span>
                  </button>

                  {/* OPTION 7: Req Healthcare Solution */}
                  <button
                    onClick={() => handleWhatsAppAction(
                      'Healthcare Software',
                      'I need Healthcare Solution information.',
                      'https://wa.me/8801711408725?text=Hello%20Eurosia%20Team%2C%20I%20need%20Healthcare%20Solution%20information.'
                    )}
                    className="w-full group bg-[#02020A]/45 hover:bg-[#11135E]/20 border border-[#16166F]/45 rounded-xl px-3 py-2.5 transition-all text-left flex items-center justify-between cursor-pointer text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <Bot className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold text-zinc-200 group-hover:text-white tracking-wide text-[10.5px]">Request Healthcare Solution</span>
                    </div>
                    <span className="text-[9px] bg-[#25D366]/10 text-[#25D366] font-mono font-bold uppercase px-2 py-0.5 rounded border border-[#25D366]/20 group-hover:scale-105 transition-all">WhatsApp</span>
                  </button>
                </div>
              </div>
            )}

            {/* VIEW 2: CUSTOM SOFTWARE FORM */}
            {activeView === 'software_form' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 pb-1 border-b border-[#16166F]/40">
                  <button 
                    onClick={() => { setActiveView('hub'); setSoftwareSuccess(false); }}
                    className="p-1 px-2 rounded bg-[#11135E]/50 text-white border border-[#16166F] text-[10px] uppercase font-bold flex items-center gap-1 hover:bg-[#FF3D4F] transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <span className="text-[11px] font-bold text-white uppercase font-mono tracking-wider">Custom Build Requirements Form</span>
                </div>

                {softwareSuccess ? (
                  <div className="p-8 text-center bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-3">
                    <div className="h-10 w-10 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400 font-bold text-xl">✓</div>
                    <h5 className="font-bold text-white uppercase text-xs">Build Payload Transmitted</h5>
                    <p className="text-[10.5px] text-zinc-300 leading-relaxed max-w-xs mx-auto">
                      Thank you! Your requirements have been logged in our Lead Management engine under key <span className="text-emerald-400 font-mono">"Custom Software Lead"</span>. Our team will contact you shortly and schedule discussions.
                    </p>
                    <button
                      onClick={() => { setSoftwareSuccess(false); setActiveView('hub'); }}
                      className="px-4 py-1.5 bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-widest font-black text-white hover:border-[#FF3D4F] rounded cursor-pointer mt-2"
                    >
                      Return to Hub
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSoftwareSubmit} className="space-y-3 text-left text-xs">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-400 font-bold font-mono uppercase">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={softwareForm.name}
                        onChange={(e) => setSoftwareForm({ ...softwareForm, name: e.target.value })}
                        placeholder="E.g. Shamsur Rahman"
                        className="w-full bg-[#11135E]/20 border border-[#16166F] focus:border-[#FF3D4F] text-white rounded-xl px-3 py-2 text-xs focus:outline-none placeholder-zinc-600 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-bold font-mono uppercase">Company Name</label>
                        <input
                          type="text"
                          value={softwareForm.company}
                          onChange={(e) => setSoftwareForm({ ...softwareForm, company: e.target.value })}
                          placeholder="E.g. Eurosia Tech"
                          className="w-full bg-[#11135E]/20 border border-[#16166F] focus:border-[#FF3D4F] text-white rounded-xl px-3 py-2 text-xs focus:outline-none placeholder-zinc-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-bold font-mono uppercase">Phone *</label>
                        <input
                          type="text"
                          required
                          value={softwareForm.phone}
                          onChange={(e) => setSoftwareForm({ ...softwareForm, phone: e.target.value })}
                          placeholder="Phone Coordinates"
                          className="w-full bg-[#11135E]/20 border border-[#16166F] focus:border-[#FF3D4F] text-white rounded-xl px-3 py-2 text-xs focus:outline-none placeholder-zinc-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-bold font-mono uppercase">Email Coordinates *</label>
                        <input
                          type="email"
                          required
                          value={softwareForm.email}
                          onChange={(e) => setSoftwareForm({ ...softwareForm, email: e.target.value })}
                          placeholder="name@domain.com"
                          className="w-full bg-[#11135E]/20 border border-[#16166F] focus:border-[#FF3D4F] text-white rounded-xl px-3 py-2 text-xs focus:outline-none placeholder-zinc-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-bold font-mono uppercase">Project Architecture</label>
                        <select
                          value={softwareForm.projectType}
                          onChange={(e) => setSoftwareForm({ ...softwareForm, projectType: e.target.value })}
                          className="w-full bg-zinc-950 border border-[#16166F] text-white rounded-xl px-3 py-2 text-xs focus:outline-none"
                        >
                          <option value="Custom Enterprise Software">Custom Enterprise Software</option>
                          <option value="SaaS Platform Development">SaaS Platform Dev</option>
                          <option value="Web Portal Solution">Web Portal Suite</option>
                          <option value="Mobile App Enterprise">Mobile App Framework</option>
                          <option value="Database API Sync integration">Database Sync Node</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-bold font-mono uppercase">Estimated Budget</label>
                        <select
                          value={softwareForm.budget}
                          onChange={(e) => setSoftwareForm({ ...softwareForm, budget: e.target.value })}
                          className="w-full bg-zinc-950 border border-[#16166F] text-white rounded-xl px-3 py-2 text-xs"
                        >
                          <option value="< $5,000">&lt; $5,000</option>
                          <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                          <option value="$15,000 - $50,000">$15,000 - $50,000</option>
                          <option value="$50,050 / Custom">$50,000+ / Custom Enterprise</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-bold font-mono uppercase">Timeline Target</label>
                        <select
                          value={softwareForm.timeline}
                          onChange={(e) => setSoftwareForm({ ...softwareForm, timeline: e.target.value })}
                          className="w-full bg-zinc-950 border border-[#16166F] text-white rounded-xl px-3 py-2 text-xs"
                        >
                          <option value="1-3 Months">1-3 Months (Fast Track)</option>
                          <option value="3-6 Months">3-6 Months (Standard)</option>
                          <option value="6-12 Months">6-12 Months (Enterprise)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-400 font-bold font-mono uppercase">Detailed Core Requirements *</label>
                      <textarea
                        required
                        rows={3.5}
                        value={softwareForm.requirements}
                        onChange={(e) => setSoftwareForm({ ...softwareForm, requirements: e.target.value })}
                        placeholder="Please describe features, integration goals, user limits..."
                        className="w-full bg-[#11135E]/20 border border-[#16166F] focus:border-[#FF3D4F] text-white rounded-xl p-3 text-xs focus:outline-none placeholder-zinc-650"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={softwareSubmitting}
                      className="w-full py-3 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white font-extrabold uppercase tracking-wider rounded-xl cursor-pointer transition-all disabled:opacity-45 shadow-lg shadow-[#FF3D4F]/10 font-mono text-[10.5px] mt-1"
                    >
                      {softwareSubmitting ? "Transmitting Requirements..." : "📬 Send Specs to Admin"}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* VIEW 3: DEMO BOOKING FORM */}
            {activeView === 'demo_form' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 pb-1 border-b border-[#16166F]/40">
                  <button 
                    onClick={() => { setActiveView('hub'); setDemoSuccess(false); }}
                    className="p-1 px-2 rounded bg-[#11135E]/50 text-white border border-[#16166F] text-[10px] uppercase font-bold flex items-center gap-1 hover:bg-[#FF3D4F] transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <span className="text-[11px] font-bold text-white uppercase font-mono tracking-wider">Book GUIDED Demo / Tour</span>
                </div>

                {demoSuccess ? (
                  <div className="p-8 text-center bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-3">
                    <div className="h-10 w-10 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400 font-bold text-xl">✓</div>
                    <h5 className="font-bold text-white uppercase text-xs">Demo Scheduled Successfully</h5>
                    <p className="text-[10.5px] text-zinc-300 leading-relaxed max-w-xs mx-auto">
                      Fantastic! Your live software demo booking request is transmitted to key <span className="text-emerald-400 font-mono">"Demo Requests"</span> partition. Our executive engineer will call your coordinates to confirm exact Google Meet / Zoom invite links.
                    </p>
                    <button
                      onClick={() => { setDemoSuccess(false); setActiveView('hub'); }}
                      className="px-4 py-1.5 bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-widest font-black text-white hover:border-[#FF3D4F] rounded cursor-pointer mt-2"
                    >
                      Return to Hub
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleDemoSubmit} className="space-y-3 text-left text-xs">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-400 font-bold font-mono uppercase">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={demoForm.name}
                        onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                        placeholder="E.g. Shamsur Rahman"
                        className="w-full bg-[#11135E]/20 border border-[#16166F] focus:border-[#FF3D4F] text-white rounded-xl px-3 py-2 text-xs focus:outline-none placeholder-zinc-600 transition-all font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-400 font-bold font-mono uppercase">Organization / Company Name</label>
                      <input
                        type="text"
                        value={demoForm.company}
                        onChange={(e) => setDemoForm({ ...demoForm, company: e.target.value })}
                        placeholder="E.g. Shams Enterprise"
                        className="w-full bg-[#11135E]/20 border border-[#16166F] focus:border-[#FF3D4F] text-white rounded-xl px-3 py-2 text-xs focus:outline-none placeholder-zinc-600 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-bold font-mono uppercase">Callback Hotline *</label>
                        <input
                          type="text"
                          required
                          value={demoForm.phone}
                          onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                          placeholder="Contact Phone"
                          className="w-full bg-[#11135E]/20 border border-[#16166F] focus:border-[#FF3D4F] text-white rounded-xl px-3 py-2 text-xs focus:outline-none placeholder-zinc-600 transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-bold font-mono uppercase">Email coordinates *</label>
                        <input
                          type="email"
                          required
                          value={demoForm.email}
                          onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                          placeholder="name@corporate.com"
                          className="w-full bg-[#11135E]/20 border border-[#16166F] focus:border-[#FF3D4F] text-white rounded-xl px-3 py-2 text-xs focus:outline-none placeholder-zinc-600 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-bold font-mono uppercase">Preferred Demo Date *</label>
                        <input
                          type="date"
                          required
                          value={demoForm.preferredDate}
                          onChange={(e) => setDemoForm({ ...demoForm, preferredDate: e.target.value })}
                          className="w-full bg-zinc-950 border border-[#16166F] text-white rounded-xl px-3 py-2 text-xs focus:outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-bold font-mono uppercase">Preferred Time Slot</label>
                        <select
                          value={demoForm.preferredTime}
                          onChange={(e) => setDemoForm({ ...demoForm, preferredTime: e.target.value })}
                          className="w-full bg-zinc-950 border border-[#16166F] text-white rounded-xl px-3 py-2 text-xs transition-all"
                        >
                          <option value="10:00 AM">10:00 AM - Morning Slot</option>
                          <option value="12:00 PM">12:00 PM - Mid-Day Slot</option>
                          <option value="3:00 PM">03:00 PM - Afternoon Slot</option>
                          <option value="5:00 PM">05:00 PM - Late-Day Slot</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={demoSubmitting}
                      className="w-full py-3 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white font-extrabold uppercase tracking-wider rounded-xl cursor-pointer transition-all disabled:opacity-45 shadow-lg shadow-[#FF3D4F]/10 font-mono text-[10.5px] mt-2"
                    >
                      {demoSubmitting ? "Generating Demo Slot reservation..." : "🗓️ Confirm Live guided Demo Request"}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* VIEW 4: DYNAMIC AI DIAGNOSTIC CHATBOT */}
            {activeView === 'chat' && (
              <div className="space-y-3 h-[430px] flex flex-col justify-between">
                
                {/* Chat window suggestions header */}
                <div className="flex gap-1.5 p-1 border-b border-[#16166F]/30 overflow-x-auto shrink-0 scrollbar-none">
                  <button 
                    onClick={() => setMessage("I need medical software")}
                    className="px-2 py-0.5 rounded bg-[#16166F]/40 hover:bg-[#16166F]/70 border border-[#16166F]/65 text-[9px] text-white whitespace-nowrap cursor-pointer font-bold flex items-center gap-1"
                  >
                    🏥 Hospital Spec
                  </button>
                  <button 
                    onClick={() => setMessage("Explain database offline sync.")}
                    className="px-2 py-0.5 rounded bg-[#16166F]/40 hover:bg-[#16166F]/70 border border-[#16166F]/65 text-[9px] text-white whitespace-nowrap cursor-pointer font-bold"
                  >
                    🔄 Offline Sync
                  </button>
                  <button 
                    onClick={() => setMessage("What are standard license packages?")}
                    className="px-2 py-0.5 rounded bg-[#16166F]/40 hover:bg-[#16166F]/70 border border-[#16166F]/65 text-[9px] text-white whitespace-nowrap cursor-pointer font-bold"
                  >
                    💳 Licenses
                  </button>
                </div>

                {/* Messages scroll section */}
                <div className="flex-1 overflow-y-auto space-y-3 font-sans text-xs text-left">
                  {messages.map((m, index) => {
                    const isRequirementMatch = m.sender === 'assistant' && 
                      (m.text.toLowerCase().includes("branches") || 
                       m.text.toLowerCase().includes("budget") || 
                       m.text.toLowerCase().includes("hospital") || 
                       m.text.toLowerCase().includes("custom") || 
                       m.text.toLowerCase().includes("requirement"));
                    
                    return (
                      <div key={index} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl p-3 ${
                          m.sender === 'user' 
                            ? 'bg-[#FF3D4F] text-white rounded-tr-none' 
                            : 'bg-[#11135E]/40 border border-[#16166F]/55 rounded-tl-none text-gray-200'
                        }`}>
                          <p className="whitespace-pre-line leading-relaxed text-[11px]">{m.text}</p>
                          
                          {isRequirementMatch && (
                            <div className="mt-2.5 pt-2 border-t border-[#16166F]/40 flex justify-end">
                              <a
                                href={`https://wa.me/8801711408725?text=${encodeURIComponent(
                                  `*EUROSIA CUSTOM BUILD REQUIREMENT SUMMARY*\n\n${m.text.replace(/\*(Simulated AI Assistant - Eurosia Node)\*\n\n/g, '')}`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#25D366] hover:bg-emerald-600 text-white rounded text-[8.5px] font-bold uppercase transition-all tracking-wider cursor-pointer"
                              >
                                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.1 1.451 4.7 1.451 5.4 0 9.8-4.4 9.8-9.8s-4.4-9.8-9.8-9.8-9.8 4.4-9.8 9.8c0 1.8.5 3.5 1.4 5l-.9 3.5 3.6-.9z"/>
                                </svg>
                                Send Requirement to WhatsApp
                              </a>
                            </div>
                          )}
                          
                          <span className="text-[8px] text-gray-400 block text-right mt-1 font-mono">{m.timestamp}</span>
                        </div>
                      </div>
                    );
                  })}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-[#11135E]/40 border border-[#16166F]/55 rounded-2xl rounded-tl-none p-2.5 max-w-[85%] flex items-center gap-1.5">
                        <RefreshCw className="w-3 h-3 text-[#FF3D4F] animate-spin" />
                        <span className="text-[10px] text-gray-450 font-mono">Querying central AI module...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input action footer */}
                <form onSubmit={handleSendMessage} className="pt-2 border-t border-[#16166F] bg-[#02020A]/20 flex gap-1.5 shrink-0">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask regarding Eurosia core systems..."
                    className="flex-1 bg-[#11135E]/20 border border-[#16166F] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF3D4F]/70"
                  />
                  <button
                    type="submit"
                    disabled={loading || !message.trim()}
                    className="p-2.5 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white rounded-xl cursor-pointer disabled:opacity-40 select-none transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Core Footer Brand line */}
          <div className="bg-[#02020A]/75 border-t border-[#16166F]/30 p-2 text-center text-[9px] uppercase tracking-wider font-mono text-zinc-500 shrink-0">
            Eurosia Technical Communication Node Secure Loop
          </div>

        </div>
      )}
    </div>
  );
}

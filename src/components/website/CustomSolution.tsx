import React, { useState } from 'react';
import { 
  Building, Zap, Send, CheckCircle, Sparkles, HelpCircle, Phone, 
  Mail, Globe, Briefcase, DollarSign, Text, ArrowRight, ShieldCheck 
} from 'lucide-react';

interface CustomSolutionProps {
  onLoginClick: () => void;
  onStartTrialClick: () => void;
}

export default function CustomSolution({
  onLoginClick,
  onStartTrialClick
}: CustomSolutionProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    country: '',
    industry: '',
    service_type: 'ERP System',
    budget: '$5,000 - $10,005',
    description: '',
    attachment_url: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedRequest, setSubmittedRequest] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const serviceTypes = [
    'ERP System',
    'CRM Platform',
    'Custom Website',
    'Mobile Application (iOS/Android)',
    'Enterprise SaaS Platform',
    'AI & Machine Learning Solution',
    'Procurement & Inventory Management',
    'Payroll & HRM Platform',
    'Cybersecurity & Defender Guard',
    'Cloud Migration & Solution',
    'Other Custom Request'
  ];

  const budgetRanges = [
    '৳50,000 - ৳150,000 (Local Starter)',
    '৳150,000 - ৳500,000 (Business Core)',
    '৳500,000 - ৳1,500,000 (Enterprise Standard)',
    '৳1,500,000+ (High Performance custom build)',
    '$3,000 - $10,000 (International Basic)',
    '$10,000 - $35,000 (International Enterprise)',
    '$35,000+ (Custom Scaled SaaS / Architecture)'
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name || !formData.phone || !formData.email || !formData.description) {
      setErrorMessage("Please fill all required variables (Name, Phone, Email, project details).");
      return;
    }

    setFormStatus('submitting');

    try {
      const response = await fetch('/api/custom-solution-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit request.");
      }

      setSubmittedRequest(data);
      setFormStatus('success');

      // WhatsApp redirection logic
      triggerWhatsAppRedirect(data);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      setFormStatus('error');
    }
  };

  const triggerWhatsAppRedirect = (req: any) => {
    // Elegant WhatsApp message string format
    const whatsappMsg = `*EUROSIA CUSTOM BUILD REQUIREMENT COLLECTION*
--------------------------------------------------
*Request ID:* ${req.id}
*Client Name:* ${req.name}
*Company Name:* ${req.company || 'Not Specified'}
*Phone Hotline:* ${req.phone}
*Email Coordinates:* ${req.email}
*Country:* ${req.country || 'Not Specified'}
*Industry:* ${req.industry || 'Not Specified'}
*Service Requested:* ${req.service_type}
*Target Budget:* ${req.budget}
--------------------------------------------------
*Project Description:*
${req.description}
--------------------------------------------------
_Submitted via EUROSIA Custom Project Capture Terminal_`;

    const encodedMsg = encodeURIComponent(whatsappMsg);
    // WhatsApp Primary support: +8801711408725
    const waUrl = `https://wa.me/8801711408725?text=${encodedMsg}`;

    // Auto-redirect instantly
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 1500);
  };

  const handleManualWhatsAppRedirect = () => {
    if (!submittedRequest) return;
    triggerWhatsAppRedirect(submittedRequest);
  };

  return (
    <div className="animate-fadeIn min-h-screen text-zinc-300 text-left bg-black">
      {/* ━━━━━━━━━━━━━━━━ CUSTOM SOLUTIONS PANEL HERO ━━━━━━━━━━━━━━━━ */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1033_1px,transparent_1px),linear-gradient(to_bottom,#0c1033_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-red-600/10 rounded-full filter blur-[100px] animate-pulse"></div>

        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-[#FF3D4F] rounded-full text-[10px] font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>CUSTOM SERVICES & WHITELABEL BUILDS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase">
            Request Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3D4F] via-white to-red-400">Custom Solution</span>
          </h1>

          <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed max-w-2xl">
            Acme processes require unique mechanics. Submit your specific service parameters, custom modules, cloud structures or whitelabel requirements, and our solution architects will draft your blueprint.
          </p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ SERVICE FORM INTEGRATION ━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
        
        {/* Core Request Form */}
        <div className="lg:col-span-7 bg-[#05051B] border border-zinc-900 p-8 rounded-2xl relative text-left" id="custom-solution-form-terminal">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF3D4F]/5 rounded-full filter blur-xl pointer-events-none"></div>

          <h3 className="font-bold text-sm text-white uppercase tracking-wider pb-3 border-b border-zinc-900 flex items-center gap-1.5 mb-6">
            <Zap className="w-4 h-4 text-[#FF3D4F]" /> Custom Build Configurator
          </h3>

          {formStatus === 'success' ? (
            <div className="p-8 text-center space-y-5 border border-red-500/25 rounded-2xl bg-red-950/20 my-8">
              <CheckCircle className="w-16 h-16 text-[#FF3D4F] mx-auto animate-bounce" />
              <h4 className="text-2xl font-black tracking-tight text-white uppercase">Requirements Encoded</h4>
              <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                Your custom request parameter payload has been successfully validated and logged to our CRM system! We are automatically establishing a WhatsApp connection bypass to finalize.
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleManualWhatsAppRedirect}
                  className="px-6 py-3 bg-[#FF3D4F] hover:bg-red-600 text-xs font-bold text-white rounded-xl transition-all shadow-lg shadow-red-500/20 flex items-center gap-2 cursor-pointer"
                >
                  Confirm & Send to WhatsApp <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setFormStatus('idle');
                    setFormData({
                      name: '',
                      company: '',
                      phone: '',
                      email: '',
                      country: '',
                      industry: '',
                      service_type: 'ERP System',
                      budget: '$5,000 - $10,005',
                      description: '',
                      attachment_url: ''
                    });
                  }}
                  className="px-6 py-3 bg-zinc-900 border border-zinc-800 text-xs font-bold text-gray-400 rounded-xl hover:text-white transition-all cursor-pointer"
                >
                  Create New Request
                </button>
              </div>

              <p className="text-[10px] text-zinc-500 mt-2 font-mono">
                Redirecting... If nothing happens, click the Send button to launch WhatsApp manually.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              {errorMessage && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-[11px] font-semibold">
                  {errorMessage}
                </div>
              )}

              {/* Identity parameters */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-500 font-mono font-bold uppercase block">Contact Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="E.g. Shamsur Rahman"
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#FF3D4F] text-white rounded-xl px-4 py-3 text-xs focus:outline-none transition-all placeholder-zinc-700 font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-500 font-mono font-bold uppercase block">Enterprise / Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="E.g. Eurosia Bangladesh Corp"
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#FF3D4F] text-white rounded-xl px-4 py-3 text-xs focus:outline-none transition-all placeholder-zinc-700 font-semibold"
                  />
                </div>
              </div>

              {/* Coordinates Parameters */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-500 font-mono font-bold uppercase block">Phone Hotline / WhatsApp *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="E.g. +880 1711-408725"
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#FF3D4F] text-white rounded-xl px-4 py-3 text-xs focus:outline-none transition-all placeholder-zinc-700 font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-500 font-mono font-bold uppercase block">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="E.g. client@eurosia.io"
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#FF3D4F] text-white rounded-xl px-4 py-3 text-xs focus:outline-none transition-all placeholder-zinc-700 font-semibold"
                  />
                </div>
              </div>

              {/* Demographics parameters */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-500 font-mono font-bold uppercase block">Base Country Location</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="E.g. Bangladesh"
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#FF3D4F] text-white rounded-xl px-4 py-3 text-xs focus:outline-none transition-all placeholder-zinc-700 font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-500 font-mono font-bold uppercase block">Core Industry</label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    placeholder="E.g. Healthcare, Fintech, Logistics"
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#FF3D4F] text-white rounded-xl px-4 py-3 text-xs focus:outline-none transition-all placeholder-zinc-700 font-semibold"
                  />
                </div>
              </div>

              {/* Service & Budget selectors */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 bg-black p-1 rounded-xl">
                  <label className="text-zinc-500 font-mono font-bold uppercase px-3 block">Requested Service Type *</label>
                  <select
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#FF3D4F] text-white rounded-xl px-4 py-3 text-xs focus:outline-none appearance-none font-semibold"
                  >
                    {serviceTypes.map(st => (
                      <option key={st} value={st} className="bg-zinc-950 text-white font-semibold">{st}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 bg-black p-1 rounded-xl">
                  <label className="text-zinc-500 font-mono font-bold uppercase px-3 block">Expected Project Budget *</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#FF3D4F] text-white rounded-xl px-4 py-3 text-xs focus:outline-none appearance-none font-semibold"
                  >
                    {budgetRanges.map(br => (
                      <option key={br} value={br} className="bg-zinc-950 text-white font-semibold">{br}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Requirements text input parameters */}
              <div className="space-y-1.5">
                <label className="text-zinc-500 font-mono font-bold uppercase block">Describe Your Specific Requirements *</label>
                <textarea
                  name="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Explain what customized software, app, database fields, layouts, integration plugins, or user access controls you need..."
                  className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#FF3D4F] text-white rounded-xl px-4 py-3 text-xs focus:outline-none transition-all placeholder-zinc-700 font-semibold resize-none leading-relaxed"
                />
              </div>

              {/* Documentation link */}
              <div className="space-y-1.5">
                <label className="text-zinc-500 font-mono font-bold uppercase block">Reference File / Flowchart URL (Drive link, dropbox etc - Optional)</label>
                <input
                  type="url"
                  name="attachment_url"
                  value={formData.attachment_url}
                  onChange={handleInputChange}
                  placeholder="E.g. https://drive.google.com/your-spec-flowchart"
                  className="w-full bg-zinc-950 border border-zinc-900 focus:border-[#FF3D4F] text-white rounded-xl px-4 py-3 text-xs focus:outline-none transition-all placeholder-zinc-700 font-semibold"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="w-full mt-4 bg-[#FF3D4F] hover:bg-red-650 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-red-500/10 cursor-pointer disabled:opacity-55"
              >
                <span>{formStatus === 'submitting' ? "Validating Custom Project Payload..." : "Encode Request & Launch WhatsApp"}</span>
                <Send className="w-4 h-4 ml-1" />
              </button>
            </form>
          )}
        </div>

        {/* Corporate Trust Sidebar */}
        <div className="lg:col-span-5 space-y-8 text-left">
          
          <div className="bg-[#11135E]/10 border border-zinc-900 p-6 rounded-xl space-y-4">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF3D4F]" /> EUROSIA CUSTOM SERVICE AGREEMENT
            </h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Every system built by Eurosia Tech includes native scaling integrations:
            </p>
            <ul className="text-xs space-y-2.5 font-semibold text-zinc-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3D4F]" />
                Dual-Database local offline sync
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3D4F]" />
                Dynamic Role Based User Controls
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3D4F]" />
                Direct technical standby on slack/whatsapp
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3D4F]" />
                GDPR compliant tenant sandboxing
              </li>
            </ul>
          </div>

          <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-900/60 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider pb-2 border-b border-zinc-900 mb-3 block">Corporate Channels</h4>
            <div className="space-y-3.5 leading-relaxed text-zinc-400 font-light">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF3D4F]/10 flex items-center justify-center text-[#FF3D4F] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-mono text-zinc-500 font-bold uppercase text-[9px] tracking-widest">Engineering Hotlines</p>
                  <p className="font-semibold text-zinc-200">+8801711408725 / +8801709371514</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF3D4F]/10 flex items-center justify-center text-[#FF3D4F] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-mono text-zinc-500 font-bold uppercase text-[9px] tracking-widest">Enterprise Emails</p>
                  <p className="font-semibold text-zinc-200">support@eurosia.com.bd / dhaka.hq@eurosia.io</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF3D4F]/10 flex items-center justify-center text-[#FF3D4F] shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-mono text-zinc-500 font-bold uppercase text-[9px] tracking-widest">Global HQ coordinate</p>
                  <p className="font-semibold text-zinc-200">House 144, Block C, Matikata, Dhaka 1206</p>
                </div>
              </div>
            </div>
          </div>

          {/* Prompt/FAQ block */}
          <div className="p-1 border border-zinc-900/50 rounded-xl bg-[#030311] text-[11px] text-zinc-500 font-normal leading-normal">
            <div className="p-4 flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-[#FF3D4F] shrink-0" />
              <div>
                <p className="font-bold text-zinc-400 uppercase text-[10px] tracking-wider mb-1">What happens after I submit?</p>
                As soon as you finalize this configuration, Eurosia tech engines route your requirement summary directly to our WhatsApp service center. A lead engineer will initiate call-back with a preliminary schedule layout package.
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

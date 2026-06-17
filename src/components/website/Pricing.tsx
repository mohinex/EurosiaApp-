import React, { useState } from 'react';
import { 
  Check, HelpCircle, Star, Sparkles, Sliders, Play, 
  ArrowRight, ShieldCheck, Cpu, Landmark, ShieldAlert,
  Users, HelpCircle as Ask
} from 'lucide-react';

interface PricingProps {
  onLoginClick: () => void;
  onStartTrialClick: () => void;
  pricingList: any[];
}

export default function Pricing({
  onLoginClick,
  onStartTrialClick,
  pricingList
}: PricingProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [usersCount, setUsersCount] = useState(10);

  // Calculate dynamic custom enterprise estimation
  const estimateEnterprisePrice = () => {
    const basePrice = billingPeriod === 'monthly' ? 250 : 2200;
    return basePrice * usersCount;
  };

  const featureComparison = [
    { name: "SSO Single-Sign-On Authentication", starter: true, business: true, enterprise: true },
    { name: "Offline Sales Registries Buffer", starter: true, business: true, enterprise: true },
    { name: "Continuous Cloud Merges Engine", starter: false, business: true, enterprise: true },
    { name: "Biometric Hardware Token Keys", starter: false, business: false, enterprise: true },
    { name: "Isolated Multi-Tenant Databases", starter: false, business: false, enterprise: true },
    { name: "On-Premises Whitelabel Binary Build", starter: false, business: false, enterprise: "CUSTOM ONLY" }
  ];

  return (
    <div className="animate-fadeIn min-h-screen text-zinc-300 text-left">
      {/* ━━━━━━━━━━━━━━━━ PRICING HERO HERO ━━━━━━━━━━━━━━━━ */}
      <section className="relative pt-24 pb-20 px-6 bg-black text-white overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1033_1px,transparent_1px),linear-gradient(to_bottom,#0c1033_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25"></div>
        <div className="absolute bottom-0 right-[20%] w-96 h-96 bg-red-600/10 rounded-full filter blur-[100px] animate-pulse"></div>

        <div className="max-w-7xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-[#FF3D4F] rounded-full text-[10px] font-bold tracking-widest uppercase">
            <Landmark className="w-3.5 h-3.5" />
            <span>TRANSPARENT SYSTEM LICENSE SCHEMES</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase">
            Enterprise SaaS Pricing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-[#FF3D4F]">Designed for Scale</span>
          </h1>

          <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Choose a plan that fits your corporate scale. Shift from simple single-store registers up to full-scale multi-branch isolation nodes.
          </p>

          {/* Toggle Button */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-xs uppercase font-bold tracking-wider ${billingPeriod === 'monthly' ? 'text-white' : 'text-zinc-500'}`}>Monthly Billing</span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-12 h-6 bg-zinc-900 rounded-full border border-zinc-800 focus:outline-none cursor-pointer"
            >
              <div className={`absolute top-0.5 w-4.5 h-4.5 bg-[#FF3D4F] rounded-full transition-all ${billingPeriod === 'yearly' ? 'right-0.5' : 'left-0.5'}`} />
            </button>
            <span className={`text-xs uppercase font-bold tracking-wider ${billingPeriod === 'yearly' ? 'text-white' : 'text-zinc-500'}`}>
              Yearly Save <span className="text-red-500 font-black">20%</span>
            </span>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ SYSTEM LICENSE CARDS ━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingList.map((plan, index) => {
            const price = billingPeriod === 'monthly' ? plan.priceMonthly : plan.priceYearly;
            
            return (
              <div 
                key={plan.id || index}
                className="bg-zinc-950 border border-zinc-900 hover:border-[#FF3D4F]/50 hover:shadow-2xl hover:shadow-red-500/5 p-8 rounded-2xl flex flex-col justify-between h-[520px] transition-all group relative overflow-hidden"
              >
                {/* Visual badge top */}
                {plan.badge && (
                  <span className="absolute top-4 right-4 text-[8.5px] font-mono font-black text-white bg-[#FF3D4F] border border-red-500 px-2 py-0.5 rounded uppercase">
                    {plan.badge}
                  </span>
                )}

                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-white uppercase tracking-wider">{plan.name}</h3>
                    <p className="text-[11px] text-zinc-500 italic">{plan.description}</p>
                  </div>

                  <div className="border-t border-b border-zinc-900 py-4">
                    {plan.priceMonthly === 0 ? (
                      <h4 className="text-3xl font-black text-white font-mono">Custom Est</h4>
                    ) : (
                      <h4 className="text-3xl font-black text-white font-mono">
                        ৳ {price.toLocaleString()}<br />
                        <span className="text-xs font-light text-zinc-500 uppercase tracking-widest tracking-normal font-sans">
                          per {billingPeriod === 'monthly' ? 'month' : 'year'}
                        </span>
                      </h4>
                    )}
                  </div>

                  <ul className="space-y-2.5">
                    {plan.features?.map((feat: string, i: number) => (
                      <li key={i} className="text-xs text-zinc-400 font-light flex items-start gap-2 leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-[#FF3D4F] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onStartTrialClick}
                  className="w-full py-3 bg-zinc-900 group-hover:bg-[#FF3D4F] border border-zinc-800 group-hover:border-red-500 text-white rounded-xl text-xs font-bold font-sans uppercase tracking-wider transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
                >
                  <span>Select Plan Suite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ INTERACTIVE SLIDER CALCULATOR ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 bg-black border-y border-zinc-900 px-6">
        <div className="max-w-4xl mx-auto bg-zinc-950 p-8 rounded-2xl border border-zinc-900 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF3D4F]/5 rounded-full filter blur-xl pointer-events-none"></div>
          
          <div className="text-left space-y-6">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#FF3D4F]" />
              <h3 className="font-bold text-base text-white uppercase tracking-wider">Dynamic Multi-License Estimator</h3>
            </div>
            
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Are you planning to deploy active server instances across dozens of retail warehouses, medical branches, or support agency offices? Use our dynamic slider to compute localized scaling matrices estimations instantly.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex justify-between text-xs font-mono font-bold text-zinc-400">
                <span>ACTIVE OPERATOR NODES</span>
                <span className="text-[#FF3D4F]">{usersCount} LICENSES</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="250" 
                step="5"
                value={usersCount} 
                onChange={(e) => setUsersCount(Number(e.target.value))}
                className="w-full accent-[#FF3D4F] bg-zinc-900 h-2 rounded-lg cursor-ew-resize appearance-none"
              />
              <div className="flex justify-between text-[11px] text-zinc-600 font-mono">
                <span>5 NODES</span>
                <span>250 NODES</span>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Estimated Licensing Cost</span>
                <p className="text-3xl font-black text-white font-mono">
                  ৳ {estimateEnterprisePrice().toLocaleString()}
                  <span className="text-xs text-zinc-500 uppercase font-sans font-normal"> / {billingPeriod}</span>
                </p>
              </div>

              <button
                onClick={onStartTrialClick}
                className="px-6 py-3.5 bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white font-bold text-xs tracking-wider rounded-xl transition-all cursor-pointer uppercase inline-flex items-center justify-center gap-2 font-sans"
              >
                <span>Initiate Custom Setup</span>
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ DETAILED COMPARATOR MATRIX ━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-6 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <HelpCircle className="w-8 h-8 text-[#FF3D4F] mx-auto animate-pulse" />
          <h2 className="text-2xl font-light text-white uppercase tracking-tight">Ecosystem Compatibility</h2>
          <p className="text-zinc-500 font-mono text-[10px] uppercase font-bold tracking-widest">Detailed Feature Matrix</p>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 gap-2 p-4 bg-zinc-900/60 font-mono text-[10px] text-zinc-500 uppercase font-bold tracking-wider text-left border-b border-zinc-950">
            <span className="col-span-6">System Feature Parameter</span>
            <span className="col-span-2 text-center">Starter</span>
            <span className="col-span-2 text-center">Business</span>
            <span className="col-span-2 text-center">Enterprise</span>
          </div>

          <div className="divide-y divide-zinc-900/80 text-left">
            {featureComparison.map((row, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 p-4 text-xs font-light text-zinc-300">
                <span className="col-span-6 font-medium text-white">{row.name}</span>
                <span className="col-span-2 text-center">
                  {row.starter === true ? <span className="text-red-500 font-bold font-mono">✔</span> : <span className="text-zinc-700 font-mono">-</span>}
                </span>
                <span className="col-span-2 text-center">
                  {row.business === true ? <span className="text-red-500 font-bold font-mono">✔</span> : <span className="text-zinc-700 font-mono">-</span>}
                </span>
                <span className="col-span-2 text-center">
                  {typeof row.enterprise === 'string' ? (
                    <span className="text-zinc-500 font-bold font-mono text-[9px]">{row.enterprise}</span>
                  ) : row.enterprise ? (
                    <span className="text-red-500 font-bold font-mono">✔</span>
                  ) : (
                    <span className="text-zinc-700 font-mono">-</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━ TRUST COMPLIANCE INDICATORS ━━━━━━━━━━━━━━━━ */}
      <section className="py-16 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-t border-zinc-900 text-center space-y-4">
        <p className="text-[10px] font-mono text-[#FF3D4F] uppercase tracking-widest font-black">✔ ISO-27001 & COMPLIANT RESILIENCE NODES</p>
        <p className="text-zinc-400 font-light text-xs max-w-xl mx-auto leading-relaxed">
          Eurosia maintains automatic geographic disaster redundancy paths. All subscription fees automatically process with zero-hidden processing costs, governed by active Service Level Agreement guidelines.
        </p>
      </section>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Globe, ShieldCheck, Monitor, Facebook, Linkedin, Twitter, Mail } from 'lucide-react';
import Logo from '../Logo.tsx';
import { getSocialIconComponent } from '../website/FloatingSocialBar.tsx';
import { SocialPlatform } from '../../types/app';

const DEFAULT_PLATFORMS: SocialPlatform[] = [
  { id: 'soc-facebook', name: 'Facebook', url: 'https://www.facebook.com/EurosiaOfficial', icon: 'Facebook', status: 'active', sortOrder: 1 },
  { id: 'soc-x', name: 'X (Twitter)', url: 'https://x.com/EurosiaOfficial', icon: 'Twitter', status: 'active', sortOrder: 2 },
  { id: 'soc-linkedin', name: 'LinkedIn', url: 'https://linkedin.com/in/EurosiaOfficial', icon: 'Linkedin', status: 'active', sortOrder: 3 },
  { id: 'soc-instagram', name: 'Instagram', url: 'https://www.instagram.com/EurosiaOfficial', icon: 'Instagram', status: 'active', sortOrder: 4 }
];

interface FooterProps {
  onNavigate: (path: string) => void;
  onOwnerUnlock: () => void;
  currentUser?: any;
}

export default function Footer({ onNavigate, onOwnerUnlock, currentUser }: FooterProps) {
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

  return (
    <footer className="bg-[#020205] border-t border-zinc-900/60 pt-20 pb-10 px-6 font-sans relative z-10" id="website-global-footer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 text-left">
        
        {/* Branding column */}
        <div className="col-span-1 md:col-span-12 lg:col-span-3 space-y-5" id="footer-branding">
          <div className="flex items-center">
            <Logo variant="full" size="sm" isLight={false} />
          </div>
          <p className="text-zinc-400 text-xs font-light leading-relaxed max-w-xs">
            Powered by <a href="https://www.eurosia.app" target="_blank" rel="noopener noreferrer" className="hover:text-white underline decoration-[#FF3D4F] underline-offset-4 transition-colors font-semibold">https://www.eurosia.app</a>
            <br />
            <span className="block mt-2 font-semibold text-white/95 uppercase tracking-wider text-[10px]">Built for the Future. Scaled for the World.</span>
          </p>
          <div className="flex items-center gap-4 text-zinc-500">
            <Globe className="w-4 h-4 hover:text-[#FF3D4F] transition-colors cursor-pointer" />
            <ShieldCheck className="w-4 h-4 hover:text-[#FF3D4F] transition-colors cursor-pointer" />
            <Monitor className="w-4 h-4 hover:text-[#FF3D4F] transition-colors cursor-pointer" />
          </div>
        </div>

        {/* Product links */}
        <div className="col-span-1 md:col-span-3 lg:col-span-2 space-y-4" id="footer-col-products">
          <h5 className="font-bold text-[#FF3D4F] uppercase tracking-wider text-[10px] font-mono">Products Catalogue</h5>
          <ul className="space-y-2 text-zinc-400 text-xs font-medium">
            <li><button onClick={() => onNavigate('/apps')} className="hover:text-white transition-colors text-left cursor-pointer uppercase">All Apps</button></li>
            <li><button onClick={() => onNavigate('/apps')} className="hover:text-white transition-colors text-left cursor-pointer uppercase">POS System</button></li>
            <li><button onClick={() => onNavigate('/apps')} className="hover:text-white transition-colors text-left cursor-pointer uppercase">Cloud PBX</button></li>
            <li><button onClick={() => onNavigate('/apps')} className="hover:text-white transition-colors text-left cursor-pointer uppercase">AI Solutions</button></li>
          </ul>
        </div>

        {/* Solutions links */}
        <div className="col-span-1 md:col-span-3 lg:col-span-2 space-y-4" id="footer-col-solutions">
          <h5 className="font-bold text-[#FF3D4F] uppercase tracking-wider text-[10px] font-mono">Solutions Matrix</h5>
          <ul className="space-y-2 text-zinc-400 text-xs font-medium">
            <li><button onClick={() => onNavigate('/solutions/erp')} className="hover:text-white transition-colors text-left cursor-pointer uppercase">ERP Core Suite</button></li>
            <li><button onClick={() => onNavigate('/solutions/crm')} className="hover:text-white transition-colors text-left cursor-pointer uppercase">CRM Lead Flows</button></li>
            <li><button onClick={() => onNavigate('/solutions/hospital-management')} className="hover:text-white transition-colors text-left cursor-pointer uppercase">Hospital Units</button></li>
            <li><button onClick={() => onNavigate('/solutions/ecommerce-platform')} className="hover:text-white transition-colors text-left cursor-pointer uppercase">Omnichannel Store</button></li>
          </ul>
        </div>

        {/* Workspace dynamic subdomains links */}
        <div className="col-span-1 md:col-span-3 lg:col-span-2 space-y-4" id="footer-col-subdomains">
          <h5 className="font-bold text-[#FF3D4F] uppercase tracking-wider text-[10px] font-mono">Subdomains Index</h5>
          <ul className="space-y-2 text-[10.5px] text-zinc-500 font-mono">
            <li><a href="https://app.eurosia.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">app.eurosia.app</a></li>
            <li><a href="https://admin.eurosia.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">admin.eurosia.app</a></li>
            <li><a href="https://api.eurosia.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">api.eurosia.app</a></li>
            <li><a href="https://docs.eurosia.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">docs.eurosia.app</a></li>
          </ul>
        </div>

        {/* Company info links */}
        <div className="col-span-1 md:col-span-3 lg:col-span-1.5 space-y-4" id="footer-col-company">
          <h5 className="font-bold text-[#FF3D4F] uppercase tracking-wider text-[10px] font-mono">Ecosystem</h5>
          <ul className="space-y-2 text-zinc-400 text-xs font-medium">
            <li><button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors text-left cursor-pointer uppercase">About Us</button></li>
            <li><button onClick={() => onNavigate('/custom-solution')} className="hover:text-white font-bold text-[#FF3D4F] hover:underline transition-colors text-left cursor-pointer uppercase">Custom Spec ✦</button></li>
            <li><button onClick={() => onNavigate('/contact')} className="hover:text-white transition-colors text-left cursor-pointer uppercase">Contact Us</button></li>
          </ul>
        </div>

        {/* Dedicated "Follow Eurosia" section */}
        <div className="col-span-1 md:col-span-12 lg:col-span-1.5 space-y-4" id="footer-follow-eurosia">
          <h5 className="font-bold text-[#FF3D4F] uppercase tracking-wider text-[10px] font-mono">Follow Eurosia</h5>
          <p className="text-[10px] text-zinc-500 leading-normal">
            Follow Eurosia for product updates, technology insights, software releases and business innovations.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {socialPlatforms.map((platform) => {
              const IconComponent = getSocialIconComponent(platform.icon);
              return (
                <a
                  key={platform.id}
                  href={platform.url || '#'}
                  target={platform.url ? "_blank" : undefined}
                  rel={platform.url ? "noopener noreferrer" : undefined}
                  aria-label={`Follow Eurosia on ${platform.name}`}
                  className="w-7 h-7 bg-zinc-950 border border-zinc-900 hover:border-[#FF3D4F] text-zinc-400 hover:text-white rounded flex items-center justify-center transition-all duration-300 hover:scale-[1.08] focus:outline-none"
                >
                  <IconComponent className="w-3.5 h-3.5" />
                </a>
              );
            })}
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center text-zinc-600 text-[10px] font-mono">
        <p>© 2026 EUROSIA LTD. All rights reserved.</p>
        <div className="flex gap-4">
          <span className="hover:text-white transition-colors cursor-pointer uppercase">Privacy Policy</span>
          <span className="hover:text-white transition-colors cursor-pointer uppercase">Terms of Service</span>
          {currentUser && (
            currentUser.role?.toLowerCase() === 'super admin' || 
            currentUser.role?.toLowerCase() === 'owner' || 
            currentUser.role?.toLowerCase() === 'super_admin'
          ) && (
            <span className="text-[#FF3D4F]/80 font-bold cursor-pointer uppercase hover:underline" onDoubleClick={onOwnerUnlock}>Owner Handshake</span>
          )}
        </div>
      </div>
    </footer>
  );
}

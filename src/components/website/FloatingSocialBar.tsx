import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Plus, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SocialPlatform } from '../../types/app';

export function getSocialIconComponent(iconName: string) {
  const name = iconName.toLowerCase();
  if (name.includes('facebook')) return Facebook;
  if (name.includes('twitter') || name.includes('x')) return Twitter;
  if (name.includes('linkedin')) return Linkedin;
  if (name.includes('instagram')) return Instagram;
  return Globe;
}

const DEFAULT_PLATFORMS: SocialPlatform[] = [
  { id: 'soc-facebook', name: 'Facebook', url: 'https://www.facebook.com/EurosiaOfficial', icon: 'Facebook', status: 'active', sortOrder: 1 },
  { id: 'soc-x', name: 'X (Twitter)', url: 'https://x.com/EurosiaOfficial', icon: 'Twitter', status: 'active', sortOrder: 2 },
  { id: 'soc-linkedin', name: 'LinkedIn', url: 'https://linkedin.com/in/EurosiaOfficial', icon: 'Linkedin', status: 'active', sortOrder: 3 },
  { id: 'soc-instagram', name: 'Instagram', url: 'https://www.instagram.com/EurosiaOfficial', icon: 'Instagram', status: 'active', sortOrder: 4 }
];

// High fidelity UI configurations for official brand styling
interface BrandConfig {
  idleBg: string;
  idleBorder: string;
  idleText: string;
  hoverBg: string;
  hoverBorder: string;
  hoverText: string;
  glowColor: string;
  solidColor: string;
}

const BRAND_STYLES: Record<string, BrandConfig> = {
  Facebook: {
    idleBg: 'rgba(24, 119, 242, 0.08)',
    idleBorder: 'rgba(24, 119, 242, 0.25)',
    idleText: 'text-[#1877F2]',
    hoverBg: 'bg-[#1877F2]',
    hoverBorder: 'border-[#1877F2]',
    hoverText: 'text-white',
    glowColor: 'rgba(24, 119, 242, 0.65)',
    solidColor: '#1877F2',
  },
  Twitter: {
    idleBg: 'rgba(255, 255, 255, 0.04)',
    idleBorder: 'rgba(255, 255, 255, 0.15)',
    idleText: 'text-zinc-200',
    hoverBg: 'bg-black',
    hoverBorder: 'border-zinc-700',
    hoverText: 'text-white',
    glowColor: 'rgba(255, 255, 255, 0.35)',
    solidColor: '#000000',
  },
  Linkedin: {
    idleBg: 'rgba(10, 102, 194, 0.08)',
    idleBorder: 'rgba(10, 102, 194, 0.25)',
    idleText: 'text-[#0A66C2]',
    hoverBg: 'bg-[#0A66C2]',
    hoverBorder: 'border-[#0A66C2]',
    hoverText: 'text-white',
    glowColor: 'rgba(10, 102, 194, 0.65)',
    solidColor: '#0A66C2',
  },
  Instagram: {
    idleBg: 'rgba(221, 42, 123, 0.08)',
    idleBorder: 'rgba(221, 42, 123, 0.25)',
    idleText: 'text-[#DD2A7B]',
    hoverBg: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
    hoverBorder: 'border-transparent',
    hoverText: 'text-white',
    glowColor: 'rgba(221, 42, 123, 0.7)',
    solidColor: 'linear-gradient(45deg, #F58529 0%, #DD2A7B 33%, #8134AF 67%, #515BD4 100%)',
  },
};

export default function FloatingSocialBar() {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>(DEFAULT_PLATFORMS);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [comingSoonToast, setComingSoonToast] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Fetch active social channels from database
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
        setPlatforms(DEFAULT_PLATFORMS.filter(p => p.status === 'active'));
      });
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: SocialPlatform) => {
    if (!item.url || item.url === '#' || item.url.trim() === '') {
      e.preventDefault();
      setComingSoonToast(`${item.name} profile coming soon!`);
      setTimeout(() => setComingSoonToast(null), 3000);
    }
  };

  return (
    <>
      {/* Premium CSS Keyframes Injected Dynamically */}
      <style>{`
        @keyframes floatBarDesktop {
          0%, 100% { transform: translateY(-50%) translateY(0px); }
          50% { transform: translateY(-50%) translateY(-6px); }
        }
        @keyframes barPulseGlow {
          0%, 90%, 100% {
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
            border-color: rgba(255, 255, 255, 0.08);
          }
          95% {
            box-shadow: 0 20px 60px rgba(255, 61, 79, 0.15), 0 0 15px rgba(255, 61, 79, 0.1);
            border-color: rgba(255, 61, 79, 0.25);
          }
        }
        .premium-floating-bar-animation {
          animation: floatBarDesktop 6s ease-in-out infinite, barPulseGlow 6s ease-in-out infinite;
        }
      `}</style>

      {/* Dynamic Coming Soon Toast */}
      <AnimatePresence>
        {comingSoonToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[10001] bg-slate-950 border border-[#FF3D4F] text-white px-5 py-3 rounded-xl font-mono text-xs flex items-center gap-2.5 shadow-xl shadow-black/80"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3D4F] animate-ping" />
            <span>{comingSoonToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🖥️ TABLET & DESKTOP FLOATING SOCIAL SIDE BAR */}
      <div 
        id="desktop-floating-social-bar"
        className="hidden sm:flex fixed right-6 top-1/2 z-50 flex-col items-center gap-4 py-5 px-3 bg-[#0A0A0ACC]/75 backdrop-blur-[20px] border border-white/8 rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.45)] premium-floating-bar-animation group transition-all duration-300 w-14 md:w-[70px]"
      >
        {/* Subtle glowing anchor status dot */}
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF3D4F]/80 shadow-[0_0_8px_rgba(255,61,79,0.8)] animate-pulse mb-1 shrink-0" />

        {platforms.map((platform) => {
          const Icon = getSocialIconComponent(platform.icon);
          const brandConfig = BRAND_STYLES[platform.icon] || BRAND_STYLES['Twitter'];
          const isHovered = hoveredId === platform.id;

          // Compute individual dynamic standard & hover styles for maximum visual fidelity
          const customButtonStyle: React.CSSProperties = {
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isHovered ? 'translateX(-8px) scale(1.08) rotate(4deg)' : 'translateX(0px) scale(1) rotate(0deg)',
            background: isHovered 
              ? (platform.icon === 'Instagram' ? brandConfig.solidColor : brandConfig.solidColor)
              : brandConfig.idleBg,
            borderColor: isHovered 
              ? (platform.icon === 'Instagram' ? 'transparent' : brandConfig.solidColor)
              : brandConfig.idleBorder,
            boxShadow: isHovered 
              ? `0 0 20px ${brandConfig.glowColor}` 
              : 'none',
          };

          return (
            <div 
              key={platform.id} 
              className="relative"
              onMouseEnter={() => setHoveredId(platform.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <a
                href={platform.url || '#'}
                target={platform.url ? "_blank" : undefined}
                rel={platform.url ? "noopener noreferrer" : undefined}
                onClick={(e) => handleLinkClick(e, platform)}
                aria-label={`Visit Eurosia on ${platform.name}`}
                style={customButtonStyle}
                className={`w-9 h-9 md:w-11 md:h-11 rounded-2xl border flex items-center justify-center transition-all shadow-sm focus:outline-none ${
                  isHovered ? brandConfig.hoverText : brandConfig.idleText
                }`}
              >
                <Icon className="w-4 h-4 md:w-[18px] md:h-[18px]" />
              </a>

              {/* Sophisticated Glassmorphic Hover Tooltip */}
              <div 
                className={`absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap bg-zinc-950/90 border border-zinc-800 text-white text-[10px] font-bold font-mono py-1.5 px-3 rounded-lg uppercase tracking-wider shadow-xl transition-all duration-300 ${
                  isHovered ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-2 scale-90'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#FF3D4F]" />
                  <span>{platform.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 📱 MOBILE FLOATING EXPANDABLE DIAL MENU */}
      <div 
        id="mobile-floating-social-menu"
        className="sm:hidden fixed right-5 top-[40%] -translate-y-1/2 z-[9999] flex flex-col items-end gap-3"
      >
        <AnimatePresence>
          {mobileExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex flex-col items-center gap-3 bg-[#0A0A0ACC]/90 border border-white/8 backdrop-blur-md p-2 rounded-[20px] shadow-2xl"
            >
              {platforms.map((platform) => {
                const Icon = getSocialIconComponent(platform.icon);
                const brandConfig = BRAND_STYLES[platform.icon] || BRAND_STYLES['Twitter'];
                
                return (
                  <motion.a
                    key={platform.id}
                    href={platform.url || '#'}
                    target={platform.url ? "_blank" : undefined}
                    rel={platform.url ? "noopener noreferrer" : undefined}
                    onClick={(e) => {
                      handleLinkClick(e, platform);
                      setMobileExpanded(false);
                    }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: platform.icon === 'Instagram' ? brandConfig.solidColor : brandConfig.solidColor,
                    }}
                    aria-label={`Follow us on ${platform.name}`}
                    className="w-10 h-10 text-white rounded-xl flex items-center justify-center shadow-lg hover:brightness-110 active:brightness-95 transition-all"
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </motion.a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger Core Premium FAB Button */}
        <motion.button
          onClick={() => setMobileExpanded(!mobileExpanded)}
          whileTap={{ scale: 0.92 }}
          className="w-11 h-11 bg-gradient-to-tr from-[#FF3D4F] to-[#FF5E6D] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#FF3D4F]/30 select-none focus:outline-none cursor-pointer z-10"
          aria-label="Toggle Social Networks Dial"
        >
          <motion.div
            animate={{ rotate: mobileExpanded ? 135 : 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          >
            <Plus className="w-5.5 h-5.5 text-white" />
          </motion.div>
        </motion.button>
      </div>
    </>
  );
}

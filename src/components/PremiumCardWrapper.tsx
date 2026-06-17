import React from 'react';

interface PremiumCardWrapperProps {
  title: string;
  url?: string;
  ctaText?: 'Learn More' | 'View Details' | 'Book Demo' | 'Talk to Expert' | 'WhatsApp Consultation';
  whatsappMessage?: string;
  isClickable?: boolean;
  onNavigate?: (path: string) => void;
  className?: string;
  children: React.ReactNode;
}

export const PremiumCardWrapper: React.FC<PremiumCardWrapperProps> = ({
  title,
  url,
  ctaText = "View Details",
  whatsappMessage,
  isClickable = true,
  onNavigate,
  className = "",
  children
}) => {
  // Generate WhatsApp message automatically if not provided explicitly
  const defaultMsg = `Hello Eurosia Team,\n\nI am interested in ${title}.\n\nPlease provide details.\n\nThank you.`;
  const encodedMsg = encodeURIComponent(whatsappMessage || defaultMsg);
  const whatsappUrl = `https://wa.me/8801711408725?text=${encodedMsg}`;

  const handleCardClick = (e: React.MouseEvent) => {
    // If we click the WhatsApp button within the card, don't trigger navigate
    if ((e.target as HTMLElement).closest('.stop-propagation-click')) {
      return;
    }
    
    if (isClickable && url) {
      if (onNavigate) {
        onNavigate(url);
      } else {
        // Fallback standard redirection
        window.history.pushState(null, '', url);
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  };

  const interactiveClasses = isClickable ? "cursor-pointer" : "";

  return (
    <div
      onClick={handleCardClick}
      className={`premium-card-glow relative rounded-2xl p-6 flex flex-col justify-between h-full transition-all duration-300 border border-zinc-900 group select-none ${interactiveClasses} ${className}`}
      id={`premium-card-wrapper-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
    >
      {/* 1. Inside content slot - original design layout remains pristine */}
      <div className="w-full h-full relative z-10 flex flex-col justify-between">
        {children}
      </div>

      {/* 2. Slide-up Interactive CTA Panel Overlay (Linear & Stripe Inspired) */}
      <div className="premium-cta-overlay absolute bottom-0 left-0 right-0 rounded-b-2xl p-4 transform translate-y-full transition-transform duration-300 ease-out z-20 bg-black/95 border-t border-[#FF2D55]/20 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-mono tracking-widest text-[#FF2D55] font-black uppercase">
            SOCIALLY LINKED SYSTEM
          </span>
          <span className="w-2 h-2 rounded-full bg-[#FF2D55] animate-pulse" />
        </div>
        
        <h4 className="text-[11px] font-bold text-zinc-100 uppercase tracking-wide truncate">
          {title}
        </h4>

        <div className="grid grid-cols-2 gap-2 mt-1">
          {isClickable && url && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick(e);
              }}
              className="py-2 px-3 text-center text-[9px] tracking-wider font-mono font-bold uppercase rounded-lg border border-zinc-800 hover:border-[#FF2D55] bg-zinc-950 text-white transition-all hover:bg-[#FF2D55]/10 cursor-pointer"
            >
              {ctaText}
            </button>
          )}
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="stop-propagation-click py-2 px-3 text-center text-[9px] tracking-wider font-mono font-bold uppercase rounded-lg bg-[#25D366] text-white hover:bg-[#20ba56] transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <svg className="w-3 h-3 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.1 1.45 4.7 1.45 5.4 0 9.8-4.4 9.8-9.8s-4.4-9.8-9.8-9.8c-5.4 0-9.8 4.4-9.8 9.8 0 2.1.6 4.1 1.7 5.8l-.2.7-.9 3.4 3.5-.9.7-.4zm10.7-6.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.4-1.5-.9-.8-1.5-1.7-1.7-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.4-.3-.7-.6-.6-.8-.6h-.6c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.1 3.2v.1c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.1-1.3-.1-.3-.3-.4-.6-.5z" />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

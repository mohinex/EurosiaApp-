import React from 'react';

interface LogoProps {
  variant?: 'compact' | 'optimized' | 'full';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLight?: boolean;
  className?: string;
  onOwnerUnlock?: () => void;
}

export default function Logo({
  variant = 'full',
  size = 'md',
  isLight = false,
  className = '',
  onOwnerUnlock
}: LogoProps) {
  // Precise size declarations corresponding to design grid systems
  const iconSizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const textSizes = {
    xs: 'text-xs tracking-wider',
    sm: 'text-sm tracking-widest',
    md: 'text-base md:text-lg tracking-[0.2em] font-extrabold',
    lg: 'text-xl md:text-2xl tracking-[0.25em] font-extrabold',
    xl: 'text-3xl md:text-4xl tracking-[0.3em] font-black'
  };

  // Pure vector SVG mimicking the uploaded EUROSIA logo with absolute precision & transparency
  const renderIconOnly = (widthClass: string) => {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${widthClass} select-none transition-transform duration-300 group-hover:scale-105`}
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
    );
  };

  const renderIconWithBlackBg = (widthClass: string) => {
    return (
      <div className={`relative bg-black rounded-xl border border-zinc-800 shadow-md ${widthClass} flex items-center justify-center p-1.5 overflow-hidden transition-all duration-300 group-hover:border-[#FF3D4F]/30`}>
        {renderIconOnly('w-full h-full')}
      </div>
    );
  };

  return (
    <div
      onClick={onOwnerUnlock}
      onDoubleClick={onOwnerUnlock}
      className={`inline-flex items-center gap-3 cursor-pointer select-none group font-sans ${className}`}
      id="eurosia-logo-container"
    >
      {/* 1) Compact Variant (pure SVG vector icon, transparent) */}
      {variant === 'compact' && renderIconOnly(iconSizes[size])}

      {/* 2) Optimized Variant (icon enveloped in Black background container, exactly like uploaded asset) */}
      {variant === 'optimized' && renderIconWithBlackBg(iconSizes[size])}

      {/* 3) Full Variant (responsive logo with typography beside it) */}
      {variant === 'full' && (
        <>
          {/* Responsive Icons: Compact on mobile, Optimized with container on larger screens */}
          <div className="flex md:hidden">
            {renderIconOnly(iconSizes.sm)}
          </div>
          <div className="hidden md:flex lg:hidden">
            {renderIconWithBlackBg(iconSizes.sm)}
          </div>
          <div className="hidden lg:flex">
            {renderIconWithBlackBg(iconSizes[size])}
          </div>
          
          <div className="leading-tight flex flex-col justify-center">
            <h1 className={`font-bold uppercase ${textSizes[size]} transition-colors flex items-center gap-1.5 ${isLight ? 'text-zinc-950' : 'text-white'}`}>
              EUROSIA
              <span className="text-[8px] md:text-[9.5px] bg-[#FF3D4F]/15 text-[#FF3D4F] border border-[#FF3D4F]/30 px-1.5 py-0.5 rounded tracking-normal font-mono font-bold">
                ECOSYSTEM
              </span>
            </h1>
          </div>
        </>
      )}
    </div>
  );
}

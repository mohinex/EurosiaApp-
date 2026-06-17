import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, Sparkles, X, Smartphone, ArrowUpFromLine, 
  PlusSquare, Share, ShieldCheck, CheckCircle2, Laptop, Info 
} from 'lucide-react';
import Logo from './Logo.tsx';

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showiOSModal, setShowiOSModal] = useState(false);
  const [isiOS, setIsiOS] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // 1. Detect if already running in standalone app mode (already installed & launched)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         (window.navigator as any).standalone === true;
    
    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // 2. Platform/Browser Checks
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua);
    const isSafariBrowser = /safari/.test(ua) && !/chrome|crios|fxios|opera|edge|edg|brave/.test(ua);
    
    setIsiOS(isIOSDevice);
    setIsSafari(isSafariBrowser);

    // If iOS / Safari, they don't trigger "beforeinstallprompt" but are PWA installable manually
    if (isIOSDevice) {
      setIsInstallable(true);
      // Auto pulse PWA layout suggestion after 4 seconds to assist mobile operators
      const timer = setTimeout(() => {
        if (!dismissed) setShowNotification(true);
      }, 4000);
      return () => clearTimeout(timer);
    }

    // 3. Listen for browser modern Install prompts
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
      
      // Auto prompt after 4 seconds as a high-conversion helper
      const timer = setTimeout(() => {
        if (!dismissed) setShowNotification(true);
      }, 4000);
      return () => clearTimeout(timer);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 4. Capture successful installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      setShowNotification(false);
      
      // Create a persistent browser record
      localStorage.setItem('eurosia_pwa_installed', 'true');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // Initial check from storage helper
    if (localStorage.getItem('eurosia_pwa_installed') === 'true') {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [dismissed]);

  const handleInstallClick = async () => {
    if (isiOS) {
      // Trigger user help sheet explaining Safari manual workflow
      setShowiOSModal(true);
      return;
    }

    if (!deferredPrompt) {
      // No prompt but not iOS - provide standard guide or hint
      setShowiOSModal(true);
      return;
    }

    // Hide our custom notice temporary
    setShowNotification(false);

    // Trigger standard native wizard dialog
    deferredPrompt.prompt();

    // Evaluate response selections
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`[Eurosia PWA] Installation request user outcome: ${outcome}`);

    if (outcome === 'accepted') {
      setIsInstalled(true);
      setIsInstallable(false);
    }
    
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowNotification(false);
    setDismissed(true);
  };

  // Skip rendering if already installed from discrete standalone mode
  if (isInstalled) {
    return null;
  }

  return (
    <div className="pwa-launcher-root">
      {/* ━━━━━━━━━━━━━━━━ Floating Action Overlay Launcher ━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {isInstallable && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-[20px] bottom-[95px] md:bottom-[20px] z-[9999] flex flex-col items-end gap-3 pointer-events-none"
            id="eurosia-pwa-badge-parent"
          >
            {/* Expanded Dynamic Notification Banner */}
            {showNotification && (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="bg-zinc-950/95 border border-[#FF3D4F]/30 backdrop-blur-xl p-4.5 rounded-2xl shadow-[0_10px_35px_rgba(255,61,79,0.15)] flex flex-col gap-3 max-w-[340px] text-left pointer-events-auto"
                id="eurosia-pwa-popup-alert"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Logo variant="compact" size="xs" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF3D4F] font-bold">
                      Native App Launcher
                    </span>
                  </div>
                  <button 
                    onClick={handleDismiss}
                    className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                    aria-label="Dismiss app invitation"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-extrabold text-sm text-white tracking-wide">
                    Install Eurosia App
                  </h4>
                  <p className="text-zinc-400 text-[11px] leading-relaxed font-light">
                    Enjoy seamless, fast launch directly from your home screen with complete biometric support and real-time offline local caching.
                  </p>
                </div>

                <div className="flex gap-2 items-center mt-1">
                  <button
                    onClick={handleInstallClick}
                    className="flex-grow bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white font-extrabold text-xs px-3.5 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-lg hover:shadow-[#FF3D4F]/20 active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5 animate-bounce" />
                    Install Now
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs px-3 py-1.5 rounded-lg border border-zinc-800 transition-all cursor-pointer whitespace-nowrap"
                  >
                    Maybe Later
                  </button>
                </div>
              </motion.div>
            )}

            {/* Glowing Hover Trigger Button */}
            <motion.button
              onClick={() => {
                setShowNotification(!showNotification);
                // Also trigger actual wizard install sequence on click
                if (!showNotification) {
                  handleInstallClick();
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto bg-gradient-to-r from-zinc-950 via-black to-zinc-950 border border-[#FF3D4F]/40 hover:border-[#FF3D4F] text-white hover:text-white px-5 py-3 rounded-full flex items-center gap-2.5 shadow-[0_5px_20px_rgba(255,61,79,0.18)] hover:shadow-[0_8px_25px_rgba(255,61,79,0.25)] transition-all cursor-pointer group"
              id="eurosia-pwa-install-floating-trigger"
            >
              <div className="relative">
                <Logo variant="compact" size="xs" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FF3D4F] animate-ping" />
              </div>
              <span className="text-[11.5px] font-black uppercase tracking-[0.15em] text-white/95">
                Install App
              </span>
              <Download className="w-3.5 h-3.5 text-[#FF3D4F] group-hover:translate-y-0.5 transition-transform" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━ iOS Manual Installation Support Sheet ━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {showiOSModal && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4" id="ios-manual-sheet-backdrop">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowiOSModal(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Guide Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-[#05050C] border border-zinc-800 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden text-left"
              id="ios-manual-sheet-content"
            >
              {/* Futuristic Red Laser line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF3D4F] to-transparent" />

              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <Logo variant="optimized" size="sm" />
                  <div>
                    <h3 className="font-extrabold text-white text-base tracking-wide">
                      Eurosia Ecosystem
                    </h3>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block">
                      iOS / Apple Device Setup
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowiOSModal(false)}
                  className="bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white p-1.5 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-5">
                <p className="text-zinc-400 text-xs leading-relaxed font-light">
                  Web-App installation on iPhone/iPad devices is fully supported. Follow these simplified native prompt coordinates to pin EUROSIA onto your display grid:
                </p>

                {/* Vertical coordinates */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3.5 p-3.5 bg-zinc-950/80 border border-zinc-900 rounded-xl">
                    <div className="bg-[#FF3D4F]/10 p-2 rounded-lg text-[#FF3D4F]">
                      <ArrowUpFromLine className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white">1. Locate Share Protocol</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5">
                        Tap the native <span className="font-semibold text-white">Share</span> button at the browser control rail at the bottom.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 bg-zinc-950/80 border border-zinc-900 rounded-xl">
                    <div className="bg-[#FF3D4F]/10 p-2 rounded-lg text-[#FF3D4F]">
                      <PlusSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white">2. Append to Desktop Grid</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5">
                        Scroll down the sharing context and choose <span className="font-semibold text-white">"Add to Home Screen"</span>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 bg-zinc-950/80 border border-zinc-900 rounded-xl">
                    <div className="bg-[#FF3D4F]/10 p-2 rounded-lg text-[#FF3D4F]">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white">3. Initialize Standalone Mode</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5">
                        Tap <span className="font-semibold text-white">"Add"</span> on the top-right. Your device registers EUROSIA as a native platform app.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FF3D4F]" /> Secured Sandbox Ecosystem
                  </span>
                  <span>v1.2.0-Standalone</span>
                </div>

                <button
                  onClick={() => setShowiOSModal(false)}
                  className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold text-xs py-2.5 rounded-xl border border-zinc-805 transition-colors cursor-pointer text-center"
                >
                  I Understand
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

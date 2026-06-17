import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Laptop, Smartphone, HelpCircle } from 'lucide-react';
import { usePwaInstall } from '../../hooks/usePwaInstall.ts';
import IosInstallGuide from './IosInstallGuide.tsx';
import Logo from '../Logo.tsx';

export default function InstallAppButton() {
  const { 
    isInstallable, 
    isInstalled, 
    isiOS, 
    triggerInstall, 
    recordManualInstall 
  } = usePwaInstall();

  const [showNotification, setShowNotification] = useState(false);
  const [showiOSModal, setShowiOSModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show high-conversion floating prompt after 4.5 seconds
    if (isInstallable && !isInstalled && !dismissed) {
      const timer = setTimeout(() => {
        setShowNotification(true);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled, dismissed]);

  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isiOS) {
      setShowiOSModal(true);
      setShowNotification(false);
    } else {
      const succeeded = await triggerInstall();
      if (!succeeded) {
        // Fallback for browsers with no prompt: show iOS/alternative setup
        setShowiOSModal(true);
        setShowNotification(false);
      }
    }
  };

  const handleDismiss = () => {
    setShowNotification(false);
    setDismissed(true);
  };

  return (
    <>
      <AnimatePresence>
        {isInstallable && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="fixed right-5 bottom-6 md:bottom-5 z-[9999] flex flex-col items-end gap-3.5 pointer-events-none font-sans"
            id="pwa-install-overlay-root"
          >
            {/* Dynamic notice popup card */}
            {showNotification && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                className="bg-black/98 border border-[#FF3D4F]/30 backdrop-blur-xl p-4.5 rounded-2xl shadow-2xl flex flex-col gap-3 max-w-[320px] text-left pointer-events-auto"
                id="pwa-popup-badge-window"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Logo variant="compact" size="xs" />
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#FF3D4F] font-bold">
                      Native Web App
                    </span>
                  </div>
                  <button 
                    onClick={handleDismiss}
                    className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1">
                  <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">
                    Eurosia App Ecosystem
                  </h4>
                  <p className="text-zinc-400 text-[10px] leading-relaxed font-light">
                    Enjoy lightning-fast launching straight from your dashboard with clean layout persistent caching and instant offline standby mode.
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <button
                    onClick={handleInstallClick}
                    className="flex-grow bg-[#FF3D4F] hover:bg-[#CC1A2F] text-white font-extrabold text-[10.5px] px-3 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-lg active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5 animate-bounce" />
                    Install System
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-[10.5px] px-2.5 py-2 rounded-xl border border-zinc-800 transition-all cursor-pointer"
                  >
                    Not Now
                  </button>
                </div>
              </motion.div>
            )}

            {/* Float app icon trigger button */}
            <motion.button
              onClick={() => {
                setShowNotification(!showNotification);
                if (!showNotification) {
                  handleInstallClick();
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto bg-black hover:bg-zinc-950 border border-[#FF3D4F]/30 hover:border-[#FF3D4F] text-white px-4 py-3 rounded-full flex items-center gap-2 shadow-[0_10px_30px_rgba(255,61,79,0.15)] transition-all cursor-pointer group"
              id="pwa-install-floater-button"
            >
              <div className="relative">
                <Logo variant="compact" size="xs" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#FF3D4F] animate-ping" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-white">
                INSTALL APP
              </span>
              <Download className="w-3 h-3 text-[#FF3D4F] group-hover:translate-y-0.5 transition-transform" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* iOS Safari Setup Steps Walkthrough */}
      <IosInstallGuide
        isOpen={showiOSModal}
        onClose={() => setShowiOSModal(false)}
        onConfirm={recordManualInstall}
      />
    </>
  );
}

import { useState, useEffect } from 'react';

export interface UsePwaInstallResult {
  isInstallable: boolean;
  isInstalled: boolean;
  isiOS: boolean;
  isSafari: boolean;
  triggerInstall: () => Promise<boolean>;
  recordManualInstall: () => void;
}

export function usePwaInstall(): UsePwaInstallResult {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isiOS, setIsiOS] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // 1. Detect matchMedia display standalone
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         (window.navigator as any).standalone === true;
    
    if (isStandalone || localStorage.getItem('eurosia_pwa_installed') === 'true') {
      setIsInstalled(true);
      return;
    }

    // 2. Resolve User Agent metrics
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua);
    const isSafariBrowser = /safari/.test(ua) && !/chrome|crios|fxios|opera|edge|edg|brave/.test(ua);

    setIsiOS(isIOSDevice);
    setIsSafari(isSafariBrowser);

    // On iOS, custom installation can be suggested manually at any point
    if (isIOSDevice) {
      setIsInstallable(true);
      return;
    }

    // 3. Hear standard Chrome / Edge install prompts
    const handleBeforePrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforePrompt);

    // 4. Trace installation callback completion
    const handleInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      localStorage.setItem('eurosia_pwa_installed', 'true');
    };

    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforePrompt);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const triggerInstall = async (): Promise<boolean> => {
    if (isiOS) return false; // iOS requires sharing menu action
    if (!deferredPrompt) return false;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);

    if (outcome === 'accepted') {
      setIsInstalled(true);
      setIsInstallable(false);
      localStorage.setItem('eurosia_pwa_installed', 'true');
      return true;
    }
    return false;
  };

  const recordManualInstall = () => {
    setIsInstalled(true);
    setIsInstallable(false);
    localStorage.setItem('eurosia_pwa_installed', 'true');
  };

  return {
    isInstallable,
    isInstalled,
    isiOS,
    isSafari,
    triggerInstall,
    recordManualInstall,
  };
}

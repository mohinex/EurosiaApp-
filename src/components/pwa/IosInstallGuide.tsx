import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpFromLine, PlusSquare, CheckCircle2, ShieldCheck } from 'lucide-react';
import Logo from '../Logo.tsx';

interface IosInstallGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function IosInstallGuide({ isOpen, onClose, onConfirm }: IosInstallGuideProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 font-sans" id="ios-walkthrough-backdrop">
          {/* Backdrop Blur Screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Guide Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-[#05050C] border border-zinc-800 rounded-3xl p-6 max-w-md w-full shadow-2xl overflow-hidden text-left"
            id="ios-walkthrough-pane"
          >
            {/* Top red laser highlighter */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF3D4F] to-transparent" />

            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-3">
                <Logo variant="optimized" size="sm" />
                <div>
                  <h3 className="font-extrabold text-white text-base tracking-wide uppercase">
                    Eurosia Setup
                  </h3>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block">
                    iOS / Apple Standalone Mode
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white p-1.5 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-zinc-300 text-xs">
              <p className="text-zinc-400 leading-relaxed font-light">
                Follow these native Safari sequences to pin the Eurosia App onto your mobile dashboard workspace with isolated memory caching:
              </p>

              {/* Steps */}
              <div className="space-y-3 font-medium">
                <div className="flex items-start gap-3 p-3 bg-zinc-950/80 border border-zinc-900 rounded-xl">
                  <div className="bg-[#FF3D4F]/10 p-2 rounded-lg text-[#FF3D4F] shrink-0">
                    <ArrowUpFromLine className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">1. Share Menu Selection</h4>
                    <p className="text-[10px] text-zinc-500 mt-0.5 leading-relaxed font-light">
                      Press the native <span className="text-white font-semibold">Share</span> button at the browser options pane.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-zinc-950/80 border border-zinc-900 rounded-xl">
                  <div className="bg-[#FF3D4F]/10 p-2 rounded-lg text-[#FF3D4F] shrink-0">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">2. Standard Append Action</h4>
                    <p className="text-[10px] text-zinc-500 mt-0.5 leading-relaxed font-light">
                      Scroll and choose <span className="text-white font-semibold">"Add to Home Screen"</span> from options details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-zinc-950/80 border border-zinc-900 rounded-xl">
                  <div className="bg-[#FF3D4F]/10 p-2 rounded-lg text-[#FF3D4F] shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">3. Initialize Standalone launch</h4>
                    <p className="text-[10px] text-zinc-500 mt-0.5 leading-relaxed font-light">
                      Confirm by tapping <span className="text-white font-semibold">"Add"</span>. Eurosia will register natively on your mobile desktop.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 border-t border-zinc-900 flex items-center justify-between text-[9.5px] text-zinc-500 font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF3D4F]" /> Encrypted Database Node
                </span>
                <span>v1.2.0-Production</span>
              </div>

              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-black text-xs py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer text-center uppercase tracking-wider"
              >
                Done, I have added it
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

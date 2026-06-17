import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Check, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../hooks/useLanguage.ts';

interface LanguageSwitcherProps {
  theme?: "dark" | "light";
}

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
  local: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', local: 'English' },
  { code: 'bn', name: 'Bengali', flag: '🇧🇩', local: 'বাংলা' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', local: 'العربية' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', local: 'हिन्दी' },
  { code: 'ur', name: 'Urdu', flag: '🇵🇰', local: 'اردو' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', local: 'Español' },
  { code: 'fr', name: 'French', flag: '🇫🇷', local: 'Français' },
  { code: 'zh-CN', name: 'Chinese', flag: '🇨🇳', local: '简体中文' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', local: '日本語' },
  { code: 'de', name: 'German', flag: '🇩🇪', local: 'Deutsch' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', local: 'Português' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', local: 'Русский' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷', local: 'Türkçe' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩', local: 'Bahasa Indonesia' },
  { code: 'ms', name: 'Malay', flag: '🇲🇾', local: 'Bahasa Melayu' }
];

export function LanguageSwitcher({ theme = "dark" }: LanguageSwitcherProps) {
  const isLight = theme === "light";
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isTranslating, setIsTranslating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = async (langCode: string) => {
    setIsTranslating(true);
    try {
      await changeLanguage(langCode);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setIsTranslating(false);
        setIsOpen(false);
      }, 500);
    }
  };

  const filteredLanguages = LANGUAGES.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.local.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeLang = LANGUAGES.find(l => l.code === currentLanguage) || LANGUAGES[0];

  const buttonBgClass = isLight 
    ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700" 
    : "bg-[#11135E]/30 border-[#16166F]/50 text-zinc-300 hover:border-[#FF3D4F]/50";

  return (
    <div className="relative inline-block" ref={dropdownRef} id="dynamic-language-switcher">

      {/* Primary Switcher Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 border rounded-full text-[11px] font-mono transition-all cursor-pointer ${buttonBgClass} select-none focus:outline-none`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Change language / ভাষা পরিবর্তন করুন"
      >
        <span className="text-sm">{activeLang.flag}</span>
        <span className="font-bold tracking-wider uppercase text-[10px]">{activeLang.code === 'zh-CN' ? 'ZH' : activeLang.code}</span>
        <ChevronDown className={`w-3 h-3 text-[#FF3D4F] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute right-0 md:left-auto md:right-0 left-0 mt-2 w-[280px] rounded-2xl shadow-2xl border overflow-hidden z-[9999] backdrop-blur-xl ${
              isLight 
                ? "bg-white/95 border-slate-200 text-slate-800 shadow-slate-200/50" 
                : "bg-[#090916]/95 border-[#16166F]/60 text-zinc-200 shadow-black/80"
            }`}
          >
            {/* Header with quick search */}
            <div className={`p-3 border-b ${isLight ? 'border-slate-100 bg-slate-50' : 'border-[#16166F]/40 bg-zinc-950/40'}`}>
              <div className="relative">
                <Search className={`absolute left-3 top-2.5 w-3.5 h-3.5 ${isLight ? 'text-slate-400' : 'text-zinc-500'}`} />
                <input
                  type="text"
                  placeholder="Search countries/languages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-3 py-1.5 rounded-full text-xs transition-all ${
                    isLight 
                      ? "bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-[#FF3D4F] focus:outline-none" 
                      : "bg-[#02020A] border-[#16166F]/50 text-zinc-100 placeholder-zinc-500 focus:border-[#FF3D4F] focus:outline-none"
                  }`}
                  autoFocus
                />
              </div>
            </div>

            {/* Language Scroll Area */}
            <div className="max-h-[220px] overflow-y-auto overflow-x-hidden p-1.5 space-y-0.5 custom-scroll scrollbar-thin scrollbar-thumb-zinc-800">
              {filteredLanguages.map((lang) => {
                const isSelected = lang.code === currentLanguage;
                const itemHoverBg = isLight 
                  ? isSelected ? "bg-slate-100 text-[#FF3D4F]" : "hover:bg-slate-50 hover:text-[#FF3D4F]" 
                  : isSelected ? "bg-white/5 text-[#FF3D4F]" : "hover:bg-white/5 hover:text-[#FF3D4F]";

                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all text-left cursor-pointer ${itemHoverBg}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base select-none">{lang.flag}</span>
                      <div className="flex flex-col">
                        <span className="font-semibold tracking-wide">{lang.name}</span>
                        <span className={`text-[9px] font-light ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>
                          {lang.local}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#FF3D4F] stroke-[3]" />
                    )}
                  </button>
                );
              })}

              {filteredLanguages.length === 0 && (
                <div className="p-4 text-center text-xs text-zinc-500">
                  No compatible language found.
                </div>
              )}
            </div>

            {/* Smart assist footnote */}
            <div className={`px-4 py-2 text-[8px] font-mono tracking-widest uppercase flex items-center justify-between border-t ${
              isLight ? 'border-slate-100 bg-slate-50 text-slate-400' : 'border-[#16166F]/40 bg-zinc-950/40 text-zinc-500'
            }`}>
              <span className="flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-[#FF3D4F]" />
                GLOBAL ASSIST ENGINE
              </span>
              <span>100% SECURE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Translate Overlay Indicator */}
      <AnimatePresence>
        {isTranslating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#02020A]/70 backdrop-blur-md z-[100000] flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="bg-zinc-950 border border-[#16166F]/40 p-6 rounded-2xl flex flex-col items-center gap-4 max-w-xs text-center shadow-2xl">
              <div className="w-10 h-10 border-4 border-[#FF3D4F]/20 border-t-[#FF3D4F] rounded-full animate-spin"></div>
              <div>
                <h4 className="font-bold text-sm text-white">Applying Language Setup</h4>
                <p className="text-[10px] text-zinc-400 font-mono uppercase mt-1">Configuring Global Matrix...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

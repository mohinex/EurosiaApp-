import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

export interface Language {
  id: string;
  languageCode: string;
  name: string;
  status: 'active' | 'inactive';
}

export interface TranslationValue {
  id: string;
  languageCode: string;
  key: string;
  value: string;
  namespace: string;
  status: 'active' | 'inactive';
}

// Master list of supported languages (from goals spec)
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', rtl: false },
  { code: 'bn', name: 'Bengali (বাংলা)', rtl: false },
  { code: 'ar', name: 'Arabic (العربية)', rtl: true },
  { code: 'hi', name: 'Hindi (हिन्दी)', rtl: false },
  { code: 'ur', name: 'Urdu (اردو)', rtl: true },
  { code: 'es', name: 'Spanish (Español)', rtl: false },
  { code: 'fr', name: 'French (Français)', rtl: false },
  { code: 'zh-CN', name: 'Chinese (简体中文)', rtl: false },
  { code: 'ja', name: 'Japanese (日本語)', rtl: false },
  { code: 'de', name: 'German (Deutsch)', rtl: false },
  { code: 'pt', name: 'Portuguese (Português)', rtl: false },
  { code: 'ru', name: 'Russian (Русский)', rtl: false },
  { code: 'tr', name: 'Turkish (Türkçe)', rtl: false },
  { code: 'id', name: 'Indonesian (Bahasa Indonesia)', rtl: false },
  { code: 'ms', name: 'Malay (Bahasa Melayu)', rtl: false }
];

export function useLanguage() {
  const { t: i18nT } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');
  const [dbTranslations, setDbTranslations] = useState<TranslationValue[]>([]);
  const [dbLanguages, setDbLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(false);

  // Auto detect current language and load DB translations
  useEffect(() => {
    const handleLangChanged = (lng: string) => {
      setCurrentLanguage(lng);
    };

    i18n.on('languageChanged', handleLangChanged);
    return () => {
      i18n.off('languageChanged', handleLangChanged);
    };
  }, []);

  // Update HTML elements direction dynamically
  useEffect(() => {
    const selected = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);
    const isRtl = selected ? selected.rtl : false;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const fetchTranslations = async () => {
    try {
      setLoading(true);
      const [transRes, langRes] = await Promise.all([
        fetch('/api/i18n/translations'),
        fetch('/api/i18n/languages')
      ]);

      if (transRes.ok) {
        const transData = await transRes.json();
        setDbTranslations(transData);
      }
      if (langRes.ok) {
        const langData = await langRes.json();
        setDbLanguages(langData);
      }
    } catch (err) {
      console.error('Error loading fallback dynamic languages or translations from DB:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTranslations();
  }, [currentLanguage]);

  // Unified translate function
  const t = (key: string, defaultValue: string = ''): string => {
    // 1. Fetch from live database active definitions if configured
    const matchedDb = dbTranslations.find(
      (item) => item.key === key && item.languageCode === currentLanguage && item.status === 'active'
    );
    if (matchedDb && matchedDb.value.trim() !== '') {
      return matchedDb.value;
    }

    // 2. Fetch from hardcoded schema JSON resources
    const fallbackTranslate = i18nT(key);
    if (fallbackTranslate && fallbackTranslate !== key) {
      return fallbackTranslate;
    }

    // 3. Fallback gracefully
    return defaultValue || key;
  };

  const changeLanguage = async (langCode: string) => {
    await i18n.changeLanguage(langCode);
    setCurrentLanguage(langCode);
    localStorage.setItem('i18nextLng', langCode);

    // Set document direction for RTL
    const selected = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
    const isRtl = selected ? selected.rtl : false;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = langCode;
  };

  const activeLanguagesList = dbLanguages.length > 0 
    ? dbLanguages.filter(l => l.status === 'active')
    : SUPPORTED_LANGUAGES.map(l => ({ id: `lang-${l.code}`, languageCode: l.code, name: l.name, status: 'active' as const }));

  return {
    t,
    currentLanguage,
    changeLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
    activeLanguagesList,
    dbTranslations,
    refreshTranslations: fetchTranslations,
    loading
  };
}

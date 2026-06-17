import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import bnTranslation from './locales/bn.json';
import arTranslation from './locales/ar.json';

// Initialize i18next configuration
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      bn: {
        translation: bnTranslation
      },
      ar: {
        translation: arTranslation
      }
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false // React already escapes values securely
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

// Handle RTL text direction for Urdu and Arabic languages
i18n.on('languageChanged', (lng) => {
  const isRTL = lng === 'ar' || lng === 'ur';
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
});

// Configure initial language direction on module load
const currentLng = i18n.language || 'en';
const isRTL = currentLng === 'ar' || currentLng === 'ur';
document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
document.documentElement.lang = currentLng;

export default i18n;

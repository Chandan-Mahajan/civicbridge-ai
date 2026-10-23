import React, { createContext, useContext, useState, useEffect } from 'react';
import type { OutputLanguage } from '../types';
import { translations, LANGUAGE_DISPLAY_NAMES } from './translations';
import type { TranslationSchema } from './translations';

interface LanguageContextType {
  language: OutputLanguage;
  setLanguage: (lang: OutputLanguage) => void;
  t: TranslationSchema;
  getLanguageLabel: (lang: OutputLanguage) => { name: string; nativeName: string };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'civicbridge_ui_language';

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
  initialLanguage?: OutputLanguage;
  onLanguageChange?: (lang: OutputLanguage) => void;
}> = ({ children, initialLanguage = 'en', onLanguageChange }) => {
  const [language, setLanguageState] = useState<OutputLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as OutputLanguage;
      if (saved && (saved === 'en' || saved === 'mr' || saved === 'hi')) {
        return saved;
      }
    } catch {
      // Local storage unavailable
    }
    return initialLanguage;
  });

  const setLanguage = (lang: OutputLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  // Sync document lang attribute for accessibility and screen readers
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language] || translations.en;

  const getLanguageLabel = (lang: OutputLanguage) => {
    return LANGUAGE_DISPLAY_NAMES[lang] || LANGUAGE_DISPLAY_NAMES.en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getLanguageLabel }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

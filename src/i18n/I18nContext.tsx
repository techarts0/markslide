import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { type Locale, getTranslation, translations } from './locales';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (path: string, params?: Record<string, string | number>) => string;
  translations: typeof translations;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      const saved = localStorage.getItem('hateppt_locale');
      if (saved === 'zh' || saved === 'en') return saved;
      if (navigator.language.startsWith('zh')) return 'zh';
    } catch { }
    return 'zh';
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('hateppt_locale', newLocale);
      document.documentElement.lang = newLocale;
    } catch { }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'zh' ? 'en' : 'zh');
  }, [locale, setLocale]);

  useEffect(() => {
    try {
      document.documentElement.lang = locale;
    } catch { }
  }, [locale]);

  const t = useCallback(
    (path: string, params?: Record<string, string | number>) => {
      return getTranslation(locale, path, params);
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, toggleLocale, t, translations }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
};

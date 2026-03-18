'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';

type Locale = 'en' | 'ar';

interface LanguageContextType {
  locale: Locale;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const savedLocale = (localStorage.getItem('managerLang') || localStorage.getItem('locale') || 'en') as Locale;
    setLocale(savedLocale);
    
    import(`../../messages/${savedLocale}.json`).then((msgs) => {
      setMessages(msgs.default);
      setMounted(true);
    }).catch(() => {
      setMessages({});
      setMounted(true);
    });

    // استمع لتغييرات اللغة من Navbar
    const handleLanguageChange = () => {
      const newLocale = (localStorage.getItem('managerLang') || localStorage.getItem('locale') || 'en') as Locale;
      setLocale(newLocale);
      localStorage.setItem('locale', newLocale);
      document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLocale;
      
      import(`../../messages/${newLocale}.json`).then((msgs) => {
        setMessages(msgs.default);
      }).catch(() => {
        setMessages({});
      });
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = locale;
      
      import(`../../messages/${locale}.json`).then((msgs) => {
        setMessages(msgs.default);
      }).catch(() => {
        setMessages({});
      });
    }
  }, [locale, mounted]);

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    localStorage.setItem('managerLang', newLocale);
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLocale;
    window.dispatchEvent(new Event('languageChange'));
  };

  if (!mounted || !messages) {
    return (
      <LanguageContext.Provider value={{ locale, toggleLanguage }}>
        <div suppressHydrationWarning />
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ locale, toggleLanguage }}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

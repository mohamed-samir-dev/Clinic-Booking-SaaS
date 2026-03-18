'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import defaultMessages from '@/messages/en.json';

type Locale = 'en' | 'ar';

interface LanguageContextType {
  locale: Locale;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const [messages, setMessages] = useState<typeof defaultMessages>(defaultMessages);

  useEffect(() => {
    const savedLocale = (localStorage.getItem('managerLang') || localStorage.getItem('locale') || 'en') as Locale;
    if (savedLocale !== 'en') {
      setLocale(savedLocale);
      import(`../../messages/${savedLocale}.json`).then((msgs) => {
        setMessages(msgs.default);
      }).catch(() => {});
    }
    document.documentElement.dir = savedLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLocale;

    const handleLanguageChange = () => {
      const newLocale = (localStorage.getItem('managerLang') || localStorage.getItem('locale') || 'en') as Locale;
      setLocale(newLocale);
      document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLocale;
      if (newLocale === 'en') {
        setMessages(defaultMessages);
      } else {
        import(`../../messages/${newLocale}.json`).then((msgs) => {
          setMessages(msgs.default);
        }).catch(() => {});
      }
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    localStorage.setItem('managerLang', newLocale);
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLocale;
    if (newLocale === 'en') {
      setMessages(defaultMessages);
    } else {
      import(`../../messages/${newLocale}.json`).then((msgs) => {
        setMessages(msgs.default);
      }).catch(() => {});
    }
    window.dispatchEvent(new Event('languageChange'));
  };

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

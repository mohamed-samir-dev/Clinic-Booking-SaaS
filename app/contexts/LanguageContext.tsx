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
  const [messages, setMessages] = useState<any>(null);

  useEffect(() => {
    const savedLocale = (localStorage.getItem('locale') as Locale) || 'en';
    setLocale(savedLocale);
    
    import(`../../messages/${savedLocale}.json`).then((msgs) => {
      setMessages(msgs.default);
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = locale;
      
      import(`../../messages/${locale}.json`).then((msgs) => {
        setMessages(msgs.default);
      });
    }
  }, [locale, mounted]);

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLocale;
  };

  if (!mounted || !messages) {
    return null;
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

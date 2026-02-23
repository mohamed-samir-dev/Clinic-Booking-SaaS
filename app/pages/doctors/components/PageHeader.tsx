'use client';

import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';

export default function PageHeader() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].doctors.page;
  
  return (
    <div className={`text-white py-8 sm:py-12 md:py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-linear-to-r from-teal-500 to-teal-600'}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">
          {translations[locale].doctors.title} <span className="text-teal-400">{translations[locale].doctors.titleHighlight}</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-teal-50">{t.subtitle}</p>
      </div>
    </div>
  );
}

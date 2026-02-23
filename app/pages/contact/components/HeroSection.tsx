'use client';

import { useLanguage } from '@/app/contexts/LanguageContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import translations from '@/messages/translations';

export default function HeroSection() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].contact.hero;
  return (
    <div className={`text-white py-8 sm:py-12 lg:py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-teal-500 to-teal-600'}`}>
      <div className="w-full px-4 md:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3">
          {t.title} <span className="text-teal-400">{t.titleHighlight}</span>
        </h1>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4"></h2>
        <p className="text-sm sm:text-base lg:text-lg text-teal-50 max-w-3xl">
          {t.description}
        </p>
      </div>
    </div>
  );
}

'use client';

import { FaSearch } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';

interface BannerProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onFilterReset: () => void;
}

export default function Banner({ searchQuery, onSearchChange, onFilterReset }: BannerProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].services.banner;

  return (
    <div className={`py-12 sm:py-16 md:py-20 lg:py-24 px-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-[#D5F5F0]'}`}>
      <div className="max-w-7xl mx-auto text-center">
        <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {t.title}
        </h1>
        <p className={`text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          {t.description}
        </p>
        
        <div className="max-w-2xl mx-auto relative px-2">
          <FaSearch className="absolute left-5 sm:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-xl" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              onFilterReset();
            }}
            className={`w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
          />
        </div>
      </div>
    </div>
  );
}

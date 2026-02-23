'use client';

import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';

interface EmptyStateProps {
  hasActiveFilters: boolean;
  resetFilters: () => void;
}

export default function EmptyState({ hasActiveFilters, resetFilters }: EmptyStateProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].doctors.page;
  
  return (
    <div className="text-center py-12 sm:py-16 px-4">
      <div className="text-5xl sm:text-6xl mb-4">🔍</div>
      <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.noDoctorsFound}</h3>
      <p className={`text-sm sm:text-base mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t.adjustFilters}</p>
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="px-5 sm:px-6 py-2.5 sm:py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all font-semibold text-sm sm:text-base"
        >
          {t.clearAllFilters}
        </button>
      )}
    </div>
  );
}

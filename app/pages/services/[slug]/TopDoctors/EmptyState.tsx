import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';

interface EmptyStateProps {
  specialty: string;
}

export default function EmptyState({ specialty }: EmptyStateProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].services.serviceDetails.topDoctors;
  const specialtyName = (translations[locale].services.serviceDetails.specialtyNames as Record<string, string>)[specialty] || specialty;

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} py-12 sm:py-16 md:py-24`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h3 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-3 sm:mb-4 px-4`}>
            {locale === 'ar' ? `${t.specialists} ${specialtyName}` : `${specialtyName} ${t.specialists}`}
          </h3>
          <p className={`text-base sm:text-lg md:text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} max-w-2xl mx-auto px-4`}>
            {t.subtitle}
          </p>
        </div>
        <p className={`text-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} text-base sm:text-lg px-4`}>{t.noAvailable}</p>
      </div>
    </div>
  );
}

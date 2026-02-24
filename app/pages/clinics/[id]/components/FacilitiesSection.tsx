import Image from 'next/image';
import { Clinic } from '../types';
import { useTranslations } from 'next-intl';

interface FacilitiesSectionProps {
  facilities: Clinic['facilities'];
  theme: 'light' | 'dark';
  locale: 'en' | 'ar';
}

export default function FacilitiesSection({ facilities, theme, locale }: FacilitiesSectionProps) {
  const t = useTranslations('clinics.details');
  
  if (!facilities || facilities.length === 0) return null;

  return (
    <div className={`rounded-xl shadow p-4 sm:p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t('facilitiesServices')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {facilities.map((facility, index) => (
          <div key={index} className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg ${theme === 'dark' ? 'bg-teal-900/30' : 'bg-teal-50'}`}>
            {facility.icon && (
              <div className="relative w-4 h-4 sm:w-5 sm:h-5 shrink-0">
                <Image src={facility.icon} alt={facility.name[locale] || facility.name.en} fill sizes="20px" className="object-contain" />
              </div>
            )}
            <p className={`font-semibold text-sm sm:text-base ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{facility.name[locale] || facility.name.en}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

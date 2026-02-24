import Image from 'next/image';
import { MapPin, Phone, Users } from 'lucide-react';
import { Clinic } from '../types';
import { useTranslations } from 'next-intl';

interface ClinicHeaderProps {
  clinic: Clinic;
  theme: 'light' | 'dark';
  locale: 'en' | 'ar';
}

export default function ClinicHeader({ clinic, theme, locale }: ClinicHeaderProps) {
  const t = useTranslations('clinics.details');
  
  return (
    <div className={`relative ${theme === 'dark' ? 'bg-linear-to-r from-teal-800 to-emerald-800' : 'bg-linear-to-r from-teal-600 to-emerald-600'}`}>
      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/40' : 'bg-black/20'}`}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="flex items-center gap-4 sm:gap-6 mb-3">
          {clinic.logo && (
            <div className={`w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-xl shadow-lg p-3 sm:p-4 shrink-0 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="relative w-full h-full">
                <Image src={clinic.logo} alt={clinic.name.en} fill sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, 128px" className="object-contain" />
              </div>
            </div>
          )}
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">{clinic.name[locale] || clinic.name.en}</h1>
        </div>
        {(clinic.brief?.[locale] || clinic.brief?.en) && (
          <p className="text-teal-100 text-sm sm:text-base md:text-lg max-w-2xl">{clinic.brief[locale] || clinic.brief.en}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
          {(clinic.address?.[locale] || clinic.address?.en) && (
            <div className={`flex items-center gap-3 backdrop-blur-sm rounded-lg p-3 sm:p-4 ${theme === 'dark' ? 'bg-white/5' : 'bg-white/10'}`}>
              <MapPin className="text-white shrink-0" size={20} />
              <div className="text-white min-w-0">
                <p className="text-xs sm:text-sm text-teal-100">{t('address')}</p>
                <p className="font-semibold text-sm sm:text-base truncate">{clinic.address[locale] || clinic.address.en}</p>
              </div>
            </div>
          )}
          {clinic.phone && (
            <div className={`flex items-center gap-3 backdrop-blur-sm rounded-lg p-3 sm:p-4 ${theme === 'dark' ? 'bg-white/5' : 'bg-white/10'}`}>
              <Phone className="text-white shrink-0" size={20} />
              <div className="text-white min-w-0">
                <p className="text-xs sm:text-sm text-teal-100">{t('phone')}</p>
                <p className="font-semibold text-sm sm:text-base">{clinic.phone}</p>
              </div>
            </div>
          )}
          {clinic.capacity && (
            <div className={`flex items-center gap-3 backdrop-blur-sm rounded-lg p-3 sm:p-4 sm:col-span-2 md:col-span-1 ${theme === 'dark' ? 'bg-white/5' : 'bg-white/10'}`}>
              <Users className="text-white shrink-0" size={20} />
              <div className="text-white min-w-0">
                <p className="text-xs sm:text-sm text-teal-100">{t('capacity')}</p>
                <p className="font-semibold text-sm sm:text-base">{clinic.capacity.doctors} {t('doctors')} • {clinic.capacity.rooms} {t('rooms')}</p>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
  );
}

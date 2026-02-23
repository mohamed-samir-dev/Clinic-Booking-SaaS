'use client';

import { FaHospital } from 'react-icons/fa';
import { MdVerifiedUser, MdPrecisionManufacturing } from 'react-icons/md';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';

export default function WhyChoose() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].services.whyChoose;

  return (
    <div className={`py-12 sm:py-16 px-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {t.title}
          </h2>
          <p className={`text-base sm:text-lg max-w-3xl mx-auto px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center p-4 sm:p-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <MdVerifiedUser className="text-teal-600 text-2xl sm:text-3xl" />
            </div>
            <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.expertDoctors.title}</h3>
            <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {t.expertDoctors.description}
            </p>
          </div>

          <div className="text-center p-4 sm:p-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <MdPrecisionManufacturing className="text-teal-600 text-2xl sm:text-3xl" />
            </div>
            <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.modernTechnology.title}</h3>
            <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {t.modernTechnology.description}
            </p>
          </div>

          <div className="text-center p-4 sm:p-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <FaHospital className="text-teal-600 text-2xl sm:text-3xl" />
            </div>
            <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.comfortableEnvironment.title}</h3>
            <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {t.comfortableEnvironment.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

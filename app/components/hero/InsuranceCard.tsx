'use client';
import { FaShieldAlt } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import messages from '@/messages/en.json';
import messagesAr from '@/messages/ar.json';

export default function InsuranceCard() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = locale === 'ar' ? messagesAr.hero : messages.hero;

  return (
    <div className={`backdrop-blur-md p-[3px] rounded-xl md:rounded-2xl shadow-xl border ${theme === 'dark' ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/20 border-white/30'}`}>
      <div className={`backdrop-blur-sm p-3 rounded-lg md:rounded-xl shadow-lg h-full flex items-center lg:w-80 xl:w-[400px] ${theme === 'dark' ? 'bg-gray-800/95' : 'bg-white/95'}`}>
        <div className="flex items-center gap-2 md:gap-3 w-full">
          <div className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
            <FaShieldAlt className="text-green-600 text-lg md:text-xl" />
          </div>
          <div className="flex-1">
            <p className={`text-xs md:text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{t.insuranceLabel}</p>
            <h2 className={`text-sm md:text-base lg:text-lg xl:text-[20px] font-bold mt-0.5 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{t.insuranceValue}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

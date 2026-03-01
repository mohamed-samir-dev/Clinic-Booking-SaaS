import { FaShieldAlt } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import messages from '@/messages/en.json';
import messagesAr from '@/messages/ar.json';

export const PageHeader = () => {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = locale === 'ar' ? messagesAr.patient.medical : messages.patient.medical;
  
  return (
    <>
      <div className={`rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8 shadow-xl ${
        theme === 'dark' ? 'bg-gradient-to-r from-teal-700 to-teal-800' : 'bg-linear-to-r from-teal-600 to-teal-700'
      }`}>
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">{t.pageTitle}</h1>
          <p className="text-teal-100 text-sm sm:text-base lg:text-lg">{t.pageSubtitle}</p>
        </div>
      </div>

      <div className={`border-l-4 border-teal-500 p-3 sm:p-4 mb-4 sm:mb-6 rounded-lg flex items-start gap-2 sm:gap-3 ${
        theme === 'dark' ? 'bg-teal-900/30' : 'bg-teal-50'
      }`}>
        <FaShieldAlt className="text-teal-600 text-lg sm:text-xl mt-0.5 sm:mt-1 shrink-0" />
        <div>
          <h3 className={`font-semibold mb-1 text-sm sm:text-base ${
            theme === 'dark' ? 'text-teal-300' : 'text-teal-900'
          }`}>{t.privacyNotice}</h3>
          <p className={`text-xs sm:text-sm ${
            theme === 'dark' ? 'text-teal-200' : 'text-teal-800'
          }`}>{t.privacyText}</p>
        </div>
      </div>
    </>
  );
};

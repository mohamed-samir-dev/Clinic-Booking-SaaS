import { FaLock } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useTranslations } from '../hooks/useTranslations';

interface PasswordSectionProps {
  onChangePassword: () => void;
}

export const PasswordSection = ({ onChangePassword }: PasswordSectionProps) => {
  const { theme } = useTheme();
  const t = useTranslations();
  
  return (
    <div className={`rounded-2xl shadow-lg p-4 sm:p-6 border mt-4 sm:mt-6 ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
        <h2 className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <FaLock className="text-blue-600 text-sm sm:text-base" />
          </div>
          {t.changePassword}
        </h2>
        <button type="button" onClick={onChangePassword} className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all">
          {t.change}
        </button>
      </div>
      <p className={`text-xs sm:text-sm ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      }`}>{t.keepAccountSecure}</p>
    </div>
  );
};

import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { FormData } from '../types';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useTranslations } from '../hooks/useTranslations';

interface ContactInfoProps {
  formData: FormData;
  isEditing: boolean;
  onChange: (data: FormData) => void;
}

export const ContactInfo = ({ formData, isEditing, onChange }: ContactInfoProps) => {
  const { theme } = useTheme();
  const t = useTranslations();
  
  return (
    <div className={`rounded-2xl shadow-lg p-4 sm:p-6 border ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <h2 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-teal-100 rounded-lg flex items-center justify-center">
          <FaUser className="text-teal-600 text-sm sm:text-base" />
        </div>
        {t.contactInformation}
      </h2>
      <div className="space-y-3 sm:space-y-4">
        <div className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
            <FaUser className="text-teal-600 text-base sm:text-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-medium mb-1 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>{t.fullName}</p>
            {isEditing ? (
              <input type="text" value={formData.name} onChange={(e) => onChange({...formData, name: e.target.value})} className={`w-full px-3 py-2 border rounded-lg text-sm sm:text-base ${
                theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`} />
            ) : (
              <p className={`font-semibold text-sm sm:text-base truncate ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{formData.name || t.notProvided}</p>
            )}
          </div>
        </div>
        <div className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
            <FaEnvelope className="text-blue-600 text-base sm:text-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-medium mb-1 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>{t.emailAddress}</p>
            {isEditing ? (
              <input type="email" value={formData.email} onChange={(e) => onChange({...formData, email: e.target.value})} className={`w-full px-3 py-2 border rounded-lg text-sm sm:text-base ${
                theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`} />
            ) : (
              <p className={`font-semibold text-sm sm:text-base truncate ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{formData.email || t.notProvided}</p>
            )}
          </div>
        </div>
        <div className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
            <FaPhone className="text-green-600 text-base sm:text-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-medium mb-1 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>{t.phoneNumber}</p>
            {isEditing ? (
              <input type="text" value={formData.phone} onChange={(e) => onChange({...formData, phone: e.target.value})} className={`w-full px-3 py-2 border rounded-lg text-sm sm:text-base ${
                theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`} />
            ) : (
              <p className={`font-semibold text-sm sm:text-base truncate ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{formData.phone || t.notProvided}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

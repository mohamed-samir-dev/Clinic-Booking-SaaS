import { Stethoscope } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';
import {MedicalContextProps}from '../types/types'

export default function MedicalContext({ reason, setReason }: MedicalContextProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].booking.detailsForm.medicalContext;
  
  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Stethoscope className="text-teal-600" size={20} />
        <h3 className={`text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.title}</h3>
      </div>
      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className={`block text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{t.reasonForVisit}</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 focus:outline-none resize-none text-sm sm:text-base ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:border-teal-500' : 'bg-white border-gray-200 text-gray-900 focus:border-teal-500'
            }`}
            placeholder={locale === 'ar' ? 'صف باختصار مخاوفك أو أعراضك...' : 'Briefly describe your concerns or symptoms...'}
          />
        </div>

      </div>
    </div>
  );
}

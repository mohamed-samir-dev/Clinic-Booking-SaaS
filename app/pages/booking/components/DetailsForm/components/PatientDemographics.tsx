import { UserRound } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';
import {PatientDemographicsProps}from '../types/types'
export default function PatientDemographics({ dateOfBirth, setDateOfBirth, gender, setGender }: PatientDemographicsProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].booking.detailsForm.demographics;
  const today = new Date().toISOString().split('T')[0];
  const minDate = new Date(new Date().getFullYear() - 120, 0, 1).toISOString().split('T')[0];
  
  const isDateValid = dateOfBirth && new Date(dateOfBirth) <= new Date(today);

  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <UserRound className="text-teal-600" size={20} />
        <h3 className={`text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className={`block text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{t.dateOfBirth}</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            max={today}
            min={minDate}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 focus:outline-none text-sm sm:text-base ${
              dateOfBirth && !isDateValid ? 'border-red-500 focus:border-red-500' : theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:border-teal-500' : 'bg-white border-gray-200 text-gray-900 focus:border-teal-500'
            }`}
            placeholder="mm/dd/yyyy"
          />
          {dateOfBirth && !isDateValid && (
            <p className="text-[10px] sm:text-xs text-red-500 mt-1">{locale === 'ar' ? '⚠ لا يمكن أن يكون تاريخ الميلاد في المستقبل' : '⚠ Date of birth cannot be in the future'}</p>
          )}
          {(!dateOfBirth || isDateValid) && (
            <p className={`text-[10px] sm:text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{locale === 'ar' ? 'اختر تاريخ ميلادك' : 'Select your date of birth'}</p>
          )}
        </div>
        <div>
          <label className={`block text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{t.gender}</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 focus:outline-none text-sm sm:text-base ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:border-teal-500' : 'bg-white border-gray-200 text-gray-900 focus:border-teal-500'
            }`}
          >
            <option value="">{locale === 'ar' ? 'اختر الجنس' : 'Select gender'}</option>
            <option value="male">{t.male}</option>
            <option value="female">{t.female}</option>
            <option value="other">{locale === 'ar' ? 'آخر' : 'Other'}</option>
          </select>
        </div>
      </div>
    </div>
  );
}

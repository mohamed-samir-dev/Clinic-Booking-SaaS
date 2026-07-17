import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';
import {BasicInformationProps}from '../types/types'
export default function BasicInformation({ fullName, setFullName, phone, setPhone, email, setEmail }: BasicInformationProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].booking.detailsForm.basicInfo;
  const isPhoneValid = phone.length === 10;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <span className="material-icons text-teal-600 text-lg sm:text-xl">person</span>
        <h3 className={`text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.title}</h3>
      </div>
      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className={`block text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{t.fullName}</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 focus:outline-none text-sm sm:text-base ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:border-teal-500' : 'bg-white border-gray-200 text-gray-900 focus:border-teal-500'
            }`}
            placeholder={locale === 'ar' ? 'محمد أحمد' : 'Johnathan Doe'}
          />
        </div>
        <div>
          <label className={`block text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{t.phone}</label>
          <div className="flex gap-1.5 sm:gap-2">
            <div className={`px-2 sm:px-3 md:px-4 py-2 sm:py-3 rounded-xl border-2 text-xs sm:text-sm md:text-base font-semibold shrink-0 whitespace-nowrap ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
            }`}>
              🇪🇬 +20
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 10) setPhone(value);
              }}
              className={`flex-1 min-w-0 px-2 sm:px-3 md:px-4 py-2 sm:py-3 rounded-xl border-2 focus:outline-none text-sm sm:text-base ${
                phone && !isPhoneValid ? 'text-black border-red-500 focus:border-red-500' : theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:border-teal-500' : 'bg-white text-black border-gray-200 focus:border-teal-500'
              }`}
              placeholder="1012345678"
              maxLength={10}
            />
          </div>
          {phone && !isPhoneValid && (
            <p className="text-[10px] sm:text-xs text-red-500 mt-1">{locale === 'ar' ? '⚠ يجب أن يكون رقم الهاتف 10 أرقام بالضبط' : '⚠ Phone number must be exactly 10 digits'}</p>
          )}
          {(!phone || isPhoneValid) && (
            <p className={`text-[10px] sm:text-xs mt-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{locale === 'ar' ? 'يرجى إدخال 10 أرقام فقط' : 'Please enter 10 digits only'}</p>
          )}
        </div>
        <div>
          <label className={`block text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{t.email}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              const value = e.target.value.replace(/[\u0600-\u06FF]/g, '');
              setEmail(value);
            }}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 focus:outline-none text-sm sm:text-base ${
              email && !isEmailValid ? 'border-red-500 text-black focus:border-red-500' : theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:border-teal-500' : 'bg-white border-gray-200 text-gray-900 focus:border-teal-500'
            }`}
            placeholder="john.doe@gmail.com"
          />
          {email && !isEmailValid && (
            <p className="text-[10px] sm:text-xs text-red-500 mt-1">{locale === 'ar' ? '⚠ يرجى إدخال بريد إلكتروني صالح' : '⚠ Please enter a valid email address'}</p>
          )}
          {(!email || isEmailValid) && (
            <p className={`text-[10px] sm:text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{locale === 'ar' ? 'مثال: name@example.com' : 'e.g. name@example.com'}</p>
          )}
        </div>
      </div>
    </div>
  );
}

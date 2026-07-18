import { User } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';
import { BasicInformationProps } from '../types/types';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function BasicInformation({ fullName, setFullName, phone, setPhone, email, setEmail }: BasicInformationProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].booking.detailsForm.basicInfo;
  const isPhoneValid = phone ? isValidPhoneNumber(phone) : true;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <User className="text-teal-600" size={20} />
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
          <PhoneInput
            international
            defaultCountry="EG"
            value={phone}
            onChange={(val) => setPhone(val || '')}
            className={`phone-input-wrapper ${
              phone && !isPhoneValid
                ? 'phone-input-error'
                : theme === 'dark'
                ? 'phone-input-dark'
                : 'phone-input-light'
            }`}
          />
          {phone && !isPhoneValid ? (
            <p className="text-[10px] sm:text-xs text-red-500 mt-1.5">{locale === 'ar' ? '⚠ رقم الهاتف غير صالح لهذه الدولة' : '⚠ Invalid phone number for selected country'}</p>
          ) : (
            <p className={`text-[10px] sm:text-xs mt-1.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{locale === 'ar' ? 'اختر رمز الدولة وأدخل رقم هاتفك' : 'Select country code and enter your phone number'}</p>
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

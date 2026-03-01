import { InputFieldProps } from '../types/register';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';


export const InputField = ({ label, name, type, placeholder, icon, register, error, maxLength, onInput }: InputFieldProps) => {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';
  
  return (
  <div>
    <label htmlFor={name} className={`block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
      {label}
    </label>
    <div className="relative">
      <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3 sm:pr-4' : 'left-0 pl-3 sm:pl-4'} flex items-center pointer-events-none`}>
        {icon}
      </div>
      <input
        {...register(name)}
        type={type}
        maxLength={maxLength}
        onInput={onInput}
        className={`w-full ${isRTL ? 'pr-10 sm:pr-12 pl-4 sm:pl-5 text-right' : 'pl-10 sm:pl-12 pr-4 sm:pr-5 text-left'} py-2.5 sm:py-3.5 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all placeholder:text-gray-400 text-sm sm:text-base ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:bg-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white focus:border-transparent'}`}
        placeholder={placeholder}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);
};

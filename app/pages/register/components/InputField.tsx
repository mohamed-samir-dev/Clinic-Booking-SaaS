import { InputFieldProps } from '../types/register';
import { useTheme } from '@/app/contexts/ThemeContext';


export const InputField = ({ label, name, type, placeholder, icon, register, error, maxLength, onInput }: InputFieldProps) => {
  const { theme } = useTheme();
  return (
  <div>
    <label htmlFor={name} className={`block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        {...register(name)}
        type={type}
        maxLength={maxLength}
        onInput={onInput}
        className={`w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2.5 sm:py-3.5 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all placeholder:text-gray-400 text-sm sm:text-base text-right ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:bg-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white focus:border-transparent'}`}
        placeholder={placeholder}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);
};

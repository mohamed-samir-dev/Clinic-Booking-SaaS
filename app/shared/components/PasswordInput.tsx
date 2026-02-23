import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';

interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  required?: boolean;
  showForgotPassword?: boolean;
}

export default function PasswordInput({
  id,
  value,
  onChange,
  label,
  placeholder = '••••••••',
  required = false,
  showForgotPassword = false
}: PasswordInputProps) {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="flex flex-col min-[270px]:flex-row min-[270px]:items-center min-[270px]:justify-between gap-1 min-[270px]:gap-0 mb-1.5 sm:mb-2">
        <label htmlFor={id} className={`block font-semibold text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
          {label}
        </label>
        {showForgotPassword && (
          <a href="/forgot-password" className="text-xs sm:text-sm cursor-pointer text-teal-500 font-semibold hover:text-teal-600">
            Forgot password?
          </a>
        )}
      </div>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-2.5 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
          placeholder={placeholder}
          required={required}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={`absolute cursor-pointer right-2 xs:right-3 top-1/2 -translate-y-1/2 transition ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
        >
          {showPassword ? <FaEyeSlash size={16} className="xs:w-[18px] xs:h-[18px]" /> : <FaEye size={16} className="xs:w-[18px] xs:h-[18px]" />}
        </button>
      </div>
    </div>
  );
}

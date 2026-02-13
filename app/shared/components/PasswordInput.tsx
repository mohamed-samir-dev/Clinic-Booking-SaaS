import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={id} className="block font-semibold text-sm text-gray-700">
          {label}
        </label>
        {showForgotPassword && (
          <a href="/forgot-password" className="text-xs cursor-pointer text-teal-500 font-semibold hover:text-teal-600">
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
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-900"
          placeholder={placeholder}
          required={required}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </button>
      </div>
    </div>
  );
}

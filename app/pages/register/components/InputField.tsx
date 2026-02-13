import { InputFieldProps } from '../types/register';


export const InputField = ({ label, name, type, placeholder, icon, register, error, maxLength, onInput }: InputFieldProps) => (
  <div>
    <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        {...register(name)}
        type={type}
        maxLength={maxLength}
        onInput={onInput}
        className="w-full pl-12 pr-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
        placeholder={placeholder}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

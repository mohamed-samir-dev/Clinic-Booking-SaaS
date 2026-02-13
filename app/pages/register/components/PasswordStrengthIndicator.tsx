
import {PasswordStrengthIndicatorProps} from '../types/register';
export const PasswordStrengthIndicator = ({ password, passwordStrength, getStrengthColor, getStrengthLabel }: PasswordStrengthIndicatorProps) => {
  if (!password) return null;

  return (
    <div className="mt-3">
      <div className="flex gap-1.5 mb-2">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              level <= passwordStrength ? getStrengthColor() : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-bold ${
        passwordStrength >= 4 ? 'text-teal-600' : 
        passwordStrength === 3 ? 'text-yellow-600' : 'text-red-600'
      }`}>
        {getStrengthLabel()}
      </p>
    </div>
  );
};

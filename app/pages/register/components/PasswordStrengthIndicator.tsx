import {PasswordStrengthIndicatorProps} from '../types/register';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import messages from '@/messages/en.json';
import messagesAr from '@/messages/ar.json';

export const PasswordStrengthIndicator = ({ password, passwordStrength, getStrengthColor, getStrengthLabel }: PasswordStrengthIndicatorProps) => {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = locale === 'ar' ? messagesAr.auth.register.passwordStrength : messages.auth.register.passwordStrength;
  
  if (!password) return null;

  const strengthLabels = {
    weak: t.weak,
    fair: t.fair,
    good: t.good,
    strong: t.strong
  };

  const getLocalizedLabel = () => {
    const label = getStrengthLabel();
    return strengthLabels[label.toLowerCase() as keyof typeof strengthLabels] || label;
  };

  return (
    <div className="mt-2 sm:mt-3">
      <div className="flex gap-1 sm:gap-1.5 mb-1.5 sm:mb-2">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-1 sm:h-1.5 flex-1 rounded-full transition-all duration-300 ${
              level <= passwordStrength ? getStrengthColor() : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-bold ${
        passwordStrength >= 4 ? 'text-teal-600' : 
        passwordStrength === 3 ? 'text-yellow-600' : 'text-red-600'
      }`}>
        {getLocalizedLabel()}
      </p>
    </div>
  );
};

import { useTranslations } from 'next-intl';
import { useTheme } from '@/app/contexts/ThemeContext';

interface PasswordRequirementsProps {
  password: string;
}

export const PasswordRequirements = ({ password }: PasswordRequirementsProps) => {
  const t = useTranslations('register.passwordRequirements');
  const { theme } = useTheme();
  return (
  <div className={`mt-2 sm:mt-3 border rounded-lg p-2.5 sm:p-3 ${theme === 'dark' ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'}`}>
    <p className={`text-xs font-semibold mb-1.5 sm:mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-900'}`}>Password Requirements:</p>
    <ul className="space-y-0.5 sm:space-y-1">
      <li className={`text-xs flex items-center gap-1.5 sm:gap-2 ${password.length >= 8 ? 'text-teal-600' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        <span>{password.length >= 8 ? '✓' : '○'}</span>
        {t('minLength')}
      </li>
      <li className={`text-xs flex items-center gap-1.5 sm:gap-2 ${/[a-z]/.test(password) && /[A-Z]/.test(password) ? 'text-teal-600' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        <span>{/[a-z]/.test(password) && /[A-Z]/.test(password) ? '✓' : '○'}</span>
        {t('uppercase')} & {t('lowercase')}
      </li>
      <li className={`text-xs flex items-center gap-1.5 sm:gap-2 ${/[0-9]/.test(password) ? 'text-teal-600' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        <span>{/[0-9]/.test(password) ? '✓' : '○'}</span>
        {t('number')}
      </li>
      <li className={`text-xs flex items-center gap-1.5 sm:gap-2 ${/[^a-zA-Z0-9]/.test(password) ? 'text-teal-600' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        <span>{/[^a-zA-Z0-9]/.test(password) ? '✓' : '○'}</span>
        {t('special')}
      </li>
    </ul>
  </div>
);
};

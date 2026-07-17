import { Key, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { generateStrongPassword } from '../../../../doctors/add/utils/passwordGenerator';

interface PasswordChangeSectionProps {
  password: string;
  setPassword: (password: string) => void;
}

export const PasswordChangeSection = ({ password, setPassword }: PasswordChangeSectionProps) => {
  const t = useTranslations('owner.managers.edit.passwordChange');
  return (
    <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-teal-600 p-2 rounded-lg">
          <Key size={18} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">{t('title')}</h3>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">{t('newPassword')}</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder={t('placeholder')}
          />
          <button
            type="button"
            onClick={() => setPassword(generateStrongPassword())}
            className="px-4 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all flex items-center gap-2 font-semibold"
          >
            <RefreshCw size={18} />
            {t('generate')}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">{t('hint')}</p>
      </div>
    </div>
  );
};

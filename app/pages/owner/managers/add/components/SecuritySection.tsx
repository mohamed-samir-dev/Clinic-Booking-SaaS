import { Shield, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ManagerFormData } from '../types';
import { generateStrongPassword } from '../../../doctors/add/utils/passwordGenerator';

interface SecuritySectionProps {
  formData: Partial<ManagerFormData>;
  setFormData: (data: Partial<ManagerFormData>) => void;
}

export const SecuritySection = ({ formData, setFormData }: SecuritySectionProps) => {
  const t = useTranslations('owner.managers.add.security');
  return (
    <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-teal-600 p-2 rounded-lg">
          <Shield size={18} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">{t('title')}</h3>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">{t('password')} *</label>
        <div className="flex gap-2">
          <input
            type="text"
            required
            value={formData.password || ''}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="flex-1 px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder={t('passwordPlaceholder')}
          />
          <button
            type="button"
            onClick={() => setFormData({ ...formData, password: generateStrongPassword() })}
            className="px-4 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all flex items-center gap-2 font-semibold"
          >
            <RefreshCw size={18} />
            {t('generate')}
          </button>
        </div>
        <label className="flex items-center gap-2 mt-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.requirePasswordChange || false}
            onChange={(e) => setFormData({ ...formData, requirePasswordChange: e.target.checked })}
            className="w-4 h-4 text-teal-600 border-gray-500 rounded focus:ring-teal-500"
          />
          <span className="text-sm text-gray-300">{t('requirePasswordChange')}</span>
        </label>
      </div>
    </div>
  );
};

import { Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ManagerFormData } from '../types';

interface StatusSectionProps {
  formData: Partial<ManagerFormData>;
  setFormData: (data: Partial<ManagerFormData>) => void;
}

export const StatusSection = ({ formData, setFormData }: StatusSectionProps) => {
  const t = useTranslations('owner.managers.add.status');
  return (
    <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-teal-600 p-2 rounded-lg">
          <Shield size={18} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">{t('title')}</h3>
      </div>
      <label className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl border-2 border-gray-600 cursor-pointer hover:bg-gray-700 transition-all">
        <input
          type="checkbox"
          checked={formData.isActive || false}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
          className="w-5 h-5 text-teal-600 border-gray-500 rounded focus:ring-teal-500"
        />
        <span className="text-sm font-semibold text-gray-300">{t('active')}</span>
      </label>
    </div>
  );
};

import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ManagerFormData } from '../types';

interface BasicInfoSectionProps {
  formData: Partial<ManagerFormData>;
  setFormData: (data: Partial<ManagerFormData>) => void;
}

export const BasicInfoSection = ({ formData, setFormData }: BasicInfoSectionProps) => {
  const t = useTranslations('owner.managers.add.basicInfo');
  return (
    <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-teal-600 p-2 rounded-lg">
          <User size={18} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">{t('title')}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-300 mb-2">{t('fullName')} *</label>
          <input
            type="text"
            required
            value={formData.fullName || ''}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder={t('fullNamePlaceholder')}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">{t('email')} *</label>
          <input
            type="email"
            required
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder={t('emailPlaceholder')}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">{t('phone')} *</label>
          <input
            type="tel"
            required
            value={formData.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder={t('phonePlaceholder')}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">{t('nationalId')}</label>
          <input
            type="text"
            value={formData.nationalId || ''}
            onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder={t('nationalIdPlaceholder')}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">{t('address')}</label>
          <input
            type="text"
            value={formData.address || ''}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder={t('addressPlaceholder')}
          />
        </div>
      </div>
    </div>
  );
};

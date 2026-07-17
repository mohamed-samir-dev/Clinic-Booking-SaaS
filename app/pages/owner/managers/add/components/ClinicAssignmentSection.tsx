import { Building2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ManagerFormData } from '../types';

interface Clinic {
  _id: string;
  name: { en: string; ar: string };
}

interface ClinicAssignmentSectionProps {
  formData: Partial<ManagerFormData>;
  setFormData: (data: Partial<ManagerFormData>) => void;
  clinics: Clinic[];
}

export const ClinicAssignmentSection = ({ formData, setFormData, clinics }: ClinicAssignmentSectionProps) => {
  const t = useTranslations('owner.managers.add.clinicAssignment');
  return (
    <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-teal-600 p-2 rounded-lg">
          <Building2 size={18} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">{t('title')}</h3>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">{t('clinic')} *</label>
        <select
          required
          value={formData.clinicId || ''}
          onChange={(e) => setFormData({ ...formData, clinicId: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white"
        >
          <option value="">{t('selectClinic')}</option>
          {clinics.map((clinic) => (
            <option key={clinic._id} value={clinic._id}>
              {clinic.name.en} - {clinic.name.ar}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

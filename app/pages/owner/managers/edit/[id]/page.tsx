'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useClinics } from '../../../doctors/add/hooks/useClinics';
import { useEditManager } from './hooks/useEditManager';
import { PasswordChangeSection } from './components/PasswordChangeSection';
import {
  FormHeader,
  ErrorAlert,
  BasicInfoSection,
  ClinicAssignmentSection,
  PermissionsSection,
  StatusSection,
  FormActions,
} from '../../add/components';

export default function EditManagerPage() {
  const router = useRouter();
  const t = useTranslations('owner.managers');
  const { clinics } = useClinics();
  const { formData, setFormData, loading, error, handleSubmit, fetchLoading, password, setPassword } = useEditManager();
  const { locale } = useLanguage();
  const isRtl = locale === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-gray-400">{t('edit.loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-teal-400 hover:text-teal-300 mb-4 font-medium transition-colors group"
        >
          <BackIcon size={20} className={`${isRtl ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'} transition-transform`} />
          <span>{t('edit.back')}</span>
        </button>

        <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
          <FormHeader title={t('edit.title')} subtitle={t('edit.subtitle')} />

          <div className="p-6">
            {error && <ErrorAlert message={error} />}

            <form onSubmit={handleSubmit} className="space-y-6">
              <BasicInfoSection formData={formData} setFormData={setFormData} />
              <ClinicAssignmentSection formData={formData} setFormData={setFormData} clinics={clinics} />
              <PasswordChangeSection password={password} setPassword={setPassword} />
              <PermissionsSection formData={formData} setFormData={setFormData} />
              <StatusSection formData={formData} setFormData={setFormData} />
              <FormActions 
                loading={loading} 
                onCancel={() => router.back()} 
                submitText={t('edit.actions.update')}
                loadingText={t('edit.actions.updating')}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

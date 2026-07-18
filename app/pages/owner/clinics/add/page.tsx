'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useClinicForm } from '../hooks/useClinicForm';
import { useLanguage } from '@/app/contexts/LanguageContext';
import BasicInfo from '../components/BasicInfo';
import MediaSection from '../components/MediaSection';
import ContactInfo from '../components/ContactInfo';
import CapacitySection from '../components/CapacitySection';
import WorkingHours from '../components/WorkingHours';
import FacilitiesList from '../components/FacilitiesList';
import BookingSettings from '../components/BookingSettings';
import SocialMedia from '../components/SocialMedia';
import StatusSection from '../components/StatusSection';

const t = {
  ar: {
    back: 'رجوع',
    title: 'إضافة عيادة جديدة',
    subtitle: 'أدخل بيانات العيادة الجديدة',
    errorLabel: 'خطأ',
    cancel: 'إلغاء',
    submit: 'إنشاء العيادة',
    submitting: 'جاري الحفظ...',
  },
  en: {
    back: 'Back',
    title: 'Add New Clinic',
    subtitle: 'Fill in the details to create a new clinic',
    errorLabel: 'Error',
    cancel: 'Cancel',
    submit: 'Create Clinic',
    submitting: 'Saving...',
  },
} as const;

export default function AddClinicPage() {
  const router = useRouter();
  const { locale } = useLanguage();
  const tr = t[locale as 'ar' | 'en'];
  const { formData, setFormData, loading, error, handleSubmit } = useClinicForm();
  const BackIcon = locale === 'ar' ? ArrowRight : ArrowLeft;

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white"
        >
          <BackIcon size={20} />
          {tr.back}
        </button>
      </div>

      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{tr.title}</h1>
          <p className="text-gray-400">{tr.subtitle}</p>
        </div>

        {error && (
          <div className="bg-red-900/20 border-l-4 border-red-500 text-red-400 px-6 py-4 rounded-lg mb-6">
            <p className="font-medium">{tr.errorLabel}</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <BasicInfo formData={formData} setFormData={setFormData} />
          <MediaSection formData={formData} setFormData={setFormData} />
          <ContactInfo formData={formData} setFormData={setFormData} />
          <CapacitySection formData={formData} setFormData={setFormData} />
          <WorkingHours formData={formData} setFormData={setFormData} />
          <FacilitiesList formData={formData} setFormData={setFormData} />
          <BookingSettings formData={formData} setFormData={setFormData} />
          <SocialMedia formData={formData} setFormData={setFormData} />
          <StatusSection formData={formData} setFormData={setFormData} />

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3 border-2 border-gray-600 rounded-xl text-gray-300 font-semibold hover:bg-gray-700 transition-all"
            >
              {tr.cancel}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 disabled:bg-gray-600 transition-all shadow-lg"
            >
              {loading ? tr.submitting : tr.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

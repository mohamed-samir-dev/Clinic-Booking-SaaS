'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { ClinicFormData } from '../../types';
import { INITIAL_CLINIC_DATA } from '../../utils/constants';
import { fetchClinicById, updateClinic } from '../../utils/api';
import BasicInfo from '../../components/BasicInfo';
import MediaSection from '../../components/MediaSection';
import ContactInfo from '../../components/ContactInfo';
import CapacitySection from '../../components/CapacitySection';
import WorkingHours from '../../components/WorkingHours';
import FacilitiesList from '../../components/FacilitiesList';
import BookingSettings from '../../components/BookingSettings';
import SocialMedia from '../../components/SocialMedia';
import StatusSection from '../../components/StatusSection';

const t = {
  ar: {
    back: 'رجوع',
    title: 'تعديل العيادة',
    subtitle: 'تعديل بيانات العيادة',
    errorLabel: 'خطأ',
    cancel: 'إلغاء',
    submit: 'حفظ التعديلات',
    submitting: 'جاري الحفظ...',
    loading: 'جاري تحميل بيانات العيادة...',
    validationName: 'اسم العيادة بالإنجليزي مطلوب',
    validationNameAr: 'اسم العيادة بالعربي مطلوب',
    validationEmail: 'البريد الإلكتروني غير صحيح',
    validationPhone: 'رقم الهاتف غير صحيح',
  },
  en: {
    back: 'Back',
    title: 'Edit Clinic',
    subtitle: 'Edit clinic details',
    errorLabel: 'Error',
    cancel: 'Cancel',
    submit: 'Update Clinic',
    submitting: 'Saving...',
    loading: 'Loading clinic data...',
    validationName: 'Clinic name in English is required',
    validationNameAr: 'Clinic name in Arabic is required',
    validationEmail: 'Invalid email address',
    validationPhone: 'Invalid phone number',
  },
} as const;

export default function EditClinicPage() {
  const router = useRouter();
  const params = useParams();
  const clinicId = params.id as string;
  const { locale } = useLanguage();
  const tr = t[locale as 'ar' | 'en'];
  const BackIcon = locale === 'ar' ? ArrowRight : ArrowLeft;

  const [formData, setFormData] = useState<ClinicFormData>(INITIAL_CLINIC_DATA);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClinicData = async () => {
      try {
        const data = await fetchClinicById(clinicId);
        setFormData({
          name: data.name || { en: '', ar: '' },
          brief: data.brief || { en: '', ar: '' },
          description: data.description || { en: '', ar: '' },
          address: data.address || { en: '', ar: '' },
          phone: data.phone || '',
          email: data.email || '',
          logo: data.logo || '',
          images: data.images || [],
          location: data.location || { coordinates: [0, 0] },
          workingHours: data.workingHours || {},
          facilities: data.facilities || [],
          capacity: data.capacity || { rooms: 0, doctors: 0, patientsPerDay: 0 },
          bookingSettings: data.bookingSettings || {
            allowOnlineBooking: true,
            advanceBookingDays: 30,
            requiresConfirmation: false,
            cancellationPolicy: { en: '', ar: '' },
          },
          socialMedia: data.socialMedia || { facebook: '', instagram: '', twitter: '', website: '' },
          isActive: data.isActive !== undefined ? data.isActive : true,
        });
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Network error. Please try again.');
      } finally {
        setFetchLoading(false);
      }
    };
    fetchClinicData();
  }, [clinicId]);

  const validate = (): string => {
    if (!formData.name.en.trim()) return tr.validationName;
    if (!formData.name.ar.trim()) return tr.validationNameAr;
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return tr.validationEmail;
    if (formData.phone && !/^\+?[\d\s\-()]{7,20}$/.test(formData.phone)) return tr.validationPhone;
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setLoading(true);
    setError('');
    try {
      await updateClinic(clinicId, formData);
      router.push('/pages/owner/clinics');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="p-8 flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          <p className="mt-4 text-gray-400">{tr.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="p-4 sm:p-8 min-h-screen bg-gray-900">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-teal-400 hover:text-teal-300"
        >
          <BackIcon size={20} />
          {tr.back}
        </button>
      </div>

      <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{tr.title}</h1>
          <p className="text-gray-400">{tr.subtitle}</p>
        </div>

        {error && (
          <div className="bg-red-900/50 border-l-4 border-red-500 text-red-200 px-6 py-4 rounded-lg mb-6">
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

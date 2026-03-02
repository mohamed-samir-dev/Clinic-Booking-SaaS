'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, User } from 'lucide-react';
import { useClinics } from '../../add/hooks/useClinics';
import { useFetchDoctor } from './hooks/useFetchDoctor';
import { useUpdateDoctor } from './hooks/useUpdateDoctor';
import ClinicSection from '../../add/components/ClinicSection';
import PersonalInfoSection from '../../add/components/PersonalInfoSection';
import PhotoSection from '../../add/components/PhotoSection';
import SpecialtyExperienceSection from '../../add/components/SpecialtyExperienceSection';
import EducationSection from '../../add/components/EducationSection';
import SpecializationsSection from '../../add/components/SpecializationsSection';
import LocationSection from '../../add/components/LocationSection';
import WorkingHoursSection from '../../add/components/WorkingHoursSection';
import BookingInfoSection from '../../add/components/BookingInfoSection';
import ReviewsSection from '../../add/components/ReviewsSection';

export default function EditDoctorPage() {
  const router = useRouter();
  const params = useParams();
  const doctorId = params.id as string;

  const { clinics } = useClinics();
  const { formData, setFormData, loading: fetchingData, error: fetchError } = useFetchDoctor(doctorId);
  const { updateDoctor, loading, error } = useUpdateDoctor(doctorId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      await updateDoctor(formData);
    }
  };

  if (fetchingData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading doctor data...</p>
        </div>
      </div>
    );
  }

  if (fetchError || !formData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400">{fetchError || 'Doctor not found'}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-teal-400 hover:text-teal-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-teal-400 hover:text-teal-300 mb-4 font-medium transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
          <div className="bg-linear-to-r from-teal-600 to-cyan-600 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <User size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">Edit Doctor</h1>
                <p className="text-teal-50">Update doctor information</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {error && (
              <div className="bg-red-900/50 border-l-4 border-red-500 text-red-200 px-6 py-4 rounded-lg mb-4 flex items-center gap-3">
                <div className="bg-red-800 p-2 rounded-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <ClinicSection
                clinics={clinics}
                selectedClinicId={formData.clinicId}
                onChange={(clinicId) => setFormData({ ...formData, clinicId })}
              />

              <PersonalInfoSection
                formData={formData}
                onUpdate={(data) => setFormData({ ...formData, ...data })}
                isEditMode={true}
              />

              <PhotoSection
                photoUrl={formData.photoUrl}
                onChange={(photoUrl) => setFormData({ ...formData, photoUrl })}
              />

              <SpecialtyExperienceSection
                formData={formData}
                onUpdate={(data) => setFormData({ ...formData, ...data })}
              />

              <EducationSection
                education={formData.education}
                onUpdate={(education) => setFormData({ ...formData, education })}
              />

              <SpecializationsSection
                specializations={formData.specializations}
                onUpdate={(specializations) => setFormData({ ...formData, specializations })}
              />

              <LocationSection
                address={formData.address}
                city={formData.city}
                onUpdate={(data) => setFormData({ ...formData, ...data })}
              />

              <WorkingHoursSection
                availability={formData.availability}
                onUpdate={(availability) => setFormData({ ...formData, availability })}
              />

              <BookingInfoSection
                formData={formData}
                onUpdate={(data) => setFormData({ ...formData, ...data })}
              />

              <ReviewsSection
                reviews={formData.reviews}
                onUpdate={(reviews) => setFormData({ ...formData, reviews })}
              />

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-linear-to-r from-teal-600 to-cyan-600 text-white px-8 py-3 rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {loading ? 'Updating...' : 'Update Doctor'}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 bg-gray-700 text-gray-300 px-8 py-3 rounded-xl hover:bg-gray-600 transition-all font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

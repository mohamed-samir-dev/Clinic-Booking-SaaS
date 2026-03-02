'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useClinicForm } from '../hooks/useClinicForm';
import BasicInfo from '../components/BasicInfo';
import MediaSection from '../components/MediaSection';
import ContactInfo from '../components/ContactInfo';
import CapacitySection from '../components/CapacitySection';
import WorkingHours from '../components/WorkingHours';
import FacilitiesList from '../components/FacilitiesList';
import BookingSettings from '../components/BookingSettings';
import SocialMedia from '../components/SocialMedia';
import StatusSection from '../components/StatusSection';

export default function AddClinicPage() {
  const router = useRouter();
  const { formData, setFormData, loading, error, handleSubmit } = useClinicForm();

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white"
        >
          <ArrowLeft size={20} />
          Back
        </button>
      </div>

      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Add New Clinic</h1>
          <p className="text-gray-400">Fill in the details to create a new clinic</p>
        </div>

        {error && (
          <div className="bg-red-900/20 border-l-4 border-red-500 text-red-400 px-6 py-4 rounded-lg mb-6">
            <p className="font-medium">Error</p>
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
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 disabled:bg-gray-600 transition-all shadow-lg"
            >
              {loading ? 'Saving...' : 'Create Clinic'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useClinics } from '../../doctors/add/hooks/useClinics';
import { useManagerForm } from './hooks/useManagerForm';
import {
  FormHeader,
  ErrorAlert,
  BasicInfoSection,
  SecuritySection,
  ClinicAssignmentSection,
  PermissionsSection,
  StatusSection,
  FormActions,
} from './components';

export default function AddManagerPage() {
  const router = useRouter();
  const { clinics } = useClinics();
  const { formData, setFormData, loading, error, handleSubmit } = useManagerForm();

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-teal-400 hover:text-teal-300 mb-4 font-medium transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
          <FormHeader title="Add New Manager" subtitle="Create a new clinic manager account" />

          <div className="p-6">
            {error && <ErrorAlert message={error} />}

            <form onSubmit={handleSubmit} className="space-y-6">
              <BasicInfoSection formData={formData} setFormData={setFormData} />
              <SecuritySection formData={formData} setFormData={setFormData} />
              <ClinicAssignmentSection formData={formData} setFormData={setFormData} clinics={clinics} />
              <PermissionsSection formData={formData} setFormData={setFormData} />
              <StatusSection formData={formData} setFormData={setFormData} />
              <FormActions loading={loading} onCancel={() => router.back()} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClinicFormData } from '../types';
import { INITIAL_CLINIC_DATA } from '../utils/constants';
import { createClinic } from '../utils/api';

export const useClinicForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<ClinicFormData>(INITIAL_CLINIC_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validate = (): string => {
    if (!formData.name.en.trim()) return 'Clinic name in English is required';
    if (!formData.name.ar.trim()) return 'Clinic name in Arabic is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Invalid email address';
    if (formData.phone && !/^\+?[\d\s\-()]{7,20}$/.test(formData.phone)) return 'Invalid phone number';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setError('');
    try {
      await createClinic({ ...formData, type: 'branch' } as ClinicFormData & { type: string });
      router.push('/pages/owner/clinics');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { formData, setFormData, loading, error, handleSubmit };
};

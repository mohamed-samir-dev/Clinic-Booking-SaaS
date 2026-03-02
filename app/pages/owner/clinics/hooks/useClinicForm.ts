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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createClinic(formData);
      router.push('/pages/owner/clinics');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { formData, setFormData, loading, error, handleSubmit };
};

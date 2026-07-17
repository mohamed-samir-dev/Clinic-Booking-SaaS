import { useState, useEffect } from 'react';
import { api } from '../../../lib/api';
import { Doctor } from '../../../types/index';
import { Filters } from '../types/type';
import { useDebounce } from '@/app/hooks/useDebounce';


export const useDoctors = (filters: Filters) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const debouncedFilters = useDebounce(filters, 400);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      setError(null);
      try {
        const filterParams: Record<string, string | number | boolean> = {};
        if (debouncedFilters.specialty) filterParams.specialty = debouncedFilters.specialty;
        if (debouncedFilters.gender) filterParams.gender = debouncedFilters.gender;
        if (debouncedFilters.isAvailableToday) filterParams.isAvailableToday = true;
        if (debouncedFilters.minExperience > 0) filterParams.minExperience = debouncedFilters.minExperience;

        const data = await api.doctors.getAll(filterParams);
        setDoctors(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch doctors:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch doctors'));
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [debouncedFilters]);

  return { doctors, loading, error };
};

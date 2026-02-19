import { useState, useEffect } from 'react';
import { api } from '../../../lib/api';
import { Doctor } from '../../../types/index';
import {Filters}from '../types/type'


export const useDoctors = (filters: Filters) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      setError(null);
      try {
        const filterParams: Record<string, string | number | boolean> = {};
        if (filters.specialty) filterParams.specialty = filters.specialty;
        if (filters.gender) filterParams.gender = filters.gender;
        if (filters.isAvailableToday) filterParams.isAvailableToday = true;
        if (filters.minExperience > 0) filterParams.minExperience = filters.minExperience;

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
  }, [filters]);

  return { doctors, loading, error };
};

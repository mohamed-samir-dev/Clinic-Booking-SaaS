import { useEffect, useState } from 'react';
import { Doctor } from '../../types/types';

export function useFetchDoctors(specialty: string) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopDoctors = async () => {
      try {
        const url = `/api/doctors/top?specialty=${encodeURIComponent(specialty)}&limit=4`;
        const response = await fetch(url);
        if (!response.ok) {
          setLoading(false);
          return;
        }
        const data = await response.json();
        setDoctors(data || []);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    if (specialty) {
      fetchTopDoctors();
    }
  }, [specialty]);

  return { doctors, loading };
}

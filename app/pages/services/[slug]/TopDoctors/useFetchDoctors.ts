import { useEffect, useState } from 'react';
import { Doctor } from '../../types/types';

export function useFetchDoctors(specialty: string) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopDoctors = async () => {
      try {
        console.log('Fetching doctors for specialty:', specialty);
        const url = `/api/doctors/top?specialty=${encodeURIComponent(specialty)}&limit=4`;
        console.log('Request URL:', url);
        const response = await fetch(url);
        if (!response.ok) {
          console.error('API response not ok:', response.status);
          setLoading(false);
          return;
        }
        const data = await response.json();
        console.log('Fetched doctors:', data);
        console.log('Doctors specialties:', data.map((d: Doctor) => d.specialty.en));
        setDoctors(data || []);
      } catch (error) {
        console.error('Error fetching top doctors:', error);
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

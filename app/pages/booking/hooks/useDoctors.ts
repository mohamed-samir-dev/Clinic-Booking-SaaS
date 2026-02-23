import { useState, useEffect } from 'react';
import { api } from '@/app/lib/api';
import { Doctor } from '@/app/types/index';

interface DoctorsResponse {
  doctors?: Doctor[];
  data?: Doctor[];
}

export const useDoctors = (selectedService: string, currentStep: number, forceLoad = false) => {
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  useEffect(() => {
    if (!selectedService || (currentStep !== 2 && !forceLoad)) return;

    const fetchDoctors = async () => {
      setLoadingDoctors(true);
      try {
        const response = await api.doctors.getAll() as DoctorsResponse | Doctor[];
        const data = (response as DoctorsResponse)?.doctors || (response as DoctorsResponse)?.data || response || [];
        const doctorsData = Array.isArray(data) ? data : [];
        const filtered = doctorsData.filter((d: Doctor) => {
          const specialty = typeof d.specialty === 'object' ? d.specialty?.en : d.specialty;
          return typeof specialty === 'string' && specialty.toLowerCase() === selectedService.toLowerCase();
        });
        setAllDoctors(filtered);
      } catch {
        setAllDoctors([]);
      } finally {
        setLoadingDoctors(false);
      }
    };

    fetchDoctors();
  }, [selectedService, currentStep, forceLoad]);

  return { allDoctors, loadingDoctors };
};

import { useState, useEffect } from 'react';
import { api } from '@/app/lib/api';
import { Doctor } from '@/app/types/index';

interface DoctorsResponse {
  doctors?: Doctor[];
  data?: Doctor[];
}

// map من الـ service key للـ specialty title في الداتابيز
const SERVICE_KEY_TO_SPECIALTY: Record<string, string> = {
  generalMedicine: 'General Medicine',
  pediatrics:      'Pediatrics',
  dermatology:     'Dermatology',
  dentistry:       'Dentistry',
  gynecology:      'Gynecology',
  orthopedics:     'Orthopedics',
  cardiology:      'Cardiology',
  ent:             'ENT',
};

export const useDoctors = (selectedService: string, currentStep: number, forceLoad = false) => {
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  useEffect(() => {
    if (!selectedService || (currentStep !== 2 && !forceLoad)) return;

    const fetchDoctors = async () => {
      setLoadingDoctors(true);
      try {
        // حوّل الـ key لـ specialty title الحقيقي في الداتابيز
        const specialtyTitle = SERVICE_KEY_TO_SPECIALTY[selectedService] || selectedService;

        const response = await api.doctors.getAll({ specialty: specialtyTitle }) as DoctorsResponse | Doctor[];
        const data = (response as DoctorsResponse)?.doctors || (response as DoctorsResponse)?.data || response || [];
        setAllDoctors(Array.isArray(data) ? data : []);
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

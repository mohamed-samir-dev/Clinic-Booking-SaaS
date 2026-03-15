import { useState, useEffect } from 'react';
import { Doctor } from '@/app/types/index';
import { DayAvailability } from '../types';

export const useDoctorData = (doctorId: string | undefined, selectedDoctor: Doctor | string | undefined) => {
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [consultationDuration, setConsultationDuration] = useState(30);
  const [loading, setLoading] = useState(false);
  const [doctorData, setDoctorData] = useState<Doctor | null>(null);

  useEffect(() => {
    if (!doctorId) {
      setAvailability([]);
      setDoctorData(null);
      return;
    }

    let isMounted = true;
    
    const fetchData = async () => {
      try {
        const availabilityRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors/${doctorId}/availability`);
        const availabilityData = await availabilityRes.json();
        
        if (isMounted) {
          setAvailability(availabilityData.availability || []);
          setConsultationDuration(availabilityData.consultationDuration || 30);
        }

        if (typeof selectedDoctor === 'string') {
          const doctorRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors/${doctorId}`);
          const doctorData = await doctorRes.json();
          
          if (isMounted) {
            setDoctorData(doctorData);
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    setLoading(true);
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [doctorId, selectedDoctor]);

  return { availability, consultationDuration, loading, doctorData };
};

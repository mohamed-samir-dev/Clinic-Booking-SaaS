import { useState, useEffect } from 'react';
import { FormData } from '../../../add/types';

export const useFetchDoctor = (doctorId: string) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/owner/doctors`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (response.ok) {
          const doctors = await response.json();
          const doctor = doctors.find((d: { _id: string }) => d._id === doctorId);
          
          if (doctor) {
            const updatedFormData: FormData = {
              clinicId: doctor.clinicId?._id || doctor.clinicId || '',
              firstName: doctor.firstName || '',
              lastName: doctor.lastName || '',
              name: { en: doctor.name?.en || '', ar: doctor.name?.ar || '' },
              email: doctor.email || '',
              password: '',
              phone: doctor.phone || '',
              specialty: { en: doctor.specialty?.en || '', ar: doctor.specialty?.ar || '' },
              title: doctor.title || 'Dr',
              photoUrl: doctor.photoUrl || '',
              bloodType: doctor.bloodType || '',
              bio: { 
                en: typeof doctor.bio === 'object' ? doctor.bio?.en || '' : doctor.bio || '',
                ar: typeof doctor.bio === 'object' ? doctor.bio?.ar || '' : ''
              },
              brief: { 
                en: typeof doctor.brief === 'object' ? doctor.brief?.en || '' : doctor.brief || '',
                ar: typeof doctor.brief === 'object' ? doctor.brief?.ar || '' : ''
              },
              aboutUs: { 
                en: typeof doctor.aboutUs === 'object' ? doctor.aboutUs?.en || '' : doctor.aboutUs || '',
                ar: typeof doctor.aboutUs === 'object' ? doctor.aboutUs?.ar || '' : ''
              },
              experienceYears: doctor.experienceYears?.toString() || '',
              gender: doctor.gender || 'male',
              languages: Array.isArray(doctor.languages) ? doctor.languages.join(', ') : '',
              fees: doctor.fees?.toString() || '',
              followUpFees: doctor.followUpFees?.toString() || '',
              consultationDuration: doctor.consultationDuration?.toString() || '20',
              availability: Array.isArray(doctor.availability) ? doctor.availability : [],
              maxAppointmentsPerDay: doctor.bookingSettings?.maxAppointmentsPerDay?.toString() || '20',
              allowOnlineBooking: doctor.bookingSettings?.allowOnlineBooking ?? true,
              requiresConfirmation: doctor.bookingSettings?.requiresConfirmation ?? false,
              tags: Array.isArray(doctor.tags) ? doctor.tags.join(', ') : '',
              isFeatured: doctor.isFeatured ?? false,
              address: doctor.location?.address || '',
              city: doctor.location?.city || '',
              currency: doctor.currency || '',
              slotDuration: doctor.slotDuration?.toString() || '',
              bufferBefore: doctor.bufferBefore?.toString() || '',
              bufferAfter: doctor.bufferAfter?.toString() || '',
              maxPatientsPerSlot: doctor.maxPatientsPerSlot?.toString() || '',
              minNoticeMinutes: doctor.minNoticeMinutes?.toString() || '',
              reviews: Array.isArray(doctor.reviews) ? doctor.reviews : [],
              education: Array.isArray(doctor.education) ? doctor.education : [],
              specializations: Array.isArray(doctor.specializations) && doctor.specializations.length > 0
                ? doctor.specializations.map((spec: string | { en?: string; ar?: string }) => {
                    if (typeof spec === 'string') {
                      return { en: spec, ar: '' };
                    }
                    return {
                      en: spec.en || '',
                      ar: spec.ar || ''
                    };
                  })
                : [],
            };
            setFormData(updatedFormData);
          } else {
            setError('Doctor not found');
          }
        } else {
          setError('Failed to load doctors');
        }
      } catch  {
        setError('Failed to load doctor data');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [doctorId]);

  return { formData, setFormData, loading, error };
};

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormData } from '../../../add/types';

export const useUpdateDoctor = (doctorId: string) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateDoctor = async (formData: FormData) => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const payload: any = {
        clinicId: formData.clinicId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        specialty: formData.specialty,
        title: formData.title,
        photoUrl: formData.photoUrl || undefined,
        bloodType: formData.bloodType || undefined,
        bio: formData.bio || undefined,
        brief: formData.brief || undefined,
        aboutUs: formData.aboutUs || undefined,
        experienceYears: Number(formData.experienceYears) || 0,
        gender: formData.gender,
        languages: formData.languages.split(',').map(l => l.trim()).filter(Boolean),
        fees: Number(formData.fees),
        followUpFees: formData.followUpFees ? Number(formData.followUpFees) : undefined,
        consultationDuration: Number(formData.consultationDuration),
        availability: formData.availability,
        bookingSettings: {
          maxAppointmentsPerDay: Number(formData.maxAppointmentsPerDay),
          allowOnlineBooking: formData.allowOnlineBooking,
          requiresConfirmation: formData.requiresConfirmation,
        },
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        isFeatured: formData.isFeatured,
        location: {
          address: formData.address || undefined,
          city: formData.city || undefined,
        },
        reviews: formData.reviews,
        education: formData.education,
        specializations: formData.specializations,
      };

      if (formData.currency) payload.currency = formData.currency;
      if (formData.slotDuration) payload.slotDuration = Number(formData.slotDuration);
      if (formData.bufferBefore) payload.bufferBefore = Number(formData.bufferBefore);
      if (formData.bufferAfter) payload.bufferAfter = Number(formData.bufferAfter);
      if (formData.maxPatientsPerSlot) payload.maxPatientsPerSlot = Number(formData.maxPatientsPerSlot);
      if (formData.minNoticeMinutes) payload.minNoticeMinutes = Number(formData.minNoticeMinutes);
      if (formData.password && formData.password.trim()) payload.password = formData.password;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/owner/doctors/${doctorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/pages/owner/doctors');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update doctor');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { updateDoctor, loading, error };
};

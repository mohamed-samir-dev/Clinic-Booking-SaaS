import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormData, DoctorPayload } from '../types';

export const useSubmitDoctor = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitDoctor = async (formData: FormData) => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const payload: DoctorPayload = {
        clinicId: formData.clinicId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: {
          en: formData.name.en || `${formData.firstName} ${formData.lastName}`,
          ar: formData.name.ar || `${formData.firstName} ${formData.lastName}`
        },
        email: formData.email,
        specialty: formData.specialty,
        title: formData.title,
        experienceYears: Number(formData.experienceYears) || 0,
        gender: formData.gender,
        fees: Number(formData.fees),
        consultationDuration: Number(formData.consultationDuration),
        availability: formData.availability,
        bookingSettings: {
          maxAppointmentsPerDay: Number(formData.maxAppointmentsPerDay),
          allowOnlineBooking: formData.allowOnlineBooking,
          requiresConfirmation: formData.requiresConfirmation,
        },
        education: formData.education,
        specializations: formData.specializations,
      };

      if (formData.phone) payload.phone = formData.phone;
      if (formData.photoUrl) payload.photoUrl = formData.photoUrl;
      if (formData.bloodType) payload.bloodType = formData.bloodType;
      if (formData.bio) payload.bio = formData.bio;
      if (formData.brief) payload.brief = formData.brief;
      if (formData.aboutUs) payload.aboutUs = formData.aboutUs;
      if (formData.followUpFees) payload.followUpFees = Number(formData.followUpFees);
      if (formData.languages) payload.languages = formData.languages.split(',').map(l => l.trim()).filter(Boolean);
      if (formData.tags) payload.tags = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
      if (formData.isFeatured) payload.isFeatured = formData.isFeatured;
      if (formData.address || formData.city) {
        payload.location = {};
        if (formData.address) payload.location.address = formData.address;
        if (formData.city) payload.location.city = formData.city;
      }
      if (formData.password) {
        payload.auth = { passwordHash: formData.password };
      }
      if (formData.reviews.length > 0) payload.reviews = formData.reviews;

      const response = await fetch('http://localhost:5000/api/owner/doctors', {
        method: 'POST',
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
        setError(data.message || 'Failed to create doctor');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { submitDoctor, loading, error };
};

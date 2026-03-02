import { useState } from 'react';
import { FormData } from '../types';

export const useFormData = () => {
  const [formData, setFormData] = useState<FormData>({
    clinicId: '',
    firstName: '',
    lastName: '',
    name: { en: '', ar: '' },
    email: '',
    phone: '',
    specialty: { en: '', ar: '' },
    title: 'Dr',
    photoUrl: '',
    bloodType: '',
    bio: { en: '', ar: '' },
    brief: { en: '', ar: '' },
    aboutUs: { en: '', ar: '' },
    experienceYears: '',
    gender: 'male',
    languages: '',
    fees: '',
    followUpFees: '',
    consultationDuration: '20',
    availability: [],
    maxAppointmentsPerDay: '20',
    allowOnlineBooking: true,
    requiresConfirmation: false,
    tags: '',
    isFeatured: false,
    address: '',
    city: '',
    password: '',
    currency: '',
    slotDuration: '',
    bufferBefore: '',
    bufferAfter: '',
    maxPatientsPerSlot: '',
    minNoticeMinutes: '',
    reviews: [],
    education: [],
    specializations: [],
  });

  return { formData, setFormData };
};

import { ClinicFormData } from '../types';

export const API_BASE_URL = 'http://localhost:5000/api/owner/clinics';

export const INITIAL_CLINIC_DATA: ClinicFormData = {
  name: { en: '', ar: '' },
  brief: { en: '', ar: '' },
  description: { en: '', ar: '' },
  address: { en: '', ar: '' },
  phone: '',
  email: '',
  logo: '',
  images: [],
  location: { coordinates: [0, 0] },
  workingHours: {},
  facilities: [],
  capacity: { rooms: 0, doctors: 0, patientsPerDay: 0 },
  bookingSettings: {
    allowOnlineBooking: true,
    advanceBookingDays: 30,
    requiresConfirmation: false,
    cancellationPolicy: { en: '', ar: '' },
  },
  socialMedia: { facebook: '', instagram: '', twitter: '', website: '' },
  isActive: true,
};

export interface Clinic {
  _id: string;
  name: { en: string; ar: string };
}

export interface DoctorPayload {
  clinicId: string;
  firstName: string;
  lastName: string;
  name: { en: string; ar: string };
  email: string;
  specialty: { en: string; ar: string };
  title: string;
  experienceYears: number;
  gender: string;
  fees: number;
  consultationDuration: number;
  availability: Array<{ day: string; slots: Array<{ from: string; to: string }>; workingHours?: { from: string; to: string } }>;
  bookingSettings: {
    maxAppointmentsPerDay: number;
    allowOnlineBooking: boolean;
    requiresConfirmation: boolean;
  };
  phone?: string;
  photoUrl?: string;
  bloodType?: string;
  bio?: { en: string; ar: string };
  brief?: { en: string; ar: string };
  aboutUs?: { en: string; ar: string };
  followUpFees?: number;
  languages?: string[];
  tags?: string[];
  isFeatured?: boolean;
  location?: {
    address?: string;
    city?: string;
  };
  auth?: {
    passwordHash: string;
  };
  reviews?: Array<{ patientName: string; rating: number; comment: string; date: string }>;
  education: Array<{ degree: string; institution: string; year: string }>;
  specializations: Array<{ en: string; ar: string }>;
}

export interface FormData {
  clinicId: string;
  firstName: string;
  lastName: string;
  name: { en: string; ar: string };
  email: string;
  phone: string;
  specialty: { en: string; ar: string };
  title: string;
  photoUrl: string;
  bloodType: string;
  bio: { en: string; ar: string };
  brief: { en: string; ar: string };
  aboutUs: { en: string; ar: string };
  experienceYears: string;
  gender: string;
  languages: string;
  fees: string;
  followUpFees: string;
  consultationDuration: string;
  availability: Array<{ day: string; slots: Array<{ from: string; to: string }>; workingHours?: { from: string; to: string } }>;
  maxAppointmentsPerDay: string;
  allowOnlineBooking: boolean;
  requiresConfirmation: boolean;
  tags: string;
  isFeatured: boolean;
  address: string;
  city: string;
  password: string;
  currency: string;
  slotDuration: string;
  bufferBefore: string;
  bufferAfter: string;
  maxPatientsPerSlot: string;
  minNoticeMinutes: string;
  reviews: Array<{ patientName: string; rating: number; comment: string; date: string }>;
  education: Array<{ degree: string; institution: string; year: string }>;
  specializations: Array<{ en: string; ar: string }>;
}

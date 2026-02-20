export interface Clinic {
  _id: string;
  name: { en: string; ar: string };
  brief?: { en: string; ar: string };
  description?: { en: string; ar: string };
  logo?: string;
  images?: string[];
  address?: { en: string; ar: string };
  phone?: string;
  email?: string;
  capacity?: { rooms: number; doctors: number; patientsPerDay: number };
  workingHours?: Record<string, { isOpen: boolean; openTime: string; closeTime: string }>;
  facilities?: Array<{ name: { en: string; ar: string }; icon?: string }>;
  bookingSettings?: {
    allowOnlineBooking: boolean;
    advanceBookingDays: number;
    cancellationPolicy?: { en: string; ar: string };
  };
  socialMedia?: { facebook?: string; instagram?: string; twitter?: string; website?: string };
}

export interface Doctor {
  _id: string;
  name: { en: string; ar: string };
  specialty: { en: string; ar: string };
  experienceYears: number;
  photoUrl: string;
  isAvailableToday: boolean;
  clinicId?: string | { _id: string };
}


export interface ImageModalProps {
  selectedImage: string;
  selectedImageIndex: number;
  totalImages: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}
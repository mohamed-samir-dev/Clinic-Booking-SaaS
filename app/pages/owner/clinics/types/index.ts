export interface BilingualText {
  en: string;
  ar: string;
}

export interface WorkingHours {
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface Facility {
  name: BilingualText;
  icon: string;
}

export interface ClinicFormData {
  name: BilingualText;
  brief: BilingualText;
  description: BilingualText;
  address: BilingualText;
  phone: string;
  email: string;
  logo: string;
  images: string[];
  location: { coordinates: [number, number] };
  workingHours: Record<string, WorkingHours>;
  facilities: Facility[];
  capacity: { rooms: number; doctors: number; patientsPerDay: number };
  bookingSettings: {
    allowOnlineBooking: boolean;
    advanceBookingDays: number;
    requiresConfirmation: boolean;
    cancellationPolicy: BilingualText;
  };
  socialMedia: { facebook: string; instagram: string; twitter: string; website: string };
  isActive: boolean;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';

export interface Appointment {
  _id: string;
  doctorId: {
    _id: string;
    name: string | { en: string; ar: string };
    specialty?: string | { en: string; ar: string };
    photoUrl?: string;
    clinicId?: {
      _id: string;
      name: string | { en: string; ar: string };
    };
  };
  businessId?: {
    _id: string;
    name: string | { en: string; ar: string };
    location?: {
      coordinates?: [number, number];
      address?: string;
    };
  };
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  service?: string | { en: string; ar: string };
  reason?: string;
  notes?: string;
  fee?: number;
  paid?: boolean;
  paymentMethod?: 'online' | 'cash';
  type?: 'consultation' | 'follow-up' | 'emergency' | 'checkup';
  cancelledBy?: 'patient' | 'doctor' | 'manager' | 'system';
  cancelledAt?: string;
  cancellationReason?: string;
  hasReview?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentFilters {
  search?: string;
  status?: AppointmentStatus;
  sortBy?: 'newest' | 'oldest';
}

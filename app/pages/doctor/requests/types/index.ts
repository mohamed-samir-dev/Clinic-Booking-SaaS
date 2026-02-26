export interface Appointment {
  _id: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: string;
  type: string;
  reason?: string;
  createdAt: string;
  patientId?: { name: string; phone?: string; email?: string };
  guestData?: { fullName: string; phone?: string; email?: string };
}

export interface RootState {
  auth: {
    user: { name?: string } | null;
    token: string | null;
  };
}

export type FilterType = 'all' | 'pending' | 'confirmed' | 'cancelled';

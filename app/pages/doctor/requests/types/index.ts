export interface Appointment {
  _id: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: string;
  type: string;
  reason?: string;
  createdAt: string;
  patientId?: { _id?: string; name: string; phone?: string; email?: string };
  guestData?: { fullName: string; phone?: string; email?: string };
}

export interface RootState {
  auth: {
    user: { name?: string } | null;
    token: string | null;
  };
}

export type FilterType = 'all' | 'pending' | 'confirmed' | 'cancelled';

export interface MedicalInfo {
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: string;
  bloodType?: string;
  height?: number;
  weight?: number;
  allergies?: string[];
  chronicConditions?: string[];
  chronicConditionsOther?: string;
  currentMedications?: {
    name: string;
    dosage?: string;
    frequency?: string;
    notes?: string;
  }[];
  notesForDoctor?: string;
}

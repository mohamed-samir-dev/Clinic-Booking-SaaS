export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  notes: string;
}

export interface MedicalInfo {
  bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | '';
  height?: number | string;
  weight?: number | string;
  allergies?: string[];
  chronicConditions?: string[];
  chronicConditionsOther?: string;
  currentMedications?: Medication[];
  notesForDoctor?: string;
}

export interface PatientProfile {
  _id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: Date | string;
  gender?: 'male' | 'female';
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  height?: number;
  weight?: number;
  allergies?: string[];
  chronicConditions?: string[];
  chronicConditionsOther?: string;
  currentMedications?: Medication[];
  notesForDoctor?: string;
  medicalHistory?: string[];
  isActive: boolean;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FavoriteItem {
  _id: string;
  type: 'doctor' | 'clinic' | 'service';
  itemId: string;
  name: string;
  image?: string;
  description?: string;
  createdAt: Date;
}

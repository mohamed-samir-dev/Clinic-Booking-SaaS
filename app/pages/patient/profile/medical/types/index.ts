export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  notes: string;
}

export interface MedicalFormData {
  bloodType: string;
  height: string;
  weight: string;
  allergies: string[];
  chronicConditions: string[];
  chronicConditionsOther: string;
  currentMedications: Medication[];
  notesForDoctor: string;
}

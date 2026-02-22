import { Doctor } from '@/app/types/index';

export interface BookingData {
  appointmentId: string;
  doctor: { name: string; specialty: string; photoUrl: string };
  patient: { fullName: string; email: string; phone: string };
  appointmentDate: string;
  startTime: string;
  endTime: string;
  service: string;
  fee: number;
  status: string;
}

export interface PatientFormData {
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  reason: string;
}

export interface UseBookingParams {
  selectedDoctor?: Doctor;
  selectedService: string;
  selectedDate: Date | null;
  selectedTime: string;
}

export interface CreateAppointmentParams {
  selectedDoctor: Doctor;
  selectedDate: Date;
  selectedTime: string;
  selectedService: string;
  patientData: PatientFormData;
  user: unknown;
  token: string | null;
}
export interface CreateAppointmentParams {
  selectedDoctor: Doctor;
  selectedDate: Date;
  selectedTime: string;
  selectedService: string;
  patientData: PatientFormData;
  user: unknown;
  token: string | null;
}

export interface BasicInformationProps {
  fullName: string;
  setFullName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
}

export interface MedicalContextProps {
  reason: string;
  setReason: (value: string) => void;
  file: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface PatientDemographicsProps {
  dateOfBirth: string;
  setDateOfBirth: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
}
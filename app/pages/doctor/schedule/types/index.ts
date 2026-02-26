export interface Appointment {
  _id: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: string;
  type: string;
  reason?: string;
  patientId?: { name: string; phone?: string };
  guestData?: { fullName: string; phone?: string };
}

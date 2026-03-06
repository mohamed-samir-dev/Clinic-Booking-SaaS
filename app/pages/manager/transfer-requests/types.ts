export interface TransferRequest {
  _id: string;
  doctorId: {
    firstName: string;
    lastName: string;
    email: string;
    specialty: { en: string; ar: string } | string;
  };
  toClinicId: {
    name: { en: string; ar: string } | string;
  };
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  doctorResponse?: string;
  managerResponse?: string;
  createdAt: string;
  respondedAt?: string;
}

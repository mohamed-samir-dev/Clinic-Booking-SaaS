export interface TransferRequest {
  _id: string;
  managerId: {
    name: { en: string; ar: string } | string;
    email: string;
    phone?: string;
  };
  toClinicId: {
    name: { en: string; ar: string } | string;
    address?: string;
    phone?: string;
  };
  fromClinicId: {
    name: { en: string; ar: string } | string;
  };
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  doctorResponse?: string;
  managerResponse?: string;
  createdAt: string;
  respondedAt?: string;
}

export type ActionType = 'accept' | 'reject' | 'message';

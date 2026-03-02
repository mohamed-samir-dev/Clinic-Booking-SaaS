export interface Doctor {
  _id: string;
  name: {
    en?: string;
    ar?: string;
  };
  email: string;
  phone: string;
  specialty?: {
    en?: string;
    ar?: string;
  };
  photoUrl?: string;
  fees?: number;
  followUpFees?: number;
  status?: 'active' | 'inactive';
  availability?: Array<{
    day: string;
    slots: Array<{
      from: string;
      to: string;
    }>;
  }>;
}

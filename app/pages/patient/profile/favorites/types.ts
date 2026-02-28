export type TabType = 'doctors' | 'clinics';

export interface Clinic {
  _id: string;
  name: { en: string; ar: string };
  logo?: string;
  address?: { en: string; ar: string };
  phone?: string;
}

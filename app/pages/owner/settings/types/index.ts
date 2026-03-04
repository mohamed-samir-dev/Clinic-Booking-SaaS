export interface ClinicData {
  name: { en: string; ar: string };
  email: string;
  phone: string;
  address: { en: string; ar: string; city: string; country: string };
  website: string;
}

export interface OwnerData {
  name: string;
  email: string;
  phone: string;
}

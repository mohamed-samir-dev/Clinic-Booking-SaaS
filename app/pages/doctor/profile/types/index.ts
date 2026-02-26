export interface DoctorProfile {
  _id: string;
  firstName: string;
  lastName: string;
  name: { en: string; ar: string };
  specialty: { en: string; ar: string };
  title: string;
  photoUrl?: string;
  bio?: { en: string; ar: string };
  brief?: { en: string; ar: string };
  aboutUs?: { en: string; ar: string };
  experienceYears: number;
  languages: string[];
  education: Array<{ degree: string; institution: string; year: string }>;
  specializations: Array<{ en: string; ar: string }>;
  gender: string;
  bloodType?: string;
  phone: string;
  email: string;
  location?: { address: string; city: string; mapsLink: string };
  fees: number;
  followUpFees?: number;
  consultationDuration: number;
  ratingAvg: number;
  ratingCount: number;
  status: string;
  clinicId: string;
  availability: Array<{
    day: string;
    slots: Array<{ from: string; to: string }>;
    workingHours?: { from: string; to: string };
  }>;
}

export interface ClinicWorkingHours {
  [key: string]: {
    isOpen: boolean;
    openTime: string;
    closeTime: string;
  };
}

export interface EditData {
  firstName: string;
  lastName: string;
  email: string;
  fees: number;
  consultationDuration: number;
  phone: string;
  location: { address: string; city: string };
  password: string;
  aboutUs: string;
  availability: Array<{ day: string; slots: Array<{ from: string; to: string }> }>;
  education: Array<{ degree: string; institution: string; year: string }>;
}


export interface ContactInfoProps {
  profile: DoctorProfile;
  editingField: 'name' | 'fees' | 'duration' | 'email' | 'phone' | 'location' | 'password' | 'about' | 'education' | null;
  editData: EditData;
  setEditData: (data: EditData) => void;
  onEdit: (field: 'email' | 'phone' | 'location') => void;
  onSave: (field: 'email' | 'phone' | 'location') => void;
  onCancel: (field: 'email' | 'phone' | 'location') => void;
  saving: boolean;
  theme: 'light' | 'dark';
}
// hero section

import { IconType } from 'react-icons';

export interface InfoCardProps {
    icon: IconType;
    iconColor: string;
    iconBgColor: string;
    label: string;
    value: string;
    className?: string;
  }
//   doctor Secton
  export interface DoctorCardProps {
    id: string;
    name: { en: string; ar: string };
    specialty: { en: string; ar: string };
    experienceYears: number;
    photoUrl: string;
    isAvailableToday: boolean;
    clinicName?: { en: string; ar: string };
    availability?: Array<{
      day: string;
      slots: Array<{ from: string; to: string }>;
      workingHours?: { from: string; to: string };
    }>;
  }

  export interface Doctor {
    _id: string;
    name: { en: string; ar: string };
    specialty: { en: string; ar: string };
    brief?: { en: string; ar: string };
    aboutUs?: string;
    experienceYears: number;
    photoUrl: string;
    isAvailableToday: boolean;
    gender?: string;
    bloodType?: string;
    fees?: number;
    ratingAvg?: number;
    ratingCount?: number;
    phone?: string;
    email?: string;
    languages?: string[];
    specializations?: string[];
    clinicId?: {
      _id: string;
      name: { en: string; ar: string };
    };
    education?: Array<{
      degree?: string;
      institution?: string;
      year?: string;
    }>;
    location?: {
      address?: string;
      city?: string;
      mapsLink?: string;
    };
    reviews?: Array<{
      patientName?: string;
      rating: number;
      comment?: string;
      date: string;
    }>;
    availability?: Array<{
      day: string;
      slots: Array<{ from: string; to: string }>;
      workingHours?: { from: string; to: string };
    }>;
  }
  
//   Review Section
export interface Review {
    _id: string;
    rating: number;
    comment: string;
    patientId: {
      name: string;
    };
    createdAt: string;
  }
  export interface ReviewStats {
    totalReviews: number;
    averageRating: number;
    ratingDistribution: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  }
//   Navbar Section
  export  type Language = 'AR' | 'EN';
  export type Theme = 'light' | 'dark';
  
  export interface User {
    name?: string;
    email?: string;
    role?: string;
  }
  export interface UserMenuProps {
    user: User | null;
    showDropdown: boolean;
    setShowDropdown: (show: boolean) => void;
    handleLogout: () => void;
  }
  export interface MobileMenuProps {
    pathname: string;
    user: User | null;
    locale: 'en' | 'ar';
    theme: Theme;
    toggleLanguage: () => void;
    setTheme: () => void;
    setMobileMenuOpen: (open: boolean) => void;
    handleLogout: () => void;
  }
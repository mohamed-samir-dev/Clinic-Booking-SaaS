import { Doctor } from '@/app/types/index';

export interface FiltersSidebarProps {
    doctorSearchQuery: string;
    setDoctorSearchQuery: (query: string) => void;
    selectedGender: string;
    setSelectedGender: (gender: string) => void;
    selectedLanguage: string;
    setSelectedLanguage: (language: string) => void;
    priceRange: number[];
    setPriceRange: (range: number[]) => void;
    filterOptions: { genders: string[]; languages: string[]; priceRange: [number, number] };
    clearFilters: () => void;
  }
  export interface DoctorCardProps {
    doctor: Doctor;
    selectedDoctor: string;
    onSelect: (id: string) => void;
  }
  export interface FilterProps {
    doctorSearchQuery: string;
    setDoctorSearchQuery: (query: string) => void;
    selectedGender: string;
    setSelectedGender: (gender: string) => void;
    selectedLanguage: string;
    setSelectedLanguage: (language: string) => void;
    priceRange: number[];
    setPriceRange: (range: number[]) => void;
    filterOptions: { genders: string[]; languages: string[]; priceRange: [number, number] };
    clearFilters: () => void;
  }
  export interface DoctorSelectionProps {
    doctors: Doctor[];
    loadingDoctors: boolean;
    selectedDoctor: string;
    setSelectedDoctor: (id: string) => void;
    selectedService: string;
    filterProps: FilterProps;
    onSelectTopRated: () => void;
  }
  export interface NavigationButtonsProps {
    currentStep: number;
    selectedService: string;
    setSelectedService: (service: string) => void;
    selectedDoctor: string;
    setSelectedDoctor: (id: string) => void;
    selectedTime: string;
    doctors: Doctor[];
    handleBack: () => void;
    handleNext: () => void;
    missingFields?: string[];
  }
  
  export interface ServiceSelectionProps {
    selectedService: string;
    setSelectedService: (service: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
  }

  export  interface QuickBookingData {
    doctorId: string;
    doctorName: string;
    specialty: string;
    serviceId: string;
    skipSteps: boolean;
  }
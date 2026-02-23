export interface Specialty {
  en: string;
  ar: string;
}

export interface Filters {
  specialty: string;
  gender: string;
  isAvailableToday: boolean;
  minExperience: number;
}

export interface DoctorFiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  filterOptions: { specialties: Specialty[]; genders: string[] };
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  resetFilters: () => void;
}
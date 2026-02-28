import { Doctor } from '@/app/types';
import { Clinic } from '../types';

export const filterAndSortDoctors = (
  doctors: Doctor[],
  searchQuery: string,
  sortBy: 'recent' | 'alphabetical',
  locale: string
) => {
  return doctors
    .filter(doctor => {
      const name = locale === 'ar' && doctor.name.ar ? doctor.name.ar : doctor.name.en;
      return name.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === 'alphabetical') {
        const nameA = locale === 'ar' && a.name.ar ? a.name.ar : a.name.en;
        const nameB = locale === 'ar' && b.name.ar ? b.name.ar : b.name.en;
        return nameA.localeCompare(nameB);
      }
      return 0;
    });
};

export const filterAndSortClinics = (
  clinics: Clinic[],
  searchQuery: string,
  sortBy: 'recent' | 'alphabetical',
  locale: string
) => {
  return clinics
    .filter(clinic => {
      const name = locale === 'ar' && clinic.name.ar ? clinic.name.ar : clinic.name.en;
      return name.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === 'alphabetical') {
        const nameA = locale === 'ar' && a.name.ar ? a.name.ar : a.name.en;
        const nameB = locale === 'ar' && b.name.ar ? b.name.ar : b.name.en;
        return nameA.localeCompare(nameB);
      }
      return 0;
    });
};

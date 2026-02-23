import { useState, useEffect } from 'react';
import { api } from '../../../lib/api';

interface Specialty {
  en: string;
  ar: string;
}

export const useFilterOptions = () => {
  const [filterOptions, setFilterOptions] = useState<{
    specialties: Specialty[];
    genders: string[];
  }>({ specialties: [], genders: [] });

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const data = await api.doctors.getFilters() as { specialties: Specialty[]; genders: string[] };
        setFilterOptions(data);
      } catch (error) {
      }
    };

    fetchFilterOptions();
  }, []);

  return filterOptions;
};

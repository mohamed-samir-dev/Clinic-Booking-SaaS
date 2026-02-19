import { useState, useEffect } from 'react';
import { api } from '../../../lib/api';

export const useFilterOptions = () => {
  const [filterOptions, setFilterOptions] = useState<{
    specialties: string[];
    genders: string[];
  }>({ specialties: [], genders: [] });

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const data = await api.doctors.getFilters() as { specialties: string[]; genders: string[] };
        setFilterOptions(data);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchFilterOptions();
  }, []);

  return filterOptions;
};

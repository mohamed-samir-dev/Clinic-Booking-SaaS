import { useState, useMemo } from 'react';
import { Doctor } from '@/app/types/index';

// دالة لتطبيع النص العربي للبحث
const normalizeArabic = (text: string) => {
  return text
    .replace(/[أإآ]/g, 'ا')
    .replace(/[ى]/g, 'ي')
    .replace(/[ة]/g, 'ه')
    .replace(/[ؤ]/g, 'و')
    .replace(/[ئ]/g, 'ي')
    .toLowerCase()
    .trim();
};

export const useFilters = (allDoctors: Doctor[]) => {
  const [doctorSearchQuery, setDoctorSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const filterOptions = useMemo(() => {
    const genders = [...new Set(allDoctors.map((d: Doctor) => d.gender).filter(Boolean))] as string[];
    const languages = [...new Set(allDoctors.flatMap((d: Doctor) => d.languages || []))] as string[];
    return { genders, languages, priceRange: [0, 1000] as [number, number] };
  }, [allDoctors]);

  const doctors = useMemo(() => {
    let filtered = [...allDoctors];
    
    if (doctorSearchQuery) {
      const normalizedQuery = normalizeArabic(doctorSearchQuery);
      filtered = filtered.filter((d: Doctor) => {
        if (typeof d.name === 'object') {
          const nameEn = normalizeArabic(d.name.en || '');
          const nameAr = normalizeArabic(d.name.ar || '');
          return nameEn.includes(normalizedQuery) || nameAr.includes(normalizedQuery);
        }
        const name = normalizeArabic(String(d.name || ''));
        return name.includes(normalizedQuery);
      });
    }
    if (selectedGender) {
      filtered = filtered.filter((d: Doctor) => 
        typeof d.gender === 'string' && d.gender.toLowerCase() === selectedGender.toLowerCase()
      );
    }
    if (selectedLanguage) {
      filtered = filtered.filter((d: Doctor) => 
        Array.isArray(d.languages) && d.languages.some((l: string) => 
          typeof l === 'string' && l.toLowerCase() === selectedLanguage.toLowerCase()
        )
      );
    }
    if (priceRange) {
      filtered = filtered.filter((d: Doctor) => 
        d.fees !== undefined && d.fees >= priceRange[0] && d.fees <= priceRange[1]
      );
    }
    
    return filtered;
  }, [allDoctors, doctorSearchQuery, selectedGender, selectedLanguage, priceRange]);

  const clearFilters = () => {
    setDoctorSearchQuery('');
    setSelectedGender('');
    setSelectedLanguage('');
    setPriceRange([0, filterOptions.priceRange[1]]);
  };

  return {
    doctors,
    doctorSearchQuery, setDoctorSearchQuery,
    selectedGender, setSelectedGender,
    selectedLanguage, setSelectedLanguage,
    priceRange, setPriceRange,
    filterOptions,
    clearFilters
  };
};

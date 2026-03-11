import { useEffect, useState } from 'react';

interface DoctorFiltersProps {
  filters: {
    specialty: string;
    availability: string;
    experience: string;
  };
  onFilterChange: (filters: { specialty: string; availability: string; experience: string }) => void;
  language?: 'ar' | 'en';
}

const translations = {
  ar: {
    allSpecialties: 'جميع التخصصات',
    allStatus: 'جميع الحالات',
    available: 'متاح',
    busy: 'مشغول',
    offDuty: 'غير متاح',
    onLeave: 'في إجازة',
    allExperience: 'جميع مستويات الخبرة',
    experience05: '0-5 سنوات',
    experience510: '5-10 سنوات',
    experience10plus: '10+ سنوات'
  },
  en: {
    allSpecialties: 'All Specialties',
    allStatus: 'All Status',
    available: 'Available',
    busy: 'Busy',
    offDuty: 'Off Duty',
    onLeave: 'On Leave',
    allExperience: 'All Experience',
    experience05: '0-5 years',
    experience510: '5-10 years',
    experience10plus: '10+ years'
  }
};

export const DoctorFilters = ({ filters, onFilterChange, language = 'en' }: DoctorFiltersProps) => {
  const t = translations[language];
  const [specialties, setSpecialties] = useState<string[]>([t.allSpecialties]);

  useEffect(() => {
    // Fetch unique specialties from the backend
    const fetchSpecialties = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/manager/doctors/specialties', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setSpecialties([t.allSpecialties, ...data.specialties]);
        }
      } catch (error) {
        console.error('Error fetching specialties:', error);
      }
    };
    fetchSpecialties();
  }, [t.allSpecialties]);

  const availabilityOptions = [
    { value: '', label: t.allStatus },
    { value: 'available', label: t.available },
    { value: 'busy', label: t.busy },
    { value: 'off-duty', label: t.offDuty },
    { value: 'on-leave', label: t.onLeave }
  ];

  const experienceOptions = [
    { value: '', label: t.allExperience },
    { value: '0-5', label: t.experience05 },
    { value: '5-10', label: t.experience510 },
    { value: '10+', label: t.experience10plus }
  ];

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
      <select
        value={filters.specialty}
        onChange={(e) => onFilterChange({ ...filters, specialty: e.target.value })}
        className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
      >
        {specialties.map((specialty) => (
          <option key={specialty} value={specialty === t.allSpecialties ? '' : specialty}>
            {specialty}
          </option>
        ))}
      </select>

      <select
        value={filters.availability}
        onChange={(e) => onFilterChange({ ...filters, availability: e.target.value })}
        className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
      >
        {availabilityOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={filters.experience}
        onChange={(e) => onFilterChange({ ...filters, experience: e.target.value })}
        className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
      >
        {experienceOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

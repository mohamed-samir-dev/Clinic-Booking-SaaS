import { useEffect, useState } from 'react';

interface DoctorFiltersProps {
  filters: {
    specialty: string;
    availability: string;
    experience: string;
  };
  onFilterChange: (filters: { specialty: string; availability: string; experience: string }) => void;
}

export const DoctorFilters = ({ filters, onFilterChange }: DoctorFiltersProps) => {
  const [specialties, setSpecialties] = useState<string[]>(['All Specialties']);

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
          setSpecialties(['All Specialties', ...data.specialties]);
        }
      } catch (error) {
        console.error('Error fetching specialties:', error);
      }
    };
    fetchSpecialties();
  }, []);

  const availabilityOptions = [
    { value: '', label: 'All Status' },
    { value: 'available', label: 'Available' },
    { value: 'busy', label: 'Busy' },
    { value: 'off-duty', label: 'Off Duty' },
    { value: 'on-leave', label: 'On Leave' }
  ];

  const experienceOptions = [
    { value: '', label: 'All Experience' },
    { value: '0-5', label: '0-5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: '10+', label: '10+ years' }
  ];

  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={filters.specialty}
        onChange={(e) => onFilterChange({ ...filters, specialty: e.target.value })}
        className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
      >
        {specialties.map((specialty) => (
          <option key={specialty} value={specialty === 'All Specialties' ? '' : specialty}>
            {specialty}
          </option>
        ))}
      </select>

      <select
        value={filters.availability}
        onChange={(e) => onFilterChange({ ...filters, availability: e.target.value })}
        className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
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
        className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
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

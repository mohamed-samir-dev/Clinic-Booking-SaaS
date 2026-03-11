import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

interface DoctorFilterProps {
  selectedDoctor: string;
  onDoctorChange: (doctorId: string) => void;
  language?: 'ar' | 'en';
}

interface Doctor {
  _id: string;
  name: string | { en: string; ar: string };
}

export function DoctorFilter({ selectedDoctor, onDoctorChange, language = 'en' }: DoctorFilterProps) {
  const t = useTranslations('manager.schedule.filters');
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/manager/doctors', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setDoctors(data.doctors || data);
        }
      } catch {
        toast.error('Failed to load doctors');
      }
    };

    fetchDoctors();
  }, []);

  const getName = (name: string | { en: string; ar: string }) =>
    typeof name === 'string' ? name : name[language];

  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <Filter className="text-gray-400 hidden sm:block" size={20} />
      <select
        value={selectedDoctor}
        onChange={(e) => onDoctorChange(e.target.value)}
        className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-teal-500"
      >
        <option value="all">{t('allDoctors')}</option>
        {doctors.map((doctor) => (
          <option key={doctor._id} value={doctor._id}>
            {getName(doctor.name)}
          </option>
        ))}
      </select>
    </div>
  );
}

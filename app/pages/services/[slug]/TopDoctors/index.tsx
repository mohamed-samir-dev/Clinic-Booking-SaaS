'use client';

import DoctorCard from './DoctorCard';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';
import SectionHeader from './SectionHeader';
import { useFetchDoctors } from './useFetchDoctors';
import { useTheme } from '@/app/contexts/ThemeContext';

interface TopDoctorsProps {
  specialty: string;
}

export default function TopDoctors({ specialty }: TopDoctorsProps) {
  const { theme } = useTheme();
  const { doctors, loading } = useFetchDoctors(specialty);

  if (loading) return <LoadingState />;
  if (doctors.length === 0) return <EmptyState specialty={specialty} />;

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} py-12 sm:py-16 md:py-24`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader specialty={specialty} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {doctors.map((doctor, index) => (
            <DoctorCard key={doctor._id} doctor={doctor} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

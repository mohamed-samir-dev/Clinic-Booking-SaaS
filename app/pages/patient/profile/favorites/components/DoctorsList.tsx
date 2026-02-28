import DoctorCard from '@/app/components/doctors/DoctorCard';
import { Doctor } from '@/app/types';
import EmptyState from './EmptyState';

interface DoctorsListProps {
  doctors: Doctor[];
  theme: string;
  locale: string;
}

export default function DoctorsList({ doctors, theme, locale }: DoctorsListProps) {
  if (doctors.length === 0) {
    return <EmptyState type="doctors" theme={theme} locale={locale} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor._id}
          id={doctor._id}
          name={doctor.name}
          specialty={doctor.specialty}
          experienceYears={doctor.experienceYears}
          photoUrl={doctor.photoUrl}
          isAvailableToday={doctor.isAvailableToday}
          availability={doctor.availability}
          clinicName={doctor.clinicId?.name}
          quickBook={true}
        />
      ))}
    </div>
  );
}

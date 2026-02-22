import { Doctor } from '../../../types/index';
import DoctorCard from '../../../components/doctors/DoctorCard';

interface DoctorsListProps {
  doctors: Doctor[];
}

export default function DoctorsList({ doctors }: DoctorsListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
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
        />
      ))}
    </div>
  );
}

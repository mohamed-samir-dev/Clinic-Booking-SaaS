import ClinicCard from '@/app/components/clinics/ClinicCard';
import { Clinic } from '../types';
import EmptyState from './EmptyState';

interface ClinicsListProps {
  clinics: Clinic[];
  theme: string;
  locale: string;
}

export default function ClinicsList({ clinics, theme, locale }: ClinicsListProps) {
  if (clinics.length === 0) {
    return <EmptyState type="clinics" theme={theme} locale={locale} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
      {clinics.map((clinic) => (
        <ClinicCard
          key={clinic._id}
          id={clinic._id}
          name={clinic.name}
          logo={clinic.logo}
          address={clinic.address}
          phone={clinic.phone}
        />
      ))}
    </div>
  );
}

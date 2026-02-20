import HeroSection from '@/app/components/hero';
import MedicalServices from '@/app/components/services/MedicalServices';
import TopDoctors from '@/app/components/doctors/TopDoctors';
import FeaturedClinics from '@/app/components/clinics/FeaturedClinics';
import PatientReviews from '@/app/components/reviews/PatientReviews';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <MedicalServices />
      <TopDoctors />
      <FeaturedClinics />
      <PatientReviews />
    </div>
  );
}

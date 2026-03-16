import type { Metadata } from 'next';
import HeroSection from '@/app/components/hero';
import MedicalServices from '@/app/components/services/MedicalServices';
import TopDoctors from '@/app/components/doctors/TopDoctors';
import FeaturedClinics from '@/app/components/clinics/FeaturedClinics';
import PatientReviews from '@/app/components/reviews/PatientReviews';

export const metadata: Metadata = {
  title: 'CareSync – Book Doctor Appointments Online | Clinic Booking Platform',
  description:
    'CareSync is a modern clinic booking platform. Book appointments with top doctors, browse medical services, and manage your healthcare online — fast, easy, and secure.',
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <HeroSection />
      <MedicalServices />
      <TopDoctors />
      <FeaturedClinics />
      <PatientReviews />
    </div>
  );
}

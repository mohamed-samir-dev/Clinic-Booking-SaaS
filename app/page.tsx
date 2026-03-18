import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import HeroSection from '@/app/components/hero';

const MedicalServices = dynamic(() => import('@/app/components/services/MedicalServices'));
const TopDoctors = dynamic(() => import('@/app/components/doctors/TopDoctors'));
const FeaturedClinics = dynamic(() => import('@/app/components/clinics/FeaturedClinics'));
const PatientReviews = dynamic(() => import('@/app/components/reviews/PatientReviews'));

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

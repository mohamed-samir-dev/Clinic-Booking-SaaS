import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import HeroSection from '@/app/components/hero';

const SectionSkeleton = () => (
  <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
    <div className="w-full px-4 md:px-8 animate-pulse">
      <div className="h-8 rounded w-64 mx-auto mb-4 bg-gray-200" />
      <div className="h-4 rounded w-96 mx-auto mb-10 bg-gray-200" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-64 rounded-2xl bg-gray-200" />
        ))}
      </div>
    </div>
  </section>
);

const MedicalServices = dynamic(() => import('@/app/components/services/MedicalServices'), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});
const TopDoctors = dynamic(() => import('@/app/components/doctors/TopDoctors'), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});
const FeaturedClinics = dynamic(() => import('@/app/components/clinics/FeaturedClinics'), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});
const PatientReviews = dynamic(() => import('@/app/components/reviews/PatientReviews'), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});

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

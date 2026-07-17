'use client';

import dynamic from 'next/dynamic';

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

export default function HomeClientSections() {
  return (
    <>
      <MedicalServices />
      <TopDoctors />
      <FeaturedClinics />
      <PatientReviews />
    </>
  );
}

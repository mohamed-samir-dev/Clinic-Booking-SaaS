import type { Metadata } from 'next';
import HeroSection from '@/app/components/hero';
import HomeClientSections from '@/app/components/HomeClientSections';

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
      <HomeClientSections />
    </div>
  );
}

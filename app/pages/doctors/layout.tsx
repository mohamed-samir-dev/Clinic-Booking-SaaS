import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Doctors',
  description:
    'Browse our qualified doctors across all specialties. Filter by specialty, availability, and experience. Book your appointment today on CareSync.',
  alternates: { canonical: '/pages/doctors' },
  openGraph: {
    title: 'Find a Doctor – CareSync',
    description: 'Browse and book appointments with top-rated doctors across all specialties.',
  },
};

export default function DoctorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

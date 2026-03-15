import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medical Services',
  description:
    'Explore our comprehensive medical services including Cardiology, Dentistry, Dermatology, Pediatrics, Orthopedics, and more at CareSync.',
  alternates: { canonical: '/pages/services' },
  openGraph: {
    title: 'Medical Services – CareSync',
    description: 'Comprehensive medical services across all specialties.',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

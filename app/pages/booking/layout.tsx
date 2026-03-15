import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description:
    'Book your doctor appointment online in minutes. Choose your preferred doctor, date, and time on CareSync.',
  alternates: { canonical: '/pages/booking' },
  openGraph: {
    title: 'Book an Appointment – CareSync',
    description: 'Schedule your next doctor visit online quickly and easily.',
  },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}

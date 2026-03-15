import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with CareSync. Find our location, working hours, and send us a message. We are here to help with your healthcare needs.',
  alternates: { canonical: '/pages/contact' },
  openGraph: {
    title: 'Contact CareSync',
    description: 'Reach out to us for any inquiries or support.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about CareSync — our mission, story, and the team behind the leading clinic booking platform. 10+ years of healthcare excellence.',
  alternates: { canonical: '/pages/about' },
  openGraph: {
    title: 'About CareSync',
    description: 'Our mission is to make healthcare accessible to everyone through technology.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

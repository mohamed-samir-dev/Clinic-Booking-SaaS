import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create your CareSync account to book doctor appointments and manage your healthcare online.',
  robots: { index: false, follow: false },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}

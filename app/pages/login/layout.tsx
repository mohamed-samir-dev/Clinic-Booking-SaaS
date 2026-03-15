import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your CareSync account to manage appointments and access your healthcare dashboard.',
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}

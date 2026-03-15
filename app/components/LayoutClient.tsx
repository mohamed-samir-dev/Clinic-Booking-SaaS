'use client';

import { usePathname } from 'next/navigation';
import { ReduxProvider } from '@/app/store/ReduxProvider';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import { LanguageProvider } from '@/app/contexts/LanguageContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from '@/app/components/navbar/Navbar';
import Footer from '@/app/components/footer/Footer';
import DynamicMetadata from '@/app/components/seo/DynamicMetadata';
import JsonLd from '@/app/components/seo/JsonLd';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOwnerPage = pathname?.startsWith('/pages/owner');
  const isDoctorPage = pathname?.startsWith('/pages/doctor/') || pathname === '/pages/doctor';
  const isManagerPage = pathname?.startsWith('/pages/manager');

  return (
    <ReduxProvider>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '497199433674-m9ueej20h6j64rhd4r5hc4i1k4748u00.apps.googleusercontent.com'}>
        <LanguageProvider>
          <ThemeProvider>
            <DynamicMetadata />
            <JsonLd />
            {!isDoctorPage && <Navbar />}
            {children}
            {!isOwnerPage && !isDoctorPage && !isManagerPage && <Footer />}
          </ThemeProvider>
        </LanguageProvider>
      </GoogleOAuthProvider>
    </ReduxProvider>
  );
}

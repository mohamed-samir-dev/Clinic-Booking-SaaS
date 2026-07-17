import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import LayoutClient from '@/app/components/LayoutClient';
import GoogleAnalytics from '@/app/components/GoogleAnalytics';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://clinic-booking-saas-backend-production.up.railway.app';

export const viewport: Viewport = {
  themeColor: '#0d9488',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CareSync – Book Doctor Appointments Online | Clinic Booking Platform',
    template: '%s | CareSync',
  },
  description:
    'CareSync is a modern clinic booking platform. Book appointments with top doctors, browse medical services, and manage your healthcare online — fast, easy, and secure.',
  keywords: [
    'clinic booking', 'doctor appointment', 'online booking', 'healthcare', 'medical services', 'CareSync',
    'حجز عيادات', 'حجز دكتور', 'حجز مواعيد طبية', 'منصة حجز', 'أطباء', 'خدمات طبية',
  ],
  authors: [{ name: 'CareSync Team' }],
  creator: 'MohammedSamier',
  publisher: 'CareSync',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_EG',
    url: SITE_URL,
    siteName: 'CareSync',
    title: 'CareSync – Book Doctor Appointments Online',
    description: 'Book appointments with top doctors, browse medical services, and manage your healthcare online.',
    images: [{ url: '/android-chrome-512x512.png', width: 512, height: 512, alt: 'CareSync Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareSync – Book Doctor Appointments Online',
    description: 'Book appointments with top doctors, browse medical services, and manage your healthcare online.',
    images: ['/android-chrome-512x512.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
        <link rel="preload" href="/bg-Alnoor.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}try{var l=localStorage.getItem('locale');if(l==='ar'){document.documentElement.setAttribute('lang','ar');document.documentElement.setAttribute('dir','rtl')}else{document.documentElement.setAttribute('lang','en');document.documentElement.setAttribute('dir','ltr')}}catch(e){}})()`,
          }}
        />
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}

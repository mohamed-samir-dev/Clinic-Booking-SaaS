'use client';

import { useLanguage } from '@/app/contexts/LanguageContext';

export default function JsonLd() {
  const { locale } = useLanguage();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clinic-booking-saas-backend-production.up.railway.app';
  const isAr = locale === 'ar';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'CareSync',
    url: siteUrl,
    logo: `${siteUrl}/android-chrome-512x512.png`,
    image: `${siteUrl}/android-chrome-512x512.png`,
    description: isAr
      ? 'CareSync منصة حجز عيادات حديثة. احجز مواعيد مع أفضل الأطباء وتصفح الخدمات الطبية اونلاين.'
      : 'CareSync is a modern clinic booking platform. Book appointments with top doctors, browse medical services, and manage your healthcare online.',
    priceRange: '$$',
    medicalSpecialty: isAr
      ? ['أمراض القلب', 'طب الأسنان', 'الأمراض الجلدية', 'أنف وأذن وحنجرة', 'طب عام', 'أمراض النساء', 'العظام', 'طب الأطفال']
      : ['Cardiology', 'Dentistry', 'Dermatology', 'ENT', 'General Medicine', 'Gynecology', 'Orthopedics', 'Pediatrics'],
    availableService: {
      '@type': 'MedicalProcedure',
      name: isAr ? 'حجز مواعيد اونلاين' : 'Online Appointment Booking',
      description: isAr
        ? 'احجز مواعيد الأطباء اونلاين بسرعة وأمان.'
        : 'Book doctor appointments online quickly and securely.',
    },
    potentialAction: {
      '@type': 'ReserveAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/pages/booking` },
      result: { '@type': 'Reservation', name: isAr ? 'موعد طبيب' : 'Doctor Appointment' },
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CareSync',
    url: siteUrl,
    inLanguage: isAr ? 'ar' : 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/pages/doctors?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
    </>
  );
}

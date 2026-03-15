'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { getPageSeo } from './seo.config';

export default function DynamicMetadata() {
  const { locale } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const seo = getPageSeo(pathname || '/', locale);

    document.title = seo.title;
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';

    const setMeta = (attr: string, value: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${value}"]`) as HTMLMetaElement | null;

      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }

      el.setAttribute('content', content);
    };

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clinic-booking-saa-s.vercel.app';

    setMeta('name', 'description', seo.description);

    setMeta('property', 'og:title', seo.ogTitle || seo.title);
    setMeta('property', 'og:description', seo.ogDescription || seo.description);
    setMeta('property', 'og:locale', locale === 'ar' ? 'ar_EG' : 'en_US');

    setMeta('property', 'og:url', `${siteUrl}${pathname}`);
    setMeta('property', 'og:image', `${siteUrl}/android-chrome-512x512.png`);

    setMeta('name', 'twitter:title', seo.ogTitle || seo.title);
    setMeta('name', 'twitter:description', seo.ogDescription || seo.description);
    setMeta('name', 'twitter:card', 'summary_large_image');
  }, [locale, pathname]);

  return null;
}
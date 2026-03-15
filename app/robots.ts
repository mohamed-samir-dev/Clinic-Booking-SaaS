import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clinic-booking-saas-backend-production.up.railway.app';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/pages/owner/', '/pages/manager/', '/pages/doctor/', '/pages/patient/', '/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

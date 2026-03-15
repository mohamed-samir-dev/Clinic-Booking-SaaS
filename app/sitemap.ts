import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clinic-booking-saas-backend-production.up.railway.app';
  const now = new Date();

  return [
    { url: siteUrl, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${siteUrl}/pages/doctors`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/pages/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/pages/booking`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${siteUrl}/pages/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/pages/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/pages/login`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/pages/register`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}

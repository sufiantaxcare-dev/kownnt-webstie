import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: site.homeLastUpdated, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/privacy`, lastModified: site.privacyLastUpdated, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${site.url}/terms`, lastModified: site.termsLastUpdated, changeFrequency: 'yearly', priority: 0.4 },
  ];
}

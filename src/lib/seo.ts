import type { Metadata } from 'next';
import { site } from '@/content/site';

/** The social share card (public/og.png, 1200x630). */
export const OG_IMAGE = { url: '/og.png', width: 1200, height: 630, type: 'image/png', alt: `${site.name}: ${site.tagline}` };

/**
 * Title, description, canonical URL, language and social cards for one page.
 * `title` is the page's own name; search results and share cards add the brand.
 */
export function pageMetadata({ title, description, path, absoluteTitle = false }: { title: string; description: string; path: string; absoluteTitle?: boolean }): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path, languages: { 'en-GB': path } },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      locale: 'en_GB',
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [OG_IMAGE] },
  };
}

/** Breadcrumb structured data: Home > this page. */
export function breadcrumbs(name: string, path: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name, item: `${site.url}${path}` },
    ],
  };
}

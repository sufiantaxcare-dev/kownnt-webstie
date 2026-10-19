import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import { site } from '@/content/site';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { SiteMotion } from '@/components/site-motion';
import { OG_IMAGE } from '@/lib/seo';

// Self-hosted by next/font at build time: no request to Google from visitors' browsers.
const display = Bricolage_Grotesque({ subsets: ['latin'], display: 'swap', variable: '--k-font-display', weight: ['500', '600', '700'] });
const body = IBM_Plex_Sans({ subsets: ['latin'], display: 'swap', variable: '--k-font-body', weight: ['400', '500', '600'] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: AI accounting and tax for UK businesses`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.owner.legalName, url: site.owner.website }],
  publisher: site.owner.legalName,
  keywords: [
    'AI accounting software UK',
    'AI accountant',
    'bookkeeping software',
    'Making Tax Digital VAT software',
    'VAT return software',
    'invoicing software UK',
    'receipt scanning app',
    'Open Banking bookkeeping',
    'accounting software for sole traders',
    'accounting software for small business',
    'accounting software for accountants',
  ],
  category: 'finance',
  creator: site.owner.legalName,
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: { siteName: site.name, locale: 'en_GB', type: 'website', images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE] },
  // Search Console / Bing Webmaster verification: set these at build time once the properties exist.
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } } : {}),
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f8fc' },
    { media: '(prefers-color-scheme: dark)', color: '#071526' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    // suppressHydrationWarning: the inline script adds `k-js` before React hydrates.
    <html lang="en-GB" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks that JavaScript runs, so scroll reveals may start hidden. Without it, everything shows. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('k-js')" }} />
      </head>
      {/* Browser extensions (ColorZilla, Grammarly...) add attributes to <body> before React loads. */}
      <body suppressHydrationWarning>
        <a className="k-skip" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <SiteMotion />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: site.name,
            url: site.url,
            logo: `${site.url}/logo.svg`,
            email: site.email,
            parentOrganization: {
              '@type': 'Organization',
              name: site.owner.legalName,
              url: site.owner.website,
              address: {
                '@type': 'PostalAddress',
                streetAddress: `${site.owner.address[0]}, ${site.owner.address[1]}`,
                addressLocality: site.owner.address[2],
                postalCode: site.owner.address[3],
                addressCountry: 'GB',
              },
            },
          }}
        />
      </body>
    </html>
  );
}

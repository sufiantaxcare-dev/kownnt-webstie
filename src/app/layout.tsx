import type { Metadata, Viewport } from 'next';
import { Manrope, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { site } from '@/content/site';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { SiteMotion } from '@/components/site-motion';
import { OG_IMAGE } from '@/lib/seo';

// Self-hosted by next/font at build time: no request to Google from visitors' browsers.
const display = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'swap', variable: '--k-font-display', weight: ['600', '700', '800'] });
const body = Manrope({ subsets: ['latin'], display: 'swap', variable: '--k-font-body', weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: AI accounting software for UK businesses`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.owner.legalName, url: site.owner.website }],
  publisher: site.owner.legalName,
  keywords: [
    'AI accounting software UK',
    'AI accountant',
    'bookkeeping software',
    'AI bookkeeping',
    'VAT preparation software',
    'accounting software for landlords',
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
  themeColor: '#050a1c',
  colorScheme: 'dark',
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

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  // A fully static site: `next build` writes plain HTML/CSS/JS to out/, which
  // Vercel serves as-is. Remove this line when the site needs server features
  // (a contact form, CMS previews) - nothing else has to change.
  output: 'export',
  trailingSlash: false,
  // Static export has no image optimisation server.
  images: { unoptimized: true },
};

export default nextConfig;

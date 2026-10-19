# kownt.ai website

The public website for [kownt.ai](https://kownt.ai): homepage, privacy policy and terms of service.
kownt.ai is a product of Tax Care Certified Accountants Limited.

Built with Next.js (App Router) as a fully static site.

## Run it

```bash
npm install
npm run dev        # http://localhost:3100
npm run build      # static site written to out/
```

## Where things are

| What | File |
|---|---|
| Company details, emails, links | `src/content/site.ts` |
| Homepage text (features, FAQ, personas, gallery) | `src/content/home.ts` |
| Homepage | `src/app/page.tsx` |
| Privacy policy / terms | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` |
| Styles | `src/app/globals.css` |
| Photos | `public/images/` (from Pexels, free licence) |

## Deploy

Netlify builds it from `netlify.toml` (`npm run build`, publish `out`).
Optional build variables: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`.

import type { Metadata } from 'next';
import { site } from '@/content/site';
import { CtaBand } from '@/components/cta-band';
import { JsonLd } from '@/components/json-ld';
import { VatDeadlines } from '@/components/vat-deadlines';
import { breadcrumbs, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Resources: free VAT deadline checker',
  description:
    'When is my VAT return due? Pick when your VAT periods end and see your next Making Tax Digital deadlines. Plus answers about kownt.ai, security and your data.',
  path: '/resources',
});

const d = (i: number): React.CSSProperties => ({ '--d': i }) as React.CSSProperties;

const LINKS = [
  { href: '/#faq', title: 'Frequently asked questions', text: 'AI suggestions, VAT, data protection and cancelling.' },
  { href: '/#security', title: 'Security', text: 'How kownt.ai protects your financial data.' },
  { href: '/privacy', title: 'Privacy policy', text: 'What we collect, why, and your rights under UK GDPR.' },
  { href: '/terms', title: 'Terms of service', text: 'The terms that apply when you use kownt.ai.' },
] as const;

export default function ResourcesPage(): React.JSX.Element {
  return (
    <>
      <JsonLd data={breadcrumbs('Resources', '/resources')} />
      <section className="k-hero k-hero-sub" aria-labelledby="resources-title">
        <div className="k-glow k-glow-hero" aria-hidden />
        <div className="k-container k-hero-inner">
          <p className="k-eyebrow">Resources</p>
          <h1 id="resources-title" className="k-hero-title k-hero-title-sub">
            <span className="k-line"><span>Tools and answers for</span></span>{' '}
            <span className="k-line"><span className="k-grad">UK business finances.</span></span>
          </h1>
        </div>
      </section>

      <section id="vat-deadlines" className="k-section" aria-labelledby="vat-title">
        <div className="k-container k-row">
          <div data-reveal>
            <p className="k-eyebrow">Free tool</p>
            <h2 id="vat-title">When is my VAT return due?</h2>
            <p className="k-muted">
              For quarterly and monthly returns under Making Tax Digital, the return and the payment are both due one month
              and seven days after the end of each VAT period. Pick yours to see your next deadlines.
            </p>
            <p className="k-fineprint k-left">
              Businesses on the annual accounting or payments on account schemes have different dates.
            </p>
          </div>
          <div data-reveal style={d(2)}>
            <VatDeadlines />
          </div>
        </div>
      </section>

      <section className="k-section" aria-labelledby="links-title">
        <div className="k-container">
          <div className="k-head" data-reveal>
            <p className="k-eyebrow">Help</p>
            <h2 id="links-title">Find what you need.</h2>
          </div>
          <ul className="k-links">
            {LINKS.map((l, i) => (
              <li key={l.href} data-reveal style={d(i)}>
                <a className="k-card k-link-card" href={l.href}>
                  <h3>
                    {l.title} <span aria-hidden>→</span>
                  </h3>
                  <p>{l.text}</p>
                </a>
              </li>
            ))}
            <li data-reveal style={d(4)}>
              <a className="k-card k-link-card" href={`mailto:${site.email}`}>
                <h3>
                  Contact us <span aria-hidden>→</span>
                </h3>
                <p>{site.email}</p>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

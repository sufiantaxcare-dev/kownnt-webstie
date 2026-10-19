import type { Metadata } from 'next';
import { site } from '@/content/site';
import { AUDIENCES, FAQ, PAIN_POINTS, STEPS, TICKER, TRUST } from '@/content/home';
import { DashboardMock } from '@/components/dashboard-mock';
import { ApproveDemo } from '@/components/approve-demo';
import { AskDemo } from '@/components/ask-demo';
import { AutoSort } from '@/components/auto-sort';
import { BrandMark } from '@/components/brand';
import { CtaBand } from '@/components/cta-band';
import { JsonLd } from '@/components/json-ld';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: `${site.name}: AI accounting software for UK businesses`,
  description: site.description,
  path: '/',
  absoluteTitle: true,
});

/** Stagger index for CSS (`--d` × 90ms). */
const d = (i: number): React.CSSProperties => ({ '--d': i }) as React.CSSProperties;

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <section className="k-hero" aria-labelledby="hero-title">
        <div className="k-glow k-glow-hero" aria-hidden />
        <div className="k-container k-hero-inner">
          <p className="k-pill">
            <span className="k-pill-dot" aria-hidden />
            AI-powered accounting
          </p>
          <h1 id="hero-title" className="k-hero-title">
            <span className="k-line"><span>Cut hours of accounting</span></span>{' '}
            <span className="k-line">
              <span>
                work <span className="k-grad">down to minutes.</span>
              </span>
            </span>
          </h1>
          <p className="k-hero-lede">
            Meet your AI accountant. Automate bookkeeping, organise transactions and turn your financial data into clear
            business insights, all in one place.
          </p>
          <div className="k-actions k-actions-center k-hero-actions">
            <a className="k-btn k-btn-primary k-btn-lg" href={site.getStartedUrl}>
              Get started <span aria-hidden>→</span>
            </a>
            <a className="k-btn k-btn-ghost k-btn-lg" href="#how-it-works">
              See how it works
            </a>
          </div>
          <p className="k-hero-note">Less manual work. More control. Better decisions.</p>
        </div>
        <div className="k-container k-hero-demo">
          <div className="k-tilt">
            <DashboardMock />
          </div>
          <div className="k-floaters" aria-hidden>
            <p className="k-floater k-floater-1">
              <span className="k-floater-ico k-ico-in">+</span>
              <span>
                <strong>+£1,840.00</strong> Stripe payout
              </span>
            </p>
            <p className="k-floater k-floater-2">
              <span className="k-floater-ico k-ico-ok">✓</span>
              <span>
                <strong>Receipt matched</strong> Screwfix £84.20
              </span>
            </p>
            <p className="k-floater k-floater-3">
              <span className="k-floater-ico k-ico-warn">!</span>
              <span>
                <strong>Possible duplicate</strong> Cloudhost £129.00
              </span>
            </p>
          </div>
          <p className="k-fineprint">Illustrative example. Figures and AI findings are not live data.</p>
        </div>
      </section>

      <section className="k-ticker" aria-label="Examples of what kownt.ai does">
        <div className="k-ticker-track">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1}>
              {TICKER.map(([title, detail]) => (
                <li key={title}>
                  <span className="k-ticker-dot" aria-hidden />
                  <strong>{title}</strong>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      <section className="k-section k-pain" aria-labelledby="pain-title">
        <div className="k-container">
          <h2 id="pain-title" className="k-center" data-reveal>
            Still spending hours on bookkeeping?
          </h2>
          <ul className="k-pain-list" data-reveal="strike">
            {PAIN_POINTS.map((p, i) => (
              <li key={p} style={d(i)}>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="k-pain-after" data-reveal style={d(3)}>
            There is a smarter way to manage your accounts.
          </p>
        </div>
      </section>

      <section className="k-section k-sort-section" aria-labelledby="sort-title">
        <div className="k-container k-row">
          <div data-reveal>
            <p className="k-eyebrow">Live bookkeeping</p>
            <h2 id="sort-title">Watch the books keep themselves.</h2>
            <p className="k-muted">
              Every line from your bank is read, sorted and matched to its receipt or invoice. You only see the few that
              need a decision from you.
            </p>
            <ul className="k-ticks k-ticks-lg">
              <li>Learns your categories and remembers your rules</li>
              <li>Matches payments to invoices, and receipts to spending</li>
              <li>Asks when it is not sure, instead of guessing</li>
            </ul>
          </div>
          <div data-reveal style={d(2)}>
            <AutoSort />
          </div>
        </div>
      </section>

      <section id="features" className="k-section" aria-labelledby="features-title">
        <div className="k-container">
          <div className="k-head" data-reveal>
            <p className="k-eyebrow">Meet your AI accountant</p>
            <h2 id="features-title">Accounting that does more than record numbers.</h2>
          </div>
          <div className="k-bento">
            <article className="k-card k-bento-wide" data-reveal style={d(0)}>
              <h3>AI bookkeeping</h3>
              <p>Suggests categories, spots possible duplicates and flags anything that needs a human eye. You approve before it counts.</p>
              <ApproveDemo />
            </article>
            <article className="k-card" data-reveal style={d(1)}>
              <h3>Receipts and invoices</h3>
              <p className="k-small">Extract the details and link them to the right transaction.</p>
              <div className="k-scan-wrap">
                <dl className="k-kv">
                  <div><dt>Supplier</dt><dd>Brightline</dd></div>
                  <div><dt>Total</dt><dd>£48.99</dd></div>
                </dl>
                <span className="k-scan" aria-hidden />
              </div>
            </article>
            <article className="k-card" data-reveal style={d(2)}>
              <h3>Bookkeeping checks</h3>
              <p className="k-small">Compare bank balances with your records and highlight gaps.</p>
              <dl className="k-kv">
                <div><dt>Difference</dt><dd><span className="k-chip-tag k-chip-ok">£0.00 · Matched</span></dd></div>
              </dl>
            </article>
            <article className="k-card k-bento-wide k-ask" data-reveal style={d(3)}>
              <h3>Ask your AI accountant</h3>
              <p>Ask in everyday language. Answers come from your own records.</p>
              <AskDemo />
            </article>
            <article className="k-card k-bento-half" data-reveal style={d(4)}>
              <h3>Your whole business at a glance</h3>
              <p>Profit and loss, balance sheet, cash flow and outstanding invoices.</p>
              <div className="k-bars" aria-hidden>
                {[34, 52, 40, 70, 88].map((h, i) => (
                  <span key={i} style={{ '--h': `${h}%`, '--i': i } as React.CSSProperties} data-hot={i >= 3} />
                ))}
              </div>
            </article>
            <article className="k-card k-bento-half" data-reveal style={d(5)}>
              <h3>Tax and VAT preparation</h3>
              <p>Summaries and checks that support your compliance work. Preparation help only; submission to HMRC is a separate step you approve.</p>
              <div className="k-tags">
                <span className="k-chip-tag k-chip-ok">VAT summary</span>
                <span className="k-chip-tag k-chip-ok">Checks</span>
                <span className="k-chip-tag k-chip-warn">Review items</span>
              </div>
            </article>
          </div>
          <p className="k-more" data-reveal>
            <a href="/product">
              Explore the product <span aria-hidden>→</span>
            </a>
          </p>
        </div>
      </section>

      <section id="how-it-works" className="k-section" aria-labelledby="how-title">
        <div className="k-container">
          <div className="k-head" data-reveal>
            <p className="k-eyebrow">How it works</p>
            <h2 id="how-title">Less manual work. More confidence in your numbers.</h2>
          </div>
          <ol className="k-steps" data-reveal="steps">
            {STEPS.map((s, i) => (
              <li key={i} className="k-step" style={d(i)}>
                <span className="k-step-n">{String(i + 1).padStart(2, '0')}</span>
                <span className={`k-step-who k-step-${s.kind}`}>{s.who}</span>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="k-fineprint k-left" data-reveal>
            AI suggestions are not confirmed accounting entries until you approve them.
          </p>
        </div>
      </section>

      <section id="solutions" className="k-section" aria-labelledby="who-title">
        <div className="k-container">
          <div className="k-head" data-reveal>
            <p className="k-eyebrow">Who it is for</p>
            <h2 id="who-title">One smarter way to manage your business finances.</h2>
          </div>
          <ul className="k-who">
            {AUDIENCES.map((a, i) => (
              <li key={a.title} className="k-card k-who-card" data-reveal style={d(i)}>
                <div className="k-who-media">
                  <img src={a.image} alt={a.alt} width={800} height={500} loading="lazy" decoding="async" />
                  <p className="k-who-note" aria-hidden style={d(i)}>
                    <BrandMark size={20} />
                    <span>
                      <strong>{a.noteTitle}</strong>
                      {a.note}
                    </span>
                  </p>
                </div>
                <div>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="email" className="k-section" aria-labelledby="email-title">
        <div className="k-container">
          <div className="k-card k-email" data-reveal>
            <div>
              <p className="k-eyebrow">Business email</p>
              <h2 id="email-title">Send from your own Gmail or Microsoft&nbsp;365 address.</h2>
              <p className="k-muted">
                Connecting your business email is optional. If you do, invoices and quotes reach customers from your
                own address, and their replies land next to the invoice they are about. Disconnect any time, in
                kownt.ai or from your Google or Microsoft account. <a href="/privacy#google-microsoft">What we access and why</a>.
              </p>
            </div>
            <div className="k-email-lists">
              <div>
                <h3>What kownt.ai does</h3>
                <ul className="k-ticks">
                  <li>Sends the invoices, quotes and reminders you ask it to, from your address.</li>
                  <li>If you switch on reply tracking, reads replies to those emails so they appear on the right invoice, quote or bill.</li>
                  <li>Shows which account is connected, using your name and email address.</li>
                </ul>
              </div>
              <div>
                <h3>What it never does</h3>
                <ul className="k-crosses">
                  <li>Read or keep your personal or unrelated email.</li>
                  <li>Use your email to train AI models.</li>
                  <li>Sell your data or use it for advertising.</li>
                </ul>
              </div>
            </div>
            <p className="k-fineprint k-left k-email-limited">
              kownt.ai’s use and transfer to any other app of information received from Google APIs will adhere to the{' '}
              <a href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a>, including
              the Limited Use requirements.
            </p>
          </div>
        </div>
      </section>

      <section id="security" className="k-section" aria-labelledby="security-title">
        <div className="k-container">
          <div className="k-card k-trust" data-reveal>
            <div className="k-trust-head">
              <div>
                <p className="k-eyebrow">Trust and security</p>
                <h2 id="security-title">Your financial data deserves serious protection.</h2>
              </div>
              <ul className="k-trust-links">
                <li><a href="/privacy">Privacy policy <span aria-hidden>→</span></a></li>
                <li><a href="/terms">Terms of service <span aria-hidden>→</span></a></li>
                <li><a href="/privacy#security">Security information <span aria-hidden>→</span></a></li>
              </ul>
            </div>
            <ul className="k-trust-grid">
              {TRUST.map((t) => (
                <li key={t.title}>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="faq" className="k-section" aria-labelledby="faq-title">
        <div className="k-container">
          <div className="k-head" data-reveal>
            <p className="k-eyebrow">FAQ</p>
            <h2 id="faq-title">Questions, answered.</h2>
          </div>
          <div className="k-faq">
            {FAQ.map((f, i) => (
              <details key={f.q} className="k-card k-faq-item" data-reveal style={d(i % 3)}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'WebSite', name: site.name, url: site.url },
            {
              '@type': 'SoftwareApplication',
              name: site.name,
              url: site.url,
              description: site.description,
              applicationCategory: 'FinanceApplication',
              operatingSystem: 'Web, iOS, Android',
              publisher: { '@type': 'Organization', name: site.owner.legalName, url: site.owner.website },
            },
            {
              '@type': 'FAQPage',
              mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
            },
          ],
        }}
      />
    </>
  );
}

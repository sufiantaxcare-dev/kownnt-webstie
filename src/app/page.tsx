import type { Metadata } from 'next';
import { site } from '@/content/site';
import { FAQ, SECURITY, STEPS } from '@/content/home';
import { HeroChat } from '@/components/hero-chat';
import { AutoSort } from '@/components/auto-sort';
import { FeatureShowcase } from '@/components/feature-showcase';
import { PersonaTabs } from '@/components/persona-tabs';
import { VatDeadlines } from '@/components/vat-deadlines';
import { BusinessGallery } from '@/components/business-gallery';
import { BrandMark } from '@/components/brand';
import { JsonLd } from '@/components/json-ld';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: `${site.name}: AI accounting and tax for UK businesses`,
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
        <div className="k-hero-bg" aria-hidden />
        <div className="k-container k-hero-grid">
          <div className="k-hero-copy">
            <p className="k-pill">
              <span className="k-pill-dot" aria-hidden />
              Accounting software with an AI accountant, for UK businesses
            </p>
            <h1 id="hero-title" className="k-hero-title">
              <span className="k-line"><span>Your accounts.</span></span>{' '}
              <span className="k-line"><span>Your tax.</span></span>{' '}
              <span className="k-line"><span>Just ask.</span></span>
            </h1>
            <p className="k-hero-lede">
              kownt.ai keeps your books, prepares your VAT and sends your invoices. When you want to know where you
              stand, ask it in plain English and get an answer from your own figures.
            </p>
            <div className="k-hero-actions">
              <a className="k-btn k-btn-primary k-btn-lg" href={site.getStartedUrl}>
                Get started
              </a>
              <a className="k-btn k-btn-ghost k-btn-lg" href="#how-it-works">
                See how it works
              </a>
            </div>
            <ul className="k-hero-proof">
              <li>Built by UK accountants</li>
              <li>Read-only bank access</li>
              <li>You approve every filing</li>
            </ul>
          </div>
          <HeroChat />
        </div>
      </section>

      <section className="k-strip" aria-label="Who it is for">
        <div className="k-container k-strip-inner">
          <p>For sole traders, limited companies and the accountants who look after them.</p>
          <ul>
            <li>Double-entry bookkeeping</li>
            <li>Making Tax Digital for VAT</li>
            <li>Open Banking bank feeds</li>
            <li>UK GDPR</li>
          </ul>
        </div>
      </section>

      <section id="who" className="k-section" aria-labelledby="who-title">
        <div className="k-container">
          <div className="k-section-head k-section-head-center" data-reveal>
            <h2 id="who-title">Built for how you work</h2>
            <p>Tell us who you are and see what kownt.ai takes off your plate.</p>
          </div>
          <div data-reveal style={d(1)}>
            <PersonaTabs ctaHref={site.getStartedUrl} />
          </div>
        </div>
      </section>

      <section className="k-section k-section-sunken" aria-labelledby="sort-title">
        <div className="k-container k-split">
          <div data-reveal>
            <h2 id="sort-title">Watch the books keep themselves</h2>
            <p className="k-split-lede">
              Every line from your bank is read, sorted and matched to its receipt or invoice. You only see the few
              that need a decision from you.
            </p>
            <ul className="k-ticks">
              <li>Learns your categories and remembers your rules</li>
              <li>Matches payments to invoices, and receipts to spending</li>
              <li>Asks when it isn’t sure, instead of guessing</li>
            </ul>
          </div>
          <div data-reveal style={d(2)}>
            <AutoSort />
          </div>
        </div>
      </section>

      <section id="features" className="k-section" aria-labelledby="features-title">
        <div className="k-container">
          <div className="k-section-head" data-reveal>
            <h2 id="features-title">What kownt.ai looks after</h2>
            <p>The everyday bookkeeping, done for you and kept up to date, so the answers are ready when you ask.</p>
          </div>
          <div data-reveal style={d(1)}>
            <FeatureShowcase />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="k-section k-section-sunken" aria-labelledby="how-title">
        <div className="k-container">
          <div className="k-section-head" data-reveal>
            <h2 id="how-title">Up and running in an afternoon</h2>
            <p>No spreadsheets to tidy first. Connect, check, and start asking.</p>
          </div>
          <ol className="k-steps" data-reveal="steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className="k-step" style={d(i * 2)}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="k-section k-section-gallery" aria-labelledby="gallery-title">
        <div className="k-container">
          <div className="k-section-head" data-reveal>
            <h2 id="gallery-title">Made for the way real businesses run</h2>
            <p>From the van to the salon chair, kownt.ai fits around the work, not the other way round.</p>
          </div>
        </div>
        <div data-reveal style={d(1)}>
          <BusinessGallery />
        </div>
      </section>

      <section id="vat-deadlines" className="k-section k-section-sunken" aria-labelledby="vat-title">
        <div className="k-container k-split k-split-tool">
          <div data-reveal>
            <h2 id="vat-title">When is my VAT return due?</h2>
            <p className="k-split-lede">
              For quarterly and monthly returns under Making Tax Digital, the return and the payment are both due one
              month and seven days after the end of each VAT period. Pick yours to see your next deadlines.
            </p>
            <p className="k-tool-note">
              kownt.ai keeps track of this for you and prepares each return from your books. Businesses on the annual
              accounting or payments on account schemes have different dates.
            </p>
          </div>
          <div data-reveal style={d(2)}>
            <VatDeadlines />
          </div>
        </div>
      </section>

      <section id="email" className="k-section" aria-labelledby="email-title">
        <div className="k-container k-email">
          <div className="k-email-intro" data-reveal>
            <h2 id="email-title">Send from your own Gmail or Microsoft&nbsp;365 address</h2>
            <p>
              Connecting your business email is optional. If you do, invoices and quotes reach your customers from
              your own address instead of ours, and their replies land next to the invoice they are about.
            </p>
            <p>
              You can disconnect at any time in kownt.ai, or from your Google or Microsoft account settings.{' '}
              <a href="/privacy#google-microsoft">Read exactly what we access and why</a>.
            </p>
          </div>
          <div className="k-email-lists">
            <div className="k-email-list k-email-do" data-reveal style={d(1)}>
              <h3>What kownt.ai does with it</h3>
              <ul>
                <li>Sends the invoices, quotes, statements and reminders you ask it to send, from your address.</li>
                <li>
                  If you switch on reply tracking, reads new replies to those emails so they appear on the right
                  invoice, quote or bill. Mail that is not about your customers or documents is not kept.
                </li>
                <li>Shows which account is connected, using your name and email address.</li>
              </ul>
            </div>
            <div className="k-email-list k-email-dont" data-reveal style={d(2)}>
              <h3>What it never does</h3>
              <ul>
                <li>Read or keep your personal or unrelated email.</li>
                <li>Use your email to train AI models.</li>
                <li>Sell your data, or use it for advertising.</li>
                <li>Send anything you have not asked it to send.</li>
              </ul>
            </div>
          </div>
          <p className="k-email-limited">
            kownt.ai’s use and transfer to any other app of information received from Google APIs will adhere to the{' '}
            <a href="https://developers.google.com/terms/api-services-user-data-policy">
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </p>
        </div>
      </section>

      <section id="security" className="k-section k-section-sunken" aria-labelledby="security-title">
        <div className="k-container">
          <div className="k-section-head" data-reveal>
            <h2 id="security-title">Built to look after financial data</h2>
            <p>
              Your records are only seen by the people you choose. <a href="/privacy">Read our privacy policy</a>.
            </p>
          </div>
          <ul className="k-security">
            {SECURITY.map((s, i) => (
              <li key={s.title} data-reveal="rule" style={d(i)}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="accountants" className="k-section" aria-labelledby="accountants-title">
        <div className="k-container k-accountants">
          <div data-reveal>
            <h2 id="accountants-title">Made by accountants, for accountants too</h2>
            <p>
              kownt.ai is built by <a href={site.owner.website}>{site.owner.tradingName}</a>, a UK accounting firm
              based in Birmingham, so it keeps the books the way an accountant expects them to be kept.
            </p>
            <p>
              If you run a practice, see every client’s books, deadlines and approvals in one place, and let your
              clients ask kownt.ai the everyday questions.
            </p>
            <a className="k-btn k-btn-ghost" href={`mailto:${site.email}?subject=kownt.ai%20for%20my%20practice`}>
              Email us about your practice
            </a>
          </div>
          <div className="k-practice-media" data-reveal style={d(2)}>
            <img
              src="/images/practice.webp"
              alt="Two accountants going through a balance sheet together at a shared desk"
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              className="k-practice-photo"
            />
          <div className="k-practice" aria-hidden data-reveal="rows" style={d(4)}>
            <div className="k-practice-head">
              <span>Client</span>
              <span>Next deadline</span>
            </div>
            <ul>
              <li style={d(3)}><span>Harbour Café Ltd</span><span className="k-due k-due-soon">VAT return, 7 Nov</span></li>
              <li style={d(4)}><span>Northgate Joinery</span><span className="k-due">Payroll, 22 Nov</span></li>
              <li style={d(5)}><span>Bloom &amp; Co</span><span className="k-due k-due-done">Accounts filed</span></li>
              <li style={d(6)}><span>Aston Lettings</span><span className="k-due">Self Assessment, 31 Jan</span></li>
            </ul>
          </div>
          </div>
        </div>
      </section>

      <section id="faq" className="k-section k-section-sunken" aria-labelledby="faq-title">
        <div className="k-container k-faq">
          <div data-reveal>
            <h2 id="faq-title">Questions people ask</h2>
            <p className="k-faq-more">
              Something else? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
          <div className="k-faq-list" data-reveal style={d(1)}>
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="k-cta" aria-labelledby="cta-title">
        <div className="k-cta-glow" aria-hidden />
        <div className="k-container k-cta-grid">
          <div className="k-cta-inner" data-reveal>
            <h2 id="cta-title">Ready to just ask?</h2>
            <p>Set up your business and connect your bank today. Your first answers are minutes away.</p>
            <div className="k-hero-actions">
              <a className="k-btn k-btn-light k-btn-lg" href={site.getStartedUrl}>
                Get started
              </a>
              <a className="k-link-light" href="#faq">
                Read the FAQ
              </a>
            </div>
          </div>
          <div className="k-cta-media" data-reveal style={d(2)}>
            <img
              src="/images/cta.webp"
              alt="A business owner smiling with delight at good news on her laptop"
              width={800}
              height={800}
              loading="lazy"
              decoding="async"
            />
            <div className="k-cta-bubble" aria-hidden>
              <BrandMark size={26} />
              <span>
                <strong>Your VAT return is ready</strong>
                Every box checked. Review and approve when you’re ready.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Phones: a "Get started" bar once the hero has scrolled away (SiteMotion shows and hides it). */}
      <div className="k-mobile-cta" aria-hidden="true">
        <span>Your accounts. Just ask.</span>
        <a className="k-btn k-btn-primary k-btn-sm" href={site.getStartedUrl} tabIndex={-1}>
          Get started
        </a>
      </div>

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
              mainEntity: FAQ.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ],
        }}
      />
    </>
  );
}

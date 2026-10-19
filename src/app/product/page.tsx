import type { Metadata } from 'next';
import { site } from '@/content/site';
import { CtaBand } from '@/components/cta-band';
import { JsonLd } from '@/components/json-ld';
import { breadcrumbs, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Product: AI bookkeeping, receipts and checks',
  description:
    'From bank feed to verified reports: AI-suggested categories you approve in one tap, receipts matched to transactions, and bookkeeping checks that show exactly where something is off.',
  path: '/product',
});

const d = (i: number): React.CSSProperties => ({ '--d': i }) as React.CSSProperties;

export default function ProductPage(): React.JSX.Element {
  return (
    <>
      <JsonLd data={breadcrumbs('Product', '/product')} />
      <section className="k-hero k-hero-sub" aria-labelledby="product-title">
        <div className="k-glow k-glow-hero" aria-hidden />
        <div className="k-container k-hero-inner">
          <p className="k-eyebrow">Product</p>
          <h1 id="product-title" className="k-hero-title k-hero-title-sub">
            <span className="k-line"><span>Everything your books need.</span></span>{' '}
            <span className="k-line"><span className="k-grad">Nothing they do not.</span></span>
          </h1>
          <p className="k-hero-lede">
            From bank feed to verified reports, kownt.ai handles the routine work and leaves the decisions to you.
          </p>
          <div className="k-actions k-actions-center k-hero-actions">
            <a className="k-btn k-btn-primary k-btn-lg" href={site.getStartedUrl}>
              Get started <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="k-section" aria-labelledby="p-ai">
        <div className="k-container k-row">
          <div data-reveal>
            <p className="k-eyebrow">AI bookkeeping</p>
            <h2 id="p-ai">Categorise in seconds. Approve in one tap.</h2>
            <p className="k-muted">kownt.ai suggests a category for every transaction and flags the ones it is unsure about.</p>
            <ul className="k-ticks k-ticks-lg">
              <li>Suggested categories for bank transactions</li>
              <li>Possible duplicate detection</li>
              <li>Nothing counts until you approve it</li>
            </ul>
          </div>
          <div className="k-card k-panel" data-reveal style={d(2)} aria-hidden>
            <ul className="k-dash-rows k-rows-static">
              <li><span className="k-dash-who">Brightline Stationers</span><span className="k-chip-tag k-chip-ok">Office supplies</span><span className="k-dash-amt">£48.99</span></li>
              <li><span className="k-dash-who">Cloudhost Ltd</span><span className="k-chip-tag k-chip-ok">Software</span><span className="k-dash-amt">£129.00</span></li>
              <li data-focus="true"><span className="k-dash-who">Cloudhost Ltd</span><span className="k-chip-tag k-chip-warn">Possible duplicate</span><span className="k-dash-amt">£129.00</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="k-section" aria-labelledby="p-receipts">
        <div className="k-container k-row k-row-flip">
          <div data-reveal>
            <p className="k-eyebrow">Receipts and invoices</p>
            <h2 id="p-receipts">Snap it. Extract it. Match it.</h2>
            <p className="k-muted">Capture financial documents, pull out the details and link them to the right transaction.</p>
            <ul className="k-ticks k-ticks-lg">
              <li>Supplier, date and total extracted</li>
              <li>Linked to bank transactions</li>
              <li>Missing documents highlighted</li>
            </ul>
          </div>
          <div className="k-card k-panel" data-reveal style={d(2)} aria-hidden>
            <dl className="k-kv k-kv-lg">
              <div><dt>Supplier</dt><dd>Brightline Stationers</dd></div>
              <div><dt>Date</dt><dd>12 Oct 2026</dd></div>
              <div><dt>Total</dt><dd>£48.99</dd></div>
              <div><dt>Status</dt><dd><span className="k-chip-tag k-chip-ok">Linked to transaction</span></dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="k-section" aria-labelledby="p-checks">
        <div className="k-container k-row">
          <div data-reveal>
            <p className="k-eyebrow">Bookkeeping checks</p>
            <h2 id="p-checks">Know your books add up.</h2>
            <p className="k-muted">Compare bank balances with your records and see exactly where something is off.</p>
            <ul className="k-ticks k-ticks-lg">
              <li>Bank balance versus recorded balance</li>
              <li>Reconciliation differences highlighted</li>
              <li>Incomplete records flagged</li>
            </ul>
          </div>
          <div className="k-card k-panel" data-reveal style={d(2)} aria-hidden>
            <dl className="k-kv k-kv-lg">
              <div><dt>Bank balance</dt><dd>£18,240.10</dd></div>
              <div><dt>Recorded in books</dt><dd>£18,240.10</dd></div>
              <div><dt>Difference</dt><dd><span className="k-chip-tag k-chip-ok">£0.00 · Matched</span></dd></div>
              <div><dt>Records</dt><dd><span className="k-chip-tag k-chip-warn">1 incomplete</span></dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="k-section" aria-labelledby="p-more">
        <div className="k-container">
          <div className="k-head" data-reveal>
            <p className="k-eyebrow">Also included</p>
            <h2 id="p-more">More than bookkeeping.</h2>
          </div>
          <ul className="k-three">
            <li className="k-card" data-reveal style={d(0)}>
              <h3>Ask your AI accountant</h3>
              <p>Ask questions in everyday language and get answers grounded in your own records.</p>
            </li>
            <li className="k-card" data-reveal style={d(1)}>
              <h3>Reports at a glance</h3>
              <p>Profit and loss, balance sheet, trial balance, cash flow and outstanding customer invoices.</p>
            </li>
            <li className="k-card" data-reveal style={d(2)}>
              <h3>Tax and VAT preparation</h3>
              <p>Summaries and checks to support compliance work. Preparation help only; submission to HMRC is a separate step you approve.</p>
            </li>
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

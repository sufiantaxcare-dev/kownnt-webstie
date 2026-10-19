'use client';

import { useEffect, useRef, useState } from 'react';
import { FEATURES } from '@/content/home';

/*
 * "What kownt.ai looks after" as a showcase: pick a feature on the left, see
 * it working on the right. Moves through the features by itself (with a
 * progress line under the active one) until the visitor picks one, hovers,
 * or prefers reduced motion. All figures are fictional.
 */

const CYCLE_MS = 6500;

export function FeatureShowcase(): React.JSX.Element {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setAuto(false);
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(Boolean(e?.isIntersecting)), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = auto && !hover && visible;
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % FEATURES.length), CYCLE_MS);
    return () => window.clearTimeout(t);
  }, [running, active]);

  const pick = (i: number): void => {
    setAuto(false);
    setActive(i);
  };

  const onKey = (e: React.KeyboardEvent, i: number): void => {
    const n = FEATURES.length;
    const next = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? (i - 1 + n) % n : null;
    if (next === null) return;
    e.preventDefault();
    pick(next);
    root.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  const f = FEATURES[active] ?? FEATURES[0];

  return (
    <div className="k-show" ref={root} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="k-show-tabs" role="tablist" aria-label="Features" aria-orientation="vertical">
        {FEATURES.map((x, i) => (
          <button
            key={x.name}
            id={`feat-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls="feat-panel"
            tabIndex={i === active ? 0 : -1}
            className="k-show-tab"
            onClick={() => pick(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className="k-show-tab-name">{x.name}</span>
            <span className="k-show-tab-text">{x.text}</span>
            {i === active && (
              <span
                className="k-show-progress"
                data-running={running}
                style={{ animationDuration: `${CYCLE_MS}ms` }}
                key={`${active}-${running}`}
                aria-hidden
              />
            )}
          </button>
        ))}
      </div>
      <div className="k-show-stage" id="feat-panel" role="tabpanel" aria-labelledby={`feat-tab-${active}`}>
        <div className="k-show-visual" key={active} aria-hidden>
          <Visual kind={f.visual} />
        </div>
        <p className="k-sr">{f.text}</p>
      </div>
    </div>
  );
}

function Visual({ kind }: { kind: (typeof FEATURES)[number]['visual'] }): React.JSX.Element {
  switch (kind) {
    case 'bank':
      return (
        <div className="k-v k-v-bank">
          <div className="k-v-head">
            <span>Barclays Business</span>
            <span className="k-v-live">Connected</span>
          </div>
          {[
            ['Stripe payout', '+1,840.00', 'Sales'],
            ['Shell, Edgbaston', '−62.15', 'Motor'],
            ['Adobe', '−54.98', 'Software'],
            ['Office rent', '−1,250.00', 'Premises'],
          ].map(([who, amt, cat], i) => (
            <div key={who} className="k-v-row" style={{ '--i': i } as React.CSSProperties}>
              <span>{who}</span>
              <span className="k-v-amt" data-in={amt?.startsWith('+')}>
                {amt}
              </span>
              <span className="k-v-chip">{cat}</span>
            </div>
          ))}
        </div>
      );
    case 'receipt':
      return (
        <div className="k-v k-v-receipt">
          <div className="k-v-paper">
            <p className="k-v-paper-title">Trainline</p>
            <p>Birmingham New St → London Euston</p>
            <p>Off-peak return, 1 adult</p>
            <div className="k-v-paper-total">
              <span>Total</span>
              <span>£38.40</span>
            </div>
            <span className="k-v-scan" />
          </div>
          <dl className="k-v-fields">
            <div style={{ '--i': 0 } as React.CSSProperties}><dt>Supplier</dt><dd>Trainline</dd></div>
            <div style={{ '--i': 1 } as React.CSSProperties}><dt>Total</dt><dd>£38.40</dd></div>
            <div style={{ '--i': 2 } as React.CSSProperties}><dt>VAT</dt><dd>£6.40</dd></div>
            <div style={{ '--i': 3 } as React.CSSProperties}><dt>Category</dt><dd>Travel</dd></div>
            <div style={{ '--i': 4 } as React.CSSProperties} className="k-v-matched"><dt>Bank line</dt><dd>Matched, 14 Oct</dd></div>
          </dl>
        </div>
      );
    case 'invoice':
      return (
        <div className="k-v k-v-invoice">
          <div className="k-v-doc">
            <div className="k-v-doc-head">
              <span className="k-v-doc-title">Invoice INV-0034</span>
              <span className="k-v-status">
                <span>Draft</span>
                <span>Sent</span>
                <span>Paid</span>
              </span>
            </div>
            <p className="k-v-muted">To Aston Lettings</p>
            <div className="k-v-line"><span>Kitchen refit, labour</span><span>£800.00</span></div>
            <div className="k-v-line"><span>Materials</span><span>£200.00</span></div>
            <div className="k-v-line"><span>VAT 20%</span><span>£200.00</span></div>
            <div className="k-v-line k-v-line-total"><span>Total</span><span>£1,200.00</span></div>
          </div>
          <div className="k-v-toast">Sent from accounts@northgatejoinery.co.uk</div>
        </div>
      );
    case 'vat':
      return (
        <div className="k-v k-v-vat">
          <div className="k-v-head">
            <span>VAT return, Jul to Sep</span>
            <span className="k-v-live">Ready to review</span>
          </div>
          {[
            ['Box 1', 'VAT due on sales', '£6,240.00'],
            ['Box 4', 'VAT reclaimed on purchases', '£1,427.40'],
            ['Box 5', 'Net VAT to pay', '£4,812.60'],
            ['Box 6', 'Total sales, excluding VAT', '£31,200'],
          ].map(([box, label, val], i) => (
            <div key={box} className="k-v-box" style={{ '--i': i } as React.CSSProperties} data-key={box === 'Box 5'}>
              <span className="k-v-box-n">{box}</span>
              <span>{label}</span>
              <span className="k-v-box-val">{val}</span>
            </div>
          ))}
        </div>
      );
    case 'reports':
      return (
        <div className="k-v k-v-reports">
          <div className="k-v-head">
            <span>Profit, last 6 months</span>
            <span className="k-v-big">£38,210 so far</span>
          </div>
          <div className="k-v-bars">
            {[42, 58, 51, 66, 74, 88].map((h, i) => (
              <div key={i} className="k-v-bar" style={{ '--h': `${h}%`, '--i': i } as React.CSSProperties}>
                <span>{['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][i]}</span>
              </div>
            ))}
          </div>
          <p className="k-v-muted">Estimated tax to put aside: £7,642</p>
        </div>
      );
    default:
      return (
        <div className="k-v k-v-ask">
          <p className="k-v-q">Can I afford a new van?</p>
          <div className="k-v-a">
            <p>
              Probably, if you finance it. You have <strong>£14,300</strong> in the bank and £3,960 owed to you.
            </p>
            <p>A £450 monthly payment leaves you about £2,100 spare each month, based on the last 6 months.</p>
          </div>
        </div>
      );
  }
}

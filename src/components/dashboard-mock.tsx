'use client';

import { useEffect, useState } from 'react';

/*
 * The hero's product window: this month's figures, a cash-flow line and the
 * latest transactions, with the AI accountant's note floating over it.
 * "Review suggestions" puts the flagged transaction up for approval, so a
 * visitor can try the approve step. All figures are illustrative.
 */

const TABS = ['Overview', 'Transactions', 'Receipts', 'Reports', 'Ask AI'] as const;
const STATS = [
  { label: 'Income · this month', value: 24850 },
  { label: 'Expenses · this month', value: 9420 },
  { label: 'Net profit', value: 15430 },
] as const;

type Row = { who: string; chip: string; tone: 'ok' | 'review'; amount: string };
const ROWS: Row[] = [
  { who: 'Brightline Stationers', chip: 'Office supplies', tone: 'ok', amount: '£48.99' },
  { who: 'Cloudhost Ltd', chip: 'Software', tone: 'ok', amount: '£129.00' },
  { who: 'Northway Fuel', chip: 'Needs review', tone: 'review', amount: '£62.40' },
];

function useCountUp(target: number, run: boolean, ms = 1400): number {
  const [n, setN] = useState(target);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setN(target);
    // A plain timer (not requestAnimationFrame) so the page stays idle-friendly for headless previews.
    const start = Date.now();
    setN(0);
    const id = window.setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / ms);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p >= 1) window.clearInterval(id);
    }, 30);
    return () => window.clearInterval(id);
  }, [target, run, ms]);
  return n;
}

function Stat({ label, value, run }: { label: string; value: number; run: boolean }): React.JSX.Element {
  const n = useCountUp(value, run);
  return (
    <div className="k-dash-stat">
      <span>{label}</span>
      <strong>£{n.toLocaleString('en-GB')}</strong>
    </div>
  );
}

const AI_TEXT = 'I found 3 transactions that need your attention and 2 possible duplicate expenses.';

/** Types `text` out once, after `delay` ms. Reduced motion shows it whole. */
function useTyped(text: string, delay: number): string {
  const [n, setN] = useState(text.length);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setN(0);
    let id = 0;
    const start = window.setTimeout(() => {
      id = window.setInterval(() => {
        setN((x) => {
          if (x + 1 >= text.length) window.clearInterval(id);
          return x + 1;
        });
      }, 22);
    }, delay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(id);
    };
  }, [text, delay]);
  return text.slice(0, n);
}

export function DashboardMock(): React.JSX.Element {
  const [run, setRun] = useState(false);
  const aiText = useTyped(AI_TEXT, 2100);
  const [reviewing, setReviewing] = useState(false);
  const [approved, setApproved] = useState(false);

  useEffect(() => setRun(true), []);

  return (
    <div className="k-dash-wrap" role="group" aria-label="Example: the kownt.ai dashboard with an AI suggestion to review">
      <div className="k-dash">
        <div className="k-dash-bar" aria-hidden>
          <i />
          <i />
          <i />
        </div>
        <div className="k-dash-body">
          <ul className="k-dash-side" aria-hidden>
            {TABS.map((t, i) => (
              <li key={t} data-active={i === 0}>
                {t}
              </li>
            ))}
          </ul>
          <div className="k-dash-main">
            <div className="k-dash-stats">
              {STATS.map((s) => (
                <Stat key={s.label} label={s.label} value={s.value} run={run} />
              ))}
            </div>
            <svg className="k-dash-chart" aria-hidden viewBox="0 0 560 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id="k-dash-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#5b8cff" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#5b8cff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                className="k-dash-area"
                d="M0 110 C 60 92, 110 100, 160 88 S 230 40, 290 38 S 360 46, 400 40 S 480 52, 560 58 L 560 150 L 0 150 Z"
                fill="url(#k-dash-fill)"
              />
              <path
                className="k-dash-line"
                d="M0 110 C 60 92, 110 100, 160 88 S 230 40, 290 38 S 360 46, 400 40 S 480 52, 560 58"
                fill="none"
                stroke="#7aa2ff"
                strokeWidth="3"
                strokeLinecap="round"
                pathLength={1}
              />
              <circle className="k-dash-pulse" cx="560" cy="58" r="10" fill="#7aa2ff" />
              <circle className="k-dash-dot" cx="560" cy="58" r="5" fill="#cfe0ff" />
            </svg>
            <ul className="k-dash-rows">
              {ROWS.map((r, i) => {
                const flagged = r.tone === 'review';
                return (
                  <li key={r.who} style={{ '--i': i } as React.CSSProperties} data-focus={flagged && reviewing && !approved}>
                    <span className="k-dash-who">{r.who}</span>
                    {flagged && reviewing && !approved ? (
                      <span className="k-dash-decide">
                        <span className="k-chip-tag k-chip-ok">Suggested: Motor</span>
                        <button type="button" className="k-mini-btn" onClick={() => setApproved(true)}>
                          Approve
                        </button>
                      </span>
                    ) : (
                      <span className={`k-chip-tag ${flagged && !approved ? 'k-chip-warn' : 'k-chip-ok'}`}>
                        {flagged && approved ? 'Motor ✓' : r.chip}
                      </span>
                    )}
                    <span className="k-dash-amt">{r.amount}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="k-ai-card" data-done={approved}>
        <p className="k-ai-card-label">Your AI accountant</p>
        {approved ? (
          <p>Done. Northway Fuel is filed under Motor. 2 possible duplicate expenses are still waiting for you.</p>
        ) : (
          <p>
            <span className="k-sr">{AI_TEXT}</span>
            <span aria-hidden>
              {aiText}
              {aiText.length < AI_TEXT.length && <span className="k-caret" />}
            </span>
          </p>
        )}
        {!reviewing && (
          <button type="button" className="k-ai-card-link" onClick={() => setReviewing(true)}>
            Review suggestions <span aria-hidden>→</span>
          </button>
        )}
      </div>
    </div>
  );
}

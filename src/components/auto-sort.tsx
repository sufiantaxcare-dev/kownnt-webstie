'use client';

import { useEffect, useRef, useState } from 'react';

/*
 * "The books keep themselves": new bank lines arrive unsorted and are sorted
 * one by one while the counter climbs. One line needs a person's decision,
 * which is the point - kownt.ai asks rather than guesses. Starts when it
 * scrolls into view, loops a few times, and shows the finished state for
 * reduced motion. All figures are fictional.
 */

type Line = { who: string; amount: string; result: string; how: string; ask?: boolean };

const LINES: Line[] = [
  { who: 'Screwfix', amount: '−84.20', result: 'Materials', how: 'Receipt matched' },
  { who: 'Harbour Café Ltd', amount: '+1,620.00', result: 'INV-0028 paid', how: 'Invoice matched' },
  { who: 'BT Business', amount: '−42.00', result: 'Phone & internet', how: 'Your rule' },
  { who: 'Transfer to J Patel', amount: '−500.00', result: 'Needs your OK', how: 'Wages or a loan?', ask: true },
  { who: 'Costa Coffee', amount: '−6.85', result: 'Subsistence', how: 'Receipt matched' },
  { who: 'Amazon Marketplace', amount: '−129.99', result: 'Equipment', how: '98% sure' },
];

const BASE = 136;
const TOTAL = 180;
const STEP_MS = 850;
const HOLD_MS = 3200;
const MAX_LOOPS = 3;

export function AutoSort(): React.JSX.Element {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(LINES.length);
  const [running, setRunning] = useState(false);
  const [loops, setLoops] = useState(0);

  // Start (from empty) the first time the panel is on screen.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = root.current;
    if (!el) return;
    setDone(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setRunning(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    if (done < LINES.length) {
      const t = window.setTimeout(() => setDone((d) => d + 1), done === 0 ? 500 : STEP_MS);
      return () => window.clearTimeout(t);
    }
    if (loops + 1 >= MAX_LOOPS) return;
    const t = window.setTimeout(() => {
      setLoops((l) => l + 1);
      setDone(0);
    }, HOLD_MS);
    return () => window.clearTimeout(t);
  }, [running, done, loops]);

  const sorted = BASE + done;
  const pct = Math.round((sorted / TOTAL) * 100);

  return (
    <div className="k-sort" ref={root} aria-hidden>
      <div className="k-sort-head">
        <div>
          <p className="k-sort-title">New from your bank</p>
          <p className="k-sort-count">
            <strong>{sorted}</strong> of {TOTAL} sorted
          </p>
        </div>
        <span className="k-sort-pct">{pct}%</span>
      </div>
      <div className="k-sort-bar">
        <span style={{ transform: `scaleX(${sorted / TOTAL})` }} />
      </div>
      <ul>
        {LINES.map((l, i) => {
          const state = i < done ? (l.ask ? 'ask' : 'done') : i === done && running ? 'working' : 'waiting';
          return (
            <li key={l.who} className="k-sort-row" data-state={state}>
              <span className="k-sort-who">{l.who}</span>
              <span className="k-sort-amt" data-in={l.amount.startsWith('+')}>
                {l.amount}
              </span>
              <span className="k-sort-result">
                {state === 'done' || state === 'ask' ? (
                  <>
                    <span className="k-sort-chip">{l.result}</span>
                    <span className="k-sort-how">{l.how}</span>
                  </>
                ) : (
                  <span className="k-sort-chip k-sort-chip-pending">{state === 'working' ? 'Sorting' : 'Not sorted'}</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

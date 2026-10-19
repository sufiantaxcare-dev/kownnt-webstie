'use client';

import { useEffect, useMemo, useState } from 'react';

/*
 * A small free tool: when are my VAT returns due? For standard quarterly or
 * monthly Making Tax Digital returns, the return and payment are due one
 * calendar month and seven days after the period ends - which always lands
 * on the 7th of the second month after the period's last month.
 * (Annual accounting and payments-on-account schemes work differently.)
 */

type Pattern = { id: string; label: string; months: number[] };

// Months are 0-based period-end months.
const PATTERNS: Pattern[] = [
  { id: 'mar', label: 'Mar, Jun, Sep, Dec', months: [2, 5, 8, 11] },
  { id: 'apr', label: 'Apr, Jul, Oct, Jan', months: [3, 6, 9, 0] },
  { id: 'may', label: 'May, Aug, Nov, Feb', months: [4, 7, 10, 1] },
  { id: 'monthly', label: 'Monthly', months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
];

type Due = { periodEnd: Date; due: Date };

function upcoming(pattern: Pattern, today: Date, count: number): Due[] {
  const out: Due[] = [];
  // Walk period ends from three months back until enough deadlines are on or after today.
  for (let k = -3; out.length < count && k < 30; k++) {
    const y = today.getFullYear();
    const m = today.getMonth() + k;
    const end = new Date(y, m + 1, 0); // last day of month m
    if (!pattern.months.includes(end.getMonth())) continue;
    const due = new Date(end.getFullYear(), end.getMonth() + 2, 7);
    if (due >= startOfDay(today)) out.push({ periodEnd: end, due });
  }
  return out;
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

const fmt = (d: Date, withYear = true): string =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', ...(withYear ? { year: 'numeric' } : {}) });

export function VatDeadlines(): React.JSX.Element {
  const [pattern, setPattern] = useState(PATTERNS[0]!);
  // Rendered on the client only, so the dates are always today's.
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);

  const list = useMemo(() => (today ? upcoming(pattern, today, 4) : []), [pattern, today]);
  const next = list[0];
  const days = next && today ? Math.round((next.due.getTime() - startOfDay(today).getTime()) / 86_400_000) : null;

  return (
    <div className="k-vat">
      <fieldset className="k-vat-pick">
        <legend>When do your VAT periods end?</legend>
        <div className="k-vat-options">
          {PATTERNS.map((p) => (
            <label key={p.id} className="k-vat-option">
              <input
                type="radio"
                name="vat-pattern"
                value={p.id}
                checked={pattern.id === p.id}
                onChange={() => setPattern(p)}
              />
              <span>{p.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="k-vat-result" aria-live="polite">
        {next && days !== null ? (
          <div key={pattern.id + next.due.toISOString()} className="k-vat-next">
            <p className="k-vat-label">Your next return and payment are due</p>
            <p className="k-vat-date">{fmt(next.due)}</p>
            <p className="k-vat-days">
              <span className="k-vat-count">{days}</span> {days === 1 ? 'day' : 'days'} to go, for the period ending{' '}
              {fmt(next.periodEnd, false)}
            </p>
            <ol className="k-vat-list">
              {list.slice(1).map((d, i) => (
                <li key={d.due.toISOString()} style={{ '--i': i } as React.CSSProperties}>
                  <span>Period ending {fmt(d.periodEnd, false)}</span>
                  <span>{fmt(d.due)}</span>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <p className="k-vat-label">Choose when your VAT periods end to see your deadlines.</p>
        )}
      </div>
    </div>
  );
}

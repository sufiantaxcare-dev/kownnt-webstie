'use client';

import { useRef, useState } from 'react';
import { PERSONAS } from '@/content/home';

/** "Built for how you work": the visitor picks who they are and sees what kownt.ai does for them. */
export function PersonaTabs({ ctaHref }: { ctaHref: string }): React.JSX.Element {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const p = PERSONAS[active] ?? PERSONAS[0];

  const onKey = (e: React.KeyboardEvent, i: number): void => {
    const n = PERSONAS.length;
    const next = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="k-persona">
      <div className="k-persona-tabs" role="tablist" aria-label="Who you are">
        {PERSONAS.map((x, i) => (
          <button
            key={x.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            id={`persona-tab-${x.id}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls="persona-panel"
            tabIndex={i === active ? 0 : -1}
            className="k-persona-tab"
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {x.label}
          </button>
        ))}
        <span
          className="k-persona-pill"
          aria-hidden
          style={{ '--n': PERSONAS.length, '--i': active } as React.CSSProperties}
        />
      </div>

      <div className="k-persona-panel" id="persona-panel" role="tabpanel" aria-labelledby={`persona-tab-${p.id}`}>
        <div className="k-persona-copy" key={p.id}>
          <h3>{p.title}</h3>
          <p>{p.text}</p>
          <ul>
            {p.points.map((pt, i) => (
              <li key={pt} style={{ '--i': i } as React.CSSProperties}>
                {pt}
              </li>
            ))}
          </ul>
          <a className="k-btn k-btn-primary" href={ctaHref}>
            {p.cta}
          </a>
        </div>
        <div className="k-persona-media">
          {/* All three photos stay loaded and crossfade, so switching never flashes empty. */}
          {PERSONAS.map((x, i) => (
            <img
              key={x.id}
              src={x.image}
              alt={i === active ? x.alt : ''}
              aria-hidden={i !== active}
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              className="k-persona-photo"
              data-active={i === active}
            />
          ))}
          <div className="k-persona-card" aria-hidden key={p.id}>
            <p className="k-persona-card-label">{p.card.label}</p>
            <p className="k-persona-card-value">{p.card.value}</p>
            <p className="k-persona-card-note">{p.card.note}</p>
            <ul>
              {p.card.rows.map(([a, b], i) => (
                <li key={a} style={{ '--i': i } as React.CSSProperties}>
                  <span>{a}</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

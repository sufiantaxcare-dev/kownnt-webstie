'use client';

import { useEffect, useRef, useState } from 'react';
import { BUSINESSES } from '@/content/home';
import { BrandMark } from './brand';

/**
 * A swipeable strip of real kinds of business, each with the kind of thing
 * kownt.ai just did for them. Scrolls natively (touch, trackpad, keyboard),
 * with arrow buttons for mouse users. Figures are fictional examples.
 */
export function BusinessGallery(): React.JSX.Element {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = (): void => {
      setAtStart(el.scrollLeft < 8);
      setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const move = (dir: 1 | -1): void => {
    const el = track.current;
    const card = el?.querySelector('li');
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 20), behavior: 'smooth' });
  };

  return (
    <div className="k-gallery">
      <ul className="k-gallery-track" ref={track} tabIndex={0} aria-label="Businesses using kownt.ai, scrollable">
        {BUSINESSES.map((b, i) => (
          <li key={b.name} className="k-gallery-card" style={{ '--i': i } as React.CSSProperties}>
            <img src={b.image} alt={b.alt} width={600} height={800} loading="lazy" decoding="async" />
            <div className="k-gallery-note" aria-hidden>
              <BrandMark size={22} />
              <span>
                <strong>{b.noteTitle}</strong>
                {b.note}
              </span>
            </div>
            <div className="k-gallery-caption">
              <h3>{b.name}</h3>
              <p>{b.line}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="k-gallery-controls">
        <button type="button" className="k-round-btn" onClick={() => move(-1)} disabled={atStart} aria-label="Previous">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className="k-round-btn" onClick={() => move(1)} disabled={atEnd} aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
            <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

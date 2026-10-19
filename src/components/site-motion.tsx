'use client';

import { useEffect } from 'react';

/**
 * Page-wide motion, in one small scroll handler:
 *  - any element with `data-reveal` gets `data-shown` once its top comes
 *    within 60px of the bottom of the window (CSS does the animating, see globals.css
 *    section 12);
 *  - the header gets `data-scrolled` once the page moves.
 * Without JavaScript nothing is hidden: the hiding rules only apply under the
 * `k-js` class that the inline script in layout.tsx adds.
 */
export function SiteMotion(): null {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pending = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-shown])'));
    const header = document.querySelector<HTMLElement>('.k-header');

    if (reduced) {
      pending.forEach((el) => el.setAttribute('data-shown', ''));
      pending = [];
    }

    const progress = document.querySelector<HTMLElement>('.k-progress');
    // The hero dashboard leans back at first and straightens as the page scrolls.
    const tilt = document.querySelector<HTMLElement>('.k-tilt');
    const mobileCta = document.querySelector<HTMLElement>('.k-mobile-cta');
    // Header links to sections on this page, for highlighting the one being read.
    const spy = Array.from(document.querySelectorAll<HTMLAnchorElement>('.k-nav a[href^="/#"]'))
      .map((a) => ({ a, section: document.getElementById(a.getAttribute('href')!.slice(2)) }))
      .filter((x): x is { a: HTMLAnchorElement; section: HTMLElement } => x.section !== null);

    let frame = 0;
    const update = (): void => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      header?.setAttribute('data-scrolled', String(y > 8));
      progress?.style.setProperty('transform', `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`);
      if (tilt && !reduced) tilt.style.setProperty('--tilt-p', String(Math.min(1, y / 420)));
      // Shown after the hero, hidden again near the final call to action and footer.
      mobileCta?.setAttribute('data-show', String(y > 700 && max - y > 700));

      let current: HTMLAnchorElement | null = null;
      for (const { a, section } of spy) {
        const r = section.getBoundingClientRect();
        if (r.top <= 140 && r.bottom > 140) current = a;
      }
      for (const { a } of spy) {
        if (a === current) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      }

      if (pending.length === 0) return;
      const line = window.innerHeight - 60;
      pending = pending.filter((el) => {
        const top = el.getBoundingClientRect().top;
        if (top > line) return true;
        el.setAttribute('data-shown', '');
        return false;
      });
    };
    const schedule = (): void => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    // Cards light up where the pointer is (CSS reads --mx / --my).
    const onPointer = (e: PointerEvent): void => {
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const inside = e.clientY > r.top - 80 && e.clientY < r.bottom + 80;
        // -1..1 across the dashboard; eased back to 0 when the pointer leaves.
        tilt.style.setProperty('--mx-n', inside ? (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3) : '0');
        tilt.style.setProperty('--my-n', inside ? (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3) : '0');
      }
      const card = (e.target as Element | null)?.closest?.<HTMLElement>('.k-card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    if (!reduced) document.addEventListener('pointermove', onPointer, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('pointermove', onPointer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

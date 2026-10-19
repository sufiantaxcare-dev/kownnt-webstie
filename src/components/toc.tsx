'use client';

import { useEffect, useState } from 'react';

/**
 * "On this page": a sticky list beside the text on wide screens, a fold-out
 * menu above it on small ones. Highlights the section being read. The links
 * work without JavaScript; the highlight is an extra.
 */
export function Toc({ items }: { items: Array<{ id: string; label: string }> }): React.JSX.Element {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        const first = items.find((i) => visible.get(i.id));
        if (first) setActive(first.id);
      },
      { rootMargin: '-80px 0px -60% 0px' },
    );
    for (const i of items) {
      const el = document.getElementById(i.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  const list = (
    <ol>
      {items.map((i) => (
        <li key={i.id}>
          <a href={`#${i.id}`} aria-current={active === i.id ? 'location' : undefined}>
            {i.label}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <nav className="k-toc" aria-label="On this page">
      <details className="k-toc-mobile">
        <summary>On this page</summary>
        {list}
      </details>
      <div className="k-toc-desktop">
        <p className="k-toc-title">On this page</p>
        {list}
      </div>
    </nav>
  );
}

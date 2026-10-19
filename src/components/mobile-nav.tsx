'use client';

import { useEffect, useRef, useState } from 'react';

/** The menu button and sheet shown below 900px. Esc and any link close it. */
export function MobileNav({ links, logInUrl }: { links: ReadonlyArray<{ href: string; label: string }>; logInUrl: string }): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    sheet.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !sheet.current) return;
      // Keep focus inside the open menu.
      const items = sheet.current.querySelectorAll<HTMLElement>('a');
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={button}
        type="button"
        className="k-menu-btn"
        aria-expanded={open}
        aria-controls="k-mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="k-menu-icon" data-open={open} aria-hidden />
      </button>
      <div id="k-mobile-menu" ref={sheet} className="k-sheet" hidden={!open}>
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={logInUrl}>Log in</a>
          </li>
        </ul>
      </div>
    </>
  );
}

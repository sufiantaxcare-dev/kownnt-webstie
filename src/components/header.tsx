import { site } from '@/content/site';
import { BrandLockup } from './brand';
import { MobileNav } from './mobile-nav';

export const NAV_LINKS = [
  { href: '/#features', label: 'Features' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#email', label: 'Business email' },
  { href: '/#security', label: 'Security' },
  { href: '/#faq', label: 'FAQ' },
] as const;

export function Header(): React.JSX.Element {
  return (
    <header className="k-header">
      <div className="k-container k-header-inner">
        <BrandLockup />
        <nav className="k-nav" aria-label="Main">
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="k-header-actions">
          <a className="k-btn k-btn-primary k-btn-sm" href={site.getStartedUrl}>
            Get started
          </a>
          <MobileNav links={NAV_LINKS} />
        </div>
      </div>
      <span className="k-progress" aria-hidden />
    </header>
  );
}

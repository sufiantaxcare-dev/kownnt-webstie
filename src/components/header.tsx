import { site } from '@/content/site';
import { BrandLockup } from './brand';
import { MobileNav } from './mobile-nav';

export const NAV_LINKS = [
  { href: '/product', label: 'Product' },
  { href: '/#solutions', label: 'Solutions' },
  { href: '/resources', label: 'Resources' },
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
          <a className="k-link-quiet k-hide-sm" href={site.logInUrl}>
            Log in
          </a>
          <a className="k-btn k-btn-white k-btn-sm" href={site.getStartedUrl}>
            Get started <span aria-hidden>→</span>
          </a>
          <MobileNav links={NAV_LINKS} logInUrl={site.logInUrl} />
        </div>
      </div>
      <span className="k-progress" aria-hidden />
    </header>
  );
}

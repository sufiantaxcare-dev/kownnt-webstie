import { site } from '@/content/site';
import { BrandLockup } from './brand';

export function Footer(): React.JSX.Element {
  const { owner } = site;
  return (
    <footer className="k-footer">
      <div className="k-container">
        <div className="k-footer-top">
          <div className="k-footer-brand">
            <BrandLockup size={28} />
            <p>{site.tagline}</p>
          </div>
          <nav className="k-footer-cols" aria-label="Footer">
            <div>
              <h2>Product</h2>
              <ul>
                <li><a href="/#features">Features</a></li>
                <li><a href="/#how-it-works">How it works</a></li>
                <li><a href="/#accountants">For accountants</a></li>
                <li><a href="/#vat-deadlines">VAT deadline checker</a></li>
                <li><a href="/#faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h2>Trust</h2>
              <ul>
                <li><a href="/privacy">Privacy policy</a></li>
                <li><a href="/terms">Terms of service</a></li>
                <li><a href="/#email">How we use your email</a></li>
                <li><a href="/#security">Security</a></li>
              </ul>
            </div>
            <div>
              <h2>Contact</h2>
              <ul>
                <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
                <li><a href={owner.website}>{owner.tradingName}</a></li>
              </ul>
            </div>
          </nav>
        </div>
        <p className="k-footer-legal">
          © {new Date().getFullYear()} {owner.legalName}. kownt.ai is a product of {owner.legalName}, registered in{' '}
          {owner.jurisdiction}, company number {owner.companyNumber}. {owner.address.join(', ')}.
        </p>
      </div>
    </footer>
  );
}

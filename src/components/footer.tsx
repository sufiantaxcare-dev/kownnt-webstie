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
                <li><a href="/product">Product</a></li>
                <li><a href="/#how-it-works">How it works</a></li>
                <li><a href="/#solutions">Who it is for</a></li>
                <li><a href={site.getStartedUrl}>Get started</a></li>
              </ul>
            </div>
            <div>
              <h2>Resources</h2>
              <ul>
                <li><a href="/resources">VAT deadline checker</a></li>
                <li><a href="/#faq">FAQ</a></li>
                <li><a href="/#security">Security</a></li>
                <li><a href={site.demoUrl}>Book a demo</a></li>
              </ul>
            </div>
            <div>
              <h2>Legal</h2>
              <ul>
                <li><a href="/privacy">Privacy policy</a></li>
                <li><a href="/terms">Terms of service</a></li>
                <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="k-footer-legal">
          <p>
            © {new Date().getFullYear()} {owner.legalName}. kownt.ai is a product of {owner.legalName}, registered in{' '}
            {owner.jurisdiction}, company number {owner.companyNumber}. {owner.address.join(', ')}.
          </p>
          <p>Figures and AI findings shown on this site are illustrative examples, not live data.</p>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound(): React.JSX.Element {
  return (
    <section className="k-section k-notfound">
      <div className="k-container">
        <h1>We couldn’t find that page</h1>
        <p>The link may be old or mistyped. Go back to the homepage, or read our privacy policy.</p>
        <div className="k-hero-actions">
          <a className="k-btn k-btn-primary" href="/">
            Go to the homepage
          </a>
          <a className="k-btn k-btn-ghost" href="/privacy">
            Privacy policy
          </a>
        </div>
      </div>
    </section>
  );
}

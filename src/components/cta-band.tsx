import { site } from '@/content/site';

/** "Ready to make accounting easier?" - the closing band on every marketing page. */
export function CtaBand(): React.JSX.Element {
  return (
    <section className="k-section k-cta-section" aria-labelledby="cta-title">
      <div className="k-container">
        <div className="k-cta" data-reveal>
          <h2 id="cta-title">Ready to make accounting easier?</h2>
          <p>Let kownt.ai take the repetitive work off your hands, so you can focus on growing your business.</p>
          <div className="k-actions k-actions-center">
            <a className="k-btn k-btn-white k-btn-lg" href={site.getStartedUrl}>
              Get started
            </a>
            <a className="k-btn k-btn-ghost k-btn-lg" href={site.demoUrl}>
              Book a demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import { formatDate } from '@/content/site';
import { Toc } from './toc';

export type LegalSection = { id: string; title: string; body: React.ReactNode };

/** Shared layout for the privacy policy and terms: summary, sticky contents, numbered sections. */
export function LegalLayout({
  title,
  lastUpdated,
  summary,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  summary: React.ReactNode;
  intro?: React.ReactNode;
  sections: LegalSection[];
}): React.JSX.Element {
  const toc = sections.map((s, i) => ({ id: s.id, label: `${i + 1}. ${s.title}` }));
  return (
    <div className="k-legal">
      <div className="k-container">
        <header className="k-legal-head">
          <h1>{title}</h1>
          <p className="k-legal-meta">
            Last updated <time dateTime={lastUpdated}>{formatDate(lastUpdated)}</time>
          </p>
          <div className="k-legal-summary">
            <h2>In short</h2>
            {summary}
          </div>
          {intro}
        </header>
        <div className="k-legal-grid">
          <Toc items={toc} />
          <div className="k-prose">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`}>
                  <a className="k-anchor" href={`#${s.id}`}>
                    {i + 1}. {s.title}
                  </a>
                </h2>
                {s.body}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

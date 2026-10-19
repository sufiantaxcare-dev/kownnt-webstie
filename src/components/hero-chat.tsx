'use client';

import { useEffect, useState } from 'react';

/*
 * The hero: a page of a business's books with kownt.ai answering questions
 * about it. Each question lights up the rows its answer comes from. It moves
 * on by itself every few seconds until the visitor picks a question, the
 * tab is hidden, or they prefer reduced motion. All figures are fictional.
 */

type Row = { id: string; date: string; who: string; amount: string; category: string; incoming?: boolean };

const ROWS: Row[] = [
  { id: 'stripe', date: '02 Oct', who: 'Stripe payout', amount: '1,840.00', category: 'Sales', incoming: true },
  { id: 'shell', date: '03 Oct', who: 'Shell, Edgbaston', amount: '62.15', category: 'Motor' },
  { id: 'inv31', date: '06 Oct', who: 'Harbour Café, INV-0031', amount: '2,400.00', category: 'Invoice paid', incoming: true },
  { id: 'adobe', date: '09 Oct', who: 'Adobe', amount: '54.98', category: 'Software' },
  { id: 'train', date: '14 Oct', who: 'Trainline', amount: '38.40', category: 'Travel' },
  { id: 'rent', date: '17 Oct', who: 'Office rent', amount: '1,250.00', category: 'Premises' },
];

type Scene = {
  chip: string;
  question: string;
  rows: string[];
  answer: React.ReactNode;
};

const SCENES: Scene[] = [
  {
    chip: 'VAT this quarter',
    question: 'How much VAT do I owe this quarter?',
    rows: ['stripe', 'inv31', 'shell', 'adobe'],
    answer: (
      <>
        <p>
          <strong>£4,812.60</strong>, due by 7 November.
        </p>
        <table className="k-answer-table">
          <tbody>
            <tr><th scope="row">VAT on sales</th><td>£6,240.00</td></tr>
            <tr><th scope="row">VAT you can reclaim</th><td>£1,427.40</td></tr>
            <tr className="k-answer-total"><th scope="row">To pay HMRC</th><td>£4,812.60</td></tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    chip: 'Who owes me',
    question: "Who hasn't paid me yet?",
    rows: [],
    answer: (
      <>
        <p>
          Three invoices, <strong>£3,960.00</strong> in total. Northgate Joinery is 12 days late.
        </p>
        <table className="k-answer-table">
          <tbody>
            <tr><th scope="row">Northgate Joinery</th><td>£1,620.00</td></tr>
            <tr><th scope="row">Bloom &amp; Co</th><td>£1,140.00</td></tr>
            <tr><th scope="row">Aston Lettings</th><td>£1,200.00</td></tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    chip: 'A new receipt',
    question: "Here's my receipt for the train to London.",
    rows: ['train'],
    answer: (
      <p>
        Matched to <strong>Trainline, £38.40</strong> on 14 October. Filed under Travel, with £6.40 VAT to reclaim.
      </p>
    ),
  },
];

const TYPE_MS = 30;
const THINK_MS = 850;
const READ_MS = 5200;
const MAX_ROUNDS = SCENES.length * 3;

type Phase = 'typing' | 'thinking' | 'answer';

export function HeroChat(): React.JSX.Element {
  const [scene, setScene] = useState(0);
  // Server render and no-JS show the whole first exchange.
  const [typed, setTyped] = useState(SCENES[0]!.question.length);
  const [phase, setPhase] = useState<Phase>('answer');
  const [auto, setAuto] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [rounds, setRounds] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      setAuto(false);
    }
  }, []);

  // Each scene: type the question, think, then answer.
  useEffect(() => {
    const q = (SCENES[scene] ?? SCENES[0]!).question;
    if (reduced) {
      setTyped(q.length);
      setPhase('answer');
      return;
    }
    setTyped(0);
    setPhase('typing');
    let i = 0;
    let think = 0;
    const tick = window.setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= q.length) {
        window.clearInterval(tick);
        setPhase('thinking');
        think = window.setTimeout(() => setPhase('answer'), THINK_MS);
      }
    }, TYPE_MS);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(think);
    };
  }, [scene, reduced]);

  // Move on once the answer has had time to be read.
  useEffect(() => {
    if (!auto || phase !== 'answer' || rounds >= MAX_ROUNDS) return;
    const t = window.setTimeout(() => {
      setScene((s) => (s + 1) % SCENES.length);
      setRounds((r) => r + 1);
    }, READ_MS);
    return () => window.clearTimeout(t);
  }, [auto, phase, rounds]);

  const current = SCENES[scene] ?? SCENES[0]!;
  const lit = phase === 'answer' ? current.rows : [];

  return (
    <div className="k-hero-demo" aria-label="Example: asking kownt.ai about a business's books" role="group">
      <div className="k-ledger" aria-hidden>
        <div className="k-ledger-head">
          <span>Business current account</span>
          <span>October</span>
        </div>
        <ul>
          {ROWS.map((r, i) => (
            <li
              key={r.id}
              className="k-ledger-row"
              data-lit={lit.includes(r.id)}
              style={{ '--i': i } as React.CSSProperties}
            >
              <span className="k-ledger-date">{r.date}</span>
              <span className="k-ledger-who">{r.who}</span>
              <span className="k-ledger-cat">{r.category}</span>
              <span className="k-ledger-amt" data-in={r.incoming ?? false}>
                {r.incoming ? '+' : '−'}
                {r.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="k-chat">
        <p className="k-bubble-q" key={`q${scene}`}>
          <span className="k-sr">{current.question}</span>
          <span aria-hidden>
            {current.question.slice(0, typed)}
            {phase === 'typing' && <span className="k-caret" />}
          </span>
        </p>
        <div className="k-bubble-a" data-phase={phase}>
          {phase === 'thinking' && (
            <span className="k-thinking" aria-hidden>
              <i />
              <i />
              <i />
            </span>
          )}
          {phase === 'answer' && (
            <div className="k-bubble-a-body" key={`a${scene}`}>
              {current.answer}
            </div>
          )}
          {phase === 'typing' && <span className="k-bubble-wait" aria-hidden />}
        </div>
      </div>

      <div className="k-demo-chips" role="group" aria-label="Example questions">
        {SCENES.map((s, i) => (
          <button
            key={s.chip}
            type="button"
            aria-pressed={i === scene}
            className="k-chip"
            onClick={() => {
              setAuto(false);
              setScene(i);
            }}
          >
            {s.chip}
          </button>
        ))}
        {auto && !reduced && (
          <button type="button" className="k-chip k-chip-quiet" onClick={() => setAuto(false)}>
            Pause
          </button>
        )}
      </div>
    </div>
  );
}

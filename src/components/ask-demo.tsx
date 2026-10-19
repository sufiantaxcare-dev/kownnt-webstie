'use client';

import { useEffect, useRef, useState } from 'react';

/*
 * "Ask your AI accountant": a question types itself, the assistant thinks,
 * then answers - three examples in turn. It starts when it scrolls into view,
 * pauses on hover, and shows the first exchange still for reduced motion.
 * All figures are illustrative.
 */

const EXAMPLES = [
  {
    q: 'Why did my expenses increase this month?',
    a: 'Most of the rise comes from two new software subscriptions, £129.00 and £54.98. Want to review them?',
  },
  {
    q: 'How much VAT do I owe this quarter?',
    a: '£4,812.60, due by 7 November. That is £6,240.00 charged on sales less £1,427.40 you can reclaim.',
  },
  {
    q: "Who hasn't paid me yet?",
    a: 'Three invoices, £3,960.00 in total. Northgate Joinery is 12 days late. Shall I send a reminder?',
  },
] as const;

type Phase = 'typing' | 'thinking' | 'answer';
const TYPE_MS = 32;
const THINK_MS = 900;
const READ_MS = 4800;

export function AskDemo(): React.JSX.Element {
  const root = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState<number>(EXAMPLES[0].q.length);
  const [phase, setPhase] = useState<Phase>('answer');
  const [on, setOn] = useState(false);
  const [hover, setHover] = useState(false);

  // Start once visible (and never for reduced motion).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) {
        setOn(true);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Type, think, answer.
  useEffect(() => {
    if (!on) return;
    const q = (EXAMPLES[i] ?? EXAMPLES[0]).q;
    setTyped(0);
    setPhase('typing');
    let n = 0;
    let think = 0;
    const tick = window.setInterval(() => {
      n += 1;
      setTyped(n);
      if (n >= q.length) {
        window.clearInterval(tick);
        setPhase('thinking');
        think = window.setTimeout(() => setPhase('answer'), THINK_MS);
      }
    }, TYPE_MS);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(think);
    };
  }, [i, on]);

  // Next example once the answer has been read.
  useEffect(() => {
    if (!on || hover || phase !== 'answer') return;
    const t = window.setTimeout(() => setI((x) => (x + 1) % EXAMPLES.length), READ_MS);
    return () => window.clearTimeout(t);
  }, [on, hover, phase]);

  const ex = EXAMPLES[i] ?? EXAMPLES[0];
  return (
    <div className="k-chat" ref={root} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <p className="k-bubble-me" key={`q${i}`}>
        <span className="k-sr">{ex.q}</span>
        <span aria-hidden>
          {ex.q.slice(0, typed)}
          {phase === 'typing' && <span className="k-caret" />}
        </span>
      </p>
      {phase === 'thinking' && (
        <p className="k-bubble-ai k-thinking" aria-hidden>
          <i />
          <i />
          <i />
        </p>
      )}
      {phase === 'answer' && (
        <p className="k-bubble-ai" key={`a${i}`}>
          {ex.a}
        </p>
      )}
      <div className="k-chat-dots" aria-hidden>
        {EXAMPLES.map((_, n) => (
          <span key={n} data-on={n === i} />
        ))}
      </div>
    </div>
  );
}

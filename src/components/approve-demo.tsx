'use client';

import { useState } from 'react';

const OPTIONS = ['Office supplies', 'Printing and stationery', 'Software'] as const;

/** The AI bookkeeping card's sample line: approve the suggestion, or change it. */
export function ApproveDemo(): React.JSX.Element {
  const [choice, setChoice] = useState(0);
  const [approved, setApproved] = useState(false);
  return (
    <div className="k-approve" data-approved={approved}>
      <span className="k-approve-what">
        <strong>£48.99</strong> · Brightline Stationers
      </span>
      <span className="k-chip-tag k-chip-ok" key={`${choice}-${approved}`}>
        {approved ? `${OPTIONS[choice]} ✓` : `Suggested: ${OPTIONS[choice]}`}
      </span>
      {approved ? (
        <button type="button" className="k-mini-btn k-mini-ghost" onClick={() => setApproved(false)}>
          Undo
        </button>
      ) : (
        <span className="k-approve-actions">
          <button type="button" className="k-mini-btn" onClick={() => setApproved(true)}>
            Approve
          </button>
          <button type="button" className="k-mini-btn k-mini-ghost" onClick={() => setChoice((c) => (c + 1) % OPTIONS.length)}>
            Change
          </button>
        </span>
      )}
    </div>
  );
}

/** Site copy as data, so the pages and their structured data never disagree. */

export const PAIN_POINTS = [
  'Categorising bank transactions by hand',
  'Chasing missing receipts',
  'Hunting duplicate expenses',
  'Fixing bookkeeping mistakes',
  'Guessing how the business is doing',
] as const;

/** The activity ticker under the hero - illustrative examples. */
export const TICKER = [
  ['Receipt matched', 'Screwfix £84.20'],
  ['Invoice paid', 'INV-0031 £2,400.00'],
  ['VAT summary ready', 'Jul to Sep'],
  ['Possible duplicate', 'Cloudhost £129.00'],
  ['Rent received', 'Flat 2 £950.00'],
  ['Reminder sent', 'INV-0028, 7 days late'],
  ['Bank feed synced', '18 new transactions'],
  ['Categorised', 'Adobe → Software'],
] as const;

export const STEPS = [
  { who: 'You', kind: 'you', text: 'Connect your bank or import transactions.' },
  { who: 'Automatic', kind: 'auto', text: 'AI suggests categories.' },
  { who: 'Your approval', kind: 'approve', text: 'Review uncertain transactions.' },
  { who: 'Automatic', kind: 'auto', text: 'Check balances and reports.' },
  { who: 'You', kind: 'you', text: 'Review your financial position.' },
] as const;

export const AUDIENCES = [
  {
    title: 'Small business owners',
    text: 'Spend less time on administration and more on the work that pays.',
    image: '/images/who-business.webp',
    noteTitle: 'Invoice paid',
    note: 'Harbour Café paid INV-0031, £2,400.00',
    alt: 'A café owner working on a laptop behind the counter',
  },
  {
    title: 'Landlords',
    text: 'Organise property income and expenses, ready for your tax return.',
    image: '/images/who-landlord.webp',
    noteTitle: 'Rent received',
    note: 'Flat 2, Mill Lane: £950.00 matched',
    alt: 'A landlord handing a set of keys to a new tenant',
  },
  {
    title: 'Accountants and bookkeepers',
    text: 'Streamline client bookkeeping and review work across every client.',
    image: '/images/who-accountant.webp',
    noteTitle: 'Ready for review',
    note: '3 client VAT returns due this week',
    alt: 'An accountant smiling as she goes through documents with a client',
  },
] as const;

export const TRUST = [
  { title: 'Encrypted', text: 'Data is encrypted in transit and at rest. Bank and email connection keys are encrypted again on top.' },
  { title: 'Your business, kept separate', text: 'Each business’s records are held apart, and every request is checked against who is allowed to see what.' },
  { title: 'Permissions and two-step sign-in', text: 'Give each person only the access they need, and protect sign-in with a code from your phone.' },
  { title: 'A record of every change', text: 'A tamper-evident audit trail logs each change. Approved entries are never quietly edited.' },
  { title: 'Read-only bank access', text: 'Bank connections use Open Banking and can see transactions, never move money.' },
  { title: 'AI that does not learn from you', text: 'Our AI provider processes your requests on our behalf and does not use your data to train its models.' },
] as const;

export const FAQ = [
  {
    q: 'Are AI suggestions final?',
    a: 'No. Suggestions are not confirmed accounting entries until you approve them. You can accept, change or reject each one.',
  },
  {
    q: 'Does kownt.ai file my VAT return?',
    a: 'kownt.ai helps you prepare VAT summaries and checks from your records. Submission to HMRC is a separate step that you approve.',
  },
  {
    q: 'How is my data protected?',
    a: 'Your data is encrypted in transit and at rest, each business’s records are kept separate, and every change is recorded in an audit trail. Bank access is read-only. Our privacy policy sets out exactly how data is handled.',
  },
  {
    q: 'Can I cancel at any time?',
    a: 'Yes. You can cancel from your account whenever you like, and export your records first. See our terms of service for the details.',
  },
  {
    q: 'Who is kownt.ai for?',
    a: 'Small business owners, sole traders and limited companies, landlords, and the accountants and bookkeepers who look after them.',
  },
  {
    q: 'Why does kownt.ai ask for access to my email?',
    a: 'Only if you choose to connect your business Gmail or Microsoft 365 account, so invoices and quotes go from your own address and customers’ replies are matched to them. It never reads your personal email or uses it to train AI.',
  },
] as const;

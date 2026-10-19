/** Homepage copy as data, so the page and its structured data never disagree. */

export const FEATURES = [
  {
    name: 'Bank feeds',
    visual: 'bank',
    text: 'Connect your business bank account through Open Banking. New transactions arrive by themselves and are sorted into the right categories.',
    sample: '142 of 180 sorted',
  },
  {
    name: 'Receipts',
    visual: 'receipt',
    text: 'Take a photo or forward the email. kownt.ai reads the receipt, matches it to the payment and files it with the VAT worked out.',
    sample: 'Trainline £38.40, matched',
  },
  {
    name: 'Invoices and quotes',
    visual: 'invoice',
    text: 'Send invoices and quotes from your own business email address, and let polite reminders chase anyone who pays late.',
    sample: 'INV-0034 sent',
  },
  {
    name: 'VAT',
    visual: 'vat',
    text: 'Your VAT return is prepared from your books. Check every box and the transactions behind it, built for Making Tax Digital.',
    sample: 'Box 5 £4,812.60',
  },
  {
    name: 'Reports and tax',
    visual: 'reports',
    text: 'Profit and loss, balance sheet, cash flow and a running estimate of the tax you will owe, always up to date.',
    sample: 'Profit so far £38,210',
  },
  {
    name: 'Ask anything',
    visual: 'ask',
    text: 'Ask in plain English and get answers worked out from your own figures, with the workings shown so you can check them.',
    sample: '“Can I afford a van?”',
  },
] as const;

export const STEPS = [
  {
    title: 'Connect your bank',
    text: 'Link your business account in a couple of minutes. You can also connect your business email to send invoices from your own address.',
  },
  {
    title: 'Let kownt.ai keep the books',
    text: 'Transactions are sorted, receipts matched and anything unusual is flagged for you to check. Nothing is filed without your approval.',
  },
  {
    title: 'Just ask',
    text: 'What do I owe in VAT? Who owes me money? What can I claim? Ask in your own words, any time.',
  },
] as const;

export const SECURITY = [
  {
    title: 'Your business, kept separate',
    text: 'Every business’s records are held apart, and every request is checked against who is allowed to see what.',
  },
  {
    title: 'Encrypted',
    text: 'Data is encrypted in transit and at rest. The keys that connect your bank and email are encrypted again on top.',
  },
  {
    title: 'Two-step sign-in',
    text: 'Protect your account with a code from your phone as well as your password.',
  },
  {
    title: 'A record of every change',
    text: 'Each change is logged in a tamper-evident audit trail, and posted entries are never quietly edited.',
  },
] as const;

export const FAQ = [
  {
    q: 'Who is kownt.ai for?',
    a: 'UK sole traders, limited companies and partnerships who want their books, VAT and tax in one place, and the accountants who look after them.',
  },
  {
    q: 'Is kownt.ai an accountant?',
    a: 'kownt.ai is accounting software with an AI assistant built in. It does the everyday bookkeeping and answers questions from your figures. For advice on your own situation, you can invite your accountant to work alongside you in kownt.ai. It is made by Tax Care Accountants, a UK accounting firm.',
  },
  {
    q: 'Does it work with Making Tax Digital for VAT?',
    a: 'Yes. kownt.ai prepares your VAT return from your books so you can check each box and the transactions behind it. Returns are only ever sent to HMRC when you approve them.',
  },
  {
    q: 'Which banks can I connect?',
    a: 'Most UK banks, through Open Banking. The connection is read-only: kownt.ai can see your transactions but can never move money. You can also import a statement file.',
  },
  {
    q: 'Why does kownt.ai ask for access to my email?',
    a: 'Only if you choose to connect your business Gmail or Microsoft 365 account. kownt.ai then sends the invoices, quotes and reminders you ask it to from your own address, and, if you switch it on, picks up your customers’ replies to them. It never reads your personal email, and never uses your email to train AI or for advertising.',
  },
  {
    q: 'Where is my data kept, and who can see it?',
    a: 'Your data is kept on secure cloud servers and is only seen by the people you give access to in your business, and anyone you invite, such as your accountant. Our privacy policy lists every provider we use.',
  },
  {
    q: 'How do I delete my account?',
    a: 'Email support and we will close your account and delete your data, apart from the accounting records the law says must be kept, usually for six years. You can export your data first.',
  },
] as const;

export const PERSONAS = [
  {
    id: 'sole-trader',
    image: '/images/sole-trader.webp',
    alt: 'A mechanic in blue overalls checking his phone in a workshop',
    label: 'Sole trader',
    title: 'Your books done, without the evenings',
    text: 'Snap receipts as you go and let your bank feed do the rest. Always know how much to put aside for tax.',
    points: [
      'Receipts read and filed from a photo',
      'A running estimate of the tax you will owe',
      'Invoices that chase late payers for you',
    ],
    cta: 'Get started as a sole trader',
    card: {
      label: 'Put aside for tax this month',
      value: '£412.00',
      note: 'Based on your profit so far this tax year',
      rows: [
        ['Income this year', '£28,940'],
        ['Allowable expenses', '£6,115'],
        ['Receipts still to snap', '2'],
      ],
    },
  },
  {
    id: 'limited-company',
    image: '/images/limited-company.webp',
    alt: 'A café owner working on a laptop behind the counter',
    label: 'Limited company',
    title: 'Run the company, not the spreadsheet',
    text: 'VAT, invoicing and management reports kept up to date from your bank, so you can see where the business stands at any time.',
    points: [
      'VAT returns prepared from your books, built for Making Tax Digital',
      'Invoices and quotes sent from your own business email',
      'Profit, cash flow and who owes you, on one screen',
    ],
    cta: 'Get started as a company',
    card: {
      label: 'Cash in the bank',
      value: '£14,300.00',
      note: 'Across 2 connected accounts',
      rows: [
        ['Owed to you', '£3,960'],
        ['Bills due this month', '£2,180'],
        ['Next VAT return', '7 Nov'],
      ],
    },
  },
  {
    id: 'accountant',
    image: '/images/accountant.webp',
    alt: 'An accountant smiling as she goes through documents with a client',
    label: 'Accountant',
    title: 'Every client, one place',
    text: 'See each client’s books, deadlines and approvals together, and let clients ask kownt.ai the everyday questions instead of emailing you.',
    points: [
      'Deadlines across every client, soonest first',
      'Approve returns before anything is sent to HMRC',
      'A full audit trail of who changed what',
    ],
    cta: 'Get started as a practice',
    card: {
      label: 'Due in the next 30 days',
      value: '6 deadlines',
      note: 'Across 24 clients',
      rows: [
        ['Harbour Café Ltd', 'VAT, 7 Nov'],
        ['Northgate Joinery', 'Payroll, 22 Nov'],
        ['Aston Lettings', 'VAT, 7 Dec'],
      ],
    },
  },
] as const;

export const BUSINESSES = [
  {
    name: 'Plumbing and heating',
    line: 'Receipts snapped between jobs, straight from the van.',
    image: '/images/trades.webp',
    alt: 'A smiling tradesman in a high-visibility vest standing by his van with a box of tools',
    noteTitle: 'Receipt matched',
    note: 'Screwfix £84.20, with £14.03 VAT to reclaim',
  },
  {
    name: 'Hair salon',
    line: 'Card takings and fees sorted every evening.',
    image: '/images/salon.webp',
    alt: 'A hairdresser smiling at her station in a bright salon',
    noteTitle: 'Takings sorted',
    note: 'This week £2,140, card fees filed under bank charges',
  },
  {
    name: 'Florist',
    line: 'Wedding quotes turned into invoices in one tap.',
    image: '/images/florist.webp',
    alt: 'A florist in an apron taking an order on the phone in her flower shop',
    noteTitle: 'Quote accepted',
    note: 'QUO-0004 is ready to turn into an invoice',
  },
  {
    name: 'Online shop',
    line: 'Payouts matched to orders, automatically.',
    image: '/images/online-shop.webp',
    alt: 'A woman packing online orders at a desk with cardboard boxes and a clothes rail',
    noteTitle: 'Payout matched',
    note: 'Stripe £1,840.00 matched to 23 orders',
  },
  {
    name: 'Cleaning company',
    line: 'Late payers chased without awkward calls.',
    image: '/images/cleaning.webp',
    alt: 'Two cleaners in orange uniforms unloading equipment from a van outside a house',
    noteTitle: 'Reminder sent',
    note: 'INV-0028 is 7 days late, polite nudge sent',
  },
] as const;

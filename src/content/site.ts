/**
 * Every fact the site states about itself, in one place. The name, URLs and
 * support email must match the Google and Microsoft consent screens exactly,
 * so change them here and nowhere else.
 */
export const site = {
  name: 'kownt.ai',
  url: 'https://kownt.ai',
  /** Where every "Get started" button goes. */
  getStartedUrl: 'https://app.kownt.ai',
  logInUrl: 'https://app.kownt.ai/login',
  demoUrl: 'mailto:info@kownt.ai?subject=Book%20a%20kownt.ai%20demo',
  tagline: 'Your accounts. Your tax. Just ask.',
  description:
    'Meet your AI accountant. kownt.ai automates bookkeeping, organises transactions and turns your financial data into clear business insights for UK businesses, landlords and accountants.',
  /** The one contact address used everywhere on the site (support, privacy, practices). */
  email: 'info@kownt.ai',
  owner: {
    legalName: 'Tax Care Certified Accountants Limited',
    tradingName: 'Tax Care Accountants',
    companyNumber: '11409294',
    jurisdiction: 'England and Wales',
    address: ['21st Floor, Alpha Tower', 'Suffolk Street Queensway', 'Birmingham', 'B1 1TT'],
    website: 'https://taxcare.org.uk',
  },
  homeLastUpdated: '2026-10-19',
  privacyLastUpdated: '2026-10-19',
  termsLastUpdated: '2026-10-19',
} as const;

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

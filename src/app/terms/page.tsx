import type { Metadata } from 'next';
import { site } from '@/content/site';
import { LegalLayout, type LegalSection } from '@/components/legal-layout';
import { breadcrumbs, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/json-ld';

export const metadata: Metadata = pageMetadata({
  title: 'Terms of service',
  description: 'The terms that apply when you use kownt.ai, accounting software for UK businesses.',
  path: '/terms',
});

const { owner, email } = site;
const supportMail = <a href={`mailto:${email}`}>{email}</a>;

const SECTIONS: LegalSection[] = [
  {
    id: 'about',
    title: 'About these terms',
    body: (
      <p>
        These terms are an agreement between you and {owner.legalName}, company number {owner.companyNumber}, of{' '}
        {owner.address.join(', ')} (“we”, “us”). They apply when you use kownt.ai. By creating an account you accept
        them on behalf of yourself and the business you use kownt.ai for.
      </p>
    ),
  },
  {
    id: 'service',
    title: 'What kownt.ai provides',
    body: (
      <p>
        kownt.ai is online accounting software with an AI assistant. It helps you keep your books, prepare VAT returns,
        send invoices and understand your figures. We keep improving it, so features may change. We will tell you in
        advance about any change that takes away something important you rely on.
      </p>
    ),
  },
  {
    id: 'advice',
    title: 'Software, not personal advice',
    body: (
      <>
        <p>
          kownt.ai’s answers and suggestions, including those from the AI assistant, are produced automatically from
          the information in your account. They are not personal tax, legal or financial advice. Check important
          figures before you rely on them, and speak to a qualified accountant about your own situation.
        </p>
        <p>
          You are responsible for the accuracy of the records you keep and for every return you approve and submit.
          Nothing is sent to HMRC unless you approve it.
        </p>
      </>
    ),
  },
  {
    id: 'account',
    title: 'Your account',
    body: (
      <p>
        Keep your sign-in details safe and turn on two-step sign-in. You are responsible for what happens in your
        account, including what people you invite do. Tell us straight away at {supportMail} if you think someone else
        has used it.
      </p>
    ),
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable use',
    body: (
      <p>
        Do not use kownt.ai for anything unlawful, to send spam, to upload data you have no right to use, or to try to
        break, overload or get around the security of the service. We may suspend an account that does, and will tell
        you why unless the law prevents us.
      </p>
    ),
  },
  {
    id: 'connections',
    title: 'Bank and email connections',
    body: (
      <p>
        When you connect a bank or business email account, you allow kownt.ai to use it as described in our{' '}
        <a href="/privacy">privacy policy</a>. Those services are run by other companies under their own terms. You can
        disconnect them at any time.
      </p>
    ),
  },
  {
    id: 'your-data',
    title: 'Your data',
    body: (
      <p>
        Your records belong to you. You let us store and process them only to provide kownt.ai. You can export them at
        any time. How we handle personal data is set out in our <a href="/privacy">privacy policy</a>.
      </p>
    ),
  },
  {
    id: 'fees',
    title: 'Fees',
    body: (
      <p>
        Prices are shown in the app before you subscribe. Subscriptions renew automatically until you cancel, and you
        can cancel at any time from your account. Paid fees are not refunded for part-used periods unless the law says
        otherwise.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Our responsibility to you',
    body: (
      <>
        <p>
          We provide kownt.ai with reasonable care and skill. We are not responsible for losses caused by information
          you entered incorrectly, by decisions you made relying on figures you did not check, by services we do not
          control (such as your bank, email provider or HMRC), or for loss of profit or business. Unless the law says
          otherwise, our total responsibility to you in any year is limited to the fees you paid us in that year.
        </p>
        <p>
          Nothing in these terms limits responsibility for death or personal injury caused by negligence, for fraud, or
          for anything else that cannot be limited by law.
        </p>
      </>
    ),
  },
  {
    id: 'ending',
    title: 'Ending the agreement',
    body: (
      <p>
        You can close your account at any time. We may close it if you seriously break these terms, giving notice
        where we reasonably can. After closing, you can ask for an export of your data. We keep accounting records for
        as long as the law requires, then delete them.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    body: (
      <p>
        We may update these terms. We will tell you about important changes before they take effect. If you do not
        agree, you can close your account before then.
      </p>
    ),
  },
  {
    id: 'law',
    title: 'Law and contact',
    body: (
      <p>
        These terms are governed by the law of England and Wales, and the courts of England and Wales can hear any
        dispute. Questions? Email {supportMail}.
      </p>
    ),
  },
];

export default function TermsPage(): React.JSX.Element {
  return (
    <>
    <JsonLd data={breadcrumbs('Terms of service', '/terms')} />
    <LegalLayout
      title="Terms of service"
      lastUpdated={site.termsLastUpdated}
      summary={
        <ul>
          <li>kownt.ai is accounting software. Its answers are not personal advice.</li>
          <li>You approve everything that is sent to HMRC.</li>
          <li>Your records belong to you, and you can export them at any time.</li>
          <li>You can cancel whenever you like.</li>
        </ul>
      }
      sections={SECTIONS}
    />
    </>
  );
}

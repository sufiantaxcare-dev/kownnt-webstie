import type { Metadata } from 'next';
import { site } from '@/content/site';
import { LegalLayout, type LegalSection } from '@/components/legal-layout';
import { breadcrumbs, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/json-ld';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy policy',
  description:
    'How kownt.ai collects, uses and protects your data, including Google and Microsoft account data, bank data and your UK GDPR rights.',
  path: '/privacy',
});

const { owner, email } = site;
const privacyMail = <a href={`mailto:${email}`}>{email}</a>;

const SECTIONS: LegalSection[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: (
      <>
        <p>
          kownt.ai is a product of <strong>{owner.legalName}</strong> (trading as {owner.tradingName}), a company
          registered in {owner.jurisdiction} with company number {owner.companyNumber}, whose address is{' '}
          {owner.address.join(', ')}. In this policy, “we”, “us” and “our” mean {owner.legalName}.
        </p>
        <p>
          We are the <strong>controller</strong> of the personal data we use to run your kownt.ai account. When an
          accounting firm uses kownt.ai to look after its clients’ books, the firm decides how its clients’ data is
          used, and we act as its <strong>processor</strong> for that data.
        </p>
        <p>For anything about privacy, email {privacyMail}.</p>
      </>
    ),
  },
  {
    id: 'data-we-collect',
    title: 'The data we collect',
    body: (
      <>
        <ul>
          <li>
            <strong>Account details:</strong> your name, email address, phone number if you add one, password (stored
            only as a secure hash) and two-step sign-in settings.
          </li>
          <li>
            <strong>Business and financial records:</strong> what you enter, import or upload, such as company
            details, customers, suppliers, transactions, invoices, quotes, bills, receipts, payroll and VAT records.
          </li>
          <li>
            <strong>Bank data:</strong> if you connect a bank account, its transactions and balances (see section 6).
          </li>
          <li>
            <strong>Email account data:</strong> if you connect Gmail or Microsoft 365 (see section 5).
          </li>
          <li>
            <strong>Usage and device data:</strong> sign-in times, IP address, browser and device details, and logs of
            actions taken in your account, used for security and to keep a reliable audit trail.
          </li>
          <li>
            <strong>Messages to us:</strong> what you send when you contact support.
          </li>
        </ul>
        <p>
          Your records may include personal data about other people, such as your customers, suppliers and
          employees. You are responsible for having the right to add it, and we look after it in the same way as
          your own.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: 'How we use your data, and why we are allowed to',
    body: (
      <>
        <div className="k-table-wrap">
          <table>
            <caption>Purposes and lawful bases under UK GDPR</caption>
            <thead>
              <tr>
                <th scope="col">What we do</th>
                <th scope="col">Lawful basis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Provide kownt.ai: keep your books, prepare returns, send your documents, answer your questions</td>
                <td>Contract</td>
              </tr>
              <tr>
                <td>Keep accounting and tax records for as long as the law requires</td>
                <td>Legal obligation</td>
              </tr>
              <tr>
                <td>Send HMRC the fraud-prevention information Making Tax Digital requires</td>
                <td>Legal obligation</td>
              </tr>
              <tr>
                <td>Keep accounts secure, prevent fraud and fix problems</td>
                <td>Legitimate interests</td>
              </tr>
              <tr>
                <td>Send service emails, such as sign-in codes, alerts and changes to these terms</td>
                <td>Contract</td>
              </tr>
              <tr>
                <td>Connect a bank or email account</td>
                <td>Contract, with your permission at the bank or email provider</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>We do not sell your data, and we do not use it for advertising.</p>
      </>
    ),
  },
  {
    id: 'ai',
    title: 'The AI assistant',
    body: (
      <>
        <p>
          kownt.ai’s AI features run on models provided by Anthropic. When you ask a question or use an AI feature,
          only the information needed for that request is sent, such as your question, a few basic details about your
          business and the records the answer needs. Anthropic processes it on our behalf and does not use it to
          train its models.
        </p>
        <p>
          AI suggestions, such as a category for a transaction, are always shown to you and can be changed. Nothing
          is submitted to HMRC without a person approving it. We never use your data, including any Google or
          Microsoft user data, to train general AI or machine-learning models.
        </p>
      </>
    ),
  },
  {
    id: 'google-microsoft',
    title: 'Google and Microsoft account data',
    body: (
      <>
        <p>
          Connecting a business email account is optional. If you connect a Google (Gmail or Google Workspace) or
          Microsoft 365 account, this section explains exactly what kownt.ai accesses and what it does with it.
        </p>
        <h3>What we access</h3>
        <div className="k-table-wrap">
          <table>
            <caption>Permissions kownt.ai asks for</caption>
            <thead>
              <tr>
                <th scope="col">Permission</th>
                <th scope="col">Why we ask for it</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Send email on your behalf
                  <br />
                  <code>gmail.send</code>, <code>Mail.Send</code>
                </td>
                <td>To send the invoices, quotes, statements and reminders you ask kownt.ai to send, from your address.</td>
              </tr>
              <tr>
                <td>
                  Read your email
                  <br />
                  <code>gmail.readonly</code>, <code>Mail.Read</code>
                </td>
                <td>
                  Asked for only if you switch on reply tracking. Used to find replies to emails kownt.ai sent for you,
                  so they show on the right invoice, quote or bill.
                </td>
              </tr>
              <tr>
                <td>
                  Your basic profile
                  <br />
                  <code>User.Read</code>, email address
                </td>
                <td>To show which account is connected.</td>
              </tr>
              <tr>
                <td>
                  Stay connected
                  <br />
                  <code>offline_access</code>
                </td>
                <td>So scheduled reminders can be sent when you are not signed in.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>How we use it</h3>
        <ul>
          <li>Emails are sent only when you send them, or when a reminder schedule you have set up is due.</li>
          <li>
            With reply tracking on, kownt.ai looks only at mail that arrives after you switch it on. It keeps a
            message only if it is a reply to something kownt.ai sent, mentions one of your invoice or quote numbers,
            or comes from one of your customers. Everything else is ignored and not stored.
          </li>
          <li>
            A kept reply is shown on the related invoice, quote or bill, and may be read by kownt.ai’s assistant so it
            can tell you what the reply means, for example a promise to pay or a question.
          </li>
        </ul>

        <h3>How we store and protect it</h3>
        <p>
          The keys that let kownt.ai use your account (access and refresh tokens) are encrypted before they are
          stored, and are never shown in the app or to our staff. A copy of each email kownt.ai sends, and each reply
          it keeps, is stored with your business records so you have a full history.
        </p>

        <h3>Sharing</h3>
        <p>
          We do not sell, share or transfer Google or Microsoft user data to anyone, except as needed to provide the
          features above (for example, our AI provider when you ask about a reply), to keep the service secure, to
          comply with the law, or as part of a merger or sale of our business with notice to you. We never use it
          for advertising.
        </p>

        <h3>People reading your email</h3>
        <p>
          No person at kownt.ai reads your email data unless you ask us to for a specific message (for example, for
          support), it is needed for security reasons such as investigating abuse, or the law requires it.
        </p>

        <h3>Disconnecting and deletion</h3>
        <p>
          You can disconnect at any time in kownt.ai under Settings, Business email. When you do, we ask Google or
          Microsoft to revoke our access and delete the stored tokens straight away. You can also remove access from
          your Google Account (Security, Third-party connections) or Microsoft account (My Apps). Emails already sent
          stay in your records as part of your business history. To have those deleted too, email {privacyMail}.
        </p>

        <h3>Limited Use</h3>
        <p className="k-callout">
          kownt.ai’s use and transfer to any other app of information received from Google APIs will adhere to the{' '}
          <a href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>
      </>
    ),
  },
  {
    id: 'open-banking',
    title: 'Bank data',
    body: (
      <p>
        Bank connections are made through TrueLayer, which is authorised by the Financial Conduct Authority to provide
        account information services. The connection is read-only: kownt.ai can see transactions and balances, and can
        never make payments. You give permission at your bank, it lasts for up to 90 days before your bank asks you to
        renew it, and you can withdraw it at any time in kownt.ai or with your bank.
      </p>
    ),
  },
  {
    id: 'hmrc',
    title: 'HMRC and Making Tax Digital',
    body: (
      <p>
        When you approve a VAT return, kownt.ai sends it to HMRC through HMRC’s Making Tax Digital service. The law
        requires us to send HMRC certain fraud-prevention information with each submission, such as the IP address,
        device and browser details of the person submitting. We only send returns that a person has approved.
      </p>
    ),
  },
  {
    id: 'sharing',
    title: 'Who we share data with',
    body: (
      <>
        <p>
          We use trusted providers to run kownt.ai. Each one only gets the data it needs for its job and must protect
          it under a written contract.
        </p>
        <div className="k-table-wrap">
          <table>
            <caption>Service providers</caption>
            <thead>
              <tr>
                <th scope="col">Provider</th>
                <th scope="col">What for</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Vercel</td><td>Hosting this website and the kownt.ai web app</td></tr>
              <tr><td>Railway</td><td>Hosting our servers and database</td></tr>
              <tr><td>Anthropic</td><td>The AI assistant</td></tr>
              <tr><td>TrueLayer</td><td>Open Banking bank connections</td></tr>
              <tr><td>Stripe</td><td>Subscription payments</td></tr>
              <tr><td>Google and Microsoft</td><td>Sending and receiving business email, if you connect an account</td></tr>
              <tr><td>Email delivery provider</td><td>Sending service emails such as sign-in codes</td></tr>
              <tr><td>HMRC</td><td>Tax submissions you approve</td></tr>
              <tr><td>Companies House</td><td>Looking up public company details</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          If you invite other people, such as your accountant or team members, they can see the records you give them
          access to. We may also share data if the law requires it.
        </p>
      </>
    ),
  },
  {
    id: 'transfers',
    title: 'International transfers',
    body: (
      <p>
        Some of our providers process data outside the UK, for example in the United States. When they do, we rely on
        UK adequacy regulations or the UK International Data Transfer Agreement (or the EU Standard Contractual Clauses
        with the UK Addendum) so your data has the same level of protection.
      </p>
    ),
  },
  {
    id: 'retention',
    title: 'How long we keep data',
    body: (
      <ul>
        <li>
          <strong>Accounting records:</strong> at least six years after the end of the financial year they relate to,
          because UK company and tax law require it.
        </li>
        <li>
          <strong>Email and bank connection tokens:</strong> deleted as soon as you disconnect.
        </li>
        <li>
          <strong>Account details:</strong> for as long as your account is open, then deleted, except where we must
          keep them with your accounting records.
        </li>
        <li>
          <strong>Security and audit logs:</strong> as long as needed to keep accounts secure and records reliable.
        </li>
      </ul>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    body: (
      <p>
        Data is encrypted in transit and at rest. Bank and email tokens are encrypted again before they are stored.
        Each business’s records are kept separate and every request is checked against who may see them. You can turn
        on two-step sign-in, and every change is recorded in a tamper-evident audit trail. Only a small number of
        staff can access production systems, and only when they need to.
      </p>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    body: (
      <>
        <p>Under UK data protection law you have the right to:</p>
        <ul>
          <li>get a copy of your personal data;</li>
          <li>have inaccurate data corrected;</li>
          <li>have your data deleted, where we do not have to keep it by law;</li>
          <li>restrict or object to how we use it;</li>
          <li>receive your data in a format you can take elsewhere;</li>
          <li>withdraw any permission you have given, such as a bank or email connection.</li>
        </ul>
        <p>
          To use any of these rights, email {privacyMail}. We reply within one month. If you are unhappy with how we
          have handled your data, you can complain to the Information Commissioner’s Office at{' '}
          <a href="https://ico.org.uk">ico.org.uk</a> or on 0303 123 1113. We would like the chance to put it right
          first.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies',
    body: (
      <p>
        This website does not use tracking or advertising cookies. The kownt.ai app uses only the cookies and browser
        storage needed to keep you signed in and secure.
      </p>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    body: <p>kownt.ai is for businesses and is not meant for anyone under 18.</p>,
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        If we make an important change, we will tell you by email or in the app before it takes effect. The date at
        the top of this page shows when it was last updated.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: (
      <p>
        Email {privacyMail}, or write to {owner.legalName}, {owner.address.join(', ')}.
      </p>
    ),
  },
];

export default function PrivacyPage(): React.JSX.Element {
  return (
    <>
    <JsonLd data={breadcrumbs('Privacy policy', '/privacy')} />
    <LegalLayout
      title="Privacy policy"
      lastUpdated={site.privacyLastUpdated}
      summary={
        <ul>
          <li>We use your data to run your accounts, and for nothing else.</li>
          <li>We never sell your data or use it for advertising.</li>
          <li>Email access is only for sending your documents and tracking replies to them.</li>
          <li>You can ask for a copy of your data, or for it to be deleted, at any time.</li>
        </ul>
      }
      sections={SECTIONS}
    />
    </>
  );
}

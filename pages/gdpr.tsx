import { PageShell } from "@portfolio/components/layout";

export default function GdprPage() {
  return (
    <PageShell>
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">GDPR Compliance</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-8">
            Last updated: December 21, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Data Protection Rights
            </h2>
            <p>
              Under GDPR, you have the following rights regarding your personal
              data:
            </p>
            <ul>
              <li>The right to access your personal data</li>
              <li>The right to rectify inaccurate personal data</li>
              <li>The right to erase your personal data</li>
              <li>The right to restrict processing of your personal data</li>
              <li>The right to data portability</li>
              <li>The right to object to processing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Legal Basis for Processing
            </h2>
            <p>
              We process personal data based on the following legal grounds:
            </p>
            <ul>
              <li>Consent: When you explicitly agree to data processing</li>
              <li>
                Contract: When processing is necessary for contract performance
              </li>
              <li>
                Legitimate Interest: When processing serves our legitimate
                business interests
              </li>
              <li>Legal Obligation: When processing is required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
            <p>
              We retain personal data only as long as necessary for the purposes
              outlined in this policy, or as required by applicable laws and
              regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Contact Our Data Protection Officer
            </h2>
            <p>
              For GDPR-related inquiries or to exercise your data protection
              rights, please contact our Data Protection Officer at{" "}
              <a
                href="mailto:tbaltzakis@cloudless.gr"
                className="text-primary hover:underline"
              >
                tbaltzakis@cloudless.gr
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Complaints</h2>
            <p>
              If you believe your data protection rights have been violated, you
              have the right to lodge a complaint with the relevant data
              protection authority in your country.
            </p>
          </section>
        </div>
      </div>
    </PageShell>
  );
}

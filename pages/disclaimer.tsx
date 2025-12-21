import { PageShell } from "@portfolio/components/layout";

export default function DisclaimerPage() {
  return (
    <PageShell>
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-8">
            Last updated: December 21, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">General Disclaimer</h2>
            <p>
              The information provided on this website is for general
              informational purposes only. While we strive to keep the
              information up to date and correct, we make no representations or
              warranties of any kind, express or implied.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Professional Advice</h2>
            <p>
              The content on this website should not be taken as professional
              advice. Always seek the advice of qualified professionals for your
              specific circumstances.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">External Links</h2>
            <p>
              This website may contain links to external websites that are not
              provided or maintained by us. We do not guarantee the accuracy,
              relevance, timeliness, or completeness of any information on these
              external websites.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p>
              For questions about this disclaimer, please contact us at{" "}
              <a
                href="mailto:tbaltzakis@cloudless.gr"
                className="text-primary hover:underline"
              >
                tbaltzakis@cloudless.gr
              </a>
            </p>
          </section>
        </div>
      </div>
    </PageShell>
  );
}

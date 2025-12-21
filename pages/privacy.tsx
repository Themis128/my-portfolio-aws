import { PageShell } from "@portfolio/components/layout";

export default function PrivacyPage() {
  return (
    <PageShell>
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-8">
            Last updated: December 21, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us, such as when
              you contact us through our website or subscribe to our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              How We Use Your Information
            </h2>
            <p>
              We use the information we collect to provide, maintain, and
              improve our services, communicate with you, and comply with legal
              obligations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except as
              described in this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
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

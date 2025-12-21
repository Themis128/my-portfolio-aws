import { PageShell } from "@portfolio/components/layout";

export default function CookiesPage() {
  return (
    <PageShell>
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-8">
            Last updated: December 21, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
            <p>
              Cookies are small text files that are stored on your computer or
              mobile device when you visit our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
            <p>
              We use cookies to improve your browsing experience, analyze site
              traffic, and understand where our visitors are coming from.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Types of Cookies We Use
            </h2>
            <ul>
              <li>
                <strong>Essential Cookies:</strong> Required for the website to
                function properly
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how
                visitors interact with our website
              </li>
              <li>
                <strong>Functional Cookies:</strong> Remember your preferences
                and settings
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
            <p>
              You can control and manage cookies through your browser settings.
              Please note that disabling cookies may affect the functionality of
              our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact
              us at{" "}
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

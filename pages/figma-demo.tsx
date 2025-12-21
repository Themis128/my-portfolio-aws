import { ContactForm } from "@/components/contact-form";
import { ExampleButton } from "@/components/example-button";
import { HeroSection } from "@/components/hero-section";
import { PortfolioCard } from "@/components/portfolio-card";
import { Card, Flex, Heading, Text, View } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";

interface FigmaFileInfoData {
  name?: string;
  pages?: unknown[];
  componentsCount?: number;
  stylesCount?: number;
  error?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function FigmaFileInfo() {
  const [info, setInfo] = useState<FigmaFileInfoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [retryAfter, setRetryAfter] = useState<number | null>(null);

  async function fetchInfo() {
    setLoading(true);
    try {
      const res = await fetch("/api/figma/file");
      const json = await res.json();
      setInfo(json);
      if (res.status === 429 && json.retryAfter) {
        setRetryAfter(parseInt(json.retryAfter));
      } else {
        setRetryAfter(null);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setInfo({ error: errorMessage });
      setRetryAfter(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div>
      {loading && <Text>Loading Figma file info…</Text>}
      {!loading && info?.error && (
        <div>
          <Text
            style={{ color: "var(--amplify-colors-red-60)", marginBottom: 8 }}
          >
            Error: {info.error}
          </Text>

          {/* Helpful developer guidance when auth issues occur */}
          {info.error?.includes("Invalid token") && (
            <div
              style={{
                background: "var(--amplify-colors-background.secondary)",
                padding: 12,
                borderRadius: 6,
              }}
            >
              <Text>
                <strong>Quick fixes</strong>
              </Text>
              <ol style={{ paddingLeft: "1.25rem" }}>
                <li>
                  Ensure your <code>FIGMA_API_KEY</code> is set in{" "}
                  <code>.env</code> or exported in your shell.
                </li>
                <li>
                  Restart your dev server so Next.js picks up environment
                  changes: <code>pnpm dev</code>.
                </li>
                <li>
                  Validate the token locally:{" "}
                  <code>pnpm run check:figma-env</code>.
                </li>
                <li>
                  If needed, revoke and recreate the token in Figma (Settings →
                  Personal access tokens).
                </li>
              </ol>
            </div>
          )}

          {/* Helpful guidance for rate limiting */}
          {info.error?.includes("Rate limit exceeded") && (
            <div
              style={{
                background: "var(--amplify-colors-orange-10)",
                border: "1px solid var(--amplify-colors-orange-40)",
                padding: 12,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "var(--amplify-colors-orange-90)" }}>
                <strong>Rate Limit Reached</strong>
              </Text>
              <Text style={{ marginTop: 8 }}>
                Figma API allows 1000 requests per hour for personal access
                tokens.
                {retryAfter && (
                  <span>
                    {" "}
                    Please wait {Math.ceil(retryAfter / 60)} minutes before
                    trying again.
                  </span>
                )}
              </Text>
              <div style={{ marginTop: 12 }}>
                <Text>
                  <strong>Alternatives:</strong>
                </Text>
                <ul style={{ paddingLeft: "1.25rem", marginTop: 4 }}>
                  <li>
                    Use the Figma MCP server instead (avoids direct API calls)
                  </li>
                  <li>Cache responses locally during development</li>
                  <li>
                    Upgrade to a Figma Professional plan for higher limits
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {!loading && info && !info.error && (
        <div>
          <Text>
            <strong>File:</strong> {info.name}
          </Text>
          <Text>
            <strong>Pages:</strong> {info.pages?.length ?? 0}
          </Text>
          <Text>
            <strong>Components:</strong> {info.componentsCount ?? 0}
          </Text>
          <Text>
            <strong>Styles:</strong> {info.stylesCount ?? 0}
          </Text>
          <div style={{ marginTop: 8 }}>
            <button type="button" onClick={fetchInfo}>
              Refresh
            </button>
          </div>
        </div>
      )}
      {!loading && !info && (
        <Text>No data yet — check your FIGMA_API_KEY in environment.</Text>
      )}
    </div>
  );
}

export default function FigmaDemo() {
  const [loading, setLoading] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const handleContactSubmit = (data: ContactFormData) => {
    setContactLoading(true);
    console.log("Contact form submitted:", data);
    setTimeout(() => setContactLoading(false), 2000);
  };

  const handleCardClick = (title: string) => {
    console.log(`Card clicked: ${title}`);
  };

  const handleHeroPrimary = () => {
    console.log("Hero primary button clicked");
  };

  const handleHeroSecondary = () => {
    console.log("Hero secondary button clicked");
  };

  return (
    <View>
      {/* Hero Section */}
      <HeroSection
        title="Welcome to Figma Integration"
        subtitle="Amplify UI Components"
        description="Experience the power of designing in Figma and generating production-ready React components with AWS Amplify Studio."
        primaryButtonText="Get Started"
        secondaryButtonText="Learn More"
        onPrimaryClick={handleHeroPrimary}
        onSecondaryClick={handleHeroSecondary}
      />

      <View padding="large">
        <Heading level={1}>Component Showcase</Heading>
        <Text marginBottom="large">
          This page demonstrates components that would be generated from Figma
          using AWS Amplify Studio.
        </Text>

        {/* Portfolio Cards Section */}
        <Card variation="outlined" padding="large" marginBottom="large">
          <Heading level={3}>Portfolio Cards</Heading>
          <Text marginBottom="medium">
            Portfolio cards showcase project information with status badges and
            technology tags.
          </Text>

          <Flex direction="row" gap="large" wrap="wrap">
            <PortfolioCard
              title="E-Commerce Platform"
              description="A modern e-commerce solution built with React and Node.js, featuring real-time inventory management."
              technologies={["React", "Node.js", "MongoDB", "AWS"]}
              status="completed"
              onClick={() => handleCardClick("E-Commerce Platform")}
            />
            <PortfolioCard
              title="Mobile Banking App"
              description="Secure mobile banking application with biometric authentication and real-time transactions."
              technologies={["React Native", "TypeScript", "GraphQL"]}
              status="in-progress"
              onClick={() => handleCardClick("Mobile Banking App")}
            />
            <PortfolioCard
              title="AI Dashboard"
              description="Analytics dashboard powered by machine learning for predictive insights and data visualization."
              technologies={["Python", "TensorFlow", "React", "D3.js"]}
              status="planned"
              onClick={() => handleCardClick("AI Dashboard")}
            />
          </Flex>
        </Card>

        {/* Button Variations Section */}
        <Card variation="outlined" padding="large" marginBottom="large">
          <Heading level={3}>Button Variations</Heading>
          <Text marginBottom="medium">
            These buttons showcase different variations that can be designed in
            Figma and generated as React components.
          </Text>

          <Flex direction="column" gap="medium">
            <Flex direction="row" gap="medium" wrap="wrap">
              <ExampleButton
                variation="primary"
                onClick={handleClick}
                loading={loading}
              >
                Primary Button
              </ExampleButton>
              <ExampleButton variation="link">Secondary Button</ExampleButton>
              <ExampleButton variation="warning">Warning Button</ExampleButton>
              <ExampleButton variation="destructive">
                Destructive Button
              </ExampleButton>
            </Flex>

            <Flex direction="row" gap="medium" wrap="wrap">
              <ExampleButton>Default Button</ExampleButton>
              <ExampleButton>Another Button</ExampleButton>
              <ExampleButton>Third Button</ExampleButton>
            </Flex>

            <Flex direction="row" gap="medium" wrap="wrap">
              <ExampleButton disabled>Disabled Button</ExampleButton>
              <ExampleButton loading>Loading Button</ExampleButton>
            </Flex>
          </Flex>
        </Card>

        {/* Contact Form Section */}
        <Card variation="outlined" padding="large" marginBottom="large">
          <Heading level={3}>Contact Form</Heading>
          <Text marginBottom="medium">
            A fully functional contact form with validation and loading states.
          </Text>

          <ContactForm
            title="Send Us a Message"
            description="Have questions about our Figma integration? Let us know!"
            submitButtonText="Send Message"
            onSubmit={handleContactSubmit}
            loading={contactLoading}
          />
        </Card>

        {/* Figma Integration */}
        <Card variation="outlined" padding="large">
          <Heading level={3}>Figma File Integration</Heading>
          <Text as="div">
            <FigmaFileInfo />
          </Text>
          <Text as="div" style={{ marginTop: 12 }}>
            <Heading level={4}>How to use</Heading>
            <ol style={{ paddingLeft: "1.5rem", lineHeight: "1.6" }}>
              <li>
                Set up your Figma file by duplicating the AWS Amplify UI kit or
                your own file
              </li>
              <li>
                Set <code>FIGMA_API_KEY</code> in your environment (.env) or CI
                secrets
              </li>
              <li>
                Optionally set <code>FIGMA_FILE_KEY</code> in .env or provide it
                to the demo
              </li>
              <li>
                Start this app and the Figma MCP (if you prefer using the MCP
                server)
              </li>
              <li>
                Click Refresh above to fetch live file metadata from the Figma
                API
              </li>
            </ol>
          </Text>
        </Card>
      </View>
    </View>
  );
}

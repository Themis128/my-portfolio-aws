import { HeroSection } from "@/components/hero-section";
import { PortfolioCard } from "@/components/portfolio-card";
import { Flex, Heading, Text, View } from "@aws-amplify/ui-react";
import Head from "next/head";
import Link from "next/link";

export default function HomePage() {
  const handleHeroPrimary = () => {
    // Navigate to about page
    window.location.href = "/about";
  };

  const handleHeroSecondary = () => {
    // Navigate to projects page
    window.location.href = "/projects";
  };

  const handleCardClick = (title: string) => {
    const routes: Record<string, string> = {
      "About Me": "/about",
      "My Projects": "/projects",
      "Latest Blog": "/blog",
      "Get In Touch": "/contact",
    };
    window.location.href = routes[title] || "/";
  };

  return (
    <>
      <Head>
        <title>Themistoklis Baltzakis</title>
        <meta
          name="description"
          content="IT Consultant & Technology Expert specializing in strategic consulting, digital transformation, and technology solutions for modern businesses."
        />
      </Head>

      {/* Enhanced Hero Section using Figma Component */}
      <HeroSection
        title="Themistoklis Baltzakis"
        subtitle="IT Consultant & Technology Expert"
        description="Specializing in strategic consulting, digital transformation, and technology solutions for modern businesses. Expert in cloud architecture, full-stack development, and digital strategy."
        primaryButtonText="Learn More About Me"
        secondaryButtonText="View My Projects"
        onPrimaryClick={handleHeroPrimary}
        onSecondaryClick={handleHeroSecondary}
      />

      {/* Enhanced Portfolio Cards Section */}
      <View padding="xxl" backgroundColor="background.secondary">
        <Flex direction="column" gap="xl" maxWidth="1200px" margin="0 auto">
          <Flex direction="column" gap="medium" textAlign="center">
            <Heading level={2} color="font.primary">
              Explore My Portfolio
            </Heading>
            <Text color="font.secondary" fontSize="large">
              Discover my expertise, projects, and insights in technology
              consulting
            </Text>
          </Flex>

          <Flex direction="row" gap="large" wrap="wrap" justifyContent="center">
            <PortfolioCard
              title="About Me"
              description="Learn about my background, expertise, and professional journey in IT consulting and technology solutions."
              technologies={[
                "Strategy",
                "Consulting",
                "Leadership",
                "Innovation",
              ]}
              status="completed"
              onClick={() => handleCardClick("About Me")}
            />

            <PortfolioCard
              title="My Projects"
              description="Explore my recent work including full-stack applications, cloud architectures, and digital transformation projects."
              technologies={["React", "AWS", "Node.js", "TypeScript"]}
              status="completed"
              onClick={() => handleCardClick("My Projects")}
            />

            <PortfolioCard
              title="Latest Blog"
              description="Read my thoughts on technology trends, consulting best practices, and insights from the IT industry."
              technologies={[
                "Tech Trends",
                "Best Practices",
                "Insights",
                "Analysis",
              ]}
              status="completed"
              onClick={() => handleCardClick("Latest Blog")}
            />

            <PortfolioCard
              title="Get In Touch"
              description="Ready to discuss your next project? Let's connect and explore how we can work together on your technology goals."
              technologies={[
                "Collaboration",
                "Consulting",
                "Partnership",
                "Innovation",
              ]}
              status="completed"
              onClick={() => handleCardClick("Get In Touch")}
            />
          </Flex>
        </Flex>
      </View>

      {/* Call to Action Section */}
      <View padding="xxl" backgroundColor="background.primary">
        <Flex
          direction="column"
          gap="large"
          maxWidth="800px"
          margin="0 auto"
          textAlign="center"
        >
          <Heading level={3} color="font.primary">
            Ready to Transform Your Business?
          </Heading>
          <Text color="font.secondary" fontSize="large">
            Let's discuss how strategic technology consulting can help your
            organization achieve its digital transformation goals.
          </Text>

          <Flex
            direction="row"
            gap="medium"
            justifyContent="center"
            wrap="wrap"
          >
            <Link href="/contact" style={{ textDecoration: "none" }}>
              <button
                type="button"
                style={{
                  backgroundColor: "var(--amplify-colors-brand-primary-90)",
                  color: "var(--amplify-colors-brand-primary-10)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--amplify-colors-brand-primary-80)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--amplify-colors-brand-primary-90)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Start Your Project
              </button>
            </Link>

            <Link href="/cv" style={{ textDecoration: "none" }}>
              <button
                type="button"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--amplify-colors-font-primary)",
                  border: "2px solid var(--amplify-colors-border-primary)",
                  borderRadius: "8px",
                  padding: "10px 22px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--amplify-colors-background-secondary)";
                  e.currentTarget.style.borderColor =
                    "var(--amplify-colors-brand-primary-90)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor =
                    "var(--amplify-colors-border-primary)";
                }}
              >
                View My CV
              </button>
            </Link>
          </Flex>
        </Flex>
      </View>
    </>
  );
}

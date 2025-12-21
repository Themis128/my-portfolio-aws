import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Button,
  Heading,
  Text,
  View,
  TextField,
  Card,
} from "@aws-amplify/ui-react";

export default function Custom404() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Optional: Log the 404 for analytics
    console.log("404 error for path:", router.asPath);
  }, [router.asPath]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Search Google with site-specific search
      window.open(
        `https://www.google.com/search?q=site:yourportfolio.com ${encodeURIComponent(searchQuery.trim())}`,
        "_blank",
      );
    }
  };

  const popularPages = [
    {
      title: "About",
      href: "/about",
      description: "Learn more about me and my background",
    },
    {
      title: "Projects",
      href: "/projects",
      description: "Explore my portfolio of work",
    },
    {
      title: "Blog",
      href: "/blog",
      description: "Read my latest articles and insights",
    },
    {
      title: "Contact",
      href: "/contact",
      description: "Get in touch for opportunities",
    },
  ];

  const recentPosts = [
    {
      title: "The Future of Web Development: Trends to Watch in 2024",
      href: "/blog/future-of-web-development-2024",
    },
    {
      title: "Building Scalable React Applications: Best Practices",
      href: "/blog/scalable-react-applications",
    },
    {
      title: "Mobile-First Design: Why It Matters in 2024",
      href: "/blog/mobile-first-design-2024",
    },
  ];

  return (
    <View
      padding="2rem"
      textAlign="center"
      minHeight="60vh"
      display="flex"
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Heading level={1} fontSize="6xl" marginBottom="1rem">
        404
      </Heading>
      <Heading level={2} marginBottom="1rem">
        Page Not Found
      </Heading>
      <Text
        fontSize="lg"
        color="font.secondary"
        marginBottom="2rem"
        maxWidth="500px"
      >
        Sorry, the page you're looking for doesn't exist. It might have been
        moved, deleted, or you entered the wrong URL.
      </Text>

      {/* Search Section */}
      <View marginBottom="3rem" maxWidth="400px" width="100%">
        <Text fontSize="sm" color="font.secondary" marginBottom="0.5rem">
          Try searching for what you're looking for:
        </Text>
        <form onSubmit={handleSearch}>
          <View display="flex" style={{ gap: "0.5rem" }}>
            <TextField
              label="Search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1 }}
            />
            <Button type="submit" variation="primary">
              Search
            </Button>
          </View>
        </form>
      </View>

      {/* Action Buttons */}
      <View
        display="flex"
        style={{
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "3rem",
        }}
      >
        <Button variation="primary" size="large" onClick={() => router.back()}>
          Go Back
        </Button>
        <Button size="large" as={Link} href="/">
          Home Page
        </Button>
      </View>

      {/* Popular Pages */}
      <View marginBottom="3rem" maxWidth="800px" width="100%">
        <Heading level={3} marginBottom="1.5rem">
          Popular Pages
        </Heading>
        <View
          display="grid"
          style={{
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          {popularPages.map((page) => (
            <Card key={page.href} padding="1.5rem">
              <Link
                href={page.href}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Heading level={4} marginBottom="0.5rem">
                  {page.title}
                </Heading>
                <Text fontSize="sm" color="font.secondary">
                  {page.description}
                </Text>
              </Link>
            </Card>
          ))}
        </View>
      </View>

      {/* Recent Blog Posts */}
      <View marginBottom="3rem" maxWidth="800px" width="100%">
        <Heading level={3} marginBottom="1.5rem">
          Recent Articles
        </Heading>
        <View display="flex" style={{ flexDirection: "column", gap: "1rem" }}>
          {recentPosts.map((post, index) => (
            <Card key={post.href} padding="1rem">
              <Link
                href={post.href}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Text
                  fontSize="sm"
                  color="font.secondary"
                  marginBottom="0.25rem"
                >
                  Article {index + 1}
                </Text>
                <Text fontWeight="medium">{post.title}</Text>
              </Link>
            </Card>
          ))}
        </View>
      </View>

      <Text fontSize="sm" color="font.tertiary" marginTop="2rem">
        If you believe this is an error, please{" "}
        <Link
          href="/contact"
          style={{ color: "var(--amplify-colors-brand-primary)" }}
        >
          contact us
        </Link>
        .
      </Text>
    </View>
  );
}

"use client";

import { Button, Heading, Text } from "@aws-amplify/ui-react";
import Link from "next/link";

interface FooterLink {
  title: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export function PortfolioFooter() {
  const footerSections: FooterSection[] = [
    {
      title: "Navigation",
      links: [
        { title: "Home", href: "/" },
        { title: "About", href: "/about" },
        { title: "Projects", href: "/projects" },
        { title: "Blog", href: "/blog" },
        { title: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { title: "Web Development", href: "/services/web-development" },
        { title: "Cloud Solutions", href: "/services/cloud" },
        { title: "Consulting", href: "/services/consulting" },
        { title: "Analytics", href: "/services/analytics" },
      ],
    },
    {
      title: "Resources",
      links: [
        { title: "CV", href: "/cv" },
        { title: "Portfolio", href: "/projects" },
        { title: "Blog", href: "/blog" },
        { title: "Contact", href: "/contact" },
      ],
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Heading level={3} className="text-lg font-semibold">
              Themistoklis Baltzakis
            </Heading>
            <Text className="text-muted-foreground text-sm leading-relaxed">
              IT Consultant & Technology Expert specializing in strategic
              consulting, digital transformation, and technology solutions for
              modern businesses.
            </Text>
            <div className="flex space-x-4">
              <Button
                variation="link"
                size="small"
                as={Link}
                href="https://linkedin.com/in/baltzakis-themis"
                target="_blank"
                rel="noopener noreferrer"
                className="p-0 h-auto"
              >
                LinkedIn
              </Button>
              <Button
                variation="link"
                size="small"
                as={Link}
                href="https://github.com/Themis128"
                target="_blank"
                rel="noopener noreferrer"
                className="p-0 h-auto"
              >
                GitHub
              </Button>
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <Heading
                level={4}
                className="text-sm font-semibold uppercase tracking-wider"
              >
                {section.title}
              </Heading>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <Text className="text-muted-foreground text-sm">
              © {currentYear} Themistoklis Baltzakis. All rights reserved.
            </Text>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PortfolioFooter;

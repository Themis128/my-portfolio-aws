"use client";

import { ContactForm } from "@/components/contact-form";
import { ContactPageShell } from "@/components/layout/contact-page-shell";
import { usePersonalData } from "@/lib/personal-data-client";
import { useMounted } from "@/hooks/use-mounted";
import { Button, Card, Flex, Heading, Text, View } from "@aws-amplify/ui-react";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const { data: personalData, loading } = usePersonalData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const mounted = useMounted();

  if (loading || !personalData || !mounted) {
    return (
      <ContactPageShell
        title="Get In Touch"
        description="Loading contact information..."
      >
        <Text>Loading contact information...</Text>
      </ContactPageShell>
    );
  }

  return (
    <ContactPageShell
      title="Get In Touch"
      description="Ready to start your next project? I'd love to hear from you. Send me a message and let's discuss how we can work together."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Enhanced Contact Form using Figma Component */}
        <View>
          {submitted ? (
            <Card variation="outlined" padding="xl">
              <Flex direction="column" alignItems="center" gap="medium">
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: "var(--amplify-colors-background-success)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    style={{ color: "var(--amplify-colors-font-success)" }}
                    aria-hidden="true"
                  >
                    <title>Success</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <Heading level={2} textAlign="center">
                  Message Sent!
                </Heading>
                <Text textAlign="center" color="font.secondary">
                  Thank you for your message. I'll get back to you soon.
                </Text>
                <Button variation="primary" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </Flex>
            </Card>
          ) : (
            <ContactForm
              title="Send a Message"
              description="Ready to start your next project? I'd love to hear from you. Send me a message and let's discuss how we can work together."
              submitButtonText={isSubmitting ? "Sending..." : "Send Message"}
              onSubmit={(_data) => {
                setIsSubmitting(true);
                // Simulate form submission
                setTimeout(() => {
                  setIsSubmitting(false);
                  setSubmitted(true);
                }, 2000);
              }}
              loading={isSubmitting}
            />
          )}
        </View>

        {/* Contact Information */}
        <div className="space-y-8">
          <Card variation="outlined" className="p-8">
            <Heading level={2} className="mb-6">
              Contact Information
            </Heading>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <title>Email</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <Text className="font-medium">Email</Text>
                  <Text className="text-muted-foreground">
                    {personalData.contact.email}
                  </Text>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <title>Phone</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <Text className="font-medium">Phone</Text>
                  <Text className="text-muted-foreground">
                    {personalData.contact.phone}
                  </Text>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <title>Location</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <Text className="font-medium">Location</Text>
                  <Text className="text-muted-foreground">
                    {personalData.location}
                  </Text>
                </div>
              </div>
            </div>
          </Card>

          <Card variation="outlined" className="p-8">
            <Heading level={3} className="mb-4">
              Connect With Me
            </Heading>
            <Text className="text-muted-foreground mb-6">
              Find me on professional networks and social media.
            </Text>

            <div className="space-y-3">
              <Button
                width="100%"
                as={Link}
                href={personalData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <title>LinkedIn</title>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn Profile
                </div>
              </Button>

              <Button
                width="100%"
                as={Link}
                href={personalData.social.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <title>GitHub</title>
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub Profile
                </div>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </ContactPageShell>
  );
}

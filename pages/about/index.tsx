"use client";

import { HeroSection } from "@/components/hero-section";
import { usePersonalData } from "@/lib/personal-data-client";
import { useMounted } from "@/hooks/use-mounted";
import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  Loader,
  Text,
} from "@aws-amplify/ui-react";
import Link from "next/link";

export default function AboutPage() {
  const { data: personalData, loading } = usePersonalData();
  const mounted = useMounted();

  if (!mounted || loading || !personalData) {
    return (
      <div className="text-center">
        <Loader size="large" />
        <Text className="mt-4 text-muted-foreground">Loading...</Text>
      </div>
    );
  }

  return (
    <>
      {/* Enhanced Hero Section using Figma Component */}
      <HeroSection
        title="About Me"
        subtitle="Professional Journey"
        description={`${personalData.bio} ${personalData.summary}`}
        primaryButtonText="View My Experience"
        secondaryButtonText="Download CV"
        onPrimaryClick={() => {
          const experienceSection = document.getElementById("experience");
          experienceSection?.scrollIntoView({ behavior: "smooth" });
        }}
        onSecondaryClick={() => {
          window.location.href = "/cv";
        }}
      />

      {/* Skills Section */}
      <div className="mb-16">
        <Heading level={2} className="mb-8 text-center">
          Skills & Technologies
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card variation="outlined" className="p-6">
            <Heading level={4} className="mb-4 text-center">
              Frontend
            </Heading>
            <Flex wrap="wrap" gap="0.5rem">
              {personalData.skills.frontend.map((skill) => (
                <Badge key={skill} variation="info" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </Flex>
          </Card>

          <Card variation="outlined" className="p-6">
            <Heading level={4} className="mb-4 text-center">
              Backend
            </Heading>
            <Flex wrap="wrap" gap="0.5rem">
              {personalData.skills.backend.map((skill) => (
                <Badge key={skill} variation="success" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </Flex>
          </Card>

          <Card variation="outlined" className="p-6">
            <Heading level={4} className="mb-4 text-center">
              Cloud
            </Heading>
            <Flex wrap="wrap" gap="0.5rem">
              {personalData.skills.cloud.map((skill) => (
                <Badge key={skill} variation="warning" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </Flex>
          </Card>

          <Card variation="outlined" className="p-6">
            <Heading level={4} className="mb-4 text-center">
              Tools
            </Heading>
            <Flex wrap="wrap" gap="0.5rem">
              {personalData.skills.tools.map((skill) => (
                <Badge key={skill} className="text-xs">
                  {skill}
                </Badge>
              ))}
            </Flex>
          </Card>
        </div>
      </div>

      {/* Experience Section */}
      <div className="mb-16" id="experience">
        <Heading level={2} className="mb-8 text-center">
          Experience
        </Heading>
        <div className="space-y-6">
          {personalData.experience.map((exp) => (
            <Card
              key={`${exp.title}-${exp.company}`}
              variation="outlined"
              className="p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <Heading level={3} className="mb-1">
                    {exp.title}
                  </Heading>
                  <Text className="text-muted-foreground font-medium">
                    {exp.company}
                  </Text>
                </div>
                <Badge className="mt-2 md:mt-0">{exp.period}</Badge>
              </div>
              <Text className="text-muted-foreground">{exp.description}</Text>
            </Card>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="mb-16">
        <Heading level={2} className="mb-8 text-center">
          Services
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personalData.services.map((service) => (
            <Card key={service.title} variation="outlined" className="p-6">
              <Heading level={3} className="mb-3">
                {service.title}
              </Heading>
              <Text className="text-muted-foreground">
                {service.description}
              </Text>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center">
        <Heading level={2} className="mb-6">
          Let's Work Together
        </Heading>
        <Text className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          I'm always interested in new opportunities and exciting projects.
          Whether you need a full-stack application, cloud architecture, or
          technical consulting, I'd love to hear about your project.
        </Text>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variation="primary" size="large" as={Link} href="/contact">
            Get In Touch
          </Button>
          <Button
            size="large"
            as={Link}
            href={personalData.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            View LinkedIn
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t">
          <Text className="text-muted-foreground text-sm">
            📧 {personalData.contact.email} | 📱 {personalData.contact.phone}
          </Text>
          <Text className="text-muted-foreground text-sm mt-2">
            {personalData.contact.availability}
          </Text>
        </div>
      </div>
    </>
  );
}

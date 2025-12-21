"use client";

import { usePersonalData } from "@/lib/personal-data-client";
import {
  Card,
  Flex,
  Heading,
  Text,
  Badge,
  Button,
  Divider,
  Loader,
} from "@aws-amplify/ui-react";
import Link from "next/link";

export default function CVPage() {
  const { data: personalData, loading } = usePersonalData();

  if (loading || !personalData) {
    return (
      <div className="container py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Loader size="large" />
          <Text className="mt-4 text-muted-foreground">Loading...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <Heading level={1} className="mb-4">
            Curriculum Vitae
          </Heading>
          <Text className="text-muted-foreground text-lg">
            {personalData.title}
          </Text>
        </div>

        {/* Personal Info */}
        <Card variation="outlined" className="p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Heading level={2} className="mb-4">
                {personalData.name}
              </Heading>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  <span>{personalData.contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <span>{personalData.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{personalData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🌐</span>
                  <Link
                    href={personalData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {personalData.website}
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <Heading level={3} className="mb-3">
                Professional Summary
              </Heading>
              <Text className="text-muted-foreground">{personalData.bio}</Text>
            </div>
          </div>
        </Card>

        {/* Experience */}
        <div className="mb-8">
          <Heading level={2} className="mb-6">
            Professional Experience
          </Heading>
          <div className="space-y-6">
            {personalData.experience.map((exp, index) => (
              <Card key={index} variation="outlined" className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1">
                    <Heading level={3} className="mb-1">
                      {exp.title}
                    </Heading>
                    <Text className="text-primary font-medium mb-2">
                      {exp.company}
                    </Text>
                    <Text className="text-muted-foreground">
                      {exp.description}
                    </Text>
                  </div>
                  <Badge className="mt-2 md:mt-0 md:ml-4">{exp.period}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <Heading level={2} className="mb-6">
            Technical Skills
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variation="outlined" className="p-6">
              <Heading level={4} className="mb-4">
                Frontend Development
              </Heading>
              <Flex wrap="wrap" gap="0.5rem">
                {personalData.skills.frontend.map((skill) => (
                  <Badge key={skill} variation="info" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </Flex>
            </Card>

            <Card variation="outlined" className="p-6">
              <Heading level={4} className="mb-4">
                Backend Development
              </Heading>
              <Flex wrap="wrap" gap="0.5rem">
                {personalData.skills.backend.map((skill) => (
                  <Badge key={skill} variation="success" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </Flex>
            </Card>

            <Card variation="outlined" className="p-6">
              <Heading level={4} className="mb-4">
                Cloud & DevOps
              </Heading>
              <Flex wrap="wrap" gap="0.5rem">
                {personalData.skills.cloud.map((skill) => (
                  <Badge key={skill} variation="warning" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </Flex>
            </Card>

            <Card variation="outlined" className="p-6">
              <Heading level={4} className="mb-4">
                Databases & Tools
              </Heading>
              <Flex wrap="wrap" gap="0.5rem">
                {[
                  ...personalData.skills.databases,
                  ...personalData.skills.tools,
                ].map((skill) => (
                  <Badge key={skill} className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </Flex>
            </Card>
          </div>
        </div>

        {/* Services */}
        <div className="mb-8">
          <Heading level={2} className="mb-6">
            Services Offered
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personalData.services.map((service, index) => (
              <Card key={index} variation="outlined" className="p-6">
                <Heading level={4} className="mb-3">
                  {service.title}
                </Heading>
                <Text className="text-muted-foreground">
                  {service.description}
                </Text>
              </Card>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="mb-8">
          <Heading level={2} className="mb-6">
            Education & Background
          </Heading>
          <Card variation="outlined" className="p-6">
            <div className="space-y-4">
              <div>
                <Heading level={4} className="mb-2">
                  BSc Computer Science
                </Heading>
                <Text className="text-muted-foreground">
                  University education in Computer Science with focus on
                  software development and algorithms.
                </Text>
              </div>
              <Divider />
              <div>
                <Heading level={4} className="mb-2">
                  MSc Data Analytics
                </Heading>
                <Text className="text-muted-foreground">
                  Advanced studies in data analytics, machine learning, and
                  statistical analysis.
                </Text>
              </div>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Heading level={2} className="mb-4">
            Interested in Working Together?
          </Heading>
          <Text className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities and exciting
            projects. Let's connect and explore how we can collaborate.
          </Text>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              View LinkedIn Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

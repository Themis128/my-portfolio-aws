"use client";

import { Button, Flex, Heading, Text, View } from "@aws-amplify/ui-react";
import { useState } from "react";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  title?: string;
  description?: string;
  submitButtonText?: string;
  onSubmit?: (data: ContactFormData) => void;
  loading?: boolean;
}

export function ContactForm({
  title = "Get in Touch",
  description = "Send me a message and I'll get back to you as soon as possible.",
  submitButtonText = "Send Message",
  onSubmit,
  loading = false,
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm() && onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <View maxWidth="600px" margin="0 auto" padding="large">
      <Flex direction="column" gap="large">
        <Flex direction="column" gap="medium" textAlign="center">
          <Heading level={2}>{title}</Heading>
          <Text color="font.tertiary">{description}</Text>
        </Flex>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="medium">
            <div>
              <label
                htmlFor="name"
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                }}
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid var(--amplify-colors-border-primary)",
                  borderRadius: "0.375rem",
                  fontSize: "1rem",
                }}
                required
              />
              {errors.name && (
                <Text
                  color="font.error"
                  fontSize="small"
                  style={{ marginTop: "0.25rem" }}
                >
                  {errors.name}
                </Text>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid var(--amplify-colors-border-primary)",
                  borderRadius: "0.375rem",
                  fontSize: "1rem",
                }}
                required
              />
              {errors.email && (
                <Text
                  color="font.error"
                  fontSize="small"
                  style={{ marginTop: "0.25rem" }}
                >
                  {errors.email}
                </Text>
              )}
            </div>

            <div>
              <label
                htmlFor="subject"
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                }}
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid var(--amplify-colors-border-primary)",
                  borderRadius: "0.375rem",
                  fontSize: "1rem",
                }}
                required
              />
              {errors.subject && (
                <Text
                  color="font.error"
                  fontSize="small"
                  style={{ marginTop: "0.25rem" }}
                >
                  {errors.subject}
                </Text>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                }}
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your message here..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                rows={4}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid var(--amplify-colors-border-primary)",
                  borderRadius: "0.375rem",
                  fontSize: "1rem",
                  resize: "vertical",
                }}
                required
              />
              {errors.message && (
                <Text
                  color="font.error"
                  fontSize="small"
                  style={{ marginTop: "0.25rem" }}
                >
                  {errors.message}
                </Text>
              )}
            </div>

            <Button
              type="submit"
              variation="primary"
              size="large"
              isLoading={loading}
              isDisabled={loading}
            >
              {submitButtonText}
            </Button>
          </Flex>
        </form>
      </Flex>
    </View>
  );
}

export default ContactForm;

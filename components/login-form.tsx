"use client";

import { Button, Flex, Heading, Text, View } from "@aws-amplify/ui-react";
import { useState } from "react";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  title?: string;
  description?: string;
  submitButtonText?: string;
  onSubmit?: (data: LoginFormData) => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  loading?: boolean;
}

export function LoginForm({
  title = "Sign In",
  description = "Enter your credentials to access your account.",
  submitButtonText = "Sign In",
  onSubmit,
  onForgotPassword,
  onSignUp,
  loading = false,
}: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
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
    <View maxWidth="400px" margin="0 auto" padding="large">
      <Flex direction="column" gap="large">
        <Flex direction="column" gap="medium" textAlign="center">
          <Heading level={2}>{title}</Heading>
          <Text color="font.tertiary">{description}</Text>
        </Flex>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="medium">
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
                htmlFor="password"
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid var(--amplify-colors-border-primary)",
                  borderRadius: "0.375rem",
                  fontSize: "1rem",
                }}
                required
              />
              {errors.password && (
                <Text
                  color="font.error"
                  fontSize="small"
                  style={{ marginTop: "0.25rem" }}
                >
                  {errors.password}
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

        <Flex direction="column" gap="small" alignItems="center">
          {onForgotPassword && (
            <Button variation="link" size="small" onClick={onForgotPassword}>
              Forgot your password?
            </Button>
          )}

          {onSignUp && (
            <Text fontSize="small" color="font.tertiary">
              Don't have an account?{" "}
              <Button
                variation="link"
                size="small"
                onClick={onSignUp}
                style={{ display: "inline", padding: 0, fontSize: "inherit" }}
              >
                Sign up
              </Button>
            </Text>
          )}
        </Flex>
      </Flex>
    </View>
  );
}

export default LoginForm;

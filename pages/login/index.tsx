"use client";

import { HeroSection } from "@/components/hero-section";
import { LoginForm } from "@/components/login-form";
import { Card, Flex, Text, View } from "@aws-amplify/ui-react";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  type LoginFormData = {
    email: string;
    password: string;
    remember?: boolean;
  };

  const handleLogin = async (_data: LoginFormData) => {
    setIsLoading(true);

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setLoginSuccess(true);

    // Redirect after successful login
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password page
    window.location.href = "/forgot-password";
  };

  const handleSignUp = () => {
    // Navigate to sign up page
    window.location.href = "/signup";
  };

  if (loginSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
                fontSize: "32px",
              }}
              aria-label="Success checkmark"
            >
              ✓
            </div>
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              Login Successful!
            </Text>
            <Text textAlign="center" color="font.secondary">
              Redirecting you to the dashboard...
            </Text>
          </Flex>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section for Login */}
      <HeroSection
        title="Welcome Back"
        subtitle="Sign In"
        description="Access your account to manage your portfolio, view analytics, and connect with opportunities."
        primaryButtonText="Sign In Below"
        secondaryButtonText="Back to Home"
        onPrimaryClick={() => {
          const loginForm = document.getElementById("login-form");
          loginForm?.scrollIntoView({ behavior: "smooth" });
        }}
        onSecondaryClick={() => {
          window.location.href = "/";
        }}
      />

      {/* Login Form Section */}
      <View padding="xxl" backgroundColor="background.secondary">
        <Flex direction="column" gap="large" maxWidth="600px" margin="0 auto">
          <Flex direction="column" gap="medium" textAlign="center">
            <Text fontSize="xl" fontWeight="bold" color="font.primary">
              Sign In to Your Account
            </Text>
            <Text color="font.secondary">
              Enter your credentials below to access your portfolio dashboard
            </Text>
          </Flex>

          <div id="login-form">
            <LoginForm
              title="Account Login"
              description="Please enter your email and password to continue."
              submitButtonText={isLoading ? "Signing In..." : "Sign In"}
              onSubmit={handleLogin}
              onForgotPassword={handleForgotPassword}
              onSignUp={handleSignUp}
              loading={isLoading}
            />
          </div>

          {/* Additional Info */}
          <Card variation="outlined" padding="large">
            <Flex direction="column" gap="medium">
              <Text fontSize="large" fontWeight="bold" textAlign="center">
                Why Sign In?
              </Text>
              <Flex direction="column" gap="small">
                <Text>• Access your personalized dashboard</Text>
                <Text>• Manage your portfolio projects</Text>
                <Text>• View analytics and insights</Text>
                <Text>• Connect with potential clients</Text>
                <Text>• Update your profile and content</Text>
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </View>
    </div>
  );
}

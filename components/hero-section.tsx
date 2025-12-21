"use client";

import { Button, Flex, Heading, Text, View } from "@aws-amplify/ui-react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export function HeroSection({
  title,
  subtitle,
  description,
  primaryButtonText = "Get Started",
  secondaryButtonText = "Learn More",
  onPrimaryClick,
  onSecondaryClick,
}: HeroSectionProps) {
  return (
    <View padding="xxl" backgroundColor="background.primary" textAlign="center">
      <Flex
        direction="column"
        gap="large"
        maxWidth="800px"
        margin="0 auto"
        alignItems="center"
      >
        {subtitle && (
          <Text
            fontSize="large"
            color="brand.primary"
            fontWeight="semibold"
            textTransform="uppercase"
            letterSpacing="wide"
          >
            {subtitle}
          </Text>
        )}

        <Heading level={1} fontSize="4xl" color="font.primary">
          {title}
        </Heading>

        <Text
          fontSize="xl"
          color="font.secondary"
          lineHeight="relaxed"
          maxWidth="600px"
        >
          {description}
        </Text>

        <Flex gap="medium" wrap="wrap" justifyContent="center">
          <Button variation="primary" size="large" onClick={onPrimaryClick}>
            {primaryButtonText}
          </Button>

          {secondaryButtonText && (
            <Button variation="link" size="large" onClick={onSecondaryClick}>
              {secondaryButtonText}
            </Button>
          )}
        </Flex>
      </Flex>
    </View>
  );
}

export default HeroSection;

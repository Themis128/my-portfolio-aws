import { Flex, Text, Link as AmplifyLink, View } from "@aws-amplify/ui-react";
import Link from "next/link";
import { siteConfig } from "@portfolio/config/site";

export function AmplifyFooter() {
  return (
    <View
      as="footer"
      paddingBlock="medium"
      className="border-t border-border-primary"
    >
      <Flex
        direction={{ base: "column", medium: "row" }}
        justifyContent="space-between"
        alignItems="center"
        wrap="wrap"
        gap="1.5rem"
      >
        <Text
          as="span"
          color="var(--amplify-colors-font-secondary)"
          fontSize="small"
        >
          © 2024 {siteConfig.name}. Built by{" "}
          <AmplifyLink
            as="a"
            href={siteConfig.links.linkedin}
            isExternal
            fontWeight="medium"
            className="underline underline-offset-4"
          >
            {siteConfig.name}
          </AmplifyLink>
          . Source code available on{" "}
          <AmplifyLink
            as="a"
            href={siteConfig.links.github}
            isExternal
            fontWeight="medium"
            className="underline underline-offset-4"
          >
            GitHub
          </AmplifyLink>
          .
        </Text>
        <Flex as="nav" aria-label="Legal" gap="1rem" wrap="wrap">
          <Link
            href="/privacy"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/cookies"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Cookies
          </Link>
          <Link
            href="/disclaimer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Disclaimer
          </Link>
          <Link
            href="/gdpr"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            GDPR
          </Link>
        </Flex>
        <Flex
          alignItems="center"
          gap="0.5rem"
          fontSize="x-small"
          color="var(--amplify-colors-font-secondary)"
        >
          <Text as="span">Secured with</Text>
          <Flex
            alignItems="center"
            gap="0.25rem"
            paddingInline="0.5rem"
            paddingBlock="0.25rem"
            backgroundColor="var(--amplify-colors-background-secondary)"
            borderRadius="small"
          >
            {/* You can replace this with an <Icon /> from Amplify UI if desired */}
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.5 8.5C18.5 6.57 16.93 5 15 5S11.5 6.57 11.5 8.5 13.07 12 15 12 18.5 10.43 18.5 8.5zM15 10C14.17 10 13.5 9.33 13.5 8.5S14.17 7 15 7 16.5 7.67 16.5 8.5 15.83 10 15 10z" />
              <path d="M21 3H3C1.9 3 1 3.9 1 5V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V5C23 3.9 22.1 3 21 3zM21 19H3V5H21V19z" />
              <path d="M7 9H5V11H7V9zM7 13H5V15H7V13zM7 17H5V19H7V17zM11 9H9V11H11V9zM11 13H9V15H11V13zM11 17H9V19H11V17z" />
            </svg>
            <Text as="span" fontWeight="medium">
              AWS Cognito
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </View>
  );
}

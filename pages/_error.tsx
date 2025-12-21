import { NextPageContext } from "next";
import Link from "next/link";
import { Button, Heading, Text, View, Alert } from "@aws-amplify/ui-react";

interface ErrorProps {
  statusCode?: number;
  title?: string;
}

function Error({ statusCode, title }: ErrorProps) {
  const errorTitle =
    title || (statusCode === 404 ? "Page Not Found" : "An Error Occurred");
  const errorMessage = statusCode
    ? `An error ${statusCode} occurred on server`
    : "An error occurred on client";

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
      <Heading level={1} fontSize="6xl" marginBottom="1rem" color="font.error">
        {statusCode || "Error"}
      </Heading>
      <Heading level={2} marginBottom="1rem">
        {errorTitle}
      </Heading>

      <Alert variation="error" marginBottom="2rem" maxWidth="500px">
        <Text>{errorMessage}</Text>
      </Alert>

      <Text
        fontSize="lg"
        color="font.secondary"
        marginBottom="2rem"
        maxWidth="500px"
      >
        We're sorry for the inconvenience. Please try refreshing the page or go
        back to the home page.
      </Text>

      <View
        display="flex"
        style={{ gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}
      >
        <Button
          variation="primary"
          size="large"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </Button>
        <Button size="large" as={Link} href="/">
          Home Page
        </Button>
        <Button size="large" as={Link} href="/contact">
          Contact Support
        </Button>
      </View>

      {process.env.NODE_ENV === "development" && (
        <Text
          fontSize="sm"
          color="font.tertiary"
          marginTop="2rem"
          maxWidth="600px"
        >
          <strong>Development Info:</strong> This error page helps handle
          unexpected errors. Check the console for more details about what went
          wrong.
        </Text>
      )}
    </View>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

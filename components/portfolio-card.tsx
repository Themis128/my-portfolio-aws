"use client";

import { Badge, Card, Flex, Heading, Text } from "@aws-amplify/ui-react";

interface PortfolioCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  status?: "completed" | "in-progress" | "planned";
  onClick?: () => void;
}

export function PortfolioCard({
  title,
  description,
  technologies,
  imageUrl,
  status = "completed",
  onClick,
}: PortfolioCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success" as const;
      case "in-progress":
        return "warning" as const;
      case "planned":
        return "info" as const;
      default:
        return "info" as const;
    }
  };

  return (
    <Card
      variation="elevated"
      padding="large"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <Flex direction="column" gap="medium">
        {imageUrl && (
          <div
            style={{
              width: "100%",
              height: "200px",
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px",
            }}
          />
        )}

        <Flex direction="column" gap="small">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading level={3}>{title}</Heading>
            <Badge variation={getStatusColor(status)} size="small">
              {status.replace("-", " ")}
            </Badge>
          </Flex>

          <Text color="font.tertiary" lineHeight="1.5">
            {description}
          </Text>

          <Flex direction="row" gap="xs" wrap="wrap">
            {technologies.map((tech) => (
              <Badge key={tech} size="small">
                {tech}
              </Badge>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}

export default PortfolioCard;

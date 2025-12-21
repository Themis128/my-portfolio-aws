"use client";

import { Button } from "@aws-amplify/ui-react";
import type { ComponentProps } from "react";

type ButtonVariation = ComponentProps<typeof Button>["variation"];

interface ExampleButtonProps {
  children: React.ReactNode;
  variation?: ButtonVariation;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export function ExampleButton({
  children,
  variation = "primary" as ButtonVariation,
  disabled = false,
  loading = false,
  onClick,
}: ExampleButtonProps) {
  return (
    <Button
      variation={variation}
      isDisabled={disabled || loading}
      isLoading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default ExampleButton;

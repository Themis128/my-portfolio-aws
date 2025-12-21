import type { ComponentType, SVGProps } from "react";

export interface MenuItem {
  title: string;
  href: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>> | null;
  description?: string;
  external?: boolean;
}

export interface PortfolioMenuProps {
  direction?: "horizontal" | "vertical";
  variant?: "default" | "minimal";
  showIcons?: boolean;
  asChild?: boolean; // When true, doesn't render nav wrapper
  items?: MenuItem[]; // Allow custom menu items
  className?: string;
}

export type MenuDirection = "horizontal" | "vertical";
export type MenuVariant = "default" | "minimal";

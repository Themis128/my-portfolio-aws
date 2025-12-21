import type { MenuItem } from "./types";

/**
 * Default menu items for the portfolio
 */
export const defaultMenuItems: MenuItem[] = [
  { title: "Home", href: "/", description: "Welcome page" },
  { title: "Projects", href: "/projects", description: "Portfolio showcase" },
  { title: "Todo", href: "/todo", description: "Task management" },
  { title: "Demo", href: "/demo", description: "Component demonstrations" },
  { title: "Blog", href: "/blog", description: "Articles and insights" },
  { title: "CV", href: "/cv", description: "Resume and experience" },
  { title: "About", href: "/about", description: "Personal information" },
  { title: "Contact", href: "/contact", description: "Get in touch" },
];

/**
 * Check if a path is active based on current pathname
 */
export function isActivePath(pathname: string | null, href: string): boolean {
  if (!pathname) {
    // If pathname is not available yet on the client, only mark root as active
    return href === "/";
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Get CSS classes for menu direction
 */
export function getDirectionClasses(
  direction: "horizontal" | "vertical" = "horizontal",
) {
  return direction === "vertical"
    ? { flexDirection: "flex-col", gap: "gap-2" }
    : { flexDirection: "flex-row", gap: "gap-6" };
}

/**
 * Get CSS classes for menu variant
 */
export function getVariantClasses(variant: "default" | "minimal" = "default") {
  return variant === "minimal" ? "text-sm opacity-80" : "text-sm";
}

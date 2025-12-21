"use client";

import { cn } from "@/lib/utils";
import {
  BookOpen,
  CheckSquare,
  FileText,
  Folder,
  Home,
  Mail,
  Play,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { PortfolioMenuProps } from "./types";
import { defaultMenuItems, isActivePath } from "./utils";

// Add icons to default menu items
export const menuItems = defaultMenuItems.map((item) => ({
  ...item,
  Icon:
    {
      Home,
      Projects: Folder,
      Todo: CheckSquare,
      Demo: Play,
      Blog: BookOpen,
      CV: FileText,
      About: User,
      Contact: Mail,
    }[item.title] || null,
}));

export function PortfolioMenu({
  direction = "horizontal",
  variant: _variant = "default",
  showIcons = true,
  asChild = false,
}: PortfolioMenuProps) {
  const pathname = usePathname();

  const flexDirection = direction === "vertical" ? "flex-col" : "flex-row";
  const gap = direction === "vertical" ? "gap-2" : "gap-6";

  const menuItemsList = menuItems.map((item) => {
    const active = isActivePath(pathname, item.href);
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          // base + animated underline via pseudo-element and group for icon hover
          "inline-flex items-center gap-2 font-medium transition-colors hover:text-primary relative group after:block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-150 hover:after:scale-x-100",
          _variant === "minimal" ? "text-sm opacity-80" : "text-sm",
          active
            ? "text-foreground font-semibold after:scale-x-100"
            : "text-foreground/60",
        )}
      >
        {item.Icon && showIcons && _variant !== "minimal" ? (
          <item.Icon className="size-4 text-muted-foreground transition-transform duration-150 group-hover:scale-105" />
        ) : null}
        <span>{item.title}</span>
      </Link>
    );
  });

  if (asChild) {
    return <>{menuItemsList}</>;
  }

  return (
    <nav
      role="navigation"
      aria-label="Main menu"
      className={cn("flex items-center", flexDirection, gap)}
    >
      {menuItemsList}
    </nav>
  );
}

export default PortfolioMenu;

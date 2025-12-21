'use client';

import { PortfolioMenu, menuItems } from '@/components/portfolio-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@aws-amplify/ui-react';
import { ThemeToggle } from '@portfolio/components/theme-toggle';
import { siteConfig } from '@portfolio/config/site';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

// Portfolio Menu Bar component that would be generated from Figma
export interface PortfolioMenuBarProps {
  variant?: 'default' | 'minimal';
  showThemeToggle?: boolean;
  sticky?: boolean;
}

export function PortfolioMenuBar({
  variant = 'default',
  showThemeToggle = true,
  sticky = true,
}: PortfolioMenuBarProps) {
  const pathname = usePathname();
  const showIcons = variant !== 'minimal';

  return (
    <header
      className={`${
        sticky ? 'sticky top-0 z-50' : ''
      } w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            href="/"
          >
            <span className="font-bold text-xl text-foreground">
              {siteConfig.name}
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <PortfolioMenu
              direction="horizontal"
              variant={variant}
              showIcons={showIcons}
              asChild
            />
            {showThemeToggle && <ThemeToggle />}
          </div>

          <div className="flex md:hidden items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variation="link"
                  size="small"
                  aria-label="Open menu"
                  className="h-9 w-9 p-0 hover:bg-accent hover:text-accent-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <title>Menu</title>
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent sideOffset={8} align="end" className="w-48">
                {menuItems.map((item) => {
                  const active = pathname
                    ? pathname === item.href ||
                      pathname.startsWith(`${item.href}/`)
                    : item.href === '/';
                  return (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href}
                        className={`flex w-full items-center gap-3 pr-2 group cursor-pointer ${
                          active
                            ? 'font-semibold text-foreground bg-accent'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                        }`}
                        aria-current={active ? 'page' : undefined}
                      >
                        {item.Icon && showIcons
                          ? React.createElement(item.Icon, {
                              className:
                                'size-4 text-muted-foreground transition-transform duration-150 group-hover:scale-105',
                            })
                          : null}
                        <span className="flex-1">{item.title}</span>
                        {active ? (
                          <Check className="size-4 text-primary transition-transform duration-150 scale-105" />
                        ) : null}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {showThemeToggle && <ThemeToggle />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default PortfolioMenuBar;

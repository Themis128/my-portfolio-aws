import { PortfolioFooter } from "@/components/portfolio-footer";
import { PortfolioMenuBar } from "@/components/portfolio-menu-bar";
import type { ReactNode } from "react";

type SiteLayoutProps = {
  children: ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <PortfolioMenuBar />
      <main className="flex-1">
        <div className="container py-24">{children}</div>
      </main>
      <PortfolioFooter />
    </div>
  );
}

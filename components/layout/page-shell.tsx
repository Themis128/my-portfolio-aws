import { PortfolioFooter } from "@/components/portfolio-footer";
import { PortfolioMenuBar } from "@/components/portfolio-menu-bar";
import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  showMenuBar?: boolean;
  showFooter?: boolean;
};

export function PageShell({
  children,
  showMenuBar = true,
  showFooter = true,
}: PageShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {showMenuBar && <PortfolioMenuBar />}
      <main className="flex-1">
        <div className="container py-24">{children}</div>
      </main>
      {showFooter && <PortfolioFooter />}
    </div>
  );
}

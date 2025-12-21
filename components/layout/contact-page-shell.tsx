import { ArrowLeft } from "lucide-react";

import Link from "next/link";
import type { ReactNode } from "react";

type ContactPageShellProps = {
  children: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  backHref?: string;
  backLabel?: string;
  maxWidthClassName?: string;
};

export function ContactPageShell({
  children,
  title,
  description,
  backHref,
  backLabel = "Back to Home",
  maxWidthClassName = "max-w-4xl",
}: ContactPageShellProps) {
  return (
    <div className="relative isolate">
      <section className="container relative py-24">
        {backHref ? (
          <div>
            <Link
              className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              href={backHref}
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Link>
          </div>
        ) : null}

        <div className={`mx-auto ${maxWidthClassName}`}>
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-balance font-semibold text-4xl tracking-tight sm:text-6xl">
              {title}
            </h1>
            {description ? (
              <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground leading-8 sm:text-xl">
                {description}
              </p>
            ) : null}
          </div>

          {children}
        </div>
      </section>
    </div>
  );
}

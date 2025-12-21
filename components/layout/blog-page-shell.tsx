import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type BlogPageShellProps = {
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  backHref?: string;
  backLabel?: string;
  maxWidthClassName?: string;
  author?: string;
  publishedAt?: string;
  readingTime?: string;
  tags?: string[];
};

export function BlogPageShell({
  children,
  title,
  description,
  backHref = "/blog",
  backLabel = "Back to Blog",
  maxWidthClassName = "max-w-4xl",
  author,
  publishedAt,
  readingTime,
  tags,
}: BlogPageShellProps) {
  return (
    <div className="relative isolate">
      <section className="container relative py-24">
        <div>
          <Link
            className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            href={backHref}
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
        </div>

        <div className={`mx-auto ${maxWidthClassName}`}>
          {title && (
            <div className="mb-8">
              <h1 className="mb-4 text-balance font-semibold text-4xl tracking-tight sm:text-5xl">
                {title}
              </h1>
              {description && (
                <p className="mx-auto max-w-3xl text-balance text-lg text-muted-foreground leading-8 sm:text-xl">
                  {description}
                </p>
              )}

              {/* Blog Meta Information */}
              {(author || publishedAt || readingTime || tags) && (
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t pt-6">
                  {author && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{author}</span>
                    </div>
                  )}
                  {publishedAt && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{publishedAt}</span>
                    </div>
                  )}
                  {readingTime && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{readingTime}</span>
                    </div>
                  )}
                </div>
              )}

              {tags && tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {children}
        </div>
      </section>
    </div>
  );
}

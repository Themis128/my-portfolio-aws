import { ArrowLeft, ExternalLink, Github, User, Clock } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type ProjectDetailShellProps = {
  children: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  backHref?: string;
  backLabel?: string;
  maxWidthClassName?: string;
  client?: string;
  duration?: string;
  role?: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  status?: "completed" | "in-progress" | "planned";
};

export function ProjectDetailShell({
  children,
  title,
  description,
  backHref = "/projects",
  backLabel = "Back to Projects",
  maxWidthClassName = "max-w-5xl",
  client,
  duration,
  role,
  technologies,
  liveUrl,
  githubUrl,
  status = "completed",
}: ProjectDetailShellProps) {
  const getStatusBadge = () => {
    const statusConfig = {
      completed: {
        label: "Completed",
        className: "bg-green-100 text-green-800",
      },
      "in-progress": {
        label: "In Progress",
        className: "bg-blue-100 text-blue-800",
      },
      planned: { label: "Planned", className: "bg-gray-100 text-gray-800" },
    };

    const config = statusConfig[status];
    return (
      <span
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${config.className}`}
      >
        {config.label}
      </span>
    );
  };

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
          {/* Project Header */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-balance font-semibold text-4xl tracking-tight sm:text-5xl">
                    {title}
                  </h1>
                  {getStatusBadge()}
                </div>
                {description && (
                  <p className="text-balance text-lg text-muted-foreground leading-8 sm:text-xl max-w-3xl">
                    {description}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 lg:flex-col">
                {liveUrl && (
                  <Link
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-10 rounded-md bg-primary px-4 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </Link>
                )}
                {githubUrl && (
                  <Link
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-10 rounded-md border border-border bg-background px-4 font-medium text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <Github className="h-4 w-4" />
                    View Code
                  </Link>
                )}
              </div>
            </div>

            {/* Project Meta Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-muted/50 rounded-lg">
              {client && (
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-1">
                    <User className="h-4 w-4" />
                    Client
                  </div>
                  <p className="text-sm text-muted-foreground">{client}</p>
                </div>
              )}

              {duration && (
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-1">
                    <Clock className="h-4 w-4" />
                    Duration
                  </div>
                  <p className="text-sm text-muted-foreground">{duration}</p>
                </div>
              )}

              {role && (
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-1">
                    <User className="h-4 w-4" />
                    Role
                  </div>
                  <p className="text-sm text-muted-foreground">{role}</p>
                </div>
              )}

              {technologies && technologies.length > 0 && (
                <div className="sm:col-span-2 lg:col-span-1">
                  <div className="text-sm font-medium text-foreground mb-2">
                    Technologies
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                    {technologies.length > 3 && (
                      <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                        +{technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Full Technology Stack */}
            {technologies && technologies.length > 3 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Full Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Project Content */}
          <div className="prose prose-gray max-w-none">{children}</div>
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { BaltzakisProject } from "@/lib/baltzakis-projects";

type ProjectsPageClientProps = {
  projects: BaltzakisProject[];
};

function getCategories(projects: BaltzakisProject[]): string[] {
  const tags = new Set<string>();
  for (const project of projects) {
    for (const tag of project.tags) {
      tags.add(tag);
    }
  }

  return ["All", ...Array.from(tags).sort((a, b) => a.localeCompare(b))];
}

export function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
  const categories = useMemo(() => getCategories(projects), [projects]);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }
    return projects.filter((project) => project.tags.includes(activeCategory));
  }, [activeCategory, projects]);

  return (
    <div>
      {projects.length > 0 ? (
        <>
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                size="sm"
                type="button"
                variant={activeCategory === category ? "default" : "outline"}
              >
                {category}
              </Button>
            ))}
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const topTag = project.tags[0] ?? "Project";
              const secondary =
                project.client ?? project.role ?? project.duration ?? null;

              return (
                <li
                  className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  key={project.slug}
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <Badge variant="secondary">{topTag}</Badge>
                    {secondary ? (
                      <span className="text-muted-foreground text-sm">
                        {secondary}
                      </span>
                    ) : null}
                  </div>

                  <h2 className="mb-2 font-semibold text-lg leading-snug">
                    <Link
                      className="hover:underline"
                      href={`/projects/${project.slug}`}
                    >
                      {project.title}
                    </Link>
                  </h2>

                  <p className="mb-4 line-clamp-3 text-muted-foreground text-sm">
                    {project.description}
                  </p>

                  {project.technologies?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge className="text-xs" key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 ? (
                        <Badge className="text-xs" variant="outline">
                          +{project.technologies.length - 3}
                        </Badge>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>

          {filteredProjects.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No projects found in this category.
              </p>
            </div>
          ) : null}
        </>
      ) : (
        <div className="rounded-xl border border-border bg-card p-6 text-center">
          <p className="text-muted-foreground">
            No projects found in the snapshot.
          </p>
          <p className="mt-2 text-muted-foreground text-sm">
            Ensure the Nuxt build assets are present under
            <span className="font-medium"> apps/your-portfolio/_source</span>.
          </p>
        </div>
      )}
    </div>
  );
}

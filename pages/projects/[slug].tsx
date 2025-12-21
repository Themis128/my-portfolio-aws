import { getPersonalDataServer } from "@/lib/personal-data";
import { Badge } from "@aws-amplify/ui-react";
import { PageShell } from "@portfolio/components/layout";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  featured: boolean;
  image?: string;
  github?: string;
  demo?: string;
  year: string;
  slug: string;
}

interface ProjectPageProps {
  project: Project | null;
}

export default function ProjectPage({ project }: ProjectPageProps) {
  if (!project) {
    return (
      <PageShell>
        <div className="container py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist.
            </p>
            <Link href="/projects" className="text-primary hover:underline">
              ← Back to Projects
            </Link>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="container py-24">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/projects" className="text-primary hover:underline">
              ← Back to Projects
            </Link>
          </div>

          {/* Project Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variation={project.featured ? "info" : undefined}>
                {project.category}
              </Badge>
              {project.featured && <Badge variation="success">Featured</Badge>}
            </div>

            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech: string) => (
                <Badge key={tech} className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Project Image */}
          {project.image && (
            <div className="mb-8">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
              <div className="space-y-2">
                <p>
                  <strong>Year:</strong> {project.year}
                </p>
                <p>
                  <strong>Category:</strong> {project.category}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {project.featured ? "Featured" : "Completed"}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <Badge key={tech} className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                View Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-md hover:bg-accent transition-colors"
              >
                View Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const personalData = await getPersonalDataServer();
  const paths = personalData.projects.map((project: Project) => ({
    params: {
      slug: project.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProjectPageProps> = async ({
  params,
}) => {
  const personalData = await getPersonalDataServer();
  const slug = params?.slug as string;

  // Convert title to slug format for matching
  const project =
    personalData.projects.find(
      (p: Project) =>
        p.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "") === slug,
    ) || null;

  return {
    props: {
      project,
    },
  };
};

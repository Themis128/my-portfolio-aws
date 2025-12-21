"use client";

import { PortfolioCard } from "@/components/portfolio-card";
import {
  categoriesAtom,
  clearErrorAtom,
  errorAtom,
  fetchProjectsAtom,
  filteredProjectsAtom,
  loadingAtom,
  selectedCategoryAtom,
  setSelectedCategoryAtom,
} from "@/stores";
import { useMounted } from "@/hooks/use-mounted";
import { Alert, Button, Flex, Grid, Text, View } from "@aws-amplify/ui-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProjectsPage() {
  const [loading] = useAtom(loadingAtom);
  const [error] = useAtom(errorAtom);
  const [selectedCategory] = useAtom(selectedCategoryAtom);
  const [filteredProjects] = useAtom(filteredProjectsAtom);
  const [categories] = useAtom(categoriesAtom);
  const [, fetchProjects] = useAtom(fetchProjectsAtom);
  const [, setSelectedCategoryAction] = useAtom(setSelectedCategoryAtom);
  const [, clearError] = useAtom(clearErrorAtom);
  const router = useRouter();
  const mounted = useMounted();

  // Fetch projects on component mount
  useEffect(() => {
    if (mounted) {
      fetchProjects();
    }
  }, [fetchProjects, mounted]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategoryAction(category);
  };

  const handleClearError = () => {
    clearError();
  };

  if (loading || !mounted) {
    return (
      <View padding="4rem" textAlign="center">
        <Text fontSize="lg">Loading projects...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View padding="2rem" textAlign="center">
        <Alert variation="error" heading="Error Loading Projects">
          <Text>{error}</Text>
          <Button
            variation="primary"
            size="small"
            onClick={handleClearError}
            marginTop="1rem"
          >
            Try Again
          </Button>
        </Alert>
      </View>
    );
  }

  return (
    <>
      <div className="text-center mb-12">
        <h1 className="mb-4 text-balance font-semibold text-4xl tracking-tight sm:text-6xl">
          My Projects
        </h1>
        <p className="mx-auto max-w-3xl text-balance text-lg text-muted-foreground leading-8 sm:text-xl">
          A showcase of my work in software development, data analytics, and
          technology consulting.
        </p>
      </div>

      {/* Category Filter */}
      <View marginBottom="2rem" textAlign="center">
        <Flex gap="0.5rem" wrap="wrap" justifyContent="center">
          {categories.map((category) => (
            <Button
              key={category}
              variation={selectedCategory === category ? "primary" : "link"}
              size="small"
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </Flex>
      </View>

      {/* Projects Grid */}
      <Grid
        templateColumns={{
          base: "1fr",
          medium: "repeat(2, 1fr)",
          large: "repeat(3, 1fr)",
        }}
        gap="2rem"
      >
        {filteredProjects.map((project) => (
          <PortfolioCard
            key={project.slug}
            title={project.title}
            description={project.description}
            technologies={project.technologies || []}
            imageUrl={project.image || undefined}
            status="completed"
            onClick={() => router.push(`/projects/${project.slug}`)}
          />
        ))}
      </Grid>

      {filteredProjects.length === 0 && (
        <Alert variation="info" heading="No Projects Found">
          <Text>
            No projects found in: {selectedCategory} category. Try selecting a
            different category or check back later.
          </Text>
        </Alert>
      )}
    </>
  );
}

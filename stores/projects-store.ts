/**
 * Projects Store - Jotai atomic state management for projects
 * Following Next.js best practices for project data management
 */

import { atom } from 'jotai';

// Project type matching API response
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  featured: boolean;
  image: string;
  github: string;
  demo: string;
  year: string;
  slug: string;
}

// Base atoms
export const projectsAtom = atom<Project[]>([]);
export const loadingAtom = atom<boolean>(false);
export const errorAtom = atom<string | null>(null);
export const selectedCategoryAtom = atom<string>('All');

// Derived atoms
export const filteredProjectsAtom = atom((get) => {
  const projects = get(projectsAtom);
  const selectedCategory = get(selectedCategoryAtom);

  if (selectedCategory === 'All') return projects;

  return projects.filter(
    (project) =>
      project.category === selectedCategory ||
      project.technologies.some((tech) => tech === selectedCategory)
  );
});

export const categoriesAtom = atom((get) => {
  const projects = get(projectsAtom);
  const categories = new Set<string>();
  const technologies = new Set<string>();

  projects.forEach((p) => {
    if (p.category) categories.add(p.category);
    p.technologies.forEach((t) => technologies.add(t));
  });

  const combined = Array.from(
    new Set([
      ...Array.from(categories).sort(),
      ...Array.from(technologies).sort(),
    ])
  );

  return ['All', ...combined];
});

export const projectStatsAtom = atom((get) => {
  const projects = get(projectsAtom);

  return {
    totalProjects: projects.length,
    totalTechnologies: new Set(projects.flatMap((p) => p.technologies)).size,
  };
});

// Action atoms
export const setProjectsAtom = atom(null, (_get, set, projects: Project[]) => {
  set(projectsAtom, projects);
  set(errorAtom, null);
});

export const setSelectedCategoryAtom = atom(
  null,
  (_get, set, category: string) => {
    set(selectedCategoryAtom, category);
  }
);

export const addProjectAtom = atom(null, (_get, set, project: Project) => {
  set(projectsAtom, (prev) => [...prev, project]);
  set(errorAtom, null);
});

export const updateProjectAtom = atom(
  null,
  (
    _get,
    set,
    { slug, updates }: { slug: string; updates: Partial<Project> }
  ) => {
    set(projectsAtom, (prev) =>
      prev.map((project) =>
        project.slug === slug ? { ...project, ...updates } : project
      )
    );
    set(errorAtom, null);
  }
);

export const deleteProjectAtom = atom(null, (_get, set, slug: string) => {
  set(projectsAtom, (prev) => prev.filter((project) => project.slug !== slug));
  set(errorAtom, null);
});

// Async action atoms
export const fetchProjectsAtom = atom(null, async (_get, set) => {
  set(loadingAtom, true);
  set(errorAtom, null);

  try {
    const response = await fetch('/api/projects');
    if (response.ok) {
      const projectData = await response.json();
      set(projectsAtom, projectData);
    } else {
      throw new Error('Failed to fetch projects');
    }
  } catch (err) {
    set(errorAtom, 'Failed to fetch projects');
    console.error('Error loading projects:', err);
  } finally {
    set(loadingAtom, false);
  }
});

// Utility atoms
export const clearErrorAtom = atom(null, (_get, set) => {
  set(errorAtom, null);
});

export const getProjectBySlugAtom = atom(
  (get) =>
    (slug: string): Project | null => {
      const projects = get(projectsAtom);
      return projects.find((project) => project.slug === slug) ?? null;
    }
);

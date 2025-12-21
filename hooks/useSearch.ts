import { useMemo, useEffect, useState } from "react";
import type { BlogPost } from "@/data/blogPosts";

export type SearchResult = {
  type: "blog" | "service" | "project";
  id: string;
  title: string;
  description: string;
  url: string;
};

const services = [
  {
    id: "webdev",
    title: "Web Development",
    description: "Custom web applications built with modern technologies",
    url: "#webdev",
  },
  {
    id: "mobile",
    title: "Mobile Apps",
    description: "Native and cross-platform mobile solutions",
    url: "#services",
  },
  {
    id: "design",
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that users love",
    url: "#services",
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    description: "Data-driven strategies to grow your business",
    url: "#services",
  },
  {
    id: "cloud",
    title: "Cloud Solutions",
    description: "Scalable infrastructure and deployment",
    url: "#services",
  },
  {
    id: "consulting",
    title: "Consulting",
    description: "Strategic guidance for digital transformation",
    url: "#services",
  },
];

const projects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "Full-stack marketplace with 50K+ active users",
    url: "#projects",
  },
  {
    id: "2",
    title: "Fitness Tracking App",
    description: "Cross-platform app with AI-powered insights",
    url: "#projects",
  },
  {
    id: "3",
    title: "SaaS Dashboard",
    description: "Enterprise analytics platform redesign",
    url: "#projects",
  },
];

export const useSearch = (query: string) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("/api/blog");
        if (response.ok) {
          const posts = await response.json();
          setBlogPosts(posts);
        }
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, []);

  const results = useMemo<SearchResult[]>(() => {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const lowerQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search blog posts
    blogPosts.forEach((post: BlogPost) => {
      if (
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some((tag: string) => tag.toLowerCase().includes(lowerQuery))
      ) {
        searchResults.push({
          type: "blog",
          id: post.id,
          title: post.title,
          description: post.excerpt,
          url: `#blog-${post.slug}`,
        });
      }
    });

    // Search services
    services.forEach((service) => {
      if (
        service.title.toLowerCase().includes(lowerQuery) ||
        service.description.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          type: "service",
          id: service.id,
          title: service.title,
          description: service.description,
          url: service.url,
        });
      }
    });

    // Search projects
    projects.forEach((project) => {
      if (
        project.title.toLowerCase().includes(lowerQuery) ||
        project.description.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          type: "project",
          id: project.id,
          title: project.title,
          description: project.description,
          url: project.url,
        });
      }
    });

    return searchResults.slice(0, 10); // Limit to 10 results
  }, [query, blogPosts]);

  return results;
};

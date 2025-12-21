export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  image?: string;
  readTime: number;
};

// Client-side helper functions
export const getBlogPostBySlug = (
  posts: BlogPost[],
  slug: string,
): BlogPost | undefined => posts.find((post) => post.slug === slug);

export const getBlogPostsByCategory = (
  posts: BlogPost[],
  category: string,
): BlogPost[] => posts.filter((post) => post.category === category);

export const getBlogPostsByTag = (posts: BlogPost[], tag: string): BlogPost[] =>
  posts.filter((post) => post.tags.includes(tag));

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Development: Trends to Watch in 2024",
    slug: "future-of-web-development-2024",
    excerpt:
      "Explore the latest trends shaping web development, from AI integration to serverless architectures.",
    content:
      "\n      <h2>Introduction</h2>\n      <p>Web development continues to evolve at a rapid pace. In 2024, we're seeing exciting trends that are reshaping how we build and deploy web applications.</p>\n\n      <h2>AI-Powered Development</h2>\n      <p>Artificial Intelligence is becoming an integral part of the development workflow. From code generation to automated testing, AI tools are helping developers work more efficiently.</p>\n\n      <h2>Serverless Architecture</h2>\n      <p>Serverless computing is gaining momentum, offering developers the ability to build and deploy applications without managing infrastructure.</p>\n\n      <h2>Conclusion</h2>\n      <p>Staying ahead of these trends is crucial for modern web developers. Embracing new technologies while maintaining best practices will ensure your projects remain competitive.</p>\n    ",
    author: {
      name: "John Doe",
    },
    publishedAt: "2024-12-01",
    category: "Web Development",
    tags: ["web development", "trends", "2024", "technology"],
    readTime: 5,
  },
  {
    id: "2",
    title: "Building Scalable React Applications: Best Practices",
    slug: "scalable-react-applications",
    excerpt:
      "Learn how to structure and optimize React applications for scalability and maintainability.",
    content:
      "\n      <h2>Introduction</h2>\n      <p>Building scalable React applications requires careful planning and adherence to best practices. This guide covers essential strategies.</p>\n\n      <h2>Component Architecture</h2>\n      <p>Proper component structure is the foundation of scalable React apps. Use composition, keep components focused, and leverage custom hooks.</p>\n\n      <h2>State Management</h2>\n      <p>Choose the right state management solution for your needs. Consider Context API for simple cases, Redux for complex applications.</p>\n\n      <h2>Performance Optimization</h2>\n      <p>Implement code splitting, lazy loading, and memoization to ensure your application performs well at scale.</p>\n    ",
    author: {
      name: "Sarah Miller",
    },
    publishedAt: "2024-11-25",
    category: "Web Development",
    tags: ["react", "scalability", "best practices", "performance"],
    readTime: 8,
  },
  {
    id: "3",
    title: "Mobile-First Design: Why It Matters in 2024",
    slug: "mobile-first-design-2024",
    excerpt:
      "Understanding the importance of mobile-first design and how to implement it effectively.",
    content:
      "\n      <h2>Introduction</h2>\n      <p>With mobile traffic accounting for over 60% of web traffic, mobile-first design is no longer optional\u2014it's essential.</p>\n\n      <h2>Why Mobile-First?</h2>\n      <p>Mobile-first design ensures your website works perfectly on the smallest screens first, then progressively enhances for larger devices.</p>\n\n      <h2>Implementation Strategies</h2>\n      <p>Start with mobile layouts, use flexible grids, and prioritize touch interactions. Test on real devices whenever possible.</p>\n\n      <h2>Performance Considerations</h2>\n      <p>Optimize images, minimize JavaScript, and leverage modern CSS features to ensure fast mobile experiences.</p>\n    ",
    author: {
      name: "Mike Rodriguez",
    },
    publishedAt: "2024-11-15",
    category: "UI/UX Design",
    tags: ["mobile", "design", "responsive", "ux"],
    readTime: 6,
  },
];

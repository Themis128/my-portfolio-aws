# Layout Components

This directory contains specialized layout components for different page types in your portfolio application.

## Available Layouts

### 1. PageShell

**Purpose**: Basic page layout with container and padding
**Use Case**: Simple pages that need consistent spacing and container width

```tsx
import { PageShell } from "@portfolio/components/layout";

export default function MyPage() {
  return (
    <PageShell>
      <h1>Page Title</h1>
      <p>Page content goes here</p>
    </PageShell>
  );
}
```

### 2. ContactPageShell

**Purpose**: Contact page layout with title, description, and back navigation
**Use Case**: Contact forms and pages with prominent headers

```tsx
import { ContactPageShell } from "@portfolio/components/layout";

export default function ContactPage() {
  return (
    <ContactPageShell
      title="Get In Touch"
      description="Ready to start your next project?"
      backHref="/"
      backLabel="Back to Home"
    >
      <ContactForm />
    </ContactPageShell>
  );
}
```

### 3. BlogPageShell

**Purpose**: Blog post layout with metadata (author, date, reading time, tags)
**Use Case**: Individual blog posts and articles

```tsx
import { BlogPageShell } from "@portfolio/components/layout";

export default function BlogPostPage() {
  return (
    <BlogPageShell
      title="My Blog Post"
      description="A brief description of the post"
      author="John Doe"
      publishedAt="January 1, 2024"
      readingTime="5 min read"
      tags={["React", "Next.js", "TypeScript"]}
    >
      <BlogContent />
    </BlogPageShell>
  );
}
```

### 4. ProjectDetailShell

**Purpose**: Project detail page with comprehensive metadata and action buttons
**Use Case**: Individual project showcase pages

```tsx
import { ProjectDetailShell } from "@portfolio/components/layout";

export default function ProjectDetailPage() {
  return (
    <ProjectDetailShell
      title="Amazing Project"
      description="A comprehensive project description"
      client="Acme Corp"
      duration="3 months"
      role="Full Stack Developer"
      technologies={["React", "Node.js", "AWS"]}
      liveUrl="https://example.com"
      githubUrl="https://github.com/user/repo"
      status="completed"
    >
      <ProjectContent />
    </ProjectDetailShell>
  );
}
```

### 5. ContentShell

**Purpose**: Minimal content wrapper with customizable container and padding
**Use Case**: Simple content pages that need basic structure

```tsx
import { ContentShell } from "@portfolio/components/layout";

export default function SimplePage() {
  return (
    <ContentShell maxWidthClassName="max-w-2xl" paddingClassName="py-16">
      <h1>Simple Content</h1>
      <p>Just the basics</p>
    </ContentShell>
  );
}
```

## Layout Hierarchy

```
RootLayout (app/layout.tsx)
├── SiteHeader
├── Main Content
│   ├── PageShell
│   ├── ContactPageShell
│   ├── BlogPageShell
│   ├── ProjectDetailShell
│   └── ContentShell
└── SiteFooter
```

## Usage Guidelines

1. **Choose the right layout** based on your page type and content needs
2. **Import from the index** for cleaner imports: `import { PageShell } from "@portfolio/components/layout"`
3. **Customize props** as needed - all layouts accept optional customization props
4. **Maintain consistency** - use layouts consistently across similar page types

## Styling

All layouts use Tailwind CSS classes and are designed to be:

- **Responsive**: Work on all screen sizes
- **Accessible**: Follow semantic HTML and ARIA guidelines
- **Consistent**: Maintain uniform spacing and typography
- **Customizable**: Support theming and brand colors

## Best Practices

1. **Wrap page content** in the appropriate layout component
2. **Use semantic HTML** within layout children
3. **Maintain consistent heading hierarchy** (h1 for page titles)
4. **Leverage layout props** for customization instead of overriding styles
5. **Test responsiveness** across different screen sizes

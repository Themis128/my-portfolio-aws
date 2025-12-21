# Figma Component Examples

This document provides comprehensive examples of how to use the Figma-generated Amplify UI components in your portfolio project.

## Components Overview

### 1. PortfolioCard

A versatile card component for showcasing portfolio projects with status badges and technology tags.

```typescript
import { PortfolioCard } from '@/ui-components';

// Basic usage
<PortfolioCard
  title="My Project"
  description="Project description here"
  technologies={["React", "TypeScript"]}
  status="completed"
  onClick={() => console.log('Card clicked')}
/>

// With image
<PortfolioCard
  title="E-Commerce Platform"
  description="A modern e-commerce solution"
  technologies={["React", "Node.js", "MongoDB"]}
  status="in-progress"
  imageUrl="/images/project-thumb.jpg"
  onClick={() => router.push('/projects/ecommerce')}
/>
```

**Props:**

- `title` (string): Project title
- `description` (string): Project description
- `technologies` (string[]): Array of technology names
- `imageUrl` (string, optional): Project thumbnail URL
- `status` ('completed' | 'in-progress' | 'planned'): Project status
- `onClick` (function, optional): Click handler

### 2. HeroSection

A full-width hero section with customizable content and background.

```typescript
import { HeroSection } from '@/ui-components';

// Basic hero
<HeroSection
  title="Welcome to My Portfolio"
  subtitle="Full-Stack Developer"
  description="Building amazing web experiences with modern technologies"
  onPrimaryClick={() => router.push('/projects')}
  onSecondaryClick={() => router.push('/contact')}
/>

// Hero with background image
<HeroSection
  title="Creative Developer"
  subtitle="UI/UX Enthusiast"
  description="Turning ideas into beautiful, functional applications"
  backgroundImage="/images/hero-bg.jpg"
  primaryButtonText="View My Work"
  secondaryButtonText="Get In Touch"
  onPrimaryClick={() => router.push('/projects')}
  onSecondaryClick={() => router.push('/contact')}
/>
```

**Props:**

- `title` (string): Main heading text
- `subtitle` (string): Subtitle text
- `description` (string): Descriptive paragraph
- `primaryButtonText` (string, optional): Primary button text
- `secondaryButtonText` (string, optional): Secondary button text
- `backgroundImage` (string, optional): Background image URL
- `onPrimaryClick` (function, optional): Primary button click handler
- `onSecondaryClick` (function, optional): Secondary button click handler

### 3. ContactForm

A fully functional contact form with validation and loading states.

```typescript
import { ContactForm } from '@/ui-components';

// Basic usage
<ContactForm
  onSubmit={(data) => {
    console.log('Form submitted:', data);
    // Handle form submission (e.g., send to API)
  }}
/>

// Customized form
<ContactForm
  title="Get In Touch"
  description="Let's discuss your next project"
  submitButtonText="Send Message"
  loading={isSubmitting}
  onSubmit={async (data) => {
    setIsSubmitting(true);
    try {
      await sendContactForm(data);
      alert('Message sent successfully!');
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }}
/>
```

**Props:**

- `title` (string, optional): Form title
- `description` (string, optional): Form description
- `submitButtonText` (string, optional): Submit button text
- `loading` (boolean, optional): Loading state
- `onSubmit` (function): Form submission handler

**Form Data Structure:**

```typescript
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
```

### 4. ExampleButton

A customizable button component with multiple variations and sizes.

```typescript
import { ExampleButton } from '@/ui-components';

// Different variations
<ExampleButton variation="primary">Primary</ExampleButton>
<ExampleButton variation="secondary">Secondary</ExampleButton>
<ExampleButton variation="warning">Warning</ExampleButton>
<ExampleButton variation="destructive">Delete</ExampleButton>

// Different sizes
<ExampleButton size="small">Small</ExampleButton>
<ExampleButton size="medium">Medium</ExampleButton>
<ExampleButton size="large">Large</ExampleButton>

// States
<ExampleButton disabled>Disabled</ExampleButton>
<ExampleButton loading>Loading...</ExampleButton>

// With click handler
<ExampleButton
  variation="primary"
  onClick={() => console.log('Button clicked')}
>
  Click Me
</ExampleButton>
```

## Real-World Usage Examples

### Portfolio Page Layout

```typescript
import { HeroSection, PortfolioCard } from '@/ui-components';
import { View, Flex } from '@aws-amplify/ui-react';

export default function PortfolioPage() {
  const projects = [
    {
      title: "Task Management App",
      description: "A collaborative task management tool with real-time updates",
      technologies: ["React", "Firebase", "Material-UI"],
      status: "completed" as const,
      imageUrl: "/projects/task-app.jpg"
    },
    {
      title: "Weather Dashboard",
      description: "Interactive weather dashboard with forecasting and maps",
      technologies: ["Vue.js", "Chart.js", "OpenWeather API"],
      status: "in-progress" as const,
      imageUrl: "/projects/weather-dashboard.jpg"
    }
  ];

  return (
    <View>
      <HeroSection
        title="My Portfolio"
        subtitle="Recent Projects"
        description="Explore my latest work and side projects"
        primaryButtonText="View All Projects"
        onPrimaryClick={() => console.log('View all projects')}
      />

      <View padding="large">
        <Flex direction="row" gap="large" wrap="wrap">
          {projects.map((project, index) => (
            <PortfolioCard
              key={index}
              {...project}
              onClick={() => router.push(`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`)}
            />
          ))}
        </Flex>
      </View>
    </View>
  );
}
```

### Contact Page Integration

```typescript
import { ContactForm, HeroSection } from '@/ui-components';
import { View } from '@aws-amplify/ui-react';
import { useState } from 'react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Message sent successfully!');
        // Reset form or redirect
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      alert('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View>
      <HeroSection
        title="Get In Touch"
        subtitle="Contact Me"
        description="Have a project in mind? Let's discuss how we can work together"
        backgroundImage="/images/contact-bg.jpg"
      />

      <View padding="large">
        <ContactForm
          title="Send Me a Message"
          description="I'll get back to you as soon as possible"
          submitButtonText="Send Message"
          loading={isSubmitting}
          onSubmit={handleSubmit}
        />
      </View>
    </View>
  );
}
```

## Styling and Customization

### Using Theme Overrides

```typescript
import { PortfolioCard } from '@/ui-components';

<PortfolioCard
  title="Custom Styled Card"
  description="This card uses custom overrides"
  technologies={["React", "CSS"]}
  status="completed"
  overrides={{
    Card: {
      backgroundColor: '#custom-color',
      borderRadius: '16px'
    },
    Heading: {
      color: '#custom-heading-color'
    }
  }}
/>
```

### Extending Components

```typescript
import { PortfolioCard } from '@/ui-components';

interface CustomPortfolioCardProps extends PortfolioCardProps {
  featured?: boolean;
}

function CustomPortfolioCard({ featured, ...props }: CustomPortfolioCardProps) {
  return (
    <div className={`custom-card-wrapper ${featured ? 'featured' : ''}`}>
      <PortfolioCard {...props} />
      {featured && (
        <div className="featured-badge">
          ⭐ Featured Project
        </div>
      )}
    </div>
  );
}
```

## Best Practices

1. **Consistent Naming**: Use clear, descriptive names for your components in Figma
2. **Responsive Design**: Test components on different screen sizes
3. **Accessibility**: Ensure components have proper ARIA labels and keyboard navigation
4. **Performance**: Use lazy loading for images in portfolio cards
5. **Error Handling**: Implement proper error states for forms and API calls

## Next Steps

1. Design your components in Figma using the AWS Amplify UI kit
2. Sync components to Amplify Studio
3. Generate code with `npx ampx generate`
4. Customize components with overrides and extensions
5. Test thoroughly across different devices and browsers

For more detailed information, refer to the [Figma Integration Guide](./FIGMA_INTEGRATION_GUIDE.md).

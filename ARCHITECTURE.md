# Portfolio Application Architecture

## Overview

This is a modern, full-stack portfolio website built with Next.js 16, featuring a comprehensive architecture that combines frontend excellence with cloud-native backend services. The application showcases professional development practices with AWS Amplify, TypeScript, and modern React patterns.

## 🏗️ Architecture Overview

### Technology Stack

**Frontend Framework:**

- **Next.js 16** - React framework with App Router and Turbopack
- **React 19** - Latest React with concurrent features
- **TypeScript 5.9+** - Full type safety

**State Management:**

- **Jotai** - Atomic state management for React
- **Custom Stores** - Modular state organization

**Styling & UI:**

- **Tailwind CSS v4** - Utility-first CSS framework
- **AWS Amplify UI** - Cloud-native component library
- **Radix UI** - Accessible component primitives
- **Magic UI** - Animated UI components

**Backend & Cloud:**

- **AWS Amplify** - Full-stack cloud platform
- **AWS Lambda** - Serverless functions
- **Amazon API Gateway** - API management
- **AWS AppSync** - GraphQL API (optional)
- **Amazon DynamoDB** - NoSQL database (optional)

**Development Tools:**

- **pnpm** - Fast package manager
- **Biome** - Fast linter and formatter
- **ESLint** - Code quality
- **Prettier** - Code formatting
- **Playwright** - End-to-end testing
- **Husky** - Git hooks

## 📁 Project Structure

```
your-portfolio-autonomous/
├── 📁 amplify/                    # AWS Amplify backend configuration
│   ├── auth/                     # Authentication settings
│   ├── data/                     # GraphQL schema and resolvers
│   ├── backend/                  # Backend function definitions
│   └── backend.ts                # Main backend configuration
├── 📁 components/                # React components
│   ├── ui/                       # Reusable UI components
│   ├── contact/                  # Contact-related components
│   ├── projects/                 # Project display components
│   ├── hero-section.tsx          # Main hero component
│   ├── portfolio-card.tsx        # Portfolio item cards
│   └── theme-toggle.tsx          # Theme switching
├── 📁 config/                    # Application configuration
│   └── site.ts                   # Site-wide settings
├── 📁 data/                      # Static data files
│   └── blogPosts.ts              # Blog content
├── 📁 docs/                      # Documentation
├── 📁 hooks/                     # Custom React hooks
│   ├── useToast.ts               # Notification system
│   ├── use-config.ts             # Configuration hook
│   └── use-mobile.ts             # Responsive design hook
├── 📁 lib/                       # Utility functions and services
│   ├── amplify-client.ts         # AWS Amplify client setup
│   ├── personal-data.ts          # Personal information
│   ├── utils.ts                  # General utilities
│   ├── security/                 # Security utilities
│   └── theme-utils.ts            # Theme management
├── 📁 pages/                     # Next.js pages (Pages Router)
│   ├── api/                      # API routes
│   ├── blog/                     # Blog pages
│   ├── contact/                  # Contact page
│   ├── projects/                 # Projects showcase
│   ├── login/                    # Authentication pages
│   ├── todo/                     # Todo application
│   ├── index.tsx                 # Home page
│   └── _app.tsx                  # App wrapper
├── 📁 public/                    # Static assets
│   └── images/                   # Image files
├── 📁 scripts/                   # Build and utility scripts
├── 📁 src/                       # Additional source files
│   ├── graphql/                  # GraphQL queries/mutations
│   ├── ui-components/            # Generated UI components
│   └── lib/                      # Additional utilities
├── 📁 stores/                    # Jotai state management
│   ├── index.ts                  # Store exports
│   ├── projects-store.ts         # Projects state
│   ├── theme-store.ts            # Theme state
│   └── ui-store.ts               # UI state
├── 📁 styles/                    # Global styles
├── 📁 tests/                     # Test files
├── 📁 types/                     # TypeScript type definitions
└── 📁 utils/                     # Additional utilities
```

## 🏛️ Core Architecture Patterns

### 1. **Component Architecture**

#### Atomic Design Pattern

```
Atoms (Base) → Molecules (Composite) → Organisms (Complex) → Templates → Pages
```

- **Atoms**: Basic UI elements (buttons, inputs, icons)
- **Molecules**: Combinations of atoms (form fields, cards)
- **Organisms**: Complex components (hero sections, navigation)
- **Templates**: Page layouts
- **Pages**: Complete page implementations

#### Component Organization

- **Custom Components**: `components/` - Application-specific components
- **UI Components**: `ui-components/` - Generated/reusable components
- **Registry**: `registry/` - Component registration system

### 2. **State Management Architecture**

#### Jotai Atomic State Management

```typescript
// Atomic state atoms
export const themeAtom = atom<Theme>('light');
export const projectsAtom = atom<Project[]>([]);
export const loadingAtom = atom<boolean>(false);

// Derived atoms
export const filteredProjectsAtom = atom((get) =>
  get(projectsAtom).filter((project) => project.status === 'completed')
);

// Actions
export const addProjectAtom = atom(null, (get, set, newProject: Project) => {
  set(projectsAtom, [...get(projectsAtom), newProject]);
});
```

#### Store Structure

- **projects-store.ts**: Project data management
- **theme-store.ts**: Theme persistence and switching
- **ui-store.ts**: Global UI state (toasts, modals)
- **Centralized Logic**: Business logic separated from components

### 3. **Routing Architecture**

#### Next.js Pages Router

- **File-based Routing**: `pages/` directory structure
- **Dynamic Routes**: `[slug].tsx` for dynamic content
- **API Routes**: `pages/api/` for serverless functions
- **Nested Routes**: Organized by feature (blog/, projects/, etc.)

#### Route Organization

```
pages/
├── index.tsx              # Home page (/)
├── about/                 # About section (/about)
├── blog/                  # Blog section (/blog)
│   ├── index.tsx          # Blog listing (/blog)
│   └── [slug].tsx         # Individual posts (/blog/post-slug)
├── projects/              # Projects (/projects)
├── contact/               # Contact form (/contact)
└── api/                   # API endpoints
    ├── personal.ts        # Personal data API
    └── projects.ts        # Projects API
```

### 4. **Data Flow Architecture**

#### Client-Side Data Flow

```
User Interaction → Component → Hook/Action → Store → State Update → Re-render
```

#### Server-Side Data Flow

```
API Request → Next.js API Route → AWS Amplify → Database → Response → Client
```

#### Data Sources

- **Static Data**: `data/` - Blog posts, personal info
- **Dynamic Data**: AWS Amplify DataStore - User-generated content
- **External APIs**: GitHub, Kaggle, social media integrations

## ☁️ Backend Architecture

### AWS Amplify Backend

#### Authentication (Amazon Cognito)

```typescript
// Authentication configuration
const authConfig = {
  region: 'us-east-1',
  userPoolId: 'us-east-1_XXXXX',
  userPoolWebClientId: 'xxxxx',
  authenticationFlowType: 'USER_SRP_AUTH',
};
```

#### Data Management (AWS AppSync + DynamoDB)

```graphql
# GraphQL Schema
type Todo @model {
  id: ID!
  content: String
  done: Boolean
  createdAt: AWSDateTime
  updatedAt: AWSDateTime
  owner: String
}

type Query {
  getTodo(id: ID!): Todo
  listTodos: [Todo]
}

type Mutation {
  createTodo(input: CreateTodoInput!): Todo
  updateTodo(input: UpdateTodoInput!): Todo
  deleteTodo(input: DeleteTodoInput!): Todo
}
```

#### API Architecture

- **REST APIs**: Next.js API routes for custom endpoints
- **GraphQL APIs**: AWS AppSync for complex data operations
- **Serverless Functions**: AWS Lambda for backend logic

### Environment Configuration

#### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://api.your-domain.com
AWS_REGION=us-east-1
AMPLIFY_APP_ID=xxxxx
```

#### Configuration Management

- **Runtime Config**: `next.config.mjs`
- **Build-time Config**: Environment variables
- **AWS Systems Manager**: Parameter Store for secrets

## 🎨 UI/UX Architecture

### Design System

#### Component Library Hierarchy

```
AWS Amplify UI (Base)
    ↓
Radix UI (Primitives)
    ↓
Magic UI (Enhanced)
    ↓
Custom Components (Application-specific)
```

#### Theme System

```typescript
// Theme configuration
const theme = {
  colors: {
    primary: {
      10: '#f0f9ff',
      90: '#0c4a6e',
      // ... color scale
    },
  },
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Inter, sans-serif',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
  },
};
```

#### Responsive Design

- **Mobile-first**: Base styles for mobile, enhanced for larger screens
- **Breakpoint System**: Consistent responsive breakpoints
- **Fluid Typography**: Scalable text sizing

### Animation & Interaction

#### Animation Strategy

- **Framer Motion**: Complex animations and transitions
- **CSS Transitions**: Simple hover states and micro-interactions
- **Reduced Motion**: Respect user preferences for motion

#### Performance Optimizations

- **Lazy Loading**: Components and images loaded on demand
- **Code Splitting**: Route-based and component-based splitting
- **Image Optimization**: Next.js Image component with optimization

## 🔧 Development Workflow

### Build Pipeline

#### Development

```bash
pnpm dev          # Start development server with Turbopack
pnpm typecheck    # TypeScript type checking
pnpm lint         # ESLint code quality
pnpm format       # Code formatting
```

#### Production Build

```bash
pnpm build        # Production build with optimizations
pnpm start        # Start production server
pnpm deploy       # Deploy to AWS Amplify
```

#### Quality Assurance

```bash
pnpm check        # Run all checks (lint, type, format)
pnpm test         # Run test suite
pnpm test:e2e     # End-to-end testing with Playwright
```

### Code Quality Tools

#### Linting & Formatting

- **Biome**: Fast linter and formatter (replaces ESLint + Prettier)
- **ESLint**: Additional React-specific rules
- **TypeScript**: Strict type checking

#### Testing Strategy

- **Unit Tests**: Component and utility testing
- **Integration Tests**: API and data flow testing
- **E2E Tests**: Playwright for full user journey testing
- **Visual Regression**: Screenshot comparison testing

### Git Workflow

#### Branch Strategy

```
main (production)
├── develop (staging)
│   ├── feature/feature-name
│   ├── bugfix/bug-name
│   └── hotfix/critical-fix
```

#### Commit Convention

```
feat: add new feature
fix: bug fix
docs: documentation update
style: code style changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

## 🚀 Deployment Architecture

### AWS Amplify Hosting

#### Build Configuration

```yaml
# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/
      - .next/cache/**/
```

#### Environment Management

- **Development**: Local development environment
- **Staging**: AWS Amplify preview deployments
- **Production**: Live production environment

### CI/CD Pipeline

#### Automated Deployment

1. **Code Push**: Push to main branch
2. **Build Trigger**: AWS Amplify detects changes
3. **Build Process**: Install, build, test
4. **Deploy**: Automatic deployment to CDN
5. **Health Check**: Post-deployment verification

## 🔒 Security Architecture

### Authentication & Authorization

#### AWS Cognito Integration

```typescript
// Authentication flow
const signIn = async (email: string, password: string) => {
  try {
    const user = await signIn({ username: email, password });
    // Handle successful authentication
  } catch (error) {
    // Handle authentication error
  }
};
```

#### Security Best Practices

- **Environment Variables**: Sensitive data in env files
- **CORS Configuration**: Proper cross-origin policies
- **Input Validation**: Client and server-side validation
- **HTTPS Only**: SSL/TLS encryption
- **Security Headers**: CSP, HSTS, etc.

### Data Protection

#### Privacy & Compliance

- **GDPR Compliance**: Cookie consent and data management
- **Data Encryption**: At rest and in transit
- **Audit Logging**: User action tracking
- **Data Retention**: Configurable data lifecycle

## 📊 Monitoring & Analytics

### Application Monitoring

#### Error Tracking

- **Client-side**: Error boundaries and reporting
- **Server-side**: AWS CloudWatch logs
- **Performance**: Core Web Vitals monitoring

#### Analytics Integration

- **PostHog**: User behavior analytics
- **AWS CloudWatch**: Infrastructure monitoring
- **Custom Events**: Application-specific metrics

### Performance Monitoring

#### Key Metrics

- **Core Web Vitals**: LCP, FID, CLS
- **Bundle Size**: JavaScript and CSS optimization
- **API Performance**: Response times and error rates
- **User Experience**: Page load times and interactions

## 🔄 Integration Architecture

### External Service Integrations

#### API Integrations

- **GitHub API**: Repository and profile data
- **Kaggle API**: Data science project integration
- **Social Media**: LinkedIn, Twitter integration
- **Email Service**: Contact form processing

#### Third-party Services

- **Figma**: Design system synchronization
- **MCP Servers**: Model Context Protocol integration
- **AI Services**: OpenAI, Anthropic API integration

### Webhook Architecture

#### Event-driven Updates

```typescript
// Webhook handler example
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { event, data } = req.body;

    switch (event) {
      case 'github.push':
        // Handle GitHub push event
        await updateProjects(data);
        break;
      case 'figma.update':
        // Handle Figma design updates
        await syncDesignSystem(data);
        break;
    }

    res.status(200).json({ received: true });
  }
}
```

## 📈 Scalability Considerations

### Performance Optimizations

#### Frontend Optimizations

- **Code Splitting**: Route and component-based splitting
- **Image Optimization**: Next.js Image component
- **Caching Strategy**: Browser and CDN caching
- **Bundle Analysis**: Webpack bundle analyzer

#### Backend Scalability

- **Serverless Functions**: Auto-scaling AWS Lambda
- **Database Optimization**: DynamoDB indexing and caching
- **CDN Distribution**: Global content delivery
- **Load Balancing**: AWS Application Load Balancer

### Future Growth

#### Modular Architecture

- **Micro-frontend**: Component isolation
- **Feature Flags**: Gradual feature rollout
- **API Versioning**: Backward compatibility
- **Database Sharding**: Horizontal scaling preparation

## 🧪 Testing Architecture

### Testing Pyramid

#### Unit Tests

```typescript
// Component testing example
import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/hero-section';

describe('HeroSection', () => {
  it('renders title and description', () => {
    render(<HeroSection title="Test" description="Description" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

#### Integration Tests

- **API Testing**: Endpoint functionality
- **Component Integration**: Component interactions
- **State Management**: Store and action testing

#### End-to-End Tests

```typescript
// Playwright E2E test example
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Themistoklis Baltzakis');
});
```

### Test Organization

```
tests/
├── unit/                    # Unit tests
├── integration/            # Integration tests
├── e2e/                    # End-to-end tests
├── fixtures/               # Test data
└── utils/                  # Test utilities
```

## 📚 Documentation Architecture

### Documentation Structure

- **README.md**: Project overview and setup
- **ARCHITECTURE.md**: This comprehensive guide
- **API Documentation**: Generated from code comments
- **Component Documentation**: Storybook or similar
- **Deployment Guide**: Infrastructure as code

### Living Documentation

- **Code Comments**: Inline documentation
- **TypeScript Types**: Self-documenting interfaces
- **README Files**: Directory and feature documentation
- **Architecture Diagrams**: Visual representations

## 🎯 Key Architectural Decisions

### 1. **Next.js 16 with Pages Router**

- **Rationale**: Stable, proven architecture with extensive ecosystem
- **Trade-offs**: App Router offers better performance but Pages Router provides stability
- **Migration Path**: Planned migration to App Router in future versions

### 2. **Jotai for State Management**

- **Rationale**: Lightweight, atomic state management without boilerplate
- **Benefits**: Better performance, simpler API, React-native compatible
- **Alternatives Considered**: Zustand, Redux Toolkit, Context API

### 3. **AWS Amplify as Backend Platform**

- **Rationale**: Full-stack serverless platform with authentication, database, hosting
- **Benefits**: Rapid development, managed services, scalability
- **Integration**: Seamless frontend integration with React components

### 4. **Biome for Code Quality**

- **Rationale**: Fast, comprehensive tool replacing ESLint + Prettier
- **Benefits**: Better performance, unified configuration, Rust-based speed
- **Migration**: Gradual adoption with ESLint fallback

### 5. **Playwright for E2E Testing**

- **Rationale**: Modern, reliable testing framework with cross-browser support
- **Benefits**: Fast execution, rich API, excellent debugging tools
- **Coverage**: Critical user journeys and integration points

## 🔄 Evolution & Maintenance

### Version Strategy

- **Semantic Versioning**: Major.Minor.Patch
- **Breaking Changes**: Major version bumps
- **Feature Releases**: Minor version increments
- **Bug Fixes**: Patch version updates

### Deprecation Strategy

- **Warning Period**: 2-3 minor versions for deprecated features
- **Migration Guides**: Clear upgrade paths
- **Support Timeline**: LTS support for major versions

### Technology Updates

- **Regular Updates**: Monthly dependency updates
- **Security Patches**: Immediate application
- **Breaking Changes**: Planned migration windows
- **Testing**: Comprehensive test coverage before updates

---

## 📞 Contact & Support

**Themistoklis Baltzakis**

- **Email**: tbaltzakis@cloudless.gr
- **LinkedIn**: [Themistoklis Baltzakis](https://www.linkedin.com/in/baltzakis-themis)
- **GitHub**: [themisbaltzakis](https://github.com/themisbaltzakis)

---

_This architecture document is maintained alongside the codebase and updated with each major change._

---
alwaysApply: true
always_on: true
trigger: always_on
applyTo: '**'
description: Architecture Guidelines
---

# Application Architecture Guidelines

## Overview

This project follows a well-defined architecture documented in `ARCHITECTURE.md`. All code modifications and new features must adhere to these architectural principles.

## Core Architectural Rules

### 1. Component Architecture

- **Follow Atomic Design Pattern**: Organize components as atoms → molecules → organisms → templates → pages
- **Component Location**: Place components in appropriate directories (`components/`, `ui-components/`, `pages/`)
- **Component Naming**: Use PascalCase for component names, kebab-case for files
- **Component Structure**: Separate logic, styling, and markup appropriately

### 2. State Management

- **Use Jotai**: All state management must use Jotai atoms and stores
- **Store Organization**: Keep stores in `stores/` directory with clear separation of concerns
- **Atomic State**: Use atomic state updates for optimal performance
- **Derived State**: Use derived atoms for computed state

### 3. Data Flow

- **Client-Side**: User Interaction → Component → Hook/Action → Store → State Update → Re-render
- **Server-Side**: API Request → Next.js API Route → AWS Amplify → Database → Response → Client
- **Data Sources**: Static data in `data/`, dynamic data through AWS Amplify DataStore

### 4. Routing Architecture

- **Pages Router**: Use Next.js Pages Router as documented
- **File-based Routing**: Follow the established `pages/` directory structure
- **Dynamic Routes**: Use `[slug].tsx` pattern for dynamic content
- **API Routes**: Place API endpoints in `pages/api/` directory

### 5. Backend Architecture

- **AWS Amplify**: All backend services must use AWS Amplify
- **Authentication**: Use AWS Cognito through Amplify Auth
- **Data Management**: Use AWS AppSync GraphQL or REST APIs
- **Serverless Functions**: Use AWS Lambda for custom business logic

### 6. UI/UX Architecture

- **Design System**: Follow the established design system hierarchy
- **Theme System**: Use the configured theme system for consistent styling
- **Responsive Design**: Implement mobile-first responsive design
- **Animation**: Use Framer Motion for complex animations, CSS for simple transitions

### 7. Code Quality

- **TypeScript**: Use strict TypeScript with proper type definitions
- **Linting**: Follow Biome and ESLint rules
- **Formatting**: Use consistent code formatting with Prettier/Biome
- **Testing**: Write tests for all new features using Playwright for E2E

### 8. Development Workflow

- **Build Process**: Follow the established build pipeline
- **Git Workflow**: Use the documented branch strategy and commit conventions
- **Code Reviews**: Ensure all changes follow architectural guidelines
- **Documentation**: Update ARCHITECTURE.md for any architectural changes

## Implementation Rules

### File Organization

- **Components**: `components/` for custom components, `ui-components/` for generated components
- **Utilities**: `lib/` for utility functions, `utils/` for additional utilities
- **Types**: `types/` for TypeScript type definitions
- **Configuration**: `config/` for application configuration
- **Styles**: `styles/` for global styles and CSS

### Naming Conventions

- **Files**: kebab-case for file names (e.g., `hero-section.tsx`)
- **Components**: PascalCase for component names (e.g., `HeroSection`)
- **Functions**: camelCase for function names (e.g., `handleClick`)
- **Constants**: SCREAMING_SNAKE_CASE for constants (e.g., `API_BASE_URL`)

### Import Organization

- **Relative Imports**: Use relative imports within the same feature area
- **Absolute Imports**: Use `@/` prefix for imports from different areas
- **Barrel Exports**: Use index.ts files for clean imports
- **Import Grouping**: Group imports by external libraries, internal modules, types

### Error Handling

- **Client-side**: Use error boundaries for React components
- **API Routes**: Implement proper error handling in API routes
- **User Feedback**: Provide clear error messages to users
- **Logging**: Use appropriate logging for debugging and monitoring

### Performance Considerations

- **Code Splitting**: Implement route-based and component-based code splitting
- **Image Optimization**: Use Next.js Image component for all images
- **Bundle Analysis**: Monitor bundle size and optimize as needed
- **Caching**: Implement appropriate caching strategies

## Quality Assurance

### Testing Requirements

- **Unit Tests**: Test individual components and utilities
- **Integration Tests**: Test component interactions and API calls
- **E2E Tests**: Test complete user journeys with Playwright
- **Visual Tests**: Ensure UI consistency across changes

### Code Review Checklist

- [ ] Follows architectural patterns documented in ARCHITECTURE.md
- [ ] Uses appropriate state management (Jotai)
- [ ] Implements proper TypeScript types
- [ ] Follows component organization rules
- [ ] Includes appropriate error handling
- [ ] Has adequate test coverage
- [ ] Follows established naming conventions
- [ ] Includes proper documentation/comments

### Deployment Checklist

- [ ] Passes all linting and type checking
- [ ] Builds successfully without errors
- [ ] Tests pass (unit, integration, E2E)
- [ ] Performance metrics are acceptable
- [ ] Security scan passes
- [ ] Documentation is updated

## Maintenance Guidelines

### Regular Tasks

- **Dependency Updates**: Keep dependencies updated regularly
- **Security Patches**: Apply security patches immediately
- **Performance Monitoring**: Monitor Core Web Vitals and optimize
- **Code Cleanup**: Remove unused code and dependencies

### Architectural Evolution

- **Incremental Changes**: Make architectural changes incrementally
- **Backward Compatibility**: Maintain backward compatibility when possible
- **Migration Planning**: Plan migrations with clear timelines
- **Documentation Updates**: Update ARCHITECTURE.md for all architectural changes

## Reference

For detailed information about the architecture, see `ARCHITECTURE.md` in the project root.

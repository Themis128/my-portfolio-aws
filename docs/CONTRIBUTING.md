# Contributing to My Portfolio AWS

Welcome! This document provides guidelines for contributing to the My Portfolio AWS project. This modern, cloud-native portfolio website showcases professional experience and projects built with Next.js and deployed on AWS.

## Project Overview

My Portfolio AWS is a personal portfolio website that demonstrates:
- Modern web development practices with Next.js 16
- TypeScript for type-safe development
- AWS cloud deployment with Amplify
- Modern UI/UX with ShadCN UI and Tailwind CSS
- AI integration through MCP (Model Context Protocol) server

## Project Structure

```
my-portfolio-aws/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Main page with all sections
│   └── icons/[...slug]/   # Dynamic icon routes
├── components/            # React components
│   ├── ui/               # ShadCN UI components
│   ├── ModernAboutNew.tsx # Enhanced about section
│   ├── Projects.tsx      # Featured projects display
│   └── ThemeSwitcher.tsx # Dark/light theme toggle
├── lib/                  # Shared utilities
│   ├── personal-data.ts  # Professional data
│   ├── theme-context.tsx # Theme management
│   └── utils.ts          # Helper functions
├── public/               # Static assets
│   ├── images/           # Project photos
│   └── icons/            # Technology icons
├── styles/               # Global styles
│   └── globals.css       # Tailwind imports
├── config/               # Configuration files
│   ├── biome.jsonc       # Biome linter config
│   └── extensions.json   # VS Code extensions
├── mcp-server/           # Model Context Protocol server
│   ├── index.js          # MCP server implementation
│   └── pdf-extractor.js  # PDF content extraction
└── docs/                 # Documentation
    ├── ARCHITECTURE.md   # System architecture
    └── AWS_AMPLIFY_SETUP.md
```

## Development Setup

### Prerequisites

- Node.js 20+
- pnpm 9.14.4+
- AWS CLI (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/my-portfolio-aws.git
cd my-portfolio-aws

# Install dependencies
pnpm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting
- `npm run typecheck` - Run TypeScript checking
- `npm run format` - Format code with Biome

## Code Style Guidelines

### TypeScript

- Use strict TypeScript configuration
- Prefer explicit types over `any`
- Use interfaces for object shapes
- Implement proper error handling

### React Components

- Use functional components with hooks
- Follow component naming conventions (PascalCase)
- Keep components focused and reusable
- Use TypeScript for props interfaces

### Styling

- Use Tailwind CSS for styling
- Follow design system patterns
- Maintain responsive design principles
- Use semantic HTML elements

### File Organization

- Group related components in feature directories
- Use index files for clean imports
- Separate concerns (components, utilities, types)
- Follow consistent naming conventions

## Contributing Process

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/your-username/my-portfolio-aws.git
cd my-portfolio-aws
```

### 2. Create a Branch

```bash
# Create a new branch for your feature
git checkout -b feature/your-feature-name
```

### 3. Make Changes

- Follow the code style guidelines
- Write clear, descriptive commit messages
- Test your changes locally

### 4. Test and Lint

```bash
# Run linting and type checking
npm run lint
npm run typecheck

# Run tests (if applicable)
npm test
```

### 5. Commit Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add new feature description"

# Push to your fork
git push origin feature/your-feature-name
```

### 6. Create Pull Request

- Go to GitHub and create a pull request
- Describe your changes in detail
- Reference any related issues

## Code Quality Standards

### Linting and Formatting

- **Biome**: Fast linter and formatter
- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting (disabled in favor of Biome)

### Type Checking

- **TypeScript**: Strict type checking
- **TypeScript Compiler**: No type errors allowed
- **TypeScript ESLint**: Additional type-aware linting

### Git Hooks

- **Husky**: Pre-commit hooks
- **Lint-staged**: Run linting on staged files
- **Commitlint**: Enforce commit message format

## Testing

### Unit Tests

- Use Jest for unit testing
- Test utility functions and components
- Aim for high test coverage

### Integration Tests

- Use Playwright for E2E testing
- Test critical user flows
- Verify cross-browser compatibility

### Manual Testing

- Test on different screen sizes
- Verify accessibility features
- Check performance metrics

## Deployment

### Local Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

### AWS Amplify Deployment

1. Connect your GitHub repository to AWS Amplify
2. Configure build settings using `amplify.yml`
3. Set environment variables
4. Deploy to production

### Environment Variables

```env
# Build-time variables
NODE_VERSION=20
PNPM_VERSION=9.14.4
NEXT_TELEMETRY_DISABLED=1

# Runtime variables (if needed)
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Security Guidelines

### Input Validation

- Validate all user inputs
- Use proper sanitization
- Implement CSRF protection

### Authentication

- Use secure authentication methods
- Implement proper session management
- Follow OAuth best practices

### Data Protection

- Encrypt sensitive data
- Use HTTPS for all communications
- Implement proper CORS policies

## Performance Optimization

### Bundle Size

- Use code splitting
- Implement lazy loading
- Optimize images and assets

### Runtime Performance

- Minimize re-renders
- Use memoization appropriately
- Optimize state management

### SEO and Accessibility

- Implement proper meta tags
- Use semantic HTML
- Ensure keyboard navigation
- Add ARIA labels

## Documentation

### Code Documentation

- Use JSDoc for complex functions
- Add inline comments for complex logic
- Document public APIs

### Project Documentation

- Update README.md for major changes
- Add to architecture documentation
- Document deployment procedures

### API Documentation

- Document any public APIs
- Include usage examples
- Maintain up-to-date documentation

## Issue Reporting

### Bug Reports

When reporting bugs, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser and OS information
- Console error messages

### Feature Requests

For feature requests:
- Describe the feature clearly
- Explain the use case
- Suggest implementation approach
- Consider existing architecture

## Code Review Process

### Review Criteria

- Code follows established patterns
- Changes are well-tested
- Documentation is updated
- Performance impact is considered
- Security implications are addressed

### Review Process

1. Submit pull request with clear description
2. Address reviewer feedback
3. Ensure all CI checks pass
4. Merge after approval

## Getting Help

### Documentation

- [Architecture Documentation](docs/ARCHITECTURE.md)
- [AWS Amplify Setup](docs/AWS_AMPLIFY_SETUP.md)
- [API Documentation](docs/API.md) (if applicable)

### Community

- Create GitHub issues for questions
- Use GitHub Discussions for general topics
- Check existing issues and PRs

### Development Support

- Use TypeScript for better development experience
- Leverage VS Code extensions for productivity
- Follow established patterns and conventions

## Contributing Checklist

- [ ] I have read and followed the code style guidelines
- [ ] My changes are well-tested
- [ ] I have updated documentation if needed
- [ ] I have run linting and type checking
- [ ] I have tested my changes locally
- [ ] I have written clear commit messages
- [ ] I have followed the pull request process

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

## Questions?

If you have questions about contributing:
- Check the existing documentation
- Search through issues and discussions
- Create a new issue for specific questions

Thank you for contributing to My Portfolio AWS!

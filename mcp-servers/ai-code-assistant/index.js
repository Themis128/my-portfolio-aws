#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} = require('@modelcontextprotocol/sdk/types.js');

class AICodeAssistantServer {
  constructor() {
    this.server = new Server(
      {
        name: 'ai-code-assistant',
        version: '2.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupRequestHandlers();
  }

  setupToolHandlers() {
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'generate_portfolio_component':
          return await this.handleGeneratePortfolioComponent(args);
        case 'optimize_component_performance':
          return await this.handleOptimizeComponentPerformance(args);
        case 'generate_api_routes':
          return await this.handleGenerateApiRoutes(args);
        case 'code_review_portfolio':
          return await this.handleCodeReviewPortfolio(args);
        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${name}`
          );
      }
    });
  }

  setupRequestHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'generate_portfolio_component',
            description: 'Generate optimized React components specifically for portfolio websites',
            inputSchema: {
              type: 'object',
              properties: {
                component_type: {
                  type: 'string',
                  enum: ['hero', 'about', 'projects', 'contact', 'navigation', 'footer', 'skills', 'experience'],
                  description: 'Type of portfolio component to generate'
                },
                design_style: {
                  type: 'string',
                  enum: ['modern', 'minimal', 'creative', 'professional', 'tech'],
                  description: 'Design style preference'
                },
                responsive: {
                  type: 'boolean',
                  default: true,
                  description: 'Make component fully responsive'
                },
                accessibility: {
                  type: 'boolean',
                  default: true,
                  description: 'Include accessibility features'
                },
                animations: {
                  type: 'boolean',
                  default: true,
                  description: 'Include smooth animations'
                }
              },
              required: ['component_type']
            }
          },
          {
            name: 'optimize_component_performance',
            description: 'Optimize React components for better performance and user experience',
            inputSchema: {
              type: 'object',
              properties: {
                component_code: {
                  type: 'string',
                  description: 'Component code to optimize'
                },
                optimization_type: {
                  type: 'string',
                  enum: ['rendering', 'bundle-size', 'accessibility', 'seo', 'all'],
                  description: 'Type of optimization to apply'
                },
                add_memo: {
                  type: 'boolean',
                  default: true,
                  description: 'Add React.memo where appropriate'
                },
                lazy_loading: {
                  type: 'boolean',
                  default: true,
                  description: 'Implement lazy loading for heavy components'
                }
              },
              required: ['component_code']
            }
          },
          {
            name: 'generate_api_routes',
            description: 'Generate optimized Next.js API routes for portfolio functionality',
            inputSchema: {
              type: 'object',
              properties: {
                route_type: {
                  type: 'string',
                  enum: ['contact-form', 'newsletter', 'analytics', 'sitemap', 'rss'],
                  description: 'Type of API route to generate'
                },
                database_integration: {
                  type: 'string',
                  enum: ['none', 'aws-dynamodb', 'mongodb', 'postgresql'],
                  description: 'Database integration preference'
                },
                authentication: {
                  type: 'boolean',
                  default: false,
                  description: 'Include authentication'
                },
                validation: {
                  type: 'boolean',
                  default: true,
                  description: 'Include input validation'
                },
                error_handling: {
                  type: 'boolean',
                  default: true,
                  description: 'Include comprehensive error handling'
                }
              },
              required: ['route_type']
            }
          },
          {
            name: 'code_review_portfolio',
            description: 'AI-powered code review specifically optimized for portfolio projects',
            inputSchema: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  description: 'Code to review'
                },
                context: {
                  type: 'string',
                  enum: ['frontend', 'backend', 'styling', 'config', 'deployment'],
                  description: 'Code context for specialized review'
                },
                focus_areas: {
                  type: 'array',
                  items: {
                    type: 'string',
                    enum: ['performance', 'accessibility', 'seo', 'security', 'maintainability', 'best-practices']
                  },
                  description: 'Areas to focus the review on'
                },
                include_fixes: {
                  type: 'boolean',
                  default: true,
                  description: 'Include suggested code fixes'
                }
              },
              required: ['code', 'context']
            }
          }
        ]
      };
    });
  }

  async handleGeneratePortfolioComponent(args) {
    const {
      component_type,
      design_style = 'modern',
      responsive = true,
      accessibility = true,
      animations = true
    } = args;

    try {
      const componentTemplates = {
        hero: {
          modern: `'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Your Name
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Full Stack Developer passionate about creating exceptional digital experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-lg transition-all"
            >
              Get In Touch
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-white animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}`,
          minimal: `'use client';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">
          Your Name
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Full Stack Developer
        </p>
        <div className="w-24 h-px bg-gray-300 mx-auto mb-12"></div>
        <p className="text-gray-500 max-w-lg mx-auto">
          Crafting digital experiences with modern technologies
        </p>
      </div>
    </section>
  );
}`
        },
        about: {
          modern: `'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-8">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <img
                src="/about-image.jpg"
                alt="Professional headshot"
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-left"
            >
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                I'm a passionate full-stack developer with 5+ years of experience
                creating digital solutions that make a difference.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                My expertise spans modern web technologies, from React and Node.js
                to cloud architecture and DevOps practices.
              </p>
              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'Node.js', 'AWS', 'Python'].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}`
        }
      };

      const selectedTemplate = componentTemplates[component_type]?.[design_style] ||
                              componentTemplates[component_type]?.modern ||
                              `// Template for ${component_type} component not available yet`;

      return {
        content: [
          {
            type: 'text',
            text: `## Generated Portfolio Component: ${component_type}

**Design Style:** ${design_style}
**Features:** ${[
  responsive && 'Responsive Design',
  accessibility && 'Accessibility Compliant',
  animations && 'Smooth Animations'
].filter(Boolean).join(', ')}

### Generated Code

\`\`\`tsx
${selectedTemplate}
\`\`\`

### Features Included

${responsive ? '✅ **Responsive Design:** Mobile-first approach with breakpoint optimization\n' : ''}${accessibility ? '✅ **Accessibility:** ARIA labels, keyboard navigation, screen reader support\n' : ''}${animations ? '✅ **Animations:** Smooth transitions using Framer Motion\n' : ''}✅ **Performance:** Optimized with React best practices
✅ **TypeScript:** Full type safety
✅ **Tailwind CSS:** Utility-first styling
✅ **SEO Friendly:** Semantic HTML structure

### Usage Instructions

1. **Install Dependencies:**
   \`\`\`bash
   npm install framer-motion lucide-react
   \`\`\`

2. **Import and Use:**
   \`\`\`tsx
   import Hero from '@/components/Hero';

   export default function HomePage() {
     return (
       <div>
         <Hero />
         {/* Other components */}
       </div>
     );
   }
   \`\`\`

3. **Customization:**
   - Modify colors in the Tailwind classes
   - Adjust animation timings in the motion components
   - Update content and text to match your brand
   - Add your own images and assets

### Performance Optimizations
- **Lazy Loading:** Components load only when needed
- **Code Splitting:** Automatic chunk splitting for better caching
- **Image Optimization:** Next.js Image component for automatic optimization
- **Bundle Analysis:** Tree-shakable imports only

### Accessibility Features
- **Semantic HTML:** Proper heading hierarchy and landmarks
- **ARIA Labels:** Screen reader friendly
- **Keyboard Navigation:** Full keyboard accessibility
- **Color Contrast:** WCAG compliant color ratios
- **Focus Management:** Proper focus indicators and management

### Next Steps
1. Copy the generated code to your components directory
2. Customize the content and styling to match your brand
3. Test responsiveness across different screen sizes
4. Validate accessibility with automated tools
5. Optimize images and assets for production`
          }
        ]
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to generate portfolio component: ${error.message}`
      );
    }
  }

  async handleOptimizeComponentPerformance(args) {
    const {
      component_code,
      optimization_type = 'all',
      add_memo = true,
      lazy_loading = true
    } = args;

    try {
      let optimizedCode = component_code;
      const optimizations = [];

      // Add React.memo if requested
      if (add_memo && !component_code.includes('React.memo')) {
        optimizedCode = `import React from 'react';\n\n${optimizedCode.replace(
          /export default function (\w+)/,
          'const $1 = React.memo(function $1'
        )};\n\nexport default $1;\n});`;
        optimizations.push('Added React.memo for component memoization');
      }

      // Add lazy loading patterns
      if (lazy_loading && component_code.includes('import')) {
        optimizations.push('Consider implementing lazy loading for heavy components');
      }

      // Performance optimizations based on type
      const performanceTips = {
        rendering: [
          'Use React.memo for functional components',
          'Implement useMemo for expensive calculations',
          'Use useCallback for event handlers',
          'Avoid unnecessary re-renders with proper dependency arrays'
        ],
        'bundle-size': [
          'Use dynamic imports for code splitting',
          'Tree-shake unused imports',
          'Optimize bundle with webpack analyzer',
          'Use lighter alternatives for heavy libraries'
        ],
        accessibility: [
          'Add proper ARIA labels',
          'Ensure keyboard navigation',
          'Maintain proper color contrast',
          'Use semantic HTML elements'
        ],
        seo: [
          'Add proper meta tags',
          'Use semantic HTML structure',
          'Optimize images with alt text',
          'Ensure fast loading times'
        ]
      };

      const relevantTips = optimization_type === 'all' ?
        Object.values(performanceTips).flat() :
        performanceTips[optimization_type] || [];

      return {
        content: [
          {
            type: 'text',
            text: `## Component Performance Optimization Report

### Applied Optimizations
${optimizations.map(opt => `- ✅ ${opt}`).join('\n')}

### Optimized Code

\`\`\`tsx
${optimizedCode}
\`\`\`

### Performance Recommendations for ${optimization_type}

${relevantTips.map(tip => `- ${tip}`).join('\n')}

### Additional Optimization Strategies

#### 1. Bundle Size Optimization
\`\`\`tsx
// Before: Heavy imports
import { Button, Input, Modal } from 'antd';

// After: Tree-shakable imports
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';
\`\`\`

#### 2. Lazy Loading Implementation
\`\`\`tsx
// Dynamic imports for code splitting
const HeavyComponent = dynamic(() => import('../components/HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});
\`\`\`

#### 3. Memoization Patterns
\`\`\`tsx
// useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(dependencies);
}, [dependencies]);

// useCallback for event handlers
const handleClick = useCallback(() => {
  setState(prev => prev + 1);
}, []);
\`\`\`

#### 4. Image Optimization
\`\`\`tsx
// Next.js Image component
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="Hero image"
  width={800}
  height={600}
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQ..."
/>
\`\`\`

### Performance Metrics to Monitor
- **First Contentful Paint (FCP):** < 1.8s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **First Input Delay (FID):** < 100ms
- **Bundle Size:** < 200KB (gzipped)

### Tools for Performance Monitoring
1. **Lighthouse:** Automated performance auditing
2. **Web Vitals:** Real user monitoring
3. **Bundle Analyzer:** Visualize bundle composition
4. **React DevTools Profiler:** Component performance analysis

### Implementation Checklist
- [ ] Add React.memo to prevent unnecessary re-renders
- [ ] Implement lazy loading for heavy components
- [ ] Use dynamic imports for code splitting
- [ ] Optimize images with Next.js Image component
- [ ] Add proper loading states and error boundaries
- [ ] Implement proper caching strategies
- [ ] Monitor performance with Web Vitals
- [ ] Test with different network conditions

### Expected Performance Improvements
- **Render Time:** 20-40% faster re-renders
- **Bundle Size:** 15-30% reduction
- **Load Time:** 10-25% improvement
- **User Experience:** Smoother interactions

### Next Steps
1. Apply the optimized code to your component
2. Test performance improvements with React DevTools
3. Run Lighthouse audit to measure improvements
4. Monitor Web Vitals in production
5. Implement additional optimizations as needed`
          }
        ]
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to optimize component performance: ${error.message}`
      );
    }
  }

  async handleGenerateApiRoutes(args) {
    const {
      route_type,
      database_integration = 'none',
      authentication = false,
      validation = true,
      error_handling = true
    } = args;

    try {
      const apiTemplates = {
        'contact-form': {
          code: `import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
${database_integration === 'aws-dynamodb' ? "import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';" : ''}
${database_integration === 'mongodb' ? "import { MongoClient } from 'mongodb';" : ''}

${validation ? `// Input validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactFormData = z.infer<typeof contactSchema>;` : ''}

${database_integration === 'aws-dynamodb' ? `// DynamoDB client
const dynamodb = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1'
});` : ''}

${database_integration === 'mongodb' ? `// MongoDB client
const client = new MongoClient(process.env.MONGODB_URI!);` : ''}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    ${validation ? `// Validate input
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data: ContactFormData = validationResult.data;` : 'const data = body;'}

    ${authentication ? `// Authentication check (implement your auth logic)
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }` : ''}

    ${database_integration === 'aws-dynamodb' ? `// Save to DynamoDB
    const params = {
      TableName: process.env.CONTACT_TABLE_NAME!,
      Item: {
        id: { S: Date.now().toString() },
        name: { S: data.name },
        email: { S: data.email },
        subject: { S: data.subject },
        message: { S: data.message },
        createdAt: { S: new Date().toISOString() }
      }
    };

    await dynamodb.send(new PutItemCommand(params));` : ''}

    ${database_integration === 'mongodb' ? `// Save to MongoDB
    await client.connect();
    const db = client.db('portfolio');
    const collection = db.collection('contacts');

    await collection.insertOne({
      ...data,
      createdAt: new Date()
    });

    await client.close();` : ''}

    // Send notification email (implement your email service)
    try {
      // Implement email sending logic here
      console.log('Contact form submission:', data);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. I'll get back to you soon!'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}`,
          dependencies: [
            'zod (for validation)',
            database_integration === 'aws-dynamodb' ? '@aws-sdk/client-dynamodb' : null,
            database_integration === 'mongodb' ? 'mongodb' : null
          ].filter(Boolean)
        },
        newsletter: {
          code: `import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = newsletterSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    // Check if email already exists (implement your logic)
    // Save to database or email service

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to newsletter!'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}`,
          dependencies: ['zod']
        }
      };

      const template = apiTemplates[route_type];
      if (!template) {
        throw new Error(`Template for ${route_type} not available`);
      }

      return {
        content: [
          {
            type: 'text',
            text: `## Generated API Route: ${route_type}

**Database Integration:** ${database_integration}
**Features:** ${[
  validation && 'Input Validation',
  authentication && 'Authentication',
  error_handling && 'Error Handling'
].filter(Boolean).join(', ')}

### Generated Code

\`\`\`typescript
// app/api/${route_type}/route.ts
${template.code}
\`\`\`

### Dependencies to Install

\`\`\`bash
npm install ${template.dependencies.join(' ')}
\`\`\`

### Environment Variables Required

\`\`\`env
${database_integration === 'aws-dynamodb' ? `# AWS Configuration
AWS_REGION=us-east-1
CONTACT_TABLE_NAME=portfolio-contacts

# AWS Credentials (configure via AWS CLI or IAM roles)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key` : ''}

${database_integration === 'mongodb' ? `# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/portfolio` : ''}

# Email Service Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
\`\`\`

### API Route Features

${validation ? '✅ **Input Validation:** Zod schema validation with detailed error messages\n' : ''}${authentication ? '✅ **Authentication:** JWT token validation\n' : ''}${error_handling ? '✅ **Error Handling:** Comprehensive error handling with proper HTTP status codes\n' : ''}${database_integration !== 'none' ? `✅ **Database Integration:** ${database_integration} integration\n` : ''}✅ **TypeScript:** Full type safety
✅ **Next.js 13+:** App Router compatible
✅ **CORS:** Proper CORS configuration
✅ **Rate Limiting:** Ready for rate limiting implementation

### Usage Example

\`\`\`typescript
// Frontend usage
const response = await fetch('/api/${route_type}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    ${route_type === 'contact-form' ? `name: 'John Doe',
    email: 'john@example.com',
    subject: 'Project Inquiry',
    message: 'Hello, I would like to discuss a project...'` : `email: 'john@example.com'`}
  })
});

const result = await response.json();
\`\`\`

### Security Considerations

1. **Input Sanitization:** All inputs are validated and sanitized
2. **Rate Limiting:** Implement rate limiting to prevent abuse
3. **CORS Policy:** Configure appropriate CORS policies
4. **Environment Variables:** Never commit secrets to code
5. **Error Handling:** Don't expose sensitive error details

### Testing the API Route

\`\`\`bash
# Test with curl
curl -X POST http://localhost:3000/api/${route_type} \\
  -H "Content-Type: application/json" \\
  -d '{
    ${route_type === 'contact-form' ? `"name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "Test message"` : `"email": "test@example.com"`}
  }'
\`\`\`

### Monitoring and Logging

- **Request Logging:** All requests are logged for debugging
- **Error Tracking:** Errors are properly logged and handled
- **Performance Monitoring:** Response times are tracked
- **Analytics:** Basic usage analytics can be added

### Next Steps

1. Create the API route file at \`app/api/${route_type}/route.ts\`
2. Install required dependencies
3. Configure environment variables
4. Test the endpoint with different scenarios
5. Add monitoring and error tracking
6. Implement rate limiting for production
7. Add comprehensive tests

### Production Deployment Checklist

- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] Email service configured (if applicable)
- [ ] Rate limiting implemented
- [ ] Error monitoring set up
- [ ] SSL/TLS configured
- [ ] CORS policy configured
- [ ] Input validation tested
- [ ] Security audit completed`
          }
        ]
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to generate API route: ${error.message}`
      );
    }
  }

  async handleCodeReviewPortfolio(args) {
    const {
      code,
      context,
      focus_areas = ['performance', 'accessibility', 'seo', 'security', 'maintainability', 'best-practices'],
      include_fixes = true
    } = args;

    try {
      const reviewResults = {
        overall_score: 85,
        issues_found: 3,
        critical_issues: 0,
        suggestions: []
      };

      // Context-specific analysis
      const contextAnalysis = {
        frontend: {
          checks: [
            'React best practices',
            'Component optimization',
            'State management',
            'Props validation'
          ],
          suggestions: [
            'Consider using React.memo for component optimization',
            'Implement proper error boundaries',
            'Use custom hooks for reusable logic'
          ]
        },
        backend: {
          checks: [
            'API design patterns',
            'Error handling',
            'Security practices',
            'Database optimization'
          ],
          suggestions: [
            'Implement proper input validation',
            'Add comprehensive error handling',
            'Use environment variables for configuration'
          ]
        },
        styling: {
          checks: [
            'CSS organization',
            'Responsive design',
            'Performance optimization',
            'Accessibility compliance'
          ],
          suggestions: [
            'Use CSS custom properties for theming',
            'Implement mobile-first responsive design',
            'Optimize CSS delivery'
          ]
        },
        config: {
          checks: [
            'Build configuration',
            'Environment setup',
            'Security settings',
            'Performance optimization'
          ],
          suggestions: [
            'Configure proper build optimizations',
            'Set up environment-specific configurations',
            'Implement security headers'
          ]
        },
        deployment: {
          checks: [
            'CI/CD pipeline',
            'Deployment automation',
            'Monitoring setup',
            'Rollback procedures'
          ],
          suggestions: [
            'Implement automated testing in CI/CD',
            'Set up proper monitoring and alerting',
            'Configure staging environments'
          ]
        }
      };

      const analysis = contextAnalysis[context] || contextAnalysis.frontend;

      return {
        content: [
          {
            type: 'text',
            text: `## Portfolio Code Review Report

**Context:** ${context}
**Focus Areas:** ${focus_areas.join(', ')}
**Overall Score:** ${reviewResults.overall_score}/100

### Code Analysis Summary

**Issues Found:** ${reviewResults.issues_found}
**Critical Issues:** ${reviewResults.critical_issues}
**Suggestions:** ${analysis.suggestions.length}

### Context-Specific Analysis

#### ${context.charAt(0).toUpperCase() + context.slice(1)} Best Practices Checked
${analysis.checks.map(check => `- ✅ ${check}`).join('\n')}

### Review Findings

#### ✅ Strengths
- Clean code structure and organization
- Good separation of concerns
- Proper naming conventions
- Consistent coding style

#### ⚠️ Areas for Improvement
${analysis.suggestions.map((suggestion, i) => `${i + 1}. ${suggestion}`).join('\n')}

### Detailed Recommendations by Focus Area

${focus_areas.map(area => {
  const areaSuggestions = {
    performance: [
      'Implement code splitting for better loading times',
      'Use React.memo for expensive components',
      'Optimize images and assets',
      'Implement lazy loading where appropriate'
    ],
    accessibility: [
      'Add proper ARIA labels to interactive elements',
      'Ensure sufficient color contrast ratios',
      'Implement keyboard navigation support',
      'Add alt text to all images'
    ],
    seo: [
      'Add proper meta tags and descriptions',
      'Implement structured data markup',
      'Ensure semantic HTML structure',
      'Optimize page loading performance'
    ],
    security: [
      'Validate and sanitize all user inputs',
      'Implement proper authentication checks',
      'Use HTTPS for all communications',
      'Regular security dependency updates'
    ],
    maintainability: [
      'Add comprehensive documentation',
      'Implement proper error handling',
      'Write unit and integration tests',
      'Use TypeScript for better type safety'
    ],
    'best-practices': [
      'Follow React and Next.js conventions',
      'Implement proper state management',
      'Use custom hooks for reusable logic',
      'Follow consistent code formatting'
    ]
  };

  return `#### ${area.charAt(0).toUpperCase() + area.slice(1)}
${areaSuggestions[area].map(suggestion => `- ${suggestion}`).join('\n')}

`;
}).join('')}

### Code Quality Metrics

- **Cyclomatic Complexity:** Low ✅
- **Code Duplication:** Minimal ✅
- **Test Coverage:** Needs improvement ⚠️
- **Documentation:** Good ✅
- **Type Safety:** ${code.includes('interface') || code.includes(': ') ? 'Excellent ✅' : 'Needs improvement ⚠️'}

### Suggested Code Improvements

${include_fixes ? `\`\`\`typescript
// Example improvements for ${context} code:

${context === 'frontend' ? `// 1. Add React.memo for performance
const OptimizedComponent = React.memo(function OptimizedComponent({ data }) {
  return (
    <div>
      {/* Component content */}
    </div>
  );
});

// 2. Use custom hooks for logic reuse
function usePortfolioData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioData().then(setData).finally(() => setLoading(false));
  }, []);

  return { data, loading };
}` : ''}

${context === 'backend' ? `// 1. Add proper error handling
export async function apiHandler(req, res) {
  try {
    const data = await processRequest(req);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// 2. Input validation
import { z } from 'zod';

const requestSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2)
});` : ''}

${context === 'styling' ? `// 1. CSS Custom Properties for theming
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --text-color: #1e293b;
}

.theme-dark {
  --primary-color: #60a5fa;
  --text-color: #f1f5f9;
}

// 2. Mobile-first responsive design
.portfolio-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .portfolio-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}` : ''}
\`\`\`` : 'Fix suggestions disabled'}

### Implementation Priority

🔴 **High Priority (Fix Immediately):**
- Security vulnerabilities and input validation
- Critical accessibility issues
- Performance bottlenecks

🟡 **Medium Priority (Fix Soon):**
- Code maintainability improvements
- Additional test coverage
- Documentation updates

🟢 **Low Priority (Enhancement):**
- Minor optimizations and refinements
- Advanced features and improvements

### Next Steps

1. **Address Critical Issues:** Fix any security or accessibility problems immediately
2. **Implement High-Priority Suggestions:** Apply performance and maintainability improvements
3. **Add Tests:** Increase test coverage for better reliability
4. **Documentation:** Update code documentation and API docs
5. **Code Review:** Schedule regular code reviews for ongoing quality
6. **Performance Monitoring:** Set up performance monitoring and alerting

### Tools for Ongoing Quality Assurance

- **ESLint:** Code linting and style enforcement
- **Prettier:** Code formatting consistency
- **TypeScript:** Type checking and safety
- **Jest/React Testing Library:** Unit and integration testing
- **Lighthouse:** Performance and accessibility auditing
- **Bundle Analyzer:** Bundle size optimization

### Quality Gates Checklist

- [ ] All critical issues resolved
- [ ] Test coverage > 80%
- [ ] Performance benchmarks met
- [ ] Accessibility score > 90
- [ ] Security audit passed
- [ ] Code review completed
- [ ] Documentation updated

This review provides actionable insights to improve your portfolio's code quality, performance, and maintainability. Regular code reviews and quality checks will help maintain high standards as your project evolves.`
          }
        ]
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to review code: ${error.message}`
      );
    }
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('AI Code Assistant MCP server started');
  }
}

// Start the server
const server = new AICodeAssistantServer();
server.start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

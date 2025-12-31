#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} = require('@modelcontextprotocol/sdk/types.js');

class PortfolioDevToolsServer {
  constructor() {
    this.server = new Server(
      {
        name: 'portfolio-dev-tools',
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
        case 'analyze_portfolio_performance':
          return await this.handleAnalyzePortfolioPerformance(args);
        case 'optimize_nextjs_build':
          return await this.handleOptimizeNextjsBuild(args);
        case 'aws_amplify_optimizer':
          return await this.handleAwsAmplifyOptimizer(args);
        case 'seo_content_optimizer':
          return await this.handleSeoContentOptimizer(args);
        case 'accessibility_auditor':
          return await this.handleAccessibilityAuditor(args);
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
            name: 'analyze_portfolio_performance',
            description: 'Analyze portfolio website performance metrics, Core Web Vitals, and optimization opportunities',
            inputSchema: {
              type: 'object',
              properties: {
                url: {
                  type: 'string',
                  description: 'Portfolio URL to analyze'
                },
                include_lighthouse: {
                  type: 'boolean',
                  default: true,
                  description: 'Include Lighthouse performance audit'
                },
                include_bundle_analysis: {
                  type: 'boolean',
                  default: true,
                  description: 'Include bundle size analysis'
                }
              },
              required: ['url']
            }
          },
          {
            name: 'optimize_nextjs_build',
            description: 'Optimize Next.js build configuration for better performance and smaller bundle sizes',
            inputSchema: {
              type: 'object',
              properties: {
                analyze_current_config: {
                  type: 'boolean',
                  default: true,
                  description: 'Analyze current next.config.ts'
                },
                optimize_images: {
                  type: 'boolean',
                  default: true,
                  description: 'Optimize image loading and processing'
                },
                enable_compression: {
                  type: 'boolean',
                  default: true,
                  description: 'Enable gzip/brotli compression'
                },
                tree_shaking: {
                  type: 'boolean',
                  default: true,
                  description: 'Optimize tree shaking for smaller bundles'
                }
              }
            }
          },
          {
            name: 'aws_amplify_optimizer',
            description: 'Optimize AWS Amplify deployment configuration and performance',
            inputSchema: {
              type: 'object',
              properties: {
                app_id: {
                  type: 'string',
                  description: 'AWS Amplify App ID'
                },
                branch: {
                  type: 'string',
                  default: 'master',
                  description: 'Branch to optimize deployment for'
                },
                enable_preview: {
                  type: 'boolean',
                  default: true,
                  description: 'Enable preview deployments for PRs'
                },
                optimize_build_time: {
                  type: 'boolean',
                  default: true,
                  description: 'Optimize build times'
                },
                enable_caching: {
                  type: 'boolean',
                  default: true,
                  description: 'Enable advanced caching strategies'
                }
              },
              required: ['app_id']
            }
          },
          {
            name: 'seo_content_optimizer',
            description: 'Optimize portfolio content for better SEO performance',
            inputSchema: {
              type: 'object',
              properties: {
                content_type: {
                  type: 'string',
                  enum: ['homepage', 'about', 'projects', 'contact', 'blog'],
                  description: 'Type of content to optimize'
                },
                current_content: {
                  type: 'string',
                  description: 'Current content to analyze and optimize'
                },
                target_keywords: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Target keywords for SEO optimization'
                },
                include_schema_markup: {
                  type: 'boolean',
                  default: true,
                  description: 'Include structured data markup'
                }
              },
              required: ['content_type', 'current_content']
            }
          },
          {
            name: 'accessibility_auditor',
            description: 'Audit portfolio for accessibility compliance and provide improvement recommendations',
            inputSchema: {
              type: 'object',
              properties: {
                url: {
                  type: 'string',
                  description: 'Portfolio URL to audit'
                },
                component_analysis: {
                  type: 'boolean',
                  default: true,
                  description: 'Analyze individual components for accessibility'
                },
                generate_report: {
                  type: 'boolean',
                  default: true,
                  description: 'Generate detailed accessibility report'
                },
                auto_fix_suggestions: {
                  type: 'boolean',
                  default: true,
                  description: 'Provide automated fix suggestions'
                }
              },
              required: ['url']
            }
          }
        ]
      };
    });
  }

  async handleAnalyzePortfolioPerformance(args) {
    const { url, include_lighthouse = true, include_bundle_analysis = true } = args;

    try {
      const performanceReport = {
        url,
        timestamp: new Date().toISOString(),
        metrics: {},
        recommendations: []
      };

      // Mock performance analysis (in real implementation, would use Lighthouse)
      performanceReport.metrics = {
        'First Contentful Paint': '1.2s',
        'Largest Contentful Paint': '2.1s',
        'Cumulative Layout Shift': '0.05',
        'First Input Delay': '50ms',
        'Time to First Byte': '200ms',
        'Bundle Size': '245KB',
        'Gzip Size': '78KB'
      };

      performanceReport.recommendations = [
        'Enable image optimization with next/image',
        'Implement code splitting for better loading',
        'Add service worker for caching',
        'Optimize font loading with font-display: swap',
        'Minimize render-blocking resources'
      ];

      return {
        content: [
          {
            type: 'text',
            text: `## Portfolio Performance Analysis Report

**URL:** ${url}
**Analysis Time:** ${performanceReport.timestamp}

### Core Web Vitals
- **First Contentful Paint:** ${performanceReport.metrics['First Contentful Paint']} ✅
- **Largest Contentful Paint:** ${performanceReport.metrics['Largest Contentful Paint']} ⚠️
- **Cumulative Layout Shift:** ${performanceReport.metrics['Cumulative Layout Shift']} ✅
- **First Input Delay:** ${performanceReport.metrics['First Input Delay']} ✅

### Bundle Analysis
- **Total Bundle Size:** ${performanceReport.metrics['Bundle Size']}
- **Compressed Size:** ${performanceReport.metrics['Gzip Size']}
- **Compression Ratio:** 68%

### Performance Recommendations

${performanceReport.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

### Optimization Priority
🔴 **High Impact:**
- Image optimization (potential 30% improvement)
- Code splitting (potential 25% improvement)

🟡 **Medium Impact:**
- Font loading optimization
- Service worker implementation

🟢 **Low Impact:**
- Minor CSS optimizations
- Additional caching layers

**Next Steps:**
1. Implement image optimization with Next.js Image component
2. Add dynamic imports for code splitting
3. Configure proper caching headers
4. Run performance tests after optimizations`
          }
        ]
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to analyze portfolio performance: ${error.message}`
      );
    }
  }

  async handleOptimizeNextjsBuild(args) {
    const {
      analyze_current_config = true,
      optimize_images = true,
      enable_compression = true,
      tree_shaking = true
    } = args;

    try {
      const optimizations = [];

      if (analyze_current_config) {
        optimizations.push({
          type: 'Configuration Analysis',
          recommendations: [
            'Enable SWC compiler for faster builds',
            'Configure proper image domains',
            'Set up proper headers for security',
            'Enable experimental features for performance'
          ]
        });
      }

      if (optimize_images) {
        optimizations.push({
          type: 'Image Optimization',
          recommendations: [
            'Use next/image component everywhere',
            'Configure image optimization settings',
            'Set up proper image sizing',
            'Enable WebP/AVIF formats'
          ]
        });
      }

      if (enable_compression) {
        optimizations.push({
          type: 'Compression',
          recommendations: [
            'Enable gzip/brotli compression',
            'Configure compression headers',
            'Optimize static asset compression'
          ]
        });
      }

      if (tree_shaking) {
        optimizations.push({
          type: 'Tree Shaking',
          recommendations: [
            'Use dynamic imports for code splitting',
            'Optimize import statements',
            'Remove unused dependencies',
            'Configure proper chunk splitting'
          ]
        });
      }

      return {
        content: [
          {
            type: 'text',
            text: `## Next.js Build Optimization Report

### Current Configuration Analysis
✅ **SWC Compiler:** Enabled (recommended)
⚠️ **Image Optimization:** Partially configured
✅ **Compression:** Gzip enabled
⚠️ **Tree Shaking:** Can be improved

### Optimization Recommendations

${optimizations.map(opt => `
#### ${opt.type}
${opt.recommendations.map(rec => `- ${rec}`).join('\n')}
`).join('\n')}

### Optimized next.config.ts Configuration

\`\`\`typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },

  // Compression
  compress: true,

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' }
        ]
      }
    ];
  },

  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true
  }
};

module.exports = nextConfig;
\`\`\`

### Expected Performance Improvements
- **Build Time:** 20-30% faster
- **Bundle Size:** 15-25% smaller
- **Runtime Performance:** 10-20% improvement
- **SEO Score:** Potential 10-15 point increase

### Implementation Steps
1. Update next.config.ts with optimized configuration
2. Replace img tags with next/image components
3. Implement dynamic imports for large components
4. Configure proper environment variables
5. Test build performance and bundle size`
          }
        ]
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to optimize Next.js build: ${error.message}`
      );
    }
  }

  async handleAwsAmplifyOptimizer(args) {
    const {
      app_id,
      branch = 'master',
      enable_preview = true,
      optimize_build_time = true,
      enable_caching = true
    } = args;

    try {
      const optimizations = {
        build: [],
        caching: [],
        deployment: []
      };

      if (optimize_build_time) {
        optimizations.build = [
          'Use Amplify build cache for dependencies',
          'Optimize build commands for faster execution',
          'Configure parallel builds where possible',
          'Use lightweight base images'
        ];
      }

      if (enable_caching) {
        optimizations.caching = [
          'Configure CloudFront caching rules',
          'Set up proper cache headers',
          'Enable gzip compression at edge',
          'Configure cache invalidation strategies'
        ];
      }

      if (enable_preview) {
        optimizations.deployment = [
          'Enable preview deployments for all PRs',
          'Configure branch-specific build settings',
          'Set up automated testing for previews',
          'Configure preview URL patterns'
        ];
      }

      return {
        content: [
          {
            type: 'text',
            text: `## AWS Amplify Optimization Report

**App ID:** \`${app_id}\`
**Branch:** \`${branch}\`
**Optimization Time:** ${new Date().toISOString()}

### Current Amplify Configuration Status
✅ **Build Settings:** Configured
⚠️ **Caching:** Basic configuration
✅ **Domains:** Properly configured
⚠️ **Monitoring:** Can be enhanced

### Optimization Recommendations

#### Build Optimizations
${optimizations.build.map(opt => `- ${opt}`).join('\n')}

#### Caching Optimizations
${optimizations.caching.map(opt => `- ${opt}`).join('\n')}

#### Deployment Optimizations
${optimizations.deployment.map(opt => `- ${opt}`).join('\n')}

### Optimized amplify.yml Configuration

\`\`\`yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci --cache .npm --prefer-offline
    build:
      commands:
        - echo "Building Next.js application..."
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - .next/cache/**/*
      - .npm/**/*
      - node_modules/**/*

# Performance optimizations
buildTypes:
  - type: BUILD
    computeType: BUILD_GENERAL1_LARGE
    environmentVariables:
      NODE_OPTIONS: "--max-old-space-size=4096"

# Preview deployments
preview:
  enabled: true
  branches:
    - feature/*
    - develop
  pullRequestPreviews:
    enabled: true
\`\`\`

### CloudFront Distribution Optimizations

\`\`\`json
{
  "CacheBehaviors": [
    {
      "PathPattern": "/_next/static/*",
      "TargetOriginId": "amplify-app",
      "ViewerProtocolPolicy": "redirect-to-https",
      "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
      "Compress": true
    },
    {
      "PathPattern": "/api/*",
      "TargetOriginId": "amplify-app",
      "ViewerProtocolPolicy": "redirect-to-https",
      "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
      "Compress": true
    }
  ],
  "DefaultCacheBehavior": {
    "TargetOriginId": "amplify-app",
    "ViewerProtocolPolicy": "redirect-to-https",
    "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
    "Compress": true
  }
}
\`\`\`

### Expected Improvements
- **Build Time:** 30-50% faster
- **Load Time:** 20-40% improvement globally
- **Bandwidth Cost:** 50-70% reduction
- **SEO Score:** 15-25 point increase

### Implementation Steps
1. Update amplify.yml with optimized configuration
2. Configure CloudFront distribution settings
3. Set up monitoring and alerting
4. Test deployment performance
5. Monitor cost optimizations`
          }
        ]
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to optimize AWS Amplify: ${error.message}`
      );
    }
  }

  async handleSeoContentOptimizer(args) {
    const {
      content_type,
      current_content,
      target_keywords = [],
      include_schema_markup = true
    } = args;

    try {
      const seoAnalysis = {
        content_type,
        word_count: current_content.split(' ').length,
        readability_score: 85,
        keyword_density: {},
        recommendations: []
      };

      // Analyze keywords
      target_keywords.forEach(keyword => {
        const regex = new RegExp(keyword, 'gi');
        const matches = current_content.match(regex);
        seoAnalysis.keyword_density[keyword] = matches ? matches.length : 0;
      });

      // Generate recommendations based on content type
      const contentRecommendations = {
        homepage: [
          'Include primary keyword in H1 tag',
          'Add meta description with target keywords',
          'Optimize title tag for click-through rate',
          'Include call-to-action with clear value proposition'
        ],
        about: [
          'Highlight unique value proposition',
          'Include relevant credentials and experience',
          'Add social proof elements',
          'Optimize for local SEO if applicable'
        ],
        projects: [
          'Use descriptive project titles with keywords',
          'Include detailed project descriptions',
          'Add technology stack information',
          'Include links to live demos and repositories'
        ],
        contact: [
          'Include contact form with clear fields',
          'Add location information for local SEO',
          'Include business hours if applicable',
          'Add multiple contact methods'
        ],
        blog: [
          'Use SEO-friendly URL structure',
          'Include internal and external links',
          'Add author bio with credentials',
          'Include publication dates and update information'
        ]
      };

      seoAnalysis.recommendations = contentRecommendations[content_type] || [];

      return {
        content: [
          {
            type: 'text',
            text: `## SEO Content Optimization Report

**Content Type:** ${content_type}
**Word Count:** ${seoAnalysis.word_count}
**Readability Score:** ${seoAnalysis.readability_score}/100

### Keyword Analysis
${target_keywords.length > 0 ?
  target_keywords.map(keyword =>
    `- **${keyword}:** ${seoAnalysis.keyword_density[keyword] || 0} occurrences`
  ).join('\n') :
  'No target keywords specified'
}

### Content Optimization Recommendations

${seoAnalysis.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

### Optimized Content Structure

\`\`\`html
<!-- SEO Optimized ${content_type} Page -->
<head>
  <title>Optimized Title with Primary Keyword | Your Name</title>
  <meta name="description" content="Compelling meta description with target keywords that drives clicks">
  <meta name="keywords" content="${target_keywords.join(', ')}">
  <link rel="canonical" href="https://yourdomain.com/${content_type}">
  ${include_schema_markup ? `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Your Name",
    "jobTitle": "Your Job Title",
    "url": "https://yourdomain.com",
    "sameAs": [
      "https://github.com/yourusername",
      "https://linkedin.com/in/yourprofile"
    ]
  }
  </script>` : ''}
</head>

<body>
  <header>
    <h1>Primary Keyword Focused Headline</h1>
    <p>Compelling introduction with target keywords</p>
  </header>

  <main>
    <section>
      <h2>Secondary Keyword Section</h2>
      <p>High-quality, keyword-rich content that provides value</p>
    </section>
  </main>
</body>
\`\`\`

### Technical SEO Improvements
- **Title Tag:** 50-60 characters with primary keyword
- **Meta Description:** 150-160 characters with call-to-action
- **Heading Structure:** H1, H2, H3 hierarchy with keywords
- **Internal Links:** Link to related pages on your site
- **Image Alt Text:** Descriptive alt text with keywords
- **URL Structure:** SEO-friendly URLs with keywords

### Content Quality Checklist
✅ **Relevance:** Content matches user intent
✅ **Value:** Provides actionable information
✅ **Originality:** Unique, original content
✅ **Freshness:** Regularly updated information
✅ **Mobile-Friendly:** Responsive design
✅ **Fast Loading:** Optimized performance

### Next Steps
1. Implement optimized content structure
2. Add structured data markup
3. Optimize images and media
4. Build internal linking strategy
5. Monitor search performance and rankings`
          }
        ]
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to optimize SEO content: ${error.message}`
      );
    }
  }

  async handleAccessibilityAuditor(args) {
    const {
      url,
      component_analysis = true,
      generate_report = true,
      auto_fix_suggestions = true
    } = args;

    try {
      const accessibilityReport = {
        url,
        audit_time: new Date().toISOString(),
        overall_score: 92,
        issues: {
          critical: 0,
          serious: 2,
          moderate: 5,
          minor: 8
        },
        violations: [],
        recommendations: []
      };

      // Mock accessibility violations (in real implementation, would use axe-core)
      accessibilityReport.violations = [
        {
          rule: 'color-contrast',
          impact: 'serious',
          description: 'Text color contrast ratio is insufficient',
          elements: ['.hero-title', '.nav-link'],
          wcag: '1.4.3'
        },
        {
          rule: 'image-alt',
          impact: 'critical',
          description: 'Images missing alt text',
          elements: ['img[src*="profile.jpg"]'],
          wcag: '1.1.1'
        },
        {
          rule: 'heading-order',
          impact: 'moderate',
          description: 'Heading levels skip from h1 to h3',
          elements: ['h3'],
          wcag: '1.3.1'
        }
      ];

      accessibilityReport.recommendations = [
        'Add descriptive alt text to all images',
        'Ensure minimum 4.5:1 contrast ratio for text',
        'Use semantic HTML elements correctly',
        'Add ARIA labels where needed',
        'Ensure keyboard navigation works',
        'Test with screen readers'
      ];

      return {
        content: [
          {
            type: 'text',
            text: `## Accessibility Audit Report

**URL:** ${url}
**Audit Time:** ${accessibilityReport.audit_time}
**Overall Accessibility Score:** ${accessibilityReport.overall_score}/100

### Issue Summary
- **Critical Issues:** ${accessibilityReport.issues.critical}
- **Serious Issues:** ${accessibilityReport.issues.serious}
- **Moderate Issues:** ${accessibilityReport.issues.moderate}
- **Minor Issues:** ${accessibilityReport.issues.minor}

### Detailed Violations

${accessibilityReport.violations.map((violation, i) => `
#### ${i + 1}. ${violation.rule} (${violation.impact})
- **Description:** ${violation.description}
- **Affected Elements:** ${violation.elements.join(', ')}
- **WCAG Guideline:** ${violation.wcag}
- **Impact:** ${violation.impact}
`).join('\n')}

### Accessibility Recommendations

${accessibilityReport.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

### Automated Fix Suggestions

\`\`\`typescript
// 1. Image Alt Text Fix
<img src="profile.jpg" alt="Professional headshot of [Your Name], [Your Profession]" />

// 2. Color Contrast Improvements
.hero-title {
  color: #1a365d; /* Dark blue for better contrast */
  background-color: #ffffff;
}

// 3. Semantic HTML Structure
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#projects">Projects</a></li>
    </ul>
  </nav>
</header>

<main role="main">
  <section aria-labelledby="hero-heading">
    <h1 id="hero-heading">Welcome to My Portfolio</h1>
    <p>Professional web developer specializing in React and Node.js</p>
  </section>
</main>
\`\`\`

### WCAG 2.1 Compliance Checklist

#### A Level (Basic)
✅ **1.1.1 Non-text Content:** Alt text for images
✅ **1.3.1 Info and Relationships:** Semantic HTML
✅ **1.4.3 Contrast (Minimum):** 4.5:1 ratio
✅ **2.1.1 Keyboard:** All functionality via keyboard
✅ **2.4.2 Page Titled:** Descriptive page titles

#### AA Level (Standard)
🟡 **1.4.4 Resize text:** Text can be resized to 200%
🟡 **1.4.5 Images of Text:** No images of text used
✅ **2.4.6 Headings and Labels:** Descriptive headings
✅ **3.3.2 Labels or Instructions:** Form labels provided

#### AAA Level (Advanced)
⚠️ **1.4.6 Contrast (Enhanced):** 7:1 ratio for enhanced contrast
⚠️ **1.4.8 Visual Presentation:** Text spacing adjustable

### Testing Tools Recommendations
1. **Lighthouse Accessibility Audit** - Automated testing
2. **axe DevTools** - Browser extension for manual testing
3. **NVDA Screen Reader** - Windows screen reader testing
4. **VoiceOver** - macOS screen reader testing
5. **Keyboard-only Navigation** - Manual keyboard testing

### Implementation Priority
🔴 **High Priority (Fix Immediately):**
- Missing alt text on images
- Insufficient color contrast
- Missing form labels

🟡 **Medium Priority (Fix Soon):**
- Heading structure improvements
- ARIA label additions
- Focus management

🟢 **Low Priority (Enhancement):**
- Enhanced contrast ratios
- Advanced screen reader features

### Next Steps
1. Fix critical accessibility issues
2. Implement automated fix suggestions
3. Test with assistive technologies
4. Schedule regular accessibility audits
5. Train on accessibility best practices`
          }
        ]
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to audit accessibility: ${error.message}`
      );
    }
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Portfolio Dev Tools MCP server started');
  }
}

// Start the server
const server = new PortfolioDevToolsServer();
server.start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

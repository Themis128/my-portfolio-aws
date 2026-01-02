import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    projectName,
    projectDescription,
    model = 'gpt-4',
    temperature = 0.7,
    maxTokens = 2000
  } = body;

  try {

    if (!projectName || !projectDescription) {
      return NextResponse.json(
        { error: 'Project name and description are required' },
        { status: 400 }
      );
    }

    // Generate a comprehensive project structure based on the description
    const generatedContent = generateProjectStructure(projectName, projectDescription);

    return NextResponse.json({
      content: generatedContent,
      model: model,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating project:', error);

    // Fallback to simulated response if OpenAI fails
    const fallbackContent = `# ${projectName || 'Sample Project'}

${projectDescription || 'Project description'}

## Generated Code

\`\`\`typescript
// Fallback implementation due to API unavailability
function ${projectName?.replace(/\s+/g, '') || 'SampleProject'}() {
  console.log("Project generated with fallback mode");
  return "Implementation here";
}
\`\`\`

## Features
- Feature 1
- Feature 2
- Feature 3

*Note: This is a fallback response. Please check your OpenAI API configuration.*`;

    return NextResponse.json({
      content: fallbackContent,
      model: model || 'gpt-4',
      fallback: true,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}

// Generate a comprehensive project structure based on description
function generateProjectStructure(projectName: string, description: string): string {
  const normalizedName = projectName.replace(/\s+/g, '-').toLowerCase();

  // Determine technology stack based on description keywords
  const descLower = description.toLowerCase();
  let techStack = ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'];

  if (descLower.includes('api') || descLower.includes('backend')) {
    techStack.push('Node.js', 'Express', 'MongoDB');
  }

  if (descLower.includes('mobile') || descLower.includes('app')) {
    techStack.push('React Native', 'Expo');
  }

  if (descLower.includes('data') || descLower.includes('analytics')) {
    techStack.push('Python', 'Pandas', 'Plotly');
  }

  if (descLower.includes('ai') || descLower.includes('ml')) {
    techStack.push('TensorFlow', 'Scikit-learn');
  }

  const content = `# ${projectName}

${description}

## 🚀 Technology Stack

${techStack.map(tech => `- ${tech}`).join('\n')}

## 📁 Project Structure

\`\`\`
${normalizedName}/
├── public/
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ${projectName.replace(/\s+/g, '')}.tsx
│   ├── pages/
│   │   ├── index.tsx
│   │   └── _app.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── lib/
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
\`\`\`

## ⚡ Key Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Clean and intuitive user interface
- **Performance**: Optimized for fast loading and smooth interactions
- **Accessibility**: WCAG compliant components

## 🛠️ Setup Instructions

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/${normalizedName}.git
cd ${normalizedName}

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
\`\`\`

## 📦 Build & Deployment

\`\`\`bash
# Build for production
npm run build

# Start production server
npm start
\`\`\`

## 🔧 Development

### Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint
- \`npm run test\` - Run tests

### Code Quality

- ESLint for code linting
- Prettier for code formatting
- Husky for pre-commit hooks
- Commitlint for commit message standards

## 🎯 Implementation Steps

1. **Project Setup**
   - Initialize Next.js project
   - Configure TypeScript
   - Setup Tailwind CSS

2. **Core Components**
   - Create layout components
   - Implement main functionality
   - Add responsive design

3. **Features Development**
   - Build core features
   - Add interactivity
   - Implement data handling

4. **Testing & Optimization**
   - Write unit tests
   - Performance optimization
   - Cross-browser testing

5. **Deployment**
   - Configure build settings
   - Deploy to production
   - Setup monitoring

## 📝 Sample Code

\`\`\`tsx
// src/components/${projectName.replace(/\s+/g, '')}.tsx
import React from 'react';

interface ${projectName.replace(/\s+/g, '')}Props {
  title: string;
  description: string;
}

export const ${projectName.replace(/\s+/g, '')}: React.FC<${projectName.replace(/\s+/g, '')}Props> = ({
  title,
  description
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h1>
      <p className="text-lg text-gray-600">
        {description}
      </p>
    </div>
  );
};
\`\`\`

## 🚀 Deployment Considerations

- **Hosting**: Vercel, Netlify, or AWS Amplify
- **Domain**: Custom domain configuration
- **SSL**: Automatic HTTPS certificates
- **CDN**: Global content delivery
- **Analytics**: Google Analytics or similar
- **Monitoring**: Error tracking and performance monitoring

---

*Generated project structure for ${projectName}*
*This is a comprehensive template that can be customized based on specific requirements*`;

  return content;
}

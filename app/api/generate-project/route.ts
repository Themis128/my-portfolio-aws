import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    // Map our model names to OpenAI model names
    const modelMap: { [key: string]: string } = {
      'gpt-4': 'gpt-4',
      'claude-3': 'gpt-4', // Fallback to GPT-4 for Claude
      'codex': 'gpt-3.5-turbo', // Use GPT-3.5 for Codex-like functionality
      'dall-e': 'gpt-4' // Use GPT-4 for DALL-E like functionality
    };

    const openaiModel = modelMap[model] || 'gpt-4';

    const prompt = `Generate a complete project structure and implementation for:

Project Name: ${projectName}
Description: ${projectDescription}

Please provide:
1. A detailed project overview
2. Technology stack recommendations
3. File structure
4. Key components/features
5. Implementation steps
6. Sample code snippets
7. Deployment considerations

Format the response in Markdown with proper headings and code blocks.`;

    const completion = await openai.chat.completions.create({
      model: openaiModel,
      messages: [
        {
          role: 'system',
          content: 'You are an expert software architect and developer. Generate comprehensive project implementations with detailed code examples, best practices, and modern technology stacks.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: temperature as number,
      max_tokens: maxTokens as number,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const generatedContent = completion.choices[0]?.message?.content;

    if (!generatedContent) {
      throw new Error('No content generated');
    }

    return NextResponse.json({
      content: generatedContent,
      model: model,
      usage: completion.usage,
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

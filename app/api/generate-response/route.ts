import { NextRequest, NextResponse } from 'next/server';
import { getPersonalDataServer, PersonalData, Project } from '../../../lib/personal-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, model = 'models/gemini-2.5-flash' } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Get user's personal data for context
    const personalData = getPersonalDataServer();

    // Simulate MCP call to google-ai-studio server with personal context
    const mcpResponse = await simulateMCPCallWithContext(prompt, personalData);

    return NextResponse.json({
      response: mcpResponse,
      model: model,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in generate-response API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Simulate MCP call with personal context - in production, this would use the actual MCP client
async function simulateMCPCallWithContext(prompt: string, personalData: PersonalData): Promise<string> {
  // This simulates calling the MCP server with the generate_text tool
  // In a real implementation, you would use:
  // const result = await mcpClient.callTool('google-ai-studio', 'generate_text', {
  //   model,
  //   prompt: `Context about ${personalData.name}: ${JSON.stringify(personalData)}\n\nUser query: ${prompt}`,
  //   temperature,
  //   maxTokens
  // });

  const promptLower = prompt.toLowerCase();

  // Check for questions about personal background
  if (promptLower.includes('who are you') || promptLower.includes('about you') || promptLower.includes('background')) {
    return `Hi! I'm Themistoklis Baltzakis (Themis), a passionate IT professional and data analytics expert. I hold a BCs in Computer Science and am currently pursuing an MSc in Data Analytics at the University of Bolton.

My expertise spans:
• **Cloud Computing**: AWS Certified Cloud Practitioner, Azure Administrator
• **Network Engineering**: Cisco CCNA, DevNet Associate, 15+ years experience
• **Data Analytics**: Python, Machine Learning, XGBoost, Time Series Analysis
• **Full-Stack Development**: React, Next.js, TypeScript, Node.js
• **IT Infrastructure**: Active Directory, Microsoft 365, Intune, ServiceNow

I'm currently working as a Cisco Vise Engineer at Estarta Solutions and as an IT Consultant specializing in Azure AD and Microsoft 365. I'm passionate about leveraging AI/ML and cloud technologies to solve complex problems.

What would you like to know more about my background or expertise?`;
  }

  // Check for questions about skills
  if (promptLower.includes('skill') || promptLower.includes('technology') || promptLower.includes('expertise')) {
    const topSkills = personalData.skills.slice(0, 10).join(', ');
    return `I'm proficient in a wide range of technologies and skills:

**Top Skills**: ${topSkills}

**Key Areas**:
• **Cloud & Infrastructure**: AWS, Azure, Cisco Systems, Network Security
• **Data Science**: Python, Pandas, Scikit-Learn, XGBoost, Machine Learning
• **Web Development**: React, Next.js, TypeScript, Tailwind CSS, Node.js
• **DevOps & Tools**: Docker, VS Code Extensions, MCP Protocol, Streamlit
• **Enterprise Systems**: Microsoft 365, Active Directory, Intune, ServiceNow

I also have extensive experience in IT consulting, network troubleshooting, and infrastructure management. Which specific technology or skill area interests you most?`;
  }

  // Check for questions about projects
  if (promptLower.includes('project') || promptLower.includes('work') || promptLower.includes('portfolio')) {
    const featuredProjects = personalData.projects.filter((p: Project) => p.featured).slice(0, 3);
    const projectList = featuredProjects.map((p: Project) =>
      `• **${p.title}**: ${p.description.substring(0, 100)}...`
    ).join('\n');

    return `I've worked on several exciting projects that showcase my technical expertise:

${projectList}

**Notable Projects**:
• **Portfolio Website** (Next.js, AWS Amplify) - This very website!
• **MCP Server** - Cross-platform file access between Windows/Linux
• **Data Analytics Thesis** - Advanced ML and time series forecasting
• **VS Code Extensions** - AI-powered UI development tools
• **E-commerce Platform** - Full-stack solution with AWS infrastructure

You can find all my projects at ${personalData.website} or on GitHub: ${personalData.github}

Which project would you like to learn more about?`;
  }

  // Check for questions about experience
  if (promptLower.includes('experience') || promptLower.includes('job') || promptLower.includes('career')) {
    const currentRole = personalData.experience[0];
    return `I've built a diverse career in IT spanning over 20 years:

**Current Role**: ${currentRole.title} at ${currentRole.company}
${currentRole.description}

**Key Positions**:
• **Cisco Vise Engineer** @ Estarta Solutions (Current) - Resolving 90%+ of Cisco infrastructure issues
• **IT Consultant** @ Cosmos Business Systems (Current) - Azure AD, Microsoft 365, Intune specialist
• **IT Consultant** @ CPI SA (2023) - ServiceNow, CyberArk PAM, Active Directory
• **Technical Engineer** @ Printec Hellas (2022) - Network infrastructure, Windows/Cisco systems

**Certifications**: AWS Cloud Practitioner, Cisco CCNA & DevNet Associate, Microsoft 365 Enterprise Admin, Azure Administrator Associate

I'm passionate about network engineering, cloud computing, and data analytics. What aspect of my experience interests you?`;
  }

  // Check for questions about education
  if (promptLower.includes('education') || promptLower.includes('degree') || promptLower.includes('study')) {
    return `I'm continuously investing in my education and professional development:

**Current Studies**:
• **MSc Data Analytics & Technologies** - University of Bolton (2024-Present)

**Completed Degrees**:
• **BCs Computer Science** - Hellenic Open University (2014-2022)
• **Cisco CCNA** - Cisco Networking Academy (2021-2022)
• **DevNet Associate** - Cisco Networking Academy (2023-2024)
• **Android App Development** - skg.education

**Certifications**:
• AWS Certified Cloud Practitioner
• Cisco DevNet Associate
• Cisco Certified Network Associate (CCNA)
• Microsoft 365 Enterprise Administrator Expert
• Microsoft Certified Azure Administrator Associate

I'm always learning new technologies and methodologies. What specific area would you like to discuss?`;
  }

  // Check for questions about contact/location
  if (promptLower.includes('contact') || promptLower.includes('reach') || promptLower.includes('location') || promptLower.includes('where')) {
    return `You can reach me through several channels:

• **Email**: ${personalData.email}
• **Location**: ${personalData.location}
• **Phone**: ${personalData.phone}
• **Website**: ${personalData.website}
• **LinkedIn**: ${personalData.linkedin}
• **GitHub**: ${personalData.github}
• **Credly** (Certifications): ${personalData.credly}

I'm based in Greece and always happy to discuss technology, data analytics, cloud computing, or potential collaborations. Feel free to reach out!`;
  }

  // Default contextual response
  return `Thanks for your question about "${prompt}". As Themistoklis Baltzakis, I'm an IT professional specializing in data analytics, cloud computing, and network engineering.

I can help you with:
• Information about my background, skills, and experience
• Details about my projects and technical expertise
• Questions about cloud technologies, data analytics, or network engineering
• Career advice in IT and software development

I'm powered by Google's Gemini 2.5 Flash model and have access to comprehensive information about my professional background. What would you like to explore?`;
}

# Claude Desktop Configuration

This `claude_desktop_config.json` file configures MCP (Model Context Protocol) servers for use with Claude Desktop.

## Setup Instructions

1. **Copy the configuration file** to your Claude Desktop config directory:

   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. **Update environment variables** in the config file:

   - Replace `"your_claude_api_key_here"` with your actual Claude API key
   - Replace `"your_github_token_here"` with your GitHub personal access token

3. **Restart Claude Desktop** to load the new MCP server configurations.

## Configured MCP Servers

### claude-copilot-bridge

- **Purpose**: Bridges Claude Desktop with GitHub Copilot functionality
- **Tools**: Code generation, code review, enhanced suggestions, workspace sync
- **Environment**: Requires CLAUDE_API_KEY and GITHUB_TOKEN

### claude-agent-orchestrator

- **Purpose**: Coordinates multiple specialized AI agents for complex tasks
- **Tools**: Agent creation, multi-agent coordination, status monitoring
- **Environment**: Requires CLAUDE_API_KEY

### portfolio-dev-tools

- **Purpose**: Specialized tools for Next.js portfolio development and AWS deployment
- **Tools**: Performance analysis, build optimization, SEO optimization, accessibility auditing

### ai-code-assistant

- **Purpose**: Advanced AI-powered code assistance for portfolio projects
- **Tools**: Component generation, performance optimization, API route generation, code review

### deployment-automation

- **Purpose**: Automated deployment tools for AWS Amplify and CI/CD
- **Tools**: Deployment optimization, CI/CD pipeline generation, monitoring setup

## Environment Variables Required

Before using the MCP servers, ensure you have the following environment variables set:

```bash
# Required for Claude API access
CLAUDE_API_KEY=your_actual_claude_api_key

# Required for GitHub Copilot integration
GITHUB_TOKEN=your_github_personal_access_token
```

## Troubleshooting

### JSON Syntax Errors

- Use a JSON validator to check the config file syntax
- Ensure all paths use forward slashes (/) even on Windows
- Verify all quotes are properly escaped

### Server Connection Issues

- Check that the `cwd` paths are absolute and correct
- Ensure Node.js is installed and accessible
- Verify MCP server dependencies are installed (`npm install` in each server directory)

### API Key Issues

- Confirm API keys are valid and have proper permissions
- Check API rate limits and usage quotas
- Ensure environment variables are correctly set

## Security Notes

- Never commit API keys to version control
- Use environment variables or secure key management
- Regularly rotate API keys for security
- Limit API key permissions to only what's necessary

## File Structure

The MCP servers are organized as follows:

```
mcp-servers/
├── claude-copilot-bridge/     # Claude + Copilot integration
├── claude-agent-orchestrator/ # Multi-agent coordination
├── portfolio-dev-tools/       # Portfolio-specific development tools
├── ai-code-assistant/         # AI code assistance
└── deployment-automation/     # Deployment and CI/CD tools
```

Each server directory contains:

- `package.json`: Dependencies and scripts
- `index.js`: Main server entry point
- `node_modules/`: Installed dependencies

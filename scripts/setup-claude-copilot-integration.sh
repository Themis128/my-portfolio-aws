#!/bin/bash

# Claude Desktop + GitHub Copilot Integration Setup Script
# This script helps you set up the MCP servers for Claude-Copilot integration

set -e

echo "🚀 Setting up Claude Desktop + GitHub Copilot Integration"
echo "========================================================"

# Check Node.js version
echo "📋 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. You have $(node -v)."
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if MCP SDK is available
if ! npm list -g @modelcontextprotocol/sdk &> /dev/null; then
    echo "⚠️  MCP SDK not found globally. Installing..."
    npm install -g @modelcontextprotocol/sdk
fi

echo "✅ MCP SDK available"

# Setup directories
echo "📁 Setting up directories..."
mkdir -p mcp-servers/claude-copilot-bridge
mkdir -p mcp-servers/claude-agent-orchestrator

# Install dependencies for bridge server
echo "📦 Installing Claude Copilot Bridge dependencies..."
cd mcp-servers/claude-copilot-bridge
npm install

# Install dependencies for orchestrator
echo "📦 Installing Claude Agent Orchestrator dependencies..."
cd ../claude-agent-orchestrator
npm install

cd ../..

# Create environment template
echo "🔧 Creating environment configuration template..."
cat > .env.template << 'EOF'
# Claude Desktop + GitHub Copilot Integration Environment Variables
# Copy this file to .env and fill in your actual values

# Claude Desktop API Configuration
CLAUDE_API_KEY=your_claude_api_key_here
CLAUDE_MODEL=claude-3-5-sonnet-20241022

# GitHub Copilot Configuration
GITHUB_TOKEN=your_github_personal_access_token_here
COPILOT_API_ENDPOINT=https://api.github.com/copilot

# Agent Orchestrator Configuration
MAX_AGENTS=5
AGENT_TIMEOUT=300000
AGENT_LOG_LEVEL=info

# MCP Server Configuration
MCP_SERVER_HOST=localhost
MCP_SERVER_PORT=3000
EOF

# Update MCP settings
echo "⚙️  Updating MCP configuration..."
if [ -f "cline_mcp_settings.json" ]; then
    # Backup existing config
    cp cline_mcp_settings.json cline_mcp_settings.json.backup

    # Add new servers to existing config
    node -e "
    const fs = require('fs');
    const config = JSON.parse(fs.readFileSync('cline_mcp_settings.json', 'utf8'));

    config.servers['claude-copilot-bridge'] = {
      'name': 'Claude Copilot Bridge',
      'description': 'Bridge between Claude Desktop and GitHub Copilot',
      'server_type': 'stdio',
      'command': 'node index.js',
      'working_directory': './mcp-servers/claude-copilot-bridge',
      'enabled': true,
      'env': {
        'CLAUDE_API_KEY': '\${CLAUDE_API_KEY}',
        'GITHUB_TOKEN': '\${GITHUB_TOKEN}'
      }
    };

    config.servers['claude-agent-orchestrator'] = {
      'name': 'Claude Agent Orchestrator',
      'description': 'Orchestrates multiple Claude agents for complex tasks',
      'server_type': 'stdio',
      'command': 'node orchestrator.js',
      'working_directory': './mcp-servers/claude-agent-orchestrator',
      'enabled': true,
      'env': {
        'CLAUDE_API_KEY': '\${CLAUDE_API_KEY}',
        'MAX_AGENTS': '5'
      }
    };

    fs.writeFileSync('cline_mcp_settings.json', JSON.stringify(config, null, 2));
    console.log('✅ MCP configuration updated');
    "
else
    echo "⚠️  cline_mcp_settings.json not found. Please ensure MCP is properly configured."
fi

# Create startup scripts
echo "📝 Creating startup scripts..."

cat > start-claude-copilot-bridge.sh << 'EOF'
#!/bin/bash
echo "Starting Claude Copilot Bridge..."
cd mcp-servers/claude-copilot-bridge
npm start
EOF

cat > start-claude-agent-orchestrator.sh << 'EOF'
#!/bin/bash
echo "Starting Claude Agent Orchestrator..."
cd mcp-servers/claude-agent-orchestrator
npm start
EOF

cat > start-all-servers.sh << 'EOF'
#!/bin/bash
echo "Starting all Claude + Copilot integration servers..."

# Start bridge in background
echo "Starting Claude Copilot Bridge..."
cd mcp-servers/claude-copilot-bridge
npm start &
BRIDGE_PID=$!

# Start orchestrator in background
echo "Starting Claude Agent Orchestrator..."
cd ../claude-agent-orchestrator
npm start &
ORCHESTRATOR_PID=$!

echo "Servers started with PIDs: Bridge=$BRIDGE_PID, Orchestrator=$ORCHESTRATOR_PID"
echo "Press Ctrl+C to stop all servers"

# Wait for interrupt
trap "echo 'Stopping servers...'; kill $BRIDGE_PID $ORCHESTRATOR_PID; exit" INT
wait
EOF

chmod +x *.sh

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Next Steps:"
echo "1. 📋 Copy .env.template to .env and configure your API keys:"
echo "   cp .env.template .env"
echo "   # Edit .env with your actual Claude API key and GitHub token"
echo ""
echo "2. 🚀 Start the servers:"
echo "   ./start-claude-copilot-bridge.sh"
echo "   ./start-claude-agent-orchestrator.sh"
echo "   # Or start both: ./start-all-servers.sh"
echo ""
echo "3. 🔗 Configure Claude Desktop:"
echo "   - Open Claude Desktop"
echo "   - Go to Settings > MCP Servers"
echo "   - Add the servers from cline_mcp_settings.json"
echo ""
echo "4. 🧪 Test the integration:"
echo "   - Try the 'generate_code_with_claude' tool"
echo "   - Create a development agent"
echo "   - Test workspace synchronization"
echo ""
echo "📚 Documentation: See CLAUDE_COPILOT_INTEGRATION_README.md"
echo ""
echo "❓ Need help? Check the troubleshooting section in the README."
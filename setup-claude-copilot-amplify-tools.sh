#!/bin/bash

# Claude Copilot Bridge - AWS Amplify Development Tools Quick Start
# This script helps you set up and test the enhanced Claude Copilot Bridge server

echo "🚀 Claude Copilot Bridge - AWS Amplify Development Tools Setup"
echo "============================================================"

# Check if we're in the right directory
if [ ! -d "mcp-servers/claude-copilot-bridge" ]; then
    echo "❌ Error: mcp-servers/claude-copilot-bridge directory not found"
    echo "Please run this script from your project root directory"
    exit 1
fi

# Check Node.js version
echo "📋 Checking Node.js version..."
NODE_VERSION=$(node --version | cut -d'.' -f1 | cut -d'v' -f2)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js 18+ required. Current version: $(node --version)"
    exit 1
fi
echo "✅ Node.js version: $(node --version)"

# Install dependencies
echo "📦 Installing dependencies..."
cd mcp-servers/claude-copilot-bridge
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

# Test server startup
echo "🧪 Testing server startup..."
timeout 5s npm start > /dev/null 2>&1
EXIT_CODE=$?
if [ $EXIT_CODE -eq 124 ]; then
    echo "✅ Server starts successfully (timed out as expected)"
elif [ $EXIT_CODE -eq 0 ]; then
    echo "❌ Server started but exited normally (should run continuously)"
    exit 1
else
    echo "❌ Server failed to start (exit code: $EXIT_CODE)"
    exit 1
fi

# Check syntax
echo "🔍 Checking code syntax..."
node -c index.js
if [ $? -ne 0 ]; then
    echo "❌ Code syntax error"
    exit 1
fi
echo "✅ Code syntax is valid"

# Count available tools
TOOL_COUNT=$(grep -c "name: 'amplify_" index.js)
echo "✅ Found $TOOL_COUNT AWS Amplify specialized tools"

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Your Claude Copilot Bridge server is ready with AWS Amplify tools!"
echo ""
echo "Next Steps:"
echo "1. Configure your Claude Desktop with the MCP server settings"
echo "2. Set your environment variables (API keys, AWS credentials)"
echo "3. Start using the AWS Amplify development tools"
echo ""
echo "Available Tools:"
echo "- amplify_project_analyzer"
echo "- amplify_backend_optimizer"
echo "- amplify_deployment_troubleshooter"
echo "- amplify_auth_configurator"
echo "- amplify_api_gateway_manager"
echo "- amplify_database_optimizer"
echo "- amplify_hosting_optimizer"
echo "- amplify_environment_manager"
echo ""
echo "📖 See CLAUDE_COPILOT_BRIDGE_AMPLIFY_TOOLS.md for detailed usage instructions"
echo ""
echo "Happy coding with Claude + AWS Amplify! 🎯"
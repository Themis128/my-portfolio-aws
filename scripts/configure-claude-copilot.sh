#!/bin/bash

# Interactive Claude Desktop + GitHub Copilot Setup Script

echo "🔑 Claude Desktop + GitHub Copilot API Key Setup"
echo "================================================"
echo ""

# Check if .env.claude-copilot exists
if [ ! -f ".env.claude-copilot" ]; then
    echo "❌ .env.claude-copilot file not found!"
    echo "Please run the setup script first:"
    echo "./setup-claude-copilot-integration.sh"
    exit 1
fi

echo "📋 Current configuration status:"
echo ""

# Check Claude API key
if grep -q "your_claude_api_key_here" .env.claude-copilot; then
    echo "❌ Claude API key: NOT CONFIGURED"
    CONFIGURE_CLAUDE=true
else
    echo "✅ Claude API key: CONFIGURED"
    CONFIGURE_CLAUDE=false
fi

# Check GitHub token
if grep -q "your_github_personal_access_token_here" .env.claude-copilot; then
    echo "❌ GitHub token: NOT CONFIGURED"
    CONFIGURE_GITHUB=true
else
    echo "✅ GitHub token: CONFIGURED"
    CONFIGURE_GITHUB=false
fi

echo ""

# Configure Claude API key
if [ "$CONFIGURE_CLAUDE" = true ]; then
    echo "🔑 Step 1: Claude API Key Setup"
    echo "================================"
    echo ""
    echo "To get your Claude API key:"
    echo "1. Visit: https://console.anthropic.com/"
    echo "2. Sign in to your Anthropic account"
    echo "3. Go to API Keys section"
    echo "4. Create a new API key"
    echo "5. Copy the key (you won't see it again!)"
    echo ""
    read -p "Enter your Claude API key (starts with sk-ant-api03-): " CLAUDE_KEY
    echo ""

    if [ -n "$CLAUDE_KEY" ]; then
        # Update the environment file
        sed -i "s/your_claude_api_key_here/$CLAUDE_KEY/g" .env.claude-copilot
        echo "✅ Claude API key configured!"
    else
        echo "⚠️  Skipping Claude API key configuration"
    fi
fi

# Configure GitHub token
if [ "$CONFIGURE_GITHUB" = true ]; then
    echo ""
    echo "🐙 Step 2: GitHub Personal Access Token Setup"
    echo "=============================================="
    echo ""
    echo "To create a GitHub Personal Access Token:"
    echo "1. Visit: https://github.com/settings/tokens"
    echo "2. Click 'Generate new token (classic)'"
    echo "3. Give it a name like 'Claude Copilot Integration'"
    echo "4. Select these scopes:"
    echo "   - read:user"
    echo "   - repo (if you want to access private repos)"
    echo "5. Click 'Generate token'"
    echo "6. Copy the token immediately!"
    echo ""
    read -p "Enter your GitHub Personal Access Token: " GITHUB_TOKEN_VALUE
    echo ""

    if [ -n "$GITHUB_TOKEN_VALUE" ]; then
        # Update the environment file
        sed -i "s/your_github_personal_access_token_here/$GITHUB_TOKEN_VALUE/g" .env.claude-copilot
        echo "✅ GitHub token configured!"
    else
        echo "⚠️  Skipping GitHub token configuration"
    fi
fi

echo ""
echo "🔧 Step 3: Verification"
echo "======================="

# Test the configuration
echo "Testing API keys..."

# Test Claude API key format
if grep -q "sk-ant-api03-" .env.claude-copilot; then
    echo "✅ Claude API key format looks correct"
else
    echo "⚠️  Claude API key format may be incorrect"
fi

# Test GitHub token format
if grep -q "github_pat_" .env.claude-copilot || grep -q "ghp_" .env.claude-copilot; then
    echo "✅ GitHub token format looks correct"
else
    echo "⚠️  GitHub token format may be incorrect"
fi

echo ""
echo "🚀 Step 4: Next Steps"
echo "====================="
echo ""
echo "1. Test your configuration:"
echo "   ./test-claude-copilot-integration.sh"
echo ""
echo "2. Start the MCP servers:"
echo "   ./start-all-servers.sh"
echo ""
echo "3. Configure Claude Desktop:"
echo "   - Open Claude Desktop"
echo "   - Go to Settings → MCP Servers"
echo "   - Add the servers from cline_mcp_settings.json"
echo ""
echo "4. Test in VS Code:"
echo "   - Open VS Code with GitHub Copilot"
echo "   - Use the enhanced AI features"
echo ""
echo "📚 Documentation: CLAUDE_COPILOT_SETUP_GUIDE.md"
echo ""
echo "🎉 Setup complete! Your Claude Desktop + GitHub Copilot integration is ready."
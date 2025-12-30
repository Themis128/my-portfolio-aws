#!/bin/bash
echo "🧪 Testing Claude Desktop + GitHub Copilot Integration"
echo "======================================================"

# Load environment
if [ -f ".env.claude-copilot" ]; then
    export $(grep -v '^#' .env.claude-copilot | xargs)
    echo "✅ Environment loaded"
else
    echo "❌ Environment file not found"
    exit 1
fi

# Test API keys
echo ""
echo "🔑 Testing API Keys:"

if [ "$CLAUDE_API_KEY" != "your_claude_api_key_here" ] && [ -n "$CLAUDE_API_KEY" ]; then
    echo "✅ Claude API key configured"
else
    echo "❌ Claude API key not configured"
fi

if [ "$GITHUB_TOKEN" != "your_github_personal_access_token_here" ] && [ -n "$GITHUB_TOKEN" ]; then
    echo "✅ GitHub token configured"
else
    echo "❌ GitHub token not configured"
fi

echo ""
echo "🎉 Basic integration test complete!"

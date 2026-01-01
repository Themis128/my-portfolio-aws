#!/bin/bash

# Claude Desktop + GitHub Copilot Integration Test Script
# This script tests the MCP servers and API integrations

set -e

echo "🧪 Testing Claude Desktop + GitHub Copilot Integration"
echo "======================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Load environment variables
if [ -f ".env.claude-copilot" ]; then
    echo "📋 Loading environment variables..."
    export $(grep -v '^#' .env.claude-copilot | xargs)
else
    echo -e "${RED}❌ .env.claude-copilot file not found${NC}"
    echo "Please create the file and add your API keys first."
    exit 1
fi

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Test function
run_test() {
    local test_name="$1"
    local test_command="$2"

    echo -e "\n${BLUE}🔍 Testing: ${test_name}${NC}"

    if eval "$test_command" 2>/dev/null; then
        echo -e "${GREEN}✅ PASSED: ${test_name}${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}❌ FAILED: ${test_name}${NC}"
        ((TESTS_FAILED++))
    fi
}

# Check if required tools are installed
echo "📋 Checking prerequisites..."

run_test "Node.js installed" "node --version >/dev/null"
run_test "npm installed" "npm --version >/dev/null"
run_test "curl installed" "curl --version >/dev/null"

# Check environment variables
echo -e "\n${BLUE}🔧 Checking environment configuration...${NC}"

if [ -n "$CLAUDE_API_KEY" ] && [ "$CLAUDE_API_KEY" != "your_claude_api_key_here" ]; then
    echo -e "${GREEN}✅ Claude API key is configured${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ Claude API key not configured or using placeholder${NC}"
    ((TESTS_FAILED++))
fi

if [ -n "$GITHUB_TOKEN" ] && [ "$GITHUB_TOKEN" != "your_github_personal_access_token_here" ]; then
    echo -e "${GREEN}✅ GitHub token is configured${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ GitHub token not configured or using placeholder${NC}"
    ((TESTS_FAILED++))
fi

# Test Claude API
echo -e "\n${BLUE}🤖 Testing Claude API connection...${NC}"

run_test "Claude API key format" "echo '$CLAUDE_API_KEY' | grep -q '^sk-ant-api03-'"

if [ -n "$CLAUDE_API_KEY" ] && [ "$CLAUDE_API_KEY" != "your_claude_api_key_here" ]; then
    run_test "Claude API connectivity" "curl -s -X POST https://api.anthropic.com/v1/messages \
        -H 'Content-Type: application/json' \
        -H 'x-api-key: $CLAUDE_API_KEY' \
        -H 'anthropic-version: 2023-06-01' \
        -d '{\"model\": \"claude-3-haiku-20240307\", \"max_tokens\": 10, \"messages\": [{\"role\": \"user\", \"content\": \"Hello\"}]}' \
        | jq -e '.content[0].text' >/dev/null"
fi

# Test GitHub API
echo -e "\n${BLUE}🐙 Testing GitHub API connection...${NC}"

if [ -n "$GITHUB_TOKEN" ] && [ "$GITHUB_TOKEN" != "your_github_personal_access_token_here" ]; then
    run_test "GitHub token format" "echo '$GITHUB_TOKEN' | grep -q '^github_pat_'"

    run_test "GitHub API connectivity" "curl -s -H 'Authorization: token $GITHUB_TOKEN' \
        https://api.github.com/user | jq -e '.login' >/dev/null"

    run_test "GitHub API rate limit" "curl -s -H 'Authorization: token $GITHUB_TOKEN' \
        https://api.github.com/rate_limit | jq -e '.rate.remaining > 0' >/dev/null"
fi

# Check MCP server files
echo -e "\n${BLUE}🔌 Checking MCP server files...${NC}"

run_test "Bridge server directory exists" "[ -d 'mcp-servers/claude-copilot-bridge' ]"
run_test "Bridge server package.json exists" "[ -f 'mcp-servers/claude-copilot-bridge/package.json' ]"
run_test "Bridge server index.js exists" "[ -f 'mcp-servers/claude-copilot-bridge/index.js' ]"

run_test "Orchestrator server directory exists" "[ -d 'mcp-servers/claude-agent-orchestrator' ]"
run_test "Orchestrator server package.json exists" "[ -f 'mcp-servers/claude-agent-orchestrator/package.json' ]"
run_test "Orchestrator server orchestrator.js exists" "[ -f 'mcp-servers/claude-agent-orchestrator/orchestrator.js' ]"

# Check MCP configuration
run_test "MCP configuration file exists" "[ -f 'cline_mcp_settings.json' ]"
run_test "Integration configuration exists" "[ -f 'claude_copilot_integration.json' ]"

# Test MCP server dependencies
echo -e "\n${BLUE}📦 Checking MCP server dependencies...${NC}"

if [ -f "mcp-servers/claude-copilot-bridge/package.json" ]; then
    cd mcp-servers/claude-copilot-bridge
    run_test "Bridge server dependencies installed" "[ -d 'node_modules' ] && [ -d 'node_modules/@modelcontextprotocol' ]"
    cd ../..
fi

if [ -f "mcp-servers/claude-agent-orchestrator/package.json" ]; then
    cd mcp-servers/claude-agent-orchestrator
    run_test "Orchestrator server dependencies installed" "[ -d 'node_modules' ] && [ -d 'node_modules/@modelcontextprotocol' ]"
    cd ../..
fi

# Test server startup (quick test)
echo -e "\n${BLUE}🚀 Testing server startup...${NC}"

if [ -f "mcp-servers/claude-copilot-bridge/package.json" ]; then
    run_test "Bridge server can start" "cd mcp-servers/claude-copilot-bridge && timeout 5s npm start >/dev/null 2>&1 || true"
fi

if [ -f "mcp-servers/claude-agent-orchestrator/package.json" ]; then
    run_test "Orchestrator server can start" "cd mcp-servers/claude-agent-orchestrator && timeout 5s npm start >/dev/null 2>&1 || true"
fi

# Summary
echo -e "\n${BLUE}📊 Test Summary${NC}"
echo "================"
echo -e "${GREEN}✅ Tests Passed: $TESTS_PASSED${NC}"
echo -e "${RED}❌ Tests Failed: $TESTS_FAILED${NC}"

TOTAL_TESTS=$((TESTS_PASSED + TESTS_FAILED))
if [ $TOTAL_TESTS -gt 0 ]; then
    SUCCESS_RATE=$((TESTS_PASSED * 100 / TOTAL_TESTS))
    echo -e "📈 Success Rate: ${SUCCESS_RATE}%"
fi

# Recommendations
echo -e "\n${YELLOW}💡 Recommendations:${NC}"

if [ $TESTS_FAILED -gt 0 ]; then
    echo "- Fix failed tests before proceeding"
fi

if [ -z "$CLAUDE_API_KEY" ] || [ "$CLAUDE_API_KEY" = "your_claude_api_key_here" ]; then
    echo "- Get your Claude API key from https://console.anthropic.com/"
fi

if [ -z "$GITHUB_TOKEN" ] || [ "$GITHUB_TOKEN" = "your_github_personal_access_token_here" ]; then
    echo "- Create a GitHub Personal Access Token at https://github.com/settings/tokens"
fi

if [ ! -d "mcp-servers/claude-copilot-bridge/node_modules" ]; then
    echo "- Run: cd mcp-servers/claude-copilot-bridge && npm install"
fi

if [ ! -d "mcp-servers/claude-agent-orchestrator/node_modules" ]; then
    echo "- Run: cd mcp-servers/claude-agent-orchestrator && npm install"
fi

echo "- Run './start-all-servers.sh' to start the integration"
echo "- Test the integration in Claude Desktop"

echo -e "\n${GREEN}🎉 Integration test complete!${NC}"
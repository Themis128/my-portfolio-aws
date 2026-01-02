#!/bin/bash

# Quick start script for GitHub Actions Monitor
# This script helps start monitoring with proper GitHub token setup

set -e

echo "🚀 Starting GitHub Actions Monitor"
echo "==================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if GitHub token is set
if [ -z "$GITHUB_TOKEN" ] || [ "$GITHUB_TOKEN" = "demo_token" ]; then
    echo -e "${YELLOW}⚠${NC}  GitHub token not set or using demo token"
    echo ""
    echo -e "${BLUE}ℹ${NC}  Please create a GitHub Personal Access Token:"
    echo "   1. Go to: https://github.com/settings/tokens"
    echo "   2. Click 'Generate new token (classic)'"
    echo "   3. Name: 'Portfolio MCP Monitor'"
    echo "   4. Scopes: repo, workflow, read:org"
    echo "   5. Copy the token"
    echo ""
    read -p "Enter your GitHub token: " -s GITHUB_TOKEN
    echo ""
    echo -e "${GREEN}✓${NC} Token configured"
else
    echo -e "${GREEN}✓${NC} GitHub token is set"
fi

# Export the token for the session
export GITHUB_TOKEN="$GITHUB_TOKEN"

# Kill any existing server
pkill -f "github-actions-monitor" 2>/dev/null || true
sleep 2

# Start the server
echo -e "${BLUE}ℹ${NC} Starting GitHub Actions Monitor server..."
cd mcp-servers/github-actions-monitor

# Start in background with proper token
WS_PORT=8081 GITHUB_TOKEN="$GITHUB_TOKEN" nohup npm start > ../../logs/github-monitor.log 2>&1 &
SERVER_PID=$!

cd ../..

# Wait for server to start
sleep 5

# Check if server is running
if kill -0 $SERVER_PID 2>/dev/null; then
    echo -e "${GREEN}✓${NC} Server started successfully (PID: $SERVER_PID)"

    # Save PID
    echo $SERVER_PID > .github-monitor-pid

    echo ""
    echo -e "${GREEN}🎉 GitHub Actions Monitor is now active!${NC}"
    echo ""
    echo -e "${BLUE}Monitoring:${NC}"
    echo "  • Repository: Themis128/my-portfolio-aws"
    echo "  • WebSocket: ws://localhost:8081"
    echo "  • Logs: logs/github-monitor.log"
    echo ""
    echo -e "${BLUE}Available tools:${NC}"
    echo "  • monitor_workflow_runs - Track deployments"
    echo "  • analyze_workflow_failure - Analyze failures"
    echo "  • create_issue_for_failure - Auto-create issues"
    echo "  • start_realtime_monitoring - Live monitoring"
    echo ""
    echo -e "${YELLOW}To stop monitoring:${NC}"
    echo "  kill \$(cat .github-monitor-pid) && rm .github-monitor-pid"
else
    echo -e "${RED}✗${NC} Failed to start server"
    echo "Check logs/github-monitor.log for details"
    exit 1
fi

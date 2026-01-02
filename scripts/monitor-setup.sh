#!/bin/bash

# GitHub Actions Monitor Setup Script
# This script helps set up and start the GitHub Actions Monitor MCP server

set -e

echo "🚀 GitHub Actions Monitor Setup"
echo "================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO_OWNER="Themis128"
REPO_NAME="my-portfolio-aws"
WS_PORT=8081

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Check if GitHub token is set
check_github_token() {
    if [ -z "$GITHUB_TOKEN" ]; then
        print_warning "GITHUB_TOKEN environment variable is not set"
        echo ""
        print_info "To create a GitHub Personal Access Token:"
        echo "1. Go to: https://github.com/settings/tokens"
        echo "2. Click 'Generate new token (classic)'"
        echo "3. Name: 'Portfolio MCP Monitor'"
        echo "4. Scopes: repo, workflow, read:org"
        echo "5. Copy the token"
        echo ""
        read -p "Enter your GitHub token: " -s GITHUB_TOKEN
        echo ""
        export GITHUB_TOKEN="$GITHUB_TOKEN"
        print_status "GitHub token set"
    else
        print_status "GitHub token is already set"
    fi
}

# Install dependencies if needed
install_dependencies() {
    if [ ! -d "mcp-servers/github-actions-monitor/node_modules" ]; then
        print_info "Installing dependencies..."
        cd mcp-servers/github-actions-monitor
        npm install > /dev/null 2>&1
        cd ../..
        print_status "Dependencies installed"
    else
        print_status "Dependencies already installed"
    fi
}

# Test GitHub API connection
test_github_connection() {
    print_info "Testing GitHub API connection..."
    if curl -s -H "Authorization: token $GITHUB_TOKEN" \
             -H "Accept: application/vnd.github.v3+json" \
             "https://api.github.com/user" | grep -q "login"; then
        print_status "GitHub API connection successful"
    else
        print_error "GitHub API connection failed"
        print_error "Please check your GitHub token and try again"
        exit 1
    fi
}

# Test repository access
test_repository_access() {
    print_info "Testing repository access..."
    if curl -s -H "Authorization: token $GITHUB_TOKEN" \
             -H "Accept: application/vnd.github.v3+json" \
             "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME" | grep -q "full_name"; then
        print_status "Repository access confirmed"
    else
        print_error "Cannot access repository $REPO_OWNER/$REPO_NAME"
        print_error "Please check repository permissions and try again"
        exit 1
    fi
}

# Start the MCP server
start_monitor_server() {
    print_info "Starting GitHub Actions Monitor MCP server..."
    print_info "WebSocket server will run on port $WS_PORT"

    # Kill any existing server
    pkill -f "node.*github-actions-monitor" 2>/dev/null || true
    sleep 2

    # Start server in background
    cd mcp-servers/github-actions-monitor
    WS_PORT=$WS_PORT GITHUB_TOKEN="$GITHUB_TOKEN" nohup npm start > ../../logs/github-monitor.log 2>&1 &
    SERVER_PID=$!

    cd ../..

    # Wait for server to start
    sleep 3

    if kill -0 $SERVER_PID 2>/dev/null; then
        print_status "Server started successfully (PID: $SERVER_PID)"

        # Save PID for later
        echo $SERVER_PID > .github-monitor-pid

        echo ""
        print_info "Server is running with the following capabilities:"
        echo "  • Real-time workflow monitoring"
        echo "  • Issue tracking and management"
        echo "  • Automated failure analysis"
        echo "  • Fix suggestions and recommendations"
        echo ""
        print_info "WebSocket endpoint: ws://localhost:$WS_PORT"
        print_info "Logs: logs/github-monitor.log"
        print_info "PID file: .github-monitor-pid"
    else
        print_error "Failed to start server"
        cat logs/github-monitor.log 2>/dev/null || echo "No log file found"
        exit 1
    fi
}

# Create logs directory
create_logs_dir() {
    mkdir -p logs
}

# Main setup function
main() {
    echo ""
    print_info "Setting up GitHub Actions Monitor for $REPO_OWNER/$REPO_NAME"
    echo ""

    create_logs_dir
    check_github_token
    install_dependencies
    test_github_connection
    test_repository_access
    start_monitor_server

    echo ""
    print_status "Setup complete!"
    echo ""
    print_info "Next steps:"
    echo "1. The server is now monitoring your repository"
    echo "2. Check logs/github-monitor.log for server output"
    echo "3. Use the MCP server tools to interact with GitHub Actions"
    echo ""
    print_info "To stop the server later, run:"
    echo "  kill \$(cat .github-monitor-pid) && rm .github-monitor-pid"
    echo ""
    print_info "To check server status:"
    echo "  curl -s http://localhost:3000/health || echo 'Server not responding'"
}

# Run main function
main "$@"

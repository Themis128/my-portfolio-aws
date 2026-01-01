#!/bin/bash

# MCP Documentation Server Management Script
# This script provides utilities for managing the MCP server

SERVER_DIR="/home/tbaltzakis/my-portfolio-aws/mcp-servers/documentation-server"
LOG_FILE="$SERVER_DIR/mcp-server.log"

echo "🤖 MCP Documentation Server Management"
echo "====================================="
echo ""
echo "ℹ️  IMPORTANT: MCP servers with stdio transport are designed to be"
echo "   started on-demand by MCP clients (like MCP Inspector)."
echo "   They are NOT meant to run as persistent background services."
echo ""
echo "📋 RECOMMENDED USAGE:"
echo "   1. Use MCP Inspector at: http://localhost:6274/"
echo "   2. Configure inspector to start server automatically"
echo "   3. Server runs only while inspector is connected"
echo ""
echo "🛠️  AVAILABLE COMMANDS:"
echo "   ./start-mcp-server.sh check    # Check if server files exist"
echo "   ./start-mcp-server.sh test     # Test server startup (5 seconds)"
echo "   ./start-mcp-server.sh clean    # Clean up log files"
echo ""

# Function to check server files
check_server() {
    echo "🔍 Checking MCP server files..."
    if [ -f "$SERVER_DIR/dist/server.js" ]; then
        echo "✅ Server executable found: $SERVER_DIR/dist/server.js"
    else
        echo "❌ Server executable not found"
        return 1
    fi
    
    if [ -f "$SERVER_DIR/.env" ]; then
        echo "✅ Environment file found: $SERVER_DIR/.env"
        if grep -q "GEMINI_API_KEY" "$SERVER_DIR/.env"; then
            echo "✅ Gemini API key configured"
        else
            echo "⚠️  Gemini API key not found in .env"
        fi
    else
        echo "❌ Environment file not found"
        return 1
    fi
    
    echo "✅ Server is ready for MCP Inspector"
}

# Function to test server
test_server() {
    echo "🧪 Testing MCP server startup..."
    cd "$SERVER_DIR"
    echo "Starting server for 5 seconds..."
    timeout 5 node dist/server.js 2>&1 | head -3
    echo "✅ Test completed (server terminated by timeout)"
}

# Function to clean logs
clean_logs() {
    echo "🧹 Cleaning up log files..."
    if [ -f "$LOG_FILE" ]; then
        rm -f "$LOG_FILE"
        echo "✅ Removed: $LOG_FILE"
    else
        echo "ℹ️  No log files to clean"
    fi
}

# Main logic
case "${1:-help}" in
    check)
        check_server
        ;;
    test)
        test_server
        ;;
    clean)
        clean_logs
        ;;
    help|*)
        cat << 'EOF'
MCP Documentation Server Management Script

USAGE:
    ./start-mcp-server.sh [command]

COMMANDS:
    check    - Verify server files and configuration
    test     - Test server startup (runs for 5 seconds)
    clean    - Remove log files
    help     - Show this help message

MCP INSPECTOR SETUP:
    1. Open: http://localhost:6274/
    2. Configure:
       - Transport: STDIO
       - Command: node
       - Arguments: dist/server.js
       - Working Directory: /home/tbaltzakis/my-portfolio-aws/mcp-servers/documentation-server
       - Environment: GEMINI_API_KEY=gen-lang-client-0524292946
    3. Click "Connect"

The server will start automatically when the inspector connects and stop when it disconnects.
EOF
        ;;
esac

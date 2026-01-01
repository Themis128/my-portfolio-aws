#!/bin/bash
echo "=== MCP Server Debug ==="
cd /home/tbaltzakis/my-portfolio-aws/mcp-servers/documentation-server
echo "Working directory: $(pwd)"
echo "Starting server..."
node dist/server.js &
SERVER_PID=$!
echo "Server PID: $SERVER_PID"
sleep 3
if ps -p $SERVER_PID > /dev/null 2>&1; then
    echo "✅ Server is running (PID: $SERVER_PID)"
    kill $SERVER_PID
else
    echo "❌ Server failed to start"
fi

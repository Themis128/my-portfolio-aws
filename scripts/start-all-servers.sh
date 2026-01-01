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

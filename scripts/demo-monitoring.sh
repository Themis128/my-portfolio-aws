#!/bin/bash

# GitHub Actions Monitor Demo Script
# This script demonstrates the monitoring capabilities

set -e

echo "🎯 GitHub Actions Monitor Demo"
echo "================================"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check if server is running
check_server_status() {
    if [ -f ".github-monitor-pid" ] && kill -0 $(cat .github-monitor-pid) 2>/dev/null; then
        print_success "GitHub Actions Monitor server is running"
        SERVER_RUNNING=true
    else
        print_warning "GitHub Actions Monitor server is not running"
        print_info "Run './scripts/monitor-setup.sh' to start the server"
        SERVER_RUNNING=false
    fi
}

# Show server capabilities
show_capabilities() {
    echo ""
    print_info "Available Monitoring Tools:"
    echo ""
    echo "🔍 Workflow Monitoring:"
    echo "  • monitor_workflow_runs - Track workflow status and history"
    echo "  • get_workflow_run_details - Detailed run information with logs"
    echo "  • analyze_workflow_failure - Root cause analysis of failures"
    echo "  • suggest_workflow_fixes - Automated fix recommendations"
    echo ""
    echo "🚨 Issue Management:"
    echo "  • monitor_issues - Track and filter GitHub issues"
    echo "  • get_issue_details - Detailed issue information"
    echo "  • create_issue_for_failure - Auto-create issues for CI failures"
    echo "  • update_issue_status - Update issue status and comments"
    echo ""
    echo "📡 Real-time Monitoring:"
    echo "  • start_realtime_monitoring - Live webhook-based monitoring"
    echo "  • stop_realtime_monitoring - Stop monitoring repositories"
    echo "  • get_monitoring_status - Check monitoring health"
}

# Show example usage
show_examples() {
    echo ""
    print_info "Example Usage Scenarios:"
    echo ""

    echo "1️⃣ Monitor Recent Workflow Runs:"
    echo '   monitor_workflow_runs({'
    echo '     owner: "Themis128",'
    echo '     repo: "my-portfolio-aws",'
    echo '     status: "completed",'
    echo '     limit: 5'
    echo '   })'
    echo ""

    echo "2️⃣ Analyze a Failed Workflow:"
    echo '   analyze_workflow_failure({'
    echo '     owner: "Themis128",'
    echo '     repo: "my-portfolio-aws",'
    echo '     run_id: 12345'
    echo '   })'
    echo ""

    echo "3️⃣ Start Real-time Monitoring:"
    echo '   start_realtime_monitoring({'
    echo '     owner: "Themis128",'
    echo '     repo: "my-portfolio-aws",'
    echo '     events: ["workflow_run", "issues"]'
    echo '   })'
    echo ""

    echo "4️⃣ Monitor Open Issues:"
    echo '   monitor_issues({'
    echo '     owner: "Themis128",'
    echo '     repo: "my-portfolio-aws",'
    echo '     state: "open",'
    echo '     labels: ["ci-failure"]'
    echo '   })'
    echo ""

    echo "5️⃣ Create Issue for CI Failure:"
    echo '   create_issue_for_failure({'
    echo '     owner: "Themis128",'
    echo '     repo: "my-portfolio-aws",'
    echo '     run_id: 12345'
    echo '   })'
}

# Show setup instructions
show_setup_instructions() {
    echo ""
    print_warning "To enable full monitoring capabilities:"
    echo ""
    echo "1. Create GitHub Personal Access Token:"
    echo "   https://github.com/settings/tokens"
    echo "   Scopes: repo, workflow, read:org"
    echo ""
    echo "2. Set environment variable:"
    echo "   export GITHUB_TOKEN=your_token_here"
    echo ""
    echo "3. Run setup script:"
    echo "   ./scripts/monitor-setup.sh"
    echo ""
    echo "4. The server will then provide real-time monitoring of:"
    echo "   • Workflow runs (success/failure)"
    echo "   • Issue creation and updates"
    echo "   • CI/CD pipeline health"
    echo "   • Automated failure analysis"
    echo "   • Fix suggestions"
}

# Show current status
show_current_status() {
    echo ""
    print_info "Current System Status:"
    echo ""

    # Check if PID file exists
    if [ -f ".github-monitor-pid" ]; then
        PID=$(cat .github-monitor-pid)
        if kill -0 $PID 2>/dev/null; then
            echo "🟢 Server PID: $PID (Running)"
        else
            echo "🔴 Server PID: $PID (Not running)"
        fi
    else
        echo "🔴 Server: Not started"
    fi

    # Check logs
    if [ -f "logs/github-monitor.log" ]; then
        echo "📄 Logs: Available (logs/github-monitor.log)"
        echo "📊 Last log entries:"
        tail -3 logs/github-monitor.log 2>/dev/null || echo "     No logs available"
    else
        echo "📄 Logs: Not available"
    fi

    # Check WebSocket
    if command -v nc >/dev/null 2>&1; then
        if nc -z localhost 8081 2>/dev/null; then
            echo "🔌 WebSocket: Connected (port 8081)"
        else
            echo "🔌 WebSocket: Not available"
        fi
    else
        echo "🔌 WebSocket: Status unknown (nc not available)"
    fi

    # Check GitHub token
    if [ -n "$GITHUB_TOKEN" ]; then
        echo "🔑 GitHub Token: Configured"
    else
        echo "🔑 GitHub Token: Not set"
    fi
}

# Main demo function
main() {
    check_server_status
    show_capabilities
    show_examples
    show_current_status

    if [ "$SERVER_RUNNING" = false ]; then
        show_setup_instructions
    fi

    echo ""
    print_success "Demo complete! The GitHub Actions Monitor is ready to watch and fix your CI/CD issues."
    echo ""
    print_info "The server provides comprehensive monitoring with:"
    echo "  • Real-time failure detection"
    echo "  • Automated issue creation"
    echo "  • Intelligent fix suggestions"
    echo "  • WebSocket live updates"
    echo "  • Integration with Claude Desktop"
}

main "$@"

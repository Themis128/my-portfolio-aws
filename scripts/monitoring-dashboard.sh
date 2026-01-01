#!/bin/bash

# Master Monitoring Dashboard
# Central hub for all monitoring tools

clear

echo "╔════════════════════════════════════════════════════════╗"
echo "║                                                        ║"
echo "║       Portfolio Monitoring Dashboard v1.0             ║"
echo "║                                                        ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

PROJECT_DIR="/home/tbaltzakis/my-portfolio-aws"
cd "$PROJECT_DIR" || exit 1

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'

show_menu() {
    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}                  MONITORING TOOLS${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${GREEN}1.${NC} ${BLUE}Health Check${NC}         - Complete system health scan"
    echo -e "${GREEN}2.${NC} ${BLUE}Status Check${NC}         - Quick status overview"
    echo -e "${GREEN}3.${NC} ${BLUE}Deployment Monitor${NC}   - Watch Amplify deployment"
    echo -e "${GREEN}4.${NC} ${BLUE}Lambda Logs${NC}          - Real-time Lambda logs"
    echo -e "${GREEN}5.${NC} ${BLUE}Performance Metrics${NC}  - Lambda performance & costs"
    echo -e "${GREEN}6.${NC} ${BLUE}Test Contact Form${NC}   - API test tool"
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${MAGENTA}                   QUICK LINKS${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${GREEN}7.${NC} Open Amplify Console   - AWS Amplify dashboard"
    echo -e "${GREEN}8.${NC} Open CloudWatch        - AWS CloudWatch logs"
    echo -e "${GREEN}9.${NC} Open GitHub Repo       - View source code"
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}                  DOCUMENTATION${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${GREEN}10.${NC} View Monitoring Guide  - Comprehensive guide"
    echo -e "${GREEN}11.${NC} View Where to Check    - Log locations"
    echo -e "${GREEN}12.${NC} View Fixes Summary     - What was fixed"
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${RED}0.${NC} Exit"
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
    echo ""
}

open_url() {
    URL=$1
    
    # Try different methods to open URL
    if command -v wslview &> /dev/null; then
        wslview "$URL" &> /dev/null &
    elif command -v xdg-open &> /dev/null; then
        xdg-open "$URL" &> /dev/null &
    elif command -v open &> /dev/null; then
        open "$URL" &> /dev/null &
    else
        echo ""
        echo -e "${BLUE}Open this URL in your browser:${NC}"
        echo "$URL"
        echo ""
        read -p "Press Enter to continue..."
    fi
}

run_tool() {
    TOOL=$1
    
    if [ -f "$TOOL" ]; then
        chmod +x "$TOOL"
        clear
        ./"$TOOL"
        echo ""
        read -p "Press Enter to return to menu..."
    else
        echo -e "${RED}Error: $TOOL not found${NC}"
        read -p "Press Enter to continue..."
    fi
}

view_doc() {
    DOC=$1
    
    if [ -f "$DOC" ]; then
        clear
        if command -v less &> /dev/null; then
            less "$DOC"
        else
            cat "$DOC"
            echo ""
            read -p "Press Enter to continue..."
        fi
    else
        echo -e "${RED}Error: $DOC not found${NC}"
        read -p "Press Enter to continue..."
    fi
}

# Main loop
while true; do
    clear
    show_menu
    
    read -p "Select option [0-12]: " choice
    echo ""
    
    case $choice in
        1)
            run_tool "health-check.sh"
            ;;
        2)
            run_tool "status-check.sh"
            ;;
        3)
            run_tool "monitor-deployment.sh"
            ;;
        4)
            run_tool "watch-lambda-logs.sh"
            ;;
        5)
            run_tool "performance-monitor.sh"
            ;;
        6)
            run_tool "test-contact-form.sh"
            ;;
        7)
            echo "Opening Amplify Console..."
            open_url "https://eu-central-1.console.aws.amazon.com/amplify/home?region=eu-central-1"
            ;;
        8)
            echo "Opening CloudWatch..."
            open_url "https://eu-central-1.console.aws.amazon.com/cloudwatch/home?region=eu-central-1"
            ;;
        9)
            echo "Opening GitHub Repository..."
            open_url "https://github.com/Themis128/my-portfolio-aws"
            ;;
        10)
            view_doc "MONITORING-GUIDE.md"
            ;;
        11)
            view_doc "WHERE-TO-CHECK-LOGS.md"
            ;;
        12)
            view_doc "FIXES-SUMMARY.md"
            ;;
        0)
            echo -e "${GREEN}Goodbye!${NC}"
            echo ""
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid option. Please try again.${NC}"
            sleep 2
            ;;
    esac
done

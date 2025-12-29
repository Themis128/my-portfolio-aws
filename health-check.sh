#!/bin/bash

# Health Check Dashboard
# Comprehensive health check for the entire system

clear

echo "╔════════════════════════════════════════════════════════╗"
echo "║         Portfolio Health Check Dashboard              ║"
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
NC='\033[0m'

PASS=0
FAIL=0
WARN=0

check_pass() {
    echo -e "${GREEN}✓${NC} $1"
    ((PASS++))
}

check_fail() {
    echo -e "${RED}✗${NC} $1"
    ((FAIL++))
}

check_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARN++))
}

# 1. Repository Health
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📦 Repository Health${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if [ -d ".git" ]; then
    check_pass "Git repository initialized"
    
    BRANCH=$(git branch --show-current)
    if [ "$BRANCH" = "master" ] || [ "$BRANCH" = "main" ]; then
        check_pass "On main branch: $BRANCH"
    else
        check_warn "On branch: $BRANCH (not main/master)"
    fi
    
    UNPUSHED=$(git log origin/master..HEAD 2>/dev/null | wc -l)
    if [ $UNPUSHED -eq 0 ]; then
        check_pass "All commits pushed to remote"
    else
        check_warn "$UNPUSHED commit(s) not pushed"
    fi
    
    UNCOMMITTED=$(git status -s | wc -l)
    if [ $UNCOMMITTED -eq 0 ]; then
        check_pass "No uncommitted changes"
    else
        check_warn "$UNCOMMITTED file(s) with uncommitted changes"
    fi
else
    check_fail "Not a git repository"
fi
echo ""

# 2. Build Status
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🏗️  Build Status${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if [ -d "node_modules" ]; then
    check_pass "Dependencies installed"
else
    check_fail "Dependencies not installed (run: npm install)"
fi

if [ -d ".next" ]; then
    check_pass "Next.js cache exists"
    
    BUILD_ID=$(cat .next/BUILD_ID 2>/dev/null)
    if [ ! -z "$BUILD_ID" ]; then
        check_pass "Build ID: $BUILD_ID"
    fi
else
    check_warn "No .next directory (run: npm run build)"
fi

if [ -d "out" ]; then
    OUT_SIZE=$(du -sh out 2>/dev/null | cut -f1)
    check_pass "Static build output exists ($OUT_SIZE)"
    
    if [ -f "out/index.html" ]; then
        check_pass "index.html generated"
    else
        check_fail "index.html missing in output"
    fi
else
    check_fail "No build output (run: npm run build)"
fi
echo ""

# 3. Configuration Files
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}⚙️  Configuration${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Check essential files
ESSENTIAL_FILES=(
    "package.json"
    "next.config.ts"
    "tsconfig.json"
    "amplify.yml"
    "amplify_outputs.json"
)

for file in "${ESSENTIAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        check_pass "$file exists"
    else
        check_fail "$file missing"
    fi
done

# Check new files
if [ -f "lib/amplify-client-config.ts" ]; then
    check_pass "Client Amplify config exists"
else
    check_fail "Client Amplify config missing"
fi

if [ -f "components/Contact.tsx" ]; then
    if grep -q "amplify-client-config" "components/Contact.tsx"; then
        check_pass "Contact.tsx uses client config"
    else
        check_warn "Contact.tsx may need client config import"
    fi
fi
echo ""

# 4. Amplify Configuration
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}⚡ Amplify Backend${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if [ -f "amplify_outputs.json" ]; then
    check_pass "amplify_outputs.json present"
    
    API_URL=$(grep -o '"url":"[^"]*"' amplify_outputs.json | head -1 | cut -d'"' -f4)
    if [ ! -z "$API_URL" ]; then
        check_pass "API endpoint configured"
        echo "   $API_URL"
    else
        check_fail "API endpoint not found"
    fi
    
    API_KEY=$(grep -o '"api_key":"[^"]*"' amplify_outputs.json | head -1 | cut -d'"' -f4)
    if [ ! -z "$API_KEY" ]; then
        check_pass "API key configured"
    else
        check_fail "API key not found"
    fi
else
    check_fail "amplify_outputs.json missing"
fi

if [ -d "amplify/backend" ]; then
    check_pass "Amplify backend configured"
    
    if [ -f "amplify/backend/function/contact-handler/handler.ts" ]; then
        check_pass "Contact handler Lambda exists"
    else
        check_fail "Contact handler missing"
    fi
    
    if [ -f "amplify/backend/data/resource.ts" ]; then
        check_pass "Data schema configured"
    else
        check_fail "Data schema missing"
    fi
else
    check_fail "Amplify backend not configured"
fi
echo ""

# 5. Documentation
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📚 Documentation${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

DOCS=(
    "README.md"
    "FIXES-SUMMARY.md"
    "DEPLOYMENT-FIXES.md"
    "MONITORING-GUIDE.md"
    "WHERE-TO-CHECK-LOGS.md"
)

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        check_pass "$doc"
    else
        check_warn "$doc missing"
    fi
done
echo ""

# 6. Deployment Scripts
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🚀 Deployment Tools${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

SCRIPTS=(
    "deploy-fixed.sh"
    "build-portfolio.sh"
    "monitor-deployment.sh"
    "status-check.sh"
    "watch-lambda-logs.sh"
    "test-contact-form.sh"
    "health-check.sh"
)

for script in "${SCRIPTS[@]}"; do
    if [ -f "$script" ]; then
        if [ -x "$script" ]; then
            check_pass "$script (executable)"
        else
            check_warn "$script (not executable - run: chmod +x $script)"
        fi
    else
        check_warn "$script missing"
    fi
done
echo ""

# 7. AWS CLI Check
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🔧 Tools${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if command -v aws &> /dev/null; then
    check_pass "AWS CLI installed"
    AWS_VERSION=$(aws --version 2>&1 | cut -d' ' -f1)
    echo "   $AWS_VERSION"
    
    # Check credentials
    if aws sts get-caller-identity &> /dev/null; then
        check_pass "AWS credentials configured"
    else
        check_warn "AWS credentials not configured"
    fi
else
    check_warn "AWS CLI not installed (optional for monitoring)"
fi

if command -v jq &> /dev/null; then
    check_pass "jq installed (JSON parser)"
else
    check_warn "jq not installed (optional, improves output)"
fi

if command -v git &> /dev/null; then
    check_pass "Git installed"
else
    check_fail "Git not installed"
fi

if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version 2>&1)
    check_pass "Node.js installed ($NODE_VERSION)"
else
    check_warn "Node.js not in PATH"
fi

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version 2>&1)
    check_pass "npm installed ($NPM_VERSION)"
else
    check_warn "npm not in PATH"
fi
echo ""

# Summary
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📊 Summary${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}✓ Passed:${NC}  $PASS"
echo -e "${YELLOW}⚠ Warnings:${NC} $WARN"
echo -e "${RED}✗ Failed:${NC}  $FAIL"
echo ""

# Overall status
TOTAL=$((PASS + WARN + FAIL))
SCORE=$((PASS * 100 / TOTAL))

if [ $FAIL -eq 0 ] && [ $SCORE -ge 90 ]; then
    echo -e "${GREEN}🎉 System Health: EXCELLENT ($SCORE%)${NC}"
    echo "   Your portfolio is ready for production!"
elif [ $FAIL -eq 0 ] && [ $SCORE -ge 70 ]; then
    echo -e "${YELLOW}✓ System Health: GOOD ($SCORE%)${NC}"
    echo "   Minor improvements possible but system is functional"
elif [ $FAIL -le 2 ]; then
    echo -e "${YELLOW}⚠ System Health: FAIR ($SCORE%)${NC}"
    echo "   Some issues need attention"
else
    echo -e "${RED}⚠ System Health: NEEDS ATTENTION ($SCORE%)${NC}"
    echo "   Please resolve critical issues above"
fi
echo ""

# Quick Actions
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🎯 Quick Actions${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ $FAIL -gt 0 ]; then
    echo "Priority fixes:"
    [ ! -d "node_modules" ] && echo "  • npm install"
    [ ! -d "out" ] && echo "  • npm run build"
    [ ! -f "amplify_outputs.json" ] && echo "  • cd amplify && npx amplify push"
    echo ""
fi

echo "Available commands:"
echo "  ./status-check.sh          - Quick status overview"
echo "  ./test-contact-form.sh     - Test contact form API"
echo "  ./watch-lambda-logs.sh     - Watch Lambda logs live"
echo "  ./monitor-deployment.sh    - Monitor Amplify deployment"
echo ""
echo "View documentation:"
echo "  cat WHERE-TO-CHECK-LOGS.md"
echo "  cat MONITORING-GUIDE.md"
echo ""

echo "Last checked: $(date)"
echo ""

#!/bin/bash

# Build Log Interpreter
# Paste your Amplify logs here and get instant analysis

echo "╔════════════════════════════════════════════════════════╗"
echo "║            Build Log Interpreter v1.0                 ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}HOW TO USE THIS TOOL:${NC}"
echo ""
echo "1. Copy logs from Amplify Console"
echo "2. Create a file: logs.txt"
echo "3. Paste logs into logs.txt"
echo "4. Run: ./interpret-logs.sh logs.txt"
echo ""
echo "OR paste logs directly when prompted below:"
echo ""

# Check if log file provided
if [ -z "$1" ]; then
    echo -e "${YELLOW}No log file provided. Here's how to interpret common log patterns:${NC}"
    echo ""
else
    LOG_FILE="$1"
    if [ ! -f "$LOG_FILE" ]; then
        echo -e "${RED}Error: File $LOG_FILE not found${NC}"
        exit 1
    fi
    echo -e "${GREEN}Analyzing $LOG_FILE...${NC}"
    echo ""
fi

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}📖 LOG PATTERN GUIDE${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "${GREEN}✅ SUCCESS PATTERNS:${NC}"
echo ""

cat << 'EOF'
PROVISION Phase Success:
  "Build environment configured with Standard build compute type"
  "Successfully retrieved Git provider SSH public keys"
  "Cloning into 'my-portfolio-aws'..."
  "Retrieved cache"
  ✅ Meaning: Environment is ready, code downloaded

BUILD Phase Success - npm ci:
  "npm ci"
  "added X packages in Xs"
  ✅ Meaning: Dependencies installed successfully

BUILD Phase Success - Next.js Build:
  "Creating an optimized production build"
  "Linting and checking validity of types"
  "Compiled successfully"
  "Collecting page data"
  "Generating static pages (X/X)"
  "Finalizing page optimization"
  "Export successful. Files written to /codebuild/output/.../out"
  ✅ Meaning: Build completed successfully!

DEPLOY Phase Success:
  "Starting deployment"
  "Uploading artifacts"
  "Deployment complete"
  ✅ Meaning: Files uploaded to CDN

VERIFY Phase Success:
  "Deployment verification started"
  "Deployment verification complete"
  ✅ Meaning: Site is live!

EOF

echo ""
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${RED}🚨 ERROR PATTERNS & FIXES:${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

cat << 'EOF'
ERROR 1: npm Installation Failed
Pattern: "npm ERR! code ELIFECYCLE"
Pattern: "npm ERR! errno 1"
Pattern: "Error: Command failed: npm ci"

Causes:
  • Package-lock.json conflict
  • Missing dependency
  • Version incompatibility

Fix:
  1. Delete package-lock.json
  2. Run: npm install
  3. Commit new package-lock.json
  4. Push again

─────────────────────────────────────────────────────────

ERROR 2: TypeScript Compilation Failed
Pattern: "Type error:"
Pattern: "TS2307: Cannot find module"
Pattern: "TS2345: Argument of type"

Causes:
  • Missing type definitions
  • Import path wrong
  • Type mismatch

Fix:
  1. Check the file mentioned in error
  2. Fix import paths
  3. Install missing @types packages
  4. Fix type errors locally first

─────────────────────────────────────────────────────────

ERROR 3: Module Not Found
Pattern: "Module not found: Can't resolve"
Pattern: "Error: Cannot find module"

Causes:
  • Wrong import path
  • Missing dependency
  • Case-sensitive path issue

Fix:
  1. Check import statement
  2. Verify file exists
  3. Check case sensitivity (Contact.tsx vs contact.tsx)
  4. Install missing package

─────────────────────────────────────────────────────────

ERROR 4: Build Failed - Next.js
Pattern: "Failed to compile"
Pattern: "Error occurred prerendering page"
Pattern: "Error: Export encountered errors"

Causes:
  • Runtime error in component
  • API call during build
  • Invalid static export

Fix:
  1. Check component code
  2. Ensure no browser-only code in SSR
  3. Fix async data fetching
  4. Test locally: npm run build

─────────────────────────────────────────────────────────

ERROR 5: Backend Deployment Failed
Pattern: "Amplify push failed"
Pattern: "Backend environment deployment failed"
Pattern: "Lambda function deployment failed"

Causes:
  • IAM permission issue
  • Lambda code error
  • Resource conflict

Fix:
  1. Check amplify/backend files
  2. Verify Lambda handler.ts
  3. Check CloudWatch for Lambda errors
  4. Redeploy backend: amplify push

─────────────────────────────────────────────────────────

ERROR 6: Out of Memory
Pattern: "JavaScript heap out of memory"
Pattern: "FATAL ERROR: Reached heap limit"

Causes:
  • Build too large
  • Memory leak in build
  • Too many dependencies

Fix:
  1. Reduce dependencies
  2. Optimize imports
  3. Increase build memory in amplify.yml

EOF

echo ""
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}⚠️  WARNING PATTERNS (Usually OK):${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

cat << 'EOF'
WARNING 1: Deprecated Packages
Pattern: "npm WARN deprecated"
Impact: LOW - Usually safe to ignore
Action: Optional - update packages when convenient

WARNING 2: Peer Dependencies
Pattern: "npm WARN ERESOLVE"
Pattern: "Could not resolve dependency"
Impact: LOW - Usually works fine
Action: Only fix if app breaks

WARNING 3: SSM Secrets
Pattern: "Failed to set up process.env.secrets"
Impact: NONE - Expected if no secrets configured
Action: None needed

WARNING 4: Backend Already Exists
Pattern: "BackendEnvironment master already exists"
Impact: NONE - Normal for redeployments
Action: None needed

EOF

echo ""
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}🔍 ANALYZING YOUR LOGS${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

if [ -n "$LOG_FILE" ] && [ -f "$LOG_FILE" ]; then
    echo "Checking for common patterns..."
    echo ""
    
    # Check for success patterns
    if grep -q "Compiled successfully" "$LOG_FILE"; then
        echo -e "${GREEN}✅ SUCCESS: Next.js compiled successfully!${NC}"
    fi
    
    if grep -q "Export successful" "$LOG_FILE"; then
        echo -e "${GREEN}✅ SUCCESS: Static export completed!${NC}"
    fi
    
    if grep -q "Deployment complete" "$LOG_FILE"; then
        echo -e "${GREEN}✅ SUCCESS: Deployment finished!${NC}"
    fi
    
    # Check for errors
    if grep -q "npm ERR!" "$LOG_FILE"; then
        echo -e "${RED}❌ ERROR: npm installation failed${NC}"
        echo "   See ERROR 1 above for fixes"
    fi
    
    if grep -q "Type error:" "$LOG_FILE"; then
        echo -e "${RED}❌ ERROR: TypeScript compilation failed${NC}"
        echo "   See ERROR 2 above for fixes"
    fi
    
    if grep -q "Module not found" "$LOG_FILE"; then
        echo -e "${RED}❌ ERROR: Module not found${NC}"
        echo "   See ERROR 3 above for fixes"
    fi
    
    if grep -q "Failed to compile" "$LOG_FILE"; then
        echo -e "${RED}❌ ERROR: Build failed${NC}"
        echo "   See ERROR 4 above for fixes"
    fi
    
    # Check for warnings
    if grep -q "npm WARN deprecated" "$LOG_FILE"; then
        echo -e "${YELLOW}⚠️  WARNING: Deprecated packages (OK to ignore)${NC}"
    fi
    
    echo ""
else
    echo -e "${CYAN}Paste your logs below and I'll analyze them:${NC}"
    echo ""
fi

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}📞 QUICK HELP${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo "If you're seeing errors:"
echo ""
echo "1. Copy the EXACT error message"
echo "2. Look for the pattern above"
echo "3. Apply the fix"
echo "4. Commit and push"
echo ""

echo "Need specific help? Share:"
echo "  • The error message"
echo "  • Which phase failed (Provision/Build/Deploy)"
echo "  • Full context around the error"
echo ""

echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo "Tool ready! Paste your logs or run:"
echo "  ./interpret-logs.sh your-log-file.txt"
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo ""

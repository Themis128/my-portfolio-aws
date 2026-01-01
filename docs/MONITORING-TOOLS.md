# 🎛️ Advanced Monitoring Tools - Complete Guide

## 📊 Overview

Your portfolio now has a comprehensive suite of monitoring tools to help you track deployment, performance, and health of your application.

## 🚀 Quick Start

### Master Dashboard (Recommended)
```bash
cd /home/tbaltzakis/my-portfolio-aws
chmod +x monitoring-dashboard.sh
./monitoring-dashboard.sh
```

This opens an interactive menu with all monitoring tools!

---

## 🛠️ Individual Tools

### 1. Health Check (`health-check.sh`)
**Purpose**: Complete system health scan

**What it checks:**
- ✅ Repository status (git, commits, branches)
- ✅ Build status (node_modules, .next, out/)
- ✅ Configuration files
- ✅ Amplify backend setup
- ✅ Documentation
- ✅ Deployment scripts
- ✅ Tools (AWS CLI, Node.js, npm)

**Usage:**
```bash
./health-check.sh
```

**Output:**
- Color-coded status for each check
- Overall health score (percentage)
- Quick action recommendations

**When to use:**
- After making changes
- Before deployment
- Troubleshooting issues
- Regular health checks

---

### 2. Status Check (`status-check.sh`)
**Purpose**: Quick status overview

**What it shows:**
- Git branch and commit status
- Build output status
- Amplify configuration
- Documentation files
- Quick action links

**Usage:**
```bash
./status-check.sh
```

**When to use:**
- Quick daily check
- Before starting work
- Verifying setup

---

### 3. Deployment Monitor (`monitor-deployment.sh`)
**Purpose**: Watch Amplify deployment in real-time

**Features:**
- Detects latest deployment automatically
- Shows build status
- Live monitoring with auto-refresh
- Direct links to AWS Console

**Usage:**
```bash
./monitor-deployment.sh
```

**Requires:** AWS CLI configured

**When to use:**
- After git push
- During deployment
- Checking deployment status

---

### 4. Lambda Logs Viewer (`watch-lambda-logs.sh`)
**Purpose**: Real-time Lambda function logs

**Features:**
- Auto-detects contactHandler function
- Live log streaming
- Filters for contact form submissions

**Usage:**
```bash
./watch-lambda-logs.sh
```

**Requires:** AWS CLI configured

**What you'll see:**
```
[INFO] Contact form submitted
[INFO] Name: John Doe, Email: john@example.com
[INFO] Sending email via SES...
[INFO] Email sent successfully
[INFO] Stored in DynamoDB
```

**When to use:**
- Testing contact form
- Debugging email issues
- Monitoring submissions

---

### 5. Performance Monitor (`performance-monitor.sh`)
**Purpose**: Lambda performance metrics and cost analysis

**Metrics shown:**
- Total invocations (last 24h)
- Error count
- Success rate
- Average duration
- Max duration
- Cost estimation (compute + requests)
- Monthly projection

**Usage:**
```bash
./performance-monitor.sh
```

**Requires:** AWS CLI configured

**Output example:**
```
Total Invocations: 15
Errors: 0
Success Rate: 100%
Average Duration: 234.56 ms
Max Duration: 567.89 ms
Total Cost (24h): $0.000123
Projected Monthly: $0.003690
```

**When to use:**
- Checking costs
- Performance optimization
- Capacity planning

---

### 6. Contact Form Tester (`test-contact-form.sh`)
**Purpose**: Test contact form API directly

**Features:**
- Direct GraphQL mutation test
- Interactive input
- Validates API connectivity
- Shows full request/response

**Usage:**
```bash
./test-contact-form.sh
```

**What it does:**
1. Reads API config from amplify_outputs.json
2. Prompts for test data (name, email, message)
3. Sends GraphQL mutation
4. Shows response
5. Provides next steps

**When to use:**
- Testing after deployment
- Verifying API works
- Debugging form issues
- Without opening browser

---

### 7. Master Dashboard (`monitoring-dashboard.sh`)
**Purpose**: Central hub for all tools

**Features:**
- Interactive menu
- All tools in one place
- Quick links to AWS consoles
- Documentation viewer
- Easy navigation

**Menu options:**
1. Health Check
2. Status Check
3. Deployment Monitor
4. Lambda Logs
5. Performance Metrics
6. Test Contact Form
7. Open Amplify Console
8. Open CloudWatch
9. Open GitHub Repo
10. View Monitoring Guide
11. View Where to Check Logs
12. View Fixes Summary
0. Exit

**Usage:**
```bash
./monitoring-dashboard.sh
```

**When to use:**
- Regular monitoring sessions
- When you need multiple tools
- Learning the system

---

## 📋 Tool Comparison

| Tool | Speed | Detail | AWS CLI Required | Use Case |
|------|-------|--------|------------------|----------|
| Status Check | ⚡ Fast | Low | ❌ No | Quick daily check |
| Health Check | 🔄 Medium | High | ❌ No | Comprehensive scan |
| Deployment Monitor | 🔄 Medium | Medium | ✅ Yes | During deployment |
| Lambda Logs | 🔄 Live | High | ✅ Yes | Debugging |
| Performance Monitor | 🔄 Medium | High | ✅ Yes | Optimization |
| Contact Tester | ⚡ Fast | Medium | ❌ No | API testing |
| Master Dashboard | ⚡ Fast | N/A | ❌ No | Navigation |

---

## 🎯 Common Workflows

### Daily Monitoring Routine
```bash
# 1. Quick check
./status-check.sh

# 2. If issues found
./health-check.sh

# 3. Check recent activity
./performance-monitor.sh
```

### After Deployment
```bash
# 1. Monitor deployment
./monitor-deployment.sh

# 2. When complete, test form
./test-contact-form.sh

# 3. Watch logs during test
./watch-lambda-logs.sh

# 4. Verify everything
./health-check.sh
```

### Troubleshooting
```bash
# 1. Identify problem
./health-check.sh

# 2. Check specific logs
./watch-lambda-logs.sh

# 3. Test API directly
./test-contact-form.sh

# 4. Check metrics
./performance-monitor.sh
```

### Performance Optimization
```bash
# 1. Baseline metrics
./performance-monitor.sh

# 2. Make changes
# (edit code)

# 3. Deploy
git push

# 4. Compare metrics
./performance-monitor.sh
```

---

## 🔧 Prerequisites

### Required (for basic tools):
- ✅ Bash shell
- ✅ Git
- ✅ Basic Unix tools (grep, awk, etc.)

### Optional (for advanced tools):
- AWS CLI v2 (for deployment monitor, lambda logs, performance monitor)
- jq (for JSON parsing - improves output formatting)

### Installing AWS CLI (if needed):
```bash
# Download and install
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configure credentials
aws configure
```

### Installing jq (optional):
```bash
# Ubuntu/Debian
sudo apt-get install jq

# Or download binary
wget https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64
chmod +x jq-linux64
sudo mv jq-linux64 /usr/local/bin/jq
```

---

## 📊 Understanding the Output

### Status Icons
- ✅ `✓` - Check passed
- ⚠️ `⚠` - Warning (not critical)
- ❌ `✗` - Failed (needs attention)
- 🟢 Green - Good/Success
- 🟡 Yellow - Warning/Caution
- 🔴 Red - Error/Failed

### Health Scores
- 90-100% - EXCELLENT ✅
- 70-89% - GOOD ✅
- 50-69% - FAIR ⚠️
- < 50% - NEEDS ATTENTION ❌

---

## 🚨 Troubleshooting

### "AWS CLI not found"
**Solution:**
```bash
# Check if installed
which aws

# If not, install (see Prerequisites)
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### "Permission denied"
**Solution:**
```bash
# Make scripts executable
chmod +x *.sh
```

### "Lambda function not found"
**Solution:**
```bash
# Ensure backend is deployed
cd amplify
npx amplify push --yes
```

### "No data available"
**Solution:**
- Submit test contact form to generate data
- Wait a few minutes for metrics to populate
- Check if function has been invoked recently

---

## 📚 Documentation Reference

### Complete Guides
- `MONITORING-GUIDE.md` - Comprehensive monitoring documentation
- `WHERE-TO-CHECK-LOGS.md` - Quick log access reference
- `FIXES-SUMMARY.md` - What was fixed and how
- `DEPLOYMENT-FIXES.md` - Technical implementation details

### Quick References
- `README.md` - Project overview
- `DEPLOYMENT-PLAN.md` - Deployment alternatives

---

## 🎓 Tips & Best Practices

### 1. Regular Monitoring
```bash
# Set up a daily routine
./status-check.sh  # Every morning
./performance-monitor.sh  # Weekly
./health-check.sh  # Before major changes
```

### 2. After Every Deployment
```bash
./monitor-deployment.sh  # During deploy
./test-contact-form.sh   # After deploy
./watch-lambda-logs.sh   # During testing
```

### 3. Before Making Changes
```bash
./health-check.sh  # Verify clean state
git status         # Check uncommitted work
```

### 4. Cost Monitoring
```bash
# Check weekly
./performance-monitor.sh

# Look for:
# - Unexpected spikes in invocations
# - High error rates
# - Slow performance (>3s average)
```

### 5. Use Master Dashboard
```bash
# Instead of remembering all commands
./monitoring-dashboard.sh

# Then select from menu
```

---

## 🔗 Quick Links

### AWS Consoles
- [Amplify Console](https://eu-central-1.console.aws.amazon.com/amplify)
- [CloudWatch Logs](https://eu-central-1.console.aws.amazon.com/cloudwatch)
- [Lambda Functions](https://eu-central-1.console.aws.amazon.com/lambda)
- [AppSync API](https://eu-central-1.console.aws.amazon.com/appsync)
- [DynamoDB Tables](https://eu-central-1.console.aws.amazon.com/dynamodbv2)
- [SES Console](https://eu-central-1.console.aws.amazon.com/ses)

### GitHub
- [Repository](https://github.com/Themis128/my-portfolio-aws)

---

## 🆘 Getting Help

If you encounter issues:

1. **Check health first:**
   ```bash
   ./health-check.sh
   ```

2. **Read the guides:**
   ```bash
   cat MONITORING-GUIDE.md
   cat WHERE-TO-CHECK-LOGS.md
   ```

3. **Check specific logs:**
   ```bash
   ./watch-lambda-logs.sh
   ```

4. **Test directly:**
   ```bash
   ./test-contact-form.sh
   ```

---

## 📈 Future Enhancements

Planned improvements:
- Email notifications for errors
- Slack integration
- Automated health checks (cron)
- Performance trending graphs
- Cost alerts
- Multi-region support

---

**Made with ❤️ for your Next.js Portfolio**

Last updated: 2025-12-29

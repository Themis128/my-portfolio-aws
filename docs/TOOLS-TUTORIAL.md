# 🎓 Monitoring Tools - Step-by-Step Tutorial

## 📊 Current Deployment Status

Based on your logs:
- ✅ **PROVISION**: Complete
- ⏳ **BUILD**: In Progress (~3 min elapsed)
- ⏳ **DEPLOY**: Waiting
- ⏳ **VERIFY**: Waiting

**Your deployment is running successfully!** 🎉

Expected completion: 7-12 more minutes

---

## 🛠️ Tool Usage Guide

### Tool 1: Status Check ✅ **EASIEST - NO SETUP NEEDED**

**What it does:** Quick overview of your project status

**How to use:**
```bash
cd /home/tbaltzakis/my-portfolio-aws
chmod +x status-check.sh
./status-check.sh
```

**When to use:**
- Every morning before starting work
- After making code changes
- Quick sanity check

**What you'll see:**
- Git branch and commit info
- Build status (node_modules, .next, out/)
- Amplify configuration status
- Documentation files
- Quick action links

**Example output:**
```
📦 Git Repository
   Branch: master
   Last Commit: f0725bb - Fix: Frontend/backend sync...
   Status: 0 files modified

🏗️  Build Status
   ✓ Build output exists (15M)
   ✓ Next.js cache exists

⚡ Amplify Configuration  
   ✓ amplify_outputs.json present
   ✓ Client config exists
```

---

### Tool 2: Health Check 🏥 **COMPREHENSIVE SCAN**

**What it does:** Deep system health analysis with scoring

**How to use:**
```bash
./health-check.sh
```

**When to use:**
- Before major deployments
- Troubleshooting issues
- Weekly health checks
- After team changes

**What it checks:**
1. **Repository Health**: Git status, branches, commits
2. **Build Status**: Dependencies, build output, cache
3. **Configuration**: All config files present
4. **Amplify Backend**: Backend setup, Lambda, data schema
5. **Documentation**: All docs present
6. **Deployment Scripts**: Scripts exist and executable
7. **Tools**: AWS CLI, Node.js, npm availability

**Example output:**
```
📦 Repository Health
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Git repository initialized
✓ On main branch: master
✓ All commits pushed to remote
✓ No uncommitted changes

📊 Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Passed:  45
⚠ Warnings: 3
✗ Failed:  0

🎉 System Health: EXCELLENT (94%)
```

**Health Score Guide:**
- 90-100%: EXCELLENT ✅ Ready for production
- 70-89%: GOOD ✅ Minor improvements possible
- 50-69%: FAIR ⚠️ Some issues need attention
- <50%: NEEDS ATTENTION ❌ Critical issues

---

### Tool 3: Deployment Monitor 📡 **REQUIRES AWS CLI**

**What it does:** Real-time Amplify deployment tracking

**Setup (one-time):**
```bash
# Install AWS CLI if not installed
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configure credentials
aws configure
# Enter: Access Key ID, Secret Access Key, Region (eu-central-1), Output (json)
```

**How to use:**
```bash
./monitor-deployment.sh
```

**When to use:**
- Right after `git push`
- During deployments
- Checking deployment status

**What you'll see:**
```
📍 Checking deployment for App ID: d3gpsu0f51cpej
📍 Region: eu-central-1

📦 Latest Deployment:
   Job ID: 123
   Status: RUNNING
   Started: 2025-12-29T07:41:15Z

⏳ Deployment in progress...

Monitoring... (Press Ctrl+C to stop)
Status: RUNNING
Status: RUNNING
Status: SUCCEED

✅ Deployment completed successfully!
```

---

### Tool 4: Lambda Log Viewer 📝 **REQUIRES AWS CLI**

**What it does:** Live streaming of Lambda function logs

**How to use:**
```bash
./watch-lambda-logs.sh
```

**When to use:**
- After submitting contact form
- Debugging email issues
- Monitoring Lambda performance
- Real-time troubleshooting

**What you'll see:**
```
✅ Found: contactHandler-abc123

📊 Log Group: /aws/lambda/contactHandler-abc123
📍 Region: eu-central-1

Watching logs... (Press Ctrl+C to stop)
══════════════════════════════════════════

2025-12-29 10:30:15 START RequestId: xyz-789
2025-12-29 10:30:15 [INFO] Contact form submitted
2025-12-29 10:30:15 [INFO] Name: John Doe, Email: john@example.com
2025-12-29 10:30:16 [INFO] Sending email via SES...
2025-12-29 10:30:17 [INFO] Email sent successfully to: john@example.com
2025-12-29 10:30:17 [INFO] Storing in DynamoDB...
2025-12-29 10:30:18 [INFO] DynamoDB insert successful
2025-12-29 10:30:18 END RequestId: xyz-789
2025-12-29 10:30:18 REPORT Duration: 2345.67 ms
```

**Troubleshooting:**
- **"Lambda function not found"**: Backend not deployed yet
- **"Permission denied"**: AWS credentials not configured
- **No output**: No recent submissions (submit test form)

---

### Tool 5: Performance Monitor 📊 **REQUIRES AWS CLI**

**What it does:** Lambda metrics and cost analysis

**How to use:**
```bash
./performance-monitor.sh
```

**When to use:**
- Weekly performance reviews
- Cost monitoring
- Optimization planning
- Capacity analysis

**What you'll see:**
```
📈 Invocation Metrics
─────────────────────────────────────
Total Invocations: 15
Errors: 0
Success Rate: 100%

⏱️  Performance Metrics
─────────────────────────────────────
Average Duration: 234.56 ms
Max Duration: 567.89 ms

💰 Cost Estimation
─────────────────────────────────────
Memory Allocated: 512 MB (0.5 GB)
GB-Seconds Used: 0.176
Compute Cost: $0.000003
Request Cost: $0.000003
Total Cost (24h): $0.000006
Projected Monthly: $0.000180

🎯 Optimization Recommendations
─────────────────────────────────────
✓ Function performing well
```

**What to watch:**
- **High error rate** (>5%): Check Lambda logs
- **Slow performance** (>5s): Optimize code or increase memory
- **Unexpected costs**: Check invocation count

---

### Tool 6: Contact Form Tester 🧪 **NO AWS CLI NEEDED**

**What it does:** Direct API testing without browser

**How to use:**
```bash
./test-contact-form.sh
```

**Interactive prompts:**
```
Enter test contact form data:

Name [Test User]: John Doe
Email [test@example.com]: john@example.com  
Message [Testing contact form]: This is a test!

📝 Test Data:
   Name: John Doe
   Email: john@example.com
   Message: This is a test!

Sending request...

📥 Response:
{
  "data": {
    "sendContact": "success"
  }
}

✅ SUCCESS! Contact form submitted

Next steps:
  1. Check Lambda logs: ./watch-lambda-logs.sh
  2. Check email inbox for confirmation
  3. Verify DynamoDB entry in AWS Console
```

**When to use:**
- After deployment
- Testing API directly
- Debugging without browser
- Automated testing scripts

---

### Tool 7: Master Dashboard 🎛️ **INTERACTIVE MENU**

**What it does:** Central hub for all tools

**How to use:**
```bash
./monitoring-dashboard.sh
```

**What you'll see:**
```
╔════════════════════════════════════════╗
║   Portfolio Monitoring Dashboard v1.0  ║
╚════════════════════════════════════════╝

MONITORING TOOLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Health Check         - Complete system health scan
2. Status Check         - Quick status overview
3. Deployment Monitor   - Watch Amplify deployment
4. Lambda Logs          - Real-time Lambda logs
5. Performance Metrics  - Lambda performance & costs
6. Test Contact Form    - API test tool

QUICK LINKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. Open Amplify Console
8. Open CloudWatch
9. Open GitHub Repo

DOCUMENTATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
10. View Monitoring Guide
11. View Where to Check Logs
12. View Fixes Summary

0. Exit

Select option [0-12]:
```

**When to use:**
- Regular monitoring sessions
- When you don't remember command names
- Accessing documentation
- Opening AWS consoles

---

## 🎯 Recommended Workflow

### Daily Routine:
```bash
# Morning check
./status-check.sh

# If issues found
./health-check.sh
```

### After Deployment:
```bash
# 1. Monitor deployment
./monitor-deployment.sh

# 2. When complete, test
./test-contact-form.sh

# 3. Watch logs during test
./watch-lambda-logs.sh

# 4. Verify health
./health-check.sh
```

### Troubleshooting:
```bash
# 1. Identify issue
./health-check.sh

# 2. Check logs
./watch-lambda-logs.sh

# 3. Test API
./test-contact-form.sh

# 4. Check metrics
./performance-monitor.sh
```

### Performance Review (Weekly):
```bash
./performance-monitor.sh
```

---

## 🔧 AWS CLI Setup (For Advanced Tools)

**Tools that need AWS CLI:**
- Deployment Monitor
- Lambda Log Viewer
- Performance Monitor

**Quick Setup:**
```bash
# 1. Install
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# 2. Verify
aws --version

# 3. Configure
aws configure
```

**You'll need:**
- AWS Access Key ID
- AWS Secret Access Key
- Default region: `eu-central-1`
- Default output: `json`

**Get credentials from:**
- AWS Console → IAM → Users → Your User → Security Credentials
- Create access key if needed

---

## 💡 Pro Tips

1. **Use Master Dashboard** when starting out
2. **Run status-check.sh daily** - it's fast
3. **Run health-check.sh weekly** - catches issues early
4. **Watch Lambda logs** when testing contact form
5. **Check performance weekly** - monitor costs

---

## 🆘 Common Issues

### "Permission denied"
```bash
chmod +x *.sh
```

### "AWS CLI not found" (for advanced tools)
```bash
# Install AWS CLI (see setup section)
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
```

### "Lambda function not found"
```bash
# Deploy backend first
cd amplify
npx amplify push --yes
```

### "No data available"
- Submit a test contact form first
- Wait a few minutes for metrics to populate

---

## 🎉 Your Current Deployment

**Status:** ✅ Running Successfully

**Progress:**
- ✅ Provision Complete
- ⏳ Build In Progress (3+ minutes)
- ⏳ Deploy Waiting
- ⏳ Verify Waiting

**What's being built:**
- ✅ Frontend/backend sync fixes
- ✅ Client Amplify configuration
- ✅ Unified contact form flow

**Expected completion:** 7-12 more minutes

**Monitor at:** https://eu-central-1.console.aws.amazon.com/amplify

---

**Ready to test the tools? Start with:**
```bash
./monitoring-dashboard.sh
```

Or jump directly to any tool above! 🚀

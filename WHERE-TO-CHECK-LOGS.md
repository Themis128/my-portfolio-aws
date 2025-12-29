# 📊 Where to Check Your Deployment Logs

## 🎯 Quick Access Links

### 1. AWS Amplify Console (PRIMARY)
**Direct Link**: https://eu-central-1.console.aws.amazon.com/amplify/home?region=eu-central-1

**What you'll see:**
- ✅ Build progress (Provision → Build → Deploy → Verify)
- ✅ Real-time build logs
- ✅ Deployment history
- ✅ Live site URL
- ✅ Environment variables
- ✅ Domain settings

**How to use:**
1. Click on your app name
2. Click on the latest build/deployment
3. Expand each step to see detailed logs

---

### 2. CloudWatch Logs (DETAILED)
**Direct Link**: https://eu-central-1.console.aws.amazon.com/cloudwatch/home?region=eu-central-1#logsV2:log-groups

**Log Groups to Check:**

#### A. Lambda Function Logs
**Path**: `/aws/lambda/contactHandler-XXX`

**What to look for:**
```
START RequestId: abc-123
INFO: Processing contact form submission
INFO: Name: John Doe, Email: john@example.com  
INFO: Sending email via SES...
INFO: Email sent successfully to: john@example.com
INFO: Storing in DynamoDB...
INFO: DynamoDB insert successful
END RequestId: abc-123
REPORT Duration: 1234.56 ms
```

**Common Errors:**
- `Permission denied` - IAM role issue
- `SES Email not verified` - Email domain not verified
- `Timeout` - Lambda taking too long

#### B. AppSync API Logs
**Path**: `/aws/appsync/apis/XXXX`

**What to look for:**
```
Mutation: sendContact
Variables: {name: "John", email: "john@example.com", message: "Test"}
Status: 200
Response: "success"
```

**Common Errors:**
- `Unauthorized` - API key expired or missing
- `ValidationError` - Missing required fields
- `Internal server error` - Lambda function failed

---

## 🔍 Step-by-Step Monitoring

### Immediately After Git Push

**Step 1: Open Amplify Console**
```
https://eu-central-1.console.aws.amazon.com/amplify
```

**Step 2: Find Your App**
- Look for: `my-portfolio-aws`
- Branch: `master`
- Status will show: Running → Succeeded/Failed

**Step 3: Click on Current Build**
You'll see 4 stages:

1. **PROVISION** (~1 min)
   - Setting up build container
   - Installing system dependencies

2. **BUILD** (~5-8 min)
   - npm install
   - npm run build
   - Creating static files in `/out`

3. **DEPLOY** (~2 min)
   - Uploading to CDN
   - Backend deployment

4. **VERIFY** (~1 min)
   - Health checks
   - Final verification

**Step 4: Check Each Stage**
Click to expand and see:
- Command output
- Error messages (if any)
- Time taken
- Exit status

---

## 🧪 After Deployment - Testing

### Test 1: Site Loads

**Get URL from Amplify Console:**
```
Domain: https://master.dXXXXX.amplifyapp.com
```

**Check:**
- ✅ Site loads
- ✅ No 404 errors
- ✅ All images load
- ✅ Navigation works

### Test 2: Contact Form

**Open Browser DevTools** (F12)

**Submit test contact:**
1. Fill form with test data
2. Click Submit
3. Watch Network tab for API calls

**In Network tab, look for:**
```
Request URL: https://XXXX.appsync-api.eu-central-1.amazonaws.com/graphql
Method: POST
Status: 200
Response: {"data": {"sendContact": "success"}}
```

### Test 3: Check Lambda Logs

**After submitting form:**

1. Go to CloudWatch Logs
2. Navigate to `/aws/lambda/contactHandler-XXX`
3. Click on latest log stream
4. Verify successful execution

**You should see:**
```
[INFO] Contact form submitted
[INFO] Sending email...
[INFO] Email sent to: your@email.com
[INFO] Stored in DynamoDB
```

### Test 4: Verify Email

**Check your inbox for:**
- From: noreply@cloudless.gr
- Subject: Thank you for your message - Baltzakis Themis
- Body: Confirmation with your message

---

## 📱 Monitoring Tools

### Tool 1: Status Check Script (Quick)
```bash
cd /home/tbaltzakis/my-portfolio-aws
chmod +x status-check.sh
./status-check.sh
```

Shows:
- Git status
- Build output status
- Amplify configuration
- Quick action links

### Tool 2: Monitor Script (Live)
```bash
chmod +x monitor-deployment.sh
./monitor-deployment.sh
```

Monitors deployment in real-time using AWS CLI.

### Tool 3: AWS Console (Comprehensive)
Use the web consoles for full details:
- Amplify: Build logs, deployment history
- CloudWatch: Function logs, metrics, alarms
- AppSync: API metrics, queries
- DynamoDB: Data inspection
- SES: Email delivery logs

---

## 🚨 Troubleshooting

### Build Fails

**Where to check:**
1. Amplify Console → Latest Build → BUILD step
2. Look for error message

**Common errors:**
```
npm ERR! - Missing dependencies
npm ERR! - TypeScript errors
npm ERR! - Build timeout
```

**Solution:**
```bash
# Test locally first
npm run build

# Fix errors, then push
git add .
git commit -m "Fix: Build errors"
git push
```

### Contact Form Not Working

**Where to check:**
1. Browser console (F12)
2. CloudWatch Lambda logs
3. AppSync API logs

**Common issues:**
- API key expired
- Lambda permissions
- SES email not verified

**Solution:**
```bash
# Redeploy backend
cd amplify
npx amplify push --yes
```

### No Email Received

**Where to check:**
1. CloudWatch Lambda logs (did it try to send?)
2. SES Console → Email Sending → Bounces/Complaints
3. Spam folder

**Verify:**
```bash
# Check SES verified emails
aws ses list-verified-email-addresses --region eu-central-1
```

Should include: `noreply@cloudless.gr`

---

## 📈 Metrics Dashboard

### What to Monitor Long-Term

**In CloudWatch:**

1. **Lambda Invocations**
   - How many times contact form was submitted
   - Success rate

2. **Lambda Errors**
   - Any failed submissions
   - Error rate

3. **Lambda Duration**
   - How long each submission takes
   - Average: should be < 3 seconds

4. **API Requests**
   - Total GraphQL requests
   - Error rate

### Set Up Alarms (Optional)

Create alarms for:
- Lambda errors > 5 in 5 minutes
- Lambda duration > 10 seconds
- API error rate > 10%

---

## ✅ Deployment Complete Checklist

After checking logs, verify:

- [ ] Amplify build: All stages green ✅
- [ ] Site loads: No errors
- [ ] Contact form: Submits successfully
- [ ] Email: Confirmation received
- [ ] Lambda logs: No errors
- [ ] CloudWatch: Clean logs
- [ ] Browser console: No errors
- [ ] Mobile: Works on phone

---

## 📞 Get Help

**If deployment fails:**
1. Check Amplify build logs first
2. Review error messages
3. Check MONITORING-GUIDE.md for solutions
4. Test locally: `npm run build`

**If contact form fails:**
1. Check Lambda logs in CloudWatch
2. Verify SES email in AWS SES Console
3. Check API key hasn't expired
4. Review DEPLOYMENT-FIXES.md

**Useful Commands:**
```bash
# View documentation
cat MONITORING-GUIDE.md
cat FIXES-SUMMARY.md

# Check status
./status-check.sh

# Monitor live
./monitor-deployment.sh

# Test build locally
npm run build
```

---

**Your deployment is live!** 🎉

Check the links above to monitor and verify everything is working correctly.

# 📝 Deployment Monitoring Guide

## Quick Links

### AWS Amplify Console
**Main Dashboard**: https://eu-central-1.console.aws.amazon.com/amplify/home?region=eu-central-1

From here you can:
- ✅ View build progress in real-time
- ✅ See build logs
- ✅ Check deployment status
- ✅ View your live site URL

### CloudWatch Logs
**Logs Dashboard**: https://eu-central-1.console.aws.amazon.com/cloudwatch/home?region=eu-central-1#logsV2:log-groups

Look for these log groups:
- `/aws/lambda/contactHandler-*` - Contact form Lambda function
- `/aws/appsync/apis/*` - GraphQL API logs

---

## 🔍 Monitoring Your Deployment

### Method 1: AWS Amplify Console (Recommended)

1. **Go to Amplify Console**
   ```
   https://eu-central-1.console.aws.amazon.com/amplify
   ```

2. **Select your app** (my-portfolio-aws)

3. **View the latest build**
   - You'll see: `master` branch
   - Build status: Running/Succeeded/Failed
   - Live URL once deployed

4. **Click on the build** to see detailed logs:
   - Provision
   - Build
   - Deploy
   - Verify

### Method 2: Using AWS CLI (Terminal)

If you have AWS CLI configured:

```bash
# List recent deployments
aws amplify list-jobs \
    --app-id YOUR_APP_ID \
    --branch-name master \
    --region eu-central-1

# Get specific job details
aws amplify get-job \
    --app-id YOUR_APP_ID \
    --branch-name master \
    --job-id JOB_ID \
    --region eu-central-1
```

Or run the monitoring script:
```bash
chmod +x monitor-deployment.sh
./monitor-deployment.sh
```

### Method 3: GitHub Integration

Since your Amplify is connected to GitHub:
- Check your GitHub repository commits
- Amplify automatically builds on each push to `master`
- Build status appears in GitHub commit status

---

## 🧪 Testing After Deployment

### 1. Check Build Status

**In Amplify Console, verify:**
- ✅ Provision: Succeeded
- ✅ Build: Succeeded  
- ✅ Deploy: Succeeded
- ✅ Verify: Succeeded

### 2. Visit Your Live Site

Get the URL from Amplify Console (should be something like):
```
https://master.XXXXX.amplifyapp.com
```

### 3. Test Contact Form

1. Navigate to the Contact section
2. Fill in test data:
   - Name: Test User
   - Email: your@email.com
   - Message: Testing contact form
3. Submit the form
4. Check for success message
5. Check your email for confirmation

### 4. Check Browser Console

Open DevTools (F12) and check:
- ✅ No JavaScript errors
- ✅ No failed API calls
- ✅ Amplify configuration loaded

---

## 🔍 Checking Logs

### Amplify Build Logs

**Access**: Amplify Console → Your App → Latest Build → View Logs

Look for:
```
BUILD
✔ npm install
✔ npm run build
✔ Uploading artifacts
```

### Lambda Function Logs

**Access**: CloudWatch → Log Groups → `/aws/lambda/contactHandler-*`

After submitting contact form, check for:
```
START RequestId: xxx
Message received: {name: "Test", email: "test@example.com"}
Sending email via SES...
Email sent successfully
Storing in DynamoDB...
END RequestId: xxx
```

### AppSync API Logs

**Access**: CloudWatch → Log Groups → `/aws/appsync/apis/*`

Check for GraphQL mutations:
```
Mutation: sendContact
Status: 200
Response: success
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: Build Fails

**Symptoms**: Build status shows "Failed"

**Check**:
1. Amplify build logs for error messages
2. Look for missing dependencies
3. Check for TypeScript errors

**Solution**:
```bash
# Test build locally first
npm run build

# Fix any errors, then push again
git add .
git commit -m "Fix: Build errors"
git push
```

### Issue 2: Contact Form Not Working

**Symptoms**: Form submits but no response

**Check**:
1. Browser console for errors
2. Lambda function logs in CloudWatch
3. AppSync API status

**Common causes**:
- API key expired (check `amplify/backend/data/resource.ts`)
- SES email not verified
- Lambda function permissions

**Solution**:
```bash
# Redeploy backend
cd amplify
npx amplify push --yes
```

### Issue 3: Email Not Received

**Symptoms**: Form succeeds but no email

**Check**:
1. CloudWatch logs for Lambda function
2. SES Console for bounce/complaint
3. Email in spam folder

**Solution**:
- Verify `noreply@cloudless.gr` in AWS SES
- Check SES sending limits
- Review Lambda logs for errors

### Issue 4: "Access Denied" Errors

**Symptoms**: Lambda function fails with permission errors

**Check**:
- Lambda execution role permissions
- DynamoDB table permissions
- SES sending permissions

**Solution**:
```bash
# Redeploy with proper permissions
cd amplify
npx amplify push --yes
```

---

## 📊 Monitoring Metrics

### Key Metrics to Watch

**In Amplify Console:**
- Build time (should be ~5-10 min)
- Build frequency
- Deployment status

**In CloudWatch:**
- Lambda invocations
- Lambda errors
- Lambda duration
- API requests

### Set Up Alarms (Optional)

Create CloudWatch alarms for:
- Lambda function errors > 5
- Lambda duration > 10s
- API error rate > 10%

---

## 🎯 Expected Timeline

After `git push`:

| Time | Status | What's Happening |
|------|--------|-----------------|
| 0 min | Triggered | Amplify detects push |
| 1-2 min | Provisioning | Setting up build environment |
| 3-8 min | Building | npm install & build |
| 8-10 min | Deploying | Uploading to CDN |
| 10-12 min | Complete | ✅ Site is live |

---

## ✅ Success Checklist

After deployment, verify:

- [ ] Amplify build succeeded (all green checkmarks)
- [ ] Live site loads without errors
- [ ] Contact form is visible
- [ ] Contact form submits successfully
- [ ] Success message displays
- [ ] Email confirmation received
- [ ] No browser console errors
- [ ] Mobile responsive (test on phone)
- [ ] All sections load correctly

---

## 📞 Support Resources

### AWS Documentation
- Amplify: https://docs.amplify.aws/
- Lambda: https://docs.aws.amazon.com/lambda/
- AppSync: https://docs.aws.amazon.com/appsync/

### Check Service Status
- AWS Status: https://status.aws.amazon.com/

### Your Resources
- GitHub Repo: https://github.com/Themis128/my-portfolio-aws
- Documentation: `FIXES-SUMMARY.md`, `DEPLOYMENT-FIXES.md`

---

## 🚀 Next Steps After Successful Deployment

1. **Test thoroughly** - Submit real contact form
2. **Monitor for 24 hours** - Check CloudWatch for any issues
3. **Update domain** (if needed) - Point custom domain to Amplify
4. **Enable monitoring** - Set up CloudWatch alarms
5. **Document** - Note any custom configurations

---

**Need help?** Check the logs in the sections above or review the error messages in:
- Amplify Console build logs
- CloudWatch Lambda logs  
- Browser console (DevTools)

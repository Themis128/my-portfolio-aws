# 🎯 Quick Reference - Monitoring & Testing

## 📊 **CURRENT STATUS**

**Deployment**: #45 (In Progress)  
**Fix**: Changed amplify.yml from pnpm to npm ci  
**Started**: ~10:24 EET  
**Expected**: ~10:36-10:39 EET  

---

## 🔍 **INTERPRETING BUILD LOGS**

### Run the interpreter:
```bash
./interpret-logs.sh
```

### Or check patterns manually:

#### ✅ SUCCESS Patterns:

**PROVISION:**
```
"Build environment configured"
"Repository cloned successfully"
"Cache retrieved"
```

**BUILD:**
```
"npm ci"
"added X packages"
"Creating an optimized production build"
"Compiled successfully"
"Export successful"
```

**DEPLOY:**
```
"Uploading artifacts"
"Deployment complete"
```

**VERIFY:**
```
"Deployment verification complete"
```

---

#### ❌ ERROR Patterns & Quick Fixes:

**1. npm ERR!**
```
Error: "npm ERR! code ELIFECYCLE"
Fix: Delete package-lock.json, run npm install, commit, push
```

**2. Type Error**
```
Error: "Type error: Cannot find module"
Fix: Check import paths, install @types packages
```

**3. Module Not Found**
```
Error: "Module not found: Can't resolve"
Fix: Verify import path, check case sensitivity
```

**4. Build Failed**
```
Error: "Failed to compile"
Fix: Test locally with npm run build first
```

**5. Backend Failed**
```
Error: "Amplify push failed"
Fix: Check amplify/backend files, Lambda code
```

---

## 🧪 **POST-DEPLOYMENT TESTING**

### Automatic Test Suite:
```bash
./test-deployment.sh
```

This runs all 6 tests automatically!

---

### Manual Testing:

#### Test 1: Quick Status
```bash
./status-check.sh
```

#### Test 2: Full Health Check
```bash
./health-check.sh
```

#### Test 3: Site Access
1. Get URL from Amplify Console
2. Open in browser
3. Check: loads, no errors, all sections visible

#### Test 4: Contact Form
```bash
./test-contact-form.sh
```

Or manually:
1. Go to site
2. Fill contact form
3. Submit
4. Check success message

#### Test 5: Lambda Logs
```bash
./watch-lambda-logs.sh
```

Or CloudWatch:
https://eu-central-1.console.aws.amazon.com/cloudwatch

#### Test 6: Performance
```bash
./performance-monitor.sh
```

---

## 📋 **Testing Checklist**

After deployment succeeds:

- [ ] Site loads without errors
- [ ] All sections visible
- [ ] Images load properly
- [ ] Navigation works
- [ ] Contact form visible
- [ ] Can submit contact form
- [ ] Success message appears
- [ ] Email received
- [ ] Lambda logs show execution
- [ ] No errors in CloudWatch
- [ ] Performance metrics look good
- [ ] Health check passes

---

## 🔗 **Quick Links**

**Amplify Console (Build Logs):**
https://eu-central-1.console.aws.amazon.com/amplify

**CloudWatch (Lambda Logs):**
https://eu-central-1.console.aws.amazon.com/cloudwatch

**GitHub Commit:**
https://github.com/Themis128/my-portfolio-aws/commit/60a0229

---

## 🎯 **Common Build Log Snippets**

### Looking Good:
```
✅ "npm ci"
✅ "added 500 packages in 30s"
✅ "Creating an optimized production build"
✅ "Linting and checking validity of types"
✅ "Compiled successfully"
✅ "Collecting page data"
✅ "Generating static pages (5/5)"
✅ "Finalizing page optimization"
✅ "Export successful"
```

### Watch Out For:
```
❌ "npm ERR!"
❌ "Error: Command failed"
❌ "Type error:"
❌ "Module not found"
❌ "Failed to compile"
```

---

## 📞 **If Something Goes Wrong**

1. **Copy the error message** from Amplify Console
2. **Share it** so I can help
3. **Check the interpreter:**
   ```bash
   ./interpret-logs.sh
   ```

---

## ⏰ **Timeline Reference**

```
10:24 ✅ Fix pushed
10:25 ⏳ Provision starts
10:27 ⏳ Build starts (npm ci)
10:32 ⏳ Build continues (npm run build)
10:35 ⏳ Deploy starts
10:36 ⏳ Verify
10:37 ✅ DONE!
```

---

## 🛠️ **Available Tools**

### Monitoring:
- `./status-check.sh` - Quick overview
- `./health-check.sh` - Deep scan
- `./monitor-live.sh` - Live dashboard
- `./monitoring-dashboard.sh` - Master menu

### Testing:
- `./test-deployment.sh` - Full test suite
- `./test-contact-form.sh` - API test
- `./watch-lambda-logs.sh` - Live logs
- `./performance-monitor.sh` - Metrics

### Analysis:
- `./interpret-logs.sh` - Log analyzer
- `./analyze-deployment.sh` - Phase explainer
- `./troubleshoot-failure.sh` - Error guide

---

## 📚 **Documentation**

- **START-HERE.md** - Begin here!
- **TOOLS-TUTORIAL.md** - How to use each tool
- **MONITORING-GUIDE.md** - Complete reference
- **WHERE-TO-CHECK-LOGS.md** - Log locations
- **TEST-RESULTS.md** - Last test report
- **QUICK-REFERENCE.md** - This file!

---

## 💡 **Pro Tips**

1. **Keep Amplify Console open** - Auto-refreshes with live logs
2. **Use interpret-logs.sh** - Instant error analysis
3. **Run test-deployment.sh** - All tests in one command
4. **Check health-check.sh weekly** - Catch issues early
5. **Monitor performance-monitor.sh** - Track costs

---

## 🎊 **Success Criteria**

Your deployment is successful when:

✅ All 4 phases green in Amplify  
✅ Site loads without errors  
✅ Contact form submits  
✅ Email confirmation received  
✅ Lambda logs show execution  
✅ No errors in CloudWatch  
✅ Health check passes  

---

## 📱 **What's Next?**

After successful deployment:

1. **Test everything** - Run test-deployment.sh
2. **Share your site** - Get URL from Amplify
3. **Monitor daily** - Quick status checks
4. **Update as needed** - Git workflow is set up

---

**Keep this file handy for quick reference!** 🚀

**Current Status**: Deployment #45 running, expected completion ~10:36 EET

**Next Action**: Watch Amplify Console for build progress!

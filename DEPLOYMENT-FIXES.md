# Frontend/Backend Sync Fixes Applied

## Issues Identified and Fixed:

### 1. **Inconsistent Contact Form Mutations**
**Problem**: The Contact component and API route were using different mutations
- Contact.tsx was using `sendContact` (Lambda handler)
- API route was using `createContact` (direct DynamoDB)

**Solution**: 
- Updated Contact.tsx to consistently use `sendContact` mutation
- This ensures all contact submissions trigger the Lambda handler for SES email notifications
- Added client-side Amplify configuration import

### 2. **Static Export with API Routes Conflict**
**Problem**: `next.config.ts` has `output: 'export'` but `/app/api/contact/route.ts` exists
- API routes don't work with static exports
- This causes deployment confusion

**Solution**:
- Contact form now uses direct GraphQL mutations (client-side)
- API route should be removed as it's redundant (file: `/app/api/contact/route.ts`)
- All contact submissions go through AWS AppSync → Lambda → SES

### 3. **Client-Side Amplify Configuration**
**Problem**: Amplify configuration was only in server-side `lib/amplify.ts`

**Solution**:
- Created `lib/amplify-client-config.ts` for proper client-side configuration
- Updated Contact component to import client config
- Ensures Amplify is properly configured in the browser for static export

## Files Modified:

1. ✅ `/components/Contact.tsx` - Added amplify-client-config import, improved mutation handling
2. ✅ `/lib/amplify-client-config.ts` - NEW: Client-side Amplify configuration
3. 📝 `/app/api/contact/route.ts` - SHOULD BE REMOVED (incompatible with static export)

## Architecture Flow (After Fixes):

```
User submits form
    ↓
Contact.tsx (client component)
    ↓
Amplify GraphQL Client
    ↓
AWS AppSync API (sendContact mutation)
    ↓
Lambda Function (contactHandler)
    ↓
1. Stores in DynamoDB (via GraphQL createContact)
    2. Sends email via SES

```

## Deployment Steps:

### Step 1: Clean Build
```bash
cd /home/tbaltzakis/my-portfolio-aws
rm -rf .next out node_modules/.cache
```

### Step 2: Install Dependencies (if needed)
```bash
npm install
# or
pnpm install
```

### Step 3: Build Project
```bash
npm run build
# or
pnpm run build
```

### Step 4: Deploy Backend to Amplify
```bash
npx amplify push
# or use your deployment script
node deploy-amplify.js
```

### Step 5: Deploy Frontend to Amplify
The build will create an `/out` directory with static files.
Upload these to Amplify Hosting.

## Testing Checklist:

- [ ] Build completes without errors
- [ ] Contact form submission works
- [ ] Email notifications are received via SES
- [ ] Contact entries appear in DynamoDB
- [ ] No console errors in browser
- [ ] Form validation works correctly
- [ ] Success/error messages display properly

## Known Issues to Monitor:

1. **Node.js in WSL**: If build fails, ensure Node.js is properly installed in WSL
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **SES Email Domain**: Ensure `noreply@cloudless.gr` is verified in AWS SES

3. **API Key Expiration**: The AppSync API key expires in 30 days (check `amplify/backend/data/resource.ts`)

## Environment Variables Needed:

Make sure these are set in Amplify Console:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional - Google Analytics)
- No other environment variables needed for contact form (uses amplify_outputs.json)

## Next Steps:

1. Remove `/app/api/contact/route.ts` file (no longer needed)
2. Test build locally
3. Deploy to Amplify
4. Test contact form on production
5. Monitor CloudWatch logs for Lambda function

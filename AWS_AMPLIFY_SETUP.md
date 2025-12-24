# AWS Amplify Setup Guide

This guide will help you set up AWS Amplify as the backend for your Next.js application.

## Prerequisites

1. AWS Account with appropriate permissions
2. AWS CLI installed and configured
3. Node.js and pnpm installed

## Step 1: Install AWS Amplify CLI

```bash
npm install -g @aws-amplify/cli
```

## Step 2: Configure AWS CLI

```bash
aws configure
```

Enter your AWS Access Key ID, Secret Access Key, default region, and output format.

## Step 3: Initialize Amplify Project

```bash
amplify init
```

Follow the prompts to set up your project:
- Enter a name for the project
- Choose your default editor
- Choose the type of app you're building (javascript)
- Choose the framework (nextjs)
- Source Directory Path: `src`
- Distribution Directory Path: `dist`
- Build Command: `npm run-script build`
- Start Command: `npm run-script start`

## Step 4: Add Authentication (Cognito)

```bash
amplify add auth
```

Choose the default configuration or customize as needed.

## Step 5: Add API (AppSync GraphQL)

```bash
amplify add api
```

Choose GraphQL and follow the prompts to create your schema.

## Step 6: Add Storage (S3)

```bash
amplify add storage
```

Choose content and configure access permissions.

## Step 7: Push to AWS

```bash
amplify push
```

This will create all the AWS resources and update your configuration files.

## Step 8: Update Configuration

After running `amplify push`, your `amplifyconfiguration.json` will be automatically updated with the correct AWS resource IDs.

## Usage

### Authentication

```typescript
import { Auth } from 'aws-amplify';

// Sign up
const user = await Auth.signUp({
  username: 'email@example.com',
  password: 'password123',
  attributes: {
    email: 'email@example.com'
  }
});

// Sign in
const user = await Auth.signIn('email@example.com', 'password123');

// Sign out
await Auth.signOut();
```

### API (GraphQL)

```typescript
import { API, graphqlOperation } from 'aws-amplify';
import { listPosts } from './graphql/queries';
import { createPost } from './graphql/mutations';

// Query data
const posts = await API.graphql(graphqlOperation(listPosts));

// Mutate data
const newPost = await API.graphql(graphqlOperation(createPost, {
  input: { title: 'My Post', content: 'Post content' }
}));
```

### Storage (S3)

```typescript
import { Storage } from 'aws-amplify';

// Upload file
await Storage.put('filename.txt', file);

// Get file
const file = await Storage.get('filename.txt');

// List files
const files = await Storage.list('');
```

## Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_AWS_PROJECT_REGION=us-east-1
NEXT_PUBLIC_AWS_COGNITO_REGION=us-east-1
NEXT_PUBLIC_AWS_USER_POOLS_ID=us-east-1_xxxxxxxxx
NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_AWS_APPSYNC_GRAPHQL_ENDPOINT=https://your-api-id.appsync-api.us-east-1.amazonaws.com/graphql
NEXT_PUBLIC_AWS_APPSYNC_REGION=us-east-1
NEXT_PUBLIC_AWS_APPSYNC_AUTHENTICATION_TYPE=AMAZON_COGNITO_USER_POOLS
```

## Next.js Integration

### 1. Update Layout

Wrap your app with the AuthWrapper in `app/layout.tsx`:

```tsx
import AuthWrapper from '../src/components/AuthWrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthWrapper>
          {children}
        </AuthWrapper>
      </body>
    </html>
  );
}
```

### 2. Use in Components

```tsx
'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';

export default function Dashboard() {
  const { user, signOut } = useAuthenticator();

  return (
    <div>
      <h1>Welcome, {user?.username}!</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

## Deployment

### 1. Deploy to AWS Amplify Console

```bash
amplify add hosting
amplify publish
```

### 2. Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy

## Troubleshooting

### Common Issues

1. **CORS errors**: Ensure your S3 bucket CORS configuration allows your domain
2. **Authentication errors**: Check your Cognito user pool settings
3. **API errors**: Verify your GraphQL schema and resolvers

### Useful Commands

```bash
# Check Amplify status
amplify status

# View logs
amplify console

# Remove resources
amplify delete
```

## Security Best Practices

1. Use environment variables for sensitive configuration
2. Implement proper IAM roles and policies
3. Enable MFA for Cognito users
4. Use HTTPS for all API endpoints
5. Regularly rotate API keys and secrets

## Resources

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [Next.js with Amplify Tutorial](https://docs.amplify.aws/start/q/integration/next/)
- [AWS Amplify CLI Reference](https://docs.amplify.aws/cli/)

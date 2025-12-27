# AWS Amplify Gen 2 Portfolio Backend

This portfolio uses AWS Amplify Gen 2 for its backend services with a custom S3 bucket configuration.

## Backend Services

### Authentication (Cognito)
- User pool with email-based authentication
- Configured for future admin features

### Data API (AppSync GraphQL)
- Contact form submissions stored in DynamoDB
- Public API key authentication for contact forms

### Storage (Custom S3 Bucket)
- **Bucket**: `baltzakisthemis.com`
- **Region**: `eu-central-1`
- **Access**: Public read access for images
- **CORS**: Configured for localhost:3000 (development) and production domains

## Image Storage

All portfolio images are served from the `baltzakisthemis.com` S3 bucket:

- Profile pictures: `https://baltzakisthemis.com/images/[filename]`
- Project screenshots: `https://baltzakisthemis.com/images/portfolio/[filename]`
- Icons and assets: `https://baltzakisthemis.com/images/[category]/[filename]`

## Development

### Local Development
```bash
npm run dev
```

### Backend Deployment
```bash
npx @aws-amplify/backend-cli sandbox --once
```

### Production Deployment
```bash
npx @aws-amplify/backend-cli pipeline-deploy
```

## Configuration

- **Amplify Outputs**: `amplify_outputs.json` (contains API endpoints and configuration)
- **Environment Variables**: None required (using public bucket access)
- **CORS**: Already configured on the S3 bucket for development and production

## Security

- Contact form uses public API key (safe for contact submissions)
- Images are served with public read access
- Authentication is ready for future admin features
- No sensitive credentials exposed in frontend

## File Structure

```
amplify/
├── backend.ts              # Main backend configuration
├── data/
│   └── resource.ts         # Contact model and API
├── auth/
│   └── resource.ts         # Authentication setup
├── tsconfig.json           # TypeScript configuration
└── package.json            # Backend dependencies

lib/
├── amplify.ts              # Frontend Amplify configuration
├── custom-storage.ts       # Custom storage utilities
└── personal-data.ts        # Portfolio data with S3 URLs
```

## Contact Form

The contact form submits data to the Amplify GraphQL API and stores submissions in DynamoDB. The form is fully functional and ready for production use.
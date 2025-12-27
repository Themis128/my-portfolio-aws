This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

![Deploy to AWS Amplify](https://github.com/Themis128/my-portfolio-aws/actions/workflows/deploy.yml/badge.svg)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

For information about the project organization and directory structure, see [docs/DIRECTORY_STRUCTURE.md](docs/DIRECTORY_STRUCTURE.md).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Google Analytics

This project includes Google Analytics integration using Vercel Analytics and direct Google Analytics implementation for enhanced mobile app compatibility.

### Configuration

Create a `.env.local` file in the root directory with your Google Analytics measurement ID:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-FT79QM66D3
```

Replace `G-XXXXXXXXXX` with your actual Google Analytics measurement ID.

### Mobile App Setup

To use the Google Analytics mobile app to track your portfolio analytics:

1. **Install the Google Analytics app** on your mobile device from the App Store or Google Play Store
2. **Sign in** with the same Google account that owns the Google Analytics property
3. **Grant permissions** for the app to access your Google Analytics data
4. **Select your property** - look for the property with measurement ID `G-FT79QM66D3`

### What You Can Track with the Mobile App

- **Real-time visitors**: See who's on your site right now
- **Page views**: Track which pages are most popular
- **Traffic sources**: See where your visitors come from
- **Device breakdown**: Monitor mobile vs desktop traffic
- **Top pages**: Identify your most visited content
- **Goal completions**: Track contact form submissions and other conversions

### Custom Event Tracking

The analytics setup includes custom event tracking for:

- Contact form submissions
- Project views
- Social media clicks
- File downloads
- User interactions

### How it works

- **Dual tracking**: Uses both Vercel Analytics and direct Google Analytics for comprehensive data
- **Production only**: Analytics only loads in production builds, not during development
- **Mobile optimized**: Enhanced tracking for mobile devices and apps
- **Privacy compliant**: Uses Google's latest privacy-focused analytics

For more information, see the [Vercel Analytics documentation](https://vercel.com/docs/analytics) and [Google Analytics Help](https://support.google.com/analytics).
# Trigger build
# Second build trigger
# Third build trigger with Node.js fix
# Fourth build trigger - simplified config
# Fifth build trigger - final attempt
# Sixth build trigger - Node.js fix
# Seventh build trigger - testing Amplify deployment
# Eighth build trigger - checking deployment status

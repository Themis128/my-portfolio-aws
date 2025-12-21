import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  experimental: {},
  outputFileTracingRoot: path.join(__dirname),
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  trailingSlash: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ["@aws-sdk/client-s3", "@aws-sdk/lib-storage"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://www.google.com https://recaptcha.net https://vd6gkpc62j.execute-api.eu-central-1.amazonaws.com https://cognito-idp.eu-central-1.amazonaws.com https://5tnukzjgufdjjaael57sexvmby.appsync-api.eu-central-1.amazonaws.com wss://*.execute-api.us-east-1.amazonaws.com wss://*.execute-api.eu-central-1.amazonaws.com; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

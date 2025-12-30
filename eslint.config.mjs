import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Additional ignores for generated/build files:
    ".amplify/**",
    "amplify/**",
    ".serverless/**",
    "node_modules/**",
    "dist/**",
    "build/**",
    "*.min.js",
    "aws/**",
    "src/aws-exports.js",
    // Utility scripts:
    "deploy-amplify*.js",
    "test-local.js",
    "serverless-local/**",
    "mcp-servers/**",
    // Separate projects:
    "21st-extension-main/**",
  ]),
]);

export default eslintConfig;

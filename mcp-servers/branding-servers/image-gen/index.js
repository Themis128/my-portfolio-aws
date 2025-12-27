import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import fs from "fs";
import path from "path";

// Create the server
const server = new Server(
  {
    name: "image-gen",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define tools for image generation
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "generate_social_media_banners",
        description: "Generate social media banners for various platforms with specified dimensions",
        inputSchema: {
          type: "object",
          properties: {
            logoPath: {
              type: "string",
              description: "Path to the logo image to use in banners",
            },
            outputDirectory: {
              type: "string",
              description: "Directory to save the generated banner files",
            },
            platforms: {
              type: "array",
              items: { type: "string" },
              description: "Social media platforms to generate banners for",
              enum: ["linkedin", "twitter", "facebook", "instagram", "youtube"],
              default: ["linkedin", "twitter", "facebook"],
            },
            theme: {
              type: "string",
              description: "Color theme for the banners",
              enum: ["sky-gradient", "professional", "modern", "minimal"],
              default: "sky-gradient",
            },
          },
          required: ["logoPath", "outputDirectory"],
        },
      },
      {
        name: "generate_print_assets",
        description: "Generate print-ready assets like business cards, letterhead, and brochures",
        inputSchema: {
          type: "object",
          properties: {
            logoPath: {
              type: "string",
              description: "Path to the logo image to use in print assets",
            },
            outputDirectory: {
              type: "string",
              description: "Directory to save the generated print files",
            },
            assets: {
              type: "array",
              items: { type: "string" },
              description: "Print assets to generate",
              enum: ["business-card", "letterhead", "brochure", "flyer"],
              default: ["business-card", "letterhead"],
            },
            format: {
              type: "string",
              description: "Output format for print assets",
              enum: ["pdf", "png", "svg"],
              default: "pdf",
            },
          },
          required: ["logoPath", "outputDirectory"],
        },
      },
      {
        name: "generate_marketing_assets",
        description: "Generate digital marketing assets like email headers, presentation templates, and ads",
        inputSchema: {
          type: "object",
          properties: {
            logoPath: {
              type: "string",
              description: "Path to the logo image to use in marketing assets",
            },
            outputDirectory: {
              type: "string",
              description: "Directory to save the generated marketing files",
            },
            assets: {
              type: "array",
              items: { type: "string" },
              description: "Marketing assets to generate",
              enum: ["email-header", "newsletter-footer", "presentation-template", "webinar-banner", "ad-banner", "youtube-thumbnail"],
              default: ["email-header", "presentation-template"],
            },
            dimensions: {
              type: "object",
              properties: {
                width: { type: "number" },
                height: { type: "number" },
              },
              description: "Custom dimensions for assets",
            },
          },
          required: ["logoPath", "outputDirectory"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  switch (name) {
    case "generate_social_media_banners":
      try {
        const logoPath = args.logoPath;
        const outputDir = args.outputDirectory;
        const platforms = args.platforms || ["linkedin", "twitter", "facebook"];
        const theme = args.theme || "sky-gradient";

        // Create output directory
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        const results = [];
        const platformConfigs = {
          linkedin: [
            { name: "company-page-banner", width: 1128, height: 376, filename: "linkedin-company-banner.png" },
            { name: "profile-cover", width: 1584, height: 396, filename: "linkedin-profile-cover.png" },
          ],
          twitter: [
            { name: "header", width: 1500, height: 500, filename: "twitter-header.png" },
          ],
          facebook: [
            { name: "page-cover", width: 820, height: 312, filename: "facebook-page-cover.png" },
            { name: "profile-picture", width: 180, height: 180, filename: "facebook-profile.png" },
          ],
          instagram: [
            { name: "profile-picture", width: 320, height: 320, filename: "instagram-profile.png" },
            { name: "story-cover", width: 1080, height: 1920, filename: "instagram-story.png" },
          ],
          youtube: [
            { name: "channel-art", width: 2560, height: 1440, filename: "youtube-channel-art.png" },
            { name: "profile-picture", width: 800, height: 800, filename: "youtube-profile.png" },
          ],
        };

        for (const platform of platforms) {
          const configs = platformConfigs[platform] || [];
          
          for (const config of configs) {
            const outputFile = path.join(outputDir, config.filename);
            
            try {
              // Generate SVG banner template
              const svgContent = generateBannerSVG(config.width, config.height, logoPath, theme, platform, config.name);
              
              fs.writeFileSync(outputFile, svgContent);
              
              results.push({
                platform: platform,
                asset: config.name,
                dimensions: `${config.width}x${config.height}`,
                file: outputFile,
                status: "success"
              });
            } catch (error) {
              results.push({
                platform: platform,
                asset: config.name,
                error: error.message,
                status: "failed"
              });
            }
          }
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                logoPath: logoPath,
                outputDirectory: outputDir,
                platforms: platforms,
                theme: theme,
                results: results,
                summary: {
                  totalGenerated: results.filter(r => r.status === "success").length,
                  totalFailed: results.filter(r => r.status === "failed").length,
                },
              }),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                error: `Failed to generate social media banners: ${error.message}`,
              }),
            },
          ],
        };
      }

    case "generate_print_assets":
      try {
        const logoPath = args.logoPath;
        const outputDir = args.outputDirectory;
        const assets = args.assets || ["business-card", "letterhead"];
        const format = args.format || "pdf";

        // Create output directory
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        const results = [];
        const assetConfigs = {
          "business-card": { width: 1050, height: 600, filename: `business-card.${format}` }, // 3.5x2 inches at 300 DPI
          "letterhead": { width: 2480, height: 3508, filename: `letterhead.${format}` }, // A4 at 300 DPI
          "brochure": { width: 2480, height: 1748, filename: `brochure.${format}` }, // A5 at 300 DPI
          "flyer": { width: 2480, height: 3508, filename: `flyer.${format}` }, // A4 at 300 DPI
        };

        for (const asset of assets) {
          const config = assetConfigs[asset];
          if (!config) continue;

          const outputFile = path.join(outputDir, config.filename);
          
          try {
            // Generate SVG template for print assets
            const svgContent = generatePrintAssetSVG(config.width, config.height, logoPath, asset);
            
            fs.writeFileSync(outputFile, svgContent);
            
            results.push({
              asset: asset,
              dimensions: `${config.width}x${config.height}`,
              format: format,
              file: outputFile,
              status: "success"
            });
          } catch (error) {
            results.push({
              asset: asset,
              error: error.message,
              status: "failed"
            });
          }
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                logoPath: logoPath,
                outputDirectory: outputDir,
                assets: assets,
                format: format,
                results: results,
                summary: {
                  totalGenerated: results.filter(r => r.status === "success").length,
                  totalFailed: results.filter(r => r.status === "failed").length,
                },
              }),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                error: `Failed to generate print assets: ${error.message}`,
              }),
            },
          ],
        };
      }

    case "generate_marketing_assets":
      try {
        const logoPath = args.logoPath;
        const outputDir = args.outputDirectory;
        const assets = args.assets || ["email-header", "presentation-template"];
        const customDimensions = args.dimensions;

        // Create output directory
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        const results = [];
        const assetConfigs = {
          "email-header": { width: 600, height: 200, filename: "email-header.png" },
          "newsletter-footer": { width: 600, height: 100, filename: "newsletter-footer.png" },
          "presentation-template": { width: 1920, height: 1080, filename: "presentation-template.png" },
          "webinar-banner": { width: 1920, height: 1080, filename: "webinar-banner.png" },
          "ad-banner": { width: 728, height: 90, filename: "ad-banner.png" },
          "youtube-thumbnail": { width: 1280, height: 720, filename: "youtube-thumbnail.png" },
        };

        for (const asset of assets) {
          let config = assetConfigs[asset];
          
          // Use custom dimensions if provided
          if (customDimensions && customDimensions.width && customDimensions.height) {
            config = {
              width: customDimensions.width,
              height: customDimensions.height,
              filename: `${asset}-${customDimensions.width}x${customDimensions.height}.png`
            };
          }
          
          if (!config) continue;

          const outputFile = path.join(outputDir, config.filename);
          
          try {
            // Generate SVG template for marketing assets
            const svgContent = generateMarketingAssetSVG(config.width, config.height, logoPath, asset);
            
            fs.writeFileSync(outputFile, svgContent);
            
            results.push({
              asset: asset,
              dimensions: `${config.width}x${config.height}`,
              file: outputFile,
              status: "success"
            });
          } catch (error) {
            results.push({
              asset: asset,
              error: error.message,
              status: "failed"
            });
          }
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                logoPath: logoPath,
                outputDirectory: outputDir,
                assets: assets,
                customDimensions: customDimensions,
                results: results,
                summary: {
                  totalGenerated: results.filter(r => r.status === "success").length,
                  totalFailed: results.filter(r => r.status === "failed").length,
                },
              }),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                error: `Failed to generate marketing assets: ${error.message}`,
              }),
            },
          ],
        };
      }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Helper functions to generate SVG templates
function generateBannerSVG(width, height, logoPath, theme, platform, assetName) {
  const skyColors = {
    start: "#87CEEB",
    end: "#64748B",
    accent: "#3B82F6"
  };

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:${skyColors.start};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${skyColors.end};stop-opacity:0.4" />
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${skyColors.accent};stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1D4ED8;stop-opacity:1" />
      </linearGradient>
    </defs>
    
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    
    <!-- Platform-specific elements -->
    <g transform="translate(${width * 0.1}, ${height * 0.2})">
      <rect x="0" y="0" width="${width * 0.3}" height="${height * 0.6}" fill="url(#accent)" opacity="0.3" rx="10"/>
      <text x="${width * 0.15}" y="${height * 0.15}" text-anchor="middle" font-family="Inter, sans-serif" font-size="${Math.max(20, height * 0.08)}" font-weight="700" fill="#0F172A" dominant-baseline="middle">
        ${platform.toUpperCase()}
      </text>
      <text x="${width * 0.15}" y="${height * 0.35}" text-anchor="middle" font-family="Inter, sans-serif" font-size="${Math.max(14, height * 0.04)}" fill="#64748B" dominant-baseline="middle">
        Professional Banner
      </text>
    </g>
    
    <!-- Logo placeholder -->
    <g transform="translate(${width * 0.6}, ${height * 0.2})">
      <rect x="0" y="0" width="${width * 0.3}" height="${height * 0.6}" fill="white" rx="10" opacity="0.9"/>
      <text x="${width * 0.15}" y="${height * 0.3}" text-anchor="middle" font-family="Inter, sans-serif" font-size="${Math.max(24, height * 0.1)}" font-weight="700" fill="#0F172A" dominant-baseline="middle">
        LOGO
      </text>
      <text x="${width * 0.15}" y="${height * 0.5}" text-anchor="middle" font-family="Inter, sans-serif" font-size="${Math.max(12, height * 0.03)}" fill="#64748B" dominant-baseline="middle">
        cloudless.gr
      </text>
    </g>
    
    <!-- Decorative elements -->
    <circle cx="${width * 0.85}" cy="${height * 0.15}" r="${Math.max(10, Math.min(width, height) * 0.05)}" fill="white" opacity="0.3"/>
    <circle cx="${width * 0.15}" cy="${height * 0.85}" r="${Math.max(15, Math.min(width, height) * 0.07)}" fill="white" opacity="0.2"/>
  </svg>`;
}

function generatePrintAssetSVG(width, height, logoPath, assetType) {
  const colors = {
    background: "#ffffff",
    text: "#0F172A",
    accent: "#3B82F6",
    secondary: "#64748B"
  };

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${colors.accent};stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1D4ED8;stop-opacity:1" />
      </linearGradient>
    </defs>
    
    <rect width="${width}" height="${height}" fill="${colors.background}"/>
    
    <!-- Header with logo -->
    <g transform="translate(${width * 0.05}, ${height * 0.05})">
      <rect x="0" y="0" width="${width * 0.9}" height="${height * 0.15}" fill="url(#accent)" opacity="0.1"/>
      <text x="${width * 0.05}" y="${height * 0.1}" font-family="Inter, sans-serif" font-size="${Math.max(24, height * 0.02)}" font-weight="700" fill="${colors.text}">
        CLOUDLESS.GR
      </text>
      <text x="${width * 0.05}" y="${height * 0.14}" font-family="Inter, sans-serif" font-size="${Math.max(12, height * 0.01)}" fill="${colors.secondary}">
        Computing Solutions
      </text>
    </g>
    
    <!-- Content area -->
    <g transform="translate(${width * 0.05}, ${height * 0.25})">
      <rect x="0" y="0" width="${width * 0.9}" height="${height * 0.6}" fill="none" stroke="${colors.secondary}" stroke-width="2" opacity="0.1"/>
      <text x="${width * 0.05}" y="${height * 0.05}" font-family="Inter, sans-serif" font-size="${Math.max(16, height * 0.015)}" fill="${colors.text}">
        ${assetType.toUpperCase()} CONTENT AREA
      </text>
      <text x="${width * 0.05}" y="${height * 0.12}" font-family="Inter, sans-serif" font-size="${Math.max(12, height * 0.01)}" fill="${colors.secondary}">
        Professional ${assetType} template with brand consistency
      </text>
    </g>
    
    <!-- Footer -->
    <g transform="translate(${width * 0.05}, ${height * 0.9})">
      <rect x="0" y="0" width="${width * 0.9}" height="${height * 0.08}" fill="url(#accent)" opacity="0.1"/>
      <text x="${width * 0.5}" y="${height * 0.04}" text-anchor="middle" font-family="Inter, sans-serif" font-size="${Math.max(10, height * 0.008)}" fill="${colors.text}" dominant-baseline="middle">
        Contact: info@cloudless.gr | +30 XXX XXX XXXX
      </text>
    </g>
  </svg>`;
}

function generateMarketingAssetSVG(width, height, logoPath, assetType) {
  const colors = {
    background: "#f8fafc",
    text: "#0F172A",
    accent: "#3B82F6",
    secondary: "#64748B"
  };

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#64748B;stop-opacity:0.4" />
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${colors.accent};stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1D4ED8;stop-opacity:1" />
      </linearGradient>
    </defs>
    
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    
    <!-- Main content area -->
    <g transform="translate(${width * 0.1}, ${height * 0.1})">
      <rect x="0" y="0" width="${width * 0.8}" height="${height * 0.8}" fill="white" rx="10" opacity="0.95"/>
      
      <!-- Logo area -->
      <g transform="translate(${width * 0.05}, ${height * 0.05})">
        <rect x="0" y="0" width="${width * 0.2}" height="${height * 0.2}" fill="url(#accent)" rx="8"/>
        <text x="${width * 0.1}" y="${height * 0.15}" text-anchor="middle" font-family="Inter, sans-serif" font-size="${Math.max(20, height * 0.05)}" font-weight="700" fill="white" dominant-baseline="middle">
          LOGO
        </text>
      </g>
      
      <!-- Content text -->
      <g transform="translate(${width * 0.3}, ${height * 0.05})">
        <text x="0" y="${height * 0.05}" font-family="Inter, sans-serif" font-size="${Math.max(24, height * 0.06)}" font-weight="700" fill="${colors.text}">
          ${assetType.toUpperCase()}
        </text>
        <text x="0" y="${height * 0.12}" font-family="Inter, sans-serif" font-size="${Math.max(14, height * 0.03)}" fill="${colors.secondary}">
          Professional ${assetType} template
        </text>
        <text x="0" y="${height * 0.2}" font-family="Inter, sans-serif" font-size="${Math.max(12, height * 0.025)}" fill="${colors.text}">
          Brand-consistent design with cloudless.gr identity
        </text>
      </g>
    </g>
    
    <!-- Decorative elements -->
    <circle cx="${width * 0.9}" cy="${height * 0.1}" r="${Math.max(10, Math.min(width, height) * 0.02)}" fill="white" opacity="0.3"/>
    <circle cx="${width * 0.1}" cy="${height * 0.9}" r="${Math.max(15, Math.min(width, height) * 0.03)}" fill="white" opacity="0.2"/>
  </svg>`;
}

// Start the server
async function start() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("Image Generation Server started");
}

start().catch(console.error);

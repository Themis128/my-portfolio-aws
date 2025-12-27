import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const execAsync = promisify(exec);

// Create the server
const server = new Server(
  {
    name: "auto-favicon",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define tools for favicon generation
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "generate_favicon_set",
        description: "Generate a complete favicon set from a logo image with multiple sizes and formats",
        inputSchema: {
          type: "object",
          properties: {
            inputImage: {
              type: "string",
              description: "Path to the input logo image (SVG, PNG, or JPG)",
            },
            outputDirectory: {
              type: "string",
              description: "Directory to save the generated favicon files",
            },
            formats: {
              type: "array",
              items: { type: "string" },
              description: "Formats to generate (png, ico)",
              default: ["png", "ico"],
            },
            sizes: {
              type: "array",
              items: { type: "number" },
              description: "Sizes to generate in pixels",
              default: [16, 32, 48, 57, 60, 72, 76, 96, 120, 144, 152, 180, 192, 310],
            },
          },
          required: ["inputImage", "outputDirectory"],
        },
      },
      {
        name: "generate_website_assets",
        description: "Generate website-specific logo assets (header, footer, mobile, dark/light variants)",
        inputSchema: {
          type: "object",
          properties: {
            inputImage: {
              type: "string",
              description: "Path to the input logo image",
            },
            outputDirectory: {
              type: "string",
              description: "Directory to save the generated assets",
            },
            variants: {
              type: "array",
              items: { type: "string" },
              description: "Asset variants to generate",
              enum: ["header", "footer", "mobile", "dark", "light", "icon-only"],
              default: ["header", "footer", "mobile", "dark", "light"],
            },
          },
          required: ["inputImage", "outputDirectory"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  switch (name) {
    case "generate_favicon_set":
      try {
        const inputImage = args.inputImage;
        const outputDir = args.outputDirectory;
        const formats = args.formats || ["png", "ico"];
        const sizes = args.sizes || [16, 32, 48, 57, 60, 72, 76, 96, 120, 144, 152, 180, 192, 310];

        // Create output directory
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        const results = [];

        for (const size of sizes) {
          for (const format of formats) {
            const outputFile = path.join(outputDir, `favicon-${size}x${size}.${format}`);
            
            try {
              // Use ImageMagick to resize and convert
              const command = `convert "${inputImage}" -resize ${size}x${size} -background transparent -gravity center -extent ${size}x${size} "${outputFile}"`;
              await execAsync(command);
              
              results.push({
                size: `${size}x${size}`,
                format: format,
                file: outputFile,
                status: "success"
              });
            } catch (error) {
              results.push({
                size: `${size}x${size}`,
                format: format,
                error: error.message,
                status: "failed"
              });
            }
          }
        }

        // Generate favicon.ico with multiple sizes
        try {
          const icoSizes = [16, 32, 48, 64, 128, 256];
          const icoFiles = icoSizes.map(size => path.join(outputDir, `temp-${size}x${size}.png`));
          
          // Create temporary files for ICO
          for (const size of icoSizes) {
            const tempFile = path.join(outputDir, `temp-${size}x${size}.png`);
            const command = `convert "${inputImage}" -resize ${size}x${size} -background transparent -gravity center -extent ${size}x${size} "${tempFile}"`;
            await execAsync(command);
          }

          // Create ICO file
          const icoFile = path.join(outputDir, "favicon.ico");
          const icoCommand = `convert ${icoFiles.join(" ")} "${icoFile}"`;
          await execAsync(icoCommand);

          // Clean up temporary files
          for (const tempFile of icoFiles) {
            if (fs.existsSync(tempFile)) {
              fs.unlinkSync(tempFile);
            }
          }

          results.push({
            type: "favicon.ico",
            file: icoFile,
            sizes: icoSizes,
            status: "success"
          });

        } catch (error) {
          results.push({
            type: "favicon.ico",
            error: error.message,
            status: "failed"
          });
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                inputImage: inputImage,
                outputDirectory: outputDir,
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
                error: `Failed to generate favicon set: ${error.message}`,
              }),
            },
          ],
        };
      }

    case "generate_website_assets":
      try {
        const inputImage = args.inputImage;
        const outputDir = args.outputDirectory;
        const variants = args.variants || ["header", "footer", "mobile", "dark", "light"];

        // Create output directory
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        const results = [];

        for (const variant of variants) {
          let width, height;
          let filename;

          switch (variant) {
            case "header":
              width = 200; height = 60; filename = "logo-header.png";
              break;
            case "footer":
              width = 150; height = 45; filename = "logo-footer.png";
              break;
            case "mobile":
              width = 120; height = 40; filename = "logo-mobile.png";
              break;
            case "dark":
              width = 200; height = 60; filename = "logo-dark.png";
              break;
            case "light":
              width = 200; height = 60; filename = "logo-light.png";
              break;
            case "icon-only":
              width = 60; height = 60; filename = "logo-icon.png";
              break;
            default:
              continue;
          }

          const outputFile = path.join(outputDir, filename);

          try {
            // Use ImageMagick to resize and process
            let command = `convert "${inputImage}" -resize ${width}x${height} -background transparent -gravity center -extent ${width}x${height} "${outputFile}"`;

            // For dark/light variants, we might want to adjust colors
            if (variant === "dark") {
              command = `convert "${inputImage}" -resize ${width}x${height} -background transparent -gravity center -extent ${width}x${height} -colorspace Gray "${outputFile}"`;
            }

            await execAsync(command);

            results.push({
              variant: variant,
              dimensions: `${width}x${height}`,
              file: outputFile,
              status: "success"
            });
          } catch (error) {
            results.push({
              variant: variant,
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
                inputImage: inputImage,
                outputDirectory: outputDir,
                variants: variants,
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
                error: `Failed to generate website assets: ${error.message}`,
              }),
            },
          ],
        };
      }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Start the server
async function start() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("Auto-Favicon Server started");
}

start().catch(console.error);

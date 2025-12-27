import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import fs from "fs";
import path from "path";
import os from "os";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// Helper function to resolve Windows D: drive paths to Linux paths
function resolvePath(inputPath) {
  // If it's already a Linux path, return as-is
  if (!inputPath.includes(':') || inputPath.startsWith('/')) {
    return inputPath;
  }
  
  // Handle Windows D: drive paths
  if (inputPath.startsWith('D:')) {
    // Convert D:\path\to\file to /mnt/d/path/to/file (common WSL mount point)
    // or try other common mount points
    const relativePath = inputPath.substring(2).replace(/\\/g, '/');
    
    // Try common WSL mount points
    const possiblePaths = [
      `/mnt/d${relativePath}`,
      `/d${relativePath}`,
      `/drives/d${relativePath}`,
      `${os.homedir()}/d-drive${relativePath}`
    ];
    
    for (const possiblePath of possiblePaths) {
      try {
        if (fs.existsSync(possiblePath)) {
          console.log(`Resolved ${inputPath} to ${possiblePath}`);
          return possiblePath;
        }
      } catch (error) {
        // Continue to next path
      }
    }
    
    // If no existing path found, return the most common WSL path
    console.log(`Warning: ${inputPath} not found, using default WSL path`);
    return `/mnt/d${relativePath}`;
  }
  
  return inputPath;
}

// Create the server
const server = new Server(
  {
    name: "d-drive-file-server",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define tools for file operations
server.setRequestHandler(ListToolsRequestSchema, async (request, _channel) => {
  return {
    tools: [
      {
        name: "list_files",
        description: "List files and directories in a given path. Supports cross-platform paths (Windows D: drive paths will be resolved to appropriate Linux paths)",
        inputSchema: {
          type: "object",
          properties: {
            directory: {
              type: "string",
              description: "The directory path to list (supports Windows D: paths which will be resolved to Linux paths)",
            },
          },
          required: ["directory"],
        },
      },
      {
        name: "read_file",
        description: "Read the contents of a file. Supports cross-platform paths",
        inputSchema: {
          type: "object",
          properties: {
            filePath: {
              type: "string",
              description: "The full path to the file to read (supports Windows D: paths which will be resolved to Linux paths)",
            },
          },
          required: ["filePath"],
        },
      },
      {
        name: "search_files",
        description: "Search for files matching a pattern in a directory. Supports cross-platform paths",
        inputSchema: {
          type: "object",
          properties: {
            directory: {
              type: "string",
              description: "The directory to search in (supports Windows D: paths which will be resolved to Linux paths)",
            },
            pattern: {
              type: "string",
              description: "The file pattern to search for (e.g., '*.txt')",
            },
          },
          required: ["directory", "pattern"],
        },
      },
      {
        name: "extract_pdf_content",
        description: "Extract text content from a PDF file. Supports cross-platform paths and uses pdftotext for proper PDF parsing",
        inputSchema: {
          type: "object",
          properties: {
            pdfPath: {
              type: "string",
              description: "The full path to the PDF file to extract content from (supports Windows D: paths which will be resolved to Linux paths)",
            },
            maxPages: {
              type: "number",
              description: "Maximum number of pages to extract (optional, extracts all if not specified)",
              minimum: 1,
            },
          },
          required: ["pdfPath"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request, _channel) => {
  const { name, arguments: args } = request.params;
  
  switch (name) {
    case "list_files":
      try {
        const resolvedPath = resolvePath(args.directory);
        const files = fs.readdirSync(resolvedPath, { withFileTypes: true });
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                originalPath: args.directory,
                resolvedPath: resolvedPath,
                files: files.map(file => ({
                  name: file.name,
                  isDirectory: file.isDirectory(),
                  isFile: file.isFile(),
                })),
              }),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error listing files: ${error.message}`,
            },
          ],
        };
      }

    case "read_file":
      try {
        const resolvedPath = resolvePath(args.filePath);
        const content = fs.readFileSync(resolvedPath, "utf8");
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                originalPath: args.filePath,
                resolvedPath: resolvedPath,
                content: content,
              }),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error reading file: ${error.message}`,
            },
          ],
        };
      }

    case "search_files":
      try {
        const resolvedPath = resolvePath(args.directory);
        const pattern = new RegExp(args.pattern.replace(/\*/g, ".*"));
        const files = fs.readdirSync(resolvedPath);
        const matchingFiles = files.filter(file => pattern.test(file));
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                originalPath: args.directory,
                resolvedPath: resolvedPath,
                pattern: args.pattern,
                matchingFiles,
              }),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error searching files: ${error.message}`,
            },
          ],
        };
      }

    case "extract_pdf_content":
      try {
        const resolvedPath = resolvePath(args.pdfPath);
        
        // Check if pdftotext is available
        let command = `pdftotext`;
        if (args.maxPages) {
          command += ` -l ${args.maxPages}`;
        }
        command += ` "${resolvedPath}" -`;
        
        const { stdout, stderr } = await execAsync(command);
        
        if (stderr && !stdout) {
          throw new Error(`PDF extraction failed: ${stderr}`);
        }
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                originalPath: args.pdfPath,
                resolvedPath: resolvedPath,
                maxPages: args.maxPages || "all",
                extractedText: stdout,
                extractionMethod: "pdftotext",
              }),
            },
          ],
        };
      } catch (error) {
        // Try alternative method if pdftotext is not available
        if (error.message.includes("command not found") || error.message.includes("pdftotext")) {
          try {
            // Try using strings command as fallback for text extraction
            const { stdout } = await execAsync(`strings "${resolvedPath}" | head -1000`);
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify({
                    originalPath: args.pdfPath,
                    resolvedPath: resolvedPath,
                    extractedText: stdout,
                    extractionMethod: "strings (fallback)",
                    warning: "pdftotext not available, using basic text extraction",
                  }),
                },
              ],
            };
          } catch (fallbackError) {
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify({
                    originalPath: args.pdfPath,
                    resolvedPath: resolvedPath,
                    error: `Error extracting PDF content: ${error.message}. Fallback also failed: ${fallbackError.message}`,
                    extractionMethod: "failed",
                  }),
                },
              ],
            };
          }
        }
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                originalPath: args.pdfPath,
                resolvedPath: resolvedPath,
                error: `Error extracting PDF content: ${error.message}`,
                extractionMethod: "failed",
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
  console.log("D: Drive File Server started");
}

start().catch(console.error);

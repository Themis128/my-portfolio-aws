import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name?: string;
  pages?: string[];
  componentsCount?: number;
  stylesCount?: number;
  raw?: unknown;
  error?: string;
  retryAfter?: string;
  source?: string;
};

// Minimal type for Figma document children (pages)
type FigmaDocumentChild = {
  name?: string;
  type?: string;
};

// Type for Figma API response
type FigmaFileResponse = {
  name: string;
  document?: {
    children?: FigmaDocumentChild[];
  };
  components?: Record<string, unknown>;
  styles?: Record<string, unknown>;
};

// Helper function to get error message from unknown error
const getErrorMessage = (e: unknown): string => {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
};

// Helper function to fetch data from Figma API directly
async function fetchFigmaData(fileKey: string): Promise<Data> {
  const apiKey = process.env.FIGMA_API_KEY;
  if (!apiKey) {
    throw new Error(
      "FIGMA_API_KEY not set in environment. Set it in .env or export it.",
    );
  }

  const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
    headers: {
      "X-Figma-Token": apiKey,
    },
  });

  if (!response.ok) {
    const text = await response.text();

    // Friendly handling for common auth errors so the UI can guide the developer
    if (response.status === 401 || response.status === 403) {
      throw new Error(
        "Figma API error: Invalid token or unauthorized. Ensure FIGMA_API_KEY is set in your environment (.env or CI), the token is valid and has access to the file, and restart your dev server. You can run `pnpm run check:figma-env` locally to validate.",
      );
    }

    // Handle rate limiting specifically
    if (response.status === 429) {
      const retryAfter = response.headers.get("retry-after") || "3600";
      throw new Error(
        `Figma API error: Rate limit exceeded. Figma allows 1000 requests per hour for personal access tokens. Please wait before trying again. Retry after: ${retryAfter}`,
      );
    }

    throw new Error(`Figma API error: ${text}`);
  }

  const data: FigmaFileResponse = await response.json();

  const name = data.name;
  const pages = Array.isArray(data.document?.children)
    ? data.document.children.flatMap((p) =>
        p && typeof p.name === "string" ? [p.name] : [],
      )
    : [];
  const componentsCount = data.components
    ? Object.keys(data.components).length
    : 0;
  const stylesCount = data.styles ? Object.keys(data.styles).length : 0;

  return {
    name,
    pages,
    componentsCount,
    stylesCount,
    source: "direct",
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const fileKey =
    (req.query.fileKey as string) ||
    process.env.FIGMA_FILE_KEY ||
    "9DPzMHAEGmxNKf8wQ77ktn";

  // Try MCP server first, fallback to direct API
  const mcpServerUrl = process.env.FIGMA_MCP_URL || "http://localhost:3333";

  try {
    // Make request to MCP server using JSON-RPC 2.0
    const mcpResponse = await fetch(`${mcpServerUrl}/mcp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "mcp-session-id": `session-${Date.now()}`,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: {
          name: "figma_get_file", // Correct MCP tool name
          arguments: {
            file_key: fileKey, // Correct parameter name
          },
        },
      }),
    });

    if (!mcpResponse.ok) {
      console.warn("MCP server not available, falling back to direct API");
      const data = await fetchFigmaData(fileKey);
      return res.status(200).json(data);
    }

    // Parse MCP response
    const mcpData = await mcpResponse.json();

    // Check for JSON-RPC error
    if (mcpData.error) {
      console.warn(
        "MCP server error, falling back to direct API:",
        mcpData.error,
      );
      const data = await fetchFigmaData(fileKey);
      return res.status(200).json(data);
    }

    // Extract data from MCP response
    // MCP responses typically have result.content with tool results
    const result = mcpData.result;
    if (!result || !result.content) {
      console.warn("Invalid MCP response format, falling back to direct API");
      const data = await fetchFigmaData(fileKey);
      return res.status(200).json(data);
    }

    // Parse the content - MCP tools return structured data
    let fileData: FigmaFileResponse;
    try {
      // Try to find the file data in the content
      const content = Array.isArray(result.content)
        ? result.content[0]
        : result.content;
      if (content?.text) {
        fileData = JSON.parse(content.text);
      } else if (content && typeof content === "object") {
        fileData = content as FigmaFileResponse;
      } else {
        throw new Error("Unexpected content format");
      }
    } catch (parseError) {
      console.warn(
        "Failed to parse MCP response, falling back to direct API:",
        parseError,
      );
      const data = await fetchFigmaData(fileKey);
      return res.status(200).json(data);
    }

    // Extract information from parsed MCP data
    const name = fileData.name || "Unknown File";
    const pages = Array.isArray(fileData.document?.children)
      ? fileData.document.children.flatMap((p) =>
          p && typeof p.name === "string" ? [p.name] : [],
        )
      : [];
    const componentsCount = fileData.components
      ? Object.keys(fileData.components).length
      : 0;
    const stylesCount = fileData.styles
      ? Object.keys(fileData.styles).length
      : 0;

    return res.status(200).json({
      name,
      pages,
      componentsCount,
      stylesCount,
      source: "mcp",
    });
  } catch (err: unknown) {
    const errMessage = getErrorMessage(err);

    // Check if it's a rate limit error
    if (errMessage.includes("Rate limit exceeded")) {
      const retryAfter = errMessage.match(/Retry after: (\d+)/)?.[1] || "3600";
      return res.status(429).json({
        error:
          "Figma API error: Rate limit exceeded. Figma allows 1000 requests per hour for personal access tokens. Please wait before trying again.",
        retryAfter,
      });
    }

    // Check if it's an auth error
    if (
      errMessage.includes("Invalid token") ||
      errMessage.includes("unauthorized")
    ) {
      return res.status(400).json({
        error: errMessage,
      });
    }

    console.error("Both MCP and direct API failed:", errMessage);
    return res.status(500).json({
      error: `Failed to fetch Figma data: ${errMessage}`,
    });
  }
}

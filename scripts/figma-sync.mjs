#!/usr/bin/env node
/**
 * Simple Figma token sync script
 * - Reads FIGMA_API_KEY and FIGMA_FILE_KEY from environment
 * - Fetches the Figma file JSON
 * - Extracts color styles (FILL) and maps them to token paths based on style names
 * - Writes tokens to `src/ui-components/figmaTokens.generated.ts`
 *
 * Usage:
 *   FIGMA_API_KEY=... FIGMA_FILE_KEY=... node ./scripts/figma-sync.mjs
 */
import fs from "fs";
import path from "path";

// Auto-load variables from a local .env file if present (does not override exported env vars)
try {
  const dotenvPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(dotenvPath)) {
    const envRaw = fs.readFileSync(dotenvPath, "utf8");
    envRaw.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const idx = trimmed.indexOf("=");
      if (idx === -1) return;
      const key = trimmed.substring(0, idx).trim();
      let val = trimmed.substring(idx + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    });
    console.log("Loaded environment variables from .env");
  }
} catch (e) {
  console.warn("Warning: failed to read .env file:", e.message || e);
}

const FIGMA_API = "https://api.figma.com/v1";

function toHex({ r, g, b }, opacity = 1) {
  const to255 = (v) => Math.round(v * 255);
  const rr = to255(r).toString(16).padStart(2, "0");
  const gg = to255(g).toString(16).padStart(2, "0");
  const bb = to255(b).toString(16).padStart(2, "0");
  if (opacity === undefined || opacity === 1) return `#${rr}${gg}${bb}`;
  // include alpha
  const aa = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${rr}${gg}${bb}${aa}`;
}

function nameToPath(name) {
  // Normalize separators and split into path segments
  const parts = name
    .replace(/\\s*\/\\s*/g, "/")
    .replace(/\\s*-\\s*/g, "/")
    .split("/")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => p.replace(/[^a-zA-Z0-9_\-]/g, "").toLowerCase());
  return parts;
}

function setDeep(obj, pathArr, value) {
  let cur = obj;
  for (let i = 0; i < pathArr.length - 1; i++) {
    const k = pathArr[i];
    if (!cur[k]) cur[k] = {};
    cur = cur[k];
  }
  cur[pathArr[pathArr.length - 1]] = value;
}

async function main() {
  const apiKey = process.env.FIGMA_API_KEY;
  const fileKey = process.env.FIGMA_FILE_KEY || "9DPzMHAEGmxNKf8wQ77ktn";

  if (!apiKey) {
    console.warn(
      "FIGMA_API_KEY is not set. Skipping Figma fetch and writing placeholder tokens so the generate step can continue. To fetch real tokens, set FIGMA_API_KEY and re-run `pnpm run sync:figma`.",
    );
    const outPath = path.resolve(
      process.cwd(),
      "src/ui-components/figmaTokens.generated.ts",
    );
    const placeholder = `// Generated placeholder - no FIGMA_API_KEY provided\nconst figmaTokens = { colors: {} } as const;\nexport default figmaTokens;\n`;
    fs.writeFileSync(outPath, placeholder, "utf8");
    console.log(`Wrote placeholder tokens to ${outPath}`);
    return;
  }

  console.log(`Fetching Figma file ${fileKey}...`);

  const resp = await fetch(`${FIGMA_API}/files/${fileKey}`, {
    headers: { "X-Figma-Token": apiKey },
  });

  if (!resp.ok) {
    const txt = await resp.text();
    console.warn("Figma API error:", resp.status, txt);
    const outPath = path.resolve(
      process.cwd(),
      "src/ui-components/figmaTokens.generated.ts",
    );
    const placeholder = `// Generated placeholder - Figma API error (${resp.status})\nconst figmaTokens = { colors: {} } as const;\nexport default figmaTokens;\n`;
    fs.writeFileSync(outPath, placeholder, "utf8");
    console.log(
      `Wrote placeholder tokens to ${outPath} due to Figma API error.`,
    );
    return;
  }

  const data = await resp.json();

  // Map styleId -> meta
  const styles = data.styles || {};

  // Traverse nodes to find style usages and color values
  const styleValues = {};

  function traverse(node) {
    if (!node || typeof node !== "object") return;

    // node.styles is an object of form { fill: styleId, text: styleId }
    if (node.styles) {
      Object.entries(node.styles).forEach(([k, styleId]) => {
        if (!styleId) return;
        const meta = styles[styleId];
        if (!meta) return;
        if (meta.styleType === "FILL") {
          // try to read fills for color
          const fills = node.fills || node.fill ? [node.fill] : node.fills;
          if (Array.isArray(node.fills) && node.fills.length) {
            const f = node.fills.find((p) => p.type === "SOLID");
            if (f && f.color) {
              const hex = toHex(f.color, f.opacity ?? 1);
              styleValues[styleId] = hex;
            }
          }
        }
      });
    }

    // Some nodes have fills without styles - ignore
    // Recurse into children
    if (Array.isArray(node.children)) {
      node.children.forEach(traverse);
    }
  }

  traverse(data.document);

  // If no styleValues found, attempt a fallback: try to find FILL paints in document and map by name
  if (Object.keys(styleValues).length === 0) {
    console.log(
      "No style references found during traversal; attempting fallback scan for solid fills...",
    );
    function findFills(node) {
      if (!node || typeof node !== "object") return;
      if (Array.isArray(node.fills) && node.fills.length) {
        const f = node.fills.find((p) => p.type === "SOLID");
        if (f && f.color) {
          const name = node.name || "color";
          const key = `fallback-${Object.keys(styleValues).length + 1}`;
          styleValues[key] = { name, color: toHex(f.color, f.opacity ?? 1) };
        }
      }
      if (Array.isArray(node.children)) node.children.forEach(findFills);
    }
    findFills(data.document);
  }

  // Build tokens object
  const tokens = { colors: {} };

  if (Object.keys(styleValues).length) {
    Object.entries(styleValues).forEach(([styleId, hexOrObj]) => {
      let name, hex;
      if (typeof hexOrObj === "string") {
        const meta = styles[styleId];
        name = meta?.name || styleId;
        hex = hexOrObj;
      } else if (typeof hexOrObj === "object") {
        name = hexOrObj.name || styleId;
        hex = hexOrObj.color;
      }

      const pathArr = nameToPath(name);
      if (pathArr.length === 0) {
        // fallback: put under colors.unknown
        setDeep(tokens, ["colors", "unknown"], { value: hex });
      } else {
        // If last segment looks numeric (e.g., 90), use it as depth
        // Create nested object { value: hex }
        const last = pathArr[pathArr.length - 1];
        setDeep(tokens, ["colors", ...pathArr], { value: hex });
      }
    });
  }

  // Write output file
  const outPath = path.resolve(
    process.cwd(),
    "src/ui-components/figmaTokens.generated.ts",
  );

  const content = `// Generated by scripts/figma-sync.mjs - DO NOT EDIT BY HAND
import type { Theme as AmplifyTheme } from '@aws-amplify/ui-react';

const figmaTokens = ${JSON.stringify(tokens, null, 2)} as const;

export default figmaTokens;
`;

  fs.writeFileSync(outPath, content, "utf8");
  console.log(
    `Wrote ${outPath} - ${Object.keys(tokens.colors).length} color tokens`,
  );

  console.log(
    "Done. You can now merge tokens into your theme in src/ui-components/studioTheme.ts or run `pnpm run sync:figma:generate` to also run `npx ampx generate`.",
  );
}

main().catch((err) => {
  console.warn("Error during figma sync:", err);
  const outPath = path.resolve(
    process.cwd(),
    "src/ui-components/figmaTokens.generated.ts",
  );
  const placeholder = `// Generated placeholder - sync failed with error\nconst figmaTokens = { colors: {} } as const;\nexport default figmaTokens;\n`;
  try {
    fs.writeFileSync(outPath, placeholder, "utf8");
    console.log(`Wrote placeholder tokens to ${outPath} due to error.`);
  } catch (e) {
    console.error("Failed to write placeholder tokens:", e);
  }
});

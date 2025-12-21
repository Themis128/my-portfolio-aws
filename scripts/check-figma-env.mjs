#!/usr/bin/env node
/*
 * Check Figma environment variables and access
 * Usage: (reads .env automatically) node ./scripts/check-figma-env.mjs
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

const token = process.env.FIGMA_API_KEY;
const fileKey = process.env.FIGMA_FILE_KEY;

function exitWith(code) {
  process.exit(code);
}

async function checkMe() {
  try {
    const res = await fetch("https://api.figma.com/v1/me", {
      headers: { "X-Figma-Token": token },
    });

    if (res.ok) {
      const json = await res.json();
      console.log(
        `✅ Token is valid. User: ${json.handle || json.email || json.id}`,
      );
      return true;
    }

    const text = await res.text();
    console.error(`✖ /me returned status ${res.status}: ${text}`);
    return false;
  } catch (err) {
    console.error("✖ Error calling /me:", err.message || err);
    return false;
  }
}

async function checkFile(key) {
  try {
    const res = await fetch(`https://api.figma.com/v1/files/${key}`, {
      headers: { "X-Figma-Token": token },
    });

    if (res.ok) {
      const json = await res.json();
      console.log(
        `✅ File access OK. File name: ${json.name} (pages: ${(json.document?.children || []).length})`,
      );
      return true;
    }

    const text = await res.text();
    console.error(`✖ /files/${key} returned status ${res.status}: ${text}`);
    return false;
  } catch (err) {
    console.error(`✖ Error calling /files/${key}:`, err.message || err);
    return false;
  }
}

(async function main() {
  if (!token) {
    console.error(
      "FIGMA_API_KEY is not set. Add it to your .env or export it in your shell.",
    );
    exitWith(2);
    return;
  }

  console.log("Checking Figma API token...");
  const okMe = await checkMe();

  let okFile = true;
  if (fileKey) {
    console.log(`Checking access to file ${fileKey}...`);
    okFile = await checkFile(fileKey);
  } else {
    console.log("No FIGMA_FILE_KEY set; skipping file access check.");
  }

  if (okMe && okFile) {
    console.log("All checks passed ✅");
    exitWith(0);
  }

  console.error("One or more checks failed. See messages above for details.");
  exitWith(3);
})();

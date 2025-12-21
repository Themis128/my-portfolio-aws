import { spawn } from "child_process";
import fs from "fs";
import http from "http";
import path from "path";
import { expect, test } from "@playwright/test";

const SCREENSHOT_DIR = path.join(
  process.cwd(),
  "playwright-monitor-screenshots",
);

function waitForFileContaining(substr: string, timeout = 15000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    (function poll() {
      if (Date.now() - start > timeout)
        return reject(new Error("timeout waiting for screenshot"));
      if (!fs.existsSync(SCREENSHOT_DIR)) {
        setTimeout(poll, 200);
        return;
      }
      const files = fs
        .readdirSync(SCREENSHOT_DIR)
        .filter((f) => f.includes(substr));
      if (files.length) return resolve(path.join(SCREENSHOT_DIR, files[0]));
      setTimeout(poll, 200);
    })();
  });
}

test.describe("Playwright monitor integration", () => {
  test("captures screenshot and logs on page error", async () => {
    // start simple http server with an error page
    const server = http.createServer((req, res) => {
      if (req.url === "/error") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(
          '<html><body><script nonce="test">setTimeout(()=>{throw new Error("boom")},10)</script><h1>Error page</h1></body></html>',
        );
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<html><body><h1>OK</h1></body></html>");
      }
    });

    await new Promise<void>((resolve) =>
      server.listen(0, "127.0.0.1", resolve),
    );
    const addr = server.address();
    if (!addr || typeof addr !== "object" || !("port" in addr))
      throw new Error("failed to get server port");
    // @ts-ignore - address shape differs in Node typings
    const port = addr.port;
    const baseUrl = `http://127.0.0.1:${port}`;

    // ensure clean screenshot dir
    if (fs.existsSync(SCREENSHOT_DIR))
      fs.rmSync(SCREENSHOT_DIR, { recursive: true, force: true });

    const env = Object.assign({}, process.env, {
      MONITOR_BASE_URL: baseUrl,
      MONITOR_START_DEV: "false",
      MONITOR_INTERVAL_MS: "2000",
      MONITOR_ALERT_COOLDOWN_MS: "1000",
      MONITOR_DISABLE_ALERTS: "true", // don't send external alerts in tests
      MONITOR_ROUTES: "/error",
      MONITOR_FLUSH_DIGEST_AFTER_CHECK: "true",
    });

    const monitor = spawn("node", ["scripts/playwright-monitor.mjs"], { env });

    // capture logs if needed (no-op in test)
    monitor.stdout.on("data", () => {});
    monitor.stderr.on("data", () => {});

    const screenshotPath = (await waitForFileContaining(
      "error",
      15000,
    )) as string;

    expect(fs.existsSync(screenshotPath)).toBeTruthy();
    const stats = fs.statSync(screenshotPath);
    expect(stats.size).toBeGreaterThan(0);

    // cleanup
    monitor.kill("SIGTERM");
    server.close();
  });
});

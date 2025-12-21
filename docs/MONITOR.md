# Playwright Monitor (Health checks & Alerts) 🔍

This document explains how to run the repository's Playwright monitor (`scripts/playwright-monitor.mjs`) that periodically visits routes, captures screenshots on console/page errors, and sends alerts (Slack/email/digest).

---

## Quick start

Install dependencies:

```bash
pnpm install
# or
npm install
```

Run the monitor directly:

```bash
# simple run
npm run monitor:pages

# faster feedback during development
MONITOR_INTERVAL_MS=2000 MONITOR_DISABLE_ALERTS=true npm run monitor:pages
```

Run the monitor with PM2 (background):

```bash
# start with PM2
npm run monitor:pages:pm2

# stop it
npm run monitor:pages:pm2:stop

# view logs
pm2 logs playwright-monitor
```

---

## Files & Outputs

- Logs: `playwright-monitor.log`
- Screenshots (on issue): `playwright-monitor-screenshots/`
- Digest temp artifacts: `playwright-monitor-digest/`

---

## Environment variables (recommended)

Add the variables to a `.env` or supply via environment when running.

- MONITOR_BASE_URL — base URL to check (default: `http://localhost:3003`)
- MONITOR_INTERVAL_MS — interval (ms) between checks (default: `300000`)
- MONITOR_START_DEV — set to `false` to skip `npm run dev` (default: `true`)
- MONITOR_ROUTES — comma-separated override for routes (e.g. `/,/about,/blog/test-post`)
- MONITOR_DISABLE_ALERTS — `true` to disable external alerts (useful for tests)

Slack (preferred for rich uploads):

- MONITOR_SLACK_TOKEN — bot token (scopes: `files:write`, `chat:write`)
- MONITOR_SLACK_CHANNEL — channel ID or name (e.g., `#monitor`)
- MONITOR_SLACK_WEBHOOK — optional webhook fallback if token not provided

Email (SMTP) for digest/immediate alerts:

- MONITOR_SMTP_HOST, MONITOR_SMTP_PORT, MONITOR_SMTP_USER, MONITOR_SMTP_PASS
- MONITOR_ALERT_EMAIL_FROM
- MONITOR_ALERT_EMAIL_TO
- MONITOR_EMAIL_IMMEDIATE — `true` to send email immediately instead of in digest

Digest settings:

- MONITOR_DIGEST_INTERVAL_MS — ms between digest sends (default: `3600000`)
- MONITOR_ALERT_COOLDOWN_MS — ms between alerts for the same route (default: `600000`)
- MONITOR_FLUSH_DIGEST_AFTER_CHECK — helpful for tests to flush digest immediately

---

## Testing & CI

There is an integration test at `tests/monitor.spec.ts` that starts a tiny server and verifies the monitor captures screenshots for a page error. The test disables outbound alerts to avoid side effects.

Run the test suite with:

```bash
npm test
# or just this test
npx playwright test tests/monitor.spec.ts
```

---

## Tips & Best practices 💡

- Keep secrets (Slack tokens, SMTP credentials) out of the repository — use environment secrets in CI or a secret manager.
- Use `MONITOR_ROUTES` for focused checks while debugging specific pages.
- Consider running monitor with PM2 or a systemd unit for production reliability.
- If you expect many dynamic routes, consider extending sampling (multiple values per param) to increase coverage.

---

If you want, I can add a `docs/`-level README link, a systemd unit file, or a GitHub Actions workflow to run the monitor in a staging environment and post a digest to Slack. Which would you prefer next? ✅

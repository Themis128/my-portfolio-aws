import { spawn } from "node:child_process";

const STANDARD_NODE_ENVS = new Set(["production", "development", "test"]);

const [, , command, ...rawArgs] = process.argv;
const args = rawArgs[0] === "--" ? rawArgs.slice(1) : rawArgs;

if (!command) {
  process.stderr.write(
    "Missing Next.js command. Example: node scripts/run-next.mjs build\n",
  );
  process.exit(1);
}

const nodeEnv = process.env.NODE_ENV;
const nodeEnvForCommand =
  command === "dev"
    ? "development"
    : command === "build" || command === "start"
      ? "production"
      : undefined;

if (nodeEnvForCommand) {
  process.env.NODE_ENV = nodeEnvForCommand;
} else if (nodeEnv && !STANDARD_NODE_ENVS.has(nodeEnv)) {
  delete process.env.NODE_ENV;
}

const child = spawn(
  process.platform === "win32"
    ? `next ${[command, ...args].join(" ")}`
    : "next",
  process.platform === "win32" ? [] : [command, ...args],
  {
    stdio: "inherit",
    env: process.env,
    shell: process.platform === "win32",
  },
);

child.on("error", (error) => {
  process.stderr.write(
    `${error instanceof Error ? error.message : String(error)}\n`,
  );
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (typeof code === "number") {
    process.exit(code);
  }

  process.stderr.write(
    `next ${command} exited with signal ${signal ?? "unknown"}\n`,
  );
  process.exit(1);
});

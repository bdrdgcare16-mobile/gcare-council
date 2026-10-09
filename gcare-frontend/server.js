const { spawn } = require("child_process");
const path = require("path");

const port = process.env.PORT || 4173;
const host = "0.0.0.0";

const serveBin = path.join(
  __dirname,
  "node_modules",
  "serve",
  "build",
  "main.js"
);

const child = spawn(
  process.execPath,
  [serveBin, ".", "-l", `tcp://${host}:${port}`],
  { stdio: "inherit", cwd: __dirname }
);

child.on("exit", (code) => process.exit(code ?? 0));

process.on("SIGINT", () => child.kill("SIGINT"));
process.on("SIGTERM", () => child.kill("SIGTERM"));

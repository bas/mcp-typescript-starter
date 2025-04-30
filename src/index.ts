#!/usr/bin/env node
// Entry point for MCP server CLI
import * as process from "process";

const command = process.argv[2];

// Read env vars with defaults
const MCP_GREETING = process.env.MCP_GREETING || "Hello";
const MCP_SECRET = process.env.MCP_SECRET || "SecretValue";

if (command === "stdio") {
  // Log config to stderr
  console.error(`Starting MCP server with:`);
  console.error(`  MCP_GREETING: ${MCP_GREETING}`);
  console.error(`  MCP_SECRET: ${MCP_SECRET}`);
  // Start the MCP server
  import("./lib/server.js").then(({ startServer }) => {
    startServer({ greeting: MCP_GREETING, secret: MCP_SECRET });
  });
} else {
  process.exit(1);
}

import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the markdown file as a string (embed at runtime)
const exampleMdPath = path.join(__dirname, "../resources/example.md");
const exampleMd = fs.readFileSync(exampleMdPath, "utf8");

// Define the resource
export function defineExampleResource() {
  return {
    name: "example-md",
    template: new ResourceTemplate("example://md", { list: undefined }),
    handler: async (uri: URL) => ({
      contents: [{ uri: uri.href, text: exampleMd }],
    }),
  };
}

// Register the resource with the server
export function registerExampleResource(server: McpServer) {
  const { name, template, handler } = defineExampleResource();
  server.resource(name, template, handler);
}

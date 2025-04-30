import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerHelloTool } from "./tools.js";
import { registerExampleResource } from "./resources.js";
import { registerExamplePrompt } from "./prompts.js";

export async function startServer({ greeting, secret }: { greeting: string; secret: string }) {
  const server = new McpServer({
    name: "MCP Typescript Starter",
    version: "1.0.0",
  });

  // Register tool, resource, and prompt
  registerHelloTool(server, greeting);
  registerExampleResource(server);
  registerExamplePrompt(server);

  // Start stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

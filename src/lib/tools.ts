import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function defineHelloTool(greeting: string) {
  return {
    name: "say_hello",
    description: "Say hello to a user with a configurable greeting.",
    schema: { name: z.string().describe("Name to greet") },
    handler: ({ name }: { name: string }, _extra: any) => {
      return {
        content: [
          { type: "text" as const, text: `${greeting}, ${name}!` }
        ]
      };
    },
  };
}

export function defineGitHubZenTool() {
  return {
    name: "get_github_zen",
    description: "Get a Zen of GitHub quote from the GitHub API.",
    schema: {},
    handler: async (_params: {}, _extra: any) => {
      try {
        const response = await fetch("https://api.github.com/zen");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const zenQuote = await response.text();
        return {
          content: [
            { type: "text" as const, text: zenQuote }
          ]
        };
      } catch (error) {
        return {
          content: [
            { type: "text" as const, text: `Error fetching GitHub Zen quote: ${error instanceof Error ? error.message : 'Unknown error'}` }
          ]
        };
      }
    },
  };
}

// Register the hello tool with the server
export function registerHelloTool(server: McpServer, greeting: string) {
  const { name, description, schema, handler } = defineHelloTool(greeting);
  server.tool(name, description, schema, handler);
}

// Register the GitHub Zen tool with the server
export function registerGitHubZenTool(server: McpServer) {
  const { name, description, schema, handler } = defineGitHubZenTool();
  server.tool(name, description, schema, handler);
}

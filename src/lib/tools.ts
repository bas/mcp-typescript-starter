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

// Register the hello tool with the server
export function registerHelloTool(server: McpServer, greeting: string) {
  const { name, description, schema, handler } = defineHelloTool(greeting);
  server.tool(name, description, schema, handler);
}

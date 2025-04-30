import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Define the example prompt


export function defineExamplePrompt() {
  return {
    name: "greeting-prompt",
    description: "A simple greeting prompt",
    schema: { name: z.string().optional() },
    handler: ({ name }: { name?: string }, _extra: any) => {
      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `Say hello to ${name || "friend"}!`,
            },
          },
        ]
      };
    },
  };
}

// Register the prompt with the server
export function registerExamplePrompt(server: McpServer) {
  const { name, description, schema, handler } = defineExamplePrompt();
  server.prompt(name, description, schema, handler);
}

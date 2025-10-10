import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol.js";
import {
  ElicitRequest,
  ElicitResultSchema,
  ServerRequest,
  ServerNotification,
} from "@modelcontextprotocol/sdk/types.js";

export function defineProgrammingSurvey() {
  return {
    name: "programming_favorites_survey",
    description:
      "Demonstrates the Elicitation feature by asking the user to provide information about their programming background.",
    schema: {},
    handler: async (_args: any, extra: RequestHandlerExtra<ServerRequest, ServerNotification>) => {
      try {
        // Request elicitation from the client
        const request: ElicitRequest = {
          method: "elicitation/create",
          params: {
            message: "Please tell us about your programming background!",
            requestedSchema: {
              type: "object",
              properties: {
                programmingLanguage: {
                  type: "string",
                  enum: ["TypeScript", "JavaScript", "Python", "Java", "Go"],
                  description: "Your preferred programming language",
                },
                experienceLevel: {
                  type: "string",
                  enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
                  description: "Your programming experience level",
                },
              },
              required: ["programmingLanguage", "experienceLevel"],
            },
          },
        };

        const elicitationResult = await extra.sendRequest(request, ElicitResultSchema);

        const content = [];

        if (
          elicitationResult.action === "accept" &&
          elicitationResult.content
        ) {
          content.push({
            type: "text" as const,
            text: `✅ Thank you for sharing your preferences!`,
          });

          const userResponses = elicitationResult.content as Record<string, string>;
          const { programmingLanguage, experienceLevel } = userResponses;
          content.push({
            type: "text" as const,
            text: `Here's your programming background:\n- Programming Language: ${
              programmingLanguage || "not specified"
            }\n- Experience Level: ${experienceLevel || "not specified"}`,
          });
        } else if (elicitationResult.action === "decline") {
          content.push({
            type: "text" as const,
            text: `❌ You declined to share your preferences.`,
          });
        } else if (elicitationResult.action === "cancel") {
          content.push({
            type: "text" as const,
            text: `⚠️ You cancelled the survey.`,
          });
        }

        return { content };
      } catch (error) {
        // Clean error handling - just report what happened
        const errorMessage =
          error instanceof Error ? error.message : String(error);

        if (
          errorMessage.includes("not supported") ||
          errorMessage.includes("not available")
        ) {
          return {
            content: [
              {
                type: "text" as const,
                text: `Elicitation is not yet supported by your MCP client! ✨`,
              },
            ],
          };
        }

        return {
          content: [
            {
              type: "text" as const,
              text: `❌ Survey error: ${errorMessage}`,
            },
          ],
        };
      }
    },
  };
}

// Register the survey tool with the server
export function registerProgrammingSurvey(server: McpServer) {
  const { name, description, schema, handler } = defineProgrammingSurvey();
  server.tool(name, description, schema, handler);
}

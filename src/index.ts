/**
 * MCP Server Template（Supabaseなし・最小構成版）
 *
 * 【カスタマイズ手順】
 * 1. wrangler.toml の name を変更
 * 2. "MyMcpAgent" を自分のサーバー名に変更
 * 3. "your-mcp-server" をサーバー名に変更
 * 4. 自分のツールを追加
 */
import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { pingToolDefinition, handlePing } from "./tools/ping";
import { sampleToolDefinition, handleSampleTool } from "./tools/sample_tool";
import { withLogging } from "./utils/logger";

export interface Env {
  MyMcpAgent: DurableObjectNamespace;
  // 必要な環境変数があればここに追加
  // EXAMPLE_API_KEY: string;
}

export class MyMcpAgent extends McpAgent<Env> {
  server = new McpServer({
    name: "your-mcp-server",  // ← 変更してください
    version: "1.0.0",
  });

  async init() {
    // ping（接続テスト）
    this.server.registerTool(
      pingToolDefinition.name,
      {
        description: pingToolDefinition.description,
        inputSchema: { message: z.string().optional() },
        annotations: {
          readOnlyHint: true,
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
        },
      },
      async ({ message }) => ({
        content: [{
          type: "text",
          text: await withLogging("ping", { message }, () => handlePing({ message })),
        }],
      })
    );

    // サンプルツール（カスタマイズしてください）
    this.server.registerTool(
      sampleToolDefinition.name,
      {
        description: sampleToolDefinition.description,
        inputSchema: {
          input: z.string().describe("入力値"),
        },
        annotations: {
          readOnlyHint: true,
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
        },
      },
      async ({ input }) => ({
        content: [{
          type: "text",
          text: await withLogging("sample_tool", { input },
            () => handleSampleTool({ input })
          ),
        }],
      })
    );
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return new Response(
        JSON.stringify({
          status: "ok",
          server: "your-mcp-server",
          version: "1.0.0",
          timestamp: new Date().toISOString(),
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    if (url.pathname === "/mcp") {
      return MyMcpAgent.serve("/mcp").fetch(request, env, ctx);
    }

    return new Response(
      JSON.stringify({
        name: "MCP Server Template (minimal)",
        mcp_endpoint: "/mcp",
        health_endpoint: "/health",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  },
} satisfies ExportedHandler<Env>;

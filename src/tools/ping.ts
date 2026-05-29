/**
 * Ping Tool（接続テスト用）
 */
export const pingToolDefinition = {
  name: "ping",
  description: "サーバーの接続テスト用ツールです。",
  inputSchema: {
    type: "object" as const,
    properties: {
      message: {
        type: "string",
        description: "エコーバックするメッセージ（任意）",
      },
    },
    required: [],
  },
};

export async function handlePing(args: { message?: string }): Promise<string> {
  return args.message
    ? `pong! Echo: ${args.message}`
    : "pong! サーバーは正常に動作しています。";
}

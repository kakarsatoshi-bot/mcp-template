/**
 * Sample Tool（サンプル実装）
 * DBなしで動くツールの例です。
 *
 * 【カスタマイズ例】
 * - 単位変換ツール（km↔miles、℃↔℉等）
 * - 外部APIをラップするツール（天気・為替等）
 * - テキスト処理ツール
 * - 静的データを返すツール（FAQ・カタログ等）
 */
export const sampleToolDefinition = {
  name: "sample_tool",
  description:
    "【カスタマイズしてください】サンプルツールです。" +
    "DBなしで動くツールの実装例として使ってください。",
  inputSchema: {
    type: "object" as const,
    properties: {
      input: {
        type: "string",
        description: "入力値",
      },
    },
    required: ["input"],
  },
};

export async function handleSampleTool(
  args: { input: string }
): Promise<string> {
  // ============================================
  // ここをカスタマイズしてください
  // 例：外部APIを叩く、計算する、変換する等
  // ============================================
  return JSON.stringify({
    input: args.input,
    output: `処理結果: ${args.input}（ここをカスタマイズしてください）`,
    timestamp: new Date().toISOString(),
  }, null, 2);
}

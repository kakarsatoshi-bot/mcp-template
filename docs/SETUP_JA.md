# セットアップガイド（日本語）

## 必要なもの

- Node.js 18以上
- Cloudflareアカウント（無料）
- GitHubアカウント

**Supabaseは不要です。**

## 手順

### 1. テンプレートを使用

「Use this template」ボタンから自分のリポジトリを作成してクローン：

```powershell
git clone https://github.com/あなたのアカウント/あなたのリポジトリ名
cd あなたのリポジトリ名
npm install
```

### 2. カスタマイズ

| ファイル | 変更内容 |
|---|---|
| `wrangler.toml` | `name` をサーバー名に変更 |
| `src/index.ts` | `MyMcpAgent`・`your-mcp-server` を変更 |
| `src/tools/sample_tool.ts` | 自分のツールに書き換え |

### 3. デプロイ

```powershell
npx wrangler login
npx wrangler deploy
```

### 4. 動作確認

```powershell
Invoke-RestMethod -Uri "https://あなたのサーバー名.あなたのアカウント.workers.dev/health"
```

### 5. Claude Desktopに接続

1. Claude Desktopを開く
2. 「+」→「コネクタ」→「コネクタを追加」→「カスタムコネクタを追加」
3. URL：`https://あなたのサーバー名.あなたのアカウント.workers.dev/mcp`

### 6. Smitheryに登録

1. [smithery.ai](https://smithery.ai) にログイン
2. 「Publish a server」→ URLを入力
3. 公開設定をオンにして完了

## よくある詰まりポイント

### Q. Claude DesktopでMCPが認識されない

**A.** 現在のClaude Desktopはリモート方式（URL）のみ対応しています。
必ずCloudflare WorkersにデプロイしてURLで接続してください。

### Q. wrangler deployでエラーが出る

**A.** `wrangler.toml` の `name` と `src/index.ts` の `MyMcpAgent` が
一致しているか確認してください。

### Q. 環境変数を使いたい

**A.** `src/index.ts` の `Env` インターフェースに追加して、
`npx wrangler secret put YOUR_KEY` で設定してください。

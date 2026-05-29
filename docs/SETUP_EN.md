# Setup Guide

## Prerequisites

- Node.js 18+
- Cloudflare account (free)
- GitHub account

**No Supabase required.**

## Steps

### 1. Use this template

Click "Use this template" and clone your repository:

```bash
git clone https://github.com/your-account/your-repo
cd your-repo
npm install
```

### 2. Customize

| File | What to change |
|---|---|
| `wrangler.toml` | Change `name` to your server name |
| `src/index.ts` | Rename `MyMcpAgent` and `your-mcp-server` |
| `src/tools/sample_tool.ts` | Replace with your own tool logic |

### 3. Deploy

```bash
npx wrangler login
npx wrangler deploy
```

### 4. Test

```bash
curl https://your-server-name.your-account.workers.dev/health
```

### 5. Connect to Claude Desktop

1. Open Claude Desktop
2. Click "+" → "Connectors" → "Add connector" → "Add custom connector"
3. Enter URL: `https://your-server-name.your-account.workers.dev/mcp`

### 6. Register on Smithery

1. Log in to [smithery.ai](https://smithery.ai)
2. Click "Publish a server" and enter your URL
3. Set visibility to public

## Common Issues

### Claude Desktop doesn't recognize the MCP server

Current Claude Desktop only supports remote MCP (URL-based).
Always deploy to Cloudflare Workers and connect via URL.

### wrangler deploy fails

Make sure `name` in `wrangler.toml` matches `MyMcpAgent` in `src/index.ts`.

### How to use environment variables

Add to the `Env` interface in `src/index.ts`, then run:
`npx wrangler secret put YOUR_KEY`

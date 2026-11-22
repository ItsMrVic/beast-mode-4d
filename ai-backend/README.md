# BEAST MODE AI Brain — secure backend setup (v4.41)

This is a **separate OpenAI-powered assistant**, not a connection to your personal ChatGPT conversation or its memory. The existing BEAST MODE web app can be installed or opened on iPhone and Android. The AI Brain page is available at \`ai-brain.html\` and linked from Coverage Lab.

**The AI feature is not live until you deploy your own backend and configure its secrets.** Do not paste OpenAI API keys into ChatGPT messages, browser pages, \`ai-brain.html\`, GitHub commits, code snippets or screenshots.

## What was implemented

- \`../ai-brain.html\`: English-only chat interface, local draw summary and context preview. It only sends selected summary data when you press **Send to AI Brain**.
- \`worker.js\`: Cloudflare Worker forwarding an authenticated request to the OpenAI Responses API.
- \`wrangler.jsonc\`: example deployment configuration with an allowed origin and a fixed model. Adjust the origin to the actual deployed web app.

The **AI access token** is a separate, randomly generated password for your Worker. It is **not the OpenAI API key**. A 24+ character secret is mandatory. It is held in browser memory for the current page session and must be re-entered when the page is reloaded.

## Install using Cloudflare dashboard (phone-friendly)

1. Create/sign in to an OpenAI API Platform account with billing enabled and set conservative usage/spending limits in the OpenAI project settings. ChatGPT Plus does not include API usage.
2. In the OpenAI Platform, create a project API key. **Do not share it**; it goes directly to the Worker's Secret setting.
3. Sign in to Cloudflare. Open **Workers & Pages** and create a Worker named something like \`beast-mode-ai-brain\`.
4. Paste the contents of this folder's \`worker.js\` into the Worker's code editor (replace any default Hello World code), save/deploy it.
5. Add these **Worker secrets**, using Cloudflare's Secrets setting rather than plain text variables:
   - \`OPENAI_API_KEY\`: the API key created in OpenAI Platform.
   - \`BEAST_AI_ACCESS_TOKEN\`: a different random secret **at least 24 characters long**.
6. Add **Worker environment variables**:
   - \`ALLOWED_ORIGIN\`: the exact scheme + host serving your BEAST MODE app, **without a path or trailing slash**. For example, GitHub Pages for this repository would commonly use \`https://itsmrvic.github.io\`. Confirm the actual address shown in your mobile browser. If using a custom domain, use its origin instead.
   - \`OPENAI_MODEL\`: \`gpt-5.4-mini\` (can be changed to another model supported by your API project).
7. Deploy the Worker and copy its HTTPS URL (usually ending in \`.workers.dev\`). In **BEAST MODE → Coverage Lab → Open AI Brain**, paste only this Worker URL and the separate \`BEAST_AI_ACCESS_TOKEN\`. Click **Use connection**, then ask a question. An empty worker or incorrect backend secret will show an error.
8. If the app uses a different origin on your iPhone versus Android, either use one canonical app URL or explicitly revise the backend to permit multiple authenticated origins. Do **not** use a permissive \`*\` origin on a private AI backend.

Cloudflare's desktop CLI/Wrangler is optional. If available:

\`\`\`bash
cd ai-backend
npx wrangler secret put OPENAI_API_KEY
npx wrangler secret put BEAST_AI_ACCESS_TOKEN
npx wrangler deploy
\`\`\`

Do not commit \`.dev.vars\`, \`.env\`, secret tokens, logs containing headers, or production credentials.

## Security and limitations

- The OpenAI API key is only sent from the Cloudflare Worker to the OpenAI API and is **never** embedded in the PWA.
- Only one exact HTTPS site origin is allowed by default. Each POST also requires your backend access token. CORS is **not a substitute for authentication**.
- The backend sends up to a bounded draw-data summary per question and last few chat messages. It uses \`store:false\` in the OpenAI Responses API.
- We deliberately did not grant write access to GitHub, the BEAST MODE database, financial accounts or gambling sites. AI Brain cannot place bets or auto-update predictions.
- Configure additional Cloudflare **rate-limiting/WAF** rules and OpenAI project budget limits before allowing other users access. The simple token mechanism is suitable for a small private prototype, not a public multi-user application with account management.
- Do not advertise the backend URL together with the access token. Rotate the access token if exposed.
- If the app is offline, the saved draw overview may still display, but live AI chat requires an Internet connection and a running Worker.
- Local PWA data is device/origin-specific; AI Brain does not automatically read your entire ChatGPT conversation or sync all iPhone/Android browser databases.
- Model analysis of historical lottery draws **does not show the next draw is predictable**. Past hot/rare rates must not be labeled as future win probabilities.

## Validation

The repository includes \`scripts/check-ai-brain.mjs\` which checks the Worker authentication gate, origin restriction, request-size cap, response mapping and \`store:false\` behavior against a mocked OpenAI response, without spending API credits. Use \`node scripts/check-ai-brain.mjs\` on Node 22+.

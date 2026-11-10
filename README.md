# RelayMind AI — Round 2 MVP

A project knowledge handover app. Capture decisions, tasks, blockers, risks and notes while work happens, then generate an evidence-linked handover with Gemini.

## Requirements
- Node.js 20.9+
- npm
- MongoDB Atlas connection string
- Gemini API key

## Windows / VS Code setup
1. Extract this ZIP and open the `RelayMind_AI` folder in VS Code.
2. Open Terminal → New Terminal.
3. Run:
   ```powershell
   node -v
   npm -v
   npm install
   Copy-Item .env.example .env.local
   ```
4. Open `.env.local` and replace values:
   ```env
   MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@YOUR-CLUSTER.mongodb.net/?retryWrites=true&w=majority
   MONGODB_DB=relaymind_ai
   GEMINI_API_KEY=YOUR_GEMINI_API_KEY
   GEMINI_MODEL=gemini-3.8-flash
   ```
5. In MongoDB Atlas create a database user, allow your current IP in Network Access and copy the Node.js connection string. URL-encode special characters in the password.
6. Run:
   ```powershell
   npm run dev
   ```
7. Open http://localhost:3000

## First working test
Create a project. Add a decision, a completed task, a pending task and a blocker. Click **Generate AI handover**. Check that the returned evidence IDs match the activity IDs in the timeline.

## API routes
- GET `/api/health`
- GET/POST `/api/projects`
- GET/POST `/api/activities`
- POST `/api/handovers`

## Deploy
Push to GitHub without `.env.local`. Import the repo into Vercel and add `MONGODB_URI`, `MONGODB_DB`, `GEMINI_API_KEY`, `GEMINI_MODEL` as environment variables. Confirm Atlas network access allows the deployment.

## Current MVP limitations
- No user login or production-grade authorization yet.
- Use synthetic, public or permissioned demo data only. Do not upload confidential information.
- Evidence IDs refer to stored records; optional external URLs are not independently verified.
- AI handover is a draft and must be reviewed.
- GitHub OAuth/live sync and document upload parsing are not included in this first build; manual capture is the first working source.

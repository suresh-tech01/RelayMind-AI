# Architecture

Browser → Next.js UI → API routes → MongoDB Atlas.

For handover generation: API loads the selected project's activity records, sends those records to Gemini from the server, receives structured JSON, saves the handover and returns it to the UI.

Security notes: API keys remain server-side. This hackathon MVP has no end-user authentication or project-level authorization. Use synthetic/public/permissioned demo data only. Add authentication, authorization, rate limits and audit logs before real confidential use.

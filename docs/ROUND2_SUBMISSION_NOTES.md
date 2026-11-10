# Round 2 submission notes — verify before submitting

## Implemented in this starter
- Project creation and workspace
- Manual knowledge capture for decisions, tasks, blockers, risks and notes
- Activity timeline with owner, status, date and optional evidence URL
- Gemini-generated structured handover
- Evidence record IDs in generated claims
- Missing information and next actions
- Printable report

## Implementation
- Next.js App Router and server-side API routes
- MongoDB Atlas: projects, activities and handovers collections
- Gemini REST API called only on the server
- Environment variables for credentials

## Changes from Round 1 plan
- Use Next.js API routes instead of a separately deployed Express server to simplify solo development.
- Start with manual knowledge capture; GitHub sync and document parsing are later additions.
- Focus on the complete handover workflow before adding more integrations.

## Three proposed Round 3 improvements
1. Better detection of missing and conflicting evidence.
2. Stronger role-based access and secure handover sharing.
3. Evidence-backed Q&A for the incoming member.

## Verify and update actual status
- [ ] Project creation tested
- [ ] Activity capture tested
- [ ] Timeline tested
- [ ] Gemini generation tested
- [ ] Evidence references checked
- [ ] Build and lint pass
- [ ] Deployed URL tested

Working app: [ADD URL]
Source repository: [ADD URL]
Updated PDF: [ADD DRIVE LINK]

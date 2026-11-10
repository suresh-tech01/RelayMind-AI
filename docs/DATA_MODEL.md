# Data model

## projects
- MongoDB `_id`, name, description, createdAt

## activities
- MongoDB `_id`, projectId, type (decision/task/blocker/risk/note), title, description, owner, status, evidence, createdAt

## handovers
- MongoDB `_id`, projectId, incomingMember, structured content, sourceActivityIds, createdAt

Evidence IDs are traceability references to records supplied to the model. They are not independent proof that the underlying record is accurate.

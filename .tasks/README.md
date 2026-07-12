# Task Tracking System — CommerceOS

This directory manages the project's execution flow. Every build session from the [session-by-session build guide](../CommerceOS-Docs/11-build-guide/01-session-by-session-build-guide.md) is tracked as a task file that moves through the pipeline.

## Pipeline

```
backlog/        →        next/        →        in-progress/        →        completed/
(future work)     (prepared & ready)     (actively being built)      (done & verified)
```

## How It Works

| Folder | Contains | Rules |
|---|---|---|
| `backlog/` | All future sessions/tasks not yet prepared | Ordered by dependency. Do not start until predecessors are in `completed/` |
| `next/` | The **next 1–2 tasks** fully prepared with specs, acceptance criteria, and file targets | Always populated. When `in-progress/` completes, the agent pulls from here |
| `in-progress/` | The task currently being built | Maximum **one task** at a time (unless explicitly parallelized per the build guide) |
| `completed/` | Finished tasks with verification results | Never deleted. Serves as an audit trail |

## Task File Format

Each task file follows this template:

```markdown
# Session N — [Title]

## Status: [BACKLOG | NEXT | IN_PROGRESS | COMPLETED]

## Dependencies
- [x] Session X (completed)
- [ ] Session Y (required)

## Objective
What this session achieves in one sentence.

## Deliverables
- [ ] Specific file or feature to build
- [ ] Test to write
- [ ] Doc to update

## Acceptance Criteria
- [ ] "Done When" checks from the build guide

## Files to Touch
- `path/to/file.ts` — what changes

## Notes
Any context, decisions, or blockers.
```

## Agent Rule

**Before completing any task, the agent must ensure `next/` contains at least one fully prepared task file.** This guarantees zero downtime between sessions — when one task finishes, the next is already spec'd and ready to execute.

# 📘 PrismCode Decision Log

This document records important architectural and engineering decisions made during the development of PrismCode.

Each decision includes:
- Context
- Decision
- Reason
- Impact

---

# ADR-001 : ES Modules over CommonJS

## Context

The project required a modern JavaScript module system that aligns with the latest Node.js ecosystem.

## Decision

Use ES Modules (`import` / `export`) instead of CommonJS (`require` / `module.exports`).

## Reason

- Modern JavaScript standard
- Cleaner syntax
- Better compatibility with modern tooling
- Improved readability

## Impact

The entire backend follows the ES Module architecture.

---

# ADR-002 : MVC + Service Layer Architecture

## Context

Business logic should remain independent from HTTP request handling.

## Decision

Use MVC Architecture with a dedicated Service Layer.

## Reason

- Better Separation of Concerns
- Easier testing
- Better scalability
- Cleaner controllers

## Impact

Controllers only manage requests and responses while Services contain business logic.

---

# ADR-003 : AI Review Caching

## Context

Generating AI reviews repeatedly increases response time and API cost.

## Decision

Store generated AI reviews inside the Project document.

## Reason

- Reduce AI API calls
- Faster response time
- Better user experience

## Impact

Previously generated reviews are reused until the project code changes.

---

# ADR-004 : Review Invalidation Strategy

## Context

An AI review becomes outdated whenever the source code changes.

## Decision

Automatically invalidate the review after code updates.

## Reason

- Prevent outdated reviews
- Maintain review accuracy
- Ensure data consistency

## Impact

Whenever project code changes:

- review becomes empty
- status becomes pending
- reviewedAt becomes null

---

# ADR-005 : Soft Delete Strategy

## Context

Users may accidentally delete projects.

Future versions will support Trash and Restore features.

## Decision

Use Soft Delete instead of Hard Delete.

## Reason

- Recover deleted projects
- Future Trash feature
- Better user experience
- Maintain audit history

## Impact

Deleted projects are hidden from normal queries but remain in the database.

---

# ADR-006 : Shared Prompt Architecture

## Context

The AI prompt should not remain inside the service layer.

## Decision

Move prompts into the shared/prompts directory.

## Reason

- Better maintainability
- Easier prompt versioning
- Cleaner services

## Impact

Business logic remains independent from prompt construction.

---

# ADR-007 : Shared Constants

## Context

Hardcoded strings increase maintenance cost and introduce typo-related bugs.

## Decision

Extract shared constants into dedicated modules.

## Reason

- Single source of truth
- Better readability
- Easier maintenance

## Impact

Status values, roles and reusable messages are managed centrally.

---

# ADR-008 : Centralized Error Handling

## Context

Error handling should remain consistent throughout the application.

## Decision

Introduce AppError and a global error handler.

## Reason

- Consistent API responses
- Cleaner services
- Better debugging

## Impact

Operational errors are handled uniformly across the application.

---

# ADR-009 : Async Controller Wrapper

## Context

Writing try/catch blocks in every controller creates unnecessary duplication.

## Decision

Use asyncHandler for all asynchronous controllers.

## Reason

- Cleaner controllers
- Less repetitive code
- Automatic error forwarding

## Impact

Controllers focus only on request handling while errors are forwarded automatically.

---

# ADR-010 : Documentation First

## Context

Professional software requires documentation alongside implementation.

## Decision

Maintain README, CHANGELOG and Decision Log throughout development.

## Reason

- Easier onboarding
- Better project understanding
- Professional project maintenance

## Impact

Project documentation evolves together with the codebase.
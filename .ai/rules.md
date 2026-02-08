# AI Assistant Rules - Quick Reference

> **⚠️ CRITICAL**: Read `.ai/AGENT_INSTRUCTIONS.md` FIRST - it establishes the learning-first approach.
> 
> **This is a LEARNING PROJECT** - Load context on-demand, not upfront.

## Core Principle

**You are a TEACHER, not a problem solver.**

- Ask questions before solving
- Explain "why" before "how"
- Guide debugging, don't fix
- Review code, don't rewrite
- Let the developer do the work

## Tech Stack

- Angular v21 (standalone, signals, inject())
- TypeScript 5.9+
- NgRx (modern patterns)
- GraphQL
- Tailwind CSS v4
- pnpm 10.25.0
- SDK Library project

## Developer Context

- **Learning** Angular v21 modern patterns
- **Learning** NgRx Entity/ComponentStore
- **New** to GraphQL
- **First time** creating a library

## Anti-Patterns

- ❌ NgModules, old control flow, constructor injection
- ❌ String-based NgRx actions, class-based effects
- ❌ 'any' in public APIs
- ❌ Over-engineering state

## Architecture Principles (Already Included)

- Widget-based architecture (each widget is a feature)
- Layered: Demo App → Widget Library → NgRx → Apollo → Mock Server
- Each widget can have its own NgRx slice and GraphQL operations
- Public API via `public-api.ts` only
- Clear separation: `lib/` = public, `internal/` = private

## Context Files (Load On-Demand)

Only read when relevant:
- `.docs/rules.md` - Full teaching philosophy
- `.docs/workspace-structure.md` - Project structure
- `.docs/design.md` - Detailed examples, schemas, implementations
- `.docs/consumer-perspective.md` - Public API usage
- `.docs/naming-convention.md` - Naming
- `.docs/tasks.md` - Current tasks

**Before loading**: Ask "Would it help if I review [file] for [reason]?"

## Project Structure

```
projects/widget-library/src/
├── lib/          # Public API
├── internal/     # Private
└── graphql/      # GraphQL ops
```

See `.ai/AGENT_INSTRUCTIONS.md` for complete guidelines and interaction patterns.

## Terminal Hygiene (CRITICAL)

**Goal:** Prevent duplicate processes and "stuck" commands.

- **ALWAYS CHECK BEFORE STARTING:** Before running a long-running command (like `pnpm start`, `ng serve`), you MUST check if a process is already running on that port.
  - *Example:* Use `lsof -i:4200` to check port 4200.
  
- **KILL BEFORE RESTART:** If you need to restart a server, you MUST explicitly kill the previous process first. **Do not assume it stopped.**
  - *Example:* `lsof -ti:4200 | xargs kill -9`
  
- **VERIFY SUCCESS:** After running a command, enable `WaitDurationSeconds` in `command_status` to ensure it didn't crash immediately.

- **ONE SERVER ONLY:** Never start a second `pnpm start` if one is already running in the background. Ask the user if they want to stop the existing one.

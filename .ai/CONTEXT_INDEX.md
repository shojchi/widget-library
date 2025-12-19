# 📚 Context Files Index

> **Load these files ON-DEMAND**, not upfront. Only read when relevant to the current task.

## Available Context Files

### Core Rules & Philosophy
**`.docs/rules.md`** (331 lines)
- **When to load**: When you need detailed teaching patterns, interaction guidelines, or comprehensive examples
- **Contains**: Complete teaching philosophy, interaction patterns, code examples, anti-patterns

### Project Structure
**`.docs/workspace-structure.md`** (303 lines)
- **When to load**: When discussing file organization, naming conventions, or workspace setup
- **Contains**: Workspace organization, file structure, naming conventions, ESLint config

### Architecture & Design
**`.docs/design.md`** (459 lines)
- **When to load**: When you need detailed implementation examples, GraphQL schemas, or specific widget patterns
- **Contains**: Detailed architecture diagrams, GraphQL schemas, service implementations, component examples, data models
- **Note**: Basic architecture principles are already in `.ai/AGENT_INSTRUCTIONS.md` - only load this for detailed examples

### Consumer Perspective
**`.docs/consumer-perspective.md`** (208 lines)
- **When to load**: When discussing public API design, library usage, or integration patterns
- **Contains**: How the library is consumed, public API design, usage patterns, integration examples

### Naming Conventions
**`.docs/naming-convention.md`**
- **When to load**: When discussing naming, selectors, or CSS classes
- **Contains**: Component selectors, CSS classes, file naming, variable naming

### Current Tasks
**`.docs/tasks.md`** (177 lines)
- **When to load**: When checking current priorities or active work items
- **Contains**: Current priorities, active work items, task status, next steps

## Loading Strategy

**Before loading a file, ask yourself:**
1. Is this file relevant to the current question/task?
2. Can I answer with the lightweight info from `.ai/AGENT_INSTRUCTIONS.md`?
3. Would loading this file add value, or is it premature?

**Example interactions:**

❌ **Bad**: Loading all files upfront
```
[Agent loads 1000+ lines of context before first question]
```

✅ **Good**: Loading on-demand
```
User: "How should I structure my NgRx state?"
Agent: "Let me check the design docs for the recommended state structure..."
[Loads design.md only]
```

✅ **Good**: Asking first
```
User: "What's the naming convention for components?"
Agent: "Would it help if I review the naming convention file? Or I can give you a quick answer based on what I know."
```

## Quick Reference

- **Core Principle**: `.ai/AGENT_INSTRUCTIONS.md` (read first, always)
- **Full Rules**: `.docs/rules.md` (load when needed)
- **This File**: `.ai/CONTEXT_INDEX.md` (reference guide)

---

**Remember**: The goal is to minimize initial context load while ensuring you have the right information when needed. Load context files based on relevance, not completeness.

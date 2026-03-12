# AI Assistant Rules System

This project uses a **multi-file rules system** to ensure consistent AI assistant behavior across different IDEs and tools.

## 🚨 START HERE

**Before assisting with this project:**
1. **Read `.ai/AGENT_INSTRUCTIONS.md`** - Main instructions (READ THIS FIRST - lightweight, ~150 lines)
2. **Load context on-demand** - Only read `.docs/` files when relevant to the current task

**This is a LEARNING PROJECT** - The developer needs to do manual work. Load context files only when needed.

## 📁 Project Structure

```
.ai/                          # AI Assistant Configuration
├── AGENT_INSTRUCTIONS.md     # Main instructions (read first!)
├── CONTEXT_INDEX.md          # Context file reference
├── README.md                 # This file - AI rules system overview
├── rules.md                  # Quick reference
├── sync-rules.js             # Rules sync script
├── sync-agents.sh            # Agent files sync script (if symlinks don't work)
└── agents/                   # Source of truth for agent files
    ├── README.md             # Agent files documentation
    ├── .cursorrules          # Cursor, Windsurf, Cline
    ├── .windsurfrules        # Windsurf AI
    ├── .clinerules           # Cline AI
    ├── .aiderrules           # Aider AI
    ├── copilot-instructions.md  # GitHub Copilot
    └── .anthropic/           # Claude Desktop
        └── README.md

.docs/                        # Project Context (the "brain")
├── README.md                 # Documentation index
├── rules.md                  # Master rules
├── workspace-structure.md    # Project structure
├── design.md                 # Architecture
├── consumer-perspective.md   # Public API
├── naming-convention.md      # Naming standards
├── tasks.md                  # Current tasks
└── requirements.md           # Requirements

Root level:
└── (No agent files in root - all in .ai/agents/)
```

## 📋 Rules File Locations

| File | Purpose | Used By | Location |
|------|---------|---------|----------|
| **`.ai/AGENT_INSTRUCTIONS.md`** | **Main instructions** | **ALL AI agents** | **Read first!** |
| `.docs/rules.md` | **Master rules** (331 lines) | Primary source of truth | Load on-demand |
| `.docs/workspace-structure.md` | Project structure | All agents | Load on-demand |
| `.docs/design.md` | Architecture | All agents | Load on-demand |
| `.docs/consumer-perspective.md` | Library usage | All agents | Load on-demand |
| `.docs/naming-convention.md` | Naming standards | All agents | Load on-demand |
| `.docs/tasks.md` | Current tasks | All agents | Load on-demand |
| `.ai/agents/.cursorrules` | IDE-compatible rules | Cursor, Windsurf, Cline | **In .ai/agents/** |
| `.ai/agents/.windsurfrules` | Windsurf-specific | Windsurf AI | **In .ai/agents/** |
| `.ai/agents/.clinerules` | Cline-specific | Cline AI | **In .ai/agents/** |
| `.ai/agents/.aiderrules` | Aider-specific | Aider AI | **In .ai/agents/** |
| `.ai/agents/copilot-instructions.md` | GitHub Copilot | GitHub Copilot | **In .ai/agents/** |
| `.ai/agents/.anthropic/README.md` | Claude Desktop | Claude Desktop | **In .ai/agents/** |
| `.ai/rules.md` | Quick reference | Generic AI assistants | Always available |
| `.ai/CONTEXT_INDEX.md` | Context file index | All agents | Always available |
| **`.ai/agents/`** | **Source of truth** | **All agent files** | **Edit here!** |

> **📍 Location**: All agent files are in `.ai/agents/` - no root-level files needed. Configure your tools to read from `.ai/agents/` or use `.ai/sync-agents.sh` if a tool requires root-level files.

## 🎯 Core Philosophy

**Teaching First, Solving Second**

AI assistants working on this project should:
- ✅ **Guide and teach** rather than provide complete solutions
- ✅ **Explain the "why"** behind every suggestion
- ✅ **Ask clarifying questions** before jumping to code
- ✅ **Review and suggest** rather than rewrite
- ✅ **Build understanding** layer by layer

## 🛠️ Client Side Tech Stack Context

- **Framework**: Angular v21 (standalone, signals, modern patterns)
- **State**: NgRx (Store, Effects, Entity, ComponentStore)
- **Language**: TypeScript 5.9+
- **API**: [metacom](https://github.com/metarhia/metacom)
- **Package Manager**: pnpm 10.25.0
- **Project Type**: Web Clieent Application

## 📚 For AI Assistants

### Quick Start
1. **Read `.ai/AGENT_INSTRUCTIONS.md`** (required! - lightweight initial load)
2. Understand the core principle: **This is a LEARNING PROJECT** - teach, don't solve
3. Load context files on-demand based on the current task (see `.ai/CONTEXT_INDEX.md`)
4. Check `.cursorrules` for condensed guidelines
5. Follow the teaching-first approach

**Don't load all context files upfront!** Only read `.docs/` files when relevant.

### Key Learning Areas

- Modern Angular v21 patterns (standalone components, signals, inject())
- NgRx modern APIs (Entity adapters, ComponentStore, functional effects)

### Anti-Patterns to Watch For

- ❌ NgModules for new code
- ❌ Old control flow syntax (*ngIf, *ngFor)
- ❌ String-based NgRx actions
- ❌ Class-based effects
- ❌ Using 'any' in public APIs
- ❌ Over-engineering with NgRx for local state
- ❌ Old styling patterns (deep-nested SCSS/BEM instead of Tailwind)

## 🔄 Keeping Rules in Sync

### Agent Files (Consolidated)

- **Location**: `.ai/agents/` (single source of truth)
- **Root files**: None - all files in `.ai/agents/`
- **To edit**: Edit files directly in `.ai/agents/`
- **If tools require root files**: Run `.ai/sync-agents.sh` to copy files to root, or configure tools to read from `.ai/agents/`

### Master Rules

The master rules are in `.docs/rules.md`.

When updating rules:
1. Update the master file first (`.docs/rules.md`)
2. Sync relevant changes to `.ai/agents/.cursorrules` and other agent files
3. Update `.ai/agents/copilot-instructions.md` if needed
4. Keep `.ai/rules.md` as a high-level index
5. Update `.ai/AGENT_INSTRUCTIONS.md` if core principles change

## 🚀 For Developers

### Editing Agent Files

**Edit files directly in `.ai/agents/`** - this is the only location.

If a tool requires files in root (most don't), you can:
```bash
# Use the sync script to copy to root
./.ai/sync-agents.sh

# Or configure the tool to read from .ai/agents/ (preferred)
```

### Adding New Rules

1. Edit `.docs/rules.md` (master rules)
2. Update relevant agent files in `.ai/agents/`
3. Run sync script if needed (for non-symlink systems)
4. Commit all rule files together

### Testing Rules

Start a conversation with your AI assistant and verify:
- It asks clarifying questions before solving
- It explains concepts and trade-offs
- It guides you through debugging
- It respects your learning journey

## 📖 Documentation

### Full Rules Documentation

See `.docs/rules.md` for:
- Complete teaching philosophy
- Detailed tech stack guidance
- Learning progression path
- Specific interaction patterns
- Code examples and anti-patterns

### Quick Reference

See `.cursorrules` for:
- Condensed guidelines
- Code style examples
- Common patterns
- Quick anti-pattern reference

### Context Index

See `.ai/CONTEXT_INDEX.md` for:
- Complete list of context files
- When to load each file (on-demand strategy)
- Loading examples and best practices

## 🎓 Philosophy in Action

**Example: When you ask "How do I add NgRx Entity?"**

❌ **Bad Response** (Solving):
```typescript
// Here's the complete code:
export const adapter = createEntityAdapter<Widget>();
// ... (complete implementation)
```

✅ **Good Response** (Teaching):
```
Let me help you understand NgRx Entity first:

1. What problem does it solve for you?
   - Managing collections (arrays) in state
   - CRUD operations without manual array manipulation
   - Normalized data structure

2. Have you worked with normalized data before?
   [Wait for response, then continue based on understanding]

3. Let's start with the adapter concept...
   [Progressive explanation with examples]

4. Now, what collection are you trying to manage?
   [Guide implementation based on their specific use case]
```

## 🔗 Related Files

- `.npmrc` - pnpm configuration
- `angular.json` - Angular workspace config
- `package.json` - Project dependencies
- `tsconfig.json` - TypeScript configuration

---

**Remember**: These rules exist to create a **learning-focused development environment** where AI assistants act as teachers and guides, not just code generators.

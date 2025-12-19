# Project Structure - AI Configuration

## 📁 Directory Organization

### `.ai/` - AI Assistant Configuration
**Single source of truth for all AI-related configuration**

```
.ai/
├── AGENT_INSTRUCTIONS.md     # Main instructions (read first!)
├── CONTEXT_INDEX.md          # Context file reference guide
├── README.md                 # AI rules system overview
├── rules.md                  # Quick reference
├── STRUCTURE.md              # This file - structure documentation
├── sync-rules.js             # Rules sync script
├── sync-agents.sh            # Agent files sync script (fallback)
└── agents/                   # ⭐ Source of truth for agent files
    ├── README.md             # Agent files documentation
    ├── .cursorrules          # Cursor, Windsurf, Cline
    ├── .windsurfrules        # Windsurf AI
    ├── .clinerules           # Cline AI
    ├── .aiderrules           # Aider AI
    ├── copilot-instructions.md  # GitHub Copilot
    └── .anthropic/           # Claude Desktop
        └── README.md
```

### `.docs/` - Project Context
**The "brain" of the application - complete project documentation**

```
.docs/
├── README.md                 # Documentation index
├── rules.md                  # Master rules (teaching philosophy)
├── workspace-structure.md    # Project structure & conventions
├── design.md                 # Architecture & design decisions
├── consumer-perspective.md   # Public API & library usage
├── naming-convention.md      # Naming standards
├── tasks.md                  # Current tasks & priorities
└── requirements.md           # Project requirements
```

### Root Level - Clean
**No agent files in root - all consolidated in `.ai/agents/`**

```
Root/
└── (No agent files - clean root directory)
```

## 🎯 Consolidated Structure

1. **All agent files** are in `.ai/agents/`
2. **No root-level files** - clean project root
3. **Single source of truth** - edit files in `.ai/agents/`
4. **Tools configured** to read from `.ai/agents/` or use sync script if needed

## ✏️ Editing Workflow

### To Edit Agent Files:
1. Edit files directly in `.ai/agents/` (e.g., `.ai/agents/.cursorrules`)
2. That's it! Files are in one location only

### If Tools Require Root-Level Files:
```bash
# Run the sync script to copy to root
./.ai/sync-agents.sh

# Or better: configure the tool to read from .ai/agents/
```

Most modern tools can be configured to read from `.ai/agents/` directly.

## 📚 File Purposes

### Main Instructions
- **`.ai/AGENT_INSTRUCTIONS.md`** - Read this first! Lightweight initial load (~150 lines)

### Context Files (Load On-Demand)
- **`.docs/rules.md`** - Full teaching philosophy (load when needed)
- **`.docs/workspace-structure.md`** - Project structure (load when discussing organization)
- **`.docs/design.md`** - Architecture (load when discussing design)
- **`.docs/consumer-perspective.md`** - Public API (load when discussing usage)
- **`.docs/naming-convention.md`** - Naming (load when discussing naming)
- **`.docs/tasks.md`** - Tasks (load when checking priorities)

### Agent-Specific Files
- **`.ai/agents/.cursorrules`** - Cursor, Windsurf, Cline, Roo-Cline
- **`.ai/agents/.windsurfrules`** - Windsurf AI
- **`.ai/agents/.clinerules`** - Cline AI
- **`.ai/agents/.aiderrules`** - Aider AI
- **`.ai/agents/copilot-instructions.md`** - GitHub Copilot
- **`.ai/agents/.anthropic/README.md`** - Claude Desktop

## 🎯 Key Principles

1. **Single Source of Truth**: All agent files in `.ai/agents/`
2. **Clean Root**: No agent files in root directory
3. **Lazy Loading**: Context files in `.docs/` loaded on-demand
4. **Clear Structure**: Everything organized and documented

## 🔄 Maintenance

### Adding a New Agent File:
1. Create file in `.ai/agents/`
2. Document in `.ai/agents/README.md`
3. Configure tool to read from `.ai/agents/` (or use sync script if needed)

### Updating Rules:
1. Update `.docs/rules.md` (master)
2. Update relevant files in `.ai/agents/`
3. That's it! Files are in one location

---

**Remember**: All agent files are in `.ai/agents/` - edit them there directly!

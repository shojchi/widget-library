# Agent-Specific Configuration Files

> **This directory contains all agent-specific configuration files.**
> 
> **All agent files are consolidated here** - no root-level files needed.

## 📁 Files in This Directory

| File | Purpose | For Tools |
|------|---------|-----------|
| `.cursorrules` | Cursor, Windsurf, Cline, Roo-Cline | Cursor, Windsurf, Cline |
| `.windsurfrules` | Windsurf AI | Windsurf |
| `.clinerules` | Cline AI | Cline |
| `.aiderrules` | Aider AI | Aider |
| `copilot-instructions.md` | GitHub Copilot | GitHub Copilot |
| `.anthropic/README.md` | Claude Desktop | Claude Desktop |

## 🎯 Single Source of Truth

**All agent configuration files are in `.ai/agents/`** - no root-level files needed.

**Benefits:**
- ✅ **Clean root directory** - No clutter in project root
- ✅ **Single source of truth** - All agent configs in one place
- ✅ **Easy to find** - Everything organized in `.ai/agents/`
- ✅ **Easy to maintain** - Edit files in one location

## 🔧 Tool Configuration

Most modern AI tools can be configured to read from `.ai/agents/`:

- **Cursor**: Can read `.ai/agents/.cursorrules` or configure custom path
- **Windsurf**: Can read `.ai/agents/.windsurfrules` or configure custom path
- **Cline**: Can read `.ai/agents/.clinerules` or configure custom path
- **Aider**: Can read `.ai/agents/.aiderrules` or configure custom path
- **GitHub Copilot**: Can be configured to read `.ai/agents/copilot-instructions.md`
- **Claude Desktop**: Can read `.ai/agents/.anthropic/README.md`

## ✏️ Editing Agent Files

**Edit files directly in `.ai/agents/`** - this is the only location.

## 🔄 If Tools Require Root-Level Files

If a specific tool requires files in root, you can:

1. **Configure the tool** to look in `.ai/agents/` (preferred)
2. **Use the sync script**: `./.ai/sync-agents.sh` to copy files to root
3. **Create symlinks manually** if needed: `ln -s .ai/agents/.cursorrules .cursorrules`

## 📚 Related

- **Main Instructions**: `.ai/AGENT_INSTRUCTIONS.md` (read first)
- **Context Files**: `.docs/` (project documentation)
- **Sync Script**: `.ai/sync-agents.sh` (for copying to root if needed)

---

**Remember**: This directory is the **single source of truth** for all agent-specific configurations. No root-level files needed!

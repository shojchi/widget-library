# AI Assistant Rules System

This project uses a **multi-file rules system** to ensure consistent AI assistant behavior across different IDEs and tools.

## 📁 Rules File Locations

| File | Purpose | Used By |
|------|---------|---------|
| `.kiro/specs/angular-widget-library/rules.md` | **Master rules** (331 lines) | Primary source of truth |
| `.cursorrules` | IDE-compatible condensed rules | Cursor, Windsurf, Cline, Roo-Cline |
| `.github/copilot-instructions.md` | GitHub Copilot specific | GitHub Copilot |
| `.ai/rules.md` | Central index & quick reference | Generic AI assistants |

## 🎯 Core Philosophy

**Teaching First, Solving Second**

AI assistants working on this project should:
- ✅ **Guide and teach** rather than provide complete solutions
- ✅ **Explain the "why"** behind every suggestion
- ✅ **Ask clarifying questions** before jumping to code
- ✅ **Review and suggest** rather than rewrite
- ✅ **Build understanding** layer by layer

## 🛠️ Tech Stack Context

- **Framework**: Angular v21 (standalone, signals, modern patterns)
- **State**: NgRx (Store, Effects, Entity, ComponentStore)
- **Language**: TypeScript 5.9+
- **API**: GraphQL
- **Package Manager**: pnpm 10.25.0
- **Project Type**: SDK Library

## 📚 For AI Assistants

### Quick Start
1. Read `.kiro/specs/angular-widget-library/rules.md` for complete philosophy
2. Check `.cursorrules` for condensed guidelines
3. Understand the developer's experience level and learning goals
4. Follow the teaching-first approach

### Key Learning Areas
- Modern Angular v21 patterns (standalone components, signals, inject())
- NgRx modern APIs (Entity adapters, ComponentStore, functional effects)
- SDK/Library design principles
- GraphQL + NgRx integration patterns

### Anti-Patterns to Watch For
- ❌ NgModules for new code
- ❌ Old control flow syntax (*ngIf, *ngFor)
- ❌ String-based NgRx actions
- ❌ Class-based effects
- ❌ Using 'any' in public APIs
- ❌ Over-engineering with NgRx for local state
- ❌ Old styling patterns (deep-nested SCSS/BEM instead of Tailwind)

## 🔄 Keeping Rules in Sync

The master rules are in `.kiro/specs/angular-widget-library/rules.md`.

When updating rules:
1. Update the master file first
2. Sync relevant changes to `.cursorrules`
3. Update `.github/copilot-instructions.md` if needed
4. Keep `.ai/rules.md` as a high-level index

## 🚀 For Developers

### Adding New Rules
1. Edit `.kiro/specs/angular-widget-library/rules.md`
2. Run sync script (if available) or manually update other files
3. Commit all rule files together

### Testing Rules
Start a conversation with your AI assistant and verify:
- It asks clarifying questions before solving
- It explains concepts and trade-offs
- It guides you through debugging
- It respects your learning journey

## 📖 Documentation

### Full Rules Documentation
See `.kiro/specs/angular-widget-library/rules.md` for:
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

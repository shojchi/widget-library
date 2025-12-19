#!/bin/bash

# Sync Agent Files Script
# Copies agent files from .ai/agents/ to their expected locations
# Use this if symlinks don't work on your system

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
AGENTS_DIR="$PROJECT_ROOT/.ai/agents"

echo "🔄 Syncing agent files from .ai/agents/ to root..."
echo ""

# Copy root-level agent files
cp "$AGENTS_DIR/.cursorrules" "$PROJECT_ROOT/.cursorrules"
echo "✅ Copied .cursorrules"

cp "$AGENTS_DIR/.windsurfrules" "$PROJECT_ROOT/.windsurfrules"
echo "✅ Copied .windsurfrules"

cp "$AGENTS_DIR/.clinerules" "$PROJECT_ROOT/.clinerules"
echo "✅ Copied .clinerules"

cp "$AGENTS_DIR/.aiderrules" "$PROJECT_ROOT/.aiderrules"
echo "✅ Copied .aiderrules"

# Copy anthropic directory
if [ -d "$AGENTS_DIR/.anthropic" ]; then
  rm -rf "$PROJECT_ROOT/.anthropic"
  cp -r "$AGENTS_DIR/.anthropic" "$PROJECT_ROOT/.anthropic"
  echo "✅ Copied .anthropic/"
fi

# Copy copilot instructions
if [ -f "$AGENTS_DIR/copilot-instructions.md" ]; then
  mkdir -p "$PROJECT_ROOT/.github"
  cp "$AGENTS_DIR/copilot-instructions.md" "$PROJECT_ROOT/.github/copilot-instructions.md"
  echo "✅ Copied .github/copilot-instructions.md"
fi

echo ""
echo "✨ All agent files synced!"
echo ""
echo "💡 Tip: If your system supports symlinks, use them instead:"
echo "   See .ai/agents/README.md for symlink setup"

# What Consumers See - Visual Guide

## 📦 Package Distribution

### What Gets Published to npm (Consumers Get This)

```
widget-library@0.0.1
├── index.d.ts              # TypeScript definitions
├── esm2022/                # ES modules
├── fesm2022/               # Flat ES modules
├── package.json            # Library package.json
└── README.md               # Library documentation
```

**Source**: `projects/widget-library/` → Built to → `dist/widget-library/` → Published to npm

**Consumers install**: `npm install widget-library`

---

### What Stays in Your Repository (Consumers Never See This)

```
src/                        # Demo app
├── app/
│   ├── app.ts             # selector: 'app-root' ❌ Not distributed
│   └── app.html
├── index.html
└── main.ts

.kiro/                      # Your specs and docs ❌ Not distributed
eslint.config.mjs           # Your dev tools ❌ Not distributed
angular.json                # Your workspace config ❌ Not distributed
```

**Purpose**: Development, testing, documentation (for you only)

---

## 🔍 Consumer's Perspective

### What a Consumer Sees

When a developer uses your library:

```typescript
// 1. They install it
// npm install widget-library

// 2. They import from it
import { WidgetComponent, WidgetService } from 'widget-library';

// 3. They use your components with 'wdg-' prefix
@Component({
  selector: 'consumer-app',  // Their own prefix
  imports: [WidgetComponent],
  template: `
    <wdg-widget></wdg-widget>  <!-- ✅ They see 'wdg-' -->
  `
})
export class ConsumerApp {}
```

### What They See in the Browser

```html
<!-- Consumer's app HTML -->
<consumer-app>
  <wdg-widget class="wdg-widget wdg-card">  <!-- ✅ They see 'wdg-' for both components and CSS -->
    <div class="wdg-header">Widget Title</div>
    <div class="wdg-content">Widget content</div>
  </wdg-widget>
</consumer-app>
```

**CSS they see**:
```css
/* From your library */
.wdg-widget { /* ... */ }
.wdg-card { /* ... */ }
.wdg-header { /* ... */ }
```

---

## 🚫 What Consumers DON'T See

### Never Distributed

| Item | Location | Why Not Distributed |
|------|----------|-------------------|
| **Demo App** | `src/` | Development only, not part of library |
| **`app-` prefix** | `src/app/` | Only in demo app components |
| **Workspace config** | `angular.json` | Your build setup, not needed by consumers |
| **ESLint config** | `eslint.config.mjs` | Your linting rules, not needed by consumers |
| **Specs/Docs** | `.kiro/` | Your internal documentation |
| **Tests** | `*.spec.ts` | Your test files (unless you choose to include them) |

---

## 📊 Prefix Visibility Matrix

| Prefix | Where Used | Visible to Consumers? | Example |
|--------|------------|---------------------|---------|
| **`wdg-`** | Library component selectors | ✅ **YES** | `<wdg-widget>` |
| **`wdg-`** | Library CSS classes | ✅ **YES** | `.wdg-card` |
| **`app-`** | Demo app components | ❌ **NO** | `<app-root>` (only in your dev environment) |

---

## 🎯 Real-World Example

### Your Development Environment

```
widget-library-workspace/
├── src/                           # Demo app (NOT published)
│   └── app/
│       └── demo.component.ts      # selector: 'app-demo' ❌
│
└── projects/widget-library/       # Library (PUBLISHED)
    └── src/lib/
        └── widget.component.ts    # selector: 'wdg-widget' ✅
```

### Consumer's node_modules

```
node_modules/
└── widget-library/                # Only this gets installed
    ├── index.d.ts
    ├── widget.component.d.ts      # selector: 'wdg-widget' ✅
    └── package.json
```

**Notice**: The `src/` directory (demo app) is completely absent from what consumers get!

---

## 🧪 How to Verify What Gets Published

You can check what will be published:

```bash
# Build the library
ng build widget-library

# Check the output
ls -la dist/widget-library/

# See what would be published (from dist/widget-library/)
cd dist/widget-library
npm pack --dry-run
```

**Key insight**: Only files in `dist/widget-library/` get published. The demo app (`src/`) is never in `dist/widget-library/`.

---

## 💡 Think of It Like This

### Your Workspace = Angular Material's Repository

```
angular/components (GitHub repo)
├── src/dev-app/              # Demo app (like your src/)
│   └── app-root              # Uses 'app-' prefix ❌ Not published
│
└── src/material/             # Library (like your projects/widget-library/)
    └── button/
        └── button.component  # Uses 'mat-' prefix ✅ Published
```

### Consumer's Installation = @angular/material package

```
node_modules/@angular/material/
├── button/
│   └── button.component.d.ts  # selector: 'mat-button' ✅
└── package.json

# The dev-app is NOT here! ❌
```

---

## ✅ Summary

**Consumers see**:
- ✅ `wdg-` prefix (component selectors)
- ✅ `wdg-` prefix (CSS classes)
- ✅ Only what's exported from `projects/widget-library/src/public-api.ts`

**Consumers DON'T see**:
- ❌ `app-` prefix (demo app only)
- ❌ Demo app code (`src/`)
- ❌ Your workspace configuration
- ❌ Your development tools

**The demo app exists solely for YOU to**:
- Test the library during development
- Create documentation examples
- Demonstrate library features
- Debug issues

It's like a test harness that never leaves your development environment!

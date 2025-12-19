# Widget Library Workspace - Idiomatic Structure Guide

## 📁 Workspace Overview

This is an **Angular library workspace** with two distinct projects:

```
widget-library-workspace/
├── src/                          # Demo App (demo-app)
│   └── app/                      # Test harness for the library
├── projects/
│   └── widget-library/           # The Library (widget-library)
│       └── src/lib/              # Actual SDK code
└── dist/                         # Build outputs
    ├── demo-app/                 # Built demo app
    └── widget-library/           # Built library (publishable to npm)
```

---

## 🎯 The Two-Project Mental Model

### **1. The Library (`widget-library`)** 📦
**What it is**: Your product - the SDK that gets published to npm

**Location**: `projects/widget-library/`

**Purpose**:
- Reusable widgets and services
- Public API for consumers
- Distributed as an npm package

**Key Characteristics**:
- **Component Prefix**: `wdg-` (e.g., `<wdg-widget>`)
- **CSS Prefix**: `wdg-` (e.g., `.wdg-card`)
- **Package Name**: `widget-library`
- **Build Output**: `dist/widget-library/`
- **Public API**: Only exports from `projects/widget-library/src/public-api.ts`

**Think of it like**: `@angular/core`, `@ngrx/store` - a library others install

---

### **2. The Demo App (`demo-app`)** 🧪
**What it is**: Your development playground and documentation

**Location**: `src/`

**Purpose**:
- Test the library during development
- Demonstrate how to use the library
- Living documentation
- Could be deployed as a showcase site

**Key Characteristics**:
- **Component Prefix**: `app-` (e.g., `<app-root>`)
- **Project Name**: `demo-app`
- **Build Output**: `dist/demo-app/`
- **Consumes**: The `widget-library` (like any other app would)

**Think of it like**: Angular Material docs site - uses the library but isn't part of it

---

## 🏗️ Idiomatic Naming Conventions

### Component Selectors

| Project | Prefix | Example | Why? |
|---------|--------|---------|------|
| **Library** | `lib-` | `<lib-widget>` | Distinguishes library components from consumer's components |
| **Demo App** | `app-` | `<app-root>` | Standard Angular app prefix |

### CSS Classes

| Project | Prefix | Example | Why? |
|---------|--------|---------|------|
| **Library** | `wl-` | `.wl-card` | Short, memorable, avoids conflicts with consumer's CSS |
| **Demo App** | (none) | `.demo-header` | Internal to demo app, not distributed |

### File Structure

```typescript
// ✅ Library - Public API (projects/widget-library/src/public-api.ts)
export * from './lib/widget-library';
export * from './lib/components/widget.component';
export * from './lib/services/widget.service';

// ✅ Demo App - Consumes the library (src/app/app.ts)
import { WidgetComponent } from 'widget-library';

@Component({
  selector: 'app-root',  // app- prefix
  imports: [WidgetComponent],
  template: `<lib-widget></lib-widget>`  // lib- prefix
})
export class App {}
```

---

## 🔧 ESLint Configuration

The ESLint config enforces different prefixes for each project:

```javascript
// eslint.config.mjs
export default tseslint.config(
  // Demo app rules
  {
    files: ['src/**/*.ts'],
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        { prefix: 'app' }  // ✅ Demo app uses 'app-'
      ]
    }
  },
  
  // Library rules
  {
    files: ['projects/widget-library/**/*.ts'],
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        { prefix: 'lib' }  // ✅ Library uses 'lib-'
      ]
    }
  }
);
```

**Why separate configs?**
- Prevents accidental use of wrong prefixes
- Enforces clear boundaries between library and demo code
- Helps maintain consistency across the codebase

---

## 📦 Package Configuration

### Root Workspace (`package.json`)
```json
{
  "name": "widget-library-workspace",  // Not published
  "version": "0.0.1",
  "private": true  // Should be added!
}
```

### Library Package (`projects/widget-library/package.json`)
```json
{
  "name": "widget-library",  // This gets published to npm
  "version": "0.0.1",
  "peerDependencies": {
    "@angular/common": "^21.0.0",
    "@angular/core": "^21.0.0"
  }
}
```

---

## 🚀 Common Commands

### Development
```bash
# Start demo app (consumes the library)
pnpm start
# or
ng serve demo-app

# Build the library
ng build widget-library

# Build the demo app
ng build demo-app
```

### Testing
```bash
# Test the library
ng test widget-library

# Test the demo app
ng test demo-app

# Lint everything
pnpm lint
```

### Publishing (Future)
```bash
# Build library for production
ng build widget-library --configuration production

# Publish to npm (from dist/widget-library/)
cd dist/widget-library
npm publish
```

---

## 🎓 Best Practices

### ✅ DO:

1. **Keep library code in `projects/widget-library/`**
   - Only export what's needed via `public-api.ts`
   - Use `lib-` prefix for all components/directives

2. **Use demo app to test library**
   - Import from `widget-library` (not relative paths)
   - Demonstrate real-world usage patterns
   - Use `app-` prefix for demo components

3. **Maintain clear boundaries**
   - Library code should never import from demo app
   - Demo app imports library like any consumer would

4. **Version independently**
   - Library version (`projects/widget-library/package.json`) is what matters
   - Workspace version is just for internal tracking

### ❌ DON'T:

1. **Don't mix prefixes**
   - Library components should never use `app-` prefix
   - Demo app components should never use `lib-` prefix

2. **Don't export everything**
   - Only export public API from `public-api.ts`
   - Keep internal utilities private

3. **Don't use relative imports in demo app**
   ```typescript
   // ❌ BAD
   import { Widget } from '../../projects/widget-library/src/lib/widget';
   
   // ✅ GOOD
   import { Widget } from 'widget-library';
   ```

---

## 🔍 How to Test Your Widget

As a library consumer, you would:

1. **Install the library** (in the future):
   ```bash
   npm install widget-library
   ```

2. **Import and use**:
   ```typescript
   import { WidgetComponent } from 'widget-library';
   
   @Component({
     selector: 'my-app',
     imports: [WidgetComponent],
     template: '<lib-widget></lib-widget>'
   })
   export class MyApp {}
   ```

**Right now** (during development):
- The demo app (`src/`) serves this exact purpose
- It imports from `widget-library` just like a real consumer would
- Changes to the library are immediately reflected in the demo app

---

## 📊 Summary Table

| Aspect | Library (`widget-library`) | Demo App (`demo-app`) |
|--------|---------------------------|----------------------|
| **Location** | `projects/widget-library/` | `src/` |
| **Purpose** | Publishable SDK | Test harness & docs |
| **Prefix** | `wdg-` | `app-` |
| **CSS Prefix** | `wdg-` | (none) |
| **Package Name** | `widget-library` | `widget-library-workspace` |
| **Build Output** | `dist/widget-library/` | `dist/demo-app/` |
| **Published** | ✅ Yes (to npm) | ❌ No |
| **Imports From** | Angular, RxJS, etc. | `widget-library` + Angular |

---

## 🎯 Key Takeaway

Think of this workspace like **Angular Material**:
- **Library** = `@angular/material` (the package you install)
- **Demo App** = material.angular.io (the docs site that uses it)

The demo app is **not part of the library** - it's a consumer of it, just like any other app would be.

---

**Last Updated**: 2025-12-19
**Workspace Version**: 0.0.1
**Library Version**: 0.0.1

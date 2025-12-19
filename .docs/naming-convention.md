# Widget Library - Naming Convention Guide

## 🎯 Final Naming Decisions

### **Unified Prefix: `wdg-`**

All library-related identifiers use the **`wdg-`** prefix for maximum consistency and clarity.

---

## 📋 Complete Naming Convention

| Type | Prefix | Example | Visible to Consumers? |
|------|--------|---------|---------------------|
| **Component Selectors** | `wdg-` | `<wdg-card>` | ✅ Yes |
| **Directive Selectors** | `wdg` | `[wdgTooltip]` | ✅ Yes |
| **CSS Classes** | `wdg-` | `.wdg-card` | ✅ Yes |
| **Package Name** | `widget-library` | `npm install widget-library` | ✅ Yes |
| **Demo App Components** | `app-` | `<app-root>` | ❌ No (dev only) |

---

## 💡 Why `wdg-`?

### **Rationale**

1. **Short & Memorable**: Only 3 characters (`wdg` = widget)
2. **Distinctive**: Not used by major libraries (unlike `lib-`, `ui-`, etc.)
3. **Consistent**: Same prefix across components, directives, and CSS
4. **Professional**: Clean, modern appearance
5. **Widget-Specific**: Clearly indicates this is a widget library

### **Comparison with Popular Libraries**

```typescript
// Angular Material
<mat-button class="mat-button mat-raised">

// PrimeNG
<p-button class="p-button p-component">

// Ionic
<ion-button class="ion-button ion-color-primary">

// Your Library ✨
<wdg-button class="wdg-button wdg-raised">
```

---

## 🔍 Consumer Perspective

### **What Consumers See**

```typescript
// 1. Install
npm install widget-library

// 2. Import
import { CardComponent, TooltipDirective } from 'widget-library';

// 3. Use in Template
@Component({
  selector: 'my-app',
  imports: [CardComponent, TooltipDirective],
  template: `
    <wdg-card class="wdg-elevated wdg-interactive">
      <div class="wdg-header">
        <h2 wdgTooltip="This is a tooltip">Title</h2>
      </div>
      <div class="wdg-content">
        Content goes here
      </div>
    </wdg-card>
  `
})
export class MyApp {}
```

### **In Browser DevTools**

```html
<my-app>
  <wdg-card class="wdg-elevated wdg-interactive">
    <div class="wdg-header">
      <h2 wdgtooltip="This is a tooltip">Title</h2>
    </div>
    <div class="wdg-content">Content goes here</div>
  </wdg-card>
</my-app>
```

**Everything with `wdg-` is from your library** - crystal clear! ✨

---

## 🎨 CSS Class Naming Patterns

### **Component Classes**

```css
/* Base component class */
.wdg-card { }

/* Variants */
.wdg-card-elevated { }
.wdg-card-outlined { }

/* States */
.wdg-card-interactive { }
.wdg-card-disabled { }

/* Modifiers */
.wdg-card-small { }
.wdg-card-large { }
```

### **Utility Classes**

```css
/* Layout */
.wdg-flex { }
.wdg-grid { }

/* Spacing */
.wdg-p-4 { }  /* padding */
.wdg-m-2 { }  /* margin */

/* Typography */
.wdg-text-primary { }
.wdg-text-secondary { }
```

---

## 🔧 Configuration

### **Angular Configuration** (`angular.json`)

```json
{
  "projects": {
    "widget-library": {
      "prefix": "wdg"  // ✅ Component/directive prefix
    },
    "demo-app": {
      "prefix": "app"  // ✅ Demo app prefix
    }
  }
}
```

### **Library Configuration** (`widgets-config.service.ts`)

```typescript
const DEFAULT_CONFIG: WidgetLibraryConfig = {
  ui: {
    cssPrefix: 'wdg'  // ✅ CSS class prefix
  }
}
```

### **ESLint Configuration** (`eslint.config.mjs`)

```javascript
// Library rules
{
  files: ['projects/widget-library/**/*.ts'],
  rules: {
    '@angular-eslint/component-selector': [
      'error',
      { prefix: 'wdg' }  // ✅ Enforces wdg- prefix
    ]
  }
}

// Demo app rules
{
  files: ['src/**/*.ts'],
  rules: {
    '@angular-eslint/component-selector': [
      'error',
      { prefix: 'app' }  // ✅ Enforces app- prefix
    ]
  }
}
```

---

## ✅ Benefits of Unified Prefix

### **1. Consistency**
- One prefix to remember: `wdg-`
- No confusion between component and CSS prefixes
- Clear library ownership

### **2. Developer Experience**
```typescript
// ✅ INTUITIVE - Everything matches
<wdg-button class="wdg-button wdg-primary">Click me</wdg-button>

// ❌ CONFUSING - Mixed prefixes
<wdg-button class="wl-button wl-primary">Click me</wdg-button>
```

### **3. Debugging**
```css
/* Easy to identify and override */
.wdg-button {
  /* I know this is from widget-library */
}

.wdg-button:hover {
  /* Customizing widget-library styles */
}
```

### **4. Searchability**
- Search for `wdg-` finds all library code
- Easy to grep/search in codebase
- Clear in code reviews

### **5. Documentation**
- Simpler to document (one prefix)
- Less confusion in examples
- Easier to teach

---

## 🚀 Migration Checklist

If you ever need to change the prefix:

- [ ] Update `angular.json` → `prefix` field
- [ ] Update `eslint.config.mjs` → component selector rules
- [ ] Update `widgets-config.service.ts` → `cssPrefix` field
- [ ] Update all component `@Component({ selector: ... })`
- [ ] Update all directive `@Directive({ selector: ... })`
- [ ] Update CSS class names in stylesheets
- [ ] Update documentation and examples
- [ ] Update README and getting started guides

---

## 📚 Summary

**Your library's identity:**
- **Package**: `widget-library`
- **Prefix**: `wdg-` (everywhere)
- **Example**: `<wdg-card class="wdg-elevated">`

**Demo app's identity:**
- **Project**: `demo-app`
- **Prefix**: `app-` (demo only, not distributed)
- **Example**: `<app-root>` (consumers never see this)

**Consumer experience:**
```bash
npm install widget-library
```

```typescript
import { CardComponent } from 'widget-library';

<wdg-card class="wdg-elevated">
  <!-- Everything with 'wdg-' is from widget-library -->
</wdg-card>
```

Simple, consistent, professional! ✨

---

**Last Updated**: 2025-12-19
**Prefix Version**: `wdg-` (unified)

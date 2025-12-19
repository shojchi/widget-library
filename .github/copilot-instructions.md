# GitHub Copilot Instructions

> **Note**: This project follows a teaching-first approach. See `.cursorrules` for complete guidelines.

## Project Context
This is an **Angular v21 SDK library** using modern standalone patterns, signals, NgRx, GraphQL, and **Tailwind CSS v4**.

## Key Principles

### 1. Teaching Over Solving
- Explain the "why" behind suggestions
- Provide context and alternatives
- Help me learn patterns, not just complete code

### 2. Modern Angular v21
- Use standalone components (no NgModules)
- Prefer signals over RxJS where appropriate
- Use inject() function instead of constructor injection
- Use new control flow (@if, @for, @switch)

### 3. Modern NgRx
- Use createActionGroup, createFeature, createReducer
- Functional effects over class-based
- Entity adapters for collections
- ComponentStore for scoped state

### 4. SDK Library Focus
- Design for public API consumption
- Type-safe interfaces with generics
- Tree-shakeable exports
- Clear separation of public/internal code

## Code Style

### TypeScript
```typescript
// ✅ Prefer
export const config = { /* ... */ } as const;
export type Config = typeof config;

// ❌ Avoid
export const config: any = { /* ... */ };
```

### Angular Components
```typescript
// ✅ Prefer
@Component({
  standalone: true,
  selector: 'lib-widget',
  imports: [CommonModule],
})
export class WidgetComponent {
  private store = inject(Store);
}

// ❌ Avoid
@Component({ selector: 'lib-widget' })
export class WidgetComponent {
  constructor(private store: Store) {}
}
```

### NgRx
```typescript
// ✅ Prefer
export const WidgetActions = createActionGroup({
  source: 'Widget',
  events: { 'Load': emptyProps() }
});

// ❌ Avoid
export const loadWidgets = createAction('[Widget] Load');
```

## Anti-Patterns to Avoid
- NgModules for new code
- Old control flow syntax (*ngIf, *ngFor)
- String-based actions in NgRx
- Class-based effects
- Using 'any' in public APIs
- Over-engineering with NgRx for local state
- **Old styling patterns**: Avoid deep-nested SCSS/BEM; use Tailwind utility classes.

## Package Manager
- **Always use pnpm** (not npm or yarn)
- Respect .npmrc hoisting configuration

## Full Documentation
See `.cursorrules` and `.kiro/specs/angular-widget-library/rules.md` for complete guidelines.

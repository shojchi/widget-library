# NgRx Architecture

## 🎯 Overview

This document defines the **complete state management architecture** for the Widget Library project. The architecture follows a **layered approach** separating infrastructure concerns (global state) from business logic (widget-specific state).

### Architecture Principles

1. **Pure Fabrication** - Global store provides technical infrastructure, not domain logic
2. **Widget Independence** - Each widget manages its own business state
3. **Parent Orchestration** - Host application coordinates widgets, widgets don't communicate directly
4. **State Isolation** - Clear boundaries between global and widget state
5. **Testability** - All reducers are pure functions, easily testable in isolation
6. **Single Responsibility** - Each state slice has one clear purpose

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                Demo App / Host Application                   │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         Global Store (Infrastructure Layer)           │  │
│  │  ┌─────────┬──────────┬─────────┬────────────────┐   │  │
│  │  │ Theme   │ Viewport │ Widget  │ App Metadata   │   │  │
│  │  │         │          │ Registry│                │   │  │
│  │  └─────────┴──────────┴─────────┴────────────────┘   │  │
│  │  ┌─────────────┬──────────┬──────────────────────┐   │  │
│  │  │Notifications│ Loading  │ Auth                 │   │  │
│  │  └─────────────┴──────────┴──────────────────────┘   │  │
│  └──┬──────────────────┬──────────────────────────┬────┘  │
│     │ (reads theme)    │ (reads viewport)        │        │
│     │                  │                         │        │
│  ┌──▼──────────────┐ ┌─▼───────────────┐ ┌──────▼──────┐ │
│  │ Task Widget     │ │ Task Widget     │ │ Task Widget │ │
│  │ (Classic NgRx)  │ │ (Component      │ │ (Signal)    │ │
│  │                 │ │  Store)         │ │             │ │
│  │ ┌─────────────┐ │ │ ┌─────────────┐ │ │ ┌─────────┐ │ │
│  │ │Feature Store│ │ │ │Component    │ │ │ │Signal   │ │ │
│  │ │(Tasks)      │ │ │ │Store(Tasks) │ │ │ │Store    │ │ │
│  │ └──────┬──────┘ │ │ └──────┬──────┘ │ │ │(Tasks)  │ │ │
│  │        │ Apollo │ │        │ Direct │ │ │ Async   │ │ │
│  └────────┼────────┘ └────────┼────────┘ └─┴─────────┴─┘ │
│           │                   │              │            │
└───────────┼───────────────────┼──────────────┼────────────┘
            │                   │              │
            └───────────────────┴──────────────┘
                                │
                     ┌──────────▼──────────┐
                     │  Mock GraphQL API   │
                     │  (Shared Data)      │
                     └─────────────────────┘
```

---

## 📊 Global State Structure

The global store manages **infrastructure concerns** only - no business domain logic.

### Complete State Interface

```typescript
interface GlobalState {
  theme: ThemeState;
  viewport: ViewportState;
  widgetRegistry: WidgetRegistryState;
  appMetadata: AppMetadataState;
  notifications: NotificationState;
  loading: LoadingState;
  auth: AuthState;
}
```

---

## 🎨 1. Theme State

**Purpose:** Manage application theming including light/dark mode and system preference detection.

### State Interface

```typescript
interface ThemeState {
  preference: 'light' | 'dark' | 'system'; // User's theme preference
  resolved: 'light' | 'dark'; // Actual theme applied (resolved from system if needed)
}
```

### Initial State

```typescript
const initialThemeState: ThemeState = {
  preference: 'system',
  resolved: 'light' // Default until system preference detected
};
```

### Actions

```typescript
const ThemeActions = createActionGroup({
  source: 'Theme',
  events: {
    'Set Preference': props<{ preference: 'light' | 'dark' | 'system' }>(),
    'System Preference Changed': props<{ systemTheme: 'light' | 'dark' }>(),
    'Resolved Theme Updated': props<{ resolved: 'light' | 'dark' }>()
  }
});
```

### Selectors

```typescript
const selectThemeState = createFeatureSelector<ThemeState>('theme');
const selectThemePreference = createSelector(selectThemeState, state => state.preference);
const selectResolvedTheme = createSelector(selectThemeState, state => state.resolved);
const selectIsDarkMode = createSelector(selectResolvedTheme, theme => theme === 'dark');
```

### Widget Usage

Widgets can read theme to adjust their appearance:

```typescript
// In widget component
theme$ = this.store.select(selectResolvedTheme);

// Or for signals
theme = this.store.selectSignal(selectResolvedTheme);
```

---

## 📐 2. Viewport State

**Purpose:** Track screen dimensions and breakpoints for responsive widget behavior.

### State Interface

```typescript
interface ViewportState {
  breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl'; // Tailwind breakpoints
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}
```

### Breakpoint Definitions (Tailwind Compatible)

```typescript
const BREAKPOINTS = {
  sm: 640, // Mobile landscape
  md: 768, // Tablet portrait
  lg: 1024, // Tablet landscape / Small desktop
  xl: 1280, // Desktop
  '2xl': 1536 // Large desktop
} as const;
```

### Initial State

```typescript
const initialViewportState: ViewportState = {
  breakpoint: 'lg',
  width: 1024,
  height: 768,
  isMobile: false,
  isTablet: false,
  isDesktop: true
};
```

### Actions

```typescript
const ViewportActions = createActionGroup({
  source: 'Viewport',
  events: {
    Resize: props<{ width: number; height: number }>(),
    'Breakpoint Changed': props<{ breakpoint: ViewportState['breakpoint'] }>()
  }
});
```

### Widget Usage

Widgets can adapt their layout based on viewport:

```typescript
// Example: Show compact view on mobile
isMobile$ = this.store.select(state => state.viewport.isMobile);
```

---

## 📦 3. Widget Registry State

**Purpose:** Track which widgets are loaded, their status, and metadata.

### State Interface

```typescript
type WidgetStatus = 'idle' | 'loading' | 'ready' | 'error';

interface WidgetInfo {
  id: string; // Unique widget identifier
  loadedAt: number | null; // Timestamp when loaded, null if not loaded
  status: WidgetStatus;
  errorMessage?: string; // Present only if status === 'error'
}

interface WidgetRegistryState {
  widgets: Record<string, WidgetInfo>; // Key = widget ID
}
```

### Initial State

```typescript
const initialWidgetRegistryState: WidgetRegistryState = {
  widgets: {}
};
```

### Actions

```typescript
const WidgetRegistryActions = createActionGroup({
  source: 'Widget Registry',
  events: {
    'Register Widget': props<{ id: string }>(),
    'Widget Loading': props<{ id: string }>(),
    'Widget Loaded': props<{ id: string }>(),
    'Widget Error': props<{ id: string; errorMessage: string }>(),
    'Unregister Widget': props<{ id: string }>()
  }
});
```

---

## 🌍 4. App Metadata State

**Purpose:** Store application-level configuration and metadata.

### State Interface

```typescript
interface AppMetadataState {
  // Environment
  environment: 'development' | 'staging' | 'production';
  apiEndpoint: string;

  // Localization
  locale: string; // e.g., 'en-US', 'uk-UA'
  timezone: string; // e.g., 'Europe/Kiev', 'America/New_York'

  // Feature Flags
  features: {
    enableBetaWidgets: boolean;
    enableAnalytics: boolean;
    debugMode: boolean;
  };

  // App Info
  appVersion: string;
  buildTimestamp: number;
}
```

### Initial State

```typescript
const initialAppMetadataState: AppMetadataState = {
  environment: 'development',
  apiEndpoint: 'http://localhost:4200/graphql',
  locale: 'en-US',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  features: {
    enableBetaWidgets: true,
    enableAnalytics: false,
    debugMode: true
  },
  appVersion: '1.0.0',
  buildTimestamp: Date.now()
};
```

---

## 🔔 5. Notification State (Toast Messages)

**Purpose:** Manage toast notifications with smart grouping and auto-dismiss.

### Design Strategy

- **Group by enum key** - Identical notification types are grouped
- **Show max 3 at once** - Prevent UI clutter
- **Display most recent** - Within a group, show latest occurrence
- **Auto-dismiss** - Configurable duration per toast

### State Interface

```typescript
type ToastType = 'success' | 'error' | 'warning' | 'info';
type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

// Notification keys enum for grouping
enum NotificationKey {
  TASK_CREATE_SUCCESS = 'TASK_CREATE_SUCCESS',
  TASK_CREATE_ERROR = 'TASK_CREATE_ERROR',
  TASK_UPDATE_SUCCESS = 'TASK_UPDATE_SUCCESS',
  TASK_UPDATE_ERROR = 'TASK_UPDATE_ERROR',
  TASK_DELETE_SUCCESS = 'TASK_DELETE_SUCCESS',
  TASK_DELETE_ERROR = 'TASK_DELETE_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  AUTH_ERROR = 'AUTH_ERROR',
  GENERIC_ERROR = 'GENERIC_ERROR',
  GENERIC_SUCCESS = 'GENERIC_SUCCESS'
}

interface Toast {
  id: string; // Unique toast instance ID
  type: ToastType;
  message: string;
  key: NotificationKey; // Grouping key (enum)
  count: number; // How many times this occurred
  firstOccurredAt: number; // Timestamp of first occurrence
  lastOccurredAt: number; // Timestamp of most recent occurrence
  duration: number; // Auto-dismiss duration (ms)
  dismissible: boolean; // Can user manually close?
}

interface NotificationState {
  toastsMap: Record<string, Toast>; // Key = NotificationKey, value = grouped toast
  visibleKeys: string[]; // Array of currently visible toast keys (max 3)
  position: ToastPosition;
  maxVisible: number;
}
```

### Initial State

```typescript
const initialNotificationState: NotificationState = {
  toastsMap: {},
  visibleKeys: [],
  position: 'top-right',
  maxVisible: 3
};
```

### Actions

```typescript
const NotificationActions = createActionGroup({
  source: 'Notifications',
  events: {
    'Show Toast': props<{
      type: ToastType;
      message: string;
      key: NotificationKey;
      duration?: number;
    }>(),
    'Dismiss Toast': props<{ key: string }>(),
    'Auto Dismiss Toast': props<{ key: string }>(),
    'Update Position': props<{ position: ToastPosition }>()
  }
});
```

### Grouping Logic

When a toast with the same `key` appears:

1. If already in `toastsMap`, increment `count` and update `lastOccurredAt`
2. Keep in `visibleKeys` if already visible
3. If not visible and space available (< maxVisible), add to `visibleKeys`
4. Display format: `"{message} (×{count})"` if count > 1

---

## ⏳ 6. Loading State

**Purpose:** Manage global loading indicators with minimum display duration to prevent flicker.

### Design Strategy

- **Track operations** - Know what's loading for debugging
- **Minimum 300ms display** - Smooth UX, no flicker
- **Derived `isLoading`** - Computed from activeOperations.size

### State Interface

```typescript
interface LoadingState {
  activeOperations: string[]; // Array of operation identifiers
  startedAt: number | null; // Timestamp when first operation started
  minimumDuration: number; // 300ms - prevent flicker
}
```

### Initial State

```typescript
const initialLoadingState: LoadingState = {
  activeOperations: [],
  startedAt: null,
  minimumDuration: 300
};
```

### Actions

```typescript
const LoadingActions = createActionGroup({
  source: 'Loading',
  events: {
    'Start Operation': props<{ operation: string }>(),
    'Complete Operation': props<{ operation: string }>(),
    'Clear All Operations': emptyProps()
  }
});
```

### Selectors

```typescript
const selectLoadingState = createFeatureSelector<LoadingState>('loading');

const selectIsLoading = createSelector(
  selectLoadingState,
  state => state.activeOperations.length > 0
);

const selectCanHideLoader = createSelector(selectLoadingState, state => {
  if (state.activeOperations.length > 0) return false;
  if (!state.startedAt) return true;

  const elapsed = Date.now() - state.startedAt;
  return elapsed >= state.minimumDuration;
});
```

### Loading Display Logic

```typescript
// In a component showing loading spinner
canShowLoader$ = this.store.select(selectIsLoading);
canHideLoader$ = this.store.select(selectCanHideLoader);

// Effect to hide loader after minimum duration
hideLoader$ = this.canHideLoader$.pipe(
  filter(canHide => canHide),
  tap(() => (this.showSpinner = false))
);
```

---

## 🔐 7. Auth State (Mock)

**Purpose:** Simple authentication state for development and testing.

### State Interface

```typescript
type AuthStatus = 'idle' | 'authenticating' | 'authenticated' | 'error';

interface User {
  id: string;
  username: string;
}

interface AuthState {
  status: AuthStatus;
  user: User | null;
  error: string | null;
}
```

### Initial State

```typescript
const initialAuthState: AuthState = {
  status: 'idle',
  user: null,
  error: null
};
```

### Mock Users (Development Only)

```typescript
// DO NOT store passwords in state - this is for mock service only!
const MOCK_USERS = [
  { id: '1', username: 'admin', password: 'admin' },
  { id: '2', username: 'user', password: 'user' }
];
```

### Actions

```typescript
const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ username: string; password: string }>(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: string }>(),
    Logout: emptyProps(),
    'Clear Error': emptyProps()
  }
});
```

### Selectors

```typescript
const selectAuthState = createFeatureSelector<AuthState>('auth');
const selectUser = createSelector(selectAuthState, state => state.user);
const selectIsAuthenticated = createSelector(
  selectAuthState,
  state => state.status === 'authenticated'
);
const selectIsAuthenticating = createSelector(
  selectAuthState,
  state => state.status === 'authenticating'
);
const selectAuthError = createSelector(selectAuthState, state => state.error);
```

---

## 🔧 Widget-Level State Patterns

Each widget can choose the most appropriate state management approach:

### Pattern 1: Classic NgRx with Feature Store

**Use when:**

- Complex state with many interactions
- Need time-travel debugging
- Multiple components share widget state
- Want clear action audit trail

**Structure:**

```
projects/widget-library/src/lib/features/task-classic/
├── store/
│   ├── task.actions.ts
│   ├── task.reducer.ts
│   ├── task.effects.ts
│   └── task.selectors.ts
└── components/
    └── task-widget-classic.component.ts
```

**Example:**

```typescript
// Lazy-loaded feature state
export const taskFeature = createFeature({
  name: 'taskClassic',
  reducer: taskReducer,
  extraSelectors: ({ selectTaskState }) => ({
    selectFilteredTasks: createSelector(
      selectTaskState,
      state => /* filter logic */
    )
  })
});
```

---

### Pattern 2: Component Store

**Use when:**

- State is scoped to single component/feature
- Don't need global state management
- Want less boilerplate
- Component lifecycle controls state lifecycle

**Structure:**

```
projects/widget-library/src/lib/features/task-component-store/
├── stores/
│   └── task-component.store.ts
└── components/
    └── task-widget-component-store.component.ts
```

**Example:**

```typescript
@Injectable()
export class TaskComponentStore extends ComponentStore<TaskState> {
  constructor() {
    super(initialState);
  }

  // Selectors
  readonly tasks$ = this.select(state => state.tasks);

  // Updaters (synchronous)
  readonly addTask = this.updater((state, task: Task) => ({
    ...state,
    tasks: [...state.tasks, task]
  }));

  // Effects (asynchronous)
  readonly loadTasks = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      switchMap(() => this.taskService.getTasks()),
      tap(tasks => this.patchState({ tasks }))
    )
  );
}
```

---

### Pattern 3: Signal Store

**Use when:**

- Using modern Angular 18+ features
- Want fine-grained reactivity
- Prefer signals over RxJS
- Need optimal change detection

**Structure:**

```
projects/widget-library/src/lib/features/task-signal/
├── stores/
│   └── task-signal.store.ts
└── components/
    └── task-widget-signal.component.ts
```

**Example:**

```typescript
export const TaskSignalStore = signalStore(
  { providedIn: 'root' },
  withState(initialTaskState),
  withComputed(({ tasks, filter }) => ({
    filteredTasks: computed(() =>
      tasks().filter(t => /* filter logic */)
    )
  })),
  withMethods((store, taskService = inject(TaskService)) => ({
    async loadTasks() {
      patchState(store, { loading: true });
      const tasks = await firstValueFrom(taskService.getTasks());
      patchState(store, { tasks, loading: false });
    }
  }))
);
```

---

## 🔄 Communication Patterns

### Global → Widget (Reading Infrastructure State)

Widgets can read from global store:

```typescript
// In any widget
export class TaskWidgetComponent {
  // Read theme
  theme$ = this.globalStore.select(selectResolvedTheme);

  // Read viewport
  isMobile$ = this.globalStore.select(state => state.viewport.isMobile);

  // Read auth
  currentUser$ = this.globalStore.select(selectUser);
}
```

### Widget → Global (Dispatching Infrastructure Actions)

Widgets can dispatch global actions:

```typescript
// Show notification
this.globalStore.dispatch(
  NotificationActions.showToast({
    type: 'success',
    message: 'Task created successfully',
    key: NotificationKey.TASK_CREATE_SUCCESS
  })
);

// Start loading
this.globalStore.dispatch(
  LoadingActions.startOperation({
    operation: 'loadTasks'
  })
);
```

### Widget ↔ Widget (None - Parent Orchestrates)

Widgets **DO NOT** communicate directly. The host application coordinates:

```typescript
// In host application
export class DashboardComponent {
  onTaskCreatedInWidget1(task: Task) {
    // Parent decides what to do
    this.widget2.refreshTasks();
    this.widget3.updateStats();
  }
}
```

---

## 🎓 Learning Objectives

By implementing this architecture, you will learn:

| Concept                 | Where to Learn It               |
| ----------------------- | ------------------------------- |
| Root Store Setup        | Global state implementation     |
| Feature Store           | Widget 1 (Classic NgRx)         |
| Lazy-Loaded State       | Widget 1 (provideState pattern) |
| Component-Scoped State  | Widget 2 (Component Store)      |
| Signal-Based State      | Widget 3 (Signal Store)         |
| Selectors & Memoization | All patterns                    |
| Effects & Side Effects  | Classic NgRx & Component Store  |
| State Normalization     | Global state design             |
| Pure Functions          | All reducers                    |
| Store Communication     | Global ↔ Widget patterns        |

---

## 📐 Decision Matrix: When to Use Each Pattern

| Scenario                        | Recommended Pattern         | Why                               |
| ------------------------------- | --------------------------- | --------------------------------- |
| App-wide theme/config           | Global Store                | Shared across all widgets         |
| Complex business feature        | Classic NgRx                | Full DevTools support             |
| Simple component state          | Component Store             | Less boilerplate                  |
| Modern Angular 18+ app          | Signal Store                | Future-proof, optimal performance |
| Need time-travel debugging      | Classic NgRx                | Redux DevTools integration        |
| Short-lived state               | Component Store             | Auto-cleanup on destroy           |
| Multiple components share state | Classic NgRx / Signal Store | Global access                     |
| Performance critical            | Signal Store                | Fine-grained reactivity           |

---

## 🚀 Implementation Phases

### Phase 0: Setup

- Install NgRx dependencies
- Configure store in app.config.ts
- Set up DevTools

### Phase 1: Global Store (Infrastructure)

- Implement all 7 global state slices
- Create root reducer
- Test global state in isolation

### Phase 2: Widget 1 - Classic NgRx

- Build Task Widget with feature store
- Implement CRUD operations
- Integrate with global store (theme, notifications)

### Phase 3: Widget 2 - Component Store

- Build same Task Widget with ComponentStore
- Compare with Classic NgRx
- Document differences

### Phase 4: Widget 3 - Signal Store

- Build same Task Widget with SignalStore
- Use modern Angular patterns
- Performance comparison

### Phase 5: Integration & Comparison

- Build comparison dashboard
- Side-by-side widget display
- Document learning outcomes

---

## 📚 References

- [NgRx Documentation](https://ngrx.io)
- [Component Store Guide](https://ngrx.io/guide/component-store)
- [Signal Store (Signals)](https://ngrx.io/guide/signals)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)
- [GRASP Principles](<https://en.wikipedia.org/wiki/GRASP_(object-oriented_design)>)

---

**Last Updated:** 2026-01-07  
**Version:** 1.0.0

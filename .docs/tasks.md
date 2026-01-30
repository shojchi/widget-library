# Implementation Plan

## ✅ Completed Steps

- [✅] **1. Set up Angular library project and development environment**
  - ✅ Create Angular workspace with library project using Angular CLI
  - ✅ Configure TypeScript strict mode and library build settings
  - ✅ Set up development tools (ESLint, Prettier, Angular DevKit)
  - ✅ Create basic project structure with public API exports
  - _Requirements: 1.1, 1.2, 1.3_

- [✅] **2. Set up mock GraphQL backend for development**
  - ✅ Install and configure MSW (Mock Service Worker) or json-graphql-server
  - ✅ Define GraphQL schema for Task entity with queries and mutations
  - ✅ Create mock data and resolvers for task operations
  - ✅ Set up GraphQL playground for testing queries
  - _Requirements: 2.1_

- [✅] **3. Install and configure Apollo GraphQL client**
  - ✅ Add Apollo Angular dependencies to the library
  - ✅ Configure Apollo client with mock GraphQL endpoint
  - ✅ Set up GraphQL code generation for TypeScript types
  - ✅ Create base GraphQL service with connection handling
  - _Requirements: 2.1, 2.2, 6.2_

  - [ ]\* 3.1 Write property test for GraphQL query execution
    - **Property 2: GraphQL query execution**
    - **Validates: Requirements 2.2**

  - [ ]\* 3.2 Write property test for GraphQL mutation reliability
    - **Property 3: GraphQL mutation reliability**
    - **Validates: Requirements 2.3**

---

## 🚧 In Progress: NgRx State Management

- [ ] **4. Implement Global Store (Infrastructure Layer)**

  **Purpose:** Set up root NgRx store with infrastructure-only state (theme, viewport, notifications, etc.)

  **See:** `.docs/ngrx-architecture.md` for complete design
  - [✅] 4.1 Install NgRx dependencies and configure root store
    ✅ Install @ngrx/store, @ngrx/effects, @ngrx/store-devtools
    ✅ Configure `provideStore()` in app.config.ts
    ✅ Set up Redux DevTools
    ✅ _Learn: Root store setup, app.config.ts providers_
  - [✅] 4.2 Implement Theme state
    ✅ Create theme.actions.ts, theme.reducer.ts, theme.selectors.ts
    ✅ State: preference ('light' | 'dark' | 'system'), resolved ('light' | 'dark')
    ✅ Actions: setPreference, systemPreferenceChanged, resolvedThemeUpdated
    ✅ _Learn: Feature state slices, preference vs resolved values_
  - [✅] 4.3 Implement Viewport state
    ✅ Create viewport.actions.ts, viewport.reducer.ts, viewport.selectors.ts
    ✅ State: breakpoint, deviceType
    ✅ Actions: breakpointChanged, deviceTypeChanged
    ✅ Add window resize listener with debounce
    ✅ _Learn: Responsive state management, Tailwind breakpoints, RxJS debouncing_
  - [✅] 4.4 Implement Widget Registry state
    ✅ Create widget-registry.actions.ts, .reducer.ts, .selectors.ts
    ✅ State: widgets Record<id, WidgetInfo>
    ✅ WidgetInfo: id, loadedAt, status, errorMessage
    ✅ Actions: registerWidget, widgetLoading, widgetLoaded, widgetError, unregisterWidget
    ✅ Added 7 selectors (including factory pattern for selectWidgetById)
    ✅ Integrated into global store
    ✅ _Learn: Registry pattern, widget lifecycle tracking, Record data structures, immutable updates_
  - [✅] **BONUS: Complete Theme System Implementation**
    ✅ Configured Tailwind v4 dark mode with `@custom-variant`
    ✅ Created comprehensive CSS custom properties theme system
    ✅ Light mode: Clean white backgrounds with blue accents (#3b82f6)
    ✅ Dark mode: Deep dark backgrounds with amber orange accents (#f59e0b)
    ✅ Created custom Tailwind utilities (@utility) for theme colors
    ✅ Applied theme throughout app (nav, home, dev-lab components)
    ✅ Theme toggle working perfectly with ThemeService
    ✅ All components now fully theme-aware with great UX
    ✅ _Learn: Tailwind v4, CSS custom properties, @utility directive, theme design, UX principles_
  - [✅] 4.5 Implement App Metadata state (**Session: 2026-01-20**)
    ✅ Created app-metadata.actions.ts, .reducer.ts, .selectors.ts, .state.ts
    ✅ State: environment, apiEndpoint, locale, timezone, features, appVersion, buildTimestamp
    ✅ Actions: setLocale, setEnvironment, toggleFeature
    ✅ Learned: `resolveJsonModule`, importing package.json version, `keyof` for type-safe feature flags
    ✅ _Note: Skipped for now, but completed as practice - not in global store_
  - [✅] 4.6 Implement Notification state (Grouped Toasts) (**Session: 2026-01-20**)
    ✅ Created notifications.actions.ts, .reducer.ts, .selectors.ts, .state.ts
    ✅ State: toastsMap (Record<string, Toast>), visibleKeys, position, maxVisible
    ✅ NotificationKey enum with 10 keys for grouping
    ✅ Actions: showToast, dismissToast, autoDismissToast, dismissAllToasts, updatePosition
    ✅ Implemented advanced grouping logic (increment count, track occurrences, max 3 visible)
    ✅ Factory selectors for dynamic toast lookup
    ✅ Integrated into global store
    ✅ _Learned: Record vs Array (O(1) vs O(n)), enum grouping, data vs display separation, complex immutable updates_
  - [✅] 4.7 Implement Loading state
    ✅ Create loading.actions.ts, .reducer.ts, .selectors.ts
    ✅ State: activeOperations[], startedAt, minimumDuration (300ms)
    ✅ Actions: startOperation, completeOperation, clearAllOperations
    ✅ Create selector: selectCanHideLoader (respects minimum 300ms)
    ✅ _Learn: Operation tracking, UX-focused state (minimum display time)_
  - [✅] 4.8 Implement Auth state (Mock)
    ✅ Create auth.actions.ts, .reducer.ts, .selectors.ts, auth.effects.ts
    ✅ State: status, user (id, username), error
    ✅ Actions: login, loginSuccess, loginFailure, logout, clearError
    ✅ Create mock auth service with hardcoded users
    ✅ _Learn: Authentication flow, effects for async operations_
  - [✅] 4.9 Test Global Store integration
    ✅ Verify all state slices load correctly
    ✅ Test Redux DevTools shows all actions
    ✅ Create simple test component to read/update each state slice
    ✅ _Learn: Store testing, DevTools debugging_

  _Requirements: 3.1, 6.3_
  _Total Learning: Root store, 7 infrastructure state patterns, DevTools mastery_

---

- [ ] **5. Implement Three NgRx Widget Patterns**

  **Purpose:** Build the same Task Widget using 3 different NgRx approaches to compare and learn trade-offs

  **See:** `.docs/ngrx-architecture.md` for complete patterns and `.docs/ngrx_extended.md` for learning guide
  - [ ] 5.1 Widget 1 - Classic NgRx with Feature Store
    - Create `projects/widget-library/src/lib/features/task-classic/`
    - **Store setup:**
      - task.actions.ts with createActionGroup (loadTasks, createTask, updateTask, deleteTask, setFilter)
      - task.reducer.ts with createReducer (handle all CRUD operations immutably)
      - task.effects.ts with createEffect (integrate with Apollo GraphQL)
      - task.selectors.ts with createFeatureSelector and memoized selectors
    - **Feature state:**
      - Use `provideState()` for lazy-loaded feature state
      - State: tasks[], loading, error, filter
      - Integrate with global store (read theme, dispatch notifications)
    - **Component:**
      - TaskWidgetClassicComponent
      - Read state via selectors: selectAllTasks$, selectLoading$, selectError$
      - Dispatch actions: store.dispatch(TaskActions.createTask(...))
      - UI: task list, create form, filter buttons, loading spinner
    - **Test:**
      - Open Redux DevTools and verify all actions appear
      - Try time-travel debugging (step backward/forward)
      - Verify memoized selectors don't recompute unnecessarily
    - _Learn: Feature stores, lazy loading, action/reducer/effect pattern, DevTools power_
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 4.3, 4.4_
  - [ ]\* 5.1.1 Write property test for NgRx action dispatch consistency
    - **Property 6: NgRx action dispatch consistency**
    - **Validates: Requirements 3.2**
  - [ ]\* 5.1.2 Write property test for NgRx effects side effect handling
    - **Property 7: NgRx effects side effect handling**
    - **Validates: Requirements 3.3**
  - [ ]\* 5.1.3 Write property test for reactive UI updates
    - **Property 8: Reactive UI updates**
    - **Validates: Requirements 3.4**
  - [ ]\* 5.1.4 Write property test for task creation consistency
    - **Property 10: Task creation consistency**
    - **Validates: Requirements 4.2**
  - [ ]\* 5.1.5 Write property test for task update propagation
    - **Property 11: Task update propagation**
    - **Validates: Requirements 4.3**
  - [ ]\* 5.1.6 Write property test for task deletion completeness
    - **Property 12: Task deletion completeness**
    - **Validates: Requirements 4.4**

  ***
  - [ ] 5.2 Widget 2 - Component Store
    - Create `projects/widget-library/src/lib/features/task-component-store/`
    - **Store setup:**
      - task-component.store.ts extending ComponentStore<TaskState>
      - State: tasks[], loading, error, filter
      - **Selectors:** readonly tasks$ = this.select(state => state.tasks)
      - **Updaters (sync):** addTaskLocally, updateTaskLocally, removeTaskLocally, setLoading, setFilter
      - **Effects (async):** loadTasks, createTask, updateTask, deleteTask (use this.effect())
    - **Component:**
      - TaskWidgetComponentStoreComponent
      - Provide store in component providers (component-scoped!)
      - Access state: taskStore.tasks$ | async
      - Call methods: taskStore.createTask(newTask)
      - UI: Same as Widget 1 for fair comparison
    - **Test:**
      - Open component, navigate away → state resets (component-scoped!)
      - Open two instances → independent states
      - Compare code line count to Widget 1 (less boilerplate?)
      - Try to share state with sibling component → difficult (by design)
    - _Learn: Component-scoped state, updater/effect pattern, when NOT to use global store_
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  ***
  - [ ] 5.3 Widget 3 - Signal Store (Modern Angular 18+)
    - Create `projects/widget-library/src/lib/features/task-signal/`
    - **Store setup:**
      - task-signal.store.ts using signalStore()
      - `providedIn: 'root'` or component-level
      - **withState:** { tasks: [], loading: false, error: null, filter: 'all' }
      - **withComputed:** filteredTasks, taskStats (use computed() signals)
      - **withMethods:** async loadTasks(), addTask(), updateTask(), deleteTask() (use patchState)
    - **Component:**
      - TaskWidgetSignalComponent
      - Use new control flow: @if, @for, @else
      - Direct signal access: store.tasks() (no async pipe!)
      - Call methods: store.createTask(newTask)
      - UI: Same as Widgets 1 & 2 for comparison
    - **Test:**
      - Add console.log in computed() to see when it recomputes
      - Update unrelated state → verify computed doesn't recalculate
      - Count async pipes in template → should be 0!
      - Compare bundle size to other approaches
      - Use Angular DevTools to inspect signal values
    - _Learn: Signals, fine-grained reactivity, modern Angular, computed vs RxJS, no async pipes_
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  ***
  - [ ] 5.4 Build Comparison Dashboard
    - Create `src/app/pages/comparison/` page
    - **Layout:** 2x2 grid showing all 3 widgets + metrics panel
    - **Metrics to display:**
      - Lines of code (LOC) for each approach
      - Bundle size contribution (use webpack-bundle-analyzer)
      - Number of async pipes in templates
      - State update performance (add 100 tasks, measure time)
      - Memory usage (if measurable)
    - **Interactive testing:**
      - "Add 10 tasks" button → trigger in all widgets
      - "Stress test" → add/update/delete 100 tasks rapidly
      - Visual comparison of loading states, error handling
    - **Learning documentation:**
      - Create comparison table: Boilerplate, Debuggability, Performance, Testability, Learning Curve
      - Document when to use each approach
      - Record your personal findings
    - _Learn: Architectural decision-making, performance profiling, pattern trade-offs_

---

## 📦 Remaining Steps (Renumbered)

- [ ] **6. Add Apollo caching and error handling**
  - Configure Apollo cache policies for efficient data fetching
  - Implement optimistic updates for immediate UI feedback
  - Add comprehensive error handling for GraphQL operations
  - Set up retry logic for failed network requests
  - _Requirements: 2.4, 2.5, 4.5_

  - [ ]\* 6.1 Write property test for Apollo cache consistency
    - **Property 4: Apollo cache consistency**
    - **Validates: Requirements 2.4**

  - [ ]\* 6.2 Write property test for GraphQL error handling
    - **Property 5: GraphQL error handling**
    - **Validates: Requirements 2.5**

---

- [ ] **7. Implement Widget configuration system**
  - Create WidgetConfig interface with theme and behavior options
  - Add configuration validation and default value handling
  - Implement theming system with CSS custom properties
  - Add configuration-based feature toggles (animations, max items, etc.)
  - _Requirements: 1.4, 6.1_

  - [ ]\* 7.1 Write property test for configuration application consistency
    - **Property 1: Configuration application consistency**
    - **Validates: Requirements 1.4**

---

- [ ] **8. Create Widget public API**
  - Update public-api.ts with all three widget exports
  - Define public API surface with all exported interfaces and components
  - Configure library build with ng-packagr for optimal bundling
  - Add proper TypeScript declarations and documentation
  - _Requirements: 1.2, 1.3, 1.5, 6.1_

---

- [ ] **9. Build demo host application**
  - Create Angular application that imports and uses the widget library
  - Demonstrate all three widget implementations
  - Add examples of event handling and host-widget communication
  - Test library integration and style isolation
  - Show global store interaction (theme switching affects all widgets)
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [ ]\* 9.1 Write property test for host configuration acceptance
    - **Property 14: Host configuration acceptance**
    - **Validates: Requirements 5.2**

  - [ ]\* 9.2 Write property test for widget independence
    - **Property 15: Widget independence**
    - **Validates: Requirements 5.3**

---

- [ ] **10. Add widget events and host communication**
  - Implement EventEmitter outputs for widget operations (created, updated, deleted)
  - Add widget lifecycle events (initialized, error, loading state changes)
  - Create proper event interfaces with typed payloads
  - Test event emission and handling in demo application
  - _Requirements: 5.5, 6.1_

  - [ ]\* 10.1 Write property test for event emission reliability
    - **Property 17: Event emission reliability**
    - **Validates: Requirements 5.5**

---

- [ ] **11. Implement style isolation and theming**
  - Add ViewEncapsulation and CSS scoping for style isolation
  - Create comprehensive theming system with CSS custom properties
  - Add responsive design support for different screen sizes (use viewport state!)
  - Test style isolation with conflicting host application styles
  - _Requirements: 5.4, 6.1_

  - [ ]\* 11.1 Write property test for style isolation
    - **Property 16: Style isolation**
    - **Validates: Requirements 5.4**

---

- [ ] **12. Add comprehensive error boundaries and state management**
  - Implement error state management in global store (already in Step 4.6 Notifications)
  - Add loading states and user feedback for all operations (use global loading state)
  - Create error boundary service to prevent widget crashes
  - Add proper error logging and debugging information
  - _Requirements: 4.5, 5.3_

  - [ ]\* 12.1 Write property test for error state consistency
    - **Property 13: Error state consistency**
    - **Validates: Requirements 4.5**

---

- [ ] **13. Final testing and library packaging**
  - Run comprehensive unit tests for all components and services
  - Test library build and package generation
  - Verify TypeScript definitions and IntelliSense support
  - Create library documentation and usage examples
  - Document NgRx pattern comparison findings
  - _Requirements: 1.2, 1.5, 6.4_

---

- [ ] **14. Checkpoint - Ensure all tests pass and library is complete**
  - Ensure all tests pass, ask the user if questions arise
  - Verify library can be imported and used in external applications
  - Test all three widget implementations
  - Validate TypeScript types and compile-time checking
  - Review learning outcomes from NgRx pattern comparison

---

## 📚 Learning References

- **Step 4 (Global Store):** See `.docs/ngrx-architecture.md` for complete state design
- **Step 5 (Widget Patterns):** See `.docs/ngrx_extended.md` for detailed learning guide
- **NgRx Documentation:** https://ngrx.io
- **Component Store:** https://ngrx.io/guide/component-store
- **Signal Store:** https://ngrx.io/guide/signals

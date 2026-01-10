# Antigravity IDE Learning Guide: Mastering NgRx Through Practice

## 🎯 Overview
This guide will help you build a complete task management application using **all 4 NgRx approaches** side-by-side. You'll discover the practical upsides and downsides of each pattern through hands-on coding.

---

## 📋 Project Structure

We'll build **TaskHub** - a task management app with these features:
- Create, read, update, delete tasks
- Filter by status (all, active, completed)
- Real-time task statistics
- Async loading from a mock API
- Optimistic updates
- Error handling

Each approach will implement the **same features** so you can compare directly.

---

## 🏗️ Base Setup Instructions for Antigravity

### Step 1: Project Initialization

**Prompt for Antigravity:**
```
Create a new Angular 18 standalone project named "ngrx-learning-hub" with:
- Routing enabled
- SCSS styling
- Four main routes: /naive, /classic-ngrx, /component-store, /signal-store
- Shared types file for Task interface
- Mock API service that simulates 500ms latency
- TailwindCSS configured
```

### Step 2: Shared Types & Mock API

**Prompt for Antigravity:**
```
Create these shared files:

1. src/app/models/task.model.ts with:
   - Task interface: id, title, description, completed, createdAt, priority
   - Priority type: 'low' | 'medium' | 'high'
   - TaskFilter type: 'all' | 'active' | 'completed'

2. src/app/services/mock-api.service.ts with:
   - getTasks(): Observable<Task[]> (500ms delay)
   - createTask(task): Observable<Task> (500ms delay)
   - updateTask(id, changes): Observable<Task> (500ms delay)
   - deleteTask(id): Observable<void> (500ms delay)
   - Random 10% failure rate on updates to test error handling
   - Initial mock data with 5 tasks
```

---

## 🔄 Approach 1: Naive Service + BehaviorSubject

### Learning Objectives
- Understand why services with BehaviorSubjects seem "easy" at first
- Experience the pain points that emerge as complexity grows
- Identify race conditions and state synchronization issues

### Implementation Instructions

**Prompt for Antigravity:**
```
Build the Naive approach at /naive route:

1. Create TaskServiceNaive with:
   - BehaviorSubject<Task[]> for tasks
   - BehaviorSubject<boolean> for loading
   - BehaviorSubject<string | null> for error
   - BehaviorSubject<TaskFilter> for currentFilter
   - Methods: loadTasks(), addTask(), updateTask(), deleteTask(), setFilter()
   - Computed observable for filteredTasks using combineLatest
   - Computed observable for statistics (total, active, completed)

2. Create NaiveComponent with:
   - Task list display with filtering
   - Add task form
   - Statistics dashboard
   - Loading and error states
   - Delete and toggle complete actions

3. IMPORTANT: Add these deliberate issues to expose problems:
   - Call loadTasks() twice rapidly on init to show race condition
   - Add a "Refresh" button that triggers loadTasks() - clicking rapidly shows issues
   - Don't unsubscribe from combineLatest in the service (memory leak)
   - Mix sync and async state updates to show timing issues
```

### Testing Checklist for This Approach
```
✓ Add a task, then immediately click refresh - does the new task disappear?
✓ Click refresh 5 times quickly - do you see loading flicker?
✓ Open browser DevTools memory profiler - do subscriptions clean up?
✓ Try to implement undo functionality - how would you store history?
✓ Try to debug why a task disappeared - can you see the action sequence?
```

### Reflection Questions
```
Document your findings:
1. What happened when you triggered multiple loadTasks() calls?
2. How difficult was it to implement filtered tasks + statistics?
3. Could you easily test the service logic in isolation?
4. How would you add "optimistic updates" (show task immediately, then sync)?
5. What happens if two components use this service simultaneously?
```

---

## 🏛️ Approach 2: Classic NgRx (Actions/Reducers/Effects)

### Learning Objectives
- Experience the power of Redux DevTools
- Understand pure functions and immutability
- Learn action-driven architecture
- Master selectors and memoization

### Implementation Instructions

**Prompt for Antigravity:**
```
Build Classic NgRx at /classic-ngrx route:

1. Install: npm install @ngrx/store @ngrx/effects @ngrx/store-devtools

2. Create feature structure:
   - actions/task.actions.ts with:
     * loadTasks, loadTasksSuccess, loadTasksFailure
     * addTask, addTaskSuccess, addTaskFailure
     * updateTask, updateTaskSuccess, updateTaskFailure
     * deleteTask, deleteTaskSuccess, deleteTaskFailure
     * setFilter
     * clearError
   
   - reducers/task.reducer.ts with:
     * TaskState interface: tasks[], loading, error, filter
     * Handle all actions with proper immutability
     * Use on() for each action
   
   - effects/task.effects.ts with:
     * loadTasks$ - trigger on loadTasks action
     * addTask$ - with optimistic update pattern
     * updateTask$ - with error rollback
     * deleteTask$ - with optimistic delete
   
   - selectors/task.selectors.ts with:
     * selectTaskState (feature selector)
     * selectAllTasks
     * selectFilteredTasks (memoized)
     * selectTaskStats (memoized, expensive computation)
     * selectLoading, selectError
     * selectTaskById (parameterized selector)

3. Create ClassicNgrxComponent with:
   - Inject Store
   - Use selectors for all data
   - Dispatch actions for all mutations
   - Add "Time Travel" debug panel showing last 5 actions

4. Configure StoreDevtoolsModule in app.config.ts
```

### Testing Checklist
```
✓ Open Redux DevTools - can you see every action dispatched?
✓ Add a task - can you step backward and see it disappear?
✓ Trigger an error - can you replay the failed action?
✓ Check selectTaskStats - does it recompute only when tasks change?
✓ Delete a task - does the optimistic update work?
✓ Look at the action history - is it a clear audit log?
```

### Reflection Questions
```
Document your findings:
1. How much boilerplate did you write compared to the naive approach?
2. Could you easily unit test the reducer in isolation?
3. Did the DevTools help you debug issues faster?
4. How does selector memoization affect performance?
5. Was the separation of concerns (actions/reducers/effects) worth it?
6. How difficult was optimistic update + rollback?
```

---

## 🎯 Approach 3: Component Store

### Learning Objectives
- Understand component-scoped state
- Learn when local state beats global state
- Experience reduced boilerplate
- Master the updater/effect pattern

### Implementation Instructions

**Prompt for Antigravity:**
```
Build Component Store at /component-store route:

1. Install: npm install @ngrx/component-store

2. Create TaskComponentStore:
   - Extend ComponentStore<TaskState>
   - State: tasks[], loading, error, filter
   - Selectors:
     * tasks$ = this.select(state => state.tasks)
     * loading$ = this.select(state => state.loading)
     * filteredTasks$ = this.select(...)
     * statistics$ = this.select(...)
   
   - Updaters (synchronous):
     * setTasks = this.updater((state, tasks: Task[]) => ...)
     * setLoading = this.updater(...)
     * setError = this.updater(...)
     * setFilter = this.updater(...)
     * addTaskLocally = this.updater(...)
     * updateTaskLocally = this.updater(...)
     * removeTaskLocally = this.updater(...)
   
   - Effects (asynchronous):
     * loadTasks = this.effect((trigger$) => ...)
     * addTask = this.effect((task$: Observable<Task>) => ...)
     * updateTask = this.effect(...)
     * deleteTask = this.effect(...)

3. Create ComponentStoreComponent:
   - Provide TaskComponentStore in providers array
   - Inject the store
   - Use store.property$ in template with async pipe
   - Call store.loadTasks() on init

4. BONUS: Create a child dialog component that uses its own ComponentStore
   - TaskEditDialogStore for editing a single task
   - Show how component-scoped state is isolated
```

### Testing Checklist
```
✓ Open the component, then navigate away - does state reset?
✓ Open two instances in split view - is state independent?
✓ Create the dialog - does it maintain separate state?
✓ Compare code line count to Classic NgRx - how much less?
✓ Try to share state with a parent component - how difficult?
```

### Reflection Questions
```
Document your findings:
1. When would component-scoped state be better than global?
2. How much easier was the setup compared to Classic NgRx?
3. Did you miss Redux DevTools?
4. Was the updater/effect pattern intuitive?
5. How would you share data between routes with this approach?
```

---

## ⚡ Approach 4: Signal Store (Modern Angular 18+)

### Learning Objectives
- Master Angular Signals
- Experience zero async pipe templates
- Learn fine-grained reactivity
- Understand computed signals vs RxJS operators

### Implementation Instructions

**Prompt for Antigravity:**
```
Build Signal Store at /signal-store route:

1. Install: npm install @ngrx/signals

2. Create TaskSignalStore with signalStore():
   - providedIn: 'root'
   - withState({
       tasks: [] as Task[],
       loading: false,
       error: null as string | null,
       filter: 'all' as TaskFilter
     })
   
   - withComputed(({ tasks, filter }) => ({
       filteredTasks: computed(() => {
         // filter logic
       }),
       statistics: computed(() => {
         // expensive computation
         console.log('Recomputing statistics'); // To see when it runs
       }),
       activeCount: computed(() => ...),
       completedCount: computed(...)
     }))
   
   - withMethods((store, apiService = inject(MockApiService)) => ({
       async loadTasks() {
         patchState(store, { loading: true, error: null });
         try {
           const tasks = await firstValueFrom(apiService.getTasks());
           patchState(store, { tasks, loading: false });
         } catch (error) {
           patchState(store, { 
             loading: false, 
             error: error.message 
           });
         }
       },
       
       async addTask(task: Omit<Task, 'id'>) {
         // Optimistic update
         const tempTask = { ...task, id: 'temp-' + Date.now() };
         patchState(store, { 
           tasks: [...store.tasks(), tempTask] 
         });
         
         try {
           const created = await firstValueFrom(
             apiService.createTask(tempTask)
           );
           patchState(store, {
             tasks: store.tasks().map(t => 
               t.id === tempTask.id ? created : t
             )
           });
         } catch (error) {
           // Rollback on error
           patchState(store, {
             tasks: store.tasks().filter(t => t.id !== tempTask.id),
             error: error.message
           });
         }
       },
       
       async updateTask(id: string, changes: Partial<Task>) {
         // Implement with optimistic update + rollback
       },
       
       async deleteTask(id: string) {
         // Implement with optimistic delete + rollback
       },
       
       setFilter(filter: TaskFilter) {
         patchState(store, { filter });
       },
       
       clearError() {
         patchState(store, { error: null });
       }
     }))

3. Create SignalStoreComponent using new control flow:
   - No async pipes needed!
   - Use @if for loading states
   - Use @for for task lists
   - Direct signal access: store.tasks()
   - Call methods directly: store.addTask()
   
   Template example:
   @if (store.loading()) {
     <div>Loading...</div>
   }
   
   @for (task of store.filteredTasks(); track task.id) {
     <div>{{ task.title }}</div>
   }

4. Add performance monitoring:
   - Console.log in computed() to see recomputation
   - Add a button that updates unrelated state
   - Verify only affected signals recompute
```

### Testing Checklist
```
✓ Add a task - do you see the computed() logs?
✓ Change filter - does only filteredTasks recompute?
✓ Update unrelated state - do task signals stay stable?
✓ Compare template to Classic NgRx - count the async pipes (should be 0)
✓ Check change detection - does it trigger less frequently?
✓ Use Angular DevTools - can you see signal values?
```

### Reflection Questions
```
Document your findings:
1. How much cleaner is the template without async pipes?
2. Did the computed signals optimize well?
3. Was async/await easier than RxJS pipelines?
4. How intuitive is patchState vs dispatching actions?
5. What would you miss from Classic NgRx?
6. How easy was optimistic update + rollback?
```

---

## 🔬 Advanced Challenge: Side-by-Side Comparison

### Build a Comparison Dashboard

**Prompt for Antigravity:**
```
Create a /comparison route that:

1. Shows all 4 approaches running simultaneously in a 2x2 grid
2. Each approach manages the same shared mock API
3. Add a "Stress Test" button that:
   - Adds 100 tasks rapidly
   - Updates 50 tasks simultaneously
   - Deletes 25 tasks
   - Measures time taken for each approach

4. Display metrics:
   - Lines of code (LOC) for each approach
   - Bundle size contribution
   - Memory usage (use performance.memory)
   - Time to complete stress test
   - Change detection cycles triggered

5. Add a "Debug Panel" showing:
   - Current state for each approach
   - Recent actions/mutations
   - Performance characteristics
```

---

## 📊 Learning Assessment Matrix

After building all approaches, fill this out:

### Boilerplate
```
Naive:          [Rate 1-10] ___ (1 = minimal, 10 = excessive)
Classic NgRx:   [Rate 1-10] ___
Component Store:[Rate 1-10] ___
Signal Store:   [Rate 1-10] ___

Winner: __________
```

### Debuggability
```
Naive:          [Rate 1-10] ___
Classic NgRx:   [Rate 1-10] ___
Component Store:[Rate 1-10] ___
Signal Store:   [Rate 1-10] ___

Winner: __________
```

### Performance
```
Naive:          [Rate 1-10] ___
Classic NgRx:   [Rate 1-10] ___
Component Store:[Rate 1-10] ___
Signal Store:   [Rate 1-10] ___

Winner: __________
```

### Testability
```
Naive:          [Rate 1-10] ___
Classic NgRx:   [Rate 1-10] ___
Component Store:[Rate 1-10] ___
Signal Store:   [Rate 1-10] ___

Winner: __________
```

### Learning Curve
```
Naive:          [Rate 1-10] ___ (1 = easy, 10 = hard)
Classic NgRx:   [Rate 1-10] ___
Component Store:[Rate 1-10] ___
Signal Store:   [Rate 1-10] ___

Winner: __________
```

### Scalability
```
Naive:          [Rate 1-10] ___
Classic NgRx:   [Rate 1-10] ___
Component Store:[Rate 1-10] ___
Signal Store:   [Rate 1-10] ___

Winner: __________
```

---

## 🎓 Real-World Scenario Exercises

---

## Scenario 1: E-Commerce Shopping Cart with Persistence

### Business Requirements
```
Build a production-ready shopping cart with:
- State persists across page refreshes (localStorage)
- Optimistic updates when adding/removing items
- Real-time price calculations (subtotal, tax, shipping, discounts)
- Promo code validation and application
- Stock quantity tracking
- Undo/Redo for cart operations
- Cart expiration after 24 hours
- Sync cart with backend on checkout
```

### Implementation Guide for Each Approach

#### Antigravity Prompt: Naive Approach
```
Build a shopping cart using Naive Service + BehaviorSubject at /scenarios/cart-naive:

1. Create CartServiceNaive with:
   - BehaviorSubject<CartItem[]> with localStorage sync
   - Methods: addItem(), removeItem(), updateQuantity(), applyPromoCode()
   - Auto-save to localStorage on every change
   - Load from localStorage on init
   - Add timestamp to cart for expiration logic

2. Create price calculation service:
   - Calculate subtotal, tax (8%), shipping ($5 if < $50)
   - Validate promo codes against mock API
   - Return Observable<CartTotals>

3. INTENTIONAL PROBLEMS TO DISCOVER:
   - Race condition: Add item + apply promo simultaneously
   - localStorage sync issues with rapid updates
   - No history for undo/redo
   - Difficult to rollback failed promo code application
   - No clear audit trail of cart changes

4. Component with:
   - Cart item list
   - Promo code input
   - Real-time price breakdown
   - "Undo Last Action" button (try to implement!)
```

**Testing Checklist:**
```
✓ Add 5 items rapidly - do all save

---

## 📝 Learning Journal Template

Keep notes as you build:

### Day 1: Naive Approach
```
What I built: ___________
Time taken: ___________
Biggest challenge: ___________
Biggest surprise: ___________
Would I use in production: Yes/No because ___________
```

### Day 2: Classic NgRx
```
What I built: ___________
Time taken: ___________
Biggest challenge: ___________
Biggest surprise: ___________
Would I use in production: Yes/No because ___________
DevTools revelation: ___________
```

### Day 3: Component Store
```
What I built: ___________
Time taken: ___________
Biggest challenge: ___________
Biggest surprise: ___________
Would I use in production: Yes/No because ___________
Compared to Classic NgRx: ___________
```

### Day 4: Signal Store
```
What I built: ___________
Time taken: ___________
Biggest challenge: ___________
Biggest surprise: ___________
Would I use in production: Yes/No because ___________
Compared to everything else: ___________
```

---

## 🚀 Next Steps After Completion

1. **Build a real side project** using your preferred approach
2. **Contribute to open source** - find Angular + NgRx projects
3. **Write a blog post** comparing your findings
4. **Join Angular Discord** - discuss patterns with the community
5. **Watch NgRx talks** on YouTube - see how experts use it

## 📚 Resources

- NgRx Docs: https://ngrx.io
- Angular Signals: https://angular.dev/guide/signals
- Redux DevTools: https://github.com/reduxjs/redux-devtools
- Component Store Guide: https://ngrx.io/guide/component-store

---

## 💡 Pro Tips for Antigravity

1. **Ask for explanations**: After generating code, ask "Explain why you chose this pattern"
2. **Request alternatives**: "Show me two other ways to implement this"
3. **Debug together**: "This isn't working as expected, help me debug"
4. **Refactor requests**: "How would you refactor this to be more performant?"
5. **Test generation**: "Generate unit tests for this reducer"

Good luck with your NgRx learning journey! 🎉
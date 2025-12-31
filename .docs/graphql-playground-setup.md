# GraphQL Playground - Setup Complete! 🚀

## What We Built

We've successfully created a **GraphQL Playground** - a visual testing interface for your mock GraphQL backend. This completes **Step 2** of your implementation plan.

## Files Created

### 1. **MSW Browser Setup** (`mocks/browser.ts`)

- Initializes MSW (Mock Service Worker) for the browser
- Exports the worker that intercepts GraphQL requests

### 2. **Main.ts Updates** (`src/main.ts`)

- Initializes MSW before bootstrapping the Angular app
- Ensures all GraphQL requests are intercepted and mocked

### 3. **GraphQL Service** (`src/app/graphql-playground/graphql.service.ts`)

- Injectable service using Angular v21 `inject()` pattern
- Sends GraphQL queries/mutations to `/graphql` endpoint
- MSW intercepts these requests and returns mock data

### 4. **Playground Component** (`src/app/graphql-playground/graphql-playground.component.ts`)

- **Modern Angular v21 patterns:**
  - Standalone component
  - Signals for reactive state (`query`, `variables`, `result`, `loading`, `error`)
  - `inject()` for dependency injection
- **Features:**
  - Pre-loaded example queries (Get All Tasks, Get Task by ID, Create Task)
  - Query editor with syntax highlighting
  - Variables editor (JSON format)
  - Results display with formatted JSON
  - Loading, error, and empty states

### 5. **Template** (`graphql-playground.component.html`)

- **Modern Angular v21 control flow:**
  - `@if` / `@else` instead of `*ngIf`
  - `@for` instead of `*ngFor`
- **Split-panel layout:**
  - Left: Query editor + Variables
  - Right: Results display
- **Interactive elements:**
  - Example query buttons
  - Execute button with loading state
  - Real-time result updates

### 6. **Styles** (`graphql-playground.component.css`)

- **Premium design:**
  - Gradient backgrounds (purple/violet theme)
  - Glassmorphism effects
  - Smooth animations (floating icon, button hovers)
  - Responsive grid layout
- **Professional UI:**
  - Monospace font for code
  - Color-coded states (loading, error, success)
  - Accessible design

## How to Use the Playground

1. **Server is running** at `http://localhost:4200/`
2. **Open your browser** and navigate to the URL
3. **Try the example queries:**
   - Click "Get All Tasks" to see all mock tasks
   - Click "Get Task by ID" to fetch a specific task
   - Click "Create Task" to add a new task
4. **Execute queries:**
   - Click the "▶ Execute" button
   - Watch the results appear in the right panel
5. **Modify queries:**
   - Edit the query in the editor
   - Update variables in JSON format
   - Execute to see new results

## Key Learning Points

### Angular v21 Patterns Used

1. **Standalone Components:**

   ```typescript
   @Component({
     selector: 'app-graphql-playground',
     imports: [CommonModule, FormsModule], // Direct imports
     // No NgModule needed!
   })
   ```

2. **Signals for State:**

   ```typescript
   query = signal<string>(this.getDefaultQuery());
   loading = signal<boolean>(false);
   // Reactive, efficient, modern!
   ```

3. **inject() Function:**

   ```typescript
   private readonly graphqlService = inject(GraphQLService);
   // No constructor injection needed
   ```

4. **Modern Control Flow:**
   ```html
   @if (loading()) {
   <div>Loading...</div>
   } @else if (error()) {
   <div>Error: {{ error() }}</div>
   } @else {
   <div>{{ result() }}</div>
   }
   ```

### MSW (Mock Service Worker)

- **Intercepts network requests** at the service worker level
- **Returns mock data** without needing a real backend
- **Perfect for development** and testing
- **Works in the browser** - no server needed!

### GraphQL Basics

- **Queries:** Read data (e.g., `query GetTasks { tasks { id title } }`)
- **Mutations:** Modify data (e.g., `mutation CreateTask($input: TaskInput!) { ... }`)
- **Variables:** Pass dynamic values (e.g., `{ "id": "1" }`)

## What's Next?

Now that you have a working GraphQL playground, you can:

1. **Test your mock backend** - Try different queries and mutations
2. **Understand the GraphQL schema** - See what fields are available
3. **Move to Step 3** - Install and configure Apollo GraphQL client
4. **Integrate with NgRx** - Connect GraphQL to your state management

## Questions to Consider

As you explore the playground, think about:

1. **How does MSW intercept requests?** (Hint: Service Workers)
2. **Why use signals instead of RxJS for local state?** (Hint: Simplicity + Performance)
3. **What's the difference between a query and a mutation?** (Hint: Read vs Write)
4. **How would you add a new query to the examples?** (Try it!)

---

**Step 2 Complete!** ✅ You now have a fully functional GraphQL testing environment.

# 🎓 Lessons Learned: Apollo GraphQL + NgRx + MSW

> **Date:** 2026-02-08  
> **Context:** Implementing NgRx Effects for Task Classic feature with Apollo GraphQL and MSW mocking

This document captures critical insights and gotchas discovered during the implementation of the NgRx feature store with GraphQL integration.

---

## 1. 🔍 Apollo Cache Requirements

### The Rule

**All fields requested in a GraphQL query MUST exist in the response**, even if their value is `null`.

### Why It Matters

Apollo's InMemoryCache normalizes objects by their `id` and tracks all fields. When Apollo sees a field in your query, it expects that field to exist on **every object** in the response to maintain cache consistency.

### ❌ Common Mistake

```typescript
// GraphQL Query
query tasks {
  tasks {
    id
    title
    description   // ← You're asking for this
    assignedTo    // ← And this
  }
}

// Mock Response (WRONG!)
{
  data: {
    tasks: [
      {
        id: "1",
        title: "Fix bug"
        // ❌ Missing description and assignedTo!
      }
    ]
  }
}

// Result: Apollo throws "Missing field 'description'" error
```

### ✅ Correct Approach

```typescript
// Mock Response (CORRECT!)
{
  data: {
    tasks: [
      {
        id: '1',
        title: 'Fix bug',
        description: null, // ✅ Field exists
        assignedTo: null // ✅ Field exists
      }
    ];
  }
}
```

### Best Practice

**In TypeScript interfaces for API responses, use `type | null` instead of optional fields:**

```typescript
// ❌ Don't do this for API responses
interface Task {
  id: string;
  title: string;
  description?: string; // Optional - might not be in response
}

// ✅ Do this instead
interface Task {
  id: string;
  title: string;
  description: string | null; // Always present, but can be null
}
```

**Why?** APIs should have **consistent shapes**. All objects should have the same set of fields for cache normalization.

---

## 2. 📦 JSON Serialization: `undefined` vs `null`

### The Rule

**JavaScript removes `undefined` fields during JSON serialization. Use `null` for optional fields in API responses.**

### The Problem

```typescript
// Mock data
const task = {
  id: '1',
  title: 'Task',
  description: undefined, // ← This will disappear!
  assignedTo: undefined
};

// After JSON.stringify() or HttpResponse.json():
JSON.stringify(task);
// Returns: '{"id":"1","title":"Task"}'
// ❌ description and assignedTo are gone!
```

### The Solution

```typescript
// Use null instead
const task = {
  id: '1',
  title: 'Task',
  description: null, // ✅ Stays in JSON
  assignedTo: null
};

JSON.stringify(task);
// Returns: '{"id":"1","title":"Task","description":null,"assignedTo":null}'
// ✅ All fields present!
```

### When to Use Each

| Scenario                   | Use         | Reason                                               |
| -------------------------- | ----------- | ---------------------------------------------------- |
| API Response               | `null`      | Consistent serialization, Apollo cache compatibility |
| Function parameter default | `undefined` | TypeScript idiom for "not provided"                  |
| Local component state      | Either      | Doesn't get serialized                               |
| Database storage           | `null`      | SQL NULL, consistent with DBs                        |

### Code Example

```typescript
// TypeScript interfaces
interface Task {
  id: string;
  title: string;
  description: string | null; // API: use null
  assignedTo: string | null;
}

// Function with optional parameters
function createTask(params: {
  title: string;
  description?: string; // ✅ OK for inputs - TypeScript optional
}): Task {
  return {
    id: generateId(),
    title: params.title,
    description: params.description ?? null, // Convert undefined → null
    assignedTo: null,
    status: 'TODO',
    priority: 'MEDIUM',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}
```

---

## 3. 🎯 GraphQL Operation Names in MSW

### The Rule

**MSW matches GraphQL requests by operation name, not by the query field name.**

### Understanding the Parts

```graphql
query GetTasks {
  # ← Operation name (what MSW matches)
  tasks {
    # ← Field name (what data you get)
    id
    title
  }
}
```

### ❌ Common Mistake

```typescript
// TaskService
const query = gql`
  query GetTasks {    # ← Operation name
    tasks { ... }
  }
`;

// MSW Handler
graphql.query('tasks', () => { ... })
// ❌ Mismatch! MSW expects operation name "tasks", but got "GetTasks"
// Result: Handler doesn't match, request goes through as unhandled
```

### ✅ Correct Approach

```typescript
// TaskService
const query = gql`
  query tasks {       # ← Operation name matches handler
    tasks { ... }
  }
`;

// MSW Handler
graphql.query('tasks', () => { ... })
// ✅ Match! MSW intercepts the request
```

### Naming Conventions

**Two valid approaches:**

**Option A: Lowercase operation names (simpler)**

```typescript
query tasks { tasks { ... } }
query task($id: ID!) { task(id: $id) { ... } }
mutation createTask($input: TaskInput!) { createTask(input: $input) { ... } }
mutation updateTask($input: UpdateTaskInput!) { updateTask(input: $input) { ... } }
```

**Option B: PascalCase operation names (more descriptive)**

```typescript
query GetTasks { tasks { ... } }
query GetTask($id: ID!) { task(id: $id) { ... } }
mutation CreateTask($input: TaskInput!) { createTask(input: $input) { ... } }
mutation UpdateTask($input: UpdateTaskInput!) { updateTask(input: $input) { ... } }

// Then MSW handlers must match:
graphql.query('GetTasks', ...)
graphql.query('GetTask', ...)
graphql.mutation('CreateTask', ...)
```

**Recommendation:** Use **Option A** (lowercase) for simpler maintenance - operation name = field name.

---

## 4. 🏗️ Layered Architecture: Effects → Service → GraphQL → Apollo

### The Architecture

```
┌─────────────────────────────────────────┐
│  Component (UI)                         │
│  "User clicks button"                   │
└──────────────────┬──────────────────────┘
                   │ dispatch(action)
                   ▼
┌─────────────────────────────────────────┐
│  NgRx Store                             │
│  "Manages state"                        │
└──────────────────┬──────────────────────┘
                   │ actions$ stream
                   ▼
┌─────────────────────────────────────────┐
│  Effects (NgRx Effects)                 │
│  "Listens to actions, coordinates flow" │
│  File: task-classic.effects.ts          │
└──────────────────┬──────────────────────┘
                   │ calls service methods
                   ▼
┌─────────────────────────────────────────┐
│  Service (Business Logic)               │
│  "Knows what queries to run"            │
│  File: task.service.ts                  │
└──────────────────┬──────────────────────┘
                   │ calls GraphQL methods
                   ▼
┌─────────────────────────────────────────┐
│  GraphQLService (Technical Layer)       │
│  "Handles Apollo client details"        │
│  File: graphql.service.ts               │
└──────────────────┬──────────────────────┘
                   │ uses Apollo Client
                   ▼
┌─────────────────────────────────────────┐
│  Apollo Client                          │
│  "HTTP requests, caching, retries"      │
└──────────────────┬──────────────────────┘
                   │ HTTP POST /graphql
                   ▼
┌─────────────────────────────────────────┐
│  MSW Mock Server                        │
│  "Intercepts requests, returns mocks"   │
└─────────────────────────────────────────┘
```

### Why This Layering?

#### Layer 1: Effects (Coordination)

**Responsibility:** Listen to actions, orchestrate async flow, dispatch new actions

```typescript
// task-classic.effects.ts
loadTasks$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TaskClassicActions.loadTasks), // 1. Listen
    switchMap(() =>
      this.taskService.getTasks().pipe(
        // 2. Call service
        map(tasks => TaskClassicActions.loadTasksSuccess({ tasks })), // 3. Success
        catchError(error => of(TaskClassicActions.loadTasksFailure({ error }))) // 4. Error
      )
    )
  )
);
```

**Why not call Apollo directly?**

- Effects would be coupled to Apollo implementation
- Hard to test (mock Apollo?)
- Business logic mixed with framework code

---

#### Layer 2: Service (Business Logic)

**Responsibility:** Know what GraphQL operations to run, transform data if needed

```typescript
// task.service.ts
getTasks(): Observable<Task[]> {
  const query = gql`
    query tasks {
      tasks {
        id
        title
        description
        status
        priority
        createdAt
        updatedAt
        assignedTo
      }
    }
  `;

  return this.graphql
    .query<{ tasks: Task[] }>(query)
    .pipe(map(data => data.tasks));
}
```

**Why have this layer?**

- **Reusability:** Multiple effects/components can use same service
- **Testability:** Mock the service, not Apollo
- **Business logic:** Transform data, combine queries, add business rules
- **Type safety:** Strongly typed methods per operation

---

#### Layer 3: GraphQLService (Technical)

**Responsibility:** Execute any GraphQL query/mutation using Apollo

```typescript
// graphql.service.ts
query<TData>(query: DocumentNode, variables?: any): Observable<TData> {
  return this.apollo
    .query({ query, variables })
    .pipe(map(result => result.data as TData));
}

mutate<TData>(mutation: DocumentNode, variables?: any): Observable<TData> {
  return this.apollo
    .mutate({ mutation, variables })
    .pipe(map(result => result.data as TData));
}
```

**Why have this layer?**

- **Shared infrastructure:** One Apollo client for entire app
- **Centralized config:** Error handling, retries, auth headers
- **Abstraction:** Hide Apollo implementation details
- **Consistency:** All GraphQL calls go through same path

---

### Benefits of This Architecture

| Benefit             | Explanation                                                         |
| ------------------- | ------------------------------------------------------------------- |
| **Testability**     | Each layer can be tested independently                              |
| **Reusability**     | `TaskService` can be used by multiple features                      |
| **Maintainability** | Clear separation of concerns                                        |
| **Flexibility**     | Can swap Apollo for another GraphQL client without changing effects |
| **Type Safety**     | Strong typing at each layer boundary                                |

### When to Add a Service Layer?

**Create a dedicated service when:**

- ✅ Multiple components/effects need same data
- ✅ Complex data transformations needed
- ✅ Combining multiple GraphQL operations
- ✅ Business logic around data fetching

**Skip the service layer when:**

- ❌ One-off query used in single place
- ❌ Simple pass-through with no logic
- ❌ Rapid prototyping

---

## 5. 🔀 When to Separate Interfaces

### The Question

**When should you have separate `DataType` vs `Type` interfaces?**

### Example: User (Good Separation)

```typescript
// Storage layer - What database/mock contains
interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

// API layer - What GraphQL returns (includes relationships)
interface User extends UserData {
  tasks: Task[]; // ← Relationship to other entities
  assignedProjects: Project[]; // ← Another relationship
}
```

**Why separate?**

- `UserData` = flat storage (database row)
- `User` = rich API object with **joined data**
- Clear distinction between storage and API shape

### Example: Task (Bad Separation ❌)

```typescript
// Storage layer
interface TaskData {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
}

// API layer
interface Task extends TaskData {
  assignedTo: string | null; // ← Just a string ID, not a relationship!
}
```

**Why NOT separate?**

- `assignedTo` is just a string ID, not a joined User object
- No meaningful difference between storage and API
- Extra complexity for no benefit

**Better:**

```typescript
// One simple interface
interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
  assignedTo: string | null; // Just an ID
}
```

### Decision Matrix

| Scenario                   | Separate? | Reason                                                   |
| -------------------------- | --------- | -------------------------------------------------------- |
| API returns joined objects | ✅ Yes    | `User` with `tasks: Task[]` is different from `UserData` |
| API returns just IDs       | ❌ No     | `assignedTo: string` doesn't need separation             |
| Different serialization    | ✅ Yes    | e.g., Date object vs ISO string                          |
| Frontend-specific fields   | ✅ Maybe  | e.g., `UserViewModel` with UI state                      |
| GraphQL fragments          | ✅ Maybe  | Different queries return different subsets               |

### Rule of Thumb

**Ask yourself:** "Does the API layer have **meaningfully different data** than storage?"

- **Joined relationships** (User with tasks) → Separate ✅
- **Just IDs** (Task with assignedTo: string) → Don't separate ❌
- **Computed fields** (fullName from firstName + lastName) → Maybe separate
- **UI state** (isSelected, isExpanded) → Separate ViewModel

---

## 🎯 Quick Reference Checklist

When implementing GraphQL + NgRx:

- [ ] **All queried fields exist in mock responses** (use `null` for optional)
- [ ] **Use `null`, not `undefined`** in API responses
- [ ] **GraphQL operation names match MSW handlers**
- [ ] **Service layer** between effects and GraphQL service
- [ ] **Consistent interface naming** - separate only when meaningful
- [ ] **Type safety** at every layer boundary
- [ ] **Test each layer independently**

---

## 📚 Related Documentation

- `.docs/ngrx-architecture.md` - NgRx patterns and principles
- `.docs/ngrx_extended.md` - Detailed NgRx implementation guide
- `.docs/design.md` - Overall architecture decisions
- Apollo Client Docs: https://www.apollographql.com/docs/react/caching/cache-configuration/
- MSW Docs: https://mswjs.io/docs/api/graphql

---

**Last Updated:** 2026-02-08  
**Author:** Learning Session on NgRx Effects Implementation

# Design Document

## Overview

The Angular Widget Library is a focused frontend training project designed to be completed in 1-2 weeks (14-28 hours). It combines Angular library development, GraphQL integration with Apollo, and NgRx state management using a mock backend. This project provides hands-on experience with modern Angular patterns while avoiding the complexity of backend development.

## Architecture

The system uses a layered frontend architecture with mock data:

```
┌─────────────────────────────────────────┐
│           Host Demo Application         │
│  ┌─────────────────────────────────────┐│
│  │        Task Widget Library          ││
│  │  ┌─────────────────────────────────┐││
│  │  │         NgRx Store              │││
│  │  │  ┌─────────────────────────────┐│││
│  │  │  │    Apollo GraphQL Client    ││││
│  │  │  └─────────────────────────────┘│││
│  │  └─────────────────────────────────┘││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
                    │
                    │ GraphQL over HTTP
                    ▼
┌─────────────────────────────────────────┐
│         Mock GraphQL Server             │
│      (MSW or json-graphql-server)       │
└─────────────────────────────────────────┘
```

## Components and Interfaces

### Library Public API

The library exports widgets and their related types. The first widget is the **Task Widget**, which provides task management functionality.

```typescript
// Public API Surface (public-api.ts)
// Task Widget (first widget in the library)
export * from './lib/task-widget/task-widget.module';
export * from './lib/task-widget/components/task-widget.component';
export * from './lib/task-widget/models/task.interface';
export * from './lib/task-widget/models/task-widget-config.interface';

// Future widgets can be added here:
// export * from './lib/chart-widget/...';
// export * from './lib/table-widget/...';

// Task Widget Configuration Interface
// Note: This is specific to the Task Widget. Other widgets will have their own config interfaces.
export interface TaskWidgetConfig {
  graphqlEndpoint: string;
  theme?: 'light' | 'dark' | 'custom';
  maxTasks?: number;
  enableAnimations?: boolean;
  customStyles?: Partial<WidgetTheme>;
}

// Task Interface
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}
```

### NgRx State Architecture

**Note**: The state architecture below is specific to the **Task Widget**. Each widget in the library can have its own state slice and feature module.

```typescript
// Task Widget State Interface
export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  selectedTask: Task | null;
}

// Actions
export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    'Load Tasks': emptyProps(),
    'Load Tasks Success': props<{ tasks: Task[] }>(),
    'Load Tasks Failure': props<{ error: string }>(),
    'Create Task': props<{ task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> }>(),
    'Create Task Success': props<{ task: Task }>(),
    'Create Task Failure': props<{ error: string }>(),
    'Update Task': props<{ id: string; changes: Partial<Task> }>(),
    'Update Task Success': props<{ task: Task }>(),
    'Update Task Failure': props<{ error: string }>(),
    'Delete Task': props<{ id: string }>(),
    'Delete Task Success': props<{ id: string }>(),
    'Delete Task Failure': props<{ error: string }>(),
    'Select Task': props<{ task: Task | null }>(),
  }
});

// Selectors
export const selectTaskState = createFeatureSelector<TaskState>('tasks');
export const selectAllTasks = createSelector(selectTaskState, state => state.tasks);
export const selectTasksLoading = createSelector(selectTaskState, state => state.loading);
export const selectTasksError = createSelector(selectTaskState, state => state.error);
export const selectSelectedTask = createSelector(selectTaskState, state => state.selectedTask);
```

### GraphQL Integration

**Note**: The GraphQL integration below is specific to the **Task Widget**. Each widget can define its own GraphQL operations.

```typescript
// Task Widget GraphQL Queries and Mutations
export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      status
      priority
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      status
      priority
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      title
      description
      status
      priority
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

// Task Widget GraphQL Service
@Injectable()
export class TaskGraphQLService {
  constructor(private apollo: Apollo) {}

  getTasks(): Observable<Task[]> {
    return this.apollo.query<{ tasks: Task[] }>({
      query: GET_TASKS
    }).pipe(
      map(result => result.data.tasks)
    );
  }

  createTask(input: CreateTaskInput): Observable<Task> {
    return this.apollo.mutate<{ createTask: Task }>({
      mutation: CREATE_TASK,
      variables: { input }
    }).pipe(
      map(result => result.data!.createTask)
    );
  }

  updateTask(id: string, input: UpdateTaskInput): Observable<Task> {
    return this.apollo.mutate<{ updateTask: Task }>({
      mutation: UPDATE_TASK,
      variables: { id, input }
    }).pipe(
      map(result => result.data!.updateTask)
    );
  }

  deleteTask(id: string): Observable<boolean> {
    return this.apollo.mutate<{ deleteTask: boolean }>({
      mutation: DELETE_TASK,
      variables: { id }
    }).pipe(
      map(result => result.data!.deleteTask)
    );
  }
}
```

## Data Models

### Task Widget Data Models

The following data models are specific to the **Task Widget**. Other widgets will define their own domain models.

```typescript
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
}
```

### Mock GraphQL Schema

**Note**: This schema is for the Task Widget's backend. Each widget can have its own GraphQL schema or share a common schema.

```graphql
type Task {
  id: ID!
  title: String!
  description: String
  status: TaskStatus!
  priority: TaskPriority!
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  DONE
}

enum TaskPriority {
  LOW
  MEDIUM
  HIGH
}

input CreateTaskInput {
  title: String!
  description: String
  status: TaskStatus = TODO
  priority: TaskPriority = MEDIUM
}

input UpdateTaskInput {
  title: String
  description: String
  status: TaskStatus
  priority: TaskPriority
}

type Query {
  tasks: [Task!]!
  task(id: ID!): Task
}

type Mutation {
  createTask(input: CreateTaskInput!): Task!
  updateTask(id: ID!, input: UpdateTaskInput!): Task!
  deleteTask(id: ID!): Boolean!
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Based on the prework analysis, here are the key correctness properties for this focused frontend training project:

**Property 1: Configuration application consistency**
*For any* valid widget configuration object, the widget should apply all specified settings and reflect them in its behavior and appearance
**Validates: Requirements 1.4**

**Property 2: GraphQL query execution**
*For any* valid GraphQL query, the Apollo client should execute it successfully and return data matching the expected schema
**Validates: Requirements 2.2**

**Property 3: GraphQL mutation reliability**
*For any* valid task mutation input, the system should send the mutation to the backend and handle the response correctly
**Validates: Requirements 2.3**

**Property 4: Apollo cache consistency**
*For any* repeated GraphQL query with identical parameters, subsequent requests should be served from cache without additional network calls
**Validates: Requirements 2.4**

**Property 5: GraphQL error handling**
*For any* GraphQL operation that fails, the system should return properly typed error objects with actionable information
**Validates: Requirements 2.5**

**Property 6: NgRx action dispatch consistency**
*For any* user interaction that should trigger state changes, the correct NgRx actions should be dispatched with proper payloads
**Validates: Requirements 3.2**

**Property 7: NgRx effects side effect handling**
*For any* action that requires GraphQL operations, the corresponding NgRx effect should execute the appropriate GraphQL query or mutation
**Validates: Requirements 3.3**

**Property 8: Reactive UI updates**
*For any* state change in the NgRx store, all components using selectors should update reactively to reflect the new state
**Validates: Requirements 3.4**

**Property 9: State consistency across components**
*For any* widget with multiple components, all components should display consistent data from the shared NgRx store
**Validates: Requirements 3.5**

**Note**: These properties are defined for the Task Widget. Future widgets will have their own correctness properties based on their specific requirements.

**Property 10: Task creation consistency**
*For any* valid task input, creating a task should add it to both the UI list and the NgRx store with matching data
**Validates: Requirements 4.2**

**Property 11: Task update propagation**
*For any* task modification, the changes should be reflected immediately in both the UI and the NgRx store
**Validates: Requirements 4.3**

**Property 12: Task deletion completeness**
*For any* existing task, deleting it should remove it from both the UI display and the NgRx store
**Validates: Requirements 4.4**

**Property 13: Error state consistency**
*For any* operation failure, error messages should be displayed in the UI while maintaining consistent state in the store
**Validates: Requirements 4.5**

**Property 14: Host configuration acceptance**
*For any* configuration passed from the host application, the widget should accept and apply the settings correctly
**Validates: Requirements 5.2**

**Property 15: Widget independence**
*For any* host application state, the widget should function correctly without being affected by external application state
**Validates: Requirements 5.3**

**Property 16: Style isolation**
*For any* conflicting CSS styles in the host application, the widget should maintain its intended appearance and styling
**Validates: Requirements 5.4**

**Property 17: Event emission reliability**
*For any* widget operation that should notify the host, the appropriate events should be emitted with correct data
**Validates: Requirements 5.5**

**Property 18: Generic type flexibility**
*For any* generic type implementation, the types should work correctly with different type parameters while maintaining type safety
**Validates: Requirements 6.5**

## Error Handling

The system implements comprehensive error handling focused on frontend scenarios:

### GraphQL Error Handling
- **Network Errors**: Automatic retry with exponential backoff using Apollo retry policies
- **GraphQL Errors**: Typed error objects with user-friendly messages
- **Schema Errors**: Compile-time type checking with generated types

### NgRx Error Handling
- **Action Errors**: Error actions dispatched for failed operations
- **Effect Errors**: Proper error handling in effects with catchError operators
- **State Errors**: Error state management with loading and error flags

### Widget Error Handling
- **Configuration Errors**: Validation of widget configuration with clear error messages
- **Component Errors**: Error boundaries to prevent widget crashes
- **Integration Errors**: Graceful handling of host application integration issues

## Testing Strategy

The project uses a focused testing approach suitable for the 1-2 week timeline:

### Unit Testing
- **Angular Components**: Testing component behavior and user interactions
- **NgRx Store**: Testing reducers, actions, and selectors
- **GraphQL Service**: Testing Apollo client integration with mocked responses
- **Library Integration**: Testing public API and module exports

### Property-Based Testing
- **Frontend**: Using `fast-check` library for TypeScript property testing
- **Configuration**: Minimum 50 iterations per property test (reduced for training)
- **Tagging**: Each property test tagged with format: `**Feature: angular-widget-library, Property {number}: {property_text}**`

### Mock Backend Testing
- **MSW Integration**: Testing GraphQL operations against mock service worker
- **Schema Validation**: Ensuring frontend types match GraphQL schema
- **Error Simulation**: Testing error handling with simulated failures

## Implementation Timeline

**Total Duration: 1-2 weeks (14-28 hours at 2 hours/day)**

### Week 1 (10-14 hours):
- **Days 1-2**: Project setup, Angular library creation, mock GraphQL server
- **Days 3-4**: NgRx store setup, basic actions, reducers, and selectors for Task Widget
- **Days 5-7**: Task Widget component implementation, GraphQL integration with Apollo

### Week 2 (4-14 hours):
- **Days 8-9**: NgRx effects for Task Widget, complete CRUD operations
- **Days 10-11**: Task Widget styling, configuration system, host integration
- **Days 12-14**: Testing, documentation, and polish for Task Widget

### Key Learning Milestones:
- **Day 2**: Angular library project structure and build process
- **Day 4**: NgRx architecture and state management patterns
- **Day 6**: GraphQL integration and Apollo client usage
- **Day 9**: NgRx effects and side effect management
- **Day 11**: Library packaging and host application integration
- **Day 14**: Complete widget library with testing and documentation

This focused approach provides hands-on experience with Angular library development, GraphQL integration, and NgRx state management while being achievable within your time constraints.

## Library Extensibility

The library is designed to be extensible. After completing the Task Widget, additional widgets can be added following the same patterns:

- Each widget should have its own feature module (e.g., `TaskWidgetModule`, `ChartWidgetModule`)
- Each widget can have its own NgRx feature slice
- Each widget can define its own GraphQL operations
- All widgets share the same library infrastructure (build system, testing setup, etc.)

This architecture allows the library to grow while maintaining clear separation of concerns between different widget types.
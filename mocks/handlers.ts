import { graphql, HttpResponse } from 'msw';
import { mockTasks, mockUsers } from './mock-data';
import { Task, TaskData, User, UserData } from './interfaces';

interface TaskVariables {
  id?: string;
  input?: Partial<TaskData>; // Input should have assignedTo as string, not User
}

interface TasksResponse {
  tasks: Task[];
}

interface UsersResponse {
  users: User[];
}

interface TaskResponse {
  task: Task | null;
}

interface UserResponse {
  user: User | null;
}

interface UserVariables {
  id?: string;
}

interface CreateTaskResponse {
  createTask: Task;
}

/**
 * Helper: Convert UserData to User (with empty tasks)
 * Returns User with tasks=[] to prevent circular dependencies
 * Used for Task.assignedTo
 */
const userDataToUser = (userData: UserData): User => ({
  ...userData,
  tasks: [] // Empty array prevents circular Task → User → Task lookups
});

/**
 * Helper: Convert TaskData to Task
 * Transforms assignedTo from string ID to User object (with empty tasks)
 */
const taskDataToTask = (taskData: TaskData): Task => ({
  ...taskData,
  assignedTo: taskData.assignedTo
    ? userDataToUser(mockUsers.find(u => u.id === taskData.assignedTo)!)
    : undefined
});

export const handlers = [
  graphql.query<TasksResponse>('tasks', () => {
    const transformedTasks: Task[] = mockTasks.map(taskDataToTask);

    return HttpResponse.json({
      data: { tasks: transformedTasks }
    });
  }),

  graphql.query<UsersResponse>('users', () => {
    const usersWithTasks: User[] = mockUsers.map(user => {
      const assignedTasksData = mockTasks.filter(t => t.assignedTo === user.id);
      const tasks: Task[] = assignedTasksData.map(taskDataToTask);

      return {
        ...user,
        tasks
      };
    });

    return HttpResponse.json({
      data: { users: usersWithTasks }
    });
  }),

  graphql.query<TaskResponse, TaskVariables>('task', ({ variables }) => {
    const { id } = variables;
    const taskData: TaskData | undefined = mockTasks.find(t => t.id === id);

    const task: Task | null = taskData ? taskDataToTask(taskData) : null;

    return HttpResponse.json({
      data: { task }
    });
  }),

  graphql.query<UserResponse, UserVariables>('user', ({ variables }) => {
    const { id } = variables;

    const userData: UserData | undefined = mockUsers.find(u => u.id === id);
    const assignedTasksData = mockTasks.filter(t => t.assignedTo === id);
    const assignedTasks: Task[] = assignedTasksData.map(taskDataToTask);

    const user: User | null = userData
      ? {
          ...userData,
          tasks: assignedTasks
        }
      : null;

    return HttpResponse.json({
      data: { user }
    });
  }),

  graphql.mutation<CreateTaskResponse, TaskVariables>('createTask', ({ variables }) => {
    const { input } = variables;

    const validatedInput = validateRequiredFields(input, ['title', 'status', 'priority']);

    const newTaskData: TaskData = {
      id: String(mockTasks.length + 1),
      ...validatedInput,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockTasks.push(newTaskData);

    const newTask: Task = taskDataToTask(newTaskData);

    return HttpResponse.json({
      data: { createTask: newTask }
    });
  })
];

const validateRequiredFields = <T extends Record<string, any>, K extends keyof T>(
  input: T | undefined,
  requiredFields: K[]
): T & Required<Pick<T, K>> => {
  if (!input) {
    throw new Error('Input is required');
  }

  const missingFields: string[] = [];

  for (const field of requiredFields) {
    if (input[field] === undefined || input[field] === null) {
      missingFields.push(String(field));
    }
  }

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  return input as T & Required<Pick<T, K>>;
};

// interface UpdateTaskResponse {
//   updateTask: Task;
// }

// interface DeleteTaskResponse {
//   deleteTask: boolean;
// }

// graphql.mutation<UpdateTaskResponse, TaskVariables>('updateTask', ({ variables }) => {
//   const { id, input } = variables;
//   const taskIndex = mockTasks.findIndex(t => t.id === id);
//   if (taskIndex === -1) {
//     return HttpResponse.json({ errors: [{ message: 'Task not found' }] });
//   }
//   const updatedTask = { ...mockTasks[taskIndex], ...input, updatedAt: new Date().toISOString() };
//   mockTasks[taskIndex] = updatedTask;
//   return HttpResponse.json({ data: { updateTask: updatedTask } });
// }),

// graphql.mutation<DeleteTaskResponse, TaskVariables>('deleteTask', ({ variables }) => {
//   const { id } = variables;
//   const taskIndex = mockTasks.findIndex(t => t.id === id);
//   if (taskIndex === -1) {
//     return HttpResponse.json({ errors: [{ message: 'Task not found' }] });
//   }
//   mockTasks.splice(taskIndex, 1);
//   return HttpResponse.json({ data: { deleteTask: true } });
// })

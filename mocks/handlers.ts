import { graphql, HttpResponse } from 'msw';
import { mockTasks } from './mock-data';
import { Task } from './interfaces';

interface TaskVariables {
  id?: string;
  input?: Partial<Task>;
}

interface TasksResponse {
  tasks: Task[];
}

interface TaskResponse {
  task: Task | null;
}

interface CreateTaskResponse {
  createTask: Task;
}

export const handlers = [
  graphql.query<TasksResponse>('tasks', () => {
    return HttpResponse.json({
      data: { tasks: mockTasks }
    });
  }),

  graphql.query<TaskResponse, TaskVariables>('task', ({ variables }) => {
    const { id } = variables;
    const task: Task | undefined = mockTasks.find(t => t.id === id);
    return HttpResponse.json({
      data: { task: task || null }
    });
  }),

  graphql.mutation<CreateTaskResponse, TaskVariables>('createTask', ({ variables }) => {
    const { input } = variables;

    const validatedInput = validateRequiredFields(input, ['title', 'status', 'priority']);

    const newTask: Task = {
      id: String(mockTasks.length + 1),
      ...validatedInput,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockTasks.push(newTask);
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
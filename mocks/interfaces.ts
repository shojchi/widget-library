export type {
  TaskData,
  Task,
  TaskStatus,
  TaskPriority
} from '../projects/widget-library/src/lib/features/task/models/task.model';
import type { Task } from '../projects/widget-library/src/lib/features/task/models/task.model';

// User types remain here for now (not part of the library yet)
// Storage layer (what mockUsers contains)
export interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// API layer (what GraphQL returns - includes tasks)
export interface User extends UserData {
  tasks: Task[];
}

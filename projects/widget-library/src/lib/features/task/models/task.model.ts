/**
 * Task status enumeration
 * Represents the possible states of a task
 */
export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

/**
 * Task priority enumeration
 * Represents the priority levels for tasks
 */
export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

/**
 * Task data model
 * Represents the core task entity used throughout the Task Widget feature
 */
export interface TaskData {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string; // Store user ID
}

/**
 * Task with populated user reference
 * Used when the assignedTo field is expanded with user details
 */
export interface Task extends Omit<TaskData, 'assignedTo'> {
  assignedTo?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

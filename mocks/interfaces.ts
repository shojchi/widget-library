export interface TaskData {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string; // Store user ID
}

export interface Task extends Omit<TaskData, 'assignedTo'> {
  assignedTo?: User; // Reference to User (with empty tasks array)
}

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

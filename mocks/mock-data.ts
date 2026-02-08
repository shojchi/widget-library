import { TaskData, UserData, Task } from './interfaces';
import { TaskStatus, TaskPriority } from '@lib/features/task-classic/models/task.model';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Implement authentication',
    description: 'Set up user authentication using JWT.',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-12T12:00:00Z',
    assignedTo: '1'
  },
  {
    id: '2',
    title: 'Log time tracking',
    status: TaskStatus.DONE,
    priority: TaskPriority.MEDIUM,
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-12T12:00:00Z',
    assignedTo: '3'
  },
  {
    id: '3',
    title: 'Chill sometimes',
    description: 'watch a movie or go for a walk',
    status: TaskStatus.TODO,
    priority: TaskPriority.LOW,
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-12T12:00:00Z'
  },
  {
    id: '4',
    title: 'Selebrate Christmas',
    description: 'Buy tangerines, gifts, and prepare a feast.',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
    createdAt: '2024-04-10T10:00:00Z',
    updatedAt: '2024-04-12T12:00:00Z',
    assignedTo: '2'
  },
  {
    id: '5',
    title: 'Buy gifts for loved ones',
    description: 'Set of ideas: books, gadgets, and experiences.',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    createdAt: '2024-05-10T10:00:00Z',
    updatedAt: '2024-05-12T12:00:00Z'
  }
];

export const mockUsers: UserData[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  },
  {
    id: '3',
    name: 'Max Well',
    email: 'max.well@example.com',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  }
];

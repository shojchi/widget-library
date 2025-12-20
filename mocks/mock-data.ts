import { Task } from './interfaces';

export let mockTasks: Task[] = [
  {
    id: '1',
    title: 'Implement authentication',
    description: 'Set up user authentication using JWT.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-12T12:00:00Z'
  },
  {
    id: '2',
    title: 'Log time tracking',
    status: 'DONE',
    priority: 'MEDIUM',
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-12T12:00:00Z'
  },
  {
    id: '3',
    title: 'Chill sometimes',
    description: 'watch a movie or go for a walk',
    status: 'TODO',
    priority: 'LOW',
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-12T12:00:00Z'
  },
  {
    id: '4',
    title: 'Selebrate Christmas',
    description: 'Buy tangerines, gifts, and prepare a feast.',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    createdAt: '2024-04-10T10:00:00Z',
    updatedAt: '2024-04-12T12:00:00Z'
  },
  {
    id: '5',
    title: 'Buy gifts for loved ones',
    description: 'Set of ideas: books, gadgets, and experiences.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    createdAt: '2024-05-10T10:00:00Z',
    updatedAt: '2024-05-12T12:00:00Z'
  }
];

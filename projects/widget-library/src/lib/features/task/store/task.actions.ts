import { TaskData } from '../models/task.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    'Load Tasks': emptyProps(),
    'Load Tasks Success': props<{ tasks: TaskData[] }>(),
    'Load Tasks Failure': props<{ error: string }>(),
    'Create Task': props<{ task: Omit<TaskData, 'id' | 'createdAt' | 'updatedAt'> }>(),
    'Create Task Success': props<{ task: TaskData }>(),
    'Create Task Failure': props<{ error: string }>(),
    'Update Task': props<{ id: string; changes: Partial<TaskData> }>(),
    'Update Task Success': props<{ task: TaskData }>(),
    'Update Task Failure': props<{ error: string }>(),
    'Delete Task': props<{ id: string }>(),
    'Delete Task Success': props<{ id: string }>(),
    'Delete Task Failure': props<{ error: string }>(),
    'Select Task': props<{ task: TaskData | null }>()
  }
});

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateTaskInput, Task, UpdateTaskInput } from '../models';

export const TaskClassicActions = createActionGroup({
  source: 'Task Classic',
  events: {
    'Load Tasks': emptyProps(),
    'Load Tasks Success': props<{ tasks: Task[] }>(),
    'Load Tasks Failure': props<{ error: string }>(),

    'Create Task': props<{ input: CreateTaskInput }>(),
    'Create Task Success': props<{ task: Task }>(),
    'Create Task Failure': props<{ error: string }>(),

    'Update Task': props<{ input: UpdateTaskInput }>(),
    'Update Task Success': props<{ task: Task }>(),
    'Update Task Failure': props<{ error: string }>(),

    'Delete Task': props<{ id: string }>(),
    'Delete Task Success': props<{ id: string }>(),
    'Delete Task Failure': props<{ error: string }>(),

    'Select Task': props<{ id: string }>(),
    'Clear Selected Task': emptyProps(),

    'Clear Errors': emptyProps()
  }
});

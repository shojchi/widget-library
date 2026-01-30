import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskClassicState } from './task-classic.state';
import { Task, TaskStatus, TaskPriority } from '../models';

export const selectTaskClassicState =
  createFeatureSelector<TaskClassicState>('taskClassic');

export const selectAllTasks = createSelector(
  selectTaskClassicState,
  (state: TaskClassicState) => state.tasks
);

export const selectLoading = createSelector(
  selectTaskClassicState,
  (state: TaskClassicState) => state.loading
);

export const selectError = createSelector(
  selectTaskClassicState,
  (state: TaskClassicState) => state.error
);

export const selectSelectedTaskId = createSelector(
  selectTaskClassicState,
  (state: TaskClassicState) => state.selectedTaskId
);

export const selectSelectedTask = createSelector(
  selectAllTasks,
  selectSelectedTaskId,
  (tasks: Task[], selectedTaskId: string | null) => {
    if (!selectedTaskId) {
      return null;
    }
    return tasks.find(task => task.id === selectedTaskId);
  }
);

export const selectTasksByStatus = (status: TaskStatus) =>
  createSelector(selectAllTasks, (tasks: Task[]) =>
    tasks.filter(task => task.status === status)
  );

export const selectTasksByPriority = (priority: TaskPriority) =>
  createSelector(selectAllTasks, (tasks: Task[]) =>
    tasks.filter(task => task.priority === priority)
  );

export const selectTasksCountByStatus = (status: TaskStatus) =>
  createSelector(
    selectAllTasks,
    (tasks: Task[]) => tasks.filter(task => task.status === status).length
  );

export const selectTasksCountByPriority = (priority: TaskPriority) =>
  createSelector(
    selectAllTasks,
    (tasks: Task[]) => tasks.filter(task => task.priority === priority).length
  );

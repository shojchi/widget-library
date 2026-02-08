import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { TaskClassicActions } from './task-classic.actions';
import { TaskService } from '../services/task.service';

@Injectable()
export class TaskClassicEffects {
  private actions$ = inject(Actions);
  private taskService = inject(TaskService);

  /**
   * Effect: Load Tasks
   *
   * Listens for: loadTasks action
   * Does: Calls API to fetch all tasks
   * Dispatches: loadTasksSuccess(tasks) or loadTasksFailure(error)
   */
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskClassicActions.loadTasks),
      switchMap(() =>
        this.taskService.getTasks().pipe(
          map(tasks => TaskClassicActions.loadTasksSuccess({ tasks })),
          catchError(error =>
            of(
              TaskClassicActions.loadTasksFailure({
                error: error.message || 'Failed to load tasks'
              })
            )
          )
        )
      )
    )
  );

  /**
   * Effect: Create Task
   *
   * Listens for: createTask action
   * Does: Calls API to create a new task
   * Dispatches: createTaskSuccess(task) or createTaskFailure(error)
   */
  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskClassicActions.createTask),
      switchMap(({ input }) =>
        this.taskService.createTask(input).pipe(
          map(task => TaskClassicActions.createTaskSuccess({ task })),
          catchError(error =>
            of(
              TaskClassicActions.createTaskFailure({
                error: error.message || 'Failed to create task'
              })
            )
          )
        )
      )
    )
  );

  /**
   * Effect: Update Task
   *
   * Listens for: updateTask action
   * Does: Calls API to update an existing task
   * Dispatches: updateTaskSuccess(task) or updateTaskFailure(error)
   */
  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskClassicActions.updateTask),
      switchMap(({ input }) =>
        this.taskService.updateTask(input).pipe(
          map(task => TaskClassicActions.updateTaskSuccess({ task })),
          catchError(error =>
            of(
              TaskClassicActions.updateTaskFailure({
                error: error.message || 'Failed to update task'
              })
            )
          )
        )
      )
    )
  );

  /**
   * Effect: Delete Task
   *
   * Listens for: deleteTask action
   * Does: Calls API to delete a task
   * Dispatches: deleteTaskSuccess(id) or deleteTaskFailure(error)
   */
  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskClassicActions.deleteTask),
      switchMap(({ id }) =>
        this.taskService.deleteTask(id).pipe(
          map(() => TaskClassicActions.deleteTaskSuccess({ id })),
          catchError(error =>
            of(
              TaskClassicActions.deleteTaskFailure({
                error: error.message || 'Failed to delete task'
              })
            )
          )
        )
      )
    )
  );
}

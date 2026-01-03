import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { TaskActions } from './task.actions';
import { GraphQLService } from '../../../core/graphql/graphql.service';
import { gql } from '@apollo/client/core';

const GET_TASKS = gql`
  query tasks {
    tasks {
      id
      title
      description
      status
      priority
      createdAt
      updatedAt
    }
  }
`;

const CREATE_TASK = gql`
  mutation createTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      status
      priority
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_TASK = gql`
  mutation updateTask($id: ID!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      title
      description
      status
      priority
      createdAt
      updatedAt
    }
  }
`;

const DELETE_TASK = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private graphql = inject(GraphQLService);

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(() =>
        this.graphql.query<{ tasks: any[] }>(GET_TASKS).pipe(
          map(({ tasks }) => TaskActions.loadTasksSuccess({ tasks })),
          catchError(error => of(TaskActions.loadTasksFailure({ error: error.message })))
        )
      )
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTask),
      switchMap(
        (
          { task } // ← Destructure task from action payload!
        ) =>
          this.graphql.mutate<{ createTask: any }>(CREATE_TASK, { input: task }).pipe(
            map(data => TaskActions.createTaskSuccess({ task: data!.createTask })),
            catchError(error =>
              of(TaskActions.createTaskFailure({ error: error.message }))
            )
          )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      switchMap(({ id, changes }) =>
        this.graphql
          .mutate<{ updateTask: any }>(UPDATE_TASK, { id, input: changes })
          .pipe(
            map(data => TaskActions.updateTaskSuccess({ task: data!.updateTask })),
            catchError(error =>
              of(TaskActions.updateTaskFailure({ error: error.message }))
            )
          )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      switchMap(({ id }) =>
        this.graphql.mutate<{ deleteTask: any }>(DELETE_TASK, { id }).pipe(
          map(() => TaskActions.deleteTaskSuccess({ id })),
          catchError(error => of(TaskActions.deleteTaskFailure({ error: error.message })))
        )
      )
    )
  );
}

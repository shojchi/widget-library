import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { gql } from 'apollo-angular';
import { GraphQLService } from '../../../core/graphql/graphql.service';
import { Task, CreateTaskInput, UpdateTaskInput } from '../models';

/**
 * Task Service - Business logic for task operations
 *
 * This service encapsulates all GraphQL operations for tasks.
 * It sits between NgRx effects and the GraphQL service.
 */
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private graphql = inject(GraphQLService);

  /**
   * Query: Get all tasks
   */
  getTasks(): Observable<Task[]> {
    const query = gql`
      query tasks {
        tasks {
          id
          title
          description
          status
          priority
          createdAt
          updatedAt
          assignedTo
        }
      }
    `;

    return this.graphql.query<{ tasks: Task[] }>(query).pipe(map(data => data.tasks));
  }

  /**
   * Query: Get task by ID
   */
  getTaskById(id: string): Observable<Task | null> {
    const query = gql`
      query task($id: ID!) {
        task(id: $id) {
          id
          title
          description
          status
          priority
          createdAt
          updatedAt
          assignedTo
        }
      }
    `;

    return this.graphql
      .query<{ task: Task | null }>(query, { id })
      .pipe(map(data => data.task));
  }

  /**
   * Mutation: Create a new task
   */
  createTask(input: CreateTaskInput): Observable<Task> {
    const mutation = gql`
      mutation createTask($input: TaskInput!) {
        createTask(input: $input) {
          id
          title
          description
          status
          priority
          createdAt
          updatedAt
          assignedTo
        }
      }
    `;

    return this.graphql
      .mutate<{ createTask: Task }>(mutation, { input })
      .pipe(map(data => data!.createTask));
  }

  /**
   * Mutation: Update an existing task
   */
  updateTask(input: UpdateTaskInput): Observable<Task> {
    const mutation = gql`
      mutation updateTask($input: UpdateTaskInput!) {
        updateTask(input: $input) {
          id
          title
          description
          status
          priority
          createdAt
          updatedAt
          assignedTo
        }
      }
    `;

    return this.graphql
      .mutate<{ updateTask: Task }>(mutation, { input })
      .pipe(map(data => data!.updateTask));
  }

  /**
   * Mutation: Delete a task
   */
  deleteTask(id: string): Observable<boolean> {
    const mutation = gql`
      mutation deleteTask($id: ID!) {
        deleteTask(id: $id)
      }
    `;

    return this.graphql
      .mutate<{ deleteTask: boolean }>(mutation, { id })
      .pipe(map(data => data!.deleteTask));
  }
}

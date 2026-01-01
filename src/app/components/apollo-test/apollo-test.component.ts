import { Component, inject, signal } from '@angular/core';
import { TaskData } from '../../../../mocks/interfaces';
import { GraphQLService } from '../graphql-playground/graphql.service';
import { Apollo } from 'apollo-angular';
import { gql } from '@apollo/client/core';
import { TasksQuery, TasksQueryVariables } from '../../../generated/graphql';

const GET_TASKS_STRING = `
  query tasks {
    tasks {
      id
      title
      description
      status
      priority
    }
  }
`;

const GET_TASKS_QUERY = gql`
  query tasks {
    tasks {
      id
      title
      description
      status
      priority
    }
  }
`;

@Component({
  selector: 'app-apollo-test',
  standalone: true,
  template: `
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">Apollo + HttpClient Test</h2>

      <div class="space-y-4">
        <!-- Buttons -->
        <div class="flex gap-4">
          <button
            (click)="testHttpClient()"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Test HttpClient
          </button>

          <button
            (click)="testApollo()"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Test Apollo
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <!-- HttpClient Results -->
          <div class="border p-4 rounded">
            <h3 class="text-lg font-semibold mb-2">HttpClient Results</h3>

            @if (httpClientLoading()) {
              <p class="text-blue-500">Loading...</p>
            }

            @if (httpClientError()) {
              <p class="text-red-500">Error: {{ httpClientError() }}</p>
            }

            @if (httpClientTasks()) {
              <div class="space-y-2">
                <p class="text-green-600">
                  ✅ Loaded {{ httpClientTasks()!.length }} tasks
                </p>
                @for (task of httpClientTasks()!; track task.id) {
                  <div class="bg-gray-50 p-2 rounded">
                    <p class="font-medium">{{ task.title }}</p>
                    <p class="text-sm text-gray-600">
                      {{ task.status }} - {{ task.priority }}
                    </p>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Apollo Results -->
          <div class="border p-4 rounded">
            <h3 class="text-lg font-semibold mb-2">Apollo Results</h3>

            @if (apolloLoading()) {
              <p class="text-blue-500">Loading...</p>
            }

            @if (apolloError()) {
              <p class="text-red-500">Error: {{ apolloError() }}</p>
            }

            @if (apolloTasks()) {
              <div class="space-y-2">
                <p class="text-green-600">✅ Loaded {{ apolloTasks()!.length }} tasks</p>
                @for (task of apolloTasks()!; track task.id) {
                  <div class="bg-gray-50 p-2 rounded">
                    <p class="font-medium">{{ task.title }}</p>
                    <p class="text-sm text-gray-600">
                      {{ task.status }} - {{ task.priority }}
                    </p>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class ApolloTestComponent {
  private graphqlService = inject(GraphQLService);
  private apollo = inject(Apollo);

  httpClientTasks = signal<TaskData[] | null>(null);
  httpClientLoading = signal<boolean>(false);
  httpClientError = signal<string | null>(null);

  apolloTasks = signal<TaskData[] | null>(null);
  apolloLoading = signal<boolean>(false);
  apolloError = signal<string | null>(null);

  testHttpClient() {
    this.httpClientLoading.set(true);
    this.httpClientError.set(null);

    this.graphqlService.execute(GET_TASKS_STRING).subscribe({
      next: result => {
        this.httpClientTasks.set(result.data.tasks);
        this.httpClientLoading.set(false);
      },
      error: err => {
        this.httpClientError.set(err.message);
        this.httpClientLoading.set(false);
      }
    });
  }

  testApollo() {
    this.apolloLoading.set(true);
    this.apolloError.set(null);

    this.apollo
      .query<TasksQuery, TasksQueryVariables>({
        query: GET_TASKS_QUERY
      })
      .subscribe({
        next: result => {
          if (result.data) {
            this.apolloTasks.set(result.data.tasks);
          }
          this.apolloLoading.set(false);
        },
        error: err => {
          this.apolloError.set(err.message);
          this.apolloLoading.set(false);
        }
      });
  }
}

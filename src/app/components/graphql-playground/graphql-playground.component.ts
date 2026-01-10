import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraphQLService } from './graphql.service';

/**
 * GraphQL Playground Component
 *
 * A visual interface for testing GraphQL queries and mutations.
 * This helps you explore the mock GraphQL API before integrating it into widgets.
 */
@Component({
  selector: 'app-graphql-playground',
  imports: [CommonModule, FormsModule],
  templateUrl: './graphql-playground.component.html',
  styleUrl: './graphql-playground.component.css'
})
export class GraphQLPlaygroundComponent {
  private readonly graphqlService = inject(GraphQLService);

  /**
   * Example queries to help users get started
   */
  readonly examples = [
    {
      name: 'Get All Tasks',
      query: `query tasks {
  tasks {
    id
    title
    description
    status
    priority
    createdAt
    updatedAt
  }
}`,
      variables: '{}'
    },
    {
      name: 'Get Task by ID',
      query: `query task($id: ID!) {
  task(id: $id) {
    id
    title
    description
    status
    priority
    createdAt
    updatedAt
  }
}`,
      variables: '{\n  "id": "1"\n}'
    },
    {
      name: 'Create Task',
      query: `mutation createTask($input: TaskInput!) {
  createTask(input: $input) {
    id
    title
    description
    status
    priority
    createdAt
    updatedAt
  }
}`,
      variables: `{
  "input": {
    "title": "New Task",
    "description": "Task description",
    "status": "TODO",
    "priority": "MEDIUM"
  }
}`
    }
  ];

  // Signals for reactive state (defined after examples to avoid initialization order issues)
  query = signal<string>(this.getDefaultQuery());
  variables = signal<string>('{}');
  result = signal<any>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  /**
   * Execute the current query
   */
  executeQuery(): void {
    this.loading.set(true);
    this.error.set(null);
    this.result.set(null);

    let parsedVariables: Record<string, any> = {};

    // Parse variables
    try {
      parsedVariables = JSON.parse(this.variables());
    } catch (e) {
      this.error.set('Invalid JSON in variables');
      this.loading.set(false);
      return;
    }

    // Execute query
    this.graphqlService.execute(this.query(), parsedVariables).subscribe({
      next: response => {
        this.loading.set(false);
        this.result.set(response);
      },
      error: err => {
        this.loading.set(false);
        this.error.set(err.message || 'An error occurred');
      }
    });
  }

  /**
   * Load an example query
   */
  loadExample(example: (typeof this.examples)[0]): void {
    this.query.set(example.query);
    this.variables.set(example.variables);
    this.result.set(null);
    this.error.set(null);
  }

  /**
   * Get the default query to show on load
   */
  private getDefaultQuery(): string {
    return this.examples[0].query;
  }

  /**
   * Format JSON for display
   */
  formatJson(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }
}

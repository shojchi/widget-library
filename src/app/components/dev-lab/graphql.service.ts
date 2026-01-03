import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentNode } from 'graphql';

/**
 * Service for executing GraphQL queries.
 * This sends requests to /graphql which are intercepted by MSW.
 */
@Injectable({
  providedIn: 'root'
})
export class GraphQLService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = '/graphql';

  /**
   * Execute a GraphQL query or mutation
   * @param query - The GraphQL query string
   * @param variables - Optional variables for the query
   */
  execute<T = any>(
    query: string | DocumentNode,
    variables?: Record<string, any>
  ): Observable<{ data: T; errors?: any[] }> {
    return this.http.post<{ data: T; errors?: any[] }>(this.endpoint, {
      query,
      variables
    });
  }
}

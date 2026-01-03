import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphQLService {
  private apollo = inject(Apollo);

  query<TData, TVariables extends Record<string, unknown> = Record<string, unknown>>(
    query: DocumentNode,
    variables?: TVariables
  ): Observable<TData> {
    return this.apollo
      .query({
        query,
        variables
      })
      .pipe(map(result => result.data as TData));
  }

  mutate<TData, TVariables extends Record<string, unknown> = Record<string, unknown>>(
    mutation: DocumentNode,
    variables?: TVariables
  ): Observable<TData | null> {
    return this.apollo.mutate({
      mutation,
      variables
    }).pipe(map(result => result.data as TData | null));
  }
}

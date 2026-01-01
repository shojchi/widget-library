import { ApplicationConfig, inject } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

/**
 * Provides Apollo Client configuration for the demo app.
 * This connects to /graphql which is intercepted by MSW.
 */
export function provideApolloClient() {
  return provideApollo(() => {
    const httpLink = inject(HttpLink);
    const link = httpLink.create({ uri: '/graphql' });
    const cache = new InMemoryCache();

    return {
      link,
      cache
    };
  });
}

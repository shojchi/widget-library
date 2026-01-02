import { inject } from '@angular/core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { WIDGET_LIBRARY_CONFIG } from '../config/widgets-config.token';

export function provideApolloClient() {
  return provideApollo(() => {
    const httpLink = inject(HttpLink);
    const config = inject(WIDGET_LIBRARY_CONFIG);
    const link = httpLink.create({ uri: config.api.graphqlEndpoint });
    const cache = new InMemoryCache();

    return {
      link,
      cache
    };
  });
}

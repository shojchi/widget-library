import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideApolloClient, WIDGET_LIBRARY_CONFIG } from 'widget-library';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: WIDGET_LIBRARY_CONFIG,
      useValue: {
        api: {
          graphqlEndpoint: '/graphql'
        }
      }
    },
    provideApolloClient()
  ]
};

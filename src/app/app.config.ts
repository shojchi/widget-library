import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  isDevMode
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

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
    provideApolloClient(),
    provideStore({}),
    ...(isDevMode()
      ? [
          provideStoreDevtools({
            maxAge: 25,
            autoPause: true,
            trace: true,
            traceLimit: 25
          })
        ]
      : [])
  ]
};

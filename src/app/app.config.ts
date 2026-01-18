import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  isDevMode,
  provideAppInitializer,
  inject
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import {
  provideApolloClient,
  WIDGET_LIBRARY_CONFIG,
  themeReducer,
  viewportReducer,
  widgetRegistryReducer
} from 'widget-library';
import { ViewportService } from './services/viewport.service';
import { ThemeService } from './services/theme.service';

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
    provideStore({
      theme: themeReducer,
      viewport: viewportReducer,
      widgetRegistry: widgetRegistryReducer
    }),
    provideAppInitializer(() => {
      const viewportService = inject(ViewportService);
      const themeService = inject(ThemeService);
      viewportService.initializeViewportListener();
      themeService.initializeThemeListener();
    }),
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

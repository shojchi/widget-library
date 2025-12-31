import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

/**
 * Initialize MSW (Mock Service Worker) for development.
 * This intercepts GraphQL requests and returns mock data.
 * In a real app, you'd conditionally enable this based on environment.
 */
async function enableMocking() {
  const { worker } = await import('../mocks/browser');

  return worker.start({
    onUnhandledRequest: 'bypass' // Don't warn about non-GraphQL requests
  });
}

enableMocking().then(() => {
  bootstrapApplication(App, appConfig).catch(err => console.error(err));
});

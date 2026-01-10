import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

/**
 * MSW browser worker for intercepting GraphQL requests in development.
 * This allows us to mock the GraphQL backend without a real server.
 */
export const worker = setupWorker(...handlers);

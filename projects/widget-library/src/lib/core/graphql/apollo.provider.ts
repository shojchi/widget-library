import { inject } from '@angular/core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { WIDGET_LIBRARY_CONFIG } from '../config/widgets-config.token';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { ErrorLink } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { SetContextLink } from '@apollo/client/link/context';
import { WidgetLibraryConfig } from '../config/widgets-config.interface';
import { CombinedGraphQLErrors, CombinedProtocolErrors } from '@apollo/client/errors';
import { HttpHeaders } from '@angular/common/http';

export function provideApolloClient() {
  return provideApollo(() => {
    const httpLink = inject(HttpLink);
    const config = inject(WIDGET_LIBRARY_CONFIG);
    const cache = new InMemoryCache();

    const http = httpLink.create({ uri: config.api.graphqlEndpoint });
    const contextLink = createContextLink(config);
    const errorLink = createErrorLink(config);
    const retryLink = createRetryLink(config);

    const link = ApolloLink.from([contextLink, retryLink, errorLink, http]);

    return {
      link,
      cache
    };
  });
}

/**
 * Checks if a message at the given level should be logged based on config
 */
function shouldLog(
  config: WidgetLibraryConfig,
  messageLevel: 'debug' | 'info' | 'warn' | 'error'
): boolean {
  if (!config.logging?.console) return false;

  const configLevel = config.logging.level || 'warn';

  if (configLevel === 'off') return false;

  const levels = ['debug', 'info', 'warn', 'error'];
  const configLevelIndex = levels.indexOf(configLevel);
  const messageLevelIndex = levels.indexOf(messageLevel);

  return messageLevelIndex >= configLevelIndex;
}

/**
 * Creates error handling link
 */
function createErrorLink(config: WidgetLibraryConfig): ErrorLink {
  return new ErrorLink(({ error, operation }) => {
    if (CombinedGraphQLErrors.is(error)) {
      error.errors.forEach(({ message, locations, path, extensions }) => {
        if (config.api.apollo?.onError) {
          config.api.apollo.onError({ message, locations, path, extensions });
        }

        if (shouldLog(config, 'error')) {
          const now = new Date().toISOString();

          console.group(
            `[${now}] [GraphQL Error] ${operation.operationName || 'Unknown operation'}`
          );
          console.error('Message:', message);
          if (path) console.error('Path:', path);
          if (locations) console.error('Locations:', locations);
          if (extensions) console.error('Extensions:', extensions);
          console.groupEnd();
        }
      });
    } else if (CombinedProtocolErrors.is(error)) {
      error.errors.forEach(({ message, extensions }) => {
        if (config.api.apollo?.onError) {
          config.api.apollo.onError({ message, extensions });
        }

        if (shouldLog(config, 'error')) {
          const now = new Date().toISOString();

          console.group(
            `[${now}] [Protocol error] ${operation.operationName || 'Unknown operation'}`
          );
          console.error('Message:', message);
          if (extensions) console.error('Extensions:', extensions);
          console.groupEnd();
        }
      });
    } else {
      if (config.api.apollo?.onNetworkError) {
        config.api.apollo.onNetworkError(error as Error);
      }
      if (shouldLog(config, 'error')) {
        const now = new Date().toISOString();

        console.group(
          `[${now}] [Network Error] ${operation.operationName || 'Unknown operation'}`
        );
        console.error('Message:', (error as Error).message || String(error));
        console.error('Error:', error);
        console.groupEnd();
      }
    }
  });
}

/**
 * Creates retry link based on config
 */
function createRetryLink(config: WidgetLibraryConfig): RetryLink {
  const maxAttempts = config.api.apollo?.retryAttempts ?? 3;
  const initialDelay = config.api.apollo?.retryDelay ?? 1000;

  return new RetryLink({
    attempts: {
      max: maxAttempts,
      retryIf: (error, operation) => {
        if (shouldLog(config, 'warn')) {
          console.warn(`[Retry] Retrying ${operation.operationName}: ${error.message}`);
        }
        if (error.message.includes('401') || error.message.includes('403')) {
          return false;
        }
        return true;
      }
    },
    delay: {
      initial: initialDelay,
      max: initialDelay * 10,
      jitter: true
    }
  });
}

/**
 * Creates context link for headers
 */
function createContextLink(config: WidgetLibraryConfig): ApolloLink {
  return new SetContextLink((prevContext, _) => {
    let headers = (prevContext.headers as HttpHeaders) || undefined;

    if (!headers) {
      headers = new HttpHeaders();
    }

    if (config.api.apollo?.headers) {
      Object.entries(config.api.apollo.headers).forEach(([key, value]) => {
        headers = headers!.set(key, value);
      });
    }

    if (config.api.apiKey && !headers.has('X-API-Key')) {
      headers = headers.set('X-API-Key', config.api.apiKey);
    }

    return {
      ...prevContext,
      headers
    };
  });
}

// src/lib/core/config/sdk-config.interface.ts
/**
 * Configuration for WidgetLibrary library
 * @example
 * ```typescript
 * const config: WidgetLibraryConfig = {
 *   api: {
 *     graphqlEndpoint: 'https://api.example.com/graphql',
 *     apiKey: 'your-key-here'
 *   }
 * };
 * ```
 */
export interface WidgetLibraryConfig {
  /**
   * API configuration for GraphQL and HTTP communication
   */
  api: {
    /**
     * GraphQL endpoint URL (required)
     * @example 'https://api.example.com/graphql'
     */
    graphqlEndpoint: string;

    /**
     * Optional API key for authentication
     */
    apiKey?: string;

    /**
     * Request timeout in milliseconds
     * @default 30000
     */
    timeout?: number;

    /**
     * Enable HTTP interceptors for logging/error handling
     * @default true in development
     */
    enableInterceptors?: boolean;

    /**
     * Apollo Client specific configuration
     */
    apollo?: {
      /**
       * Number of retry attempts for failed requests
       * @default 3
       */
      retryAttempts?: number;

      /**
       * Delay between retry attempts in milliseconds
       * @default 1000
       */
      retryDelay?: number;

      /**
       * Enable Apollo cache
       * @default true
       */
      enableCache?: boolean;

      /**
       * Enable optimistic UI updates
       * Allows UI to update immediately before server confirms
       * @default true
       */
      enableOptimisticUI?: boolean;

      /**
       * Cache policies for queries
       * @default 'cache-first'
       */
      defaultFetchPolicy?:
        | 'cache-first'
        | 'cache-and-network'
        | 'network-only'
        | 'no-cache'
        | 'cache-only';

      /**
       * Custom HTTP headers to include in all requests
       * Useful for authentication tokens, API keys, etc.
       * @example { 'Authorization': 'Bearer token123' }
       */
      headers?: Record<string, string>;

      /**
       * Error callback for handling GraphQL errors
       * @param error - The GraphQL error object
       */
      onError?: (error: {
        message: string;
        locations?: any[];
        path?: string[];
        extensions?: any;
      }) => void;

      /**
       * Network error callback
       * @param error - The network error object
       */
      onNetworkError?: (error: Error) => void;

      /**
       * Enable connection state tracking
       * Tracks online/offline status
       * @default true
       */
      trackConnectionState?: boolean;
    };
  };

  /**
   * State management configuration (NgRx)
   */
  state?: {
    /**
     * Enable Redux DevTools integration
     * @default true in development, false in production
     */
    enableDevTools?: boolean;

    /**
     * Enable NgRx runtime checks
     * @default true in development, false in production
     */
    enableRuntimeChecks?: boolean;

    /**
     * Default state serializability check strictness
     * @default 'warn'
     */
    serializability?: 'strict' | 'warn' | 'off';
  };

  /**
   * UI/Theme configuration
   */
  ui?: {
    /**
     * Default theme for SDK components
     * @default 'light'
     */
    theme?: 'light' | 'dark' | 'system';

    /**
     * Primary color for SDK components
     * @default '#3f51b5'
     */
    primaryColor?: string;

    /**
     * CSS class prefix for SDK components
     * @default 'widget-library'
     */
    cssPrefix?: string;
  };

  /**
   * Feature flags to enable/disable SDK features
   */
  features?: {
    /**
     * Enable analytics tracking
     * @default false
     */
    analytics?: boolean;

    /**
     * Enable offline support with cache
     * @default true
     */
    offlineSupport?: boolean;

    /**
     * Enable GraphQL subscriptions
     * @default false
     */
    subscriptions?: boolean;

    /**
     * Enable experimental features
     * @default false
     */
    experimental?: boolean;
  };

  /**
   * Logging and error handling configuration
   */
  logging?: {
    /**
     * Log level for SDK messages
     * @default 'warn'
     */
    level?: 'debug' | 'info' | 'warn' | 'error' | 'off';

    /**
     * Enable console logging
     * @default true in development
     */
    console?: boolean;

    /**
     * Error display strategy
     * @default 'toast'
     */
    errorDisplay?: 'toast' | 'inline' | 'console' | 'none';
  };
}

/**
 * Type helper for partial configuration (useful for merging)
 */
export type PartialWidgetLibraryConfig = {
  [K in keyof WidgetLibraryConfig]?: Partial<WidgetLibraryConfig[K]>;
};

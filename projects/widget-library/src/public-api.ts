/*
 * Public API Surface of widget-library
 * Standalone Angular library using signals and modular monolith architecture
 */

// Core Components
export * from './lib/widget-library';

// Core configuration
export * from './lib/core/config/widgets-config.interface';
export * from './lib/core/config/widgets-config.service';
export * from './lib/core/config/widgets-config.token';

// Temporary - for testing only
export { provideApolloClient } from './lib/core/graphql/apollo.provider';
export { WIDGET_LIBRARY_CONFIG } from './lib/core/config/widgets-config.token';
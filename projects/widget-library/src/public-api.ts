/*
 * Public API Surface of widget-library
 * Standalone Angular library using signals and modular monolith architecture
 */

// Core configuration
export * from './lib/core/config/widgets-config.interface';
export * from './lib/core/config/widgets-config.service';
export * from './lib/core/config/widgets-config.token';

// Temporary - for testing only
export { provideApolloClient } from './lib/core/graphql/apollo.provider';
export { WIDGET_LIBRARY_CONFIG } from './lib/core/config/widgets-config.token';

// NgRx Store - Global Infrastructure State
export * from './lib/core/store/theme';
export * from './lib/core/store/viewport';
export * from './lib/core/store/widget-registry';
export * from './lib/core/store/app-metadata';

// Core Components
export * from './lib/widget-library';
